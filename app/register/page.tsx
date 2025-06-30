'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', nama: '', alamat: '', nomor_hp: '' })
  const router = useRouter()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  })

  if (error) {
    alert('❌ Gagal daftar: ' + error.message)
    return
  }

  const user = data.user
  if (!user) {
    alert('❌ Register berhasil, tapi user belum diverifikasi.')
    return
  }

  // Simpan data tambahan ke tabel 'profiles'
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: user.id,
      nama: form.nama,
      alamat: form.alamat,
      nomor_hp: form.nomor_hp,
    }
  ])

  if (profileError) {
    alert('⚠️ Gagal simpan data ke profil: ' + profileError.message)
    return
  }

  alert('✅ Berhasil daftar!')
  router.push('/login')
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F1E7]">
      <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#B88E2F] mb-4">Create Account</h1>
        <p className="mb-6 text-gray-600">Register to get started</p>

        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-4 rounded text-black placeholder:text-black" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4 rounded text-black placeholder:text-black" />
        <input name="nama" type="text" placeholder="Nama Lengkap" onChange={handleChange} className="w-full border p-2 mb-4 rounded text-black placeholder:text-black" />
        <input name="alamat" type="text" placeholder="Alamat" onChange={handleChange} className="w-full border p-2 mb-4 rounded text-black placeholder:text-black" />
        <input name="nomor_hp" type="text" placeholder="Nomor HP" onChange={handleChange} className="w-full border p-2 mb-6 rounded text-black placeholder:text-black" />
        
        <button
          onClick={handleRegister}
          className="w-full bg-[#B88E2F] text-white font-bold py-2 rounded hover:bg-[#a17825]"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-center text-black">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-[#B88E2F] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}