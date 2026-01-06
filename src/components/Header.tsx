'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user?: {
    name: string
    userType: string
  } | null
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ペット散歩代行
        </Link>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm">
                {user.name} ({user.userType === 'owner' ? '飼い主' : user.userType === 'walker' ? 'ウォーカー' : '管理者'})
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                ログイン
              </Link>
              <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
