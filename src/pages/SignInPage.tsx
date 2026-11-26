import React, { useState } from 'react';
import { ArrowBackIcon } from '../components/Icons';
import { useAarvika } from '../context/AarvikaContext';

export const SignInPage: React.FC = () => {
  const { navigate, signIn } = useAarvika();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim() || 'ananya@aarvika.com';
    const rawName = cleanEmail.split('@')[0] || 'Traveller';
    const formattedName =
      rawName.charAt(0).toUpperCase() + rawName.slice(1).replace(/[._-]/g, ' ');
    signIn(formattedName, cleanEmail);
    setStatusMessage('Signed in successfully. Opening your Trip Planner...');
    window.setTimeout(() => {
      navigate('trip-planner');
    }, 650);
  };

  return (
    <div className="bg-deep-teal text-pure-white font-body min-h-screen flex flex-col justify-between p-4 md:p-8">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-pure-white hover:text-antique-gold font-body text-[14px] font-semibold cursor-pointer"
        >
          <ArrowBackIcon className="w-5 h-5" />
          <span>Back to AARVIKA</span>
        </button>
      </div>

      <main className="max-w-md w-full mx-auto my-8 bg-surface text-on-surface rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <svg
            className="w-20 h-6 mx-auto mb-1"
            viewBox="0 0 120 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 32L38 14L50 22L66 4L84 21L94 15L112 32H88L66 13L48 27L38 20L20 32H10Z"
              fill="#D8A64E"
            />
          </svg>
          <h1 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold text-deep-teal">
            Welcome to AARVIKA
          </h1>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Sign in to manage bookings, saved trips, and wishlists.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signin-email"
              className="font-body text-[12px] font-semibold text-charcoal block mb-1"
            >
              Email address
            </label>
            <input
              id="signin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ananya@aarvika.com"
              className="w-full rounded-xl border border-outline-variant bg-pure-white px-4 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <div>
            <label
              htmlFor="signin-password"
              className="font-body text-[12px] font-semibold text-charcoal block mb-1"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-outline-variant bg-pure-white px-4 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal font-body text-[14px] font-semibold py-3 transition-colors shadow-sm cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {statusMessage && (
          <div
            className="mt-4 rounded-xl bg-secondary-container p-4 text-on-secondary-container text-[12px] text-center"
            role="status"
          >
            {statusMessage}
          </div>
        )}

        <p className="font-body text-[12px] text-on-surface-variant text-center mt-6">
          New to AARVIKA?{' '}
          <button
            type="button"
            onClick={() => navigate('trip-planner')}
            className="text-deep-teal font-semibold underline cursor-pointer"
          >
            Start planning as guest
          </button>
        </p>
      </main>

      <footer className="text-center text-[12px] text-pure-white/70">
        © 2026 AARVIKA · Travel · Explore · Experience
      </footer>
    </div>
  );
};
