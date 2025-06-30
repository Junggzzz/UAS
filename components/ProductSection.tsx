'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

export default function ProductSection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').limit(8)
      if (error) {
        console.error('❌ Gagal ambil produk:', error.message)
        return
      }
      setProducts(data || [])
      setLoading(false)
    }

    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) console.error('❌ Auth error:', error.message)
      else setUserId(user?.id ?? null)
    }

    fetchProducts()
    fetchUser()
  }, [])

  const handleAddToCart = async (productId: string) => {
    if (!userId) {
      alert('Kamu harus login terlebih dahulu.')
      return
    }

    const { error } = await supabase.from('cart').insert([
      {
        user_id: userId,
        product_id: productId,
        quantity: 1,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('❌ Gagal tambah ke cart:', error.message)
      alert(`Gagal menambahkan ke cart:\n${error.message}`)
    } else {
      alert('Produk berhasil ditambahkan ke cart.')
    }
  }

  if (loading) return <div className="p-6 text-gray-600">Loading produk...</div>

  return (
    <section className="py-16 px-4 bg-white text-center font-poppins">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Tombol Show All */}
      <div className="mt-10">
        <button
          onClick={() => router.push('/shoppage')}
          className="bg-[#B88E2F] hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          Show All Products
        </button>
      </div>
    </section>
  )
}