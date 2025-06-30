import Image from 'next/image'

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full md:w-1/2">
      <div className="relative w-full aspect-square bg-[#F9F1E7] rounded">
        <Image src={src} alt={alt} fill className="object-contain rounded" />
      </div>
    </div>
  )
}