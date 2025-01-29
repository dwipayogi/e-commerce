import FeaturedProduct from "./components/FeaturedProduct"
import CategorySection from "./components/CategorySection"

// Dummy data
const featuredProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 19999,
  image: "/placeholder.svg",
  description: "High-quality wireless headphones with noise cancellation technology.",
}

const categories = [
  {
    name: "Electronics",
    products: [
      { id: 2, name: "Smartphone", price: 69999, image: "/placeholder.svg" },
      { id: 3, name: "Laptop", price: 129999, image: "/placeholder.svg" },
    ],
  },
  {
    name: "Clothing",
    products: [
      { id: 4, name: "T-Shirt", price: 2499, image: "/placeholder.svg" },
      { id: 5, name: "Jeans", price: 4999, image: "/placeholder.svg" },
    ],
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      {featuredProduct && <FeaturedProduct product={featuredProduct} />}
      {categories &&
        categories.map((category) => (
          <CategorySection key={category.name} category={category.name} products={category.products} />
        ))}
    </div>
  )
}

