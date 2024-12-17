/* eslint-disable react-hooks/rules-of-hooks */
"use client";

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

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(
      currentCart.map((item: any) => ({
        ...item,
        quantity: 1, // Default quantity
      }))
    );
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      const productIds = cartItems.map((item) => item.productId); // Extract productIds from cartItems
      try {
        const response = await fetch("http://localhost:5000/api/v1/product/multiple", {
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
        setProducts(data.data); // Assuming `data.data` is where the product data is stored
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  // Calculate total price
  const calculateTotalPrice = () => {
    return products.reduce((total, product, index) => {
      const cartItem = cartItems[index];
      const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;
      return total + discountedPrice * (cartItem?.quantity || 1);
    }, 0);
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10); // Example 10% discount
      toast.success("Coupon applied successfully!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code!");
    }
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = totalPrice * (1 - discount / 100);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
        {/* Cart Items Section */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Cart</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : cartItems.length > 0 && products.length > 0 ? (
            cartItems.map((item, index) => {
              const product = products[index];
              if (!product) return <p key={item.productId}>Product not found</p>;

              return (
                <div key={item.productId} className="flex items-center space-x-6 p-4 border-b border-gray-300">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg text-gray-800 dark:text-white">Qty: {item.quantity}</span>
                    <span className="text-lg text-primary-500">
                      ${((product.price - product.discount) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700 dark:text-white">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Cart Summary</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg text-gray-800 dark:text-white">Total Price:</span>
              <span className="text-lg font-semibold text-primary-500">${totalPrice.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-lg text-gray-800 dark:text-white">Discount ({discount}%):</span>
                <span className="text-lg font-semibold text-green-500">
                  - ${((totalPrice * discount) / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total After Discount:</span>
              <span className="text-primary-500">${discountedPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Have a Coupon?</h4>
            <div className="flex space-x-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter coupon code"
                value={coupon || ""}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition duration-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
