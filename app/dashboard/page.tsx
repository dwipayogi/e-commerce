import { TotalRevenue } from "@/components/dashboard/TotalRevenue"
import { SalesChart } from "@/components/dashboard/SalesChart"
import { VisitorChart } from "@/components/dashboard/VisitorChart"
import { BestSellingItems } from "@/components/dashboard/BestSellingItems"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <TotalRevenue />
        <SalesChart />
        <VisitorChart />
        <BestSellingItems />
      </div>
    </div>
  )
}

