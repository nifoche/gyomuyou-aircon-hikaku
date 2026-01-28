/**
 * 汎用比較サイトフレームワーク - 型定義
 * 業種固有の比較サイトを構築するための汎用的なデータモデル
 */

// アイコンタイプ
export type IconType = "2maru" | "maru" | "batsu" | "none";

// 評価アイコン
export type RatingIcon = "⭐︎" | "★" | "☆";

/**
 * 汎用ストア型
 * @template T 業種固有の比較軸キー（例: "speed" | "price" | "technique" | "guarantee" | "area"）
 */
export interface GenericStore<T extends string> {
  // 基本情報
  id: string;
  rank: number;
  name: string;
  imageUrl: string;
  logoUrl: string;
  catchphrase: string;
  description: string;
  highlights: string[];
  phone: string;
  officialUrl: string;

  // 評価項目（共通）
  guarantee: {
    period: string; // "工事10年+メーカー製品7年"
    rating: number; // 1-5
  };
  trackRecord: {
    value: string; // "創業99年", "70,000件"
    rating: number;
  };
  responseTime: {
    hours: string; // "24時間365日"
    rating: number;
  };
  coverage: {
    areas: string[]; // ["全国"] or ["関東", "関西", ...]
    rating: number;
  };
  freeQuote: boolean;
  overallRating: number; // 総合評価（1-5）

  // 業種固有の比較軸
  comparisonAxes: {
    [key in T]: {
      label: string;
      icon: IconType;
      rating?: number;
      discount?: number; // 価格比較用（例: 82%OFF）
    };
  };

  // 絞り込み検索用
  filters: {
    [category: string]: string[];
  };
}

/**
 * エアコン比較サイトの比較軸
 */
export type AirconComparisonAxes =
  | "speed" // 対応スピード
  | "price" // 価格
  | "technique" // 施工技術
  | "guarantee" // 保証
  | "area"; // 施工エリア

/**
 * エアコン業者ストア型
 */
export interface AirconStore extends GenericStore<AirconComparisonAxes> {
  // エアコン固有の項目があれば追加
}

/**
 * 絞り込み検索フィルター型
 */
export interface SearchFilters {
  types?: ("replacement" | "repair")[];
  buildings?: ("apartment" | "house" | "office" | "store")[];
  paymentMethods?: ("bank" | "card" | "conbini" | "installment")[];
  guaranteePeriod?: ("long" | "medium" | "short")[];
}
