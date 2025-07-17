"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid3X3, Sparkles } from "lucide-react"
import { useGetAllCateogry } from "@/src/hooks/category.hooks"
import Link from "next/link"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

interface Category {
  id: string
  name: string
  icon: string
}

const CategorySlider = () => {
  const { data, isLoading, error } = useGetAllCateogry()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data)
    }
  }, [data])

  if (isLoading) {
    return (
      <section className="px-4 py-12 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          {/* Loading skeleton for title */}
          <div className="text-center mb-12">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-80 mx-auto animate-pulse" />
          </div>

          {/* Loading skeleton for categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-3">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 text-lg font-medium">Failed to load categories</div>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Please try again later</p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
      <div>
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Grid3X3 className="w-4 h-4" />
            <span>Shop by Category</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-4">
            All Categories
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our diverse range of categories and find exactly what you&apos;re looking for
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">{categories.length}+ Categories</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">1000+ Products</div>
          </div>
        </div>

        {/* Enhanced Category Slider */}
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
              
            }}
            className="category-slider"
            loop={categories.length > 6}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            slidesPerView={2}
            spaceBetween={16}
            speed={800}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className="!h-auto">
                <Link
                  className="group block transform transition-all duration-300 hover:-translate-y-2"
                  href={`/category/${category.id}`}
                >
                  <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:border-blue-200 dark:group-hover:border-blue-700">
                    {/* Category Icon */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 p-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full relative rounded-xl overflow-hidden">
                        <Image
                          fill
                          alt={category.name}
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          src={category.icon || "/placeholder.svg?height=80&width=80"}
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>

                    {/* Category Name */}
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {category.name}
                      </h3>
                    </div>

                    {/* Hover indicator */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>

          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

      </div>

      {/* Custom Styles */}
      <style >{`
        .category-slider .swiper-slide {
          height: auto;
          display: flex;
        }
        
        .category-slider .swiper-slide > a {
          width: 100%;
        }
      `}</style>
    </section>
  )
}

export default CategorySlider
