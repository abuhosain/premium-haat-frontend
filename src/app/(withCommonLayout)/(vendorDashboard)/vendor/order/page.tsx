"use client";
import React from "react";
import { useGetVendor } from "@/src/hooks/vendor.hook";

const OrderPage = () => {
  const { data: vendor, isLoading, error } = useGetVendor();
  console.log(vendor);
  // Example order data (replace this with your actual data fetching logic)
  const orders = [
    {
      id: "4a73be96-13d7-4b0a-adad-7fff94a51e64",
      paymentStatus: "UNPAID",
      status: "PENDING",
      totalPrice: 1300,
      txId: "TXN-1734109088560",
      userId: "6dc8575e-b682-45c8-92cf-cca063f563ce",
      vendorId: "6cae3d5f-9f3c-4da5-9cb7-2072416500b4",
    },
  ];

  if (isLoading) {
    return <div className="text-center mt-5">Loading vendor data...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-red-500">
        Error fetching vendor data: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Order Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                Payment Status
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                Transaction ID
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                User ID
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {vendor?.data?.Order.map((order: any) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">
                  {order.paymentStatus}
                </td>
                <td className="px-6 py-4 text-gray-900">{order.txId}</td>
                <td className="px-6 py-4 text-gray-900">{order.userId}</td>
                <td className="px-6 py-4 text-gray-900">${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
