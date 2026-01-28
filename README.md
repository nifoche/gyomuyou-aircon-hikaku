# 業務用エアコン修理比較サイト

元気でんきの業務用エアコン修理サービスを紹介する比較サイトです。6社の業者を料金・スピード・実績で比較し、ユーザーに最適な業者選びを支援します。

---

## 📊 サイト概要

- **URL**: https://aircon-gekiyasuou.jp/
- **目的**: 業務用エアコン修理業者6社の比較
- **ターゲット**: 急なエアコン故障で困っている店舗・企業経営者
- **構築日**: 2026-01-28

---

## 🚀 クイックスタート

```bash
# 1. ローカルで確認する場合
cd /path/to/gyomuyou-aircon-hikaku
open index.html  # Macの場合
# または
start index.html  # Windowsの場合

# 2. デプロイ
# DEPLOYMENT.md を参照してください
```

---

## 📁 ファイル構造

```
gyomuyou-aircon-hikaku/
├── index.html                 # ランディングページ
├── robots.txt                 # 検索エンジン用クロール指示
├── sitemap.xml               # 検索エンジン用サイトマップ
├── DEPLOYMENT.md             # デプロイ手順書
├── README.md                 # このファイル
├── css/
│   └── style.css            # メインスタイルシート（#EB6601統一）
├── js/
│   └── main.js              # JavaScript（フィルター・スクロール）
├── data/
│   └── companies.json       # 企業データ（6社分）
├── pages/
│   ├── genki-denki.html     # 元気でんき（自社）詳細ページ
│   ├── aircon-pro-repair.html  # 業務用エアコンPRO修理
│   ├── rockfield.html       # 株式会社ロックフィールド
│   ├── aircon-honten.html   # エアコン総本店
│   ├── shuri110.html        # 空調修理110番
│   └── fuji-setubi.html     # 株式会社富士設備
├── articles/
│   ├── aircon-repair-methods.html       # 業務用エアコン修理方法
│   ├── aircon-failure-causes.html       # 故障原因・対処法
│   ├── repair-vs-replacement.html       # 修理か交換か
│   ├── aircon-repair-cost.html          # 修理の相場
│   ├── how-to-choose-repair-company.html # 業者選びのポイント
│   └── emergency-response-guide.html    # 急な故障時の対応
└── images/                  # ロゴ・アイコン等（要追加）
```

---

## 🎨 デザイン仕様

### カラースキーム
- **メインカラー**: #EB6601（オレンジ）
- **サブカラー**: #FFFFFF（白）、#F5F5F5（薄いグレー）
- **テキスト**: #333333（濃いグレー）
- **アクセント**: #FF6600（濃いオレンジ）

### レスポンシブ対応
- **デスクトップ**（1200px以上）: テーブル形式
- **タブレット**（768px〜1199px）: 半分カード形式
- **スマートフォン**（767px以下）: 縦カード形式

### フォント
- 本文: 16px以上
- 見出し: 24px〜32px
- フォントファミリー: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

---

## 🔧 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox、Grid、Media Queries
- **Vanilla JavaScript**: フィルター、スムーススクロール、FAQアコーディオン
- **JSON**: 企業データ管理

---

## 📊 企業データ構造

`data/companies.json` の構造：

```json
{
  "companies": [
    {
      "id": "genki-denki",
      "name": "元気でんき",
      "url": "https://aircon-gekiyasuou.jp/",
      "ranking": {
        "basicFee": "◎",
        "technicalFee": "◎",
        ...
      },
      "details": {
        "basicFee": "¥3,000",
        "shortestResponseTime": "最短2時間",
        ...
      }
    },
    ...
  ]
}
```

---

## 🔄 メンテナンス手順

### 企業データの更新

1. **data/companies.json を編集**

   ```bash
   # エディタで開く
   code data/companies.json  # VSCodeの場合
   ```

2. **料金や対応時間を更新**

   例: 基本料金を変更
   ```json
   "basicFee": "¥3,500",  // 変更前: ¥3,000
   ```

3. **検証**

   ```bash
   # JSON形式が正しいか確認
   cat data/companies.json | python3 -m json.tool
   ```

4. **デプロイ**

   ```bash
   # FTPまたはGitでデプロイ（DEPLOYMENT.md参照）
   ```

### 新規記事の追加

1. **articles/ に新しいHTMLファイルを作成**

   ```bash
   cp articles/aircon-repair-methods.html articles/new-article.html
   ```

2. **記事内容を編集**

   - タイトル、メタディスクリプション、本文を変更
   - 元気でんきへの内部リンクを含める

3. **sitemap.xml に追加**

   ```xml
   <url>
     <loc>https://aircon-gekiyasuou.jp/articles/new-article.html</loc>
     <lastmod>2026-01-28</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.8</priority>
   </url>
   ```

4. **index.html にリンク追加**

   ```html
   <a href="articles/new-article.html" class="article-card">
     <h3>新しい記事のタイトル</h3>
     <p>記事の説明文</p>
   </a>
   ```

---

## 🧪 テストチェックリスト

デプロイ前に以下を確認してください：

- [ ] 全ページでHTMLが正しく表示される
- [ ] CSSが適用されている（カラー#EB6601）
- [ ] 比較表の rankings（◎○△）が正しい
- [ ] 地域フィルター機能が動作する
- [ ] FAQアコーディオンが開閉する
- [ ] 全てのリンクが正しく動作する
- [ ] モバイル表示が正しい（320px〜767pxで確認）
- [ ] robots.txt にアクセスできる
- [ ] sitemap.xml にアクセスできる
- [ ] JSONデータが正しい（バリデーション）

---

## 🔍 SEO対策

### 実装済み
- ✅ メタタグ設定（title, description, keywords）
- ✅ 構造化データ（schema.org/LocalBusiness）
- ✅ sitemap.xml の作成
- ✅ robots.txt の設定
- ✅ 内部リンク構造（サイロ設計）

### 定期対応
- 四半期ごとの企業データ更新
- 記事の追加（月1〜2本推奨）
- Google Search Consoleでのインデックス状況確認

---

## 📈 Google Analytics設定（任意）

Google Analyticsを追加する場合：

1. **Google AnalyticsでトラッキングIDを取得**

2. **各HTMLファイルの `</head>` の前に追加**

   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 🐛 トラブルシューティング

### 問題: ページが表示されない

**原因**: ファイルパスが間違っている

**解決策**:
```bash
# ファイルの存在を確認
ls -la index.html
ls -la css/style.css
```

### 問題: CSSが適用されない

**原因**: 相対パスの間違い

**解決策**:
```html
<!-- 確認: index.html からの相対パス -->
<link rel="stylesheet" href="css/style.css">

<!-- pages/genki-denki.html の場合 -->
<link rel="stylesheet" href="../css/style.css">
```

### 問題: JavaScriptが動作しない

**原因**: スクリプト読み込みの順番

**解決策**:
```html
<!-- </body> の直前に配置 -->
<script src="js/main.js"></script>
```

### 問題: 企業データが反映されない

**原因**: JSONの構文エラー

**解決策**:
```bash
# JSONバリデーション
python3 -m json.tool data/companies.json
```

---

## 📞 サポート・連絡先

- **プロジェクト管理者**: 元気でんき
- **技術的な質問**: DEPLOYMENT.md を参照
- **最終更新**: 2026-01-28

---

## 📝 更新履歴

- **2026-01-28**: サイト構築完了
  - フェーズ1: 企業データ収集
  - フェーズ2: HTML/CSS実装
  - フェーズ4: JavaScript実装
  - フェーズ5: デプロイ準備完了

---

## 📄 ライセンス

© 2026 元気でんき. All rights reserved.
