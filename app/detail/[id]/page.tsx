import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"

// Dummy data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 19999,
    description: "High-quality wireless headphones with noise cancellation technology.",
    rating: 4.5,
    reviews: 120,
    stock: 50,
    images: [
      "/placeholder.svg?height=600&width=600&text=Image+1",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
  },
  {
    id: 2,
    name: "Smartphone",
    price: 69999,
    description: "Latest model smartphone with advanced features.",
    rating: 4.7,
    reviews: 250,
    stock: 100,
    images: [
      "/placeholder.svg?height=600&width=600&text=Image+1",
      "/placeholder.svg?height=600&width=600&text=Image+2",
    ],
  },
  // Add more products as needed
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  )
}

