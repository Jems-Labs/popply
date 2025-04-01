import { LayoutDashboard } from "lucide-react"

function DashboardSidebar() {
  return (
    <div className="border-r">

        <ul>
            <li className="flex items-center gap-2 px-4 py-4 hover:bg-secondary">
                <LayoutDashboard />
                <p className="text-xl">Dashboard</p>
            </li>
        </ul>

    </div>
  )
}

export default DashboardSidebar