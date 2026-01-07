'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ApprovalButton({ walkerId }: { walkerId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleApproval = async (status: 'approved' | 'rejected') => {
    if (!confirm(`本当に${status === 'approved' ? '承認' : '却下'}しますか？`)) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/admin/walkers/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walkerId, status }),
      })

      if (!res.ok) {
        throw new Error('処理に失敗しました')
      }

      router.refresh()
    } catch (error) {
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleApproval('approved')}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
      >
        承認
      </button>
      <button
        onClick={() => handleApproval('rejected')}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
      >
        却下
      </button>
    </div>
  )
}
