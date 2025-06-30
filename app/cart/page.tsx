'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import CartActions from '@/components/cart/CartActions'
import CartEmptyState from '@/components/cart/CartEmptyState'
import CartHeader from '@/components/cart/CartHeader'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: cartData } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)

      const productIds = cartData?.map((item) => item.product_id) || []

      const { data: products } = await supabase
        .from('products')
        .select('id, name, price, image_url')
        .in('id', productIds)

      const combined = (cartData || []).map((item) => ({
        ...item,
        product: (products || []).find((p) => p.id === item.product_id),
      }))

      setCart(combined.filter(item => item.product))
    }

    fetchCart()
  }, [])

  const handleSelectAllToggle = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cart.map((item) => item.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleQuantityChange = async (id: string, quantity: number) => {
    await supabase.from('cart').update({ quantity }).eq('id', id)
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleDelete = async (id: string) => {
    await supabase.from('cart').delete().eq('id', id)
    setCart((prev) => prev.filter((item) => item.id !== id))
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id))
  }

  const handleCheckout = () => {
    const selectedCartItems = cart.filter((item) => selectedItems.includes(item.id))
    localStorage.setItem('selected_cart', JSON.stringify(selectedCartItems))
    router.push('/checkout')
  }

  const total = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity * item.product.price, 0)

  return (
    <div className="min-h-screen bg-[#F9F1E7] p-6 text-black">
      {cart.length === 0 ? (
        <CartEmptyState onBack={() => router.push('/')} />
      ) : (
        <>
          <CartHeader
            allSelected={selectedItems.length === cart.length}
            onSelectAll={handleSelectAllToggle}
            totalCount={cart.length}
          />

          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                onSelect={() => toggleSelect(item.id)}
                onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>

          <CartSummary total={total} />

          <CartActions
            onBack={() => router.push('/')}
            onCheckout={handleCheckout}
            disabled={selectedItems.length === 0}
          />
        </>
      )}
    </div>
  )
}