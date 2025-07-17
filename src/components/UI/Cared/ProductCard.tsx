"use client"

import { useUser } from "@/src/context/user.provider"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"

interface Product {
  id: string
  vendorId: string
  title: string
  description: string
  price: number
  img: string
  vendor: {
    id: string
    name: string
    logo: string
  }
}

interface CartItem {
  productId: string
  vendorId: string
  quantity: number
}

const ProductCard = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    // Simulating wishlist check
    setIsWishlisted(Math.random() > 0.5)
  }, [])

  const isProductInCart = cart.some((item) => item.productId === product.id)
  const currentVendorId = cart[0]?.vendorId

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.")
      return
    }

    if (isProductInCart) {
      const updatedCart = cart.map((item) =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success("Product quantity increased in cart!")
    } else {
      if (cart.length > 0 && currentVendorId !== product.vendor.id) {
        toast.error("Only delivered by the same vendor! Clear the cart first.")
      } else {
        const newProduct = { productId: product.id, vendorId: product.vendor.id, quantity: 1 }
        const updatedCart = [...cart, newProduct]
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        toast.success("Product added to cart!")
      }
    }
  }

  const handleToggleWishlist = () => {
    if (!user) {
      toast.error("Please log in to manage your wishlist.")
      return
    }
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist")
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
      {/* Vendor Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-600/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              alt={product.vendor.name || "Vendor Logo"}
              className="rounded-full ring-2 ring-white dark:ring-slate-600 shadow-sm"
              height={28}
              src={product.vendor.logo || "/placeholder.svg"}
              width={28}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
          </div>
          <Link
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            href={`/profile/${product.vendorId}`}
          >
            {product.vendor.name || "Vendor"}
          </Link>
        </div>
        <div className="flex items-center space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" />
          ))}
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">4.8</span>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
        <Image
          alt={product.title || "Product Image"}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          fill
          src={product.img || "/default-product.png"}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`w-3.5 h-3.5 ${isWishlisted ? "text-red-500 fill-current" : "text-slate-600 dark:text-slate-300"}`}
            />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
          </Link>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-2 left-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-lg">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            ${product.price?.toFixed(2) || "N/A"}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
            {product.title || "Product Name"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Features/Tags */}
        <div className="flex flex-wrap gap-1">
          <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            Premium
          </span>
          <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
            Fast Delivery
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-3">
          <button
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="text-sm">{isProductInCart ? "Add More" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
