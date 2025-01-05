import BrandSection from "@/src/components/UI/Home/Brands";
import CategorySlider from "@/src/components/UI/Home/CategorySlider";
import HeroSection from "@/src/components/UI/Home/Hero";
import PopularProduct from "@/src/components/UI/Home/PopularProduct";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySlider />
      <PopularProduct />
      <BrandSection />
    </div>
  );
}
