"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const slides = [
  { image: 'https://i.ibb.co.com/cC8fm25/1.jpg' },
  { image: 'https://i.ibb.co.com/MNv1HhJ/2.jpg' },
  { image: 'https://i.ibb.co.com/1K6JnsZ/3.jpg' }
]

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-[500px] w-full"
        effect="fade"
        loop={true}
        modules={[EffectFade, Pagination, Autoplay]}
        pagination={{ clickable: true, dynamicBullets: true }}
        speed={1000}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-5000 ease-in-out"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSection

