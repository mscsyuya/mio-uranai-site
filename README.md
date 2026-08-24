# みおの備忘録

電話占い・タロット・西洋占星術の体験レビューサイト。
はてなブログ (mio-uranai.hatenablog.com) から全20記事を移植した、Next.js 製の静的サイトです。

- **技術構成**: Next.js 15 (App Router) / TypeScript / Tailwind CSS v4 / 静的書き出し (`output: 'export'`)
- **記事の管理**: `content/articles/` の Markdown ファイル
- **外部UIライブラリ不使用**、ダーク基調のみ(ライトモード非対応)

---

## 1. Vercel に接続する(3ステップ)

コードを触る必要はありません。ブラウザだけで完了します。

1. **GitHub と連携する**
   [vercel.com](https://vercel.com) にアクセスし、**Continue with GitHub** でログインします。
2. **リポジトリを選ぶ**
   ダッシュボードで **Add New… → Project** を押し、一覧から `mio-uranai-site` の **Import** を押します。
3. **デプロイする**
   設定画面はそのまま **Deploy** を押すだけです。Next.js は自動検出されるので、
   Framework Preset / Build Command / Output Directory の変更は不要です。

1〜2分でビルドが終わり、`https://mio-uranai-site.vercel.app` のようなURLが発行されます。

> 以降、GitHub の `main` ブランチに push するたびに自動で再デプロイされます。

---

## 2. 記事を追加する

`content/articles/` に `.md` ファイルを1つ置くだけです。ファイル名がそのままURLになります。

`content/articles/atarashii-kiji.md` を作ると `/articles/atarashii-kiji` で公開されます。

```markdown
---
title: "記事のタイトル"
slug: "atarashii-kiji"
date: "2026-06-01"
tags: ["電話占いの使い方"]
description: "検索結果とSNSに出る説明文。120字程度が目安です。"
pr: true
---

ここから本文をMarkdownで書きます。

## 見出し

段落です。改行はそのまま改行として表示されます。
```

### frontmatter の各項目

| 項目 | 必須 | 内容 |
|---|---|---|
| `title` | ○ | 記事タイトル。`<title>` タグとJSON-LDにも使われます |
| `slug` | ○ | URL。半角英数字とハイフンのみ。ファイル名と揃えてください |
| `date` | ○ | 公開日 `YYYY-MM-DD`。一覧はこの日付の新しい順に並びます |
| `tags` | ○ | カテゴリ名を1つ入れます(下記の5つから選択) |
| `description` | ○ | meta description。検索結果に出る説明文 |
| `pr` | ○ | アフィリエイトリンクを含むなら `true`。記事冒頭にPR表記が出ます |
| `source` | | 移行元URL。移植記事の記録用なので、新規記事では不要です |

### 使えるカテゴリ

`tags` には次のいずれかを入れてください(`src/data/site.ts` で追加・変更できます)。

- `個別サイトレビュー`
- `電話占いの使い方`
- `悩み別ガイド`
- `占いの基礎知識`
- `占いとの付き合い方`

ファイルを追加して GitHub に push すれば、一覧・カテゴリページ・sitemap.xml に自動で反映されます。

---

## 3. アフィリエイトリンクを差し込む

`src/data/affiliates.ts` を開き、**`url` の空文字にURLを貼るだけ**です。

```ts
// 変更前
{ id: 'vernis', label: '電話占いヴェルニ 公式サイトを見る', url: '', program: 'a8' },

// 変更後
{ id: 'vernis', label: '電話占いヴェルニ 公式サイトを見る', url: 'https://px.a8.net/svt/ejp?a8mat=...', program: 'a8' },
```

これだけで、記事本文中の `{{affiliate:vernis}}` と書かれている箇所**すべて**がリンクカードに変わります。
現在の記事内での参照数は次のとおりです。

| id | サービス | 記事内の参照数 |
|---|---|---|
| `vernis` | 電話占いヴェルニ | 13 |
| `kizuna` | 電話占い絆 | 10 |
| `feel` | 電話占いFeel | 5 |
| `purely` | 電話占いピュアリ | 5 |
| `line-talk` | LINEトーク占い | 3 |
| `coconala` | ココナラ占い | 1 |

### 重要な仕様

- **`url` が空のあいだ、リンクは一切表示されません。** 壊れたリンクや空のボタンが出ることはないので、URLが発行されるまで空のままで問題ありません。
- リンクには自動で `rel="nofollow sponsored noopener"` と「PR」表記が付きます。
- 新しいサービスを追加するときは、`affiliates.ts` に1行足し、記事本文に `{{affiliate:新しいid}}` と書きます。

> **注意**: 現在URLが未入力のため、`### 公式サイトはこちら` という見出しの直下にあるリンク(10箇所)は、
> 見出しだけが表示されている状態です。URLを入れれば自然に解消します。

---

## 4. 独自ドメインを設定する

### 手順1: Vercel にドメインを登録する

1. Vercel のプロジェクトを開き、**Settings → Domains** を選びます。
2. 取得したドメイン(例 `mio-uranai.com`)を入力して **Add** を押します。
3. Vercel が表示するDNSレコードを控えます。通常は次の2つです。

| 種類 | 名前 | 値 |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

### 手順2: ドメイン管理画面でDNSを設定する

ドメインを買った会社(お名前.com、ムームードメイン等)の管理画面で、手順1で控えたレコードを登録します。
反映には数分〜最大48時間かかります。Vercel の Domains 画面が **Valid Configuration** になれば完了です。

### 手順3: サイト側にドメインを教える(重要)

このステップを忘れると、sitemap.xml や OGP のURLが Vercel の初期ドメインのままになります。

1. Vercel のプロジェクトで **Settings → Environment Variables** を開きます。
2. 次の1件を追加します。

   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://mio-uranai.com` (末尾のスラッシュは不要)
   - **Environment**: Production

3. **Deployments** タブから最新のデプロイの **⋯ → Redeploy** を実行します。

これで canonical URL・sitemap.xml・robots.txt・JSON-LD・OGP のすべてが新しいドメインに切り替わります。

---

## 5. 審査対応について

A8.net / Amazonアソシエイトの審査を想定して、次を実装済みです。

- `/privacy` — Google Analytics とCookie、第三者配信広告、Amazonアソシエイト・プログラムの定型文
- `/disclaimer` — 鑑定結果を保証しない旨を含む占いコンテンツの免責
- `/about` — 運営者情報(ハンドルネーム・連絡先メール)
- `/contact` — メールでの問い合わせ先(フォームは設置していません)
- 全ページのフッターから上記すべてに到達可能
- アフィリエイトリンクを含む記事には冒頭に「PR」を表示

連絡先メールアドレスは `src/data/site.ts` の `contactEmail` で一括変更できます。

---

## 6. ローカルで動かす(任意)

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 静的書き出し。out/ に出力されます
npm run lint    # 型チェック
```

OGP画像を作り直す場合のみ `npm run build:og` を実行します(Windows のフォントを参照します)。
生成済みの画像はリポジトリに含まれているので、通常は実行不要です。

---

## ディレクトリ構成

```
content/articles/     記事のMarkdown(ここだけ触れば記事は増やせます)
public/               OGP画像などの静的ファイル
src/app/              各ページ。sitemap.ts / robots.ts も自動生成
src/components/       ヘッダー・フッター・PR表記・アフィリエイトカード
src/data/             サイト設定(site.ts)とアフィリエイト一覧(affiliates.ts)
src/lib/              記事の読み込みとMarkdown変換
```
