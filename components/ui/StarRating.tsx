import { RatingIcon } from "@/data/types";

interface StarRatingProps {
  rating: number; // 1-5
  max?: number;
  size?: "sm" | "md" | "lg";
}

/**
 * 星評価コンポーネント
 * 5段階評価を星アイコンで視覚化
 */
export function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const renderStars = () => {
    const stars: RatingIcon[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // 星を追加
    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }

    // 半分の星を追加
    if (hasHalfStar) {
      stars.push("⭐︎");
    }

    // 空の星を追加
    const emptyStars = max - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push("☆");
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      {renderStars().map((star, index) => (
        <span key={index} className="text-yellow-400">
          {star}
        </span>
      ))}
      <span className="ml-2 text-gray-600 font-bold">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
