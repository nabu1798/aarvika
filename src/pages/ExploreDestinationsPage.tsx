import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { SharedHeader } from '../components/Header';
import { MinimalFooter } from '../components/Footer';
import { ArrowForwardIcon } from '../components/Icons';
import { SafeImage } from '../components/SafeImage';
import { useAarvika } from '../context/AarvikaContext';
import { DESTINATIONS, HOLIDAY_PACKAGES } from '../data/travelData';

type CategoryFilter = 'all' | 'himalayas' | 'heritage' | 'coastal';

export const ExploreDestinationsPage: React.FC = () => {
  const {
    routeParams,
    navigate,
    addItineraryItem,
    setTripDestination,
    showToast,
  } = useAarvika();

  const initialRegion = (routeParams.region as CategoryFilter) || 'all';
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>(
    ['all', 'himalayas', 'heritage', 'coastal'].includes(initialRegion)
      ? initialRegion
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(routeParams.dest || '');

  useEffect(() => {
    if (
      routeParams.region &&
      ['all', 'himalayas', 'heritage', 'coastal'].includes(routeParams.region)
    ) {
      setActiveFilter(routeParams.region as CategoryFilter);
    }
    if (routeParams.dest !== undefined) {
      setSearchQuery(routeParams.dest);
    }
  }, [routeParams.region, routeParams.dest]);

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesCategory =
      activeFilter === 'all' || d.categories.includes(activeFilter);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.searchKeywords.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handlePlanPackage = (pkg: (typeof HOLIDAY_PACKAGES)[number]) => {
    if (pkg.targetPage === 'discover-chamba') {
      navigate('discover-chamba');
      return;
    }
    setTripDestination(pkg.destinationName);
    addItineraryItem({
      id: pkg.id,
      label: `Package: ${pkg.title} (${pkg.duration})`,
      category: 'Package',
      price: pkg.pricePerPerson,
    });
    showToast(`Added "${pkg.title}" to your Trip Planner.`);
    navigate('trip-planner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <SharedHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12">
        {/* Page Hero Header */}
        <section className="mb-8">
          <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-deep-teal block mb-1">
            DESTINATION DISCOVERY
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline text-[28px] leading-[34px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-charcoal mb-1">
                Explore Destinations &amp; Journeys
              </h1>
              <p className="font-body text-[16px] leading-[26px] text-on-surface-variant max-w-2xl">
                Curated Himalayan valleys, coastal sanctuaries, and heritage circuits with vetted
                stays and local hosts.
              </p>
            </div>

            <div className="w-full md:w-80">
              <label htmlFor="dest-search" className="sr-only">
                Filter destinations
              </label>
              <div className="relative flex items-center">
                <Search
                  className="w-5 h-5 absolute left-3.5 text-deep-teal"
                  aria-hidden="true"
                />
                <input
                  id="dest-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Chamba, Kashmir, Kerala..."
                  className="w-full rounded-full border border-outline-variant bg-pure-white pl-11 pr-4 py-2.5 text-[14px] text-charcoal placeholder:text-outline focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal"
                />
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 mt-6"
            role="group"
            aria-label="Destination categories"
          >
            {(
              [
                { id: 'all', label: 'All Destinations' },
                { id: 'himalayas', label: 'Himalayas' },
                { id: 'heritage', label: 'Heritage & Culture' },
                { id: 'coastal', label: 'Coastal & Nature' },
              ] as const
            ).map((cat) => {
              const active = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`rounded-full px-4 py-2 font-body text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-deep-teal text-pure-white'
                      : 'bg-pure-white border border-outline-variant text-charcoal hover:border-deep-teal'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <section className="bg-pure-white rounded-2xl p-12 text-center border border-outline-variant/40 mb-16">
            <h2 className="font-headline text-[22px] font-semibold text-charcoal mb-2">
              No destinations matched "{searchQuery}"
            </h2>
            <p className="font-body text-[14px] text-on-surface-variant mb-6">
              Try clearing your search or switching back to all destination regions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="rounded-full bg-deep-teal text-pure-white px-6 py-2.5 font-body text-[14px] font-semibold cursor-pointer hover:bg-primary-container transition-colors"
            >
              Show All Destinations
            </button>
          </section>
        ) : (
          <section
            id="destinations-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch"
          >
            {filteredDestinations.map((dest) => (
              <article
                key={dest.id}
                className="bg-pure-white rounded-2xl overflow-hidden shadow-md border border-outline-variant/30 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <SafeImage
                    src={dest.image}
                    alt={dest.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={dest.name}
                  />
                  <span
                    className={`absolute top-3 left-3 rounded-full bg-deep-teal/90 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[1.2px] ${
                      dest.isSignature ? 'text-antique-gold' : 'text-pure-white'
                    }`}
                  >
                    {dest.badge}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="font-headline text-[20px] font-semibold text-charcoal mb-1">
                      {dest.name}
                    </h2>
                    <p className="font-body text-[14px] leading-[22px] text-on-surface-variant mb-3">
                      {dest.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[12px] text-deep-teal font-medium">
                      <span className="bg-surface px-2.5 py-1 rounded-md">
                        {dest.staysCount} Stays
                      </span>
                      <span className="bg-surface px-2.5 py-1 rounded-md">
                        {dest.packagesCount} Packages
                      </span>
                      {dest.experiencesCount && (
                        <span className="bg-surface px-2.5 py-1 rounded-md">
                          {dest.experiencesCount} Experiences
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                    <span className="font-body text-[12px] text-on-surface-variant">
                      From{' '}
                      <strong className="text-charcoal tabular-nums">
                        ₹{dest.startingPrice.toLocaleString('en-IN')}
                      </strong>{' '}
                      / night
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(dest.targetPage, dest.targetParams)}
                      className={`inline-flex items-center gap-1 rounded-full px-4 py-2 font-body text-[14px] font-semibold transition-colors cursor-pointer ${
                        dest.isSignature
                          ? 'bg-antique-gold hover:bg-antique-gold-hover text-charcoal'
                          : 'bg-deep-teal hover:bg-primary-container text-pure-white'
                      }`}
                    >
                      <span>{dest.isSignature ? 'Explore' : 'View Stays'}</span>
                      <ArrowForwardIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Curated Holiday Packages Section */}
        <section id="packages" className="bg-deep-teal text-pure-white rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-antique-gold block mb-1">
                CURATED JOURNEYS
              </span>
              <h2 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold text-pure-white">
                Signature Holiday Packages
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('trip-planner')}
              className="inline-flex items-center gap-2 rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal px-6 py-2.5 font-body text-[14px] font-semibold transition-colors self-start cursor-pointer"
            >
              <span>Customise in Trip Planner</span>
              <ArrowForwardIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOLIDAY_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-primary-container rounded-2xl p-6 border border-pure-white/15 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[1.2px] text-secondary-container">
                    {pkg.duration}
                  </span>
                  <h3 className="font-headline text-[20px] font-semibold text-pure-white mt-1 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[22px] text-pure-white/80">
                    {pkg.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-pure-white/15">
                  <span className="font-body text-[18px] font-semibold text-secondary-container tabular-nums">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}{' '}
                    <span className="text-[12px] font-normal text-pure-white/70">
                      / person
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlanPackage(pkg)}
                    className="font-body text-[14px] font-semibold text-pure-white underline hover:text-secondary-container cursor-pointer"
                  >
                    {pkg.actionLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MinimalFooter subtitle="© 2026 AARVIKA. International standards. Himalayan soul." />
    </div>
  );
};
