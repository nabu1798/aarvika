import React, { useState } from 'react';
import {
  Building2,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  Headphones,
  Lock,
  Mail,
  Phone,
  QrCode,
  Star,
  Utensils,
} from 'lucide-react';
import { ContextualHeader } from '../components/Header';
import { SafeImage } from '../components/SafeImage';
import { computeNights, useAarvika } from '../context/AarvikaContext';
import { STAYS } from '../data/travelData';
import type { ConfirmedBooking } from '../types/travel';

type PaymentTab = 'upi' | 'card' | 'netbanking';

export const BookingCheckoutPage: React.FC = () => {
  const { bookingDraft, updateBookingDraft, confirmBooking, navigate } = useAarvika();

  const stay = STAYS.find((s) => s.id === bookingDraft.stayId) || STAYS[0];
  const nights = computeNights(bookingDraft.checkIn, bookingDraft.checkOut);
  const roomSubtotal = bookingDraft.nightlyRate * nights;
  const taxes = Math.round(roomSubtotal * 0.12);
  const conciergeFee = 2320;
  const grandTotal = roomSubtotal + taxes + conciergeFee;

  const [paymentTab, setPaymentTab] = useState<PaymentTab>('upi');
  const [upiId, setUpiId] = useState('aarav@okicici');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8910');
  const [cardExpiry, setCardExpiry] = useState('08 / 29');
  const [cardCvv, setCardCvv] = useState('842');
  const [bank, setBank] = useState('HDFC Bank');
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const formatDateRange = () => {
    const fmt = (iso: string) => {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };
    return `${fmt(bookingDraft.checkIn)} – ${fmt(bookingDraft.checkOut)} 2026`;
  };

  const handleConfirm = () => {
    if (
      !bookingDraft.guestName.trim() ||
      !bookingDraft.guestEmail.trim() ||
      !bookingDraft.guestPhone.trim()
    ) {
      setFormError('Please complete your full name, email address, and mobile number.');
      return;
    }
    setFormError(null);
    const result = confirmBooking(paymentTab);
    setConfirmed(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <ContextualHeader mode="checkout" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12">
        {/* Page Heading & Step State */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-label text-[12px] font-semibold text-primary uppercase tracking-[0.8px]">
              {stay.location}
            </span>
            <h1 className="font-display text-[32px] leading-[38px] md:text-[44px] md:leading-[50px] tracking-[-0.25px] font-bold text-on-surface text-balance">
              Confirm Your Himalayan Stay
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full self-start md:self-auto">
            <CalendarCheck2 className="w-4 h-4 text-success" aria-hidden="true" />
            <span className="font-body text-[12px] text-on-surface">
              Free cancellation until 12 Nov 2026
            </span>
          </div>
        </div>

        {/* Confirmation Banner */}
        {confirmed && (
          <section
            id="confirmation-panel"
            className="mb-8 bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-success/40 shadow-sm"
            role="status"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-success uppercase tracking-[0.8px]">
                    Booking Confirmed
                  </span>
                  <h2 className="font-headline text-[24px] leading-[30px] font-semibold text-on-surface">
                    Your stay at {confirmed.stayName} is reserved
                  </h2>
                  <p className="font-body text-[14px] text-on-surface-variant">
                    We have sent your itinerary, host contact, and GST invoice to{' '}
                    <strong className="text-on-surface">{confirmed.guestEmail}</strong>.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('trip-planner')}
                      className="rounded-full bg-deep-teal text-pure-white px-4 py-1.5 font-body text-[12px] font-semibold cursor-pointer"
                    >
                      View in Trip Planner
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('explore')}
                      className="rounded-full border border-outline-variant text-charcoal px-4 py-1.5 font-body text-[12px] font-semibold cursor-pointer"
                    >
                      Explore More Destinations
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant/50 shrink-0">
                <span className="font-label text-[11px] font-semibold text-on-surface-variant uppercase tracking-[1.2px]">
                  Booking Reference
                </span>
                <span className="font-mono text-[14px] text-primary font-semibold tracking-wider">
                  {confirmed.reference}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Guest Information */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/50 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-headline text-[20px] font-semibold text-on-surface">
                    Primary Guest Details
                  </h2>
                  <p className="font-body text-[12px] text-on-surface-variant">
                    Required for homestay check-in &amp; Himachal tourism register
                  </p>
                </div>
                <span className="font-label text-[12px] font-semibold text-primary bg-surface-container px-2.5 py-1 rounded-full shrink-0">
                  Step 1 of 2
                </span>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-on-surface">
                    Full name
                  </span>
                  <input
                    type="text"
                    required
                    value={bookingDraft.guestName}
                    onChange={(e) => updateBookingDraft({ guestName: e.target.value })}
                    placeholder="Aarav Sharma"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <span className="font-body text-[12px] text-on-surface-variant">
                    As shown on Aadhaar or Passport
                  </span>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-on-surface">
                    Email address
                  </span>
                  <div className="relative flex items-center">
                    <Mail
                      className="w-4 h-4 absolute left-3.5 text-outline"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      value={bookingDraft.guestEmail}
                      onChange={(e) => updateBookingDraft({ guestEmail: e.target.value })}
                      placeholder="you@example.in"
                      inputMode="email"
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest pl-10 pr-4 py-2.5 font-body text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    Voucher &amp; GST receipt sent here
                  </span>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-on-surface">
                    Mobile number
                  </span>
                  <div className="relative flex items-center">
                    <Phone
                      className="w-4 h-4 absolute left-3.5 text-outline"
                      aria-hidden="true"
                    />
                    <input
                      type="tel"
                      required
                      value={bookingDraft.guestPhone}
                      onChange={(e) => updateBookingDraft({ guestPhone: e.target.value })}
                      placeholder="+91 98160 00000"
                      inputMode="tel"
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest pl-10 pr-4 py-2.5 font-body text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    Host will coordinate arrival on WhatsApp
                  </span>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-on-surface">
                    Estimated arrival
                  </span>
                  <select
                    value={bookingDraft.arrivalTime}
                    onChange={(e) => updateBookingDraft({ arrivalTime: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="13:00-15:00">1:00 PM – 3:00 PM (Standard Check-in)</option>
                    <option value="15:00-18:00">3:00 PM – 6:00 PM</option>
                    <option value="18:00-21:00">
                      6:00 PM – 9:00 PM (Late Mountain Arrival)
                    </option>
                  </select>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    Check-in begins at 1:00 PM IST
                  </span>
                </label>

                <label className="md:col-span-2 flex flex-col gap-1">
                  <span className="font-label text-[12px] font-semibold text-on-surface">
                    Special requests (optional)
                  </span>
                  <textarea
                    rows={2}
                    value={bookingDraft.specialRequests}
                    onChange={(e) => updateBookingDraft({ specialRequests: e.target.value })}
                    placeholder="Vegetarian Himachali Dham dinner on arrival, airport transfer from Pathankot..."
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </label>
              </form>
            </section>

            {/* Step 2: Payment Method */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/50 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-headline text-[20px] font-semibold text-on-surface">
                    Payment Method
                  </h2>
                  <p className="font-body text-[12px] text-on-surface-variant tabular-nums">
                    Choose how you would like to settle ₹{grandTotal.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="font-label text-[12px] font-semibold text-primary bg-surface-container px-2.5 py-1 rounded-full shrink-0">
                  Step 2 of 2
                </span>
              </div>

              <div className="w-full">
                <div
                  role="tablist"
                  aria-label="Payment methods"
                  className="inline-flex flex-wrap rounded-full bg-surface-container p-1 gap-1 mb-6"
                >
                  {(
                    [
                      { id: 'upi', label: 'UPI / QR', Icon: QrCode },
                      { id: 'card', label: 'Credit / Debit Card', Icon: CreditCard },
                      { id: 'netbanking', label: 'NetBanking', Icon: Building2 },
                    ] as const
                  ).map(({ id, label, Icon }) => {
                    const active = paymentTab === id;
                    return (
                      <button
                        key={id}
                        role="tab"
                        type="button"
                        aria-selected={active}
                        onClick={() => setPaymentTab(id)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-[14px] font-semibold transition-colors duration-150 cursor-pointer ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentTab === 'upi' && (
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-[12px] font-semibold text-on-surface">
                        UPI ID
                      </span>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="aarav@okicici"
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </label>
                    <p className="font-body text-[12px] text-on-surface-variant">
                      Supports Google Pay, PhonePe, Paytm, and BHIM UPI with zero convenience fee.
                    </p>
                  </div>
                )}

                {paymentTab === 'card' && (
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="md:col-span-2 flex flex-col gap-1">
                      <span className="font-label text-[12px] font-semibold text-on-surface">
                        Card number
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8910"
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-[12px] font-semibold text-on-surface">
                        Expiry (MM / YY)
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08 / 29"
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-[12px] font-semibold text-on-surface">
                        CVV
                      </span>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-mono text-[13px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </label>
                  </div>
                )}

                {paymentTab === 'netbanking' && (
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="font-label text-[12px] font-semibold text-on-surface">
                        Select bank
                      </span>
                      <select
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>

              {formError && (
                <p className="font-body text-[13px] text-error" role="alert">
                  {formError}
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-body text-[12px] text-on-surface-variant text-pretty">
                  By confirming, you agree to AARVIKA's stay policy and local heritage guidelines.
                </p>
                <button
                  type="button"
                  disabled={Boolean(confirmed)}
                  onClick={handleConfirm}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-on-secondary font-label text-[14px] font-semibold transition-colors duration-150 shrink-0 ${
                    confirmed
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-antique-gold-hover cursor-pointer'
                  }`}
                >
                  {confirmed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Confirmed · {confirmed.reference}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-nums">
                        Pay ₹{grandTotal.toLocaleString('en-IN')} &amp; Confirm
                      </span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* Right Column (5 cols): Sticky Stay & Price Breakdown */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <article className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/50 flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <SafeImage
                  src={stay.image}
                  alt={stay.name}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                  fallbackTitle={stay.name}
                />
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[11px] font-semibold text-primary uppercase tracking-[1.2px]">
                    {stay.typeLabel}
                  </span>
                  <h3 className="font-title text-[18px] font-semibold text-on-surface">
                    {stay.name}
                  </h3>
                  <p className="font-body text-[12px] text-on-surface-variant">
                    {bookingDraft.roomName}
                  </p>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Star
                      className="w-4 h-4 text-secondary fill-secondary"
                      aria-hidden="true"
                    />
                    <span className="font-body text-[12px] tabular-nums">
                      {stay.rating} ({stay.reviewCount} reviews) · {stay.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="flex flex-col gap-0.5">
                  <span className="font-label text-[11px] font-semibold text-on-surface-variant uppercase tracking-[1.2px]">
                    Dates
                  </span>
                  <span className="font-label text-[14px] font-semibold text-on-surface">
                    {formatDateRange()}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-label text-[11px] font-semibold text-on-surface-variant uppercase tracking-[1.2px]">
                    Guests
                  </span>
                  <span className="font-label text-[14px] font-semibold text-on-surface">
                    {bookingDraft.guests} Adults · {nights}{' '}
                    {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-outline-variant/40 pt-4">
                <h4 className="font-title text-[16px] font-semibold text-on-surface mb-1">
                  Price Breakdown
                </h4>

                <div className="flex items-center justify-between">
                  <span className="font-body text-[14px] text-on-surface-variant tabular-nums">
                    ₹{bookingDraft.nightlyRate.toLocaleString('en-IN')} × {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-body text-[14px] text-on-surface tabular-nums">
                    ₹{roomSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-[14px] text-on-surface-variant">
                    Himachal Heritage &amp; GST (12%)
                  </span>
                  <span className="font-body text-[14px] text-on-surface tabular-nums">
                    ₹{taxes.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-[14px] text-on-surface-variant">
                    AARVIKA Concierge &amp; Care
                  </span>
                  <span className="font-body text-[14px] text-on-surface tabular-nums">
                    ₹{conciergeFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/50 pt-4 mt-1">
                  <span className="font-title text-[18px] font-semibold text-on-surface">
                    Total (INR)
                  </span>
                  <span className="font-headline text-[20px] font-semibold text-primary tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-surface-container/60 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface">
                  <Utensils className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
                  <span className="font-body text-[12px]">
                    Complimentary Himachali breakfast daily
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface">
                  <Headphones className="w-4 h-4 text-success shrink-0" aria-hidden="true" />
                  <span className="font-body text-[12px]">
                    24/7 Chamba valley local travel concierge
                  </span>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </main>

      <footer className="bg-primary text-on-primary-container py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]">
          <span>© 2026 AARVIKA Travel Platform · Chamba, Himachal Pradesh</span>
          <span>Need help? +91 1899 224 019</span>
        </div>
      </footer>
    </div>
  );
};
