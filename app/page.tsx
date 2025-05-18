'use client'

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
  const [mounted, setMounted] = useState(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Configuração do vídeo - você pode facilmente alternar entre URL e código de incorporação
  const videoConfig = {
    // Opção 1: Usando URL direta
    type: "url" as const,
    content: "https://vimeo.com/1078670896/0dc58ff6ce?share=copy",
    platform: "vimeo" as const,
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

  if (!mounted) {
    return null
  }

  return (
    <RootLayoutClient>
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        {/* Rest of the component remains exactly the same */}
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

        {/* Rest of the sections remain exactly the same */}
      </div>
    </RootLayoutClient>
  )
}