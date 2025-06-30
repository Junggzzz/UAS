'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import FilterBar from '@/components/FilterBar'
import Footer from './footer'
import FooterCopyright from './footercopyright'

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

export default function ProductAll() {
  const [products, setProducts] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [showCount, setShowCount] = useState(12)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: productData } = await supabase.from('products').select('*')
      setProducts(productData || [])
      setFiltered(productData || [])

      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    let sorted = [...products]

    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price)
    }

    setFiltered(sorted.slice(0, showCount))
  }, [sortBy, showCount, products])

  const handleAddToCart = async (productId: string) => {
    if (!userId) {
      alert('Kamu harus login terlebih dahulu.')
      return
    }

    const { data: product } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single()

    if (product?.stock === 0) {
      alert('Stok produk habis.')
      return
    }

    const { data: existing, error: fetchError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('❌ Gagal cek cart:', fetchError.message)
      alert('Terjadi kesalahan.')
      return
    }

    if (existing) {
      const newQty = existing.quantity + 1
      const { error: updateError } = await supabase
        .from('cart')
        .update({ quantity: newQty })
        .eq('id', existing.id)

      if (updateError) {
        console.error('❌ Gagal update cart:', updateError.message)
        alert('Gagal menambahkan ke cart.')
      } else {
        alert('Jumlah produk di cart diperbarui.')
      }
    } else {
      const { error: insertError } = await supabase
        .from('cart')
        .insert([{
          user_id: userId,
          product_id: productId,
          quantity: 1,
          created_at: new Date().toISOString(),
        }])

      if (insertError) {
        console.error('❌ Gagal insert ke cart:', insertError.message)
        alert('Gagal menambahkan ke cart.')
      } else {
        alert('Produk berhasil ditambahkan ke cart.')
      }
    }
  }

  return (
    <>
      <section id="ProductAll" className="py-16 px-4 bg-white text-center font-poppins">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">All Products</h2>
        <FilterBar
          total={products.length}
          onShowChange={(val) => setShowCount(val)}
          onSortChange={(val) => setSortBy(val)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8">
          {filtered.map((p) => {
            const outOfStock = Number(p.stock) === 0

            const content = (
              <>
                {p.tag && (
                  <span className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center text-[10px] font-semibold text-white rounded-full bg-opacity-90 ${badgeColor(p.tag)}`}>
                    {p.tag}
                  </span>
                )}
                {outOfStock && (
                  <span className="absolute top-3 left-3 z-20 px-2 py-1 bg-gray-700 text-white text-[10px] font-semibold rounded">
                    Out of Stock
                  </span>
                )}
                <div className="relative aspect-[4/5] w-full z-10 overflow-hidden">
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className={`object-cover transition ${outOfStock ? 'grayscale blur-sm opacity-60' : ''}`}
                  />
                  {!outOfStock && (
                    <div className="absolute inset-0 z-30 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-3 text-white">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAddToCart(p.id)
                        }}
                        className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200"
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{p.description}</p>
                  <p className="mt-2 font-semibold text-gray-800 text-sm">
                    {formatPrice(p.price)}
                    {p.old_price && (
                      <span className="text-gray-400 line-through ml-2">{formatPrice(p.old_price)}</span>
                    )}
                  </p>
                </div>
              </>
            )

            return outOfStock ? (
              <div
                key={p.id}
                className="relative group bg-white border rounded-md overflow-hidden shadow-sm cursor-not-allowed opacity-70"
              >
                {content}
              </div>
            ) : (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition block"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </section>
      <Footer />
      <FooterCopyright />
    </>
  )
}