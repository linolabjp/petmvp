import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          ペット散歩代行マッチングアプリ
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          獣医師・動物看護師による安心のペット散歩代行サービス
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            新規登録
          </Link>
          <Link
            href="/login"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300"
          >
            ログイン
          </Link>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-blue-600 mb-3">専門家による安心</h3>
          <p className="text-gray-600">
            すべてのウォーカーは獣医師または動物看護師の資格を持っています
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-blue-600 mb-3">簡単マッチング</h3>
          <p className="text-gray-600">
            希望条件を入力するだけで最適なウォーカーが見つかります
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-blue-600 mb-3">詳細レポート</h3>
          <p className="text-gray-600">
            散歩後には写真付きの詳細レポートをお届けします
          </p>
        </div>
      </div>
    </div>
  )
}
