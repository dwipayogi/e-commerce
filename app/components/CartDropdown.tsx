"use client"

import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"

export default function CartDropdown() {
  const { cart } = useAuth()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

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
      <DropdownMenuContent className="w-64" align="end">
        <h3 className="font-semibold p-2">Cart</h3>
        {cart.length === 0 ? (
          <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
        ) : (
          <>
            {cart.map((item) => (
              <DropdownMenuItem key={item.id}>
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-semibold">Total:</span>
              <span className="ml-auto font-semibold">${totalPrice.toFixed(2)}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/cart/checkout" className="w-full">
                <Button className="w-full">Checkout</Button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

