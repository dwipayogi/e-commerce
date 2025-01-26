"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
  address: string
  phone: string
}

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface AuthContextType {
  user: User | null
  login: () => void
  logout: () => void
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const login = () => {
    // Simulate login
    setUser({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      isAdmin: true,
      address: "123 Main St, Anytown, AN 12345",
      phone: "+1 (555) 123-4567",
    })
  }

  const logout = () => {
    // Simulate logout
    setUser(null)
  }

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

