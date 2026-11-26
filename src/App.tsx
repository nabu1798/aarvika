import React from 'react';
import { AarvikaProvider, useAarvika } from './context/AarvikaContext';
import { HomePage } from './pages/HomePage';
import { ExploreDestinationsPage } from './pages/ExploreDestinationsPage';
import { DiscoverChambaPage } from './pages/DiscoverChambaPage';
import { StaysListingPage } from './pages/StaysListingPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { SignInPage } from './pages/SignInPage';

function AarvikaShell() {
  const { currentPage, toastMessage } = useAarvika();

  const renderPage = () => {
    switch (currentPage) {
      case 'explore':
        return <ExploreDestinationsPage />;
      case 'discover-chamba':
        return <DiscoverChambaPage />;
      case 'stays':
        return <StaysListingPage />;
      case 'property':
        return <PropertyDetailsPage />;
      case 'trip-planner':
        return <TripPlannerPage />;
      case 'checkout':
        return <BookingCheckoutPage />;
      case 'sign-in':
        return <SignInPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {renderPage()}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-deep-teal text-pure-white border border-antique-gold/60 px-5 py-2.5 text-[13px] font-medium shadow-xl"
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AarvikaProvider>
      <AarvikaShell />
    </AarvikaProvider>
  );
}
