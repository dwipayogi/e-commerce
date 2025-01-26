import { Sidebar } from "@/components/dashboard/Sidebar"
import { redirect } from "next/navigation"
import { useAuth } from "../context/AuthContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  if (!user || !user.isAdmin) {
    redirect("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

