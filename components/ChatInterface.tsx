"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: "buyer" | "seller"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  productId: number
  isSeller?: boolean
}

export function ChatInterface({ productId, isSeller = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // In a real app, you'd fetch messages from a backend service here
    const storedMessages = localStorage.getItem(`chat_${productId}`)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [productId])

  useEffect(() => {
    // In a real app, you'd use a backend service to store messages
    localStorage.setItem(`chat_${productId}`, JSON.stringify(messages))
  }, [productId, messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: isSeller ? "seller" : "buyer",
        content: newMessage.trim(),
        timestamp: new Date(),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === "buyer" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            } max-w-[70%]`}
          >
            <p>{message.content}</p>
            <span className="text-xs text-gray-500">{message.timestamp.toLocaleString()}</span>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  )
}

