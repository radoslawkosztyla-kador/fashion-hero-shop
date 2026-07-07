export const brands = {
  'nike-standard':   { offset: 0,    name: 'Nike (większość modeli)', note: 'Nike w większości modeli szyje standardowo.' },
  'nike-af1':        { offset: 0.5,  name: 'Nike Air Force 1', note: 'Air Force 1 jest szeroki — w nim zwykle nosisz o pół numeru więcej.' },
  'adidas-standard': { offset: 0,    name: 'Adidas (większość modeli)', note: 'Adidas szyje standardowo.' },
  'adidas-samba':    { offset: -0.5, name: 'Adidas Samba / Gazelle', note: 'Samba i Gazelle są wąskie — większość bierze pół numeru więcej.' },
  'newbalance':      { offset: 0.5,  name: 'New Balance', note: 'New Balance bywa szerszy — możesz wziąć swój standardowy rozmiar.' },
  'converse':        { offset: 1,    name: 'Converse All Star', note: 'Converse szyje duże — większość bierze o cały numer mniej.' },
  'vans':            { offset: 0,    name: 'Vans', note: 'Vans szyje standardowo.' },
  'puma':            { offset: 0,    name: 'Puma', note: 'Puma szyje standardowo.' },
  'reebok':          { offset: 0,    name: 'Reebok', note: 'Reebok szyje standardowo.' },
  'asics':           { offset: -0.5, name: 'Asics', note: 'Asics jest wąski — możesz potrzebować pół numeru więcej.' },
  'salomon':         { offset: -0.5, name: 'Salomon', note: 'Salomon ma wąskie kopyto — rozważ pół numeru więcej.' }
} as const;

export type BrandKey = keyof typeof brands;

// EU to US Men's: 39=7, 40=7, 41=8, 42=9, 43=10, 44=11, 45=12
// Note: We need a bidirectional mapping or a closest match finding.
const euToUsMap: Record<number, number> = {
  38: 6,
  38.5: 6.5,
  39: 7,
  40: 7.5,
  41: 8,
  42: 9,
  43: 10,
  44: 11,
  44.5: 11.5,
  45: 12,
};

export const availableUsSizes = [7, 8, 9, 10, 11, 12];

export function getNearestUsSize(euSize: number): { us: number; eu: number; available: boolean; nearestUs: number | null } {
  // Find closest EU size in our map
  const euSizes = Object.keys(euToUsMap).map(Number);
  const closestEu = euSizes.reduce((prev, curr) => Math.abs(curr - euSize) < Math.abs(prev - euSize) ? curr : prev);
  
  const mappedUs = euToUsMap[closestEu];
  
  if (availableUsSizes.includes(mappedUs)) {
    return { us: mappedUs, eu: closestEu, available: true, nearestUs: mappedUs };
  }

  // Find nearest available
  const nearestUs = availableUsSizes.reduce((prev, curr) => Math.abs(curr - mappedUs) < Math.abs(prev - mappedUs) ? curr : prev);
  return { us: mappedUs, eu: closestEu, available: false, nearestUs };
}

export function calculateSizeFromFoot(lengthCm: number, width: 'WĄSKA' | 'STANDARDOWA' | 'SZEROKA'): any {
  // 24.0cm → EU 38, each 0.5cm is 1 EU size mostly. 
  // Let's use the exact table from prompt
  let baseEu = 38;
  if (lengthCm <= 24.0) baseEu = 38;
  else if (lengthCm <= 24.5) baseEu = 38.5;
  else if (lengthCm <= 25.0) baseEu = 39;
  else if (lengthCm <= 25.5) baseEu = 40;
  else if (lengthCm <= 26.0) baseEu = 41;
  else if (lengthCm <= 26.5) baseEu = 41.5;
  else if (lengthCm <= 27.0) baseEu = 42;
  else if (lengthCm <= 27.5) baseEu = 43;
  else if (lengthCm <= 28.0) baseEu = 44;
  else if (lengthCm <= 28.5) baseEu = 44.5;
  else baseEu = 45;

  // Shoe specific offset (Mesh runner low is narrow -> add 0.5)
  let finalEu = baseEu + 0.5;

  // Width adjustment
  if (width === 'SZEROKA') finalEu += 0.5;
  if (width === 'WĄSKA') finalEu -= 0.5;

  return getNearestUsSize(finalEu);
}

export function calculateSizeFromBrand(brandKey: BrandKey, inputSize: number, system: 'EU' | 'US' | 'UK') {
  let baseEu = inputSize;

  // Convert everything to EU first
  if (system === 'US') {
    baseEu = inputSize + 33;
  } else if (system === 'UK') {
    baseEu = inputSize + 33.5;
  }

  const brand = brands[brandKey];
  
  // targetEU = inputEU + brand.offset + 0.5 (shoe narrow fit)
  const targetEu = baseEu + brand.offset + 0.5;

  return getNearestUsSize(targetEu);
}
