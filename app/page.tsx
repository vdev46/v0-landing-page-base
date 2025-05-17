"use client"

import { useState, useRef, useEffect, useTransition } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  ChevronDown,
  Star,
  Users,
  Award,
  Clock,
  Shield,
  ArrowRight,
  Zap,
  RefreshCw,
  ChevronUp,
} from "lucide-react"
import VSLPlayer from "@/components/vsl-player"
import RootLayoutClient from "./RootLayoutClient"

export default function LandingPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  // Configuração do vídeo - você pode facilmente alternar entre URL e código de incorporação
  const videoConfig = {
    // Opção 1: Usando URL direta
    type: "url" as const,
    content: "https://vimeo.com/1078670896/0dc58ff6ce?share=copy",
    platform: "vimeo" as const,

    // Opção 2: Usando código de incorporação (descomente para usar)
    // type: "embed" as const,
    // content: '<div style="padding:56.49% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1078670896?h=0dc58ff6ce&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="vsl-2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  }

  // Countdown timer functionality
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const faqs = [
    {
      question: "Por quanto tempo vou ter acesso?",
      answer: "Você terá acesso vitalício ao produto e todas as atualizações futuras sem custos adicionais.",
    },
    {
      question: "É possível conseguir resultados em quanto tempo?",
      answer:
        "A maioria dos alunos começa a ver resultados nas primeiras 2 semanas aplicando as estratégias ensinadas.",
    },
    {
      question: "Tem garantia?",
      answer:
        "Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito, devolvemos 100% do seu dinheiro.",
    },
    {
      question: "Funciona mesmo para quem não tem experiência?",
      answer: "Sim! O método foi desenvolvido para funcionar independentemente da sua experiência prévia.",
    },
  ]

  const testimonials = [
    {
      name: "Carlos Mendes",
      image: "/assets/testimonials/testimonial-1.png",
      text: "Muito bom! Consegui fazer meu primeiro R$1000 em menos de uma semana aplicando esse guia de 70 mensagens! Muito obrigado, recomendo muito rapidamente!",
      stars: 5,
    },
    {
      name: "Juliana Silva",
      image: "/assets/testimonials/testimonial-2.png",
      text: "Já tô com 3 dias usando e já tô vendo resultados. Já tô conseguindo vender muito mais. Recomendo aos meus parceiros 100% seguro.",
      stars: 5,
    },
    {
      name: "Ricardo Almeida",
      image: "/assets/testimonials/testimonial-3.png",
      text: "É o único programa que me fez sair do zero. Não tinha conseguido nenhuma curtida no meu perfil antes, e agora estou com mais de 50 por semana! Muito obrigado!",
      stars: 5,
    },
  ]

  const toggleAccordion = (index: number) => {
    if (isAccordionOpen === index) {
      setIsAccordionOpen(null)
    } else {
      setIsAccordionOpen(index)
    }
  }

  const scrollToSection = (id: string) => {
    startTransition(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  return (
    <RootLayoutClient>
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        {/* Header with Countdown Timer */}
        <header className="bg-black/80 py-4 border-b border-green-500/20">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">OFERTA ESPECIAL TERMINA EM:</p>
              <div className="flex items-center justify-center gap-2 text-white">
                <div className="bg-gray-900 rounded-md px-3 py-1 border border-green-500/30">
                  <span className="text-xl font-bold text-white">{timeLeft.hours.toString().padStart(2, "0")}</span>
                  <span className="text-xs block text-gray-400">Horas</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="bg-gray-900 rounded-md px-3 py-1 border border-green-500/30">
                  <span className="text-xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                  <span className="text-xs block text-gray-400">Min</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="bg-gray-900 rounded-md px-3 py-1 border border-green-500/30">
                  <span className="text-xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                  <span className="text-xs block text-gray-400">Seg</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="pt-16 pb-20 md:pt-20 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  1K POR DIA
                </span>{" "}
                <span className="block sm:inline">COM TRÁFEGO DIRETO PARA PRODUTOS LOW TICKET</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Te mostro do zero criando um produto low ticket que vende todos os dias - sem enrolação
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <VSLPlayer
                  thumbnailUrl="/assets/hero/thumbnail.png"
                  videoSource={videoConfig}
                  aspectRatio="16:9"
                  duration={104} // Duração exata: 1m44s = 104 segundos
                />
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-8 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                E ainda mostro mais detalhes na prática.
                <br />
                <span className="text-green-400 font-medium">
                  Resultados rápidos para transformar tráfego em vendas reais!
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("pricing")
                  }}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-300"
                >
                  QUERO INFORMAÇÕES 🚀
                </a>
                <p className="mt-4 text-gray-400">
                  Por apenas <span className="line-through">R$997</span>{" "}
                  <span className="text-green-400 font-bold">R$297</span> à vista
                </p>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-green-500" />
          </div>
        </section>

        {/* Problem Identification Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  O QUE VOCÊ VAI APRENDER?
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Criação de Infoprodutos</h3>
                  </div>
                  <p className="text-gray-400">
                    Te ensino como criar do zero um produto low ticket que vende todos os dias - mesmo que você não
                    tenha experiência, capital inicial ou equipe.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                      <Award className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Escala mil reais por dia</h3>
                  </div>
                  <p className="text-gray-400">
                    Método comprovado para escalar seu produto low ticket para R$1.000 por dia, com estratégias que
                    funcionam mesmo para iniciantes.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Estratégia de vendas</h3>
                  </div>
                  <p className="text-gray-400">
                    As melhores estratégias para vender seu produto digital de forma automática, gerando receita mesmo
                    enquanto você dorme.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Tráfego Secreto</h3>
                  </div>
                  <p className="text-gray-400">
                    Você vai aprender meus métodos secretos para gerar tráfego qualificado sem precisar de grandes
                    investimentos em anúncios.
                  </p>
                </motion.div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8">ESTE TREINAMENTO É PARA VOCÊ QUE:</h3>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {[
                    "Quer criar um produto digital mas não sabe por onde começar",
                    "Já tentou vender online mas não conseguiu resultados consistentes",
                    "Está cansado de investir em tráfego pago sem retorno satisfatório",
                    "Quer uma fonte de renda extra ou substituir seu emprego atual",
                    "Deseja aprender estratégias comprovadas de quem já fatura 6 dígitos",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-gradient-to-r from-green-900/20 to-black p-4 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                      <p className="text-gray-300">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  O QUE VOCÊ RECEBE
                </span>
              </h2>
              <p className="text-xl text-gray-300">Acesso completo a todo o conteúdo e bônus exclusivos</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video rounded-xl overflow-hidden border-2 border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.2)]">
                  <Image
                    src="/assets/modules/module-main.png"
                    alt="Módulo Principal"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                  <h3 className="text-2xl font-bold mb-2">Módulo Principal</h3>
                  <p className="text-gray-300 mb-4 text-center">7 aulas completas com todo o passo a passo</p>
                  <div className="inline-block bg-green-500 text-black font-bold py-2 px-4 rounded-full">
                    +3 horas de conteúdo
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    title: "Módulo Ads Otimizados",
                    description: "Aprenda a criar anúncios que convertem e escalam com baixo custo por aquisição",
                    icon: "Zap",
                    delay: 0.1,
                  },
                  {
                    title: "Comunidade Exclusiva",
                    description: "Acesso ao nosso grupo privado onde você pode tirar dúvidas diretamente comigo",
                    icon: "Users",
                    delay: 0.2,
                  },
                  {
                    title: "Atualizações Vitalícias",
                    description: "Receba todas as atualizações futuras do curso sem pagar nada a mais",
                    icon: "RefreshCw",
                    delay: 0.3,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        {item.icon === "Zap" && <Zap className="h-6 w-6 text-green-500" />}
                        {item.icon === "Users" && <Users className="h-6 w-6 text-green-500" />}
                        {item.icon === "RefreshCw" && <RefreshCw className="h-6 w-6 text-green-500" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Aula Bônus #1",
                  description: "Como criar uma oferta irresistível",
                  duration: "+1h30m",
                  delay: 0.1,
                  image: "/assets/bonus/bonus-1.png",
                },
                {
                  title: "Aula Bônus #2",
                  description: "Estratégias avançadas de copywriting",
                  duration: "+1h15m",
                  delay: 0.2,
                  image: "/assets/bonus/bonus-2.png",
                },
                {
                  title: "Aula Bônus #3",
                  description: "Automação completa do seu funil de vendas",
                  duration: "+1h45m",
                  delay: 0.3,
                  image: "/assets/bonus/bonus-3.png",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden border border-green-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-300 mb-2">{item.description}</p>
                      <div className="inline-block bg-green-500/20 text-green-400 font-medium py-1 px-3 rounded-full text-sm">
                        {item.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  DEPOIMENTOS
                </span>{" "}
                DE QUEM JÁ USOU E APROVOU
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-green-500/20 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex">
                        {Array(testimonial.stars)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="max-w-4xl mx-auto bg-gradient-to-r from-green-900/30 to-black p-8 rounded-2xl border border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <Image
                    src="/assets/instructor/instructor.png"
                    alt="Instrutor"
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      Quem vai te ensinar
                    </span>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Olá! Sou Lucas, especialista em marketing digital e criação de produtos digitais. Nos últimos 3
                    anos, ajudei mais de 1.500 alunos a criarem seus próprios negócios online.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Já faturei mais de 7 milhões com produtos digitais e agora quero compartilhar com você as
                    estratégias que realmente funcionam para quem está começando.
                  </p>
                  <div className="flex items-center">
                    <div className="flex mr-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    <p className="text-gray-400">Mais de 1.500 alunos satisfeitos</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  ESCOLHA SEU PLANO
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Invista em você mesmo e comece a transformar sua vida financeira hoje
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Básico</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$197</span>
                    <span className="text-gray-400"> / único</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Acesso ao curso completo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Comunidade de alunos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Atualizações por 6 meses</span>
                    </li>
                    <li className="flex items-start text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 flex-shrink-0 mt-0.5"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                      <span>Mentorias em grupo</span>
                    </li>
                    <li className="flex items-start text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 flex-shrink-0 mt-0.5"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                      <span>Bônus exclusivos</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Comprar agora
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-900/30 to-black rounded-xl border-2 border-green-500/50 overflow-hidden shadow-[0_0_25px_rgba(34,197,94,0.2)] transform md:-translate-y-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-green-500 text-black font-bold text-center py-2">MAIS POPULAR</div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$297</span>
                    <span className="text-gray-400"> / único</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Acesso ao curso completo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Comunidade de alunos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Atualizações vitalícias</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Mentorias em grupo (3 meses)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Todos os bônus exclusivos</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-700 text-black font-bold rounded-lg hover:from-green-600 hover:to-green-800 transition-colors">
                    COMPRAR AGORA
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">VIP</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$497</span>
                    <span className="text-gray-400"> / único</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Acesso ao curso completo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Comunidade de alunos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Atualizações vitalícias</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Mentorias em grupo (6 meses)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Mentoria individual (1 sessão)</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Comprar agora
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="max-w-4xl mx-auto mt-12 text-center">
              <p className="text-gray-400 mb-4">Garantia de 7 dias ou seu dinheiro de volta. Sem perguntas.</p>
              <div className="flex justify-center">
                <div className="flex items-center bg-green-500/10 rounded-full px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mr-2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="text-green-400">Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Perguntas Frequentes
                </span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <button
                    className={`w-full flex justify-between items-center p-4 rounded-lg ${
                      isAccordionOpen === index
                        ? "bg-green-900/30 border border-green-500/30"
                        : "bg-gray-900 border border-gray-800 hover:bg-gray-800"
                    } transition-colors`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-medium text-left">{faq.question}</span>
                    {isAccordionOpen === index ? (
                      <ChevronUp className="h-5 w-5 transition-transform" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transition-transform" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isAccordionOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-gray-900/50 border-x border-b border-gray-800 rounded-b-lg">
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-b from-black to-green-950/30 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para começar sua jornada rumo aos
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  R$1.000 por dia?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Não perca mais tempo. Junte-se a centenas de alunos que já estão transformando suas vidas.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("pricing")
                  }}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                >
                  QUERO COMEÇAR AGORA <ArrowRight className="inline ml-2" />
                </a>
              </motion.div>
              <p className="mt-4 text-gray-400">Garantia de 7 dias ou seu dinheiro de volta</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-green-900/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Image
                  src="/assets/logo/logo.png"
                  alt="Marketing Mastery Logo"
                  width={40}
                  height={40}
                  className="rounded-lg mr-2"
                />
                <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Marketing Mastery
                </span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Marketing Mastery. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </RootLayoutClient>
  )
}
