"use client"

import type React from "react"
import { useEffect, useState, useId } from "react"
import { useSearchParams } from "next/navigation"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const rootId = useId()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, return a minimal wrapper
  if (!mounted) {
    return (
      <div id={rootId} suppressHydrationWarning>
        {/* Render a loading state or placeholder during SSR */}
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // Once mounted on client, render the full content
  return (
    <div id={rootId} className="relative">
      {children}
    </div>
  )
}