import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

export default async function OwnerHomePage() {
  const session = await getSession()

  if (!session || session.userType !== 'owner') {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">飼い主ホーム</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">ようこそ、{session.name}さん</h2>
        <p className="text-gray-600 mb-4">
          ペット散歩代行マッチングアプリをご利用いただきありがとうございます。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/owner/walkers" className="block bg-blue-50 hover:bg-blue-100 rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-600 mb-2">ウォーカー一覧</h3>
          <p className="text-gray-600">資格を持つウォーカーを探す</p>
        </Link>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">散歩リクエスト作成</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">リクエスト履歴</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 opacity-50">
          <h3 className="text-xl font-bold text-gray-600 mb-2">マイページ</h3>
          <p className="text-gray-500">（実装予定）</p>
        </div>
      </div>
    </div>
  )
}
