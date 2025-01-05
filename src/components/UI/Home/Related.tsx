"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required Swiper modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useGetAllProducts } from "@/src/hooks/product.hooks";
import ProductCard from "../Cared/ProductCard";

const RelatedProduct = () => {
  const { data: products } = useGetAllProducts();

  return (
    <div className="px-4 py-8 ">
      {/* Section Title */}
      <h3 className="text-3xl font-bold text-left text-gray-800 mb-8">
        Related Products
      </h3>

      {/* Swiper Section */}
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="mySwiper"
        cssMode={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        mousewheel={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={16}
      >
        {products?.data?.data.map((product: any, index: number) => (
          <SwiperSlide key={`${product.id}-${index}`} className="">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProduct;
