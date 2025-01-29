import { Sidebar } from "@/components/dashboard/Sidebar"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Since we've removed authentication, we'll just render the dashboard for now
  // In a real application, you'd want to implement proper authentication here

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

