import { pick } from '../../rng'
import type { Locale } from '../locale'

export const NL: Locale = {
  language: 'nl',
  stems: ['Polder', 'Rijnland', 'Delta', 'Veluwe', 'Maasvallei', 'Waterland', 'Amstel', 'IJsselmeer'],
  nouns: ['Logistiek', 'Techniek', 'Verpakking', 'Groothandel', 'Metaal', 'Machinebouw'],
  company: (brand, noun) => `${brand} ${noun} B.V.`,
  tld: 'nl',
  cities: [['Rotterdam', '30## @@', 'Zuid-Holland'], ['Eindhoven', '56## @@', 'Noord-Brabant'], ['Groningen', '97## @@', 'Groningen'], ['Zwolle', '80## @@', 'Overijssel']],
  streets: ['Industrieweg', 'Havenstraat', 'Spoorlaan', 'Kanaaldijk'],
  address: (street, number) => `${street} ${number}`,
  givenNames: ['Sanne', 'Daan', 'Lieke', 'Bram', 'Anouk', 'Thijs', 'Noor', 'Joost'],
  familyNames: ['de Vries', 'van den Berg', 'Bakker', 'Visser', "van 't Hof", 'de Groot', 'IJzerman', 'Dekker'],
  phone: '+31 10 ### ####',
  mobile: '+31 6 #### ####',
  vat: 'NL#########B01',
  vatRate: 21,
  note: 'Graag vóór 10:00 leveren, laaddock 3',
}

export const DE: Locale = {
  language: 'de',
  stems: ['Nordlicht', 'Eifel', 'Rhein-Main', 'Schwarzwald', 'Hansa', 'Bodensee', 'Franken', 'Mosel'],
  nouns: ['Werkzeuge', 'Präzision', 'Maschinenbau', 'Antriebstechnik', 'Industriebedarf', 'Hydraulik'],
  company: (brand, noun) => `${brand} ${noun} GmbH`,
  tld: 'de',
  cities: [['Düsseldorf', '40###', 'Nordrhein-Westfalen'], ['München', '80###', 'Bayern'], ['Leipzig', '04###', 'Sachsen'], ['Lübeck', '23###', 'Schleswig-Holstein'], ['Stuttgart', '70###', 'Baden-Württemberg']],
  streets: ['Hauptstraße', 'Industriestraße', 'Am Güterbahnhof', 'Gewerbering'],
  address: (street, number) => `${street} ${number}`,
  givenNames: ['Lena', 'Felix', 'Jörg', 'Katrin', 'Moritz', 'Sabine', 'Björn', 'Heike'],
  familyNames: ['Müller', 'Schäfer', 'Weiß', 'Groß', 'Köhler', 'Hoffmann', 'Zimmermann', 'Krüger'],
  phone: '+49 211 ######',
  mobile: '+49 151 ########',
  vat: 'DE#########',
  vatRate: 19,
  note: 'Bitte bis 10 Uhr liefern, Tor 3 – Wareneingang',
}

export const GB: Locale = {
  language: 'en-GB',
  stems: ['Brightwater', 'Ironbridge', 'Kestrel', 'Northgate', 'Pennine', 'Stonebridge'],
  nouns: ['Trading', 'Engineering', 'Fabrication', 'Components', 'Tooling', 'Fasteners'],
  company: (brand, noun) => `${brand} ${noun} Ltd`,
  tld: 'co.uk',
  cities: [['Leeds', 'LS# #@@', 'England'], ['Glasgow', 'G## #@@', 'Scotland'], ['Cardiff', 'CF## #@@', 'Wales'], ['Belfast', 'BT# #@@', 'Northern Ireland']],
  streets: ['Station Road', 'Mill Lane', 'Canal Wharf', 'Victoria Street'],
  address: (street, number) => `${number} ${street}`,
  givenNames: ['Oliver', 'Amelia', 'Harry', 'Isla', 'Rhys', 'Siân', 'Callum', 'Priya'],
  familyNames: ['Smith', 'Evans', 'Thompson', 'Hughes', 'Ahmed', 'MacLeod', 'Clarke', 'Bennett'],
  // Ofcom keeps these ranges for drama.
  phone: '+44 113 496 0###',
  mobile: '+44 7700 900###',
  vat: 'GB### #### ##',
  vatRate: 20,
  note: 'Please deliver to Gate 3 before 10am',
}

export const IE: Locale = {
  language: 'en-IE',
  stems: ['Shannon', 'Liffey', 'Corrib', 'Burren', 'Slieve Bloom'],
  nouns: ['Engineering', 'Supplies', 'Fabrication', 'Distribution'],
  company: (brand, noun) => `${brand} ${noun} Ltd`,
  tld: 'ie',
  cities: [['Dublin', 'D0# @###', 'Co. Dublin'], ['Cork', 'T12 @#@#', 'Co. Cork'], ['Galway', 'H91 @###', 'Co. Galway'], ['Dún Laoghaire', 'A96 @###', 'Co. Dublin']],
  streets: ['Main Street', 'Quay Road', 'Bóthar na Trá', 'Church Lane'],
  address: (street, number) => `${number} ${street}`,
  givenNames: ['Aoife', 'Seán', 'Siobhán', 'Cian', 'Niamh', 'Pádraig', 'Caoimhe', 'Oisín'],
  familyNames: ["O'Sullivan", "O'Connor", 'Murphy', 'Ó Ceallaigh', 'Byrne', 'Walsh', 'McCarthy', 'Fitzgerald'],
  phone: '+353 1 ### ####',
  mobile: '+353 87 ### ####',
  vat: 'IE#######@@',
  vatRate: 23,
  note: 'Leave with reception if the yard is closed',
}

export const FR: Locale = {
  language: 'fr',
  stems: ['Rhône', 'Garonne', 'Vosges', 'Armor', 'Lumière', 'Provence'],
  nouns: ['Industrie', 'Outillage', 'Fournitures', 'Logistique', 'Mécanique'],
  company: (brand, noun, _city, rand) => (rand() < 0.5 ? `${brand} ${noun} SARL` : `${noun} ${brand} SAS`),
  tld: 'fr',
  cities: [['Lyon', '6900#', 'Auvergne-Rhône-Alpes'], ['Marseille', '130##', "Provence-Alpes-Côte d'Azur"], ['Lille', '59###', 'Hauts-de-France'], ['Saint-Étienne', '42###', 'Auvergne-Rhône-Alpes']],
  streets: ['rue de la République', 'avenue Jean-Jaurès', 'boulevard de l’Industrie', 'chemin des Prés'],
  address: (street, number) => `${number} ${street}`,
  givenNames: ['Élodie', 'François', 'Jean-Baptiste', 'Zoé', 'Benoît', 'Clémence', 'Loïc', 'Anaïs'],
  familyNames: ['Lefèvre', 'Dubois', 'Moreau', 'Lebœuf', 'Lemaître', 'Fontaine', 'Rousseau', 'Girard'],
  phone: '+33 4 ## ## ## ##',
  mobile: '+33 6 ## ## ## ##',
  vat: 'FR## #########',
  vatRate: 20,
  note: 'Livraison avant midi, quai n° 3 – merci !',
}

export const PL: Locale = {
  language: 'pl',
  stems: ['Wisła', 'Mazowsze', 'Bałtyk', 'Karpaty', 'Śląsk'],
  nouns: ['Technika', 'Hurt', 'Logistyka', 'Narzędzia', 'Przemysł'],
  company: (brand, noun) => `${brand} ${noun} sp. z o.o.`,
  tld: 'pl',
  cities: [['Łódź', '9#-###', 'łódzkie'], ['Wrocław', '5#-###', 'dolnośląskie'], ['Gdańsk', '80-###', 'pomorskie'], ['Kraków', '3#-###', 'małopolskie']],
  streets: ['Przemysłowa', 'Źródlana', 'Żeglarska', 'Mickiewicza'],
  address: (street, number) => `ul. ${street} ${number}`,
  givenNames: ['Zofia', 'Jakub', 'Małgorzata', 'Łukasz', 'Agnieszka', 'Paweł', 'Grażyna', 'Wojciech'],
  // Names that stay the same for women and men; -ski becomes -ska.
  familyNames: ['Nowak', 'Wójcik', 'Kaczmarek', 'Mazur', 'Krawczyk', 'Zając', 'Wróbel', 'Woźniak'],
  phone: '+48 22 ### ## ##',
  mobile: '+48 5## ### ###',
  vat: 'PL##########',
  vatRate: 23,
  note: 'Proszę dostarczyć przed 10:00, brama nr 3',
}

const icelandicFathers = [['Jón', 'Jóns'], ['Guðmundur', 'Guðmunds'], ['Sigurður', 'Sigurðar'], ['Ólafur', 'Ólafs'], ['Einar', 'Einars'], ['Þór', 'Þórs']] as const

export const IS: Locale = {
  language: 'is',
  stems: ['Hekla', 'Esja', 'Vatnajökull', 'Þingvellir', 'Snæfell'],
  nouns: ['Vélar', 'Verkfæri', 'Flutningar', 'Iðnaður'],
  company: (brand, noun) => `${brand} ${noun} ehf.`,
  tld: 'is',
  cities: [['Reykjavík', '1##', null], ['Akureyri', '60#', null], ['Hafnarfjörður', '22#', null], ['Ísafjörður', '400', null]],
  streets: ['Laugavegur', 'Skólavörðustígur', 'Hafnarbraut', 'Þverholt'],
  address: (street, number) => `${street} ${number}`,
  givenNames: [],
  familyNames: [],
  // A patronymic, not a family name: Guðrún Einarsdóttir is Einar's daughter, and her brother is an Einarsson.
  person: (rand) => {
    const daughter = rand() < 0.5
    const given = pick(rand, daughter ? ['Guðrún', 'Sigríður', 'Þórunn', 'Ásdís', 'Kristín'] : ['Gunnar', 'Þórður', 'Ólafur', 'Sigurður', 'Ægir'])
    return { given, family: `${pick(rand, icelandicFathers)[1]}${daughter ? 'dóttir' : 'son'}` }
  },
  phone: '+354 5## ####',
  mobile: '+354 6## ####',
  vat: '######',
  vatRate: 24,
  note: 'Vinsamlegast afhendið fyrir kl. 10, hlið 3',
}

export const GR: Locale = {
  language: 'el',
  stems: [['Ήλιος', 'ilios'], ['Αιγαίο', 'aigaio'], ['Όλυμπος', 'olympos'], ['Δήλος', 'dilos'], ['Κρόνος', 'kronos']],
  nouns: [['Μηχανική', 'michaniki'], ['Εμπορική', 'emporiki'], ['Βιομηχανική', 'viomichaniki'], ['Εφοδιαστική', 'efodiastiki']],
  company: (brand, noun) => `${brand} ${noun} Α.Ε.`,
  tld: 'gr',
  cities: [['Αθήνα', '1## ##', 'Αττική'], ['Θεσσαλονίκη', '54# ##', 'Κεντρική Μακεδονία'], ['Πάτρα', '26# ##', 'Δυτική Ελλάδα'], ['Ηράκλειο', '71# ##', 'Κρήτη']],
  streets: ['Οδός Ερμού', 'Λεωφόρος Συγγρού', 'Οδός Αγίου Δημητρίου', 'Λεωφόρος Κηφισίας'],
  address: (street, number) => `${street} ${number}`,
  givenNames: [['Γιώργος', 'giorgos'], ['Μαρία', 'maria'], ['Νίκος', 'nikos'], ['Ελένη', 'eleni'], ['Δημήτρης', 'dimitris'], ['Κατερίνα', 'katerina']],
  // Genitive family names, the same for women and men.
  familyNames: [['Γεωργίου', 'georgiou'], ['Οικονόμου', 'oikonomou'], ['Νικολάου', 'nikolaou'], ['Βασιλείου', 'vasileiou'], ['Αθανασίου', 'athanasiou'], ['Χριστοδούλου', 'christodoulou']],
  phone: '+30 21 #### ####',
  mobile: '+30 69# ### ####',
  vat: 'EL#########',
  vatRate: 24,
  note: 'Παράδοση πριν τις 10:00, ράμπα 3',
}

export const RU: Locale = {
  language: 'ru',
  stems: [['Северный', 'severny'], ['Волга', 'volga'], ['Урал', 'ural'], ['Байкал', 'baikal'], ['Сибирь', 'sibir']],
  nouns: [['Техснаб', 'tekhsnab'], ['Промтех', 'promtekh'], ['Логистик', 'logistik'], ['Инструмент', 'instrument']],
  company: (brand, noun) => `ООО «${brand} ${noun}»`,
  tld: 'ru',
  cities: [['Москва', '1#####', 'Москва'], ['Екатеринбург', '620###', 'Свердловская область'], ['Новосибирск', '630###', 'Новосибирская область'], ['Казань', '420###', 'Республика Татарстан']],
  streets: ['Ленина', 'Гагарина', 'Садовая', 'Заводская'],
  address: (street, number) => `ул. ${street}, д. ${number}`,
  givenNames: [['Алексей', 'aleksey'], ['Ольга', 'olga'], ['Дмитрий', 'dmitry'], ['Екатерина', 'ekaterina'], ['Юрий', 'yuri'], ['Ксения', 'ksenia']],
  // Family names that stay the same for women and men; Ivanov becomes Ivanova.
  familyNames: [['Шевченко', 'shevchenko'], ['Коваленко', 'kovalenko'], ['Черных', 'chernykh'], ['Белых', 'belykh'], ['Ткаченко', 'tkachenko'], ['Долгих', 'dolgikh']],
  phone: '+7 495 ###-##-##',
  mobile: '+7 9## ###-##-##',
  vat: '##########',
  vatRate: 20,
  note: 'Доставка до 10:00, ворота № 3',
}

export const TR: Locale = {
  language: 'tr',
  stems: ['Anadolu', 'Boğaziçi', 'Ege', 'Kapadokya', 'Toros'],
  nouns: ['Makina', 'Endüstri', 'Ticaret', 'Lojistik', 'Hidrolik'],
  company: (brand, noun, _city, rand) => `${brand} ${noun} ${rand() < 0.6 ? 'A.Ş.' : 'Ltd. Şti.'}`,
  tld: 'com.tr',
  cities: [['İstanbul', '34###', 'İstanbul'], ['İzmir', '35###', 'İzmir'], ['Eskişehir', '26###', 'Eskişehir'], ['Iğdır', '76###', 'Iğdır']],
  streets: ['Atatürk Caddesi', 'Organize Sanayi Bölgesi 3. Cadde', 'İnönü Bulvarı', 'Çiçek Sokak'],
  address: (street, number) => `${street} No: ${number}`,
  givenNames: ['Ayşe', 'Mehmet', 'İbrahim', 'Zeynep', 'Çağrı', 'Gülşen', 'Oğuz', 'Işıl'],
  familyNames: ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Öztürk', 'Aydın', 'Arslan'],
  phone: '+90 212 ### ## ##',
  mobile: '+90 5## ### ## ##',
  vat: '##########',
  vatRate: 20,
  note: 'Lütfen saat 10:00’dan önce teslim edin, 3 numaralı kapı',
}
