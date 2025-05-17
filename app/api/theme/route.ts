import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const theme = await request.json()

    const { error } = await supabase
      .from("themes")
      .upsert({ 
        name: theme.name,
        primary: theme.primary,
        accent: theme.accent
      })

    if (error) throw error

    return NextResponse.json({ message: "Theme updated successfully" })
  } catch (error) {
    console.error("Error saving theme:", error)
    return new NextResponse("Error saving theme", { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("themes")
      .select("*")
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching theme:", error)
    return new NextResponse("Error fetching theme", { status: 500 })
  }
}