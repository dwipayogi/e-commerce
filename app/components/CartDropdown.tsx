"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import { getCart, getCartTotal, type CartItem } from "@/lib/cartUtils"

export default function CartDropdown() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart())
      setTotal(getCartTotal())
    }

    updateCart()
    window.addEventListener("storage", updateCart)

    return () => {
      window.removeEventListener("storage", updateCart)
    }
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <h3 className="font-semibold p-2">Cart</h3>
        {cart.length === 0 ? (
          <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
        ) : (
          <>
            {cart.map((item) => (
              <DropdownMenuItem key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-sm text-gray-500">
                  {item.quantity} x ${(item.price / 100).toFixed(2)}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-semibold">Total:</span>
              <span className="ml-auto font-semibold">${(total / 100).toFixed(2)}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/cart" className="w-full">
                <Button className="w-full">View Cart</Button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

