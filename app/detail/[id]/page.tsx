import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"

// This would typically come from your database
const getProductById = async (id: string) => {
  // Simulating an API call or database query
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
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
    // Add more products as needed
  ]

  const product = products.find((p) => p.id === id)
  if (!product) {
    notFound()
  }
  return product
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  )
}

