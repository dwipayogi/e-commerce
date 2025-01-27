import { getProducts } from "@/lib/db"
import FeaturedProduct from "./components/FeaturedProduct"
import CategorySection from "./components/CategorySection"

export default async function Home() {
  const products = await getProducts()

  // Assuming the first product is featured
  const featuredProduct = products[0]

  // Group products by category
  const categories = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, typeof products>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      {featuredProduct && <FeaturedProduct product={featuredProduct} />}
      {Object.entries(categories).map(([category, products]) => (
        <CategorySection key={category} category={category} products={products} />
      ))}
    </div>
  )
}

