import type { Locale } from '../locale'

export const BR: Locale = {
  language: 'pt-BR',
  stems: ['Paulista', 'Serra Verde', 'Guanabara', 'Araucária', 'Ipê'],
  nouns: ['Ferramentas', 'Distribuidora', 'Comércio Industrial', 'Logística', 'Hidráulica'],
  company: (brand, noun) => `${noun} ${brand} Ltda.`,
  tld: 'com.br',
  cities: [['São Paulo', '0####-###', 'SP'], ['Curitiba', '8####-###', 'PR'], ['Belo Horizonte', '3####-###', 'MG'], ['Porto Alegre', '9####-###', 'RS']],
  streets: ['Avenida Paulista', 'Rua da Conceição', 'Rodovia Anhanguera, km 25', 'Rua XV de Novembro'],
  address: (street, number) => `${street}, ${number}`,
  givenNames: ['João', 'Ana Luíza', 'Thiago', 'Mariana', 'Débora', 'Caio', 'Letícia', 'Vinícius'],
  familyNames: ['da Silva', 'dos Santos', 'Oliveira', 'Conceição', 'Araújo', 'Gonçalves', 'Ribeiro', 'Magalhães'],
  phone: '+55 11 ####-####',
  mobile: '+55 11 9####-####',
  vat: '##.###.###/0001-##',
  // ICMS, the state tax on goods, at its most common rate.
  vatRate: 17,
  note: 'Entregar até as 10h, doca 3. Obrigado!',
}

export const MX: Locale = {
  language: 'es-MX',
  stems: ['Azteca', 'Sierra Madre', 'Del Bajío', 'Golfo', 'Nopal'],
  nouns: ['Industrial', 'Suministros', 'Herramientas', 'Logística', 'Maquinaria'],
  company: (brand, noun) => `${noun} ${brand} S.A. de C.V.`,
  tld: 'com.mx',
  cities: [['Ciudad de México', '0####', 'CDMX'], ['Monterrey', '64###', 'Nuevo León'], ['Guadalajara', '44###', 'Jalisco'], ['Querétaro', '76###', 'Querétaro']],
  streets: ['Avenida Insurgentes Sur', 'Calle Morelos', 'Parque Industrial Norte', 'Boulevard Díaz Ordaz'],
  address: (street, number) => `${street} ${number}`,
  givenNames: ['José Luis', 'María Fernanda', 'Alejandro', 'Ximena', 'Ángel', 'Guadalupe', 'Sofía', 'Iñaki'],
  // Two family names, the father's and the mother's.
  familyNames: ['García López', 'Hernández Ruiz', 'Martínez de la Peña', 'González Ibáñez', 'Pérez Núñez', 'Sánchez Ortiz'],
  phone: '+52 55 #### ####',
  mobile: '+52 33 #### ####',
  vat: '@@@######@@#',
  vatRate: 16,
  note: 'Entregar antes de las 10:00 en el andén 3, por favor',
}

export const US: Locale = {
  language: 'en-US',
  stems: ['Lone Star', 'Great Lakes', 'Cascade', 'Blue Ridge', 'Gulf Coast'],
  nouns: ['Industrial Supply', 'Fastener Co.', 'Tool & Die', 'Logistics', 'Hydraulics'],
  company: (brand, noun, _city, rand) => `${brand} ${noun}${rand() < 0.5 ? ', Inc.' : ' LLC'}`,
  tld: 'com',
  cities: [['Austin', '787##', 'TX'], ['Columbus', '432##-####', 'OH'], ['Tacoma', '984##', 'WA'], ['Raleigh', '276##', 'NC']],
  streets: ['Industrial Blvd', 'Commerce Drive', 'Main Street, Suite 200', 'Martin Luther King Jr. Way'],
  address: (street, number) => `${number} ${street}`,
  givenNames: ['Jordan', 'Taylor', 'Marcus', 'Keisha', 'Luis', 'Mei', 'Tyler', 'Ashley'],
  familyNames: ['Johnson', 'Williams', 'Rodriguez', "O'Neill", 'Nguyen', 'Washington', 'Kowalski', 'Begay'],
  // 555-0100 to 555-0199 are kept for fiction.
  phone: '+1 (512) 555-01##',
  mobile: '+1 512-555-01##',
  vat: '##-#######',
  // No VAT: sales tax is the states', and a sale for resale is exempt.
  vatRate: 0,
  note: 'Dock 3, deliver before 10 AM. Thanks!',
}
