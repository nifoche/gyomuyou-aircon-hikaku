import { AirconStore } from "@/data/types";
import { StarRating } from "@/components/ui/StarRating";

interface FeaturedCardProps {
  store: AirconStore;
}

/**
 * TOP3ランキングカードコンポーネント
 * 画像左配置、テキスト右配置（PC）/ 縦積み（SP）
 */
export function FeaturedCard({ store }: FeaturedCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* ランキングバッジ */}
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-tl-lg rounded-br-lg font-bold">
          第{store.rank}位
        </div>

        {/* 画像エリア */}
        <div className="w-full md:w-1/3 relative">
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {store.imageUrl ? (
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-center">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm">{store.name}</div>
              </div>
            )}
          </div>
        </div>

        {/* 詳細エリア */}
        <div className="flex-1">
          {/* 店舗名と評価 */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-800">{store.name}</h2>
            <StarRating rating={store.overallRating} size="lg" />
          </div>

          {/* キャッチコピー */}
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 font-bold text-center">
            {store.catchphrase}
          </div>

          {/* 高評価ポイント */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-700 mb-2">高評価ポイント：</h3>
            <ul className="space-y-1">
              {store.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAボタン */}
          <div className="flex gap-3">
            <a
              href={`tel:${store.phone}`}
              className="flex-1 bg-green-500 text-white text-center py-3 rounded font-bold hover:bg-green-600 transition"
            >
              📞 電話する
            </a>
            <a
              href={store.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 text-white text-center py-3 rounded font-bold hover:bg-blue-600 transition"
            >
              公式サイトを見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
