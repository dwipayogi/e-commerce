import { NextResponse } from "next/server"
import { createOrder } from "@/lib/db"

export async function POST(request: Request) {
  const { userId, items, total } = await request.json()

  const newOrder = await createOrder(
    { userId, status: "pending", total },
    items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
  )

  return NextResponse.json(newOrder, { status: 201 })
}

