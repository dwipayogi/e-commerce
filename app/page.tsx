import FeaturedProduct from "./components/FeaturedProduct"
import CategorySection from "./components/CategorySection"

// Mock data for demonstration
const featuredProduct = {
  id: "1",
  name: "Premium Wireless Headphones",
  price: 199.99,
  image: "/placeholder.svg?height=400&width=400",
}

const categories = [
  {
    name: "Electronics",
    products: [
      { id: "2", name: "Smartphone", price: 699.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "3", name: "Laptop", price: 1299.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  {
    name: "Clothing",
    products: [
      { id: "4", name: "T-Shirt", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
      { id: "5", name: "Jeans", price: 49.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <FeaturedProduct product={featuredProduct} />
      {categories.map((category) => (
        <CategorySection key={category.name} category={category} />
      ))}
    </div>
  )
}

