"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Home, Package } from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Items", href: "/dashboard/items", icon: ShoppingBag },
  { name: "Orders to Ship", href: "/dashboard/orders-to-ship", icon: Package },
  { name: "Back to Store", href: "/", icon: Home },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-md">
      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium ${
                isActive ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

