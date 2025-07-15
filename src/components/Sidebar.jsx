import React from "react";
import {
  Home,
  ShoppingCart,
  BarChart,
  Package,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
// import SidebarMenuBg from "../assets/img/Login_bg.png";
import SidebarMenuBg from "../assets/img/sidebar_bg.svg";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Inventory", icon: ShoppingCart, path: "/inventory" },
  { name: "Retail", icon: ShoppingCart, path: "/retail" },
  { name: "Quick Commerce", icon: ShoppingCart, path: "/quick-commerce" },
  { name: "Orders & Returns", icon: Package, path: "/orders" },
  { name: "Reports", icon: BarChart, path: "/reports" },
  { name: "Admin", icon: BarChart, path: "/admin" },
];

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      className="h-screen w-60 text-white p-4 flex flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${SidebarMenuBg})`,
      }}
    >
      {/* Top Section */}
      <div>
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={closeSidebar}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-8 text-xl font-semibold">
          <Home className="w-6 h-6 text-white" />
          Ecosoul
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.path}
                key={idx}
                onClick={closeSidebar} // close on mobile nav click
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-red-200 hover:bg-red-400/20"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
