/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import PHForm from "@/src/components/form/PHForm"
import PHInput from "@/src/components/form/PHInput"
import { useOrderProdcut } from "@/src/hooks/order.hook"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import envConfig from "@/src/config/env.confg"

interface CartItem {
  productId: string
  vendorId: string
  quantity: number
}

const CheckoutPage = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [couponDiscount, setCouponDiscount] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const paymentMethod = "online-payment"

  const { mutate: handleCreateOrder, isSuccess, data } = useOrderProdcut()

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(
      currentCart.map((item: any) => ({
        ...item,
        quantity: item.quantity,
      })),
    )
    const savedCouponDiscount = localStorage.getItem("discount")
    if (savedCouponDiscount) {
      setCouponDiscount(Number(savedCouponDiscount))
    }
  }, [])

  useEffect(() => {
    if (cartItems.length === 0) return
    const fetchProducts = async () => {
      setLoading(true)
      const productIds = cartItems.map((item) => item.productId)
      try {
        const response = await fetch(`${envConfig.baseApi}/product/multiple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        })
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data.data)
      } catch (error) {
        console.error(error)
        toast.error("Failed to fetch products!")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [cartItems])

  useEffect(() => {
    const total = products?.reduce((acc, product, index) => {
      const cartItem = cartItems[index]
      const productPriceAfterProductDiscount = product?.discount
        ? product?.price - (product?.price * product?.discount) / 100
        : product?.price
      return acc + productPriceAfterProductDiscount * (cartItem?.quantity || 1)
    }, 0)
    const finalPrice = total * (1 - couponDiscount / 100)
    setTotalPrice(finalPrice)
  }, [cartItems, products, couponDiscount])

  const onSubmit = async (customerInfo: any) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Cannot place order.")
      return
    }
    const vendorId = cartItems[0].vendorId
    // Prepare order details with customer info included
    const orderDetails = {
      vendorId,
      totalPrice,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: products.find((p) => p.id === item.productId)?.price || 0,
      })),
      customerInfo, // Include customer information
      paymentMethod,
    }

    console.log("Order Details:", orderDetails)
    // Trigger mutation to send data to backend
    handleCreateOrder(orderDetails)
  }

  useEffect(() => {
    if (data && !data?.success) toast.error(data?.message as string)
    if (isSuccess && data?.success) {
      toast.success("Order created successfully")
      window.location.href = data?.data?.payment_url
      console.log(data)
    }
  }, [data, isSuccess, router])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
        {/* Order Summary Section */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center sm:text-left">
            Order Summary
          </h2>
          {loading ? (
            <p className="text-center text-gray-700 dark:text-gray-300">Loading products...</p>
          ) : cartItems.length > 0 && products.length > 0 ? (
            cartItems.map((item, index) => {
              const product = products[index]
              if (!product)
                return (
                  <p key={item.productId} className="text-center text-gray-700 dark:text-gray-300">
                    Product not found
                  </p>
                )
              const productPriceAfterDiscount = product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{product.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400 min-w-[80px] text-right">
                      $ {(productPriceAfterDiscount * item.quantity || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">Your cart is empty.</p>
          )}
        </div>
        {/* Customer Information Section */}
        <div className="md:w-1/3 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center sm:text-left">
            Customer Information
          </h3>
          <PHForm onSubmit={onSubmit}>
            <div className="mb-4">
              <PHInput
                label="Full Name"
                name="name"
               
              />
            </div>
            <div className="mb-4">
              <PHInput
               
                label="Email Address"
                name="email"
                type="email"
              />
            </div>
            <div className="mb-4">
              <PHInput
                label="Phone Number"
                name="phone"
                type="tel"
               
              />
            </div>
            <div className="mb-4">
              <PHInput
                label="Shipping Address"
                name="address"
               
              />
            </div>
            <div className="mt-6">
              <button
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading} // Disable button while products are loading or order is being processed
              >
                Submit Order
              </button>
            </div>
          </PHForm>
        </div>
      </div>
      {/* Checkout Summary */}
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-right">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Total After Discount:</h3>
        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default CheckoutPage
