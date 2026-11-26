import React, { useState } from 'react';
import {
  BedDouble,
  Calendar,
  Camera,
  Car,
  Compass,
  FileText,
  Home,
  MapPin,
  Plane,
  Route,
  Search,
  Tag,
  User,
  Waves,
} from 'lucide-react';
import { HeroOverlayHeader } from '../components/Header';
import { HomeBrandedFooter } from '../components/Footer';
import { ArrowForwardIcon } from '../components/Icons';
import { SafeImage } from '../components/SafeImage';
import { useAarvika } from '../context/AarvikaContext';
import { DESTINATIONS, IMAGES } from '../data/travelData';

type SearchTab = 'stays' | 'packages' | 'experiences' | 'transport';

const TAB_CONFIG: Record<
  SearchTab,
  {
    field1: { label: string; value: string }[];
    field2: { label: string; value: string }[];
    field3: { label: string; value: string }[];
    icon2: 'calendar' | 'tag' | 'pin';
  }
> = {
  stays: {
    field1: [
      { label: 'Destination: Chamba, HP', value: 'chamba' },
      { label: 'Himachal Paradise', value: 'chamba' },
      { label: 'Serene Kashmir', value: 'kashmir' },
      { label: 'Goa Beaches', value: 'goa' },
      { label: 'Royal Rajasthan', value: 'rajasthan' },
      { label: 'Enchanting Kerala', value: 'kerala' },
    ],
    field2: [
      { label: '14 Nov – 18 Nov 2026', value: '2026-11-14|2026-11-18' },
      { label: '05 Dec – 09 Dec 2026', value: '2026-12-05|2026-12-09' },
      { label: '22 Dec – 27 Dec 2026', value: '2026-12-22|2026-12-27' },
      { label: 'Flexible Dates', value: '2026-11-14|2026-11-18' },
    ],
    field3: [
      { label: '2 Guests', value: '2' },
      { label: '1 Guest', value: '1' },
      { label: '3 Guests', value: '3' },
      { label: '4 Guests', value: '4' },
      { label: '6+ Group', value: '6' },
    ],
    icon2: 'calendar',
  },
  packages: {
    field1: [
      { label: 'Package: Chamba & Khajjiar', value: 'chamba' },
      { label: 'Kashmir Valley Circuit', value: 'kashmir' },
      { label: 'Royal Rajasthan Heritage', value: 'rajasthan' },
      { label: 'Kerala Backwaters & Hills', value: 'kerala' },
    ],
    field2: [
      { label: '5 Days · Nov 2026', value: '5d' },
      { label: '7 Days · Dec 2026', value: '7d' },
      { label: '4 Days · Jan 2027', value: '4d' },
    ],
    field3: [
      { label: '2 Travellers', value: '2' },
      { label: '1 Traveller', value: '1' },
      { label: '4 Travellers', value: '4' },
      { label: 'Family (5+)', value: '5' },
    ],
    icon2: 'calendar',
  },
  experiences: {
    field1: [
      { label: 'Chamba, Himachal Pradesh', value: 'chamba' },
      { label: 'Dharamshala & Kangra', value: 'kangra' },
      { label: 'Srinagar, Kashmir', value: 'kashmir' },
      { label: 'Udaipur, Rajasthan', value: 'rajasthan' },
    ],
    field2: [
      { label: 'Heritage & Temples', value: 'temples' },
      { label: 'Chamba Rumal Craft', value: 'rumal' },
      { label: 'River & Mountain Trails', value: 'adventure' },
      { label: 'Culinary Walks', value: 'cuisine' },
    ],
    field3: [
      { label: '2 Participants', value: '2' },
      { label: '1 Participant', value: '1' },
      { label: '4 Participants', value: '4' },
      { label: 'Private Group', value: '6' },
    ],
    icon2: 'tag',
  },
  transport: {
    field1: [
      { label: 'Pickup: Pathankot / Gaggal Airport', value: 'pathankot' },
      { label: 'Pickup: Chandigarh', value: 'chandigarh' },
      { label: 'Pickup: Chamba Town', value: 'chamba' },
      { label: 'Pickup: Dalhousie', value: 'dalhousie' },
    ],
    field2: [
      { label: 'Drop: Chamba Valley', value: 'chamba' },
      { label: 'Drop: Khajjiar Meadow', value: 'khajjiar' },
      { label: 'Drop: Bharmour', value: 'bharmour' },
      { label: 'Drop: Dharamshala', value: 'dharamshala' },
    ],
    field3: [
      { label: '2 Passengers', value: '2' },
      { label: '4 Passengers (SUV)', value: '4' },
      { label: '6 Passengers (Tempo)', value: '6' },
    ],
    icon2: 'pin',
  },
};

export const HomePage: React.FC = () => {
  const { navigate, updateBookingDraft, setTripDestination } = useAarvika();
  const [activeTab, setActiveTab] = useState<SearchTab>('stays');
  const [field1Idx, setField1Idx] = useState(0);
  const [field2Idx, setField2Idx] = useState(0);
  const [field3Idx, setField3Idx] = useState(0);

  const cfg = TAB_CONFIG[activeTab];

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    setField1Idx(0);
    setField2Idx(0);
    setField3Idx(0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel1 = cfg.field1[field1Idx] || cfg.field1[0];
    const sel2 = cfg.field2[field2Idx] || cfg.field2[0];
    const sel3 = cfg.field3[field3Idx] || cfg.field3[0];

    if (activeTab === 'stays') {
      const [checkIn, checkOut] = sel2.value.split('|');
      updateBookingDraft({
        checkIn: checkIn || '2026-11-14',
        checkOut: checkOut || '2026-11-18',
        guests: parseInt(sel3.value, 10) || 2,
      });
      navigate('stays', { dest: sel1.value });
    } else if (activeTab === 'packages') {
      navigate('explore', { tab: 'packages', section: 'packages', dest: sel1.value });
    } else if (activeTab === 'experiences') {
      navigate('discover-chamba', { section: 'experiences' });
    } else {
      setTripDestination(sel2.label.replace('Drop: ', ''));
      navigate('trip-planner', { tab: 'transport' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* HERO + NAVIGATION */}
      <div className="relative bg-deep-teal overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src={IMAGES.heroChamba}
            alt="Chamba Himalayan valley at sunrise with ancient pagoda temple and winding river"
            className="w-full h-full object-cover object-center"
            fallbackTitle="Chamba Himalayan Valley"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-teal/95 via-deep-teal/70 to-deep-teal/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/75 via-transparent to-deep-teal/35" />
        </div>

        <HeroOverlayHeader />

        {/* Hero Content */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-28 md:pt-12 md:pb-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 mb-4">
              <MapPin className="w-4 h-4 text-antique-gold fill-antique-gold/20" aria-hidden="true" />
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
                CHAMBA, HIMACHAL PRADESH
              </span>
            </div>

            <h1 className="font-headline text-[34px] leading-[40px] md:text-[60px] md:leading-[66px] tracking-[-0.5px] font-bold text-pure-white text-balance mb-4">
              The World Is
              <br />
              Yours to <span className="text-antique-gold">Discover.</span>
            </h1>

            <p className="font-body text-[16px] leading-[26px] text-pure-white/90 max-w-md text-pretty mb-6">
              Discover stays, journeys and local experiences across breathtaking destinations.
            </p>

            <div className="w-14 h-0.5 bg-antique-gold rounded-full" aria-hidden="true" />
          </div>
        </section>

        {/* Organic Curved Bottom Transition into Warm Ivory */}
        <div className="relative z-10 w-full leading-none pointer-events-none">
          <svg
            className="w-full h-12 md:h-20"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0,16 C360,84 1080,84 1440,16 L1440,80 L0,80 Z" fill="#F7F2E9" />
          </svg>
        </div>
      </div>

      {/* FLOATING SEARCH PANEL */}
      <section className="relative z-30 max-w-4xl w-full mx-auto px-4 -mt-20 md:-mt-24 mb-12">
        <div>
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Search travel services"
              className="inline-flex flex-wrap bg-pure-white rounded-t-xl shadow-md overflow-hidden border border-b-0 border-outline-variant/30"
            >
              {(
                [
                  { id: 'stays', label: 'Stays', Icon: BedDouble },
                  { id: 'packages', label: 'Packages', Icon: Plane },
                  { id: 'experiences', label: 'Experiences', Icon: Camera },
                  { id: 'transport', label: 'Transport', Icon: Car },
                ] as const
              ).map(({ id, label, Icon }) => {
                const selected = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => handleTabChange(id)}
                    className={`inline-flex items-center gap-2 px-4 md:px-6 py-3 transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                      selected
                        ? 'bg-deep-teal text-pure-white'
                        : 'bg-pure-white text-charcoal hover:bg-surface-container-low'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="font-body text-[14px] font-semibold">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="bg-pure-white rounded-2xl shadow-xl border border-outline-variant/30 p-4 md:p-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-0">
              <div className="md:col-span-4 flex items-center gap-2 px-4 py-2 md:border-r border-outline-variant/40">
                <MapPin className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
                <div className="w-full">
                  <label htmlFor="search-field-1" className="sr-only">
                    Destination
                  </label>
                  <select
                    id="search-field-1"
                    value={field1Idx}
                    onChange={(e) => setField1Idx(Number(e.target.value))}
                    className="w-full border-0 bg-transparent p-0 pr-4 font-body text-[14px] font-medium text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {cfg.field1.map((item, idx) => (
                      <option key={item.label} value={idx}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-4 flex items-center gap-2 px-4 py-2 md:border-r border-outline-variant/40">
                {cfg.icon2 === 'calendar' && (
                  <Calendar className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
                )}
                {cfg.icon2 === 'tag' && (
                  <Tag className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
                )}
                {cfg.icon2 === 'pin' && (
                  <MapPin className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
                )}
                <div className="w-full">
                  <label htmlFor="search-field-2" className="sr-only">
                    Dates or Category
                  </label>
                  <select
                    id="search-field-2"
                    value={field2Idx}
                    onChange={(e) => setField2Idx(Number(e.target.value))}
                    className="w-full border-0 bg-transparent p-0 pr-4 font-body text-[14px] font-medium text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {cfg.field2.map((item, idx) => (
                      <option key={item.label} value={idx}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-2 px-4 py-2">
                <User className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
                <div className="w-full">
                  <label htmlFor="search-field-3" className="sr-only">
                    Guests
                  </label>
                  <select
                    id="search-field-3"
                    value={field3Idx}
                    onChange={(e) => setField3Idx(Number(e.target.value))}
                    className="w-full border-0 bg-transparent p-0 pr-2 font-body text-[14px] font-medium text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {cfg.field3.map((item, idx) => (
                      <option key={item.label} value={idx}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-antique-gold hover:bg-antique-gold-hover text-pure-white px-4 py-3 transition-colors duration-150 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span className="font-body text-[14px] font-semibold">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* FIND YOUR NEXT SOMEWHERE */}
      <section className="max-w-7xl w-full mx-auto px-4 md:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-4 mb-2">
            <span className="w-10 h-px bg-antique-gold/60" aria-hidden="true" />
            <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-deep-teal">
              EXPLORE MORE
            </span>
            <span className="w-10 h-px bg-antique-gold/60" aria-hidden="true" />
          </div>
          <h2 className="font-headline text-[28px] leading-[34px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-charcoal mb-2">
            Find your next <em className="italic font-normal">somewhere</em>
          </h2>
          <p className="font-body text-[14px] leading-[22px] text-on-surface-variant">
            From serene hill towns to vibrant cultures, discover destinations that inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {DESTINATIONS.map((dest, idx) => (
            <button
              key={dest.id}
              type="button"
              onClick={() =>
                idx === 0
                  ? navigate('discover-chamba')
                  : navigate('explore', { dest: dest.slug })
              }
              className={`group relative block text-left h-72 md:h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <SafeImage
                src={dest.image}
                alt={dest.imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                fallbackTitle={dest.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
                <h3 className="font-headline text-[20px] font-semibold text-pure-white leading-snug">
                  {dest.shortTitleLines[0]}
                  <br />
                  {dest.shortTitleLines[1]}
                </h3>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-antique-gold text-pure-white shrink-0 group-hover:bg-antique-gold-hover transition-colors duration-150">
                  <ArrowForwardIcon className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DISCOVER CHAMBA CULTURAL SHOWCASE */}
      <section className="bg-deep-teal text-pure-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 px-4 md:px-8 py-12 md:py-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-antique-gold" aria-hidden="true" />
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
                OUR ROOTS, OUR PRIDE
              </span>
              <span className="w-6 h-px bg-antique-gold" aria-hidden="true" />
            </div>

            <h2 className="font-headline text-[30px] leading-[36px] md:text-[44px] md:leading-[50px] font-bold text-pure-white mb-4">
              Discover
              <br />
              <span className="text-antique-gold">Chamba</span>
            </h2>

            <p className="font-body text-[16px] leading-[26px] text-pure-white/85 max-w-sm text-pretty mb-8">
              A land of rich culture, ancient temples and vibrant traditions.
            </p>

            <div>
              <button
                type="button"
                onClick={() => navigate('discover-chamba')}
                className="inline-flex items-center gap-2 rounded-full border border-pure-white/50 hover:border-antique-gold hover:bg-antique-gold hover:text-charcoal text-pure-white px-6 py-2.5 transition-colors duration-150 cursor-pointer"
              >
                <span className="font-body text-[14px] font-semibold">Explore Chamba</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0 min-h-[280px] lg:min-h-[340px] p-4 lg:p-0">
            {[
              {
                section: 'temples',
                label: 'Chamba Ancient Temples',
                img: IMAGES.chambaTemples,
                alt: 'Ancient stone temple in Chamba',
                border: true,
              },
              {
                section: 'rumal',
                label: 'Chamba Rumal Embroidery',
                img: IMAGES.chambaRumal,
                alt: 'Traditional Chamba Rumal hand embroidery',
                border: true,
              },
              {
                section: 'minjar',
                label: 'Minjar Mela Procession',
                img: IMAGES.chambaMinjar,
                alt: 'Minjar Mela cultural procession in Chamba',
                border: true,
              },
              {
                section: 'culture',
                label: 'Chamba Folk Traditions',
                img: IMAGES.chambaFolk,
                alt: 'Traditional Himachali folk hospitality in Chamba',
                border: false,
              },
            ].map((slice) => (
              <button
                key={slice.section}
                type="button"
                onClick={() => navigate('discover-chamba', { section: slice.section })}
                className="chamba-slice relative overflow-hidden lg:-ml-4 group cursor-pointer text-left"
                aria-label={slice.label}
              >
                <SafeImage
                  src={slice.img}
                  alt={slice.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackTitle={slice.label}
                />
                {slice.border && (
                  <div className="absolute inset-0 border-r-2 border-pure-white/80 pointer-events-none hidden lg:block" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4-CARD ECOSYSTEM SECTION */}
      <section className="max-w-7xl w-full mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <button
            type="button"
            onClick={() => navigate('stays')}
            className="group relative block text-left h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer"
          >
            <SafeImage
              src={IMAGES.stayCedarChalet}
              alt="Featured Stays mountain-view bedroom"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackTitle="Featured Stays"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
              <div>
                <Home className="w-5 h-5 text-antique-gold mb-1" aria-hidden="true" />
                <h3 className="font-headline text-[20px] font-semibold text-pure-white">
                  Featured Stays
                </h3>
                <p className="font-body text-[12px] text-pure-white/85">
                  Stay in comfort, live the view
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-pure-white/60 text-pure-white group-hover:bg-antique-gold group-hover:border-antique-gold group-hover:text-charcoal transition-colors duration-150 shrink-0">
                <ArrowForwardIcon className="w-4 h-4" />
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('explore', { tab: 'packages', section: 'packages' })}
            className="group relative block text-left h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer"
          >
            <SafeImage
              src={IMAGES.ecoJourneys}
              alt="Curated Journeys winding Himalayan highway"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackTitle="Curated Journeys"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
              <div>
                <Route className="w-5 h-5 text-antique-gold mb-1" aria-hidden="true" />
                <h3 className="font-headline text-[20px] font-semibold text-pure-white">
                  Curated Journeys
                </h3>
                <p className="font-body text-[12px] text-pure-white/85">
                  Handpicked itineraries
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-pure-white/60 text-pure-white group-hover:bg-antique-gold group-hover:border-antique-gold group-hover:text-charcoal transition-colors duration-150 shrink-0">
                <ArrowForwardIcon className="w-4 h-4" />
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('discover-chamba', { section: 'experiences' })}
            className="group relative block text-left h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer"
          >
            <SafeImage
              src={IMAGES.ecoExperiences}
              alt="Local Experiences river kayaking in the Himalayas"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackTitle="Local Experiences"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
              <div>
                <Waves className="w-5 h-5 text-antique-gold mb-1" aria-hidden="true" />
                <h3 className="font-headline text-[20px] font-semibold text-pure-white">
                  Local Experiences
                </h3>
                <p className="font-body text-[12px] text-pure-white/85">
                  Feel the local vibes
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-pure-white/60 text-pure-white group-hover:bg-antique-gold group-hover:border-antique-gold group-hover:text-charcoal transition-colors duration-150 shrink-0">
                <ArrowForwardIcon className="w-4 h-4" />
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('trip-planner')}
            className="group relative block text-left h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer bg-gradient-to-br from-[#2B3D3F] via-[#13383E] to-[#062429]"
          >
            {/* Bespoke Topographic Map & Brass Compass Art for Trip Planner */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 400 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M-20 180C40 150 90 190 150 140C210 90 280 130 340 80C380 48 410 60 420 50"
                stroke="#D8A64E"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M-10 220C60 190 130 225 200 175C270 125 320 165 410 110"
                stroke="#FFEED9"
                strokeWidth="0.9"
                opacity="0.55"
              />
              <path
                d="M10 90C90 60 160 110 230 65C300 20 350 55 420 25"
                stroke="#FFEED9"
                strokeWidth="0.9"
                opacity="0.45"
              />
              <circle cx="290" cy="86" r="46" stroke="#D8A64E" strokeWidth="1.5" opacity="0.8" />
              <circle cx="290" cy="86" r="34" stroke="#FFEED9" strokeWidth="0.8" opacity="0.5" />
              <path d="M290 48L297 86L290 124L283 86L290 48Z" fill="#D8A64E" opacity="0.8" />
              <path d="M252 86L290 79L328 86L290 93L252 86Z" fill="#FFEED9" opacity="0.65" />
              <rect
                x="52"
                y="40"
                width="136"
                height="96"
                rx="8"
                stroke="#FFEED9"
                strokeOpacity="0.35"
                fill="#063B42"
                fillOpacity="0.5"
              />
              <line x1="72" y1="64" x2="154" y2="64" stroke="#D8A64E" strokeWidth="2" />
              <line x1="72" y1="84" x2="164" y2="84" stroke="#FFEED9" strokeOpacity="0.45" />
              <line x1="72" y1="102" x2="142" y2="102" stroke="#FFEED9" strokeOpacity="0.45" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-antique-gold mb-1">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                  <Compass className="w-4 h-4 opacity-80" aria-hidden="true" />
                </div>
                <h3 className="font-headline text-[20px] font-semibold text-pure-white">
                  Trip Planner
                </h3>
                <p className="font-body text-[12px] text-pure-white/85">
                  Plan your perfect trip
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-pure-white/60 text-pure-white group-hover:bg-antique-gold group-hover:border-antique-gold group-hover:text-charcoal transition-colors duration-150 shrink-0">
                <ArrowForwardIcon className="w-4 h-4" />
              </span>
            </div>
          </button>
        </div>
      </section>

      <HomeBrandedFooter />
    </div>
  );
};
