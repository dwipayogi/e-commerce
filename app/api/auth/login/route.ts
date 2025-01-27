import { NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await getUserByEmail(email)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 })
  }

  // In a real application, you would generate a JWT token here
  return NextResponse.json({ user: { ...user, password: undefined } })
}

