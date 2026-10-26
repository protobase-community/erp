import { pick } from '../../rng'
import type { Locale } from '../locale'

export const JP: Locale = {
  language: 'ja',
  stems: [['若葉', 'wakaba'], ['千鳥', 'chidori'], ['白鷺', 'shirasagi'], ['常盤', 'tokiwa'], ['菱川', 'hishikawa'], ['松風', 'matsukaze']],
  nouns: [['精機', 'seiki'], ['工業', 'kogyo'], ['商事', 'shoji'], ['機材', 'kizai'], ['物流', 'butsuryu'], ['技研', 'giken']],
  company: (brand, noun, _city, rand) => (rand() < 0.5 ? `株式会社${brand}${noun}` : `${brand}${noun}株式会社`),
  tld: 'co.jp',
  cities: [['大阪市', '5##-####', '大阪府'], ['横浜市', '22#-####', '神奈川県'], ['名古屋市', '45#-####', '愛知県'], ['札幌市', '06#-####', '北海道'], ['福岡市', '81#-####', '福岡県']],
  streets: ['中央区本町', '港北区新横浜', '中村区名駅', '博多区博多駅前'],
  address: (street, number) => `${street}${1 + (number % 4)}丁目${number}-${1 + ((number * 7) % 19)}`,
  givenNames: [['陽菜', 'hina'], ['蓮', 'ren'], ['結衣', 'yui'], ['大翔', 'hiroto'], ['美咲', 'misaki'], ['健太', 'kenta'], ['さくら', 'sakura'], ['浩二', 'koji']],
  familyNames: [['佐藤', 'sato'], ['鈴木', 'suzuki'], ['高橋', 'takahashi'], ['田中', 'tanaka'], ['渡辺', 'watanabe'], ['山本', 'yamamoto'], ['中村', 'nakamura'], ['小林', 'kobayashi']],
  // Written as at home, without the country code.
  phone: '03-####-####',
  mobile: '090-####-####',
  vat: 'T#############',
  vatRate: 10,
  note: '午前中の配達を希望します。3番搬入口までお願いします。',
}

export const CN: Locale = {
  language: 'zh-CN',
  stems: [['鑫源', 'xinyuan'], ['宏远', 'hongyuan'], ['金桥', 'jinqiao'], ['润丰', 'runfeng'], ['嘉盛', 'jiasheng'], ['永泰', 'yongtai']],
  nouns: [['机械', 'jixie'], ['五金', 'wujin'], ['物流', 'wuliu'], ['贸易', 'maoyi'], ['电气', 'dianqi'], ['液压', 'yeya']],
  company: (brand, noun, city) => `${city.replace(/市$/, '')}${brand}${noun}有限公司`,
  tld: 'com.cn',
  cities: [['上海市', '200###', '上海市'], ['深圳市', '518###', '广东省'], ['苏州市', '215###', '江苏省'], ['成都市', '610###', '四川省']],
  streets: ['浦东大道', '科技园南路', '星湖街', '人民路'],
  address: (street, number) => `${street}${number}号`,
  givenNames: [['伟', 'wei'], ['芳', 'fang'], ['秀英', 'xiuying'], ['磊', 'lei'], ['静', 'jing'], ['子涵', 'zihan'], ['浩然', 'haoran'], ['婷', 'ting']],
  familyNames: [['王', 'wang'], ['李', 'li'], ['张', 'zhang'], ['刘', 'liu'], ['陈', 'chen'], ['欧阳', 'ouyang'], ['赵', 'zhao'], ['黄', 'huang']],
  phone: '+86 21 #### ####',
  mobile: '+86 13# #### ####',
  vat: '913#####MA########',
  vatRate: 13,
  note: '请在上午10点前送达，3号卸货口',
}

export const KR: Locale = {
  language: 'ko',
  stems: [['한빛', 'hanbit'], ['대양', 'daeyang'], ['새솔', 'saesol'], ['청운', 'cheongun'], ['금강', 'geumgang']],
  nouns: [['기계', 'gigye'], ['정밀', 'jeongmil'], ['물산', 'mulsan'], ['산업', 'saneop'], ['테크', 'tech']],
  company: (brand, noun, _city, rand) => (rand() < 0.5 ? `(주)${brand}${noun}` : `${brand}${noun} 주식회사`),
  tld: 'co.kr',
  cities: [['서울', '0####', '서울특별시'], ['부산', '4####', '부산광역시'], ['인천', '2####', '인천광역시'], ['창원', '51###', '경상남도']],
  streets: ['테헤란로', '산업로', '중앙대로', '해운대로'],
  address: (street, number) => `${street} ${number}`,
  givenNames: [['민준', 'minjun'], ['서연', 'seoyeon'], ['지훈', 'jihoon'], ['수빈', 'subin'], ['현우', 'hyunwoo'], ['지은', 'jieun']],
  familyNames: [['김', 'kim'], ['이', 'lee'], ['박', 'park'], ['최', 'choi'], ['정', 'jung'], ['남궁', 'namgung']],
  phone: '+82 2-###-####',
  mobile: '010-####-####',
  vat: '###-##-#####',
  vatRate: 10,
  note: '오전 10시 전에 배송 부탁드립니다. 3번 게이트',
}

export const TH: Locale = {
  language: 'th',
  stems: [['สยาม', 'siam'], ['รุ่งเรือง', 'rungruang'], ['ทองดี', 'thongdee'], ['เจริญกิจ', 'charoenkit'], ['ศรีสุข', 'srisuk']],
  nouns: [['เทคนิค', 'technic'], ['อุตสาหกรรม', 'industry'], ['ซัพพลาย', 'supply'], ['เครื่องกล', 'machinery']],
  company: (brand, noun) => `บริษัท ${brand}${noun} จำกัด`,
  tld: 'co.th',
  cities: [['กรุงเทพมหานคร', '10###', 'กรุงเทพมหานคร'], ['เชียงใหม่', '50###', 'เชียงใหม่'], ['ชลบุรี', '20###', 'ชลบุรี'], ['ขอนแก่น', '40###', 'ขอนแก่น']],
  streets: ['สุขุมวิท', 'พระราม 9', 'บางนา-ตราด', 'มิตรภาพ'],
  address: (street, number) => `${number} ถนน${street}`,
  givenNames: [['สมชาย', 'somchai'], ['สุดา', 'suda'], ['ณัฐพล', 'nattaphon'], ['พิมพ์ชนก', 'phimchanok'], ['วรวุฒิ', 'worawut'], ['กมลวรรณ', 'kamonwan']],
  familyNames: [['สุขสวัสดิ์', 'suksawat'], ['ศรีวงศ์', 'sriwong'], ['จันทร์เพ็ญ', 'chanpen'], ['แก้วประเสริฐ', 'kaewprasert'], ['วงศ์ใหญ่', 'wongyai']],
  phone: '+66 2 ### ####',
  mobile: '+66 8# ### ####',
  vat: '0#05#########',
  vatRate: 7,
  note: 'กรุณาส่งก่อน 10 โมงเช้า ประตู 3',
}

export const IN: Locale = {
  language: 'hi',
  stems: [['सूर्य', 'surya'], ['गंगा', 'ganga'], ['नवभारत', 'navbharat'], ['कावेरी', 'kaveri'], ['हिमालय', 'himalaya']],
  nouns: [['इंजीनियरिंग', 'engineering'], ['ट्रेडर्स', 'traders'], ['उद्योग', 'udyog'], ['इंडस्ट्रीज़', 'industries']],
  company: (brand, noun) => `${brand} ${noun} प्राइवेट लिमिटेड`,
  tld: 'in',
  cities: [['मुंबई', '4000##', 'महाराष्ट्र'], ['पुणे', '4110##', 'महाराष्ट्र'], ['जयपुर', '3020##', 'राजस्थान'], ['नई दिल्ली', '1100##', 'दिल्ली']],
  streets: ['एमजी रोड', 'स्टेशन रोड', 'औद्योगिक क्षेत्र फ़ेज़ 2', 'नेहरू मार्ग'],
  address: (street, number) => `${number}, ${street}`,
  givenNames: [['आरव', 'aarav'], ['अनन्या', 'ananya'], ['विवान', 'vivaan'], ['प्रिया', 'priya'], ['अर्जुन', 'arjun'], ['कविता', 'kavita']],
  familyNames: [['शर्मा', 'sharma'], ['गुप्ता', 'gupta'], ['पटेल', 'patel'], ['अय्यर', 'iyer'], ['रेड्डी', 'reddy'], ['देशपांडे', 'deshpande']],
  phone: '+91 22 #### ####',
  mobile: '+91 9#### #####',
  vat: '27@@@@@####@1Z#',
  vatRate: 18,
  note: 'कृपया सुबह 10 बजे से पहले डिलीवरी करें, गेट नंबर 3',
}

export const VN: Locale = {
  language: 'vi',
  stems: ['Phú Thành', 'Hòa Bình', 'Tân Việt', 'Minh Phát', 'Đại Dương'],
  nouns: ['Cơ Khí', 'Thương Mại', 'Kỹ Thuật', 'Vận Tải'],
  company: (brand, noun) => `Công ty TNHH ${noun} ${brand}`,
  tld: 'vn',
  cities: [['Hà Nội', '1#####', 'Hà Nội'], ['Thành phố Hồ Chí Minh', '7#####', 'Thành phố Hồ Chí Minh'], ['Đà Nẵng', '55####', 'Đà Nẵng'], ['Hải Phòng', '18####', 'Hải Phòng']],
  streets: ['Đường Lê Lợi', 'Đường Nguyễn Huệ', 'Khu công nghiệp Tân Bình', 'Đường Trần Hưng Đạo'],
  address: (street, number) => `Số ${number} ${street}`,
  givenNames: ['Văn Hùng', 'Thị Lan', 'Minh Tuấn', 'Ngọc Ánh', 'Quốc Bảo', 'Thu Hà', 'Đức Thắng'],
  familyNames: ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Đặng', 'Bùi'],
  phone: '+84 28 #### ####',
  mobile: '+84 9# ### ## ##',
  vat: '03########',
  vatRate: 10,
  note: 'Vui lòng giao trước 10 giờ sáng, cổng số 3',
}

export const ID: Locale = {
  language: 'id',
  stems: ['Sinar', 'Cahaya', 'Bintang', 'Mitra', 'Karya'],
  nouns: ['Teknik Abadi', 'Mandiri', 'Logistik', 'Perkasa', 'Sejahtera'],
  company: (brand, noun) => `PT ${brand} ${noun}`,
  tld: 'co.id',
  cities: [['Jakarta', '1####', 'DKI Jakarta'], ['Surabaya', '60###', 'Jawa Timur'], ['Bandung', '40###', 'Jawa Barat'], ['Medan', '20###', 'Sumatera Utara']],
  streets: ['Sudirman', 'Gatot Subroto', 'Raya Industri', 'Diponegoro'],
  address: (street, number) => `Jl. ${street} No. ${number}`,
  givenNames: ['Sutrisno', 'Wulandari', 'Budi', 'Siti', 'Agus', 'Dewi', 'Rizky', 'Hendra'],
  familyNames: ['Santoso', 'Wijaya', 'Hidayat', 'Saputra', 'Kusuma', 'Halim'],
  mononyms: 0.35,
  phone: '+62 21 #### ####',
  mobile: '+62 81#-####-####',
  vat: '##.###.###.#-###.000',
  vatRate: 11,
  note: 'Mohon dikirim sebelum jam 10 pagi, gerbang 3',
}

export const SG: Locale = {
  language: 'en-SG',
  stems: ['Straits', 'Harbourfront', 'Jurong', 'Kallang', 'Lion Gate'],
  nouns: ['Engineering', 'Trading', 'Marine Supplies', 'Logistics'],
  company: (brand, noun) => `${brand} ${noun} Pte. Ltd.`,
  tld: 'com.sg',
  // One city; the postal code places the building.
  cities: [['Singapore', '63####', null], ['Singapore', '40####', null], ['Singapore', '61####', null], ['Singapore', '34####', null]],
  streets: ['Tuas Avenue 8', 'Ubi Road 1', 'Jurong Port Road', 'Kallang Way'],
  address: (street, number) => `${number} ${street}`,
  givenNames: [],
  familyNames: [],
  // Chinese names put the family name first, Malay names have none (bin and binti name the father), and Tamil names
  // often take the father's name as the second.
  person: (rand) => {
    const roll = rand()
    if (roll < 0.55) return { given: pick(rand, ['Wei Ming', 'Hui Min', 'Jun Jie', 'Xin Yi', 'Kai Wen']), family: pick(rand, ['Tan', 'Lim', 'Ng', 'Goh', 'Chua']) }
    if (roll < 0.8) return { given: pick(rand, ['Nur Aisyah binti Rahman', 'Muhammad Faris bin Ismail', 'Siti Hajar binti Osman', 'Ahmad Danial bin Yusof']), family: null }
    return { given: pick(rand, ['Kavitha', 'Arjun', 'Deepa', 'Suresh']), family: pick(rand, ['Subramaniam', 'Pillai', 'Nair', 'Krishnan']) }
  },
  phone: '+65 6### ####',
  mobile: '+65 9### ####',
  vat: '20#######@',
  vatRate: 9,
  note: 'Loading bay 3, please call ahead 📞',
}
