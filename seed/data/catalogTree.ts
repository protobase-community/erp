// Every name in English and Japanese: an organization's catalog is in its own language (`catalog` in reference.ts).
type Item = readonly [name: string, priceCents: number, ja: string]

export const tree: ReadonlyArray<{ name: string; ja: string; code: string; children: ReadonlyArray<{ name: string; ja: string; items: readonly Item[] }> }> = [
  {
    name: 'Fasteners',
    ja: '締結部品',
    code: 'FST',
    children: [
      { name: 'Bolts', ja: 'ボルト', items: [['M8 hex bolt A2, 100 pcs', 1890, '六角ボルト M8 A2 100本入'], ['M12 hex bolt 8.8, 50 pcs', 2150, '六角ボルト M12 強度区分8.8 50本入'], ['Countersunk screw M5, 200 pcs', 1260, '皿ねじ M5 200本入']] },
      { name: 'Nuts and washers', ja: 'ナット・座金', items: [['M10 hex nut A2, 100 pcs', 1240, '六角ナット M10 A2 100個入'], ['Stainless washer 8 mm, 250 pcs', 990, 'ステンレス平座金 8mm 250枚入'], ['Nyloc nut M8, 100 pcs', 1175, 'ナイロンナット M8 100個入']] },
      { name: 'Anchors', ja: 'アンカー', items: [['Wedge anchor M10 x 100, 20 pcs', 2480, 'ウェッジアンカー M10×100 20本入'], ['Wall plug 8 mm, 200 pcs', 760, 'プラグアンカー 8mm 200本入']] },
    ],
  },
  {
    name: 'Electrical',
    ja: '電気部材',
    code: 'ELC',
    children: [
      { name: 'Cable management', ja: '配線部材', items: [['Cable tie 300 mm, 100 pcs', 650, '結束バンド 300mm 100本入'], ['Cable gland M20, 25 pcs', 2340, 'ケーブルグランド M20 25個入'], ['Cable tray 100 mm, 3 m', 3890, 'ケーブルラック 100mm 3m']] },
      { name: 'Enclosures', ja: '盤・ボックス', items: [['Junction box IP65', 1480, 'ジャンクションボックス IP65'], ['Control cabinet 600 x 400', 12900, '制御盤 600×400']] },
      { name: 'Lighting', ja: '照明', items: [['LED panel 600 x 600, 40 W', 3290, 'LEDパネル 600×600 40W'], ['LED high bay 150 W', 8990, 'LED高天井灯 150W']] },
    ],
  },
  {
    name: 'Hydraulics',
    ja: '油圧機器',
    code: 'HYD',
    children: [
      { name: 'Hoses', ja: 'ホース', items: [['Hydraulic hose 1/2 in, 5 m', 8650, '油圧ホース 1/2インチ 5m'], ['Hydraulic hose 3/4 in, 5 m', 11450, '油圧ホース 3/4インチ 5m']] },
      { name: 'Couplings', ja: '継手', items: [['Hydraulic coupling 3/8 in', 1895, '油圧継手 3/8インチ'], ['Quick coupling 1/2 in', 2640, 'クイックカップリング 1/2インチ'], ['Banjo bolt M14', 540, 'バンジョーボルト M14']] },
    ],
  },
  {
    name: 'Packaging',
    ja: '梱包資材',
    code: 'PKG',
    children: [
      { name: 'Wrap and tape', ja: 'ラップ・テープ', items: [['Pallet wrap 500 mm', 740, 'ストレッチフィルム 500mm'], ['Bubble wrap roll 50 m', 1990, 'エアキャップ 50m巻'], ['Packing tape 48 mm, 6 rolls', 1380, '梱包用テープ 48mm 6巻']] },
      { name: 'Boxes', ja: '段ボール箱', items: [['Corrugated box 400 x 300', 215, '段ボール箱 400×300'], ['Corrugated box 600 x 400', 340, '段ボール箱 600×400']] },
      { name: 'Labels', ja: 'ラベル', items: [['Pallet label roll 100 x 150', 1175, 'パレットラベル 100×150 ロール'], ['Thermal printer ribbon', 890, 'サーマルプリンター用リボン']] },
    ],
  },
  {
    name: 'Safety',
    ja: '安全保護具',
    code: 'PPE',
    children: [
      { name: 'Hand protection', ja: '手袋', items: [['Safety gloves, size L', 395, '作業用手袋 Lサイズ'], ['Cut resistant gloves, size M', 885, '耐切創手袋 Mサイズ']] },
      { name: 'Eye and ear', ja: '保護メガネ・耳栓', items: [['Safety glasses, clear', 450, '保護メガネ クリア'], ['Ear defenders SNR 31', 1295, 'イヤーマフ SNR 31'], ['Earplugs, 200 pairs', 2290, '耳栓 200組入']] },
    ],
  },
  {
    name: 'Bearings and belts',
    ja: 'ベアリング・ベルト',
    code: 'BRG',
    children: [
      { name: 'Bearings', ja: 'ベアリング', items: [['Ball bearing 6204-2RS', 685, '玉軸受 6204-2RS'], ['Taper roller bearing 30205', 1420, '円すいころ軸受 30205'], ['Pillow block UCP205', 2260, 'ピロー形ユニット UCP205']] },
      { name: 'Belts', ja: 'ベルト', items: [['Timing belt HTD 5M, 600 mm', 2780, 'タイミングベルト HTD 5M 600mm'], ['V-belt SPA 1250', 1360, 'Vベルト SPA 1250']] },
    ],
  },
  {
    name: 'Lubricants',
    ja: '潤滑剤',
    code: 'LUB',
    children: [
      { name: 'Grease', ja: 'グリース', items: [['Grease cartridge, 400 g', 920, 'グリースカートリッジ 400g'], ['High temperature grease, 1 kg', 2150, '耐熱グリース 1kg']] },
      { name: 'Oil', ja: 'オイル', items: [['Machine oil ISO 68, 5 l', 3950, 'マシン油 ISO VG68 5L'], ['Hydraulic oil HLP 46, 20 l', 8450, '作動油 HLP 46 20L'], ['Cutting fluid, 10 l', 5480, '切削油 10L']] },
    ],
  },
  {
    name: 'Tools and pneumatics',
    ja: '工具・空圧機器',
    code: 'TLS',
    children: [
      { name: 'Hand tools', ja: '作業工具', items: [['Drill bit set HSS, 19 pcs', 3490, 'HSSドリルセット 19本組'], ['Torque wrench 20-100 Nm', 14900, 'トルクレンチ 20〜100N·m'], ['Angle grinder disc 125 mm, 10 pcs', 1880, 'ディスクグラインダー用砥石 125mm 10枚入']] },
      { name: 'Pneumatics', ja: '空圧機器', items: [['Pneumatic cylinder 40 x 100', 6120, 'エアシリンダー 40×100'], ['Air hose PU 8 mm, 20 m', 2475, 'ウレタンエアホース 8mm 20m']] },
      { name: 'Pallets', ja: 'パレット・台車', items: [['Euro pallet EPAL, used', 1150, 'ユーロパレット EPAL 中古'], ['Roll container, galvanised', 9800, 'カゴ台車 溶融亜鉛めっき']] },
    ],
  },
]
