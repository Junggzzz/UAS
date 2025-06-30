'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import FavoriteButton from './FavoriteButton'
import Header from '@/components/Header'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error) console.error('❌ Gagal ambil produk:', error.message)
      else setProduct(data)
      setLoading(false)
    }

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)
    }

    if (id) {
      fetchProduct()
      fetchUser()
    }
  }, [id])

  const handleAddToCart = async () => {
    if (!userId) {
      alert('Kamu harus login terlebih dahulu.')
      return
    }

    const { data: existing, error: fetchError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', product.id)
      .single()

    if (existing) {
      const newQty = existing.quantity + quantity
      await supabase.from('cart').update({ quantity: newQty }).eq('id', existing.id)
      alert('Jumlah produk di keranjang diperbarui.')
    } else {
      await supabase.from('cart').insert([{ user_id: userId, product_id: product.id, quantity }])
      alert('Produk berhasil ditambahkan ke keranjang!')
    }
  }

  if (loading) return <div className="p-6">Memuat produk...</div>
  if (!product) return <div className="p-6">Produk tidak ditemukan.</div>

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Header />
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image_url || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="text-gray-800">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-black">{formatPrice(product.price)}</span>
            {product.old_price && product.old_price > product.price && (
              <span className="line-through text-gray-400">{formatPrice(product.old_price)}</span>
            )}
          </div>

          <p className="mb-4">{product.description}</p>
          <p className="text-sm text-gray-600 mb-6">Stok: {product.stock ?? 0}</p>

          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 border rounded">-</button>
            <span className="min-w-[20px] text-center">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 border rounded">+</button>
          </div>

          <button onClick={handleAddToCart} className="bg-[#B88E2F] text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
            Add to Cart
          </button>

          <div className="mt-6">
            <FavoriteButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}