"use client"

import type React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Award, Shield, Star } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

const brands = [
  { name: "RIA", logo: "https://i.ibb.co.com/TrJ1y0t/ria.png", description: "Financial Services" },
  { name: "DAZ", logo: "https://i.ibb.co.com/H4TjP3d/daz.jpg", description: "Technology Solutions" },
  { name: "ADF", logo: "https://i.ibb.co.com/h2d1BRH/adf.jpg", description: "Digital Innovation" },
  { name: "ABL", logo: "https://i.ibb.co.com/j440BDQ/abl.png", description: "Banking Solutions" },
  { name: "bKash", logo: "https://i.ibb.co.com/qN86K5d/bkash.png", description: "Mobile Financial Services" },
  { name: "Rocket", logo: "https://i.ibb.co.com/fdZv9BB/rocekt.jpg", description: "Payment Gateway" },
]

const BrandSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Trusted Partners</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Our Trusted
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            We collaborate with industry-leading brands to deliver exceptional services and innovative solutions to our
            customers.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">Verified Partners</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="text-sm font-medium">{brands.length}+ Partners</div>
          </div>
        </div>

        {/* Enhanced Brand Slider */}
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 48,
              },
            }}
            className="brand-swiper !pb-8"
            loop={true}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".brand-button-next",
              prevEl: ".brand-button-prev",
            }}
            slidesPerView={1}
            spaceBetween={20}
            speed={1000}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="group transform transition-all duration-500 hover:-translate-y-3">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-700 backdrop-blur-sm">
                    {/* Brand Logo Container */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 p-4 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-full h-full relative">
                          <Image
                            fill
                            alt={`${brand.name} logo`}
                            className="object-contain transition-all duration-500 group-hover:scale-110"
                            src={brand.logo || "/placeholder.svg"}
                          />
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-4 h-4 text-white" />
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    </div>

                    {/* Brand Info */}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {brand.name}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{brand.description}</p>

                      {/* Rating Stars */}
                      <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="brand-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>

          <button className="brand-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 group">
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Interested in Partnership?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Join our network of trusted partners and grow your business with us.
            </p>
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
              <span>Become a Partner</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style >{`
        .brand-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        
        .brand-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </section>
  )
}

export default BrandSection
