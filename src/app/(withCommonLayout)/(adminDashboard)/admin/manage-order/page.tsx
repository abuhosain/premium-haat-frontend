"use client";
import React from "react";
import { useGetAllOrder } from "@/src/hooks/admin.hook";

const OrderPage = () => {
  //   const { data: vendor, isLoading, error } = useGetVendor();
  const { data: order, isLoading, error } = useGetAllOrder();
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
        <table className="min-w-full   rounded-lg shadow-lg">
          <thead className="border-b">
            <tr>
              <th className="text-left px-6 py-3   font-semibold">
                Payment Status
              </th>
              <th className="text-left px-6 py-3   font-semibold">
                Transaction ID
              </th>
              <th className="text-left px-6 py-3   font-semibold">
                User Email
              </th>
              <th className="text-left px-6 py-3   font-semibold">
                V.Name 
              </th>
              <th className="text-left px-6 py-3   font-semibold">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.data?.map((order: any) => (
              <tr key={order.id} className="border-b ">
                <td className="px-6 py-4 ">
                  {order.paymentStatus}
                </td>
                <td className="px-6 py-4 ">{order.txId}</td>
                <td className="px-6 py-4 ">{order.user.email}</td>
                <td className="px-6 py-4 ">{order.vendor.name}</td>
                <td className="px-6 py-4 ">${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
