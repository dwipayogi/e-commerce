import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useAuth()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg mb-4 mx-auto"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      <div className="flex justify-between">
        <Link href={`/detail/${product.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <Button size="sm" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

