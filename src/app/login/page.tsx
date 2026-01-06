'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ログインに失敗しました')
      }

      const { user } = await res.json()
      
      if (user.userType === 'owner') {
        router.push('/owner/home')
      } else if (user.userType === 'walker') {
        router.push('/walker/home')
      } else if (user.userType === 'admin') {
        router.push('/admin/home')
      }
      
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">ログイン</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            type="password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>

        <p className="text-center mt-4 text-gray-600">
          アカウントをお持ちでない方は{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            新規登録
          </Link>
        </p>
      </form>
    </div>
  )
}
