"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const themes = [
  { name: "blue", primary: "#3b82f6", accent: "#60a5fa" },
  { name: "green", primary: "#22c55e", accent: "#4ade80" },
  { name: "cyan", primary: "#06b6d4", accent: "#22d3ee" },
  { name: "red", primary: "#ef4444", accent: "#f87171" },
  { name: "yellow", primary: "#eab308", accent: "#facc15" },
  { name: "purple", primary: "#a855f7", accent: "#c084fc" },
  { name: "neon", primary: "#0ff", accent: "#f0f" },
]

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState("green")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  async function saveTheme(themeName: string) {
    setIsSaving(true)
    try {
      const response = await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: themeName,
          ...themes.find(t => t.name === themeName)
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save theme")
      }

      setSelectedTheme(themeName)
    } catch (error) {
      console.error("Error saving theme:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Theme Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => saveTheme(theme.name)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.name
                    ? "border-blue-500 shadow-lg"
                    : "border-transparent hover:border-gray-200"
                }`}
                style={{
                  backgroundColor: theme.primary,
                  color: "white",
                }}
                disabled={isSaving}
              >
                {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}