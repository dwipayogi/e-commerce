"use client"

import { useState, useRef, useEffect } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, login, logout } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

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
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        {user ? (
          <img
            src={user.avatar || "/placeholder.svg?height=32&width=32"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="h-6 w-6" />
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            {user ? (
              <>
                <p className="text-sm font-medium mb-2">{user.name}</p>
                <p className="text-xs text-gray-500 mb-4">{user.email}</p>
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={login} className="w-full">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

