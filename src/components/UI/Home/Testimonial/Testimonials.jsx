"use client";

import { useCallback, useState } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const slides = [
  {
    img: "/testimonial/img-1.png",
    name: "John Doe",
    message:
      "This service is amazing. I am very satisfied with the quality of the service. I will recommend this to my friends.",
  },
  {
    img: "/testimonial/img-2.png",
    name: "Jonny Doe",
    message:
      "He is a great guy. His work is amazing. I am very satisfied with the quality of the service. I will recommend this to my friends.",
  },
  {
    img: "/testimonial/img-3.png",
    name: "Yash Doe",
    message:
      "Highly recommended. I am very satisfied with the quality of the service. I will recommend this to my friends.",
  },
  {
    img: "/testimonial/img-4.png",
    name: "Marry Berry",
    message:
      "Must try this service. I am very satisfied with the quality of the service. I will recommend this to my friends.",
  },
  {
    img: "/testimonial/img-5.png",
    name: "Leo Max",
    message:
      "The service is amazing. You should try this service. I am very satisfied with the quality of the service. I will recommend this to my friends.",
  },
];

const Testimonials = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Client Feedback</h2>
        <p className="text-lg text-gray-600 mb-12">
          Hear what our clients have to say about our services.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <ImQuotesLeft className="text-6xl text-accent/30 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {slides[activeSlide].name}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              {slides[activeSlide].message}
            </p>
            <div className="flex gap-4">
              <button
                className="text-lg bg-blue-500 w-12 h-12 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-all duration-300"
                onClick={handlePrevious}
              >
                <FiArrowLeft />
              </button>
              <button
                className="text-lg bg-blue-500 w-12 h-12 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-all duration-300"
                onClick={handleNext}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-2/3">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
              loop={true}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              onSwiper={setSwiperRef}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="select-none">
                  <div
                    className={`transition-transform duration-500 shadow-lg rounded-lg p-6 bg-white border flex flex-col items-center justify-center gap-4 transform 
                    ${activeSlide === index ? "scale-105" : "scale-100"}`}
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                      <Image
                        src={slide.img}
                        alt={slide.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {slide.name}
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      {slide.message}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
