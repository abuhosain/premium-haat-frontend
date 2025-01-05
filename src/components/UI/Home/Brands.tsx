'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Card, Image } from '@nextui-org/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'

const brands = [
  { name: 'RIA', logo: 'https://i.ibb.co.com/TrJ1y0t/ria.png' },
  { name: 'DAZ', logo: 'https://i.ibb.co.com/H4TjP3d/daz.jpg' },
  { name: 'ADF', logo: 'https://i.ibb.co.com/h2d1BRH/adf.jpg' },
  { name: 'ABL', logo: 'https://i.ibb.co.com/j440BDQ/abl.png' },
  { name: 'bKash', logo: 'https://i.ibb.co.com/qN86K5d/bkash.png' },
  { name: 'Rocket', logo: 'https://i.ibb.co.com/fdZv9BB/rocekt.jpg' },
]

const BrandSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-b-full">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Our Trusted Partners
          </span>
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          These are the brands we proudly collaborate with.
        </p>
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
          }}
          className="swiper-container"
          loop={true}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <Card
                isHoverable
                isPressable
                className="shadow-lg border transform hover:scale-105 transition-transform rounded-lg p-4 bg-white mx-auto w-40 md:w-auto"
              >
                <div className="flex justify-center items-center w-32 h-32 mx-auto">
                  <Image
                    alt={brand.name}
                    className="rounded-full"
                    height={80}
                    src={brand.logo}
                    width={80}
                  />
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default BrandSection
