"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpLeft  } from 'lucide-react';
import { useGetAllCateogry } from "@/src/hooks/category.hooks";
import { Spinner } from "@nextui-org/react";

// Import Swiper styles
import "swiper/css";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  return (
    <button
      aria-label="Previous Slide"
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
      onClick={() => swiper.slidePrev()}
    >
      <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>
  );
};

const SwiperButtonNext = () => {
  const swiper = useSwiper();
  return (
    <button
      aria-label="Next Slide"
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
      onClick={() => swiper.slideNext()}
    >
      <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>
  );
};

const CategorySlider = () => {
  const { data, isLoading } = useGetAllCateogry();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[20vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="relative px-4 py-8 ">
      <h2 className="text-2xl dark:text-white font-bold mb-10 text-center text-gray-800">
        All Categories
      </h2>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        className="mySwiper px-12"
        loop={true}
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
      >
        <SwiperButtonPrev />
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className="flex flex-col items-center justify-center mx-auto mb-4"
          >
            <div className="w-24 h-24 relative mb-2 flex items-center justify-center">
              <Image
                alt={category.name}
                className="rounded-full border-2 border-gray-300 hover:border-blue-500 transition duration-300"
                layout="fill"
                objectFit="cover"
                src={category.icon || "/placeholder.svg"}
              />
            </div>
            <p className="text-md flex font-medium text-center dark:text-white text-gray-700">
              {category.name} <ArrowUpLeft  className="w-6 h-6 text-orange-400 dark:text-gray-300" />
            </p>
          </SwiperSlide>
        ))}
        <SwiperButtonNext />
      </Swiper>
    </div>
  );
};

export default CategorySlider;

