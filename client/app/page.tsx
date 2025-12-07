// import Image from "next/image";

import FeaturesSection from "@/components/main/FeaturesSection";
import Footer from "@/components/main/Footer";
import HeroSection from "@/components/main/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
   <>
   <Navbar/>
   <HeroSection/>
   <FeaturesSection/>
   <Footer/>
   </>
  );
}
