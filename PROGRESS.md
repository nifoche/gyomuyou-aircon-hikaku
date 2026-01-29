# AI画像生成機能 - 進捗記録

## 日時
2026-01-29

## 実装完了分

### ✅ 完了した作業

1. **環境設定**
   - [x] .env.local 作成（API Token設定済み）
   - [x] .env.example 作成（テンプレート）
   - [x] 依存関係インストール（replicate, dotenv, node-fetch）
   - [x] ディレクトリ作成（public/images/, scripts/, css/components/）
   - [x] .gitignore 更新（AI生成画像を除外）

2. **画像生成スクリプト**
   - [x] scripts/generate-images.js - メインスクリプト
   - [x] scripts/prompts/before-after-prompts.js - 3シナリオ（cleaning, repair, replacement）
   - [x] scripts/prompts/gallery-prompts.js - 6プロンプト（installation, maintenance, emergency等）

3. **UIコンポーネント**
   - [x] css/components/before-after.css - スライダースタイル
   - [x] css/components/gallery.css - ギャラリースタイル
   - [x] js/before-after.js - スライダー実装
   - [x] js/gallery.js - Lightbox実装
   - [x] js/load-gallery.js - companies.jsonから動的ロード

4. **ページ統合**
   - [x] index.html - ギャラリーセクション追加
   - [x] CSS・JS読み込み追加

5. **ドキュメント**
   - [x] README-AI-IMAGES.md - 使用方法の説明

6. **Git & デプロイ**
   - [x] コミット完了（5a193f2）
   - [x] GitHubにプッシュ済み
   - [x] Cloudflare Pagesにデプロイ済み
   - [x] 本番URL: https://gyomuyou-aircon-hikaku.pages.dev/

---

## ⏸️ 現在の課題

### Replicate APIの問題

**テスト実行結果**: `node scripts/generate-images.js genki-denki`

**エラー1: 402 Payment Required**
```
You have insufficient credit to run this model.
Go to https://replicate.com/account/billing#billing to purchase credit.
```

**エラー2: 429 Too Many Requests**
```
Rate limit: 6 requests per minute with a burst of 1
Free tier limits apply until payment method added
```

**原因**:
- Replicate無料枠ではクレジットが必要
- 無料ユーザーは6リクエスト/分に制限

---

## 📋 次のステップ（選択肢）

### オプションA: Replicateにクレジットを追加（推奨）

**手順**:
1. https://replicate.com/account/billing#billing にアクセス
2. クレジット購入（最小$5〜$10で約250〜500枚生成可能）
3. 数分待つ
4. 再実行: `node scripts/generate-images.js genki-denki`

**コスト**:
- 54枚生成あたり約$0.11（約16円）
- $10のクレジットで約5,000枚生成可能

### オプションB: スクリプト改善（待機時間延長）

**改善点**:
- リクエスト間の待機時間を2秒→10秒に増やす
- エラー時のリトライ処理を追加
- レート制限を考慮した間隔で実装

**実装**: scripts/generate-images.js を修正

### オプションC: OpenAI DALL-E 3に切り替え

**メリット**:
- より安定
- 画像品質が高い

**デメリット**:
- コストが高い（$0.040/枚 = 約6円）
- 54枚で約$2.16（約320円）

**実装**: scripts/generate-images.js のAPI部分を書き換え

---

## 🔧 再開時の手順

### 1. 環境確認

```bash
cd /Users/sales/genki-denki/dev/gyomuyou-aircon-hikaku

# API Token確認
cat .env.local
# REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 依存関係確認
npm list replicate dotenv node-fetch
```

### 2. クレジット追加後の実行

```bash
# 1社のみテスト（約6枚生成、約1分）
node scripts/generate-images.js genki-denki

# 全6社生成（54枚、約10分）
node scripts/generate-images.js
```

### 3. 生成確認

```bash
# 画像ファイルの確認
ls -la public/images/before-after/
ls -la public/images/examples/

# companies.jsonの確認
cat data/companies.json | jq '.companies[0].images'
```

### 4. ローカル確認

```bash
# index.htmlをブラウザで開く
open index.html

# または簡易HTTPサーバー
npx serve
# http://localhost:3000
```

---

## 📁 修正が必要なファイル

### スクリプト改善（オプションBの場合）

**scripts/generate-images.js**
```javascript
// 待機時間を2秒→10秒に増やす
await sleep(10000);  // 現在: await sleep(2000);

// エラーハンドリング追加
if (error.status === 429) {
  console.log('Rate limited, waiting 60 seconds...');
  await sleep(60000);
  // リトライ
}
```

### DALL-E 3切り替え（オプションCの場合）

**scripts/generate-images.js**
```javascript
// Replicateの代わりにOpenAI使用
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// API呼び出し部分を書き換え
const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: promptSet.beforePrompt,
  n: 1,
  size: "1024x768"
});
```

---

## 💾 バックアップ

### Gitコミット
- コミット: 5a193f2
- ブランチ: main
- リモート: https://github.com/nifoche/gyomuyou-aircon-hikaku.git

### 本番環境
- URL: https://gyomuyou-aircon-hikaku.pages.dev/
- 最新デプロイ: 5a193f2

---

## 📊 進捗チェックリスト

- [x] 環境準備完了
- [x] スクリプト実装完了
- [x] UI実装完了
- [x] ページ統合完了
- [x] デプロイ完了
- [ ] クレジット追加（待機）
- [ ] 画像生成成功確認
- [ ] 企業詳細ページ統合（pages/*.html）
- [ ] 最終デプロイ

---

## 🔗 関連ファイル

- **計画ファイル**: /Users/sales/.claude/plans/lexical-marinating-quasar.md
- **README**: README-AI-IMAGES.md
- **プロジェクトルート**: /Users/sales/genki-denki/dev/gyomuyou-aircon-hikaku

---

## 💬 メモ

### ユーザーへの確認事項

- どの方法で進めますか？（A: クレジット追加, B: スクリプト改善, C: DALL-E 3切り替え）
- 企業詳細ページ（pages/genki-denki.html等）の実装も進めますか？

### 技術的メモ

- Replicate API Token: .env.local に設定済み
- スクリプトはCommonJS（require/module.exports）
- node-fetchを使用してfetchをpolyfill
- IIFEパターンでasync/awaitをラップ

---

## 次回のセッションで伝えるべきこと

1. **目的**: 業務用エアコン修理比較サイトにAI画像生成機能を追加
2. **現状**: 実装完了、Replicateテスト実施、クレジット不足でエラー
3. **次のアクション**: クレジット追加、またはスクリプト改善、またはDALL-E 3切り替え
4. **場所**: /Users/sales/genki-denki/dev/gyomuyou-aircon-hikaku
