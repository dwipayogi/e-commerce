import ProductCard from "./ProductCard"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface Category {
  name: string
  products: Product[]
}

export default function CategorySection({ category }: { category: Category }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

