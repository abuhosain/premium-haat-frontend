import React from "react";

const CustomerPages = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Customer Dashboard
      </h1>

      {/* Profile Overview */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Profile Overview
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Name: John Doe</p>
          <p className="text-gray-600">Email: john.doe@example.com</p>
          <p className="text-gray-600">Membership: Premium</p>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Recent Orders
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Order #12345</span>
              <span className="text-green-600">Delivered</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Order #12346</span>
              <span className="text-yellow-600">Processing</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Order #12347</span>
              <span className="text-red-600">Cancelled</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Notifications
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul className="list-disc pl-6 text-gray-600">
            <li>Your order #12346 has been shipped.</li>
            <li>Your membership will expire in 5 days.</li>
            <li>A new promotional offer is available for you!</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CustomerPages;
