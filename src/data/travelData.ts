import type {
  ChambaExperience,
  DestinationItem,
  HolidayPackage,
  StayProperty,
} from '../types/travel';

export const IMAGES = {
  heroChamba: '/src/assets/images/hero_chamba_valley_1795694961298.jpg',
  himachalParadise: '/src/assets/images/dest_himachal_paradise_1795694961142.jpg',
  sereneKashmir: '/src/assets/images/dest_serene_kashmir_1795694960350.jpg',
  goaBeaches: '/src/assets/images/dest_goa_beaches_1795694960356.jpg',
  royalRajasthan: '/src/assets/images/dest_royal_rajasthan_1795694962871.jpg',
  enchantingKerala: '/src/assets/images/dest_enchanting_kerala_1795694962807.jpg',
  chambaTemples: '/src/assets/images/chamba_ancient_temples_1795694963331.jpg',
  chambaRumal: '/src/assets/images/chamba_rumal_craft_1795694964083.jpg',
  chambaMinjar: '/src/assets/images/chamba_minjar_mela_1795694963755.jpg',
  chambaFolk: '/src/assets/images/chamba_folk_cuisine_1795694964141.jpg',
  stayTimberVilla: '/src/assets/images/stay_timber_villa_1795694964402.jpg',
  stayCedarChalet: '/src/assets/images/stay_cedar_chalet_1795694965028.jpg',
  ecoJourneys: '/src/assets/images/eco_curated_journeys_1795695010617.jpg',
  ecoExperiences: '/src/assets/images/eco_local_experiences_1795694965625.jpg',
};

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'chamba',
    slug: 'chamba',
    name: 'Chamba & Himachal Paradise',
    shortTitleLines: ['Himachal', 'Paradise'],
    badge: 'Signature Region',
    isSignature: true,
    categories: ['himalayas', 'heritage'],
    searchKeywords: 'chamba himachal paradise khajjiar bharmour dalhousie',
    description:
      'Ancient Shikhara temples, Khajjiar meadows, Chamba Rumal craft ateliers, and heritage timber stays.',
    staysCount: 18,
    packagesCount: 6,
    experiencesCount: 12,
    startingPrice: 6800,
    image: IMAGES.himachalParadise,
    imageAlt: 'Himachal Paradise mountain village and snow peaks',
    targetPage: 'discover-chamba',
  },
  {
    id: 'kashmir',
    slug: 'kashmir',
    name: 'Serene Kashmir',
    shortTitleLines: ['Serene', 'Kashmir'],
    badge: 'Himalayas',
    categories: ['himalayas'],
    searchKeywords: 'serene kashmir dal lake srinagar gulmarg pahalgam',
    description:
      'Cedar houseboats on Dal Lake, Pahalgam alpine valleys, and curated saffron-trail homestays.',
    staysCount: 14,
    packagesCount: 5,
    experiencesCount: 9,
    startingPrice: 9200,
    image: IMAGES.sereneKashmir,
    imageAlt: 'Serene Kashmir wooden houseboats on Dal Lake',
    targetPage: 'stays',
    targetParams: { dest: 'kashmir' },
  },
  {
    id: 'goa',
    slug: 'goa',
    name: 'Goa Beaches & Latin Quarter',
    shortTitleLines: ['Goa', 'Beaches'],
    badge: 'Coastal',
    categories: ['coastal'],
    searchKeywords: 'goa beaches coastal fontainhas south goa',
    description:
      'Portuguese heritage villas in Fontainhas, quiet South Goa coves, and spice plantation tours.',
    staysCount: 22,
    packagesCount: 4,
    startingPrice: 7500,
    image: IMAGES.goaBeaches,
    imageAlt: 'Goa Beaches palm-lined golden shoreline',
    targetPage: 'stays',
    targetParams: { dest: 'goa' },
  },
  {
    id: 'rajasthan',
    slug: 'rajasthan',
    name: 'Royal Rajasthan',
    shortTitleLines: ['Royal', 'Rajasthan'],
    badge: 'Heritage',
    categories: ['heritage'],
    searchKeywords: 'royal rajasthan udaipur jaipur jodhpur haveli',
    description:
      'Restored havelis, hilltop sandstone forts, desert astronomy evenings, and royal culinary trails.',
    staysCount: 16,
    packagesCount: 7,
    startingPrice: 11000,
    image: IMAGES.royalRajasthan,
    imageAlt: 'Royal Rajasthan sandstone palace fort at sunset',
    targetPage: 'stays',
    targetParams: { dest: 'rajasthan' },
  },
  {
    id: 'kerala',
    slug: 'kerala',
    name: 'Enchanting Kerala',
    shortTitleLines: ['Enchanting', 'Kerala'],
    badge: 'Nature',
    categories: ['coastal'],
    searchKeywords: 'enchanting kerala munnar backwaters alleppey tea hills',
    description:
      'Misty Munnar tea estates, private kettuvallam backwater cruises, and Ayurvedic wellness retreats.',
    staysCount: 19,
    packagesCount: 5,
    startingPrice: 8400,
    image: IMAGES.enchantingKerala,
    imageAlt: 'Enchanting Kerala misty emerald tea hills',
    targetPage: 'stays',
    targetParams: { dest: 'kerala' },
  },
];

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-chamba',
    duration: '5 Days · 4 Nights',
    title: 'Chamba, Khajjiar & Bharmour Circuit',
    description:
      'Includes heritage homestay, Chamba Rumal workshop, temple heritage walk, and private mountain SUV.',
    pricePerPerson: 28500,
    destinationName: 'Chamba & Khajjiar, HP',
    actionLabel: 'View Itinerary',
    targetPage: 'discover-chamba',
  },
  {
    id: 'pkg-kashmir',
    duration: '6 Days · 5 Nights',
    title: 'Kashmir Lakes & Alpine Meadows',
    description:
      '2 nights luxury houseboat, 3 nights Gulmarg boutique chalet, shikara sunrise, and Wazwan dining.',
    pricePerPerson: 42000,
    destinationName: 'Srinagar & Gulmarg, Kashmir',
    actionLabel: 'Plan Now',
    targetPage: 'trip-planner',
  },
  {
    id: 'pkg-kerala',
    duration: '4 Days · 3 Nights',
    title: 'Munnar Mist & Backwater Retreat',
    description:
      'Tea estate bungalow, private backwater cruise, spice garden walk, and airport transfers.',
    pricePerPerson: 31200,
    destinationName: 'Munnar & Alleppey, Kerala',
    actionLabel: 'Plan Now',
    targetPage: 'trip-planner',
  },
];

export const STAYS: StayProperty[] = [
  {
    id: 'ravi-valley-villa',
    name: 'Ravi Valley Heritage Timber Villa',
    type: 'homestay',
    typeLabel: 'Heritage Homestay',
    location: 'Chamba, Himachal Pradesh',
    regionSlug: 'chamba',
    landmarkNote: 'Chamba Ridge Road, Himachal Pradesh · 1.8 km from Lakshmi Narayan Temple',
    rating: '4.9',
    reviewCount: 42,
    summary:
      'Deodar-wood veranda overlooking the Ravi river, home-cooked Himachali breakfast, and mountain fireplace.',
    fullDescription:
      'Handcrafted from local deodar cedar and river stone, Ravi Valley Heritage Timber Villa pairs warm Pahadi hospitality with international boutique comfort. Wake up to mist rising off the Ravi River and enjoy home-style Himachali breakfast on the sunlit veranda.',
    nightlyRate: 8900,
    image: IMAGES.stayTimberVilla,
    gallery: [IMAGES.stayTimberVilla, IMAGES.stayCedarChalet, IMAGES.himachalParadise],
    amenities: [
      { icon: 'wifi', label: 'High-Speed Fibre Wi-Fi' },
      { icon: 'flame', label: 'Cedar Wood Fireplace' },
      { icon: 'utensils', label: 'Himachali Breakfast' },
      { icon: 'car', label: 'Private Mountain Parking' },
      { icon: 'mountain', label: 'River & Peak Balcony' },
      { icon: 'headphones', label: '24/7 Local Concierge' },
    ],
    rooms: [
      {
        id: 'deodar-balcony',
        name: 'Deodar Balcony Suite',
        details: 'King bed · Private valley veranda · Breakfast included',
        nightlyRate: 8900,
      },
      {
        id: 'royal-chamba-loft',
        name: 'Royal Chamba Attic Loft',
        details: '2 Guests + 2 Kids · Fireplace lounge · All meals',
        nightlyRate: 12600,
      },
    ],
    reviews: [
      {
        quote:
          'Waking up to the mist over the Ravi River and hot Kangra tea on the cedar deck was unforgettable.',
        author: 'Meera Krishnan',
        location: 'Bengaluru',
        date: 'Oct 2026',
      },
      {
        quote:
          'Immaculate rooms, warm hosts who arranged our Chamba Rumal studio visit, and effortless check-in.',
        author: 'Rohan Malhotra',
        location: 'New Delhi',
        date: 'Sep 2026',
      },
    ],
  },
  {
    id: 'khajjiar-cedar-chalet',
    name: 'Khajjiar Cedar Ridge Chalet',
    type: 'boutique',
    typeLabel: 'Boutique Hotel',
    location: 'Khajjiar, Himachal Pradesh',
    regionSlug: 'chamba',
    landmarkNote: 'Khajjiar Sanctuary Rim, Himachal Pradesh · 600 m from Khajjiar Lake Meadow',
    rating: '4.8',
    reviewCount: 67,
    summary:
      'Panoramic glass-walled mountain suites bordering cedar forests with guided meadow walks.',
    fullDescription:
      'Set along the quiet edge of the Kalatop-Khajjiar cedar reserve, Khajjiar Cedar Ridge Chalet offers floor-to-ceiling alpine views, radiant cedar-wood interiors, and dawn guided walks across the emerald meadow.',
    nightlyRate: 12400,
    image: IMAGES.stayCedarChalet,
    gallery: [IMAGES.stayCedarChalet, IMAGES.stayTimberVilla, IMAGES.ecoJourneys],
    amenities: [
      { icon: 'wifi', label: 'High-Speed Fibre Wi-Fi' },
      { icon: 'flame', label: 'Hearth Lounge & Heating' },
      { icon: 'utensils', label: 'Farm-to-Table Pahadi Dining' },
      { icon: 'car', label: 'SUV Mountain Transfers' },
      { icon: 'mountain', label: 'Cedar Forest Panorama' },
      { icon: 'headphones', label: 'Guided Meadow Trails' },
    ],
    rooms: [
      {
        id: 'alpine-glass-suite',
        name: 'Alpine Glass Forest Suite',
        details: 'King bed · Panoramic forest glass wall · Breakfast included',
        nightlyRate: 12400,
      },
      {
        id: 'dhauladhar-penthouse',
        name: 'Dhauladhar Peak Ridge Villa',
        details: '4 Guests · Private fireplace deck · Half-board dining',
        nightlyRate: 16800,
      },
    ],
    reviews: [
      {
        quote:
          'Stepping out directly onto the pine trails at sunrise with zero crowds felt like a private alpine sanctuary.',
        author: 'Kabir Sethi',
        location: 'Mumbai',
        date: 'Oct 2026',
      },
      {
        quote:
          'Heated floors, crisp linens, and the warmest ginger-honey kahwa waiting after our Bharmour drive.',
        author: 'Nandini Rao',
        location: 'Hyderabad',
        date: 'Aug 2026',
      },
    ],
  },
  {
    id: 'zabarwan-houseboat',
    name: 'Zabarwan Carved Walnut Houseboat',
    type: 'homestay',
    typeLabel: 'Heritage Homestay',
    location: 'Dal Lake, Kashmir',
    regionSlug: 'kashmir',
    landmarkNote: 'Nigeen & Dal Lake Quiet Channel, Srinagar · Private Shikara Jetty',
    rating: '4.9',
    reviewCount: 54,
    summary:
      'Hand-carved walnut wood staterooms with private shikara deck and Kahwa tea service.',
    fullDescription:
      'Crafted by third-generation Kashmiri woodcarvers, Zabarwan Carved Walnut Houseboat anchors on the peaceful willow-lined edge of Dal Lake with bespoke khatamband ceilings and private sunrise shikara rides.',
    nightlyRate: 10800,
    image: IMAGES.sereneKashmir,
    gallery: [IMAGES.sereneKashmir, IMAGES.stayCedarChalet, IMAGES.ecoExperiences],
    amenities: [
      { icon: 'wifi', label: 'Lakefront Wi-Fi' },
      { icon: 'flame', label: 'Traditional Bukhari Heating' },
      { icon: 'utensils', label: 'Wazwan & Kahwa Service' },
      { icon: 'car', label: 'Private Shikara Transfers' },
      { icon: 'mountain', label: 'Zabarwan Lake Deck' },
      { icon: 'headphones', label: '24/7 Host Care' },
    ],
    rooms: [
      {
        id: 'walnut-stateroom',
        name: 'Carved Walnut Lake Stateroom',
        details: 'Queen bed · Private shikara veranda · Kashmiri breakfast',
        nightlyRate: 10800,
      },
      {
        id: 'maharaja-pavilion',
        name: 'Royal Khatamband Pavilion Suite',
        details: '2 Guests + Living Salon · Sunset Shikara Ride Included',
        nightlyRate: 14500,
      },
    ],
    reviews: [
      {
        quote:
          'Watching the floating lotus gardens wake up from our private walnut deck was pure magic.',
        author: 'Sanya & Dev Kapoor',
        location: 'Chandigarh',
        date: 'Oct 2026',
      },
      {
        quote:
          'Authentic Wazwan dinner prepared on board and impeccable local stewardship.',
        author: 'Vikramaditya Nair',
        location: 'Kochi',
        date: 'Sep 2026',
      },
    ],
  },
  {
    id: 'fontainhas-casa-cove',
    name: 'Fontainhas Heritage Courtyard Casa',
    type: 'boutique',
    typeLabel: 'Boutique Hotel',
    location: 'Fontainhas & South Goa',
    regionSlug: 'goa',
    landmarkNote: 'Latin Quarter Heritage Lane, Panjim · 20 mins to quiet coastal coves',
    rating: '4.8',
    reviewCount: 39,
    summary:
      'Restored Indo-Portuguese courtyard mansion with azulejo verandas and coastal spice dining.',
    fullDescription:
      'Set amid ochre-washed lanes of Fontainhas, this restored 19th-century courtyard residence pairs hand-painted azulejo tilework, shaded frangipani patios, and curated day excursions to quiet South Goa coves.',
    nightlyRate: 7500,
    image: IMAGES.goaBeaches,
    gallery: [IMAGES.goaBeaches, IMAGES.stayTimberVilla, IMAGES.ecoJourneys],
    amenities: [
      { icon: 'wifi', label: 'High-Speed Wi-Fi' },
      { icon: 'utensils', label: 'Goan Artisan Breakfast' },
      { icon: 'car', label: 'Coastal Chauffeur Access' },
      { icon: 'mountain', label: 'Frangipani Courtyard' },
      { icon: 'headphones', label: 'Local Heritage Walks' },
    ],
    rooms: [
      {
        id: 'azulejo-veranda',
        name: 'Azulejo Courtyard Suite',
        details: 'King four-poster bed · Juliet balcony · Breakfast included',
        nightlyRate: 7500,
      },
      {
        id: 'cove-pool-villa',
        name: 'Palolem Private Plunge Villa',
        details: '2 Guests · Private garden plunge · Sunset boat charter',
        nightlyRate: 11200,
      },
    ],
    reviews: [
      {
        quote:
          'Peaceful mornings in the courtyard and our concierge booked an untouched cove boat ride.',
        author: 'Tara Deshmukh',
        location: 'Pune',
        date: 'Oct 2026',
      },
    ],
  },
  {
    id: 'pichola-sandstone-haveli',
    name: 'Pichola Sandstone Courtyard Haveli',
    type: 'boutique',
    typeLabel: 'Boutique Hotel',
    location: 'Udaipur, Rajasthan',
    regionSlug: 'rajasthan',
    landmarkNote: 'Lake Pichola West Ghat, Udaipur · Rooftop Palace Views',
    rating: '4.9',
    reviewCount: 51,
    summary:
      'Carved jharokha arches overlooking Lake Pichola with rooftop candlelit Mewari dining.',
    fullDescription:
      'An intimate 11-suite sandstone haveli perched above Lake Pichola, featuring hand-carved limestone jharokhas, cool marble courtyards, and private sunset boat charters.',
    nightlyRate: 11000,
    image: IMAGES.royalRajasthan,
    gallery: [IMAGES.royalRajasthan, IMAGES.stayCedarChalet, IMAGES.chambaTemples],
    amenities: [
      { icon: 'wifi', label: 'High-Speed Wi-Fi' },
      { icon: 'utensils', label: 'Rooftop Mewari Dining' },
      { icon: 'car', label: 'Heritage Transfer' },
      { icon: 'mountain', label: 'Lakefront Terrace' },
      { icon: 'headphones', label: 'Astronomy & Fort Tours' },
    ],
    rooms: [
      {
        id: 'jharokha-lake-room',
        name: 'Jharokha Lake View Suite',
        details: 'King bed · Carved stone window seat · Breakfast included',
        nightlyRate: 11000,
      },
      {
        id: 'mewar-terrace-suite',
        name: 'Royal Mewar Terrace Suite',
        details: '2 Guests · Private rooftop pavilion · Sunset boat ride',
        nightlyRate: 15900,
      },
    ],
    reviews: [
      {
        quote:
          'The golden twilight reflection from the haveli terrace felt straight out of a painting.',
        author: 'Arjun & Priya Mehta',
        location: 'Ahmedabad',
        date: 'Oct 2026',
      },
    ],
  },
  {
    id: 'munnar-tea-bungalow',
    name: 'High Range Misty Tea Estate Bungalow',
    type: 'homestay',
    typeLabel: 'Heritage Homestay',
    location: 'Munnar, Kerala',
    regionSlug: 'kerala',
    landmarkNote: 'Lockhart Ridge Tea Estate, Munnar · 1,650 m Elevation',
    rating: '4.9',
    reviewCount: 47,
    summary:
      '1920s planter bungalow wrapped in emerald tea slopes with private spice and mist trails.',
    fullDescription:
      'Surrounded by 400 acres of organic high-altitude tea gardens in Munnar, this restored timber-and-stone planter bungalow serves estate-picked Nilgiri teas and Malabar coastal breakfasts.',
    nightlyRate: 8400,
    image: IMAGES.enchantingKerala,
    gallery: [IMAGES.enchantingKerala, IMAGES.stayTimberVilla, IMAGES.ecoExperiences],
    amenities: [
      { icon: 'wifi', label: 'Estate Fibre Wi-Fi' },
      { icon: 'flame', label: 'Evening Hearth & Tea Tasting' },
      { icon: 'utensils', label: 'Malabar Estate Kitchen' },
      { icon: 'mountain', label: 'Private Tea Ridge Trails' },
      { icon: 'headphones', label: 'Backwater Connection' },
    ],
    rooms: [
      {
        id: 'planter-veranda',
        name: 'Planter Veranda Room',
        details: 'King bed · Tea garden deck · Estate breakfast & high tea',
        nightlyRate: 8400,
      },
      {
        id: 'mist-ridge-cottage',
        name: 'Mist Ridge Private Cottage',
        details: '4 Guests · Fireplace lounge · Guided tea tasting',
        nightlyRate: 12200,
      },
    ],
    reviews: [
      {
        quote:
          'Waking up inside rolling clouds over tea terraces with fresh cardamom coffee was restorative.',
        author: 'Lakshmi Subramanian',
        location: 'Chennai',
        date: 'Sep 2026',
      },
    ],
  },
];

export const CHAMBA_CULTURAL_PILLARS = [
  {
    id: 'temples',
    title: 'Ancient Temples',
    description:
      '10th-century Lakshmi Narayan Shikhara complex and Champavati stone carvings.',
    image: IMAGES.chambaTemples,
    imageAlt: 'Lakshmi Narayan Temple Chamba',
  },
  {
    id: 'rumal',
    title: 'Chamba Rumal',
    description:
      'GI-tagged double-satin stitch embroidery on handspun muslin by master artisans.',
    image: IMAGES.chambaRumal,
    imageAlt: 'Chamba Rumal Embroidery',
  },
  {
    id: 'minjar',
    title: 'Minjar Mela',
    description:
      'Historic week-long monsoon harvest celebration at the Chaugan with golden silk tassels.',
    image: IMAGES.chambaMinjar,
    imageAlt: 'Minjar Mela Procession',
  },
  {
    id: 'culture',
    title: 'Chamba Dham & Folk',
    description:
      'Traditional Madra, Rajmah, and Chamba Chuk paired with Nati folk music.',
    image: IMAGES.chambaFolk,
    imageAlt: 'Pahadi Folk and Local Cuisine',
  },
];

export const CHAMBA_EXPERIENCES: ChambaExperience[] = [
  {
    id: 'exp-dawn-walk',
    meta: '3 Hours · Heritage Walk',
    title: 'Chamba Temple & Chaugan Dawn Walk',
    host: 'Hosted by Historian Vikram Sen · Small group (max 8)',
    price: 1450,
    itineraryLabel: 'Experience: Chamba Temple & Chaugan Dawn Walk',
  },
  {
    id: 'exp-rumal-class',
    meta: '2.5 Hours · Craft Atelier',
    title: 'Chamba Rumal Masterclass',
    host: 'Hosted by Padma-awarded Artisan Studio · Materials included',
    price: 2100,
    itineraryLabel: 'Experience: Chamba Rumal Masterclass',
  },
  {
    id: 'exp-ravi-kayak',
    meta: '4 Hours · Adventure',
    title: 'Ravi River Kayaking & Cedar Trail',
    host: 'Hosted by Chamba Alpine Guides · Certified safety gear',
    price: 2800,
    itineraryLabel: 'Experience: Ravi River Kayaking & Cedar Trail',
  },
];

export const TRIP_BUILDER_CATALOG = [
  {
    id: 'tb-ravi-villa',
    title: 'Ravi Valley Heritage Timber Villa',
    subtitle: 'Stay · 4 Nights · ₹8,900/night',
    itineraryLabel: 'Stay: Ravi Valley Heritage Timber Villa (4 Nights)',
    category: 'Stay' as const,
    price: 35600,
  },
  {
    id: 'tb-rumal-walk',
    title: 'Chamba Rumal Masterclass & Temple Walk',
    subtitle: 'Experience · Day 2 · ₹2,100/guest',
    itineraryLabel: 'Experience: Chamba Rumal Masterclass & Temple Walk',
    category: 'Experience' as const,
    price: 2100,
  },
  {
    id: 'tb-mountain-suv',
    title: 'Pathankot / Gaggal to Chamba Mountain SUV',
    subtitle: 'Supporting Transport · Private Transfer · ₹4,200',
    itineraryLabel: 'Transport: Pathankot / Gaggal to Chamba Mountain SUV',
    category: 'Transport' as const,
    price: 4200,
  },
  {
    id: 'tb-khajjiar-day',
    title: 'Khajjiar Cedar Meadow & Kalatop Trail',
    subtitle: 'Experience · Day 3 · ₹2,400/guest',
    itineraryLabel: 'Experience: Khajjiar Cedar Meadow & Kalatop Trail',
    category: 'Experience' as const,
    price: 2400,
  },
];
