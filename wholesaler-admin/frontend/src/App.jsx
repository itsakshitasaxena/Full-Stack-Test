import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AccountsList from "./features/accounts/AccountsList";
import PricingPage from "./features/pricing/PricingPage";
import InventoryList from "./features/inventory/InventoryList";
import OrdersList from "./features/orders/OrdersList";
import CreditList from "./features/credit/CreditList";

export default function App(){
  const [currentPage, setCurrentPage] = React.useState("dashboard");

  const navigation = [
    { name: "Dashboard", href: "dashboard", icon: "📊" },
    { name: "Accounts", href: "accounts", icon: "👥" },
    { name: "Pricing", href: "pricing", icon: "💰" },
    { name: "Inventory", href: "inventory", icon: "📦" },
    { name: "Orders", href: "orders", icon: "📋" },
    { name: "Credits", href: "credits", icon: "💳" },
  ];

  const getPageTitle = () => {
    const page = navigation.find(item => item.href === currentPage);
    return page ? page.name : "Dashboard";
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Overview of your wholesaler operations";
      case "accounts":
        return "Manage account approvals and user access";
      case "pricing":
        return "Configure pricing tiers and strategies";
      case "inventory":
        return "Track and manage product inventory";
      case "orders":
        return "Monitor and update order status";
      case "credits":
        return "Manage customer credit limits";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "accounts":
        return <AccountsList />;
      case "pricing":
        return <PricingPage />;
      case "inventory":
        return <InventoryList />;
      case "orders":
        return <OrdersList />;
      case "credits":
        return <CreditList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar navigation={navigation} currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        <Header title={getPageTitle()} subtitle={getPageSubtitle()} />
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: "Total Accounts", value: "1,234", change: "+12%", changeType: "positive" },
    { label: "Active Orders", value: "89", change: "+5%", changeType: "positive" },
    { label: "Inventory Items", value: "5,678", change: "-2%", changeType: "negative" },
    { label: "Revenue", value: "$45,231", change: "+18%", changeType: "positive" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="stats-value">{stat.value}</div>
            <div className="stats-label">{stat.label}</div>
            <div className={`stats-change ${stat.changeType}`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">New account registered</p>
                <p className="text-xs text-slate-600">Acme Corp - 2 minutes ago</p>
              </div>
              <span className="badge badge-success">Approved</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">Order completed</p>
                <p className="text-xs text-slate-600">Order #1234 - 15 minutes ago</p>
              </div>
              <span className="badge badge-info">Shipped</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">Low inventory alert</p>
                <p className="text-xs text-slate-600">Product XYZ - 1 hour ago</p>
              </div>
              <span className="badge badge-warning">Warning</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-primary">Approve Accounts</button>
            <button className="btn btn-secondary">Update Inventory</button>
            <button className="btn btn-success">Process Orders</button>
            <button className="btn btn-outline">View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}
