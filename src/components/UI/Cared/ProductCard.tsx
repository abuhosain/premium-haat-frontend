'use client'

import { useUser } from "@/src/context/user.provider";
import { getCurrentUser } from "@/src/services/Auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  price: number;
  img: string;
  vendor: {
    id: string;
    name: string;
    logo: string;
  };
}

interface CartItem {
  productId: string;
  vendorId: string;
  quantity: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const isProductInCart = cart.some((item) => item.productId === product.id);
  const currentVendorId = cart[0]?.vendorId;

  const handleAddToCart = () => {
    if (isProductInCart) {
      const updatedCart = cart.map((item) =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product quantity increased in cart!");
    } else {
      if (cart.length > 0 && currentVendorId !== product.vendor.id) {
        toast.error("Only delivered by the same vendor! Clear the cart first.");
      } else {
        const newProduct = { productId: product.id, vendorId: product.vendor.id, quantity: 1 };
        const updatedCart = [...cart, newProduct];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Product added to cart!");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Vendor Name and Logo */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <Image
          alt={product.vendor.name || "Vendor Logo"}
          className="rounded-full"
          height={40}
          src={product.vendor.logo || "/placeholder.svg"}
          width={40}
        />
        <Link
          className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:underline"
          href={`/profile/${product.vendorId}`}
        >
          {product.vendor.name || "Vendor"}
        </Link>
      </div>

      {/* Image Container */}
      <div className="w-full h-48 overflow-hidden">
        <Image
          alt={product.title || "Product Image"}
          className="w-full h-full object-cover"
          height={200}
          src={product.img || "/default-product.png"}
          width={400}
        />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title || "Product Name"}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300 h-16 overflow-hidden text-ellipsis line-clamp-3">
          {product.description || "No description available."}
        </p>
        <p className="mb-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
          ${product.price?.toFixed(2) || "N/A"}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <Link
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-200"
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
          <button
            onClick={handleAddToCart}
            className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

