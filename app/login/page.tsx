'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
  if (!email || !password) {
    alert('Email dan password tidak boleh kosong')
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert('❌ Login gagal: ' + error.message)
    return
  }

  router.push('/dashboard')
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F1E7]">
      <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#B88E2F] mb-4">Welcome Back</h1>
        <p className="mb-6 text-gray-600">Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded text-black placeholder:text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-6 rounded text-black placeholder:text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#B88E2F] text-white font-bold py-2 rounded hover:bg-[#a17825]"
        >
          Login
        </button>

        <p className="mt-6 text-sm text-center text-black">
          Belum punya akun?{' '}
          <Link href="/register" className="text-[#B88E2F] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}