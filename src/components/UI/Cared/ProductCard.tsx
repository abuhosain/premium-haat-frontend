'use client'

import { useUser } from "@/src/context/user.provider"; 
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Heart, ShoppingCart, Eye } from 'lucide-react';

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    // Simulating wishlist check
    setIsWishlisted(Math.random() > 0.5);
  }, []);

  const isProductInCart = cart.some((item) => item.productId === product.id);
  const currentVendorId = cart[0]?.vendorId;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

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

  const handleToggleWishlist = () => {
    if (!user) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Vendor Name and Logo */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <Image
          alt={product.vendor.name || "Vendor Logo"}
          className="rounded-full border border-gray-300 dark:border-gray-600"
          height={40}
          src={product.vendor.logo || "/placeholder.svg"}
          width={40}
        />
        <Link
          className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-200 hover:underline transition-colors duration-200"
          href={`/profile/${product.vendorId}`}
        >
          {product.vendor.name || "Vendor"}
        </Link>
      </div>

      {/* Image Container */}
      <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          alt={product.title || "Product Image"}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          layout="fill"
          src={product.img || "/default-product.png"}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {product.title || "Product Name"}
          </h5>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 h-12 overflow-hidden text-ellipsis line-clamp-2">
            {product.description || "No description available."}
          </p>
        </div>
        <div className="mt-auto">
          <p className="mb-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price?.toFixed(2) || "N/A"}
          </p>
          <div className="flex justify-between items-center gap-2">
            <Link
              className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              href={`/product/${product.id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
            <button
              className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

