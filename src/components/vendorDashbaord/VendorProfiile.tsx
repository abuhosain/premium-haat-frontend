"use client";
import { useGetVendor } from "@/src/hooks/vendor.hook";
import Image from "next/image";
import React from "react";

const VendorProfile = () => {
  const { data: vendor } = useGetVendor();

  return (
    <div className="vendor-profile-page flex flex-col items-center">
      {/* Profile Card */}
      <div className="profile-card bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center mb-8">
        {/* Shop Logo */}
        <div className="flex justify-center w-full mb-4">
          <Image
            alt={`${vendor?.data?.name || "Shop"} Logo`}
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
            height={300}
            src={vendor?.data?.logo || "https://via.placeholder.com/150"}
            width={300}
          />
        </div>

        {/* Shop Name */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {vendor?.data?.name || "Shop Name"}
        </h1>

        {/* Follower Count */}
        <p className="text-gray-600 mb-4">
          <span className="text-lg font-bold text-gray-800">
            {vendor?.data?.follow?.length || 0}
          </span>{" "}
          Followers
        </p>

        {/* Description */}
        <p className="text-gray-700 mb-4">
          {vendor?.data?.description ||
            "Welcome to our shop! We offer a wide range of quality products to meet your needs."}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-center border-t border-gray-200 pt-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {vendor?.data?.product?.length || 0}
            </h3>
            <p className="text-gray-600 text-sm">Products</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {vendor?.data?.Order?.length || 0}
            </h3>
            <p className="text-gray-600 text-sm">Orders</p>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="recent-products max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vendor?.data?.product?.length > 0 ? (
            vendor.data.product.slice(0, 4).map((product: any, index: number) => (
              <div
                key={product.id || index}
                className="product-card bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center"
              >
                <Image
                  alt={product.name || "Product Image"}
                  className="object-cover mb-2"
                  height={150}
                  src={product.img || "https://via.placeholder.com/150"}
                  width={150}
                />
                <h3 className="text-sm font-medium text-gray-700">
                  {product.title || "Unnamed Product"}
                </h3>
                <p className="text-gray-500 text-xs">Price: ${product.price || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No products available.
            </p>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        <div className="space-y-4">
          {vendor?.data?.reviews?.length > 0 ? (
            vendor.data.reviews.map((review: any, index: number) => (
              <div
                key={review.id || index}
                className="review-card bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <p className="text-gray-700 text-sm">
                  {review.comment || "No comment provided."}
                </p>
                <p className="text-right text-xs text-gray-500">
                  - {review.customerName || "Anonymous"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No reviews available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
