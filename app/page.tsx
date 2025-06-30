import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrowseRange from "@/components/browse";
import ProductSection from "@/components/ProductSection";;
import RoomInspirationSection from "@/components/Room";
import FuniroGallery from "@/components/gallery";
import Footer from "@/components/footer";
import FooterCopyright from "@/components/footercopyright";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Furniro</title>
      </Head>
     <Header />
     <HeroSection />
     <BrowseRange />
     <ProductSection />
     <RoomInspirationSection />
     <FuniroGallery />
     <Footer />
     <FooterCopyright />
    </>
  );
}