import { supabase } from '@/lib/supabase'

export const addToCart = async (user_id: string, product_id: string, quantity: number) => {
  // Cek apakah produk sudah ada di cart user
  const { data: existing, error: fetchError } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 artinya "No rows found" → ini bukan error fatal
    console.error('❌ Gagal fetch cart:', fetchError.message)
    return
  }

  if (existing) {
    // Produk sudah ada → update quantity
    const newQty = existing.quantity + quantity
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity: newQty })
      .eq('id', existing.id)

    if (updateError) {
      console.error('❌ Gagal update cart:', updateError.message)
    }
  } else {
    // Produk belum ada → insert baru
    const { error: insertError } = await supabase
      .from('cart')
      .insert([{ user_id, product_id, quantity }])

    if (insertError) {
      console.error('❌ Gagal insert ke cart:', insertError.message)
    }
  }
}