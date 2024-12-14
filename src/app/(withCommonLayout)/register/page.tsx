"use client";

import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-full bg-default-100 md:px-4">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">
        Welcome to Premium Haat
      </h1>
      <div className="grid sm:grid-cols-2 gap-8">
        {/* Create Vendor Section */}
        <div className="p-8 bg-green-300 dark:bg-black  shadow-lg rounded-lg flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4  ">
            Create Vendor
          </h2>
          <p className="  mb-6">
            Register as a vendor to sell your products and grow your business.
          </p>
          <button className="w-full px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">
            <Link href="/register/vendor">Create Vendor</Link>
          </button>
        </div>

        {/* Create Customer Section */}
        <div className="p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Create Customer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Register as a customer to explore and purchase products easily.
          </p>
          <button className="w-full px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-200">
          <Link href="/register/customer">Create Customer</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
