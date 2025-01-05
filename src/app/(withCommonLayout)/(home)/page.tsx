import BrandSection from "@/src/components/UI/Home/Brands";
import CategorySlider from "@/src/components/UI/Home/CategorySlider";
import HeroSection from "@/src/components/UI/Home/Hero";
import Map from "@/src/components/UI/Home/Map/Map";
import PopularProduct from "@/src/components/UI/Home/PopularProduct";
import Testimonials from "@/src/components/UI/Home/Testimonial/Testimonials";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySlider />
      <PopularProduct />
      <Testimonials />
      <Map />
      <BrandSection />
    </div>
  );
}
