/* global window */
// ---- $RAWDOG farm + product data ----
const FARMS = [
  {
    id: 'honey',
    farm: 'Honey Hollow',
    keeper: 'Bea & the Hive Co.',
    product: 'Raw Honey',
    unit: 'jar (16oz)',
    price: 200000,
    sprite: 'honey.png',
    photo: 'honey.webp',
    location: 'Heritage Bee Farm, Florida',
    awn: '#e8b43d', awn2: '#caa72e',
    tag: 'UNFILTERED',
    desc: 'Cold-pressed wildflower honey straight from the hive. Never heated, never strained. Pure liquid gold.',
    // map placement (% of stage)
    x: 16, y: 74, scale: 1,
  },
  {
    id: 'steak',
    farm: 'Ironhide Ranch',
    keeper: 'Buck Tallow',
    product: 'Raw Ribeye',
    unit: 'lb, dry-aged',
    price: 400000,
    sprite: 'steak.png',
    photo: 'beef.webp',
    location: 'Dirty Dog Farm, New York State',
    awn: '#c0392b', awn2: '#9c2c20',
    tag: 'GRASS-FED',
    desc: 'Pasture-raised, dry-aged ribeye from cattle that never saw a feedlot. Marbled, mineral-rich, raw-dog approved.',
    x: 84, y: 74, scale: 1.05,
  },
  {
    id: 'liver',
    farm: 'Offal Acres',
    keeper: 'Nana Gizzard',
    product: 'Raw Liver',
    unit: '8oz pack',
    price: 350000,
    sprite: 'liver.png',
    photo: 'liver.jpg',
    location: 'White Oak Pastures, Georgia',
    awn: '#7a2b3a', awn2: '#5e2029',
    tag: 'NATURES MULTIVITAMIN',
    desc: 'Nutrient-dense beef liver — packed with retinol, B12 and copper. The original superfood. Eat it raw, live forever.',
    x: 70, y: 55, scale: 0.86,
  },
  {
    id: 'milk',
    farm: 'Dewdrop Dairy',
    keeper: 'Clover McMoo',
    product: 'Raw Milk',
    unit: 'half-gallon',
    price: 250000,
    sprite: 'milk.png',
    photo: 'milk.jpg',
    location: "Miller's Bio Farm, Pennsylvania",
    awn: '#cfe1ec', awn2: '#9cc0d4',
    tag: 'A2 / UNPASTEURIZED',
    desc: 'Creamline raw milk from a single small herd. Living enzymes, real cream on top. Shake before you chug.',
    x: 30, y: 55, scale: 0.84,
  },
  {
    id: 'eggs',
    farm: 'Sunny Coop',
    keeper: 'Henrietta',
    product: 'Raw Eggs',
    unit: 'dozen',
    price: 150000,
    sprite: null, // drawn as pixel sprite
    photo: 'eggs.jpg',
    location: 'Fresh From The Farm, Canada',
    awn: '#8bbf5a', awn2: '#6fa244',
    tag: 'YOLKS OF GOLD',
    desc: 'Deep-orange yolks from hens that roam free and eat bugs all day. Crack one raw into your shake like a champion.',
    x: 50, y: 93, scale: 1,
  },
];

const DEPOSIT_WALLET = 'RAWdoGwa11etADDRESScomiNGsoon000000000000';
const CONTRACT_ADDR = 'COMING SOON · PUMP.FUN LAUNCH';
const PUMP_URL = '#';
const X_URL = 'https://x.com/RawDogFun';

// Format token amounts as meme-coin shorthand: 120000 -> "120k", 1200000 -> "1.2m"
function fmt(n) {
  if (n >= 1e6) { const v = n / 1e6; return (Number.isInteger(v) ? v : v.toFixed(1).replace(/\.0$/, '')) + 'm'; }
  if (n >= 1e3) { const v = n / 1e3; return (Number.isInteger(v) ? v : v.toFixed(1).replace(/\.0$/, '')) + 'k'; }
  return n.toLocaleString();
}

window.RAWDOG_DATA = { FARMS, DEPOSIT_WALLET, CONTRACT_ADDR, PUMP_URL, X_URL, fmt };
