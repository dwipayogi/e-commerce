import ProductCard from "@/app/components/ProductCard"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

// This would typically come from your database
const getRelatedProducts = async (currentProductId: string): Promise<Product[]> => {
  // Simulating an API call or database query
  return [
    { id: "2", name: "Smartphone", price: 699.99, image: "/placeholder.svg?height=200&width=200" },
    { id: "3", name: "Laptop", price: 1299.99, image: "/placeholder.svg?height=200&width=200" },
    { id: "4", name: "T-Shirt", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
    { id: "5", name: "Jeans", price: 49.99, image: "/placeholder.svg?height=200&width=200" },
  ].filter((product) => product.id !== currentProductId)
}

export default async function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const relatedProducts = await getRelatedProducts(currentProductId)

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

