import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function FeaturedProduct({ product }: { product: Product }) {
  return (
    <div className="bg-gray-100 p-8 rounded-lg mb-12">
      <h2 className="text-2xl font-semibold mb-4">Featured Product</h2>
      <div className="flex flex-col md:flex-row items-center">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg mb-4 md:mb-0 md:mr-8"
        />
        <div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="space-x-4">
            <Button variant="outline">View Details</Button>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

