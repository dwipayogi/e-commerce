"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Cart ({totalItems} items)</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
                <div className="mt-4 border-t pt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Subtotal:</p>
                    <p className="text-sm font-medium">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium">Total:</p>
                    <p className="text-base font-bold">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </>
            )}
            <Link href="/cart" className="block mt-4">
              <Button className="w-full">View Cart</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

