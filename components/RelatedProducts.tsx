import ProductCard from "@/app/components/ProductCard"
import { getProducts } from "@/lib/db"
import type { products } from "@/db/schema"

type Product = typeof products.$inferSelect

export default async function RelatedProducts({ currentProductId }: { currentProductId: number }) {
  const allProducts = await getProducts()
  const relatedProducts = allProducts.filter((product) => product.id !== currentProductId).slice(0, 4) // Limit to 4 related products

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

