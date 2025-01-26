"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"

interface Item {
  id: number
  name: string
  price: number
  stock: number
}

const initialItems: Item[] = [
  { id: 1, name: "Premium Wireless Headphones", price: 199.99, stock: 50 },
  { id: 2, name: "Smartphone", price: 699.99, stock: 100 },
  { id: 3, name: "Laptop", price: 1299.99, stock: 30 },
]

export default function ManageItemsPage() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({ name: "", price: 0, stock: 0 })
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: items.length + 1 }])
    setNewItem({ name: "", price: 0, stock: 0 })
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Items</h1>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{editingItem ? "Edit Item" : "Add New Item"}</h2>
        <div className="flex space-x-4">
          <Input
            placeholder="Item Name"
            value={editingItem ? editingItem.name : newItem.name}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, name: e.target.value })
                : setNewItem({ ...newItem, name: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            value={editingItem ? editingItem.price : newItem.price}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })
                : setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })
            }
          />
          <Input
            type="number"
            placeholder="Stock"
            value={editingItem ? editingItem.stock : newItem.stock}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, stock: Number.parseInt(e.target.value) })
                : setNewItem({ ...newItem, stock: Number.parseInt(e.target.value) })
            }
          />
          <Button onClick={editingItem ? handleUpdateItem : handleAddItem}>
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setEditingItem(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteItem(item.id)}>
                    <Trash className="h-4 w-4" />
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

