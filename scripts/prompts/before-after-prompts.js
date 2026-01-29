// Before/After写真用プロンプト
// 業務用エアコンの修理前後を比較する写真を生成するためのプロンプト

const beforeAfterPrompts = [
  {
    category: 'cleaning',
    title: 'クリーニング作業',
    beforePrompt: `Professional commercial air conditioner maintenance work, dirty indoor unit of ceiling-mounted cassette type AC, thick dust accumulated inside the filters and fan coils, neglected for years, realistic industrial photography, high detail`,
    afterPrompt: `Same ceiling-mounted cassette type air conditioner unit after professional cleaning, sparkling clean filters and coils, white and pristine, well-maintained industrial equipment, professional lighting, high quality commercial photography`,
    width: 1024,
    height: 768
  },
  {
    category: 'repair',
    title: 'ガス不足補充',
    beforePrompt: `Commercial air conditioner outdoor unit, technician working on refrigerant pipe, diagnostic equipment connected, industrial setting, realistic repair work photo`,
    afterPrompt: `Commercial air conditioner outdoor unit after repair, new refrigerant pipes installed, proper insulation, professional workmanship, clean and organized installation`,
    width: 1024,
    height: 768
  },
  {
    category: 'replacement',
    title: '室外機交換',
    beforePrompt: `Old deteriorated commercial air conditioner outdoor unit, rust and damage, rooftop installation, cloudy day, realistic industrial photography`,
    afterPrompt: `Brand new modern commercial air conditioner outdoor unit, rooftop installation, clean white unit, professional installation, sunny day, high quality photo`,
    width: 1024,
    height: 768
  }
];

module.exports = { beforeAfterPrompts };
