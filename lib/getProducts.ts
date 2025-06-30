import { supabase } from '@/lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false }); // Opsional: urutkan dari yang terbaru

  if (error) {
    console.error('Gagal mengambil produk:', error.message);
    return [];
  }

  return data ?? [];
}