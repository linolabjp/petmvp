import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminHomePage() {
  const session = await getSession()

  if (!session || session.userType !== 'admin') {
    redirect('/login')
  }

  const stats = {
    totalOwners: await prisma.user.count({ where: { userType: 'owner' } }),
    totalWalkers: await prisma.user.count({ where: { userType: 'walker' } }),
    pendingWalkers: await prisma.walkerProfile.count({ where: { approvalStatus: 'pending' } }),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">管理者ダッシュボード</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">飼い主</h3>
          <p className="text-3xl font-bold text-blue-700">{stats.totalOwners}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <h3 className="text-lg font-semibold text-green-600 mb-2">ウォーカー</h3>
          <p className="text-3xl font-bold text-green-700">{stats.totalWalkers}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">審査待ち</h3>
          <p className="text-3xl font-bold text-yellow-700">{stats.pendingWalkers}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/walkers" className="block bg-blue-50 hover:bg-blue-100 rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-600 mb-2">ウォーカー審査</h3>
          <p className="text-gray-600">ウォーカーの承認・却下</p>
        </Link>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">全リクエスト一覧</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>
      </div>
    </div>
  )
}
