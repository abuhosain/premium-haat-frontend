import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div
      key={product.id}
      className="bg-white dark:bg-black border  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Vendor Name and Logo */}
      <div className="flex items-center p-3 border-b">
        <Image
          alt={product?.vendor?.name || "Vendor Logo"}
          className="rounded-full"
          height={40}
          src={product?.vendor?.logo}
          width={40}
        />

        <Link
          className="ml-3 text-lg font-medium dark:text-white text-gray-700 hover:underline"
          href={`/profile/${product.vendorId}`}
        >
          {product?.vendor?.name || "Vendor"}
        </Link>
      </div>

      {/* Image Container */}
      <div className="w-full border-b h-48 overflow-hidden rounded-b-lg">
        <Image
          alt={product.name || "Product Image"}
          className="w-full h-full object-cover"
          height={200}
          src={product.img || "/default-product.png"} // Fallback to default image
          width={400}
        />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title || "Product Name"}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-white">
          {product.description || "No description available."}
        </p>
        <p className="mb-3 text-lg font-semibold text-blue-700 dark:text-white">
          ${product.price?.toFixed(2) || "N/A"}
        </p>
        <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-auto"
          href={`/product/${product.id}`}
        >
          View Details
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 14 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
