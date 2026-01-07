import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ApprovalButton from './ApprovalButton'

export default async function AdminWalkersPage() {
  const session = await getSession()

  if (!session || session.userType !== 'admin') {
    redirect('/login')
  }

  const pendingWalkers = await prisma.walkerProfile.findMany({
    where: { approvalStatus: 'pending' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const approvedWalkers = await prisma.walkerProfile.findMany({
    where: { approvalStatus: 'approved' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { approvedAt: 'desc' },
  })

  const rejectedWalkers = await prisma.walkerProfile.findMany({
    where: { approvalStatus: 'rejected' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ウォーカー審査</h1>

      {/* 審査待ち */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">審査待ち ({pendingWalkers.length}件)</h2>
        
        {pendingWalkers.length === 0 ? (
          <p className="text-gray-600 bg-gray-50 p-4 rounded">審査待ちのウォーカーはいません</p>
        ) : (
          <div className="space-y-4">
            {pendingWalkers.map((walker) => (
              <div key={walker.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{walker.user.name}</h3>
                    <p className="text-gray-600">{walker.user.email}</p>
                    {walker.user.phone && (
                      <p className="text-gray-600">{walker.user.phone}</p>
                    )}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                    {walker.qualification === 'veterinarian' ? '獣医師' : '動物看護師'}
                  </span>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                  <p><span className="font-semibold">対応エリア：</span>{walker.area || '未設定'}</p>
                  {walker.experienceYears && (
                    <p><span className="font-semibold">経験年数：</span>{walker.experienceYears}年</p>
                  )}
                  {walker.introduction && (
                    <p className="mt-2"><span className="font-semibold">自己紹介：</span>{walker.introduction}</p>
                  )}
                </div>

                <ApprovalButton walkerId={walker.id} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 承認済み */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-600">承認済み ({approvedWalkers.length}件)</h2>
        
        {approvedWalkers.length === 0 ? (
          <p className="text-gray-600 bg-gray-50 p-4 rounded">承認済みのウォーカーはいません</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {approvedWalkers.map((walker) => (
              <div key={walker.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
                <h3 className="font-bold">{walker.user.name}</h3>
                <p className="text-sm text-gray-600">{walker.user.email}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-2 inline-block">
                  {walker.qualification === 'veterinarian' ? '獣医師' : '動物看護師'}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 却下済み */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">却下済み ({rejectedWalkers.length}件)</h2>
        
        {rejectedWalkers.length === 0 ? (
          <p className="text-gray-600 bg-gray-50 p-4 rounded">却下済みのウォーカーはいません</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {rejectedWalkers.map((walker) => (
              <div key={walker.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-red-400">
                <h3 className="font-bold">{walker.user.name}</h3>
                <p className="text-sm text-gray-600">{walker.user.email}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
