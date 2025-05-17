"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Volume2, VolumeX, RefreshCw } from "lucide-react"

/**
 * Interface para as propriedades do componente VSLPlayer
 *
 * @param thumbnailUrl - URL da imagem de thumbnail que será exibida antes do vídeo iniciar
 * @param videoSource - Objeto contendo informações sobre a fonte do vídeo (URL ou código de incorporação)
 * @param aspectRatio - Proporção do vídeo (ex: "16:9", "4:3", etc.)
 * @param autoPlay - Se o vídeo deve iniciar automaticamente
 * @param duration - Duração do vídeo em segundos (opcional, será detectada automaticamente se possível)
 */
interface VSLPlayerProps {
  thumbnailUrl: string
  videoSource: {
    type: "url" | "embed" // Tipo de fonte: URL direta ou código de incorporação
    content: string // URL do vídeo ou código HTML de incorporação
    platform?: "vimeo" | "youtube" | "wistia" | "vturb" | "other" // Plataforma de hospedagem
  }
  aspectRatio?: string
  autoPlay?: boolean
  duration?: number // Duração em segundos (opcional)
}

/**
 * Componente VSLPlayer - Player de vídeo personalizado para VSLs
 *
 * Este componente permite exibir vídeos de diferentes plataformas (Vimeo, YouTube, etc.)
 * com controles personalizados e funcionalidades específicas para VSLs.
 */
export default function VSLPlayer({
  thumbnailUrl,
  videoSource,
  aspectRatio = "16:9",
  autoPlay = false,
  duration,
}: VSLPlayerProps) {
  // Estados para controlar o comportamento do player
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isLoading, setIsLoading] = useState(autoPlay)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [videoDuration, setVideoDuration] = useState(duration || 104) // Duração padrão: 1m44s (104 segundos)
  const [videoEnded, setVideoEnded] = useState(false)

  // Referências para elementos e timers
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<any>(null)

  /**
   * Determina o estilo do container com base na proporção (aspect ratio) especificada
   * Isso permite que o vídeo se ajuste corretamente ao tamanho e formato desejados
   */
  const getContainerStyle = () => {
    // Proporções comuns pré-definidas
    if (aspectRatio === "16:9") {
      return "aspect-video" // Padrão 16:9 (widescreen)
    } else if (aspectRatio === "1:1") {
      return "aspect-square" // Quadrado 1:1
    } else if (aspectRatio === "9:16") {
      return "aspect-[9/16]" // Vertical 9:16 (formato de celular)
    } else if (aspectRatio === "4:3") {
      return "aspect-[4/3]" // Tradicional 4:3
    } else {
      // Proporção personalizada
      const [w, h] = aspectRatio.split(":").map(Number)
      return `aspect-[${w}/${h}]`
    }
  }

  /**
   * Processa a URL do vídeo e determina a plataforma
   * Esta função identifica a plataforma de hospedagem e gera a URL de incorporação apropriada
   *
   * @param url - URL do vídeo
   * @param platform - Plataforma de hospedagem (opcional, será detectada automaticamente se não fornecida)
   */
  const processVideoUrl = (url: string, platform?: string) => {
    // Se a plataforma já foi especificada, usamos ela
    if (platform) {
      switch (platform) {
        case "vimeo":
          return getVimeoEmbedFromUrl(url)
        case "youtube":
          return getYouTubeEmbedFromUrl(url)
        case "wistia":
          return getWistiaEmbedFromUrl(url)
        case "vturb":
          return getVturbEmbedFromUrl(url)
        default:
          return { embedUrl: url, embedCode: "" }
      }
    }

    // Caso contrário, tentamos detectar a plataforma pela URL
    if (url.includes("vimeo.com")) {
      return getVimeoEmbedFromUrl(url)
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return getYouTubeEmbedFromUrl(url)
    } else if (url.includes("wistia.com")) {
      return getWistiaEmbedFromUrl(url)
    } else if (url.includes("vturb.com.br")) {
      return getVturbEmbedFromUrl(url)
    } else {
      // URL desconhecida, retornamos como está
      return { embedUrl: url, embedCode: "" }
    }
  }

  /**
   * Gera a URL de incorporação para vídeos do Vimeo
   *
   * @param url - URL do vídeo do Vimeo
   * @returns Objeto contendo a URL de incorporação e o código HTML
   */
  const getVimeoEmbedFromUrl = (url: string) => {
    // Exemplo: https://vimeo.com/1078670896/0dc58ff6ce?share=copy
    let videoId = ""
    let hash = ""

    // Extrair ID e hash da URL
    if (url.includes("/")) {
      const parts = url.split("/")
      videoId = parts[parts.length - 2] || parts[parts.length - 1].split("?")[0]

      // Extrair hash se existir
      if (parts[parts.length - 1].includes("?")) {
        hash = parts[parts.length - 1].split("?")[0]
      } else {
        hash = parts[parts.length - 1]
      }
    }

    // Limpar hash se necessário
    if (hash.includes("?")) {
      hash = hash.split("?")[0]
    }

    // Parâmetros da URL de incorporação:
    // - badge=0: Remove o badge do Vimeo
    // - autopause=0: Impede que o vídeo pause quando outro vídeo do Vimeo é reproduzido
    // - player_id=0: ID do player
    // - app_id=58479: ID da aplicação
    // - autoplay=1: Inicia o vídeo automaticamente
    // - controls=0: Oculta os controles nativos
    // - transparent=0: Remove o fundo transparente
    // - background=1: Modo background (remove interface)
    // - muted=0: Garante que o áudio esteja habilitado
    // - loop=0: Não repete o vídeo automaticamente
    const embedUrl = `https://player.vimeo.com/video/${videoId}?h=${hash}&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=0&transparent=0&background=1&muted=0&loop=0`
    const embedCode = `<div style="padding:56.49% 0 0 0;position:relative;"><iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="video-player"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`

    return { embedUrl, embedCode }
  }

  /**
   * Gera a URL de incorporação para vídeos do YouTube
   *
   * @param url - URL do vídeo do YouTube
   * @returns Objeto contendo a URL de incorporação e o código HTML
   */
  const getYouTubeEmbedFromUrl = (url: string) => {
    let videoId = ""

    // Extrair o ID do vídeo da URL do YouTube
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url)
      videoId = urlObj.searchParams.get("v") || ""
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0]
    }

    // Parâmetros da URL de incorporação:
    // - autoplay=1: Inicia o vídeo automaticamente
    // - rel=0: Não mostra vídeos relacionados
    // - modestbranding=1: Remove a maioria das marcas do YouTube
    // - controls=0: Oculta os controles nativos
    // - showinfo=0: Não mostra informações do vídeo
    // - disablekb=1: Desabilita controles de teclado
    // - fs=0: Desabilita botão de tela cheia
    // - iv_load_policy=3: Não mostra anotações
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3`
    const embedCode = `<iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>`

    return { embedUrl, embedCode }
  }

  /**
   * Gera a URL de incorporação para vídeos do Wistia
   *
   * @param url - URL do vídeo do Wistia
   * @returns Objeto contendo a URL de incorporação e o código HTML
   */
  const getWistiaEmbedFromUrl = (url: string) => {
    let videoId = ""

    // Extrair o ID do vídeo da URL do Wistia
    if (url.includes("wistia.com/medias/")) {
      videoId = url.split("wistia.com/medias/")[1].split("?")[0]
    }

    const embedUrl = `https://fast.wistia.net/embed/iframe/${videoId}?autoPlay=true`
    const embedCode = `<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="${embedUrl}" title="Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div><script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>`

    return { embedUrl, embedCode }
  }

  /**
   * Gera a URL de incorporação para vídeos do VTurb
   *
   * @param url - URL do vídeo do VTurb
   * @returns Objeto contendo a URL de incorporação e o código HTML
   */
  const getVturbEmbedFromUrl = (url: string) => {
    let videoId = ""

    // Extrair o ID do vídeo da URL do VTurb
    if (url.includes("vturb.com.br/video/")) {
      videoId = url.split("vturb.com.br/video/")[1].split("?")[0]
    }

    const embedUrl = `https://vturb.com.br/video/${videoId}?autoplay=1&controls=0&showinfo=0`
    const embedCode = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;top:0;left:0;width:100%;height:100%;" allowfullscreen></iframe>`

    return { embedUrl, embedCode }
  }

  // Modificar a função handlePlay para usar apenas o nosso próprio sistema de progresso
  const handlePlay = () => {
    setIsLoading(true)
    setIsPlaying(true)
    setIsMuted(false) // Garantir que o áudio esteja habilitado ao iniciar
    setVideoEnded(false)
    setProgress(0) // Reiniciar o progresso ao dar play

    // Limpar intervalo anterior se existir
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    // Usar uma duração fixa para garantir um progresso contínuo e suave
    // Isso evita que a barra de progresso fique indo e voltando
    const fixedDuration = videoDuration // Usar a duração definida (104 segundos)

    // Calcular o incremento por segundo para ter um progresso suave
    const incrementPerSecond = 100 / fixedDuration

    // Atualizar o progresso a cada 100ms para uma animação mais suave
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + incrementPerSecond / 10 // Dividido por 10 porque atualizamos a cada 100ms
        if (newProgress >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current)
            // Chamar handleVideoEnd após o progresso chegar a 100%
            setTimeout(() => handleVideoEnd(), 500)
          }
          return 100
        }
        return newProgress
      })
    }, 100)

    // Simular o tempo de carregamento
    setTimeout(() => {
      setIsLoading(false)

      // Tentar iniciar o vídeo via API se disponível
      if (iframeRef.current) {
        try {
          // Tentar enviar mensagem para o iframe
          iframeRef.current.contentWindow?.postMessage(
            {
              method: "play",
              value: "true",
            },
            "*",
          )

          // Garantir que o áudio esteja habilitado
          iframeRef.current.contentWindow?.postMessage(
            {
              method: "setVolume",
              value: "1",
            },
            "*",
          )
        } catch (error) {
          console.error("Erro ao iniciar o vídeo:", error)
        }
      }
    }, 1500)
  }

  /**
   * Função para lidar com o fim do vídeo
   * Esta função é chamada quando o vídeo termina de ser reproduzido
   */
  const handleVideoEnd = () => {
    setVideoEnded(true)
    setIsPlaying(false)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    setProgress(0)
  }

  /**
   * Alternar o estado de mudo (com/sem áudio)
   * Esta função é chamada quando o usuário clica no botão de volume
   */
  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    // Definir o volume apropriado
    const newVolume = newMutedState ? 0 : 1
    setVolume(newVolume)

    // Se tivermos acesso à API do player, podemos controlar o mute diretamente
    if (playerRef.current) {
      try {
        if (newMutedState) {
          playerRef.current.setVolume?.(0)
        } else {
          playerRef.current.setVolume?.(1)
        }
      } catch (error) {
        console.error("Erro ao controlar o volume:", error)
      }
    }

    // Alternativamente, podemos tentar controlar via iframe postMessage
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          {
            method: "setVolume",
            value: newVolume.toString(),
          },
          "*",
        )
      } catch (error) {
        console.error("Erro ao enviar mensagem para o iframe:", error)
      }
    }
  }

  // Limpar o intervalo quando o componente for desmontado
  useEffect(() => {
    // React 18 cleanup pattern
    const currentInterval = progressInterval.current

    return () => {
      if (currentInterval) {
        clearInterval(currentInterval)
      }
    }
  }, [])

  /**
   * Função para carregar o script da plataforma de vídeo após o iframe ser montado
   * Isso permite usar as APIs nativas de cada plataforma
   */
  useEffect(() => {
    if (isPlaying) {
      // Identificar qual script carregar com base na plataforma
      let scriptSrc = ""

      if (videoSource.platform === "vimeo" || videoSource.content.includes("vimeo.com")) {
        scriptSrc = "https://player.vimeo.com/api/player.js"
      } else if (videoSource.platform === "youtube" || videoSource.content.includes("youtube.com")) {
        scriptSrc = "https://www.youtube.com/iframe_api"
      } else if (videoSource.platform === "wistia" || videoSource.content.includes("wistia.com")) {
        scriptSrc = "https://fast.wistia.net/assets/external/E-v1.js"
      }

      if (scriptSrc) {
        const script = document.createElement("script")
        script.src = scriptSrc
        script.async = true
        document.body.appendChild(script)

        return () => {
          document.body.removeChild(script)
        }
      }
    }
  }, [isPlaying, videoSource])

  // Modificar a inicialização do player para não usar os eventos de progresso do Vimeo
  useEffect(() => {
    if (isPlaying && iframeRef.current && videoSource.platform === "vimeo") {
      // Tentar inicializar o player do Vimeo
      try {
        // @ts-ignore - Vimeo Player API
        if (window.Vimeo && window.Vimeo.Player) {
          // @ts-ignore
          playerRef.current = new window.Vimeo.Player(iframeRef.current)

          // React 18: Automatic batching for all state updates
          playerRef.current
            .getDuration()
            .then((duration: number) => {
              if (duration && duration > 0) {
                console.log("Duração real do vídeo detectada:", duration, "segundos")
              }
            })
            .catch((error: any) => {
              console.error("Erro ao obter duração:", error)
            })

          playerRef.current.on("loaded", () => {
            setIsLoading(false)
          })

          playerRef.current.on("ended", () => {
            console.log("Vídeo terminou (evento Vimeo)")
          })
        }
      } catch (error) {
        console.error("Erro ao inicializar o player do Vimeo:", error)
      }
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.off("ended")
          playerRef.current.off("loaded")
        } catch (error) {
          console.error("Erro ao remover eventos:", error)
        }
      }
    }
  }, [isPlaying, videoSource.platform])

  /**
   * Renderizar o player de vídeo com base no tipo de fonte
   * Isso permite usar tanto URLs diretas quanto códigos de incorporação
   */
  const renderVideoPlayer = () => {
    if (videoSource.type === "embed") {
      // Usar o código de incorporação diretamente
      return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: videoSource.content }} />
    } else {
      // Processar a URL e gerar o iframe
      const { embedUrl } = processVideoUrl(videoSource.content, videoSource.platform)

      return (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="video-player"
        />
      )
    }
  }

  // Configurar o volume quando o player é inicializado
  useEffect(() => {
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(isMuted ? 0 : 1)
      } catch (error) {
        console.error("Erro ao definir o volume inicial:", error)
      }
    }
  }, [playerRef.current, isMuted])

  // Remover o texto "Assistir novamente" e manter apenas o ícone
  return (
    <div
      className={`relative w-full ${getContainerStyle()} max-w-3xl mx-auto rounded-xl overflow-hidden border-2 border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.2)]`}
    >
      {isPlaying ? (
        <div className="absolute inset-0 w-full h-full bg-black">
          {/* Barra de progresso personalizada */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 z-30">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Botão de mudo com melhor visibilidade */}
          <button
            className="absolute bottom-4 right-4 z-40 bg-green-500/80 p-3 rounded-full hover:bg-green-600/90 transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-6 w-6 text-black" /> : <Volume2 className="h-6 w-6 text-black" />}
          </button>

          {/* Renderizar o player de vídeo */}
          {renderVideoPlayer()}

          {/* Indicador de carregamento */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-40">
              <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Thumbnail e botão de play */}
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt="Video Thumbnail"
            width={1280}
            height={720}
            className="object-cover w-full h-full"
            priority
          />
          <div
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
          >
            {/* Botão de play ou replay */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center transition-transform hover:scale-110 animate-pulse-glow">
              {videoEnded ? (
                <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
              ) : (
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-black fill-black ml-1" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
