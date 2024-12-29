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
        const response = await fetch(
          `${envConfig.baseApi}/product/multiple`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productIds }),
          }
        );

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
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
        {/* Cart Items Section */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
            Your Cart
          </h2>
          {loading ? (
            <p className="text-center text-gray-700 dark:text-white">
              Loading products...
            </p>
          ) : cartItems.length > 0 && products.length > 0 ? (
            cartItems.map((item, index) => {
              const product = products[index];
              if (!product)
                return <p key={item.productId}>Product not found</p>;

              return (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row items-center md:space-x-6 p-4 border-b  border"
                >
                  <img
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    src={product.img}
                  />
                  <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-x-4 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
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
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
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
                    <span className="text-lg text-primary-500">
                      $
                      {(
                        (product.price - (product.discount || 0)) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                    <button
                      className="mt-4 md:mt-0 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleRemoveProduct(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700 dark:text-white">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="md:w-1/3 p-6 bg-gray-50 dark:bg-black border rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
            Cart Summary
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg text-gray-800 dark:text-white">
                Total Price:
              </span>
              <span className="text-lg font-semibold text-primary-500">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-lg text-gray-800 dark:text-white">
                  Discount ({discount}%):
                </span>
                <span className="text-lg font-semibold text-green-500">
                  - ${((totalPrice * discount) / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total After Discount:</span>
              <span className="text-primary-500">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              Have a Coupon?
            </h4>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter coupon code"
                type="text"
                value={coupon || ""}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="w-full sm:w-auto px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition duration-300"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            <Link href={"/checkout"} >
              <button className="w-full mt-3 sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
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
