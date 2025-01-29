import ProductCard from "@/app/components/ProductCard"

// Dummy data
const dummyProducts = [
  { id: 2, name: "Smartphone", price: 69999, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Laptop", price: 129999, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "T-Shirt", price: 2499, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Jeans", price: 4999, image: "/placeholder.svg?height=200&width=200" },
]

export default function RelatedProducts({ currentProductId }: { currentProductId: number }) {
  const relatedProducts = dummyProducts.filter((product) => product.id !== currentProductId)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

