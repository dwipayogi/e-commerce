"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserReviews from "./UserReviews"
import RelatedProducts from "./RelatedProducts"
import type { products } from "@/db/schema"

type Product = typeof products.$inferSelect

export default function ProductDetail({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % (product.images?.length || 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={product.images?.[currentImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {(product.images?.length || 0) > 1 && (
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
              <div className="flex justify-center mt-4 gap-2">
                {product.images?.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${index === currentImage ? "bg-blue-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </>
          )}
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
                  className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating?.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>
          <p className="mb-4">
            Stock: <span className="font-semibold">{product.stock}</span>
          </p>
          <Button className="w-full sm:w-auto">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <UserReviews productId={product.id} />
      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}

