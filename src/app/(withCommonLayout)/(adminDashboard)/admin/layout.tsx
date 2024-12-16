"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaUserEdit,
  FaBook,
  FaBars,
  FaTimes,
  FaUserAltSlash,
  FaUserCheck,
  FaUserInjured,
} from "react-icons/fa"; // Importing from Font Awesome

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen mt-3">
      {/* Side Navigation Bar */}
      <aside
        className={`fixed inset-y-0 md:mt-14 z-50 left-0 border-r bg-white dark:bg-black shadow-lg w-64 lg:w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between p-6 lg:p-8">
          <div>
            {/* Navigation Links */}
            <nav className="space-y-8 lg:space-y-12">
              <Link href="/admin">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaHome className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Home</span>
                </p>
              </Link>
              <hr />
              <Link href="/admin/manage-order">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserCheck className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Order History</span>
                </p>
              </Link>
              <hr />
              <Link href="/admin/manage-users">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserEdit className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Manage Users</span>
                </p>
              </Link>
              <hr />
              <Link href="/admin/manage-vendor">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserInjured className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Manage Vendor</span>
                </p>
              </Link>
              <hr />
              <Link href="/admin/manage-category">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaBook className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="hidden ml-3 lg:block">Manage Category</span>
                </p>
              </Link>
              <hr />
              <Link href="/admin/create-category">
                <p className="flex mt-3 items-center  hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserAltSlash className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Create Category</span>
                </p>
              </Link>
            </nav>
          </div>
        </div>

        {/* Close Button on Mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden  z-50"
          onClick={toggleSidebar}
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="w-full lg:ml-72">
        {/* Header on Mobile */}
        <header className="lg:hidden flex justify-between items-center bg-white dark:bg-black p-4 shadow-md">
          <h1 className="text-2xl font-bold ">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaBars className="h-6 w-6 " />
          </button>
        </header>

        {/* Main Content Section */}
        <main className="p-4">{children}</main>
      </div>

    </div>
  );
};

export default AdminDashboardLayout;
