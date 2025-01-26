import { NextResponse } from "next/server"
import { db } from "@/db"
import { products } from "@/db/schema"

export async function GET() {
  const allProducts = await db.select().from(products)
  return NextResponse.json(allProducts)
}

export async function POST(request: Request) {
  const { name, description, price, image, stock } = await request.json()
  const newProduct = await db
    .insert(products)
    .values({
      name,
      description,
      price,
      image,
      stock,
    })
    .returning()
  return NextResponse.json(newProduct[0], { status: 201 })
}

