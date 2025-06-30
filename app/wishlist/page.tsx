'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Header from '@/components/Header'

export default function WishlistPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setFavorites([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('product:product_id(*)')
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Gagal mengambil wishlist:', error.message)
      } else {
        setFavorites(data.map((fav) => fav.product))
      }

      setLoading(false)
    }

    fetchFavorites()
  }, [])

  const handleAddToCart = (productId: string) => {
    alert(`Produk ${productId} ditambahkan ke keranjang!`)
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white px-4 md:px-10 py-12 font-poppins">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Wishlist</h1>

          {loading ? (
            <p className="text-gray-500">Memuat produk favorit...</p>
          ) : favorites.length === 0 ? (
            <p className="text-gray-500">Kamu belum menambahkan produk favorit.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}