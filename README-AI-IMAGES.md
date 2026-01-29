# AI画像生成機能の使い方

このプロジェクトでは、AI（Stable Diffusion XL）を使って業務用エアコンの修理前後写真や施工事例画像を自動生成できます。

## 準備

### 1. Replicate APIキーの取得

1. [Replicate](https://replicate.com) にサインアップ
2. API Tokenを取得: https://replicate.com/account/api-tokens
3. `.env.local` ファイルを作成

```bash
# .env.local（Git除外）
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**重要**: `.env.local` は `.gitignore` に含まれているため、Gitにはコミットされません。

## 画像生成

### 全企業の画像を生成

```bash
node scripts/generate-images.js
```

これにより、6社分の画像が生成されます：
- Before/After画像: 1社あたり3シナリオ × 2枚 = 6枚
- ギャラリー画像: 1社あたり3枚
- **合計**: 54枚

### 特定の企業のみ生成

```bash
# 元気でんきのみ生成
node scripts/generate-images.js genki-denki

# 業務用エアコンPRO修理のみ生成
node scripts/generate-images.js aircon-pro-repair
```

## 生成される画像

### Before/After画像（修理前後比較）

1. **cleaning** - クリーニング作業
   - Before: 埃が蓄積したエアコン
   - After: クリーニング後のピカピカの状態

2. **repair** - ガス不足補充
   - Before: 修理作業中の室外機
   - After: 修理完了した室外機

3. **replacement** - 室外機交換
   - Before: 古びた室外機
   - After: 新しい室外機

### ギャラリー画像（施工事例）

1. **installation** - 設置作業
2. **maintenance** - メンテナンス作業
3. **emergency** - 緊急修理対応

## ファイル構成

```
public/images/
├── before-after/
│   ├── genki-denki-cleaning-before.png
│   ├── genki-denki-cleaning-after.png
│   ├── genki-denki-repair-before.png
│   ├── genki-denki-repair-after.png
│   └── ...
└── examples/
    ├── genki-denki-1.png
    ├── genki-denki-2.png
    ├── genki-denki-3.png
    └── ...
```

## データ更新

`scripts/generate-images.js` を実行すると、自動的に `data/companies.json` が更新されます。

```json
{
  "companies": [
    {
      "id": "genki-denki",
      "images": {
        "beforeAfter": [
          {
            "id": "genki-denki-cleaning",
            "category": "cleaning",
            "title": "クリーニング作業",
            "before": {
              "path": "/images/before-after/genki-denki-cleaning-before.png",
              "caption": "Before: エアコン内部に大量の埃"
            },
            "after": {
              "path": "/images/before-after/genki-denki-cleaning-after.png",
              "caption": "After: 高圧洗浄でピカピカに"
            }
          }
        ],
        "gallery": [
          {
            "id": "genki-denki-1",
            "path": "/images/examples/genki-denki-1.png",
            "category": "installation",
            "caption": "オフィスビルへの設置作業"
          }
        ]
      }
    }
  ]
}
```

## 表示方法

### トップページ

`index.html` を開くと、全企業のギャラリー画像が表示されます。

### 企業詳細ページ

各企業ページ（`pages/genki-denki.html` 等）に Before/After スライダーとギャラリーを表示できます。

## コスト

- **画像生成**: 約 $0.66（54枚 × $0.002/枚）
- **ストレージ**: $0（Cloudflare R2無料枠内）

## 注意事項

- 生成には時間がかかります（1枚あたり約10〜20秒）
- APIレート制限に注意してください
- 生成された画像はAIによるイメージです

## トラブルシューティング

### エラー: REPLICATE_API_TOKEN is not set

`.env.local` ファイルを作成し、APIキーを設定してください。

```bash
cp .env.example .env.local
# .env.local を編集して API キーを追加
```

### 画像が表示されない

1. ブラウザの開発者ツールでネットワークエラーを確認
2. `data/companies.json` の `images` フィールドを確認
3. 画像ファイルが `public/images/` に存在するか確認

### Before/Afterスライダーが動かない

- `js/before-after.js` が読み込まれているか確認
- ブラウザのコンソールでエラーを確認

## 次のステップ

1. ローカルで `index.html` を開いて確認
2. Cloudflare Pages にデプロイ
3. 本番環境で動作確認
