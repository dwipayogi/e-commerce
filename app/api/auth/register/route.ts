import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  const { name, email, password, address, phone } = await request.json()

  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  // Create new user
  const newUser = await createUser({ name, email, password, address, phone })

  return NextResponse.json({ user: { ...newUser, password: undefined } }, { status: 201 })
}

