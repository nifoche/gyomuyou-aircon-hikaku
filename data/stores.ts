import { AirconStore } from "./types";

/**
 * 業務用エアコン専門店データ
 * 競合他社5店舗のサンプルデータ
 */
export const stores: AirconStore[] = [
  {
    id: "ac_a",
    rank: 1,
    name: "エアコンプロ",
    imageUrl: "/images/ac-pro.jpg",
    logoUrl: "/images/rank-1.png",
    catchphrase: "＼最大75% OFF／ 【早いもの勝ち】業務用エアコン入れ替えキャンペーン実施中！",
    description: "業界最安値に挑戦！業務用エアコンの交換・修理の専門店",
    highlights: [
      "急なエアコントラブルでも安心！24時間・365日受付",
      "工事10年+メーカー製品5年！業界最長級保証",
      "創業35年！エアコンプロに任せれば安心！",
      "全国対応だから、どこでも緊急駆けつけ！"
    ],
    phone: "0120-XXX-XXX",
    officialUrl: "https://example.com/ac-pro",
    guarantee: {
      period: "工事10年+メーカー製品5年",
      rating: 5
    },
    trackRecord: {
      value: "施工実績50,000件",
      rating: 5
    },
    responseTime: {
      hours: "24時間365日",
      rating: 5
    },
    coverage: {
      areas: ["全国"],
      rating: 5
    },
    freeQuote: true,
    overallRating: 5.0,
    comparisonAxes: {
      speed: {
        label: "24時間・365日受付 貸出用機器あり",
        icon: "2maru",
        rating: 5
      },
      price: {
        label: "本体最大75％OFF！工事費込み",
        icon: "2maru",
        discount: 75,
        rating: 5
      },
      technique: {
        label: "一级技能士・上級技能士保有者多数",
        icon: "maru",
        rating: 5
      },
      guarantee: {
        label: "工事10年+メーカー5年",
        icon: "2maru",
        rating: 5
      },
      area: {
        label: "全国対応",
        icon: "maru",
        rating: 5
      }
    },
    filters: {
      types: ["replacement", "repair"],
      buildings: ["apartment", "house", "office", "store"],
      paymentMethods: ["bank", "card", "installment"],
      guaranteePeriod: "long"
    }
  },
  {
    id: "ac_b",
    rank: 2,
    name: "冷房マスター",
    imageUrl: "/images/reibo-master.jpg",
    logoUrl: "/images/rank-2.png",
    catchphrase: "＼70% OFF／ 業務用エアコン交換なら冷房マスターにお任せ！",
    description: "業務用エアコンの交換・取り付けのプロフェッショナル",
    highlights: [
      "短納期対応！最短即日施工可能",
      "工事8年保証！安心のアフターサービス",
      "施工実績30,000件以上の信頼実績",
      "関東・関西・東海エリアに密着"
    ],
    phone: "0120-XXX-XXX",
    officialUrl: "https://example.com/reibo-master",
    guarantee: {
      period: "工事8年",
      rating: 4
    },
    trackRecord: {
      value: "施工実績30,000件",
      rating: 4
    },
    responseTime: {
      hours: "8:00-20:00（年中無休）",
      rating: 4
    },
    coverage: {
      areas: ["関東", "関西", "東海"],
      rating: 4
    },
    freeQuote: true,
    overallRating: 4.5,
    comparisonAxes: {
      speed: {
        label: "最短即日対応（8:00-20:00）",
        icon: "maru",
        rating: 4
      },
      price: {
        label: "本体70％OFF！",
        icon: "maru",
        discount: 70,
        rating: 4
      },
      technique: {
        label: "一级技能士保有",
        icon: "maru",
        rating: 4
      },
      guarantee: {
        label: "工事8年",
        icon: "maru",
        rating: 4
      },
      area: {
        label: "関東・関西・東海",
        icon: "maru",
        rating: 4
      }
    },
    filters: {
      types: ["replacement"],
      buildings: ["office", "store"],
      paymentMethods: ["bank", "card", "conbini"],
      guaranteePeriod: "long"
    }
  },
  {
    id: "ac_c",
    rank: 3,
    name: "エアコン救急車",
    imageUrl: "/images/ac-kyukyu.jpg",
    logoUrl: "/images/rank-3.png",
    catchphrase: "緊急時も安心！24時間対応のエアコン救急車",
    description: "エアコンのトラブルに特化した緊急対応専門店",
    highlights: [
      "24時間365日対応！緊急時も安心",
      "貸出用機器完備！業務停止を最小限に",
      "工事7年保証",
      "首都圏全域に緊急駆けつけ"
    ],
    phone: "0120-XXX-XXX",
    officialUrl: "https://example.com/ac-kyukyu",
    guarantee: {
      period: "工事7年",
      rating: 4
    },
    trackRecord: {
      value: "創業20年",
      rating: 4
    },
    responseTime: {
      hours: "24時間365日",
      rating: 5
    },
    coverage: {
      areas: ["首都圏"],
      rating: 3
    },
    freeQuote: true,
    overallRating: 4.3,
    comparisonAxes: {
      speed: {
        label: "24時間・365日緊急対応",
        icon: "2maru",
        rating: 5
      },
      price: {
        label: "紧急対応料金プランあり",
        icon: "batsu",
        rating: 3
      },
      technique: {
        label: "一级技能士保有",
        icon: "maru",
        rating: 4
      },
      guarantee: {
        label: "工事7年",
        icon: "maru",
        rating: 4
      },
      area: {
        label: "首都圏のみ",
        icon: "batsu",
        rating: 3
      }
    },
    filters: {
      types: ["repair"],
      buildings: ["apartment", "house", "office"],
      paymentMethods: ["card", "installment"],
      guaranteePeriod: "medium"
    }
  },
  {
    id: "ac_d",
    rank: 4,
    name: "空調テック",
    imageUrl: "/images/kucho-tech.jpg",
    logoUrl: "/images/rank-4.png",
    catchphrase: "＼60% OFF／ 大規模施設向け業務用エアコン交換の専門家",
    description: "オフィスビル・工場・商業施設向け大規模エアコン工事専門",
    highlights: [
      "大規模施設の施工実績豊富",
      "工事5年保証",
      "施工管理技士保有",
      "全国主要都市に拠点"
    ],
    phone: "0120-XXX-XXX",
    officialUrl: "https://example.com/kucho-tech",
    guarantee: {
      period: "工事5年",
      rating: 3
    },
    trackRecord: {
      value: "施工実績15,000件",
      rating: 3
    },
    responseTime: {
      hours: "9:00-18:00（平日）",
      rating: 3
    },
    coverage: {
      areas: ["全国主要都市"],
      rating: 4
    },
    freeQuote: true,
    overallRating: 3.8,
    comparisonAxes: {
      speed: {
        label: "9:00-18:00対応",
        icon: "batsu",
        rating: 3
      },
      price: {
        label: "本体60％OFF！",
        icon: "maru",
        discount: 60,
        rating: 4
      },
      technique: {
        label: "施工管理技士保有",
        icon: "maru",
        rating: 4
      },
      guarantee: {
        label: "工事5年",
        icon: "batsu",
        rating: 3
      },
      area: {
        label: "全国主要都市",
        icon: "maru",
        rating: 4
      }
    },
    filters: {
      types: ["replacement"],
      buildings: ["office", "store"],
      paymentMethods: ["bank"],
      guaranteePeriod: "medium"
    }
  },
  {
    id: "ac_e",
    rank: 5,
    name: "クールエアコン",
    imageUrl: "/images/cool-aircon.jpg",
    logoUrl: "/images/rank-5.png",
    catchphrase: "お客様満足度95%！地域密着型のエアコン専門店",
    description: "地域に密着したきめ細かい対応が好評のエアコン専門店",
    highlights: [
      "お客様満足度95%！",
      "工事3年保証",
      "地域に密着した迅速対応",
      "見積もり無料"
    ],
    phone: "0120-XXX-XXX",
    officialUrl: "https://example.com/cool-aircon",
    guarantee: {
      period: "工事3年",
      rating: 3
    },
    trackRecord: {
      value: "創業10年",
      rating: 3
    },
    responseTime: {
      hours: "8:00-20:00",
      rating: 4
    },
    coverage: {
      areas: ["関東"],
      rating: 3
    },
    freeQuote: true,
    overallRating: 3.5,
    comparisonAxes: {
      speed: {
        label: "8:00-20:00対応",
        icon: "maru",
        rating: 4
      },
      price: {
        label: "お得なキャンペーンあり",
        icon: "maru",
        rating: 3
      },
      technique: {
        label: "一级技能士保有",
        icon: "maru",
        rating: 3
      },
      guarantee: {
        label: "工事3年",
        icon: "batsu",
        rating: 3
      },
      area: {
        label: "関東のみ",
        icon: "batsu",
        rating: 3
      }
    },
    filters: {
      types: ["replacement", "repair"],
      buildings: ["apartment", "house"],
      paymentMethods: ["bank", "card", "conbini"],
      guaranteePeriod: "short"
    }
  }
];
