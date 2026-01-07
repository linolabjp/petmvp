# ペット散歩代行マッチングアプリ（MVP）

獣医師・動物看護師によるペット散歩代行サービスのマッチングWebアプリ

## 🎯 概要

- **対象市場**: 日本
- **ターゲット**: 富裕層のペット飼い主
- **特徴**: ウォーカーは全員、獣医師または動物看護師の資格保持者

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **スタイリング**: Tailwind CSS
- **認証**: Cookie-based セッション

## 📋 MVP機能

### 飼い主機能
- ✅ 会員登録・ログイン
- ✅ ウォーカー一覧閲覧（承認済みのみ）
- 🔄 ペット情報登録（実装予定）
- 🔄 散歩リクエスト作成（実装予定）
- 🔄 リクエスト履歴閲覧（実装予定）

### ウォーカー機能
- ✅ 会員登録・ログイン
- ✅ プロフィール自動作成
- ✅ 審査ステータス確認
- 🔄 散歩リクエスト応募（実装予定）
- 🔄 散歩レポート作成（実装予定）

### 管理者機能
- ✅ ウォーカー審査（承認・却下）
- ✅ 統計ダッシュボード
- 🔄 全リクエスト閲覧（実装予定）

## 🛠️ セットアップ

### 1. リポジトリをクローン

\`\`\`bash
git clone https://github.com/あなたのユーザー名/pet-walker-mvp.git
cd pet-walker-mvp
\`\`\`

### 2. 依存関係をインストール

\`\`\`bash
npm install
\`\`\`

### 3. 環境変数を設定

\`.env\` ファイルを作成：

\`\`\`
DATABASE_URL="your-supabase-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. データベースをセットアップ

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. 開発サーバーを起動

\`\`\`bash
npm run dev
\`\`\`

http://localhost:3000 でアプリにアクセスできます

## 📦 デプロイ

### Vercel + Supabase

1. Supabaseでデータベースを作成
2. VercelでGitHubリポジトリをインポート
3. 環境変数を設定
4. デプロイ

## 🔐 デモアカウント

本番環境では、管理者アカウントを手動で作成する必要があります：

Supabase SQL Editorで実行：

\`\`\`sql
INSERT INTO "User" (id, email, "passwordHash", "userType", name, "createdAt")
VALUES (
  gen_random_uuid()::text,
  'admin@example.com',
  '$2a$10$...',  -- bcryptでハッシュ化したパスワード
  'admin',
  '管理者',
  NOW()
);
\`\`\`

## 📝 今後の実装予定

- 散歩リクエスト作成・管理
- ウォーカー応募機能
- 散歩レポート機能
- プロフィール編集
- 決済機能
- チャット機能
- 評価・レビュー機能

## 📄 ライセンス

MIT License
