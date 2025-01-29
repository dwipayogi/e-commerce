"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import UserReviews from "./UserReviews"
import RelatedProducts from "./RelatedProducts"
import { ChatInterface } from "./ChatInterface"
import { addToCart } from "@/lib/cartUtils"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  price: number
  description: string
  rating: number
  reviews: number
  stock: number
  images: string[]
}

export default function ProductDetail({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="flex justify-center mt-4 gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentImage ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${(product.price / 100).toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>
          <p className="mb-4">
            Stock: <span className="font-semibold">{product.stock}</span>
          </p>
          <div className="flex space-x-4">
            <Button className="flex-grow" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat with Seller
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Chat with Seller</DialogTitle>
                </DialogHeader>
                <ChatInterface productId={product.id} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <UserReviews productId={product.id} />
      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}

