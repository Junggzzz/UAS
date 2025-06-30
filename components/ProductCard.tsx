'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent } from 'react'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

const badgeColor = (tag?: string) => {
  if (tag?.includes('%')) return 'bg-red-500'
  if (tag === 'New') return 'bg-teal-500'
  return 'bg-gray-400'
}

type ProductCardProps = {
  product: any
  onAddToCart: (productId: string) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  if (!product || !product.id) return null

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product.id)
  }

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
        {(product.tag || product.is_new) && (
          <span
            className={`absolute top-3 right-3 z-20 px-3 py-1 text-xs font-semibold text-white rounded-full bg-opacity-90 ${
              product.tag ? badgeColor(product.tag) : 'bg-teal-500'
            }`}
          >
            {product.tag ? product.tag : 'New'}
          </span>
        )}

        <div className="relative aspect-[4/5] w-full z-10">
          <Image
            src={product.image_url || '/placeholder.png'}
            alt={product.name || 'Produk'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
          <div className="absolute inset-0 z-30 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-3 text-white">
            <button
              onClick={handleAdd}
              className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200"
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="p-4 text-left">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-black font-semibold text-sm">
              {formatPrice(product.price || 0)}
            </span>
            {product.old_price && product.old_price > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.old_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}