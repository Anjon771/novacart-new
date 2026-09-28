import { Product, ProductReview } from '../types';

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-home',
    name: 'Home & Living',
    slug: 'home-living',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
    description: 'Elevate your daily living with minimalist design and functional serenity.'
  },
  {
    id: 'cat-tech',
    name: 'Tech Accessories',
    slug: 'tech-accessories',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Smart, wireless, and magnetic charging gear built for clean desks.'
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    description: 'Restorative tools, calming aromatherapy, and daily skin rituals.'
  },
  {
    id: 'cat-lifestyle',
    name: 'Lifestyle',
    slug: 'lifestyle',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'Everyday carry and mindful tools for focused, intentional living.'
  },
  {
    id: 'cat-travel',
    name: 'Travel Essentials',
    slug: 'travel-essentials',
    itemCount: 11,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    description: 'Pack lighter and travel seamless with modular luggage organizers.'
  },
  {
    id: 'cat-trending',
    name: 'Trending Finds',
    slug: 'trending-finds',
    itemCount: 9,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
    description: 'Curated viral problem-solvers that make life noticeably simpler.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    handle: 'portable-mini-blender',
    title: 'Portable Mini Blender',
    subtitle: 'High-torque 6-blade cordless blender with USB-C magnetic fast charging',
    category: 'Home & Living',
    price: 39.99,
    compareAtPrice: 54.99,
    rating: 4.9,
    reviewCount: 384,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Craft smooth fruit smoothies, protein shakes, and iced coffees anywhere in 30 seconds. Featuring 304 food-grade stainless steel blades, waterproof seal, and silicone carry loop.',
    features: [
      'High-speed 20,000 RPM motor crushes frozen fruit and ice effortlessly',
      '15+ blends on a single 45-minute USB-C fast charge',
      'Food-grade BPA-free Tritan bottle with sip-through spout lid',
      'Automatic self-cleaning cycle with 1 drop of soap and water'
    ],
    specifications: {
      'Capacity': '450 ml / 15.2 oz',
      'Battery Life': '2400mAh Li-ion (~15 cycles)',
      'Blade Material': 'Food-Grade SUS304 6-Leaf',
      'Charging': 'USB-C Magnetic Fast Charge',
      'Waterproof': 'IPX7 Submersible Wash'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v1-1', name: 'Matte White', value: 'Matte White', available: true, colorHex: '#F0EFEA' },
        { id: 'v1-2', name: 'Sage Green', value: 'Sage Green', available: true, colorHex: '#7C8A79' },
        { id: 'v1-3', name: 'Charcoal Black', value: 'Charcoal Black', available: true, colorHex: '#252525' }
      ]
    },
    tags: ['Kitchen', 'Portable', 'Fitness', 'Healthy']
  },
  {
    id: 'prod-2',
    handle: 'smart-led-desk-lamp',
    title: 'Smart LED Desk Lamp',
    subtitle: 'Architectural aluminum task light with touch dimming & auto-ambient sensor',
    category: 'Home & Living',
    price: 49.99,
    compareAtPrice: 69.99,
    rating: 4.8,
    reviewCount: 247,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Designed for focus and visual comfort. Full-spectrum 95+ CRI LEDs eliminate eye strain during long working sessions, with intuitive touch slider control and 5 color temperatures.',
    features: [
      'True CRI > 95 natural light rendering prevents ocular fatigue',
      '5 adjustable color temperatures (2700K warm to 6500K daylight)',
      'Integrated Qi wireless charging pad built into the solid weighted base',
      'Multi-angle dual-pivot aircraft-grade aluminum articulation'
    ],
    specifications: {
      'Luminance': '850 Lumens steplessly dimmable',
      'Color Temperature': '2700K - 6500K (5 presets)',
      'Power Consumption': '12W Max + 10W Wireless Out',
      'Material': 'Anodized 6063 Aluminum Alloy',
      'Lifespan': '50,000+ Operating Hours'
    },
    variants: {
      type: 'Finish',
      options: [
        { id: 'v2-1', name: 'Space Gray', value: 'Space Gray', available: true, colorHex: '#4A4C4E' },
        { id: 'v2-2', name: 'Lunar Silver', value: 'Lunar Silver', available: true, colorHex: '#D2D3D5' },
        { id: 'v2-3', name: 'Matte Obsidian', value: 'Matte Obsidian', available: true, colorHex: '#181818' }
      ]
    },
    tags: ['Workspace', 'Lighting', 'Minimalist', 'Productivity']
  },
  {
    id: 'prod-3',
    handle: 'magnetic-phone-stand',
    title: 'Magnetic Phone Stand',
    subtitle: 'Precision CNC aluminum MagSafe desk dock with 360° rotation ballhead',
    category: 'Tech Accessories',
    price: 24.99,
    compareAtPrice: 34.99,
    rating: 4.9,
    reviewCount: 512,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Elevate your device to eye level for FaceTime, Zoom calls, and StandBy mode. Heavyweight zinc-alloy base with anti-slip silicone nano-suction feet prevents tipping on any surface.',
    features: [
      'N52 ultra-strong neodymium magnetic ring locks device instantly',
      'Smooth 360° portrait and landscape pivot with zero wobble',
      'Cable routing cutout through spine for a clean, wire-free desk aesthetic',
      'Compatible with iPhone 12–16 series and all magnetic phone cases'
    ],
    specifications: {
      'Weight': '290g (Solid Anti-Tip Weighted Base)',
      'Dimensions': '145mm x 85mm x 85mm',
      'Material': 'Sandblasted CNC Aluminum',
      'Compatibility': 'MagSafe & Qi2 Compatible'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v3-1', name: 'Space Gray', value: 'Space Gray', available: true, colorHex: '#3D3E42' },
        { id: 'v3-2', name: 'Silver Mist', value: 'Silver Mist', available: true, colorHex: '#E2E2E2' }
      ]
    },
    tags: ['MagSafe', 'Desk Setup', 'Phone', 'Accessories']
  },
  {
    id: 'prod-4',
    handle: 'portable-neck-fan',
    title: 'Portable Neck Fan',
    subtitle: 'Bladeless 360° surrounding airflow personal cooler with 3 speed modes',
    category: 'Lifestyle',
    price: 34.99,
    compareAtPrice: 45.99,
    rating: 4.7,
    reviewCount: 189,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Stay completely cool outdoors, in gyms, or during commutes without tangled hair. Ergonomic headphone-style fit rests weightlessly around your neck with quiet twin turbine blowers.',
    features: [
      '78 surrounding air outlets deliver full-face and neck cooling relief',
      'Whisper-quiet brushless motor operation under 28 decibels',
      'Flexible silicone neckband adjusts smoothly to any neck size',
      'Built-in 4000mAh battery provides up to 16 hours of continuous cooling'
    ],
    specifications: {
      'Battery': '4000mAh Dual-Cell Li-ion',
      'Runtime': '4 to 16 Hours depending on speed',
      'Weight': '260 grams',
      'Charge Port': 'Type-C USB (3.5 hour charge)'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v4-1', name: 'Arctic White', value: 'Arctic White', available: true, colorHex: '#FAFAFA' },
        { id: 'v4-2', name: 'Midnight Navy', value: 'Midnight Navy', available: true, colorHex: '#1B263B' },
        { id: 'v4-3', name: 'Blush Pink', value: 'Blush Pink', available: true, colorHex: '#E8B4B8' }
      ]
    },
    tags: ['Cooling', 'Summer', 'Commute', 'Outdoor']
  },
  {
    id: 'prod-5',
    handle: 'travel-organizer',
    title: 'Travel Organizer Tech Pouch',
    subtitle: 'Weatherproof ballistic nylon cable, passport & charger management kit',
    category: 'Travel Essentials',
    price: 29.99,
    compareAtPrice: 39.99,
    rating: 4.9,
    reviewCount: 310,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Never untangle charging cables in your backpack again. Origami-style accordion interior opens flat with elastic loops, zip pockets, SD card slots, and waterproof YKK zippers.',
    features: [
      'Origami folded internal dividers create double usable internal volume',
      'Weather-resistant 400D recycled double-coated canvas shell',
      'Dedicated pass-through cable pocket to charge devices while closed',
      'Hidden passport and AirTag pocket for international transit security'
    ],
    specifications: {
      'Dimensions': '24cm x 15cm x 9cm',
      'Capacity': '2.2 Liters',
      'Exterior': '400D Weatherproof Ripstop Nylon',
      'Zippers': 'Original YKK AquaGuard'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v5-1', name: 'Ash Charcoal', value: 'Ash Charcoal', available: true, colorHex: '#303030' },
        { id: 'v5-2', name: 'Olive Green', value: 'Olive Green', available: true, colorHex: '#4E5A44' },
        { id: 'v5-3', name: 'Desert Sand', value: 'Desert Sand', available: true, colorHex: '#C5B498' }
      ]
    },
    tags: ['Travel', 'Cables', 'Organization', 'Gear']
  },
  {
    id: 'prod-6',
    handle: 'wireless-charging-station',
    title: '3-in-1 Foldable Wireless Charging Station',
    subtitle: 'Magnetic 15W Qi2 fast charging stand for phone, watch & earbuds',
    category: 'Tech Accessories',
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.9,
    reviewCount: 429,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Clean up bedside cable clutter completely. Folds flat to wallet size for travel, then pops into a triangular magnetic stand powering phone, smart watch, and earbuds simultaneously.',
    features: [
      'Simultaneous 3-device charging using only one single wall plug',
      'Official 15W Qi2 magnetic fast charging profile with temperature protection',
      'Ultra-thin 18mm foldable profile fits easily in carry-on bag pockets',
      'Soft-touch premium silicone and anodized aluminum hinges'
    ],
    specifications: {
      'Output Phone': '15W Max Magnetic Fast Charge',
      'Output Watch': '5W Smartwatch Disc',
      'Output Buds': '5W Earbuds Tray',
      'Input': 'Type-C 30W Power Delivery required'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v6-1', name: 'Matte Black', value: 'Matte Black', available: true, colorHex: '#1C1C1E' },
        { id: 'v6-2', name: 'Pure White', value: 'Pure White', available: true, colorHex: '#FFFFFF' }
      ]
    },
    tags: ['Wireless', 'Charger', 'Nightstand', 'Apple']
  },
  {
    id: 'prod-7',
    handle: 'aroma-diffuser',
    title: 'Ultrasonic Ceramic Aroma Diffuser',
    subtitle: 'Handcrafted stoneware essential oil diffuser with ambient warm candle glow',
    category: 'Home & Living',
    price: 44.99,
    compareAtPrice: 59.99,
    rating: 4.8,
    reviewCount: 198,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Transform your bedroom or living space into a high-end spa sanctuary. High-frequency 2.4MHz ultrasonic mist releases subtle botanical scents without heating or altering pure oils.',
    features: [
      'Handmade matte ceramic stone cover with clean geometric silhouette',
      'Covers up to 500 sq. ft with whisper-silent ultrasonic micro-mist',
      'Soft amber nightlight setting mimics a gentle flickering candle',
      'Auto-off safety shutoff when water basin empties'
    ],
    specifications: {
      'Reservoir Capacity': '180 ml (Up to 8-hour continuous runtime)',
      'Mist Modes': 'Continuous / 30-sec Intermittent',
      'Cover Material': 'Handcrafted Ceramic Porcelain',
      'Sound Level': '< 20 dB ultra quiet'
    },
    variants: {
      type: 'Stone Texture',
      options: [
        { id: 'v7-1', name: 'Terracotta Earth', value: 'Terracotta Earth', available: true, colorHex: '#B87333' },
        { id: 'v7-2', name: 'Bone White', value: 'Bone White', available: true, colorHex: '#EAE6DF' },
        { id: 'v7-3', name: 'Basalt Charcoal', value: 'Basalt Charcoal', available: true, colorHex: '#2B2B2B' }
      ]
    },
    tags: ['Aromatherapy', 'Wellness', 'Home Decor', 'Ceramic']
  },
  {
    id: 'prod-8',
    handle: 'smart-motion-sensor-light',
    title: 'Magnetic Motion Sensor Night Light',
    subtitle: 'Rechargeable solid beech wood LED wand with warm ambient glow',
    category: 'Home & Living',
    price: 27.99,
    compareAtPrice: 38.99,
    rating: 4.8,
    reviewCount: 342,
    isBestSeller: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Natural wood sconce attaches to any wall via magnetic stick-on disc. Illuminates automatically when you enter hallways, stairs, or closets, or detaches instantly as an emergency torch.',
    features: [
      'Dual sensing: Infrared motion sensor (120°, 4m range) + light sensor',
      'Natural solid beech wood body with frosted acrylic diffused light guide',
      'Magnetic base peels and sticks without wall screws or wiring',
      'Up to 90 days battery life in auto-sensing mode on one charge'
    ],
    specifications: {
      'Material': 'Natural Ash Wood / Solid Walnut + Plexiglass',
      'Battery': '500mAh Li-ion battery (USB rechargeable)',
      'Light Temp': '2700K Warm Comfort White',
      'Dimensions': '180mm x 25mm cylinder'
    },
    variants: {
      type: 'Wood Grain',
      options: [
        { id: 'v8-1', name: 'Natural Ash Wood', value: 'Natural Ash Wood', available: true, colorHex: '#CBB296' },
        { id: 'v8-2', name: 'Black Walnut', value: 'Black Walnut', available: true, colorHex: '#4A3525' }
      ]
    },
    tags: ['Lighting', 'Wood', 'Smart Home', 'Night Light']
  },
  {
    id: 'prod-9',
    handle: 'self-heating-smart-mug',
    title: 'Temperature Control Smart Ceramic Mug',
    subtitle: 'Keeps coffee and tea at your exact preferred drinking temperature for hours',
    category: 'Lifestyle',
    price: 54.99,
    compareAtPrice: 72.00,
    rating: 4.9,
    reviewCount: 165,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Say goodbye to lukewarm coffee. Precision internal heating sensor maintains your beverage precisely between 120°F – 145°F. Includes matching charging coaster.',
    features: [
      'Maintains perfect temperature for up to 90 minutes off the coaster, or all day on coaster',
      'Scratch-resistant matte ceramic coating over durable stainless steel',
      'IPX7 fully submersible and safe for hand sink washing',
      'Smart sleep mode automatically activates when empty'
    ],
    specifications: {
      'Volume': '350 ml / 12 oz',
      'Temp Range': '120°F - 145°F (50°C - 62.5°C)',
      'Coaster Power': '18W Fast induction base',
      'Weight': '380 grams'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v9-1', name: 'Matte Sand', value: 'Matte Sand', available: true, colorHex: '#E2DBD2' },
        { id: 'v9-2', name: 'Midnight Slate', value: 'Midnight Slate', available: true, colorHex: '#26292B' }
      ]
    },
    tags: ['Coffee', 'Desk Setup', 'Lifestyle', 'Gift']
  },
  {
    id: 'prod-10',
    handle: 'facial-sculpting-wand',
    title: '4-in-1 Radiant Facial Sculpting Wand',
    subtitle: 'Red light therapy, microcurrent toning, therapeutic warmth & facial massage',
    category: 'Beauty & Wellness',
    price: 42.99,
    compareAtPrice: 58.00,
    rating: 4.9,
    reviewCount: 289,
    isNew: true,
    isSale: true,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Professional dermatologist-inspired skincare at home. 660nm red light promotes collagen, gentle microcurrent tones facial muscles, and soothing 107°F warmth boosts serum absorption.',
    features: [
      'Clinically proven 660nm deep red light therapy rejuvenates skin',
      'Low-voltage galvanic microcurrent stimulates facial contours',
      '90° rotatable head glides effortlessly along jawline, eyes, and neck',
      'Smart touch sensor activates automatically upon touching skin'
    ],
    specifications: {
      'Wavelength': 'Red Light 660nm',
      'Thermal Temp': '42°C (107°F)',
      'Battery': 'Rechargeable 350mAh USB-C',
      'Weight': '36g featherlight travel ready'
    },
    variants: {
      type: 'Finish',
      options: [
        { id: 'v10-1', name: 'Rose Gold', value: 'Rose Gold', available: true, colorHex: '#B76E79' },
        { id: 'v10-2', name: 'Matte Rose', value: 'Matte Rose', available: true, colorHex: '#E0BFB8' }
      ]
    },
    tags: ['Skincare', 'Beauty', 'Anti-Aging', 'Self-Care']
  },
  {
    id: 'prod-11',
    handle: 'minimalist-rfid-leather-wallet',
    title: 'Minimalist MagSafe RFID Wallet',
    subtitle: 'Top-grain leather quick-draw cardholder with magnetic phone latch',
    category: 'Lifestyle',
    price: 24.99,
    compareAtPrice: 35.00,
    rating: 4.8,
    reviewCount: 176,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Slim down your pockets. Holds 1 to 5 cards with an ergonomic thumb slide mechanism for 1-second card deployment, reinforced with full Faraday RFID blocking lining.',
    features: [
      'Full-grain supple vegetable-tanned leather ages gracefully with patina',
      'Dual-strength built-in magnets grip firmly onto phone backs',
      'Integrated thumb-push cutout for instant card access without fumbling',
      'Ultra-compact 6mm thin profile does not bulge in front pockets'
    ],
    specifications: {
      'Capacity': '3-5 Credit Cards + Folded Cash',
      'Dimensions': '95mm x 65mm x 7mm',
      'Lining': 'RFID / NFC Anti-Skimming Shield',
      'Material': 'Full-Grain Italian Leather'
    },
    variants: {
      type: 'Leather',
      options: [
        { id: 'v11-1', name: 'Saddle Tan', value: 'Saddle Tan', available: true, colorHex: '#9B5B32' },
        { id: 'v11-2', name: 'Espresso Black', value: 'Espresso Black', available: true, colorHex: '#1B1B1B' },
        { id: 'v11-3', name: 'Forest Pine', value: 'Forest Pine', available: true, colorHex: '#2D3A2F' }
      ]
    },
    tags: ['EDC', 'Wallet', 'Leather', 'Minimal']
  },
  {
    id: 'prod-12',
    handle: 'deep-sleep-sound-mask',
    title: 'Contoured Bluetooth Sleep Mask',
    subtitle: 'Zero eye-pressure blackout mask with ultra-thin HD stereo speakers',
    category: 'Beauty & Wellness',
    price: 36.99,
    compareAtPrice: 48.00,
    rating: 4.8,
    reviewCount: 224,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Engineered for side sleepers and frequent flyers. 3D ergonomic eye cups allow unrestricted eye movement (no eyelash friction), while 100% true blackout foam seals out all ambient light.',
    features: [
      '3D memory foam eye cavity prevents any pressure against eyelids',
      '0.2-inch ultra-thin flat speakers wrapped in soft plush fabric for side sleeping',
      'Bluetooth 5.2 streams white noise, meditations, or soothing podcasts',
      '12+ hours of continuous audio playback per charge'
    ],
    specifications: {
      'Eye Space': '15mm deep 3D contoured eye wells',
      'Fabric': 'Breathable Ice-Silk + Memory Foam',
      'Battery Life': 'Up to 14 Hours playback',
      'Speaker Flatness': '5mm ultra-thin'
    },
    variants: {
      type: 'Color',
      options: [
        { id: 'v12-1', name: 'Deep Onyx', value: 'Deep Onyx', available: true, colorHex: '#181818' },
        { id: 'v12-2', name: 'Cloud Gray', value: 'Cloud Gray', available: true, colorHex: '#A8A8A8' }
      ]
    },
    tags: ['Sleep', 'Travel', 'Wellness', 'Audio']
  }
];

export const DEMO_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    location: 'Austin, TX, USA',
    rating: 5,
    date: '3 days ago',
    title: 'Better than blender models twice the price',
    comment: 'I use the Portable Mini Blender every single morning before the gym. It handles frozen berries without hesitation and cleans up with a rinse in 15 seconds. Delivery to Texas took only 3 business days!',
    verifiedBuyer: true,
    helpfulCount: 38,
    productTitle: 'Portable Mini Blender'
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    location: 'London, United Kingdom',
    rating: 5,
    date: '1 week ago',
    title: 'Transformative for my work-from-home desk setup',
    comment: 'The architectural desk lamp is genuinely Apple-tier build quality. Solid aluminum hinge, and the built-in wireless charging pad cleared the unsightly charger cables completely off my desk.',
    verifiedBuyer: true,
    helpfulCount: 24,
    productTitle: 'Smart LED Desk Lamp'
  },
  {
    id: 'rev-3',
    author: 'Elena R.',
    location: 'Vancouver, BC, Canada',
    rating: 5,
    date: '2 weeks ago',
    title: 'The magnetic strength is extraordinary',
    comment: 'Bought the 3-in-1 foldable charging stand for travel between Vancouver and Toronto. Folds flat like a passport and powers my iPhone, AirPods, and Apple Watch from a single wall adapter. Exceptional design.',
    verifiedBuyer: true,
    helpfulCount: 42,
    productTitle: '3-in-1 Foldable Wireless Charging Station'
  },
  {
    id: 'rev-4',
    author: 'Liam Davies',
    location: 'Melbourne, Australia',
    rating: 5,
    date: '2 weeks ago',
    title: 'Subtle, understated luxury',
    comment: 'The ceramic stone aroma diffuser looks like a piece of bespoke art on our living room console. The gentle candle glow mode at night is deeply calming after a long week. Fast tracked delivery to Australia too.',
    verifiedBuyer: true,
    helpfulCount: 19,
    productTitle: 'Ultrasonic Ceramic Aroma Diffuser'
  }
];

export const SOCIAL_GALLERY_IMAGES = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    handle: '@emily_minimalist',
    product: 'Temperature Control Smart Mug'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=700&q=80',
    handle: '@david.creates',
    product: 'Magnetic Phone Stand'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80',
    handle: '@serene.home',
    product: 'Ceramic Aroma Diffuser'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
    handle: '@workspace_goals',
    product: 'Smart LED Desk Lamp'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    handle: '@wander_modern',
    product: 'Tech Travel Organizer'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=80',
    handle: '@healthy_habits',
    product: 'Portable Mini Blender'
  }
];
