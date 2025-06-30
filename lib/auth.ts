import { supabase } from './supabase'

interface RegisterParams {
  email: string
  password: string
  nama: string
  alamat: string
  nomor_hp: string
}

export async function registerUser({
  email,
  password,
  nama,
  alamat,
  nomor_hp
}: RegisterParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    return { error }
  }

  const user = data.user
  if (!user) {
    return { error: { message: 'User belum terverifikasi.' } }
  }

  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: user.id,
      nama,
      alamat,
      nomor_hp
    }
  ])

  if (profileError) {
    return { error: profileError }
  }

  return { user }
}