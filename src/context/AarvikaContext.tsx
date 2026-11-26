import React, { createContext, useContext, useEffect, useState } from 'react';
import { STAYS } from '../data/travelData';
import type {
  BookingDraft,
  ConfirmedBooking,
  ItineraryItem,
  PageId,
  RouteParams,
  UserAccount,
} from '../types/travel';

interface AarvikaContextValue {
  currentPage: PageId;
  routeParams: RouteParams;
  navigate: (page: PageId, params?: RouteParams) => void;
  selectedStayId: string;
  setSelectedStayId: (id: string) => void;
  bookingDraft: BookingDraft;
  updateBookingDraft: (partial: Partial<BookingDraft>) => void;
  confirmedBookings: ConfirmedBooking[];
  confirmBooking: (paymentMethod: 'upi' | 'card' | 'netbanking') => ConfirmedBooking;
  tripDestination: string;
  setTripDestination: (dest: string) => void;
  tripDates: string;
  setTripDates: (dates: string) => void;
  itineraryItems: ItineraryItem[];
  addItineraryItem: (item: ItineraryItem) => boolean;
  removeItineraryItem: (id: string) => void;
  tripSavedMessage: string | null;
  saveTripToAccount: () => void;
  user: UserAccount | null;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_ITINERARY: ItineraryItem[] = [
  {
    id: 'init-1',
    label: 'Day 1: Arrival & Ravi Valley Villa Check-in',
    category: 'Stay',
    price: 8900,
  },
  {
    id: 'init-2',
    label: 'Day 2: Lakshmi Narayan Temple & Rumal Atelier',
    category: 'Experience',
    price: 2100,
  },
];

const DEFAULT_STAY = STAYS[0];

const DEFAULT_BOOKING_DRAFT: BookingDraft = {
  stayId: DEFAULT_STAY.id,
  roomId: DEFAULT_STAY.rooms[0].id,
  roomName: DEFAULT_STAY.rooms[0].name,
  nightlyRate: DEFAULT_STAY.rooms[0].nightlyRate,
  checkIn: '2026-11-14',
  checkOut: '2026-11-18',
  guests: 2,
  guestName: 'Aarav Sharma',
  guestEmail: 'aarav.sharma@example.in',
  guestPhone: '+91 98160 44210',
  arrivalTime: '13:00-15:00',
  specialRequests: '',
};

const VALID_PAGES: PageId[] = [
  'home',
  'explore',
  'discover-chamba',
  'stays',
  'property',
  'trip-planner',
  'checkout',
  'sign-in',
];

function parseHash(): { page: PageId; params: RouteParams } {
  if (typeof window === 'undefined') {
    return { page: 'home', params: {} };
  }
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { page: 'home', params: {} };

  const [pathPart, queryPart] = raw.split('?');
  const page = VALID_PAGES.includes(pathPart as PageId) ? (pathPart as PageId) : 'home';
  const params: RouteParams = {};
  if (queryPart) {
    const sp = new URLSearchParams(queryPart);
    if (sp.get('dest')) params.dest = sp.get('dest') ?? undefined;
    if (sp.get('region')) params.region = sp.get('region') ?? undefined;
    if (sp.get('tab')) params.tab = sp.get('tab') ?? undefined;
    if (sp.get('stayId')) params.stayId = sp.get('stayId') ?? undefined;
    if (sp.get('section')) params.section = sp.get('section') ?? undefined;
  }
  return { page, params };
}

function buildHash(page: PageId, params?: RouteParams): string {
  if (page === 'home' && (!params || Object.keys(params).length === 0)) {
    return '#/';
  }
  const sp = new URLSearchParams();
  if (params?.dest) sp.set('dest', params.dest);
  if (params?.region) sp.set('region', params.region);
  if (params?.tab) sp.set('tab', params.tab);
  if (params?.stayId) sp.set('stayId', params.stayId);
  if (params?.section) sp.set('section', params.section);
  const qs = sp.toString();
  return qs ? `#/${page}?${qs}` : `#/${page}`;
}

export function computeNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 4;
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff >= 1 && diff <= 30 ? diff : 4;
}

const AarvikaContext = createContext<AarvikaContextValue | null>(null);

export const AarvikaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [routeParams, setRouteParams] = useState<RouteParams>(initial.params);

  const [selectedStayId, setSelectedStayId] = useState<string>(() => {
    return initial.params.stayId || DEFAULT_STAY.id;
  });

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(() => {
    try {
      const saved = localStorage.getItem('aarvika_booking_draft');
      if (saved) return { ...DEFAULT_BOOKING_DRAFT, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return DEFAULT_BOOKING_DRAFT;
  });

  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem('aarvika_confirmed_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [tripDestination, setTripDestination] = useState<string>('Chamba & Khajjiar, HP');
  const [tripDates, setTripDates] = useState<string>('14 Nov – 18 Nov 2026');
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(() => {
    try {
      const saved = localStorage.getItem('aarvika_itinerary');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_ITINERARY;
  });
  const [tripSavedMessage, setTripSavedMessage] = useState<string | null>(null);

  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('aarvika_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      setCurrentPage(parsed.page);
      setRouteParams(parsed.params);
      if (parsed.params.stayId) {
        setSelectedStayId(parsed.params.stayId);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aarvika_booking_draft', JSON.stringify(bookingDraft));
    } catch {
      // ignore
    }
  }, [bookingDraft]);

  useEffect(() => {
    try {
      localStorage.setItem('aarvika_itinerary', JSON.stringify(itineraryItems));
    } catch {
      // ignore
    }
  }, [itineraryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aarvika_confirmed_bookings', JSON.stringify(confirmedBookings));
    } catch {
      // ignore
    }
  }, [confirmedBookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigate = (page: PageId, params: RouteParams = {}) => {
    if (params.stayId) {
      setSelectedStayId(params.stayId);
      const stay = STAYS.find((s) => s.id === params.stayId);
      if (stay) {
        setBookingDraft((prev) => ({
          ...prev,
          stayId: stay.id,
          roomId: stay.rooms[0].id,
          roomName: stay.rooms[0].name,
          nightlyRate: stay.rooms[0].nightlyRate,
        }));
      }
    }
    setCurrentPage(page);
    setRouteParams(params);
    const nextHash = buildHash(page, params);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    if (params.section) {
      window.setTimeout(() => {
        const el = document.getElementById(params.section!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateBookingDraft = (partial: Partial<BookingDraft>) => {
    setBookingDraft((prev) => ({ ...prev, ...partial }));
  };

  const confirmBooking = (paymentMethod: 'upi' | 'card' | 'netbanking'): ConfirmedBooking => {
    const stay = STAYS.find((s) => s.id === bookingDraft.stayId) || STAYS[0];
    const nights = computeNights(bookingDraft.checkIn, bookingDraft.checkOut);
    const roomTotal = bookingDraft.nightlyRate * nights;
    const taxAmount = Math.round(roomTotal * 0.12);
    const conciergeFee = 2320;
    const totalInr = roomTotal + taxAmount + conciergeFee;
    const randomNum = Math.floor(1000 + Math.random() * 8999);
    const newBooking: ConfirmedBooking = {
      reference: `AVR-2026-${randomNum}`,
      stayId: stay.id,
      stayName: stay.name,
      stayImage: stay.image,
      location: stay.location,
      roomName: bookingDraft.roomName,
      checkIn: bookingDraft.checkIn,
      checkOut: bookingDraft.checkOut,
      nights,
      guests: bookingDraft.guests,
      guestName: bookingDraft.guestName,
      guestEmail: bookingDraft.guestEmail,
      guestPhone: bookingDraft.guestPhone,
      paymentMethod,
      totalInr,
      confirmedAt: new Date().toISOString(),
    };
    setConfirmedBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const addItineraryItem = (item: ItineraryItem): boolean => {
    let added = false;
    setItineraryItems((prev) => {
      if (prev.some((existing) => existing.id === item.id || existing.label === item.label)) {
        return prev;
      }
      added = true;
      return [...prev, item];
    });
    return added;
  };

  const removeItineraryItem = (id: string) => {
    setItineraryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const saveTripToAccount = () => {
    try {
      localStorage.setItem(
        'aarvika_saved_trip',
        JSON.stringify({
          destination: tripDestination,
          dates: tripDates,
          items: itineraryItems,
          savedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore
    }
    if (user) {
      setTripSavedMessage(`Trip synced to ${user.email} (${itineraryItems.length} curated items).`);
    } else {
      setTripSavedMessage('Trip saved in session. Sign in to sync across devices.');
    }
  };

  const signIn = (name: string, email: string) => {
    const account = { name, email };
    setUser(account);
    setBookingDraft((prev) => ({
      ...prev,
      guestName: prev.guestName || name,
      guestEmail: email,
    }));
    try {
      localStorage.setItem('aarvika_user', JSON.stringify(account));
    } catch {
      // ignore
    }
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('aarvika_user');
    } catch {
      // ignore
    }
    showToast('Signed out of AARVIKA.');
  };

  return (
    <AarvikaContext.Provider
      value={{
        currentPage,
        routeParams,
        navigate,
        selectedStayId,
        setSelectedStayId,
        bookingDraft,
        updateBookingDraft,
        confirmedBookings,
        confirmBooking,
        tripDestination,
        setTripDestination,
        tripDates,
        setTripDates,
        itineraryItems,
        addItineraryItem,
        removeItineraryItem,
        tripSavedMessage,
        saveTripToAccount,
        user,
        signIn,
        signOut,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AarvikaContext.Provider>
  );
};

export function useAarvika() {
  const ctx = useContext(AarvikaContext);
  if (!ctx) throw new Error('useAarvika must be used within AarvikaProvider');
  return ctx;
}
