import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen font-poppins overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero/2.jpg"
        alt="Interior"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay konten */}
      <div className="absolute inset-0 flex items-center justify-end px-6 md:px-16">
        <div className="bg-[#FFF3E3] p-6 md:p-12 rounded-md max-w-[700px] shadow-lg">
          <p className="text-s uppercase tracking-wide text-[#333] mb-2 font-semibold">
            New Arrival
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#B88E2F] leading-tight mb-4">
            Discover Our <br />
            New Collection
          </h2>
          <p className="text-sm md:text-base text-gray-800 mb-6 max-w-lg">
           Timeless pieces designed to elevate your everyday living.
          </p>
          <button className="bg-[#B88E2F] text-white px-6 py-3 text-sm font-bold uppercase shadow hover:bg-[#a07822] transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
