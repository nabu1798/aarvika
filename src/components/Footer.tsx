import React, { useState } from 'react';
import { BrandMark } from './BrandMark';
import {
  SocialBookmarkIcon,
  SocialCameraIcon,
  SocialGlobeIcon,
  SocialPlayIcon,
} from './Icons';
import { useAarvika } from '../context/AarvikaContext';

export const HomeBrandedFooter: React.FC = () => {
  const { navigate, showToast } = useAarvika();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatusMessage(`Thank you for joining the AARVIKA Travel Community (${trimmed}).`);
    setEmail('');
  };

  return (
    <footer className="relative bg-deep-teal text-pure-white overflow-hidden">
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-28 opacity-15 pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120L0 85L160 40L310 78L480 28L670 82L850 18L1040 72L1220 34L1440 78L1440 120Z"
          fill="#001F24"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-pure-white/15">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="inline-flex flex-col items-center lg:border-r lg:border-pure-white/15 lg:pr-8 cursor-pointer"
            aria-label="AARVIKA Home"
          >
            <BrandMark compact />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-4 flex-1 justify-center w-full">
            <div className="text-center md:text-left">
              <h4 className="font-body text-[16px] font-semibold text-pure-white">
                Join Our Travel Community
              </h4>
              <p className="font-body text-[12px] text-pure-white/75">
                Get inspired. Plan better. Travel more.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center bg-pure-white rounded-full p-1 pl-4 w-full max-w-sm shadow-md"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border-0 bg-transparent text-[14px] text-charcoal placeholder:text-outline focus:outline-none focus:ring-0 py-1.5"
              />
              <button
                type="submit"
                className="rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal font-body text-[14px] font-semibold px-6 py-2 transition-colors duration-150 shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2 lg:border-l lg:border-pure-white/15 lg:pl-8">
            <button
              type="button"
              onClick={() => showToast('AARVIKA Visual Journal on Instagram (@aarvika.travel)')}
              aria-label="AARVIKA on Instagram"
              className="w-9 h-9 rounded-full border border-pure-white/40 hover:border-antique-gold hover:text-antique-gold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <SocialCameraIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => showToast('AARVIKA Himalayan Film Stories on YouTube')}
              aria-label="AARVIKA on YouTube"
              className="w-9 h-9 rounded-full border border-pure-white/40 hover:border-antique-gold hover:text-antique-gold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <SocialPlayIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => showToast('AARVIKA Community Stories')}
              aria-label="AARVIKA Community"
              className="w-9 h-9 rounded-full border border-pure-white/40 hover:border-antique-gold hover:text-antique-gold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <SocialGlobeIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('trip-planner')}
              aria-label="Saved Trips & Wishlists"
              className="w-9 h-9 rounded-full border border-pure-white/40 hover:border-antique-gold hover:text-antique-gold inline-flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <SocialBookmarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {statusMessage && (
          <p className="text-center text-[12px] text-antique-gold pt-3" role="status">
            {statusMessage}
          </p>
        )}

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-pure-white/75">
          <div className="hidden md:block w-32" aria-hidden="true" />
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            <button
              type="button"
              onClick={() => navigate('discover-chamba')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span className="text-pure-white/30">|</span>
            <button
              type="button"
              onClick={() => navigate('explore')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              Destinations
            </button>
            <span className="text-pure-white/30">|</span>
            <button
              type="button"
              onClick={() => navigate('discover-chamba')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              Travel Guides
            </button>
            <span className="text-pure-white/30">|</span>
            <button
              type="button"
              onClick={() => navigate('trip-planner')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              Help
            </button>
            <span className="text-pure-white/30">|</span>
            <button
              type="button"
              onClick={() => navigate('sign-in')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-pure-white/30">|</span>
            <button
              type="button"
              onClick={() => navigate('sign-in')}
              className="hover:text-antique-gold transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </nav>
          <p className="font-body text-[12px] text-pure-white/75">
            © 2026 AARVIKA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const MinimalFooter: React.FC<{ subtitle?: string }> = ({
  subtitle = '© 2026 AARVIKA. All rights reserved.',
}) => {
  const { navigate } = useAarvika();

  return (
    <footer className="bg-deep-teal text-pure-white py-6 border-t border-pure-white/15 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-pure-white/75">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="font-headline text-[16px] font-semibold tracking-[0.16em] text-pure-white cursor-pointer"
        >
          AARVIKA
        </button>
        <p>{subtitle}</p>
      </div>
    </footer>
  );
};
