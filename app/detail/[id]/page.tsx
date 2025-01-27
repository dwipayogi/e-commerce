import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { getProductById } from "@/lib/db"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  )
}

