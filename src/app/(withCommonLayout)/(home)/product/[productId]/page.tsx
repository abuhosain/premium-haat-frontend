/* eslint-disable @next/next/no-img-element */
"use client";
 
import RelatedProduct from "@/src/components/UI/Home/Related";
import { useGetSingleProduct } from "@/src/hooks/product.hooks";
 
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

interface Params {
  productId: string;
}

const ProductDetailsPage = ({ params }: { params: Promise<Params> }) => {
  const { productId } = use(params);
  const { data: product, isLoading } = useGetSingleProduct(productId);

  const [cart, setCart] = useState<any[]>([]);

  // Safely handle localStorage for client-side rendering
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (!product)
    return <div className="text-center py-12">Product not found!</div>;

  const {
    title,
    img,
    quantity,
    description,
    price,
    discount,
    category,
    vendor,
    id,
  } = product?.data;

  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const isProductInCart = cart.some((item: any) => item.productId === id);
  const currentVendorId = cart[0]?.vendorId;

  const handleAddToCart = () => {
    if (isProductInCart) {
      const updatedCart = cart.map((item: any) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product quantity increased in cart!");
    } else {
      if (cart.length > 0 && currentVendorId !== vendor?.id) {
        toast.error("Only delivered by the same vendor! Clear the cart first.");
      } else {
        const newProduct = { productId: id, vendorId: vendor?.id, quantity: 1 };
        const updatedCart = [...cart, newProduct];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Product added to cart!");
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
        <div className="md:w-1/2 flex justify-center">
          <img
            alt={title}
            className="w-full h-auto rounded-lg shadow-xl transform transition duration-500 ease-in-out hover:scale-110"
            src={img}
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-primary-500 rounded-lg">
              {category?.name}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            Quantity:
            <span className="px-3 py-1 text-sm font-semibold">{quantity}</span>
          </div>
          <p className="text-base text-gray-700 dark:text-white mb-6">
            {description}
          </p>
          <div className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Vendor Information
            </h2>
            <Link href={`/profile/${product?.data?.vendorId}`}>
              <p className="text-gray-700 dark:text-white">
                Name:{" "}
                <span className="underline cursor-pointer">{vendor?.name}</span>
              </p>
            </Link>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <span className="text-2xl font-semibold text-primary-500">
              ${discountedPrice.toFixed(2)}
            </span>
            {discount && (
              <>
                <span className="text-lg line-through text-gray-500">
                  ${price.toFixed(2)}
                </span>
                <span className="text-lg text-green-500 font-semibold">
                  {discount}% Off
                </span>
              </>
            )}
          </div>
          <div className="mt-8">
            <button
              className="w-full py-3 bg-primary-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-primary-600 transition duration-300"
              onClick={handleAddToCart}
            >
              {isProductInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Customer Reviews
            </h3>
            {product?.data.review.length > 0 ? (
              product?.data.review.map((rev: any, index: number) => (
                <div
                  key={index}
                  className="mt-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500">
                      {"⭐".repeat(rev.rating)}
                    </span>
                    <p className="font-semibold text-gray-800">
                      {rev.rating}/5
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">{rev.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-4">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="my-4">
        <RelatedProduct />
      </div>
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mt-6">
          {[
            "What is the warranty on this product?",
            "Can I return this product?",
            "Does this product come with free shipping?",
          ].map((question, index) => (
            <Disclosure as="div" key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full text-left py-4 text-lg font-semibold text-gray-800 border-b border-gray-300 focus:outline-none">
                    {question}
                    <span
                      className={`ml-2 ${open ? "transform rotate-180" : ""}`}
                    >
                      &#9660;
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-600 pb-4">
                    {index === 0
                      ? "This product comes with a 1-year warranty covering manufacturing defects."
                      : index === 1
                        ? "Yes, you can return the product within 30 days for a full refund, provided it is in unused condition."
                        : "Yes, we offer free shipping on all orders for this product within the country."}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
