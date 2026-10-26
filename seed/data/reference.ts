export const tagNames = [
  ['⭐ VIP', '#7c3aed'], ['Key account', '#2563eb'], ['Slow payer', '#dc2626'], ['Reseller', '#0891b2'],
  ['🌏 Export', '#059669'], ['Prospect', '#d97706'], ['Partner', '#4f46e5'], ['Seasonal', '#ca8a04'],
  ['Government', '#475569'], ['Education', '#0d9488'], ['⛔ Credit hold', '#b91c1c'], ['Framework contract', '#9333ea'],
] as const

/**
 * The two seeded organizations, each selling in its own currency at `rate` units to the euro the catalog is priced in,
 * rounded to `step` cents, and in its own language (`catalog`). `locales` weighs where their customers are; `staff`
 * is where their employees come from. Users are [display name, email name, role].
 */
export const orgSpecs = [
  {
    id: 1,
    name: 'Meridian Industrial Supply Pte. Ltd.',
    slug: 'meridian',
    country: 'SG',
    currency: 'SGD',
    rate: 1.45,
    step: 5,
    catalog: 'en',
    staff: 'SG',
    salary: [42_000, 156_000],
    share: 0.7,
    seed: 101,
    locales: [
      ['SG', 12], ['IN', 8], ['ID', 6], ['AE', 6], ['US', 6], ['GB', 5], ['DE', 5], ['BR', 5], ['CN', 4], ['NL', 4], ['FR', 4], ['MX', 4], ['NG', 4],
      ['TR', 4], ['TH', 4], ['VN', 4], ['GR', 3], ['IL', 3], ['RU', 3], ['PL', 3], ['IE', 3], ['JP', 3], ['KR', 3], ['IS', 2],
    ] as const,
    users: [['Wei Ling Tan', 'weiling', 'admin'], ['Arjun Pillai', 'arjun', 'sales'], ['Nur Aisyah binti Rahman', 'aisyah', 'finance'], ['Marcus Goh', 'marcus', 'warehouse'], ['Priya Nair', 'priya', 'sales'], ['Daniel Okafor', 'daniel', 'warehouse'], ['Farah Al-Hashimi', 'farah', 'finance'], ['Jun Jie Lim', 'junjie', 'sales']] as const,
    warehouses: [['SIN-01', 'Tuas distribution centre', 'Singapore', 'SG'], ['RTM-02', 'Rotterdam port', 'Rotterdam', 'NL'], ['DXB-01', 'مستودع جبل علي', 'دبي', 'AE'], ['GRU-01', 'São Paulo Guarulhos', 'Guarulhos', 'BR']] as const,
  },
  {
    id: 2,
    name: '青嵐産業資材株式会社',
    slug: 'seiran',
    country: 'JP',
    currency: 'JPY',
    rate: 160,
    step: 100,
    catalog: 'ja',
    staff: 'JP',
    salary: [3_600_000, 11_000_000],
    share: 0.3,
    seed: 202,
    locales: [['JP', 40], ['KR', 12], ['CN', 12], ['TH', 8], ['VN', 8], ['IN', 6], ['ID', 5], ['SG', 5], ['US', 4]] as const,
    users: [['佐藤 美咲', 'misaki', 'admin'], ['高橋 蓮', 'ren', 'sales'], ['田中 結衣', 'yui', 'sales'], ['伊藤 健太', 'kenta', 'finance'], ['渡辺 翔', 'sho', 'warehouse'], ['山本 さくら', 'sakura', 'warehouse']] as const,
    warehouses: [['YOK-01', '横浜第一倉庫', '横浜市', 'JP'], ['OSA-01', '大阪南港センター', '大阪市', 'JP'], ['PUS-01', '부산 신항 물류센터', '부산', 'KR']] as const,
  },
] as const
