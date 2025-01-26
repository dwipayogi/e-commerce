"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import CartDropdown from "./CartDropdown"
import UserDropdown from "./UserDropdown"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
    // For now, we'll just redirect to the home page
    router.push("/")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          MinimalStore
        </Link>
        <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>
        {user && user.isAdmin && (
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        )}
        <div className="flex items-center space-x-4">
          <CartDropdown />
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}

