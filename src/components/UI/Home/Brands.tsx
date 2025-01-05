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
    <section className="py-12 bg-gray-50 rounded-b-full">
      <div className="container mx-auto px-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Trusted Partners</h2>
        <Swiper
          autoplay={{
            delay: 2500,
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
              slidesPerView: 5,
            },
          }}
          loop={true}
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          className='bg-white'
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <Card
                isHoverable
                isPressable
                className="flex bg-white items-center justify-center   h-32 w-full"
              >
                <Image
                  alt={brand.name}
                  className="object-contain rounded-full max-h-full max-w-full  "
                  height={100}
                  src={brand.logo}
                  width={100}
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default BrandSection

