import type { Locale } from '../locale'

export const AE: Locale = {
  language: 'ar',
  stems: [['الواحة', 'alwaha'], ['النخلة', 'alnakhla'], ['الصقر', 'alsaqr'], ['الريم', 'alreem'], ['دانة', 'dana']],
  nouns: [['للتجارة', 'trading'], ['للمعدات الصناعية', 'industrial equipment'], ['للخدمات اللوجستية', 'logistics'], ['للمقاولات', 'contracting']],
  company: (brand, noun) => `شركة ${brand} ${noun} ذ.م.م`,
  tld: 'ae',
  // The Emirates have no postal codes: mail goes to a P.O. box.
  cities: [['دبي', null, 'دبي'], ['أبوظبي', null, 'أبوظبي'], ['الشارقة', null, 'الشارقة'], ['رأس الخيمة', null, 'رأس الخيمة']],
  streets: ['شارع الشيخ زايد', 'شارع الوصل', 'شارع المطار', 'المنطقة الصناعية ١٢'],
  address: (street, number) => `${street}، مبنى ${number}`,
  givenNames: [['محمد', 'mohammed'], ['فاطمة', 'fatima'], ['أحمد', 'ahmed'], ['مريم', 'maryam'], ['خالد', 'khaled'], ['نورة', 'noura'], ['يوسف', 'yousef'], ['ليلى', 'layla']],
  familyNames: [['الهاشمي', 'alhashimi'], ['المنصوري', 'almansoori'], ['الشامسي', 'alshamsi'], ['الكعبي', 'alkaabi'], ['حداد', 'haddad'], ['خوري', 'khoury']],
  phone: '+971 4 ### ####',
  mobile: '+971 50 ### ####',
  vat: '100#########003',
  vatRate: 5,
  note: 'يرجى التسليم قبل الساعة ١٠ صباحًا، البوابة رقم ٣',
}

export const IL: Locale = {
  language: 'he',
  stems: [['אור', 'or'], ['גלבוע', 'gilboa'], ['שקד', 'shaked'], ['כרמל', 'carmel'], ['נגב', 'negev']],
  nouns: [['תעשיות', 'industries'], ['הנדסה', 'engineering'], ['סחר', 'trade'], ['מערכות', 'systems']],
  company: (brand, noun) => `${brand} ${noun} בע״מ`,
  tld: 'co.il',
  cities: [['תל אביב-יפו', '6######', 'מחוז תל אביב'], ['חיפה', '3######', 'מחוז חיפה'], ['באר שבע', '84#####', 'מחוז הדרום'], ['ירושלים', '9######', 'מחוז ירושלים']],
  streets: ['הרצל', 'ז׳בוטינסקי', 'דרך מנחם בגין', 'העצמאות'],
  address: (street, number) => `${street} ${number}`,
  givenNames: [['נועה', 'noa'], ['איתי', 'itai'], ['תמר', 'tamar'], ['יונתן', 'yonatan'], ['מיכל', 'michal'], ['אורי', 'ori']],
  familyNames: [['כהן', 'cohen'], ['לוי', 'levi'], ['מזרחי', 'mizrahi'], ['פרץ', 'peretz'], ['ביטון', 'biton'], ['שפירא', 'shapira']],
  phone: '+972 3-###-####',
  mobile: '+972 5#-###-####',
  vat: '5########',
  vatRate: 18,
  note: 'נא לתאם משלוח מראש, רציף 3',
}

export const NG: Locale = {
  language: 'en-NG',
  stems: ['Crestfield', 'Royal Palm', 'Unity Bridge', 'Lekki', 'Olumo'],
  nouns: ['Engineering', 'Industrial Supplies', 'Logistics', 'Ventures'],
  company: (brand, noun) => `${brand} ${noun} Ltd`,
  tld: 'com.ng',
  cities: [['Lagos', '1#####', 'Lagos State'], ['Ibadan', '200###', 'Oyo State'], ['Kano', '700###', 'Kano State'], ['Abuja', '900###', 'Federal Capital Territory']],
  streets: ['Adeola Odeku Street', 'Bode Thomas Street', 'Murtala Mohammed Way', 'Ahmadu Bello Way'],
  address: (street, number) => `${number} ${street}`,
  // Yoruba names keep their tone marks and dots below.
  givenNames: ['Adébáyọ̀', 'Chiamaka', 'Olúwaseun', 'Ngozi', 'Abubakar', 'Fúnmiláyọ̀', 'Emeka', 'Aisha'],
  familyNames: ['Okonkwo', 'Adéyẹmí', 'Bello', 'Eze', 'Ọlápàdé', 'Nwosu', 'Ibrahim', 'Okafor'],
  phone: '+234 1 ### ####',
  mobile: '+234 80# ### ####',
  vat: '########-0001',
  vatRate: 7.5,
  note: 'Call before delivery, gate man will open 🙏',
}
