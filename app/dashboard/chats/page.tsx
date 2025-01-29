"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/ChatInterface"

interface ChatPreview {
  productId: number
  productName: string
  lastMessage: string
  timestamp: Date
}

export default function SellerChatsPage() {
  const [chats, setChats] = useState<ChatPreview[]>([])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch this data from a backend service
    const mockChats: ChatPreview[] = [
      {
        productId: 1,
        productName: "Premium Wireless Headphones",
        lastMessage: "Is this still available?",
        timestamp: new Date(),
      },
      { productId: 2, productName: "Smartphone", lastMessage: "Can you offer a discount?", timestamp: new Date() },
    ]
    setChats(mockChats)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Seller Chats</h1>
      <div className="flex space-x-4">
        <div className="w-1/3 space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.productId}
              className={`p-4 border rounded-lg cursor-pointer ${selectedChat === chat.productId ? "bg-blue-100" : ""}`}
              onClick={() => setSelectedChat(chat.productId)}
            >
              <h3 className="font-semibold">{chat.productName}</h3>
              <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              <span className="text-xs text-gray-500">{chat.timestamp.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="w-2/3">
          {selectedChat ? (
            <ChatInterface productId={selectedChat} isSeller={true} />
          ) : (
            <p>Select a chat to view the conversation</p>
          )}
        </div>
      </div>
    </div>
  )
}

