import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { name, email, password, address, phone } = await request.json()

  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email))
  if (existingUser.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const newUser = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    })
    .returning()

  return NextResponse.json({ user: newUser[0] }, { status: 201 })
}

