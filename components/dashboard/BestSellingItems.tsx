import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const bestSellingItems = [
  { id: 1, name: "Premium Wireless Headphones", sales: 1200, image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Smartphone", sales: 950, image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Laptop", sales: 850, image: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Smart Watch", sales: 700, image: "/placeholder.svg?height=50&width=50" },
]

export function BestSellingItems() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Selling Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bestSellingItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.sales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

