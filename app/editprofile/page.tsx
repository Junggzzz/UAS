'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function EditProfilePage() {
  const [form, setForm] = useState({ nama: '', alamat: '', nomor_hp: '' })
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setForm({ nama: data.nama, alamat: data.alamat, nomor_hp: data.nomor_hp })
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('profiles').update(form).eq('id', user.id)
    alert('Data berhasil diperbarui')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F1E7] p-6">
      <div className="bg-white shadow-lg p-10 rounded w-full max-w-lg">
        <h1 className="text-3xl font-bold text-[#B88E2F] mb-6 text-center">Edit Profil</h1>
        <input name="nama" placeholder="Nama" className="w-full border p-2 mb-4 rounded text-black" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
        <input name="alamat" placeholder="Alamat" className="w-full border p-2 mb-4 rounded text-black" value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} />
        <input name="nomor_hp" placeholder="Nomor HP" className="w-full border p-2 mb-6 rounded text-black" value={form.nomor_hp} onChange={e => setForm({ ...form, nomor_hp: e.target.value })} />
        <button onClick={handleSave} className="bg-[#B88E2F] text-white w-full py-2 rounded hover:bg-[#a17825]">Simpan</button>
      </div>
    </div>
  )
}