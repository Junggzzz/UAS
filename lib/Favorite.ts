import { supabase } from '@/lib/supabase'

export const addFavorite = async (user_id: string, product_id: string) => {
  // Cek apakah favorite sudah ada
  const { data: existing, error: fetchError } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 = no rows found → bukan error fatal
    console.error('Gagal cek favorite:', fetchError)
    return
  }

  if (!existing) {
    // Belum ada → insert favorite
    const { error: insertError } = await supabase
      .from('favorites')
      .insert([{ user_id, product_id }])

    if (insertError) {
      console.error('Gagal tambah favorite:', insertError)
    }
  } else {
    console.log('Produk sudah difavoritkan.')
  }
}