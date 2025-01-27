import ProductCard from "./ProductCard"
import type { products } from "@/db/schema"

type Product = typeof products.$inferSelect

export default function CategorySection({ category, products }: { category: string; products: Product[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

