"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaHome, FaBars, FaTimes, FaClipboardList } from "react-icons/fa";

const CustomerDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { href: "/customer/order", label: "Orders", icon: <FaClipboardList /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
              Customer Panel
            </h2>
            <nav className="space-y-6">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <p className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                    <span className="text-xl">{link.icon}</span>
                    <span className="ml-4 font-medium">{link.label}</span>
                  </p>
                </Link>
              ))}
            </nav>
          </div>

          {/* Close Button (Mobile) */}
          <button
            className="absolute top-4 right-4 lg:hidden"
            onClick={toggleSidebar}
          >
            <FaTimes className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header (Mobile) */}
        <header className="lg:hidden flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaBars className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 bg-white dark:bg-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Premium Haat. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
