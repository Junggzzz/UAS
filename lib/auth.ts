// lib/auth.ts (atau di mana kamu tangani auth)
import { supabase } from './supabase'

export async function registerUser({ email, password, nama, alamat, nomor_hp }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) return { error }

  const user = data.user

  // Insert ke tabel profiles
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: user.id,
      nama,
      alamat,
      nomor_hp
    }
  ])

  if (profileError) return { error: profileError }

  return { user }
}
