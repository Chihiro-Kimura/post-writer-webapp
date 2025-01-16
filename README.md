# Post Writer

ブログ記事作成のための Web アプリケーション

## セットアップ

1. 依存関係のインストール:

```bash
npm install
```

2. 環境変数の設定:
   `.env`ファイルを作成し、必要な環境変数を設定:

```env
DATABASE_URL=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

3. データベースのマイグレーション:

```bash
npx prisma migrate dev
```

4. 開発サーバーの起動:

```bash
npm run dev
```

## 技術スタック

- Next.js 14
- TypeScript
- Prisma
- NextAuth.js
- Contentlayer
- PostgreSQL

## ライセンス

MIT
