"use client";

import AdminProfileDetails from "@/src/components/UI/adminDashboard/AdminProdileDetails";
import { useUser } from "@/src/context/user.provider";
import Link from "next/link";
import {
  FaUsers,
  FaClipboardList,
  FaChartPie,
  FaPlusCircle,
} from "react-icons/fa"; // Importing icons

export default function UserDashboard() {
  // const { data: user, isLoading, error } = useGetAuthUser();
  const { user } = useUser();

  // Sample statistics for demonstration
  const stats = {
    totalUsers: 15,
    totalProduct: 35,
    pendingApprovals: 5,
  };

  return (
    <div className="p-6">
      {user ? (
        <div>
          {/* Welcome Banner */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {/* Welcome, {user.data.name}! */}
            </h2>
            <p className="text-gray-600">
              Here’s what’s happening in your dashboard.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FaUsers className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.totalUsers}</h3>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FaClipboardList className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.totalProduct}</h3>
                <p className="text-gray-600">Total Product</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FaChartPie className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.pendingApprovals}</h3>
                <p className="text-gray-600">Pending Order</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">
              <FaPlusCircle className="h-6 w-6 mr-2" />
              <Link href={"/admin/create-category"}>
                {" "}
                <span>Add New Category</span>
              </Link>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">
              <FaUsers className="h-6 w-6 mr-2" />
              <Link href={"/admin/manage-users"}>
                {" "}
                <span>Manage User</span>
              </Link>
            </div>
          </div>

          {/* User Profile Details */}
          <AdminProfileDetails user={user} />
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}
