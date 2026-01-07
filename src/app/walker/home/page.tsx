import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function WalkerHomePage() {
  const session = await getSession()

  if (!session || session.userType !== 'walker') {
    redirect('/login')
  }

  const profile = await prisma.walkerProfile.findUnique({
    where: { userId: session.id },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ウォーカーホーム</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">ようこそ、{session.name}さん</h2>
        
        {profile && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">審査ステータス：</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              profile.approvalStatus === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : profile.approvalStatus === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {profile.approvalStatus === 'approved' && '承認済み'}
              {profile.approvalStatus === 'pending' && '審査待ち'}
              {profile.approvalStatus === 'rejected' && '却下'}
            </span>
          </div>
        )}

        {profile?.approvalStatus === 'pending' && (
          <p className="text-gray-600 bg-yellow-50 p-4 rounded">
            現在、管理者による審査中です。承認されるまでお待ちください。
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">散歩リクエスト一覧</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">確定済み散歩</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">プロフィール編集</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">実施履歴</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>
      </div>
    </div>
  )
}
