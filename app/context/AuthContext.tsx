"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getUserByEmail } from "@/lib/db"
import type { users, products } from "@/db/schema"

type User = typeof users.$inferSelect
type Product = typeof products.$inferSelect

interface CartItem extends Product {
  quantity: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, address?: string, phone?: string) => Promise<void>
  cart: CartItem[]
  addToCart: (item: Product) => void
  removeFromCart: (id: number) => void
  updateCartItemQuantity: (id: number, quantity: number) => void
  placeOrder: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string, address?: string, phone?: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, address, phone }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const addToCart = (item: Product) => {
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

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const placeOrder = async () => {
    if (!user) {
      throw new Error("User must be logged in to place an order")
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, items: orderItems, total }),
      })

      if (!response.ok) {
        throw new Error("Failed to place order")
      }

      // Clear the cart after successful order
      setCart([])
    } catch (error) {
      console.error("Order placement error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        placeOrder,
      }}
    >
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

