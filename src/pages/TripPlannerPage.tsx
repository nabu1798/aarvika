import React, { useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { SharedHeader } from '../components/Header';
import { MinimalFooter } from '../components/Footer';
import { useAarvika } from '../context/AarvikaContext';
import { TRIP_BUILDER_CATALOG } from '../data/travelData';

export const TripPlannerPage: React.FC = () => {
  const {
    tripDestination,
    setTripDestination,
    tripDates,
    setTripDates,
    itineraryItems,
    addItineraryItem,
    removeItineraryItem,
    tripSavedMessage,
    saveTripToAccount,
    confirmedBookings,
    navigate,
  } = useAarvika();

  const [customTitle, setCustomTitle] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customTitle.trim();
    if (!trimmed) return;
    addItineraryItem({
      id: `custom-${Date.now()}`,
      label: trimmed,
      category: 'Experience',
      price: 0,
    });
    setCustomTitle('');
  };

  const estimatedBudget = itineraryItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <SharedHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-deep-teal block mb-1">
            AARVIKA TRIP PLANNER
          </span>
          <h1 className="font-headline text-[28px] leading-[34px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-charcoal mb-2">
            Design Your Custom Itinerary
          </h1>
          <p className="font-body text-[16px] leading-[26px] text-on-surface-variant">
            Combine stays, local experiences, and supporting mountain transport into one
            organised journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Controls */}
          <section className="lg:col-span-7 bg-pure-white rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="trip-dest"
                  className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                >
                  Destination
                </label>
                <select
                  id="trip-dest"
                  value={tripDestination}
                  onChange={(e) => setTripDestination(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant px-3 py-2.5 text-[14px] bg-pure-white"
                >
                  <option>Chamba &amp; Khajjiar, HP</option>
                  <option>Srinagar &amp; Gulmarg, Kashmir</option>
                  <option>Udaipur &amp; Jodhpur, Rajasthan</option>
                  <option>Munnar &amp; Alleppey, Kerala</option>
                  <option>Fontainhas &amp; South Goa</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="trip-dates"
                  className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                >
                  Travel Dates
                </label>
                <input
                  id="trip-dates"
                  type="text"
                  value={tripDates}
                  onChange={(e) => setTripDates(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant px-3 py-2.5 text-[14px]"
                />
              </div>
            </div>

            <div>
              <h2 className="font-headline text-[20px] font-semibold text-charcoal mb-3">
                Add to Your Itinerary
              </h2>
              <div className="space-y-2.5">
                {TRIP_BUILDER_CATALOG.map((catalogItem) => {
                  const isAdded = itineraryItems.some(
                    (i) => i.id === catalogItem.id || i.label === catalogItem.itineraryLabel
                  );
                  return (
                    <div
                      key={catalogItem.id}
                      className="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface"
                    >
                      <div>
                        <p className="font-body text-[16px] font-semibold text-charcoal">
                          {catalogItem.title}
                        </p>
                        <p className="font-body text-[12px] text-on-surface-variant">
                          {catalogItem.subtitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() =>
                          addItineraryItem({
                            id: catalogItem.id,
                            label: catalogItem.itineraryLabel,
                            category: catalogItem.category,
                            price: catalogItem.price,
                          })
                        }
                        className={`rounded-full px-4 py-1.5 font-body text-[12px] font-semibold transition-colors shrink-0 ${
                          isAdded
                            ? 'bg-deep-teal/60 text-pure-white cursor-default'
                            : 'bg-deep-teal text-pure-white hover:bg-primary-container cursor-pointer'
                        }`}
                      >
                        {isAdded ? 'Added' : 'Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Activity */}
            <form onSubmit={handleAddCustom} className="pt-2 border-t border-outline-variant/30">
              <label
                htmlFor="custom-step"
                className="font-body text-[12px] font-semibold text-charcoal block mb-2"
              >
                Add a custom stop or note
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-step"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g., Sunset chai at Chaugan heritage lawn"
                  className="flex-1 rounded-xl border border-outline-variant px-3 py-2 text-[14px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-full bg-surface-container hover:bg-surface-container-high text-charcoal px-4 py-2 font-body text-[13px] font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Add Note</span>
                </button>
              </div>
            </form>
          </section>

          {/* Planned Trip Summary */}
          <aside className="lg:col-span-5 bg-deep-teal text-pure-white rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-pure-white/15 pb-3">
              <div>
                <h2 className="font-headline text-[20px] font-semibold text-antique-gold">
                  Your Planned Trip
                </h2>
                <p className="font-body text-[12px] text-pure-white/75">
                  {tripDestination} · {tripDates}
                </p>
              </div>
              <span className="font-body text-[12px] text-pure-white/80 tabular-nums">
                {itineraryItems.length} {itineraryItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {itineraryItems.length === 0 ? (
              <div className="bg-primary-container rounded-xl p-4 text-center text-[14px] text-pure-white/80">
                Your itinerary is empty. Add stays, experiences, or transport from the left.
              </div>
            ) : (
              <ul className="space-y-2 text-[14px]">
                {itineraryItems.map((item) => (
                  <li
                    key={item.id}
                    className="bg-primary-container rounded-xl p-3 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2
                        className="w-4 h-4 text-antique-gold shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(item.id)}
                      aria-label={`Remove ${item.label}`}
                      className="text-pure-white/60 hover:text-pure-white p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-pure-white/15 text-[14px]">
              <span className="text-pure-white/80">Estimated Itinerary Value</span>
              <span className="font-headline text-[20px] font-semibold text-antique-gold tabular-nums">
                ₹{estimatedBudget.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={saveTripToAccount}
                className="w-full rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal font-body text-[14px] font-semibold py-3 transition-colors cursor-pointer"
              >
                Save Trip to Account
              </button>
              <button
                type="button"
                onClick={() => navigate('checkout')}
                className="w-full rounded-full border border-pure-white/35 hover:border-antique-gold text-pure-white font-body text-[14px] font-semibold py-2.5 transition-colors cursor-pointer"
              >
                Proceed to Stay Checkout
              </button>
              {tripSavedMessage && (
                <p
                  className="font-body text-[12px] text-antique-gold text-center pt-1"
                  role="status"
                >
                  {tripSavedMessage}
                </p>
              )}
            </div>
          </aside>
        </div>

        {/* Confirmed Bookings History (if any) */}
        {confirmedBookings.length > 0 && (
          <section className="mt-12 bg-pure-white rounded-3xl p-6 border border-outline-variant/40 shadow-sm">
            <h2 className="font-headline text-[22px] font-semibold text-charcoal mb-4">
              Your Confirmed Reservations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {confirmedBookings.map((booking) => (
                <div
                  key={booking.reference}
                  className="rounded-2xl bg-surface-container-low p-4 border border-outline-variant/40 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[12px] font-semibold text-deep-teal">
                      {booking.reference}
                    </span>
                    <h3 className="font-headline text-[18px] font-semibold text-charcoal">
                      {booking.stayName}
                    </h3>
                    <p className="font-body text-[12px] text-on-surface-variant">
                      {booking.roomName} · {booking.nights} Nights · {booking.guestName}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-body text-[16px] font-bold text-deep-teal tabular-nums block">
                      ₹{booking.totalInr.toLocaleString('en-IN')}
                    </span>
                    <span className="font-body text-[11px] font-semibold uppercase text-success">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <MinimalFooter />
    </div>
  );
};
