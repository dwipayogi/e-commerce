"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, User, MapPin } from "lucide-react"

interface Order {
  id: string
  productName: string
  quantity: number
  customerName: string
  address: string
  status: "Pending" | "Shipped"
}

const initialOrders: Order[] = [
  {
    id: "ORD001",
    productName: "Premium Wireless Headphones",
    quantity: 1,
    customerName: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    status: "Pending",
  },
  {
    id: "ORD002",
    productName: "Smartphone",
    quantity: 1,
    customerName: "Jane Smith",
    address: "456 Elm St, Othertown, OT 67890",
    status: "Pending",
  },
  {
    id: "ORD003",
    productName: "Laptop",
    quantity: 1,
    customerName: "Bob Johnson",
    address: "789 Oak St, Somewhere, SW 13579",
    status: "Pending",
  },
]

export default function OrdersToShipPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const handleShipOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "Shipped" } : order)))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders to Ship</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Details: {order.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Package className="h-5 w-5" />
                          <span className="font-semibold">Product:</span> {order.productName} (Qty: {order.quantity})
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span className="font-semibold">Customer:</span> {order.customerName}
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5" />
                          <span className="font-semibold">Shipping Address:</span> {order.address}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span> {order.status}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleShipOrder(order.id)}
                    disabled={order.status === "Shipped"}
                  >
                    {order.status === "Shipped" ? "Shipped" : "Mark as Shipped"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

