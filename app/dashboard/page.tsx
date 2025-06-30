'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
      } else {
        setProfile(data)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#F9F1E7] flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-xl relative">
        <h1 className="text-3xl font-bold text-[#B88E2F] mb-6 text-center">
          Dashboard
        </h1>

        {profile ? (
          <div className="space-y-4 text-black">
            <p><strong>Nama:</strong> {profile.nama}</p>
            <p><strong>Alamat:</strong> {profile.alamat}</p>
            <p><strong>Nomor HP:</strong> {profile.nomor_hp}</p>
            <p><strong>Bergabung sejak:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => router.push('/editprofile')}
                className="bg-[#B88E2F] text-white font-semibold py-2 px-4 rounded hover:bg-[#a17825]"
              >
                Edit Profil
              </button>
              <button
                onClick={() => router.push('/shoppage')}
                className="bg-[#B88E2F] text-white font-semibold py-2 px-4 rounded hover:bg-[#a17825]"
              >
                Lihat Produk
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="bg-[#B88E2F] text-white font-semibold py-2 px-4 rounded hover:bg-[#a17825]"
              >
                Lihat Keranjang
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>

            {/* Tambahkan tombol Home */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-700 text-white font-medium px-6 py-2 rounded hover:bg-gray-800"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Memuat data profil...</p>
        )}
      </div>
    </div>
  )
}