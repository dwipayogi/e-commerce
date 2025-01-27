import { db } from "@/db"
import { users, products, orders, orderItems } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

// User CRUD operations
export async function createUser(userData: Omit<typeof users.$inferInsert, "id">) {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const newUser = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
    })
    .returning()
  return newUser[0]
}

export async function getUserByEmail(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email))
  return user[0]
}

export async function updateUser(id: number, userData: Partial<typeof users.$inferInsert>) {
  const updatedUser = await db.update(users).set(userData).where(eq(users.id, id)).returning()
  return updatedUser[0]
}

export async function deleteUser(id: number) {
  await db.delete(users).where(eq(users.id, id))
}

// Product CRUD operations
export async function createProduct(productData: Omit<typeof products.$inferInsert, "id">) {
  const newProduct = await db.insert(products).values(productData).returning()
  return newProduct[0]
}

export async function getProducts() {
  return await db.select().from(products)
}

export async function getProductById(id: number) {
  const product = await db.select().from(products).where(eq(products.id, id))
  return product[0]
}

export async function updateProduct(id: number, productData: Partial<typeof products.$inferInsert>) {
  const updatedProduct = await db.update(products).set(productData).where(eq(products.id, id)).returning()
  return updatedProduct[0]
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id))
}

// Order CRUD operations
export async function createOrder(
  orderData: Omit<typeof orders.$inferInsert, "id">,
  items: Array<Omit<typeof orderItems.$inferInsert, "id" | "orderId">>,
) {
  const newOrder = await db.insert(orders).values(orderData).returning()
  const orderId = newOrder[0].id

  for (const item of items) {
    await db.insert(orderItems).values({
      ...item,
      orderId,
    })
  }

  return newOrder[0]
}

export async function getOrders() {
  return await db.select().from(orders)
}

export async function getOrderById(id: number) {
  const order = await db.select().from(orders).where(eq(orders.id, id))
  const orderItems = await db.select().from(orderItems).where(eq(orderItems.orderId, id))
  return { ...order[0], items: orderItems }
}

export async function updateOrder(id: number, orderData: Partial<typeof orders.$inferInsert>) {
  const updatedOrder = await db.update(orders).set(orderData).where(eq(orders.id, id)).returning()
  return updatedOrder[0]
}

export async function deleteOrder(id: number) {
  await db.delete(orderItems).where(eq(orderItems.orderId, id))
  await db.delete(orders).where(eq(orders.id, id))
}

