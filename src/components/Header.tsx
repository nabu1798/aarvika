import React, { useState } from 'react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  AccountCircleIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
  ShieldCheckIcon,
} from './Icons';
import { BrandMark } from './BrandMark';
import { useAarvika } from '../context/AarvikaContext';

export const SharedHeader: React.FC = () => {
  const { currentPage, routeParams, navigate, user, signOut, itineraryItems } = useAarvika();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPackagesTab = currentPage === 'explore' && routeParams.tab === 'packages';
  const isExploreActive = currentPage === 'explore' && !isPackagesTab;

  const ctaConfig =
    currentPage === 'discover-chamba'
      ? { label: 'Book Chamba Stays', page: 'stays' as const, params: { dest: 'chamba' } }
      : currentPage === 'explore'
      ? { label: 'Build Trip', page: 'trip-planner' as const, params: {} }
      : { label: 'Start Exploring', page: 'explore' as const, params: {} };

  return (
    <header className="bg-deep-teal text-pure-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold rounded-sm shrink-0"
          aria-label="AARVIKA Home"
        >
          <BrandMark compact />
        </button>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => navigate('explore')}
            className={`font-body text-[14px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              isExploreActive
                ? 'text-antique-gold py-1 border-b-2 border-antique-gold'
                : 'text-pure-white hover:text-antique-gold py-1'
            }`}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => navigate('stays')}
            className={`font-body text-[14px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentPage === 'stays'
                ? 'text-antique-gold py-1 border-b-2 border-antique-gold'
                : 'text-pure-white hover:text-antique-gold py-1'
            }`}
          >
            Stays
          </button>
          <button
            type="button"
            onClick={() => navigate('explore', { tab: 'packages', section: 'packages' })}
            className={`font-body text-[14px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              isPackagesTab
                ? 'text-antique-gold py-1 border-b-2 border-antique-gold'
                : 'text-pure-white hover:text-antique-gold py-1'
            }`}
          >
            Packages
          </button>
          <button
            type="button"
            onClick={() => navigate('discover-chamba')}
            className={`font-body text-[14px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentPage === 'discover-chamba'
                ? 'text-antique-gold py-1 border-b-2 border-antique-gold'
                : 'text-pure-white hover:text-antique-gold py-1'
            }`}
          >
            Discover Chamba
          </button>
          <button
            type="button"
            onClick={() => navigate('trip-planner')}
            className={`font-body text-[14px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentPage === 'trip-planner'
                ? 'text-antique-gold py-1 border-b-2 border-antique-gold'
                : 'text-pure-white hover:text-antique-gold py-1'
            }`}
          >
            Plan Your Trip{itineraryItems.length > 0 ? ` (${itineraryItems.length})` : ''}
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="inline-flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('trip-planner')}
                className="inline-flex items-center gap-1.5 font-body text-[14px] font-semibold text-antique-gold hover:text-pure-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <AccountCircleIcon className="w-5 h-5" />
                <span>{user.name}</span>
              </button>
              <button
                type="button"
                onClick={signOut}
                className="font-body text-[12px] text-pure-white/75 hover:text-pure-white underline cursor-pointer whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('sign-in')}
              className="inline-flex items-center gap-1.5 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors cursor-pointer whitespace-nowrap"
            >
              <AccountCircleIcon className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          )}

          {currentPage !== 'trip-planner' && (
            <button
              type="button"
              onClick={() => navigate(ctaConfig.page, ctaConfig.params)}
              className="inline-flex items-center gap-1.5 rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal font-body text-[14px] font-semibold px-6 py-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{ctaConfig.label}</span>
              <ArrowForwardIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-pure-white/30 text-pure-white hover:bg-pure-white/10 cursor-pointer"
        >
          {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-pure-white/15 bg-deep-teal px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('explore');
            }}
            className="block w-full text-left px-3 py-2 rounded-sm text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Explore Destinations
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('stays');
            }}
            className="block w-full text-left px-3 py-2 rounded-sm text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Stays &amp; Homestays
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('explore', { tab: 'packages', section: 'packages' });
            }}
            className="block w-full text-left px-3 py-2 rounded-sm text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Curated Packages
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('discover-chamba');
            }}
            className="block w-full text-left px-3 py-2 rounded-sm text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Discover Chamba
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('trip-planner');
            }}
            className="block w-full text-left px-3 py-2 rounded-sm text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Plan Your Trip ({itineraryItems.length})
          </button>
          <div className="pt-2 border-t border-pure-white/15 flex items-center justify-between gap-2">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  signOut();
                }}
                className="text-pure-white font-body text-[14px] font-semibold px-3 py-2 cursor-pointer"
              >
                {user.name} · Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate('sign-in');
                }}
                className="inline-flex items-center gap-2 text-pure-white font-body text-[14px] font-semibold px-3 py-2 cursor-pointer"
              >
                <AccountCircleIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                navigate(ctaConfig.page, ctaConfig.params);
              }}
              className="rounded-full bg-antique-gold text-charcoal px-4 py-2 font-body text-[14px] font-semibold cursor-pointer"
            >
              {ctaConfig.label}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const HeroOverlayHeader: React.FC = () => {
  const { navigate, user, signOut } = useAarvika();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-30 max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex flex-col items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold rounded-sm cursor-pointer shrink-0"
          aria-label="AARVIKA Home"
        >
          <BrandMark />
        </button>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
          <div className="relative group">
            <button
              type="button"
              onClick={() => navigate('explore')}
              className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 py-2 cursor-pointer whitespace-nowrap"
            >
              <span>Explore</span>
              <ChevronDownIcon className="w-4 h-4 opacity-80" />
            </button>
            <div className="hidden group-hover:block absolute left-0 top-full w-56 rounded-xl bg-pure-white shadow-xl border border-outline-variant/40 py-2 z-50">
              <button
                type="button"
                onClick={() => navigate('explore')}
                className="block w-full text-left px-4 py-2 text-[14px] text-charcoal hover:bg-surface-container-low cursor-pointer"
              >
                All Destinations
              </button>
              <button
                type="button"
                onClick={() => navigate('discover-chamba')}
                className="block w-full text-left px-4 py-2 text-[14px] text-charcoal hover:bg-surface-container-low cursor-pointer"
              >
                Discover Chamba
              </button>
              <button
                type="button"
                onClick={() => navigate('explore', { region: 'himalayas' })}
                className="block w-full text-left px-4 py-2 text-[14px] text-charcoal hover:bg-surface-container-low cursor-pointer"
              >
                Himalayan Retreats
              </button>
              <button
                type="button"
                onClick={() => navigate('explore', { region: 'coastal' })}
                className="block w-full text-left px-4 py-2 text-[14px] text-charcoal hover:bg-surface-container-low cursor-pointer"
              >
                Coastal &amp; Heritage
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('stays')}
            className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 py-2 cursor-pointer whitespace-nowrap"
          >
            <span>Stays</span>
            <ChevronDownIcon className="w-4 h-4 opacity-80" />
          </button>

          <button
            type="button"
            onClick={() => navigate('explore', { tab: 'packages', section: 'packages' })}
            className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 py-2 cursor-pointer whitespace-nowrap"
          >
            <span>Packages</span>
            <ChevronDownIcon className="w-4 h-4 opacity-80" />
          </button>

          <button
            type="button"
            onClick={() => navigate('discover-chamba', { section: 'experiences' })}
            className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 py-2 cursor-pointer whitespace-nowrap"
          >
            <span>Experiences</span>
            <ChevronDownIcon className="w-4 h-4 opacity-80" />
          </button>

          <button
            type="button"
            onClick={() => navigate('trip-planner')}
            className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 py-2 cursor-pointer whitespace-nowrap"
          >
            <span>Plan Your Trip</span>
            <ChevronDownIcon className="w-4 h-4 opacity-80" />
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <span className="h-5 w-px bg-pure-white/30" aria-hidden="true" />
          {user ? (
            <div className="inline-flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('trip-planner')}
                className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-antique-gold hover:text-pure-white transition-colors px-2 py-1.5 cursor-pointer whitespace-nowrap"
              >
                <AccountCircleIcon className="w-5 h-5" />
                <span>{user.name}</span>
              </button>
              <button
                type="button"
                onClick={signOut}
                className="font-body text-[12px] text-pure-white/75 hover:text-pure-white underline cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('sign-in')}
              className="inline-flex items-center gap-1 font-body text-[14px] font-semibold text-pure-white hover:text-antique-gold transition-colors duration-150 px-2 py-1.5 cursor-pointer whitespace-nowrap"
            >
              <AccountCircleIcon className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('explore')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-antique-gold hover:bg-antique-gold-hover text-charcoal px-6 py-2.5 transition-colors duration-150 shadow-md cursor-pointer whitespace-nowrap"
          >
            <span className="font-body text-[14px] font-semibold">Start Exploring</span>
            <ArrowForwardIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-pure-white/30 text-pure-white hover:bg-pure-white/10 cursor-pointer"
        >
          {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mt-4 rounded-2xl bg-deep-teal/95 border border-pure-white/15 p-4 space-y-2 shadow-xl">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('explore');
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Explore Destinations
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('stays');
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Stays &amp; Homestays
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('explore', { tab: 'packages', section: 'packages' });
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Curated Packages
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('discover-chamba');
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Discover Chamba
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate('trip-planner');
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-pure-white hover:bg-primary-container font-body text-[14px] font-semibold cursor-pointer"
          >
            Plan Your Trip
          </button>
          <div className="pt-2 border-t border-pure-white/15 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                navigate('sign-in');
              }}
              className="inline-flex items-center gap-2 text-pure-white font-body text-[14px] font-semibold px-3 py-2 cursor-pointer"
            >
              <AccountCircleIcon className="w-4 h-4" />
              <span>{user ? user.name : 'Sign In'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                navigate('explore');
              }}
              className="rounded-full bg-antique-gold text-charcoal px-4 py-2 font-body text-[14px] font-semibold cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface ContextualHeaderProps {
  mode: 'property' | 'checkout';
  onSaveTrip?: () => void;
  savedToTrip?: boolean;
}

export const ContextualHeader: React.FC<ContextualHeaderProps> = ({
  mode,
  onSaveTrip,
  savedToTrip,
}) => {
  const { navigate } = useAarvika();

  if (mode === 'property') {
    return (
      <header className="bg-deep-teal text-pure-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('stays')}
            className="inline-flex items-center gap-2 text-pure-white hover:text-antique-gold font-body text-[14px] font-semibold cursor-pointer whitespace-nowrap"
          >
            <ArrowBackIcon className="w-5 h-5" />
            <span>Back to Stays</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('home')}
            className="font-headline text-[18px] font-semibold tracking-widest text-pure-white cursor-pointer"
          >
            AARVIKA
          </button>
          <button
            type="button"
            onClick={onSaveTrip || (() => navigate('trip-planner'))}
            className={`rounded-full border px-4 py-1.5 font-body text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              savedToTrip
                ? 'border-antique-gold bg-antique-gold text-charcoal'
                : 'border-pure-white/40 hover:border-antique-gold text-pure-white'
            }`}
          >
            {savedToTrip ? 'Saved to Trip ✓' : 'Save to Trip'}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary text-on-primary sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('property')}
          className="inline-flex items-center gap-2 text-on-primary hover:text-secondary transition-colors duration-150 cursor-pointer whitespace-nowrap"
        >
          <ArrowBackIcon className="w-5 h-5" />
          <span className="font-label text-[14px] font-semibold">Back to Property</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('home')}
          className="font-display text-[20px] font-semibold text-on-primary tracking-wide cursor-pointer"
        >
          AARVIKA
        </button>

        <div className="inline-flex items-center gap-1.5 text-on-primary-container">
          <ShieldCheckIcon className="w-4 h-4 text-secondary" />
          <span className="font-label text-[12px] font-semibold uppercase tracking-[0.8px] hidden sm:inline">
            256-Bit Encrypted Checkout
          </span>
        </div>
      </div>
    </header>
  );
};
