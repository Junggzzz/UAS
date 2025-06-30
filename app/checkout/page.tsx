'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [alamat, setAlamat] = useState('')
  const [metode, setMetode] = useState('Transfer Bank')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (!user || error) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('alamat')
        .eq('id', user.id)
        .single()

      const { data: cart } = await supabase
        .from('cart')
        .select('*, products(name, price)')
        .eq('user_id', user.id)

      const selectedCart = JSON.parse(
        typeof window !== 'undefined' ? localStorage.getItem('selected_cart') || '[]' : '[]'
      )

      const filtered = (cart || []).filter(item =>
        selectedCart.some(sel => sel.id === item.id)
      )

      setAlamat(profile?.alamat || '')
      setCartItems(filtered)
      setLoading(false)
    }

    fetchCheckoutData()
  }, [router])

  const handlePay = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('Kamu harus login terlebih dahulu.')
      return
    }

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'Belum Bayar',
        payment_method: metode
      })
      .select()
      .single()

    if (orderError) {
      console.error('❌ Gagal membuat order:', orderError.message)
      alert('Gagal membuat order.')
      return
    }

    // Insert order items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }))

    const { error: itemError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemError) {
      console.error('❌ Gagal insert order_items:', itemError.message)
      alert('Gagal menyimpan item pesanan.')
      return
    }

    // Hapus dari cart
    await supabase
      .from('cart')
      .delete()
      .in('id', cartItems.map(i => i.id))

    // Redirect
    localStorage.removeItem('selected_cart')
    router.push('/success')
  }

  if (loading) return <div className="p-6">Loading...</div>

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  )
  const ongkir = 10000
  const total = subtotal + ongkir

  return (
    <div className="min-h-screen bg-[#F9F1E7] flex justify-center items-center p-6 text-black">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Alamat Pengiriman
        </p>
        <h1 className="text-3xl font-bold text-[#B88E2F] mb-4">
          Checkout Pesananmu
        </h1>
        <p className="text-gray-700 text-sm mb-6">{alamat}</p>

        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Metode Pembayaran
        </p>
        <div className="mb-6">
          <label className="block mb-2">
            <input
              type="radio"
              checked={metode === 'Transfer Bank'}
              onChange={() => setMetode('Transfer Bank')}
              className="mr-2"
            />
            Transfer Bank
          </label>
          <label className="block">
            <input
              type="radio"
              checked={metode === 'COD'}
              onChange={() => setMetode('COD')}
              className="mr-2"
            />
            COD
          </label>
        </div>

        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Ringkasan Pembayaran
        </p>
        <div className="mb-6 text-sm text-gray-700 space-y-1">
          <p>Subtotal: Rp {subtotal.toLocaleString('id-ID')}</p>
          <p>Ongkir: Rp {ongkir.toLocaleString('id-ID')}</p>
          <p className="font-bold text-black">
            Total: Rp {total.toLocaleString('id-ID')}
          </p>
        </div>

        <button
          onClick={handlePay}
          className="uppercase w-full bg-[#B88E2F] text-white py-3 rounded font-semibold hover:bg-yellow-700 transition"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  )
}