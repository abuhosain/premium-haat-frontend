"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";
import { Spinner } from "@nextui-org/react";

const CategorySlider = () => {
  const { data, isLoading } = useGetAllCateogry();
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setCategory(data?.data || []);
    }
  }, [data]);

  if (isLoading) return <div className="flex justify-center items-center h-[20vh] "> <Spinner size="lg" /></div>;
  return (
    <div className="relative px-4 py-8">
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
        All Category
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
        className="mySwiper px-6"
        loop={true}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={2}
        spaceBetween={16}
      >
        {category.map((c) => (
          <SwiperSlide
            key={c.id}
            className="flex flex-col items-center justify-center mx-auto ml-2 mb-4"
          >
            <div className="w-24 h-24 relative mb-2 flex items-center justify-center">
              <Image
                alt={c.name}
                className="rounded-full border-2 border-gray-300 hover:border-blue-500 transition duration-300"
                layout="fill"
                objectFit="cover"
                src={c.icon}
              />
            </div>
            <p className="text-sm font-medium ml-7   text-gray-700">{c.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-16">
        {/* Navigation Buttons */}
        <div
          aria-label="Previous Slide"
          className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center mt-6"
        >
          <ChevronLeft className="w-10 h-10 text-gray-600 hover:text-gray-800 transition duration-300" />
        </div>
        <div
          aria-label="Next Slide"
          className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center"
        >
          <ChevronRight className="w-10 h-10 text-gray-600 hover:text-gray-800 transition duration-300" />
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
