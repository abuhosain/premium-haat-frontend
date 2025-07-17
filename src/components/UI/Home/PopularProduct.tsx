"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { useGetAllProducts } from "@/src/hooks/product.hooks";
import ProductCard from "../Cared/ProductCard";
import { ChevronLeft, ChevronRight, TrendingUp, Star } from "lucide-react";
import Link from "next/link";

const PopularProduct = () => {
  const { data: products, isLoading, error } = useGetAllProducts();

  if (isLoading) {
    return (
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading skeleton for title */}
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Loading skeleton for cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-200 dark:bg-slate-700 rounded-xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="text-red-500 text-lg font-medium">
            Failed to load popular products
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const popularProducts = products?.data?.data?.slice(0, 8) || [];

  return (
    <section className="px-4 pb-16 pt-4 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900">
      <div className="">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-4">
            Popular Products
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover our most loved products, handpicked by thousands of
            satisfied customers
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-sm font-medium">4.8+ Rating</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {popularProducts.length}+ Products
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              1000+ Reviews
            </div>
          </div>
        </div>

        {/* Enhanced Swiper */}
        <div className="relative">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            className="popular-products-swiper !pb-12"
            cssMode={false}
            loop={popularProducts.length > 4}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            mousewheel={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            slidesPerView={1.2}
            spaceBetween={16}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
          >
            {popularProducts.map((product: any, index: number) => (
              <SwiperSlide key={`${product.id}-${index}`} className="h-auto">
                <div className="transform transition-all duration-300 hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/product">
            {" "}
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
              <span>View All Products</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .popular-products-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .popular-products-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgb(148 163 184);
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .popular-products-swiper .swiper-pagination-bullet-active {
          background: rgb(59 130 246);
          opacity: 1;
          transform: scale(1.2);
        }
        
        .popular-products-swiper .swiper-pagination-bullet-active-main {
          background: rgb(59 130 246);
        }
        
        .popular-products-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        
        .popular-products-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default PopularProduct;
