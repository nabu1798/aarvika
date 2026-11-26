import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { SharedHeader } from '../components/Header';
import { MinimalFooter } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { useAarvika } from '../context/AarvikaContext';
import { STAYS } from '../data/travelData';

type StayTypeFilter = 'all' | 'homestay' | 'boutique';

export const StaysListingPage: React.FC = () => {
  const { routeParams, navigate, bookingDraft } = useAarvika();
  const [typeFilter, setTypeFilter] = useState<StayTypeFilter>('all');
  const [destFilter, setDestFilter] = useState<string>(routeParams.dest || 'all');

  useEffect(() => {
    setDestFilter(routeParams.dest || 'all');
  }, [routeParams.dest]);

  const filteredStays = STAYS.filter((stay) => {
    const matchesType = typeFilter === 'all' || stay.type === typeFilter;
    const matchesDest =
      destFilter === 'all' ||
      stay.regionSlug === destFilter ||
      stay.location.toLowerCase().includes(destFilter.toLowerCase());
    return matchesType && matchesDest;
  });

  const formatDateRange = () => {
    const fmt = (iso: string) => {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };
    return `${fmt(bookingDraft.checkIn)} – ${fmt(bookingDraft.checkOut)} 2026`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <SharedHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12">
        {/* Listing Header + Filters */}
        <section className="mb-8">
          <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-deep-teal block mb-1">
            FEATURED ACCOMMODATIONS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline text-[28px] leading-[34px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-charcoal">
                Handpicked Stays &amp; Homestays
              </h1>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">
                {formatDateRange()} · {bookingDraft.guests} Guests · Verified Himalayan &amp;
                Heritage Properties
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'all', label: 'All Types' },
                  { id: 'homestay', label: 'Heritage Homestay' },
                  { id: 'boutique', label: 'Boutique Hotel' },
                ] as const
              ).map((btn) => {
                const active = typeFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setTypeFilter(btn.id)}
                    className={`rounded-full px-4 py-2 font-body text-[14px] font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-deep-teal text-pure-white'
                        : 'bg-pure-white border border-outline-variant text-charcoal hover:border-deep-teal'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Filter Strip */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="font-body text-[12px] font-semibold text-on-surface-variant mr-1">
              Region:
            </span>
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'chamba', label: 'Chamba & Khajjiar' },
              { id: 'kashmir', label: 'Kashmir' },
              { id: 'goa', label: 'Goa' },
              { id: 'rajasthan', label: 'Rajasthan' },
              { id: 'kerala', label: 'Kerala' },
            ].map((reg) => {
              const selected = destFilter === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => setDestFilter(reg.id)}
                  className={`rounded-full px-3 py-1 font-body text-[12px] font-semibold transition-colors cursor-pointer ${
                    selected
                      ? 'bg-antique-gold text-charcoal'
                      : 'bg-surface-container text-on-surface-variant hover:text-charcoal'
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stays Grid */}
        {filteredStays.length === 0 ? (
          <section className="bg-pure-white rounded-2xl p-12 text-center border border-outline-variant/40">
            <h2 className="font-headline text-[22px] font-semibold text-charcoal mb-2">
              No stays match this filter combination
            </h2>
            <p className="font-body text-[14px] text-on-surface-variant mb-6">
              Reset your region or property type filter to explore all verified stays.
            </p>
            <button
              type="button"
              onClick={() => {
                setTypeFilter('all');
                setDestFilter('all');
              }}
              className="rounded-full bg-deep-teal text-pure-white px-6 py-2.5 font-body text-[14px] font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </section>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredStays.map((stay) => (
              <article
                key={stay.id}
                className="bg-pure-white rounded-2xl overflow-hidden shadow-md border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <SafeImage
                      src={stay.image}
                      alt={stay.name}
                      className="w-full h-full object-cover"
                      fallbackTitle={stay.name}
                    />
                    <span
                      className={`absolute top-3 left-3 rounded-full bg-deep-teal px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[1.2px] ${
                        stay.type === 'homestay' ? 'text-antique-gold' : 'text-pure-white'
                      }`}
                    >
                      {stay.typeLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-body text-[12px] text-deep-teal font-semibold">
                        {stay.location}
                      </span>
                      <span className="inline-flex items-center gap-1 font-body text-[12px] font-semibold text-charcoal tabular-nums">
                        <Star
                          className="w-4 h-4 text-antique-gold fill-antique-gold"
                          aria-hidden="true"
                        />
                        {stay.rating} ({stay.reviewCount})
                      </span>
                    </div>
                    <h2 className="font-headline text-[20px] font-semibold text-charcoal mb-2">
                      {stay.name}
                    </h2>
                    <p className="font-body text-[14px] leading-[22px] text-on-surface-variant">
                      {stay.summary}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <span className="font-body text-[18px] text-deep-teal tabular-nums font-bold">
                      ₹{stay.nightlyRate.toLocaleString('en-IN')}
                    </span>
                    <span className="font-body text-[12px] text-on-surface-variant"> / night</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('property', { stayId: stay.id })}
                    className="rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal px-5 py-2 font-body text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    View Property
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <MinimalFooter />
    </div>
  );
};
