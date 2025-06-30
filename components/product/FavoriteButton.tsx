'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function FavoriteButton({ productId }: { productId: string }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const { data } = await supabase
          .from('favorites')
          .select()
          .eq('user_id', user.id)
          .eq('product_id', productId)
        setIsFavorited(data?.length > 0)
      }
    }
    fetchStatus()
  }, [productId])

  const toggleFavorite = async () => {
  if (!userId) return alert('Login dulu ya!')

  const { data: existing, error: checkError } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (checkError) {
    console.error('❌ Error cek favorite:', checkError.message)
    return
  }

  if (existing && existing.length > 0) {
    // Sudah ada, jadi hapus
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (deleteError) console.error('❌ Gagal hapus favorite:', deleteError.message)
    else {
      console.log('✅ Favorite dihapus')
      setIsFavorited(false)
    }
  } else {
    // Belum ada, jadi tambahkan
    const { error: insertError } = await supabase.from('favorites').insert([
      {
        user_id: userId,
        product_id: productId,
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      console.error('❌ Gagal tambah favorite:', insertError.message)
    } else {
      console.log('✅ Favorite ditambahkan')
      setIsFavorited(true)
    }
  }
}
  return (
    <button onClick={toggleFavorite} className="text-2xl ml-4">
      {isFavorited ? '❤️' : '🤍'}
    </button>
  )
}
