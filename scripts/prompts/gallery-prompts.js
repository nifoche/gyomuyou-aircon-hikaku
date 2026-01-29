// ギャラリー用プロンプト
// 業務用エアコンの施工事例写真を生成するためのプロンプト

const galleryPrompts = [
  {
    category: 'installation',
    caption: 'オフィスビルへの設置作業',
    prompt: `Professional technicians installing commercial air conditioner system in modern office building, ceiling work, safety equipment, industrial photography, high detail, 4k quality`,
    width: 1024,
    height: 768
  },
  {
    category: 'maintenance',
    caption: '定期メンテナンス作業',
    prompt: `HVAC technician performing routine maintenance on commercial air conditioning system, checking gauges, inspecting outdoor unit, professional work setting, realistic photo`,
    width: 1024,
    height: 768
  },
  {
    category: 'emergency',
    caption: '緊急修理対応',
    prompt: `Emergency repair service for commercial air conditioner at night, technician working under portable lights, urgent repair situation, professional HVAC service, realistic night photography`,
    width: 1024,
    height: 768
  },
  {
    category: 'installation',
    caption: '店舗へのエアコン設置',
    prompt: `Commercial air conditioner installation in retail store, technicians mounting indoor unit on wall, professional installation work, bright modern store interior`,
    width: 1024,
    height: 768
  },
  {
    category: 'maintenance',
    caption: '室外機の点検作業',
    prompt: `HVAC technician inspecting commercial air conditioner outdoor units, using diagnostic tools, professional maintenance service, industrial rooftop setting`,
    width: 1024,
    height: 768
  },
  {
    category: 'installation',
    caption: '配管工事の様子',
    prompt: `Commercial air conditioner piping installation, copper refrigerant pipes, professional insulation work, neat and organized installation, industrial photography`,
    width: 1024,
    height: 768
  }
];

module.exports = { galleryPrompts };
