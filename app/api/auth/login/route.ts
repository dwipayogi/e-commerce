import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await db.select().from(users).where(eq(users.email, email))
  if (user.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 })
  }

  // In a real application, you would generate a JWT token here
  return NextResponse.json({ user: { ...user[0], password: undefined } })
}

