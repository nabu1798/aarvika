import React from 'react';
import { SharedHeader } from '../components/Header';
import { MinimalFooter } from '../components/Footer';
import { ArrowForwardIcon } from '../components/Icons';
import { SafeImage } from '../components/SafeImage';
import { useAarvika } from '../context/AarvikaContext';
import {
  CHAMBA_CULTURAL_PILLARS,
  CHAMBA_EXPERIENCES,
  IMAGES,
} from '../data/travelData';

export const DiscoverChambaPage: React.FC = () => {
  const { navigate, itineraryItems, addItineraryItem, showToast } = useAarvika();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddExperience = (exp: (typeof CHAMBA_EXPERIENCES)[number]) => {
    const added = addItineraryItem({
      id: exp.id,
      label: exp.itineraryLabel,
      category: 'Experience',
      price: exp.price,
    });
    if (added) {
      showToast(`Added "${exp.title}" to your Trip Planner.`);
    } else {
      showToast(`"${exp.title}" is already in your Trip Planner.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <SharedHeader />

      <main className="flex-1">
        {/* Signature Chamba Hero */}
        <section className="relative bg-deep-teal text-pure-white overflow-hidden">
          <SafeImage
            src={IMAGES.heroChamba}
            alt="Chamba Valley and Ravi River"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            fallbackTitle="Chamba Valley"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-teal/95 via-deep-teal/85 to-deep-teal/65" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="max-w-2xl">
              <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-antique-gold block mb-2">
                OUR ROOTS, OUR PRIDE · HIMACHAL PRADESH
              </span>
              <h1 className="font-headline text-[32px] leading-[38px] md:text-[60px] md:leading-[66px] tracking-[-0.5px] font-bold text-pure-white mb-4">
                Discover <span className="text-antique-gold">Chamba</span>
              </h1>
              <p className="font-body text-[16px] leading-[26px] text-pure-white text-pretty mb-6">
                Nestled along the Ravi River between the Dhauladhar and Pir Panjal ranges,
                Chamba is a living museum of 10th-century stone temples, Chamba Rumal
                needlecraft, Minjar Mela festivities, and warm Pahadi hospitality.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('culture')}
                  className="rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal px-6 py-2.5 font-body text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Heritage &amp; Culture
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('experiences')}
                  className="rounded-full border border-pure-white/50 hover:border-antique-gold text-pure-white px-6 py-2.5 font-body text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Local Experiences
                </button>
                <button
                  type="button"
                  onClick={() => navigate('stays', { dest: 'chamba' })}
                  className="rounded-full border border-pure-white/50 hover:border-antique-gold text-pure-white px-6 py-2.5 font-body text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Chamba Homestays
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Cultural Pillars */}
        <section id="culture" className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-deep-teal block mb-1">
              CULTURAL SHOWCASE
            </span>
            <h2 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold text-charcoal">
              Temples, Craft &amp; Living Traditions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHAMBA_CULTURAL_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                id={pillar.id}
                className="bg-pure-white rounded-2xl overflow-hidden shadow-md border border-outline-variant/30"
              >
                <SafeImage
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  className="w-full h-52 object-cover"
                  fallbackTitle={pillar.title}
                />
                <div className="p-4">
                  <h3 className="font-headline text-[20px] font-semibold text-charcoal mb-1">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[22px] text-on-surface-variant">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Local Experiences with Operator Booking */}
        <section id="experiences" className="bg-surface-container py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-deep-teal block mb-1">
                  LOCAL EXPERIENCES
                </span>
                <h2 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold text-charcoal">
                  Book Verified Local Hosts
                </h2>
              </div>
              <p className="font-body text-[12px] text-on-surface-variant">
                Instant host coordination included in your AARVIKA Trip Planner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHAMBA_EXPERIENCES.map((exp) => {
                const isAdded = itineraryItems.some(
                  (item) => item.id === exp.id || item.label === exp.itineraryLabel
                );
                return (
                  <div
                    key={exp.id}
                    className="bg-pure-white rounded-2xl p-6 shadow-md flex flex-col justify-between gap-4"
                  >
                    <div>
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[1.2px] text-deep-teal">
                        {exp.meta}
                      </span>
                      <h3 className="font-headline text-[20px] font-semibold text-charcoal mt-1 mb-2">
                        {exp.title}
                      </h3>
                      <p className="font-body text-[14px] text-on-surface-variant mb-3">
                        {exp.host}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                      <span className="font-body text-[18px] font-semibold text-deep-teal tabular-nums">
                        ₹{exp.price.toLocaleString('en-IN')}{' '}
                        <span className="text-[12px] font-normal text-on-surface-variant">
                          / guest
                        </span>
                      </span>
                      {isAdded ? (
                        <button
                          type="button"
                          onClick={() => navigate('trip-planner')}
                          className="rounded-full bg-deep-teal text-pure-white px-4 py-2 font-body text-[14px] font-semibold cursor-pointer hover:bg-primary-container transition-colors"
                        >
                          View in Trip
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddExperience(exp)}
                          className="rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal px-4 py-2 font-body text-[14px] font-semibold cursor-pointer transition-colors"
                        >
                          Add to Trip
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nearby Destinations */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h2 className="font-headline text-[26px] font-semibold text-charcoal mb-4">
            Nearby Destinations from Chamba
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Khajjiar Meadow', meta: '24 km · 45 mins drive' },
              { title: 'Bharmour Valley', meta: '62 km · Chaurasi Temples' },
              { title: 'Dalhousie Ridge', meta: '48 km · Colonial Pines' },
            ].map((spot) => (
              <button
                key={spot.title}
                type="button"
                onClick={() => navigate('stays', { dest: 'chamba' })}
                className="bg-pure-white rounded-2xl p-4 border border-outline-variant/40 hover:border-deep-teal transition-colors flex items-center justify-between text-left cursor-pointer"
              >
                <div>
                  <h3 className="font-headline text-[18px] font-semibold text-charcoal">
                    {spot.title}
                  </h3>
                  <p className="font-body text-[12px] text-on-surface-variant">{spot.meta}</p>
                </div>
                <ArrowForwardIcon className="w-5 h-5 text-deep-teal shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
};
