# Subscription Management App (Frontend)

サブスクリプション・固定費を管理するアプリのフロントエンドです。

---

## Overview
本アプリは、日常的に発生するサブスクリプションや固定費を一覧・分析し、  
支出の把握や見直しを行いやすくすることを目的としています。

フロントエンドでは以下を重視しています。

- Next.js App Router を用いた **SSR（Server Components）**
- API を集約する **BFF（Backend For Frontend）構成**
- 本番運用を想定したデプロイ・ドメイン・CI/CD 設計

---

## Screens / Pages
- `/` : ダッシュボード（合計金額・カテゴリ別集計）
- `/expenses` : 支出一覧
- `/expenses/new` : 新規登録
- `/expenses/[id]` : 詳細
- `/expenses/[id]/edit` : 編集  
※ 削除は論理削除（UI上からは非表示）

---

## Architecture
```
Browser
↓
Next.js (App Router / SSR)
├─ Server Components
├─ Client Components
└─ BFF (/app/api/*)
↓
FastAPI (API Gateway + Lambda)
↓
Neon PostgreSQL
```

### BFF 構成について
- ブラウザからは常に `/api/*` を呼び出す
- Next.js の Route Handlers が FastAPI への通信を担当
- CORS 問題の回避、API URL の秘匿、API仕様変更の吸収を目的としています

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Fetch API

---

## Environment Variables
### Server Side Only
- `FASTAPI_BASE_URL`  
  - FastAPI（API Gateway）への接続先

---

## Local Development
```bash
npm ci
npm run dev
```
.env.local を作成し、環境変数を設定してください。

---

## Deployment
- AWS Amplify Hosting
	- Next.js（App Router / SSR）対応
	- main ブランチへのマージで自動デプロイ
- Custom Domain
	- Route 53 + Amplify マネージド SSL
- DNS
	- Route 53 による ALIAS / CNAME 管理

---

## Directory Structure
```
src/
├── app/
│   ├── api/                # BFF (Backend For Frontend)
│   │   ├── _lib/            # BFF 内部共通処理（env / fetch など）
│   │   └── dashboard/
│   │       └── summary/
│   │           └── route.ts
│   ├── expenses/            # 支出関連ページ
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── new/
│   │   └── page.tsx
│   ├── page.tsx             # ダッシュボード
│   └── layout.tsx
│
├── lib/
│   ├── api/              # フロント用 API クライアント
│   └── utils.ts
│
└── components/              # 共通 UI コンポーネント
```

---

## Planned Features / TODO
現在は基本機能の実装と構成設計を優先しています。
今後、以下の機能追加・改善を予定しています。

- 認証・認可の導入
  - Cognito / Clerk 等を用いたユーザー認証
  - ユーザー単位でのデータ分離
- エラーハンドリング / UX 改善
  - API エラー時のユーザーフィードバック
  - 空状態・ローディング状態の改善
- キャッシュ戦略の見直し
  - SSR / fetch のキャッシュ制御最適化
- UI/UX 改善
  - レスポンシブ対応の強化
  - ダッシュボードの視認性向上
- 分析画面追加
- テスト導入
  - コンポーネントテスト
  - API モックを用いた結合テスト
- CI/CD の拡充
	- GitHub Actions による CI 導入
		- ESLint
		- TypeScript 型チェック
		- build 成功可否の検証
	- main ブランチへのマージをトリガーにした自動デプロイ（Amplify）
	- 将来的に PR 単位でのチェック（Preview / Check）を検討


---

## Design Decisions
- Amplify 採用理由
	- バックエンドを含め AWS に統一することで運用・権限管理を一貫化
	- SSR を維持しつつマネージドでホスティング可能
- キャッシュ
	- 現在は no-store で統一し、将来的に最適化予定

---

## Related Repository
Backend: https://github.com/kuniyoshi-y/subscription-app-backend

