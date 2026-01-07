import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function WalkersListPage() {
  const session = await getSession()

  if (!session || session.userType !== 'owner') {
    redirect('/login')
  }

  const walkers = await prisma.walkerProfile.findMany({
    where: {
      approvalStatus: 'approved',
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ウォーカー一覧</h1>
      
      <p className="text-gray-600 mb-6">
        承認済みのウォーカー（獣医師・動物看護師）一覧です
      </p>

      {walkers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">現在、利用可能なウォーカーがいません</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walkers.map((walker) => (
            <div key={walker.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">{walker.user.name}</h3>
              
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                  {walker.qualification === 'veterinarian' ? '獣医師' : '動物看護師'}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                {walker.area && (
                  <p><span className="font-semibold">対応エリア：</span>{walker.area}</p>
                )}
                {walker.experienceYears && (
                  <p><span className="font-semibold">経験年数：</span>{walker.experienceYears}年</p>
                )}
              </div>

              {walker.introduction && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {walker.introduction}
                </p>
              )}

              <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled
              >
                リクエスト作成（実装予定）
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
