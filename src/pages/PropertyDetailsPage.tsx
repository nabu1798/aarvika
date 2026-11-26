import React, { useEffect, useState } from 'react';
import {
  Car,
  Flame,
  Headphones,
  MapPin,
  Mountain,
  Star,
  Utensils,
  Wifi,
} from 'lucide-react';
import { ContextualHeader } from '../components/Header';
import { MinimalFooter } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { computeNights, useAarvika } from '../context/AarvikaContext';
import { STAYS } from '../data/travelData';

function renderAmenityIcon(iconName: string) {
  switch (iconName) {
    case 'wifi':
      return <Wifi className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
    case 'flame':
      return <Flame className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
    case 'utensils':
      return <Utensils className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
    case 'car':
      return <Car className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
    case 'mountain':
      return <Mountain className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
    default:
      return <Headphones className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />;
  }
}

export const PropertyDetailsPage: React.FC = () => {
  const {
    selectedStayId,
    bookingDraft,
    updateBookingDraft,
    navigate,
    addItineraryItem,
    itineraryItems,
    showToast,
  } = useAarvika();

  const stay = STAYS.find((s) => s.id === selectedStayId) || STAYS[0];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(
    stay.rooms.some((r) => r.id === bookingDraft.roomId)
      ? bookingDraft.roomId
      : stay.rooms[0].id
  );
  const [travellerName, setTravellerName] = useState(bookingDraft.guestName);
  const [travellerPhone, setTravellerPhone] = useState(bookingDraft.guestPhone);
  const [checkIn, setCheckIn] = useState(bookingDraft.checkIn);
  const [checkOut, setCheckOut] = useState(bookingDraft.checkOut);
  const [preparedNotice, setPreparedNotice] = useState(false);

  useEffect(() => {
    setActivePhotoIdx(0);
    const matchingRoom =
      stay.rooms.find((r) => r.id === bookingDraft.roomId) || stay.rooms[0];
    setSelectedRoomId(matchingRoom.id);
    setPreparedNotice(false);
  }, [stay.id]);

  const activeRoom = stay.rooms.find((r) => r.id === selectedRoomId) || stay.rooms[0];
  const nights = computeNights(checkIn, checkOut);
  const subtotal = activeRoom.nightlyRate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const isSavedToTrip = itineraryItems.some((item) => item.id === `stay-${stay.id}`);

  const handleSaveToTrip = () => {
    const added = addItineraryItem({
      id: `stay-${stay.id}`,
      label: `Stay: ${stay.name} (${nights} Nights)`,
      category: 'Stay',
      price: subtotal,
    });
    if (added) {
      showToast(`Saved "${stay.name}" to your Trip Planner.`);
    } else {
      navigate('trip-planner');
    }
  };

  const handleContinueToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingDraft({
      stayId: stay.id,
      roomId: activeRoom.id,
      roomName: activeRoom.name,
      nightlyRate: activeRoom.nightlyRate,
      checkIn,
      checkOut,
      guestName: travellerName.trim() || 'Ananya Sharma',
      guestPhone: travellerPhone.trim() || '+91 98765 43210',
    });
    setPreparedNotice(true);
    navigate('checkout');
  };

  const mainPhoto = stay.gallery[activePhotoIdx] || stay.image;
  const sidePhotos = stay.gallery.map((img, idx) => ({ img, idx })).filter((p) => p.idx !== activePhotoIdx);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <ContextualHeader
        mode="property"
        onSaveTrip={handleSaveToTrip}
        savedToTrip={isSavedToTrip}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12">
        {/* Property Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden h-72 md:h-96 shadow-md">
            <SafeImage
              src={mainPhoto}
              alt={`${stay.name} featured view`}
              className="w-full h-full object-cover"
              fallbackTitle={stay.name}
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {sidePhotos.slice(0, 2).map((thumb, idx) => (
              <button
                key={thumb.idx}
                type="button"
                onClick={() => setActivePhotoIdx(thumb.idx)}
                className={`rounded-2xl overflow-hidden shadow-md cursor-pointer group relative ${
                  idx === 0 ? 'h-36 md:h-44' : 'h-36 md:h-48'
                }`}
                aria-label={`View gallery photo ${thumb.idx + 1}`}
              >
                <SafeImage
                  src={thumb.img}
                  alt={`${stay.name} gallery ${thumb.idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackTitle={stay.name}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content + Sticky Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="rounded-full bg-deep-teal text-antique-gold px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[1.2px]">
                  Verified Heritage Stay
                </span>
                <span className="inline-flex items-center gap-1 font-body text-[12px] font-semibold text-charcoal tabular-nums">
                  <Star
                    className="w-4 h-4 text-antique-gold fill-antique-gold"
                    aria-hidden="true"
                  />
                  {stay.rating} · {stay.reviewCount} Verified Reviews
                </span>
              </div>
              <h1 className="font-headline text-[28px] leading-[34px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-charcoal mb-2">
                {stay.name}
              </h1>
              <p className="font-body text-[14px] text-on-surface-variant flex items-center gap-1">
                <MapPin className="w-4 h-4 text-deep-teal shrink-0" aria-hidden="true" />
                <span>{stay.landmarkNote}</span>
              </p>
            </div>

            <p className="font-body text-[16px] leading-[26px] text-charcoal">
              {stay.fullDescription}
            </p>

            {/* Amenities */}
            <div>
              <h2 className="font-headline text-[26px] font-semibold text-charcoal mb-4">
                Property Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stay.amenities.map((amenity) => (
                  <div
                    key={amenity.label}
                    className="bg-pure-white rounded-xl p-4 flex items-center gap-2.5 border border-outline-variant/30"
                  >
                    {renderAmenityIcon(amenity.icon)}
                    <span className="font-body text-[14px]">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Options */}
            <div>
              <h2 className="font-headline text-[26px] font-semibold text-charcoal mb-4">
                Select Room Option
              </h2>
              <div className="space-y-4">
                {stay.rooms.map((room) => {
                  const isSelected = room.id === activeRoom.id;
                  return (
                    <label
                      key={room.id}
                      className={`block bg-pure-white rounded-2xl p-6 cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-2 border-deep-teal'
                          : 'border border-outline-variant hover:border-deep-teal'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="roomOption"
                            value={room.id}
                            checked={isSelected}
                            onChange={() => {
                              setSelectedRoomId(room.id);
                              updateBookingDraft({
                                roomId: room.id,
                                roomName: room.name,
                                nightlyRate: room.nightlyRate,
                              });
                            }}
                            className="text-deep-teal focus:ring-deep-teal w-4 h-4"
                          />
                          <div>
                            <h3 className="font-headline text-[18px] font-semibold text-charcoal">
                              {room.name}
                            </h3>
                            <p className="font-body text-[12px] text-on-surface-variant">
                              {room.details}
                            </p>
                          </div>
                        </div>
                        <span className="font-body text-[18px] text-deep-teal font-bold tabular-nums">
                          ₹{room.nightlyRate.toLocaleString('en-IN')} / night
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Guest Reviews */}
            <div>
              <h2 className="font-headline text-[26px] font-semibold text-charcoal mb-4">
                Guest Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stay.reviews.map((review) => (
                  <div
                    key={review.author}
                    className="bg-pure-white rounded-2xl p-6 border border-outline-variant/30"
                  >
                    <p className="font-body text-[14px] leading-[22px] text-charcoal mb-3">
                      "{review.quote}"
                    </p>
                    <p className="font-body text-[12px] font-semibold text-on-surface-variant">
                      {review.author} · {review.location} · {review.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <aside className="lg:col-span-4 bg-pure-white rounded-2xl p-6 shadow-xl border border-outline-variant/40 sticky top-24">
            <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-outline-variant/30">
              <div>
                <span className="font-headline text-[26px] font-semibold text-deep-teal tabular-nums">
                  ₹{activeRoom.nightlyRate.toLocaleString('en-IN')}
                </span>
                <span className="font-body text-[12px] text-on-surface-variant"> / night</span>
              </div>
              <span className="font-body text-[12px] font-semibold text-success">
                Available
              </span>
            </div>

            <form onSubmit={handleContinueToCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="checkin"
                    className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                  >
                    Check-in
                  </label>
                  <input
                    id="checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant px-2.5 py-2 text-[12px]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout"
                    className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                  >
                    Check-out
                  </label>
                  <input
                    id="checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant px-2.5 py-2 text-[12px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="traveller-name"
                  className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                >
                  Primary Traveller Name
                </label>
                <input
                  id="traveller-name"
                  type="text"
                  required
                  value={travellerName}
                  onChange={(e) => setTravellerName(e.target.value)}
                  placeholder="Ananya Sharma"
                  className="w-full rounded-xl border border-outline-variant px-3 py-2 text-[14px]"
                />
              </div>

              <div>
                <label
                  htmlFor="traveller-phone"
                  className="font-body text-[12px] font-semibold text-charcoal block mb-1"
                >
                  WhatsApp / SMS Updates
                </label>
                <input
                  id="traveller-phone"
                  type="tel"
                  required
                  value={travellerPhone}
                  onChange={(e) => setTravellerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-outline-variant px-3 py-2 text-[14px]"
                />
              </div>

              <div className="bg-surface rounded-xl p-4 space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    {nights} {nights === 1 ? 'Night' : 'Nights'} Stay
                  </span>
                  <span className="font-semibold tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Taxes &amp; Heritage Fee (12%)</span>
                  <span className="font-semibold tabular-nums">
                    ₹{taxes.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/40 text-[14px] font-bold text-deep-teal">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal font-body text-[14px] font-semibold py-3 transition-colors shadow-md cursor-pointer"
              >
                Continue to Payment Stage
              </button>
              <p className="font-body text-[12px] text-on-surface-variant text-center">
                Instant confirmation · Free cancellation up to 48 hours before arrival.
              </p>
            </form>

            {preparedNotice && (
              <div
                className="mt-4 rounded-xl bg-secondary-container p-4 text-on-secondary-container text-[12px]"
                role="status"
              >
                <strong>Booking Request Prepared:</strong> Proceeding to checkout summary.
              </div>
            )}
          </aside>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
};
