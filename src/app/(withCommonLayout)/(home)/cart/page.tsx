/* eslint-disable @next/next/no-img-element */
"use client";

import envConfig from "@/src/config/env.confg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // For notifications

interface CartItem {
  productId: string;
  vendorId: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Load cart and discount from localStorage
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(
      currentCart.map((item: any) => ({
        ...item,
        quantity: item.quantity, // Default quantity
      }))
    );
    const savedDiscount = localStorage.getItem("discount");
    if (savedDiscount) {
      setDiscount(Number(savedDiscount));
    }
  }, []);

  // Fetch product details based on cart items
  useEffect(() => {
    if (cartItems.length === 0) return;
    const fetchProducts = async () => {
      setLoading(true);
      const productIds = cartItems.map((item) => item.productId);
      try {
        const response = await fetch(`${envConfig.baseApi}/product/multiple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [cartItems]);

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return products.reduce((total, product, index) => {
      const cartItem = cartItems[index];
      const productPriceAfterDiscount = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;
      return total + productPriceAfterDiscount * (cartItem?.quantity || 1);
    }, 0);
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10); // Apply 10% discount
      localStorage.setItem("discount", "10"); // Save discount to localStorage
      toast.success("Coupon applied successfully!");
    } else {
      setDiscount(0); // Reset discount
      localStorage.removeItem("discount"); // Remove discount from localStorage
      toast.error("Invalid coupon code!");
    }
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = totalPrice * (1 - discount / 100);

  // Handle quantity change
  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    // Update the state with the new cart items
    setCartItems(updatedCartItems);
    // Update localStorage with the new cart state
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  // Handle product removal from cart
  const handleRemoveProduct = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
        {/* Cart Items Section */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center sm:text-left">
            Your Cart
          </h2>
          {loading ? (
            <p className="text-center text-gray-700 dark:text-gray-300">
              Loading products...
            </p>
          ) : cartItems.length > 0 && products.length > 0 ? (
            cartItems.map((item, index) => {
              const product = products[index];
              if (!product)
                return (
                  <p
                    key={item.productId}
                    className="text-center text-gray-700 dark:text-gray-300"
                  >
                    Product not found
                  </p>
                );
              return (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row items-center md:space-x-6 p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4"
                >
                  <img
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    src={product.img || "/placeholder.svg"}
                  />
                  <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-x-4 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="text-lg text-gray-800 dark:text-white">
                        Qty: {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400 min-w-[80px] text-right">
                      ${" "}
                      {(
                        (product.price - (product?.discount || 0)) *
                        item.quantity
                      ).toFixed(2)}
                    </span>

                    <button
                      className="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => handleRemoveProduct(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">
              Your cart is empty.
            </p>
          )}
        </div>
        {/* Cart Summary Section */}
        <div className="md:w-1/3 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center sm:text-left">
            Cart Summary
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg text-gray-800 dark:text-gray-200">
                Total Price:
              </span>
              <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-lg text-gray-800 dark:text-gray-200">
                  Discount ({discount}%):
                </span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  - ${((totalPrice * discount) / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white">
                Total After Discount:
              </span>
              <span className="text-primary-600 dark:text-primary-400">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
          </div>
          {/* Coupon Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Have a Coupon?
            </h4>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-gray-900"
                placeholder="Enter coupon code"
                type="text"
                value={coupon || ""}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            <Link href={"/checkout"} className="block w-full">
              <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
