import { supabase } from '@/lib/supabase'

export const searchProducts = async (keyword: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${keyword}%`)

  if (error) console.error(error)
  return data
}
