import { LayoutDashboard, Store, Package, BarChart } from "lucide-react";

interface dashboardSidebarPops {
  tab: string,
  setTab: (tab: string) => void
}
function DashboardSidebar({ tab, setTab }: dashboardSidebarPops) {
  return (
    <div className="w-52">
      <ul className="py-5 space-y-2">
        <li className={`flex items-center gap-3 px-4 py-3 hover:bg-secondary cursor-pointer rounded-lg transition duration-200 ${tab === "dashboard" ? "bg-secondary" : ""}`} onClick={() => setTab("dashboard")}>
          <LayoutDashboard />
          <p className="text-lg font-medium">Dashboard</p>
        </li>
        <li className={`flex items-center gap-3 px-4 py-3 hover:bg-secondary cursor-pointer rounded-lg transition duration-200 ${tab === "shop" ? "bg-secondary" : ""}`} onClick={() => setTab("shop")}>
          <Store />
          <p className="text-lg font-medium">Shop</p>
        </li>
        <li className={`flex items-center gap-3 px-4 py-3 hover:bg-secondary cursor-pointer rounded-lg transition duration-200 ${tab === "products" ? "bg-secondary" : ""}`} onClick={() => setTab("products")}>
          <Package />
          <p className="text-lg font-medium">Products</p>
        </li>
        <li className={`flex items-center gap-3 px-4 py-3 hover:bg-secondary cursor-pointer rounded-lg transition duration-200 ${tab === "analytics" ? "bg-secondary" : ""}`} onClick={() => setTab("analytics")}>
          <BarChart />
          <p className="text-lg font-medium">Analytics</p>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;