import { NextResponse } from "next/server"
import { db } from "@/db"
import { orders, orderItems } from "@/db/schema"

export async function POST(request: Request) {
  const { userId, items, total } = await request.json()

  const newOrder = await db
    .insert(orders)
    .values({
      userId,
      status: "pending",
      total,
    })
    .returning()

  const orderId = newOrder[0].id

  for (const item of items) {
    await db.insert(orderItems).values({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })
  }

  return NextResponse.json(newOrder[0], { status: 201 })
}

