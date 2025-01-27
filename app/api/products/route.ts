import { NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/db"

export async function GET() {
  const allProducts = await getProducts()
  return NextResponse.json(allProducts)
}

export async function POST(request: Request) {
  const productData = await request.json()
  const newProduct = await createProduct(productData)
  return NextResponse.json(newProduct, { status: 201 })
}

