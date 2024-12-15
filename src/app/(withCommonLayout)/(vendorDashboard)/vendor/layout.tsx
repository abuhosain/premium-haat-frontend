"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaPlusCircle,
  FaUserEdit,
  FaBook,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Importing from Font Awesome

const CustomerDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Navigation Bar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-30 left-0 bg-white shadow-lg w-64 lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="h-full flex flex-col justify-between p-6 lg:p-8">
          <div>
            {/* Logo or Dashboard Title */}
            <div className="mb-12 flex items-center">
              <FaHome className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-3xl lg:text-4xl font-bold text-gray-800 hidden lg:block">
                Dashboard
              </span>
            </div>
            {/* Navigation Links */}
            <nav className="space-y-8 lg:space-y-12">
              <Link href="/vendor">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaHome className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Dashboard</span>
                </p>
              </Link>

              <Link href="/vendor/create-product">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaPlusCircle className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Create Product</span>
                </p>
              </Link>
              <Link href="/vendor/edit-profile">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserEdit className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Update Vendor</span>
                </p>
              </Link>
              <Link href="/vendor/product">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaBook className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">My Products</span>
                </p>
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full flex flex-col lg:ml-64 ">
        {/* Sidebar Toggle Button for Mobile */}
        <div className="flex justify-between items-center bg-white p-4 shadow-lg lg:hidden z-50">
          <button className="text-gray-700" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <FaTimes className="h-8 w-8" />
            ) : (
              <FaBars className="h-8 w-8" />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Main Content Section */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
