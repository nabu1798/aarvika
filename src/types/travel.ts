export type PageId =
  | 'home'
  | 'explore'
  | 'discover-chamba'
  | 'stays'
  | 'property'
  | 'trip-planner'
  | 'checkout'
  | 'sign-in';

export interface RouteParams {
  dest?: string;
  region?: string;
  tab?: string;
  stayId?: string;
  section?: string;
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  shortTitleLines: [string, string];
  badge: string;
  isSignature?: boolean;
  categories: ('himalayas' | 'heritage' | 'coastal')[];
  searchKeywords: string;
  description: string;
  staysCount: number;
  packagesCount: number;
  experiencesCount?: number;
  startingPrice: number;
  image: string;
  imageAlt: string;
  targetPage: PageId;
  targetParams?: RouteParams;
}

export interface HolidayPackage {
  id: string;
  duration: string;
  title: string;
  description: string;
  pricePerPerson: number;
  destinationName: string;
  actionLabel: string;
  targetPage: PageId;
}

export interface RoomOption {
  id: string;
  name: string;
  details: string;
  nightlyRate: number;
}

export interface PropertyReview {
  quote: string;
  author: string;
  location: string;
  date: string;
}

export interface StayProperty {
  id: string;
  name: string;
  type: 'homestay' | 'boutique';
  typeLabel: string;
  location: string;
  regionSlug: string;
  landmarkNote: string;
  rating: string;
  reviewCount: number;
  summary: string;
  fullDescription: string;
  nightlyRate: number;
  image: string;
  gallery: string[];
  amenities: { icon: string; label: string }[];
  rooms: RoomOption[];
  reviews: PropertyReview[];
}

export interface ChambaExperience {
  id: string;
  meta: string;
  title: string;
  host: string;
  price: number;
  itineraryLabel: string;
}

export interface ItineraryItem {
  id: string;
  label: string;
  category: 'Stay' | 'Experience' | 'Transport' | 'Package';
  price: number;
}

export interface BookingDraft {
  stayId: string;
  roomId: string;
  roomName: string;
  nightlyRate: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  arrivalTime: string;
  specialRequests: string;
}

export interface ConfirmedBooking {
  reference: string;
  stayId: string;
  stayName: string;
  stayImage: string;
  location: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  totalInr: number;
  confirmedAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
}
