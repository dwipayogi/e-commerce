import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cartUtils"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative w-full aspect-square mb-4">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="rounded-lg object-cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">${(product.price / 100).toFixed(2)}</p>
      <div className="flex justify-between">
        <Link href={`/detail/${product.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <Button size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

