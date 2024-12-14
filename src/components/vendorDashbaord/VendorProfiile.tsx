import Image from "next/image";
import React from "react";

const VendorProfile = () => {
  // Sample data for the vendor profile
  const vendorData = {
    name: "Shop Name",
    logo: "https://via.placeholder.com/150", // Replace with dynamic logo URL
    followers: 1234, // Replace with dynamic follower count
    description:
      "Welcome to our shop! We offer a wide range of quality products to meet your needs.",
    products: 45, // Total products
    reviews: 120, // Total reviews
  };

  return (
    <div className="vendor-profile-page   min-h-screen flex flex-col items-center ">
      {/* Profile Card */}
      <div className="profile-card bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center mb-8">
        {/* Shop Logo */}
        <div className="flex justify-center mb-4">
          <Image
            alt={`${vendorData.name} Logo`}
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
            height={300}
            src={vendorData.logo}
            width={300}
          />
        </div>

        {/* Shop Name */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {vendorData.name}
        </h1>

        {/* Follower Count */}
        <p className="text-gray-600 mb-4">
          <span className="text-lg font-bold text-gray-800">
            {vendorData.followers}
          </span>{" "}
          Followers
        </p>

        {/* Description */}
        <p className="text-gray-700 mb-4">{vendorData.description}</p>

        {/* Stats */}
        <div className="flex justify-between text-center border-t border-gray-200 pt-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {vendorData.products}
            </h3>
            <p className="text-gray-600 text-sm">Products</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {vendorData.reviews}
            </h3>
            <p className="text-gray-600 text-sm">Reviews</p>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="recent-products max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Products
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="product-card bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                alt={`Product ${index + 1}`}
                src="https://via.placeholder.com/150"
                width={150}
                height={150}
                className="object-cover mb-2"
              />
              <h3 className="text-sm font-medium text-gray-700">
                Product {index + 1}
              </h3>
              <p className="text-gray-500 text-xs">Price: $99.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="review-card bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <p className="text-gray-700 text-sm">
                This is a great product! Highly recommend it to everyone.
              </p>
              <p className="text-right text-xs text-gray-500">
                - Customer {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
