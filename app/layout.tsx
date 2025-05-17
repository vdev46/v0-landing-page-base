import type React from "react"
import { metadata } from "./metadata"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

export { metadata }

const inter = Inter({ subsets: ["latin"] })

// Componente principal do layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
