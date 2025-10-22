import React from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SponsorshipPage from './components/SponsorshipPage';
import PastEventsPage from './components/PastEventsPage';
import SpeakersPage from './components/SpeakersPage';
import LoginModal from './components/LoginModal';
import UserProfileModal from './components/UserProfileModal';
import { useInternetIdentity } from 'ic-use-internet-identity';
import { useIsCurrentUserAdmin, useUserProfile } from './hooks/useQueries';
import './index.css';

type Page = 'home' | 'sponsorship' | 'past-events' | 'speakers';

const pageToPath = (p: Page) => (p === 'home' ? '/' : `/${p}`);
const pathToPage = (path: string): Page => {
  if (path === '/' || path === '') return 'home';
  const seg = path.split('?')[0].replace(/^\/+/, '');
  if (seg === 'sponsorship' || seg === 'past-events' || seg === 'speakers') return seg as Page;
  return 'home';
};

function Home() {
  return <div className="p-6">LandingPage</div>;
}
function Sponsorship() {
  return <div className="p-6">SponsorshipPage</div>;
}
function PastEvents() {
  return <div className="p-6">PastEventsPage</div>;
}
function Speakers() {
  return <div className="p-6">SpeakersPage</div>;
}
function NotFound() {
  return <div className="p-6">404 — Not found</div>;
}

export default function App() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showProfileModal, setShowProfileModal] = React.useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin } = useIsCurrentUserAdmin();
  const { data: userProfile } = useUserProfile();

  const location = useLocation();
  const navigate = useNavigate();

  // Derive current page from the URL
  const currentPage = React.useMemo<Page>(
    () => pathToPage(location.pathname),
    [location.pathname]
  );

  const handlePageChange = (p: Page) => {
    navigate(pageToPath(p));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLoginClick={() => setShowLoginModal(true)}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile ?? null}
        isAdmin={isAdmin}
      />

      <main className="flex-1 pt-16">
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/sponsorship" element={<SponsorshipPage />} />
    <Route path="/past-events" element={<PastEventsPage />} />
    <Route path="/speakers" element={<SpeakersPage />} />
    {/* 404 */}
    <Route path="*" element={<div className="p-6">404 — Not found</div>} />
  </Routes>
</main>

      <Footer />

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showProfileModal && (
        <UserProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
}
