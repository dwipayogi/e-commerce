"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash, Upload } from "lucide-react"
import Image from "next/image"

interface Item {
  id: number
  name: string
  price: number
  stock: number
  image: string
}

const initialItems: Item[] = [
  { id: 1, name: "Premium Wireless Headphones", price: 19999, stock: 50, image: "/placeholder.svg" },
  { id: 2, name: "Smartphone", price: 69999, stock: 100, image: "/placeholder.svg" },
  { id: 3, name: "Laptop", price: 129999, stock: 30, image: "/placeholder.svg" },
]

export default function ManageItemsPage() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [newItem, setNewItem] = useState<Omit<Item, "id" | "image">>({ name: "", price: 0, stock: 0 })
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddItem = () => {
    const image = fileInputRef.current?.files?.[0]
    if (image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newItemWithImage = {
          ...newItem,
          id: items.length + 1,
          image: e.target?.result as string,
        }
        setItems([...items, newItemWithImage])
        setNewItem({ name: "", price: 0, stock: 0 })
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
      reader.readAsDataURL(image)
    } else {
      const newItemWithDefaultImage = {
        ...newItem,
        id: items.length + 1,
        image: "/placeholder.svg",
      }
      setItems([...items, newItemWithDefaultImage])
      setNewItem({ name: "", price: 0, stock: 0 })
    }
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      const image = fileInputRef.current?.files?.[0]
      if (image) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const updatedItem = { ...editingItem, image: e.target?.result as string }
          setItems(items.map((item) => (item.id === editingItem.id ? updatedItem : item)))
          setEditingItem(null)
          if (fileInputRef.current) fileInputRef.current.value = ""
        }
        reader.readAsDataURL(image)
      } else {
        setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
        setEditingItem(null)
      }
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
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Item Name"
            value={editingItem ? editingItem.name : newItem.name}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, name: e.target.value })
                : setNewItem({ ...newItem, name: e.target.value })
            }
            className="flex-grow"
          />
          <Input
            type="number"
            placeholder="Price (in cents)"
            value={editingItem ? editingItem.price : newItem.price}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, price: Number(e.target.value) })
                : setNewItem({ ...newItem, price: Number(e.target.value) })
            }
            className="flex-grow"
          />
          <Input
            type="number"
            placeholder="Stock"
            value={editingItem ? editingItem.stock : newItem.stock}
            onChange={(e) =>
              editingItem
                ? setEditingItem({ ...editingItem, stock: Number(e.target.value) })
                : setNewItem({ ...newItem, stock: Number(e.target.value) })
            }
            className="flex-grow"
          />
          <div className="flex items-center gap-2 flex-grow">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              id="imageUpload"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, image: event.target?.result as string })
                    }
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
              <Upload size={16} />
              Upload Image
            </Button>
            {editingItem && editingItem.image && (
              <div className="relative w-12 h-12">
                <Image
                  src={editingItem.image || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>
          <Button onClick={editingItem ? handleUpdateItem : handleAddItem} className="flex-grow">
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="relative w-12 h-12">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                </div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${(item.price / 100).toFixed(2)}</TableCell>
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

