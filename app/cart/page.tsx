"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, type CartItem } from "@/lib/cartUtils"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity)
    setCart(getCart())
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
    setCart(getCart())
  }

  const handleCheckout = () => {
    // Implement checkout logic here
    alert("Proceeding to checkout")
    clearCart()
    setCart([])
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="ml-4" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${((item.price * item.quantity) / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${(totalPrice / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(totalPrice / 100).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

