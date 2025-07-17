"use client"

import Link from "next/link"
import { Store, Users, ChevronRight } from "lucide-react"

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 text-center">
        <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
          Welcome to
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Premium Haat
        </span>
      </h1>

      {/* Registration Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Create Vendor Section */}
        <div className="p-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl flex flex-col items-center text-center border border-slate-200/50 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6 shadow-md">
            <Store className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Create Vendor Account</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Register as a vendor to showcase and sell your products to a wide audience, manage your store, and grow your
            business with ease.
          </p>
          <Link
            className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            href="/register/vendor"
          >
            <span>Become a Vendor</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Create Customer Section */}
        <div className="p-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl flex flex-col items-center text-center border border-slate-200/50 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-6 shadow-md">
            <Users className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Create Customer Account</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Register as a customer to explore a vast collection of products, enjoy seamless shopping, and track your
            orders effortlessly.
          </p>
          <Link
            className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            href="/register/customer"
          >
            <span>Create Customer Account</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
