"use client"

import { useState } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CheckoutPage() {
  const { user, cart } = useAuth()
  const [shippingAddress, setShippingAddress] = useState(user?.address || "")

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    // For now, we'll just show a toast
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed.",
    })
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user?.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={user?.email} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={user?.phone} required />
            </div>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

