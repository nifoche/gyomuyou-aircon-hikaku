import { IconType } from "@/data/types";

interface IconBadgeProps {
  icon: IconType;
  label?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * アイコンバッジコンポーネント
 * ○△✕アイコンを視覚化
 */
export function IconBadge({ icon, label, size = "md" }: IconBadgeProps) {
  const sizeClasses = {
    sm: "text-sm w-6 h-6",
    md: "text-base w-8 h-8",
    lg: "text-lg w-10 h-10"
  };

  const iconMap: Record<IconType, { icon: string; color: string; bgColor: string }> = {
    "2maru": {
      icon: "⑵",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    maru: {
      icon: "○",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    batsu: {
      icon: "✕",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    none: {
      icon: "−",
      color: "text-gray-400",
      bgColor: "bg-gray-50"
    }
  };

  const { icon: iconChar, color, bgColor } = iconMap[icon];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${color} ${bgColor} font-bold`}
      >
        {iconChar}
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </div>
  );
}
