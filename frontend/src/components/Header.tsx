import React from "react";
import { Menu, X, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserProfile } from "../types";
import cbwLogo from "../assets/Cairo_Blockchain_week_logo.svg";

interface HeaderProps {
  currentPage: string;
  onPageChange: (p: "home" | "sponsorship" | "past-events" | "speakers") => void;
  onLoginClick: () => void;
  isAuthenticated: boolean;
  userProfile: UserProfile | null | undefined;
  isAdmin: boolean | undefined;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  onLoginClick,
  isAuthenticated,
  userProfile,
  isAdmin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "speakers", label: "Speakers" },
    { id: "sponsorship", label: "Sponsorship" },
    { id: "past-events", label: "Past Events" },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={cbwLogo} alt="Cairo Blockchain Week" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="font-ethnocentric text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF]">
              CBW 2025
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`relative px-3 py-2 text-sm font-oswald tracking-wide transition-colors duration-300 ${
                  currentPage === item.id
                    ? "text-[#00E3D8]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* User + Mobile */}
          <div className="flex items-center gap-4">
            {/* User Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center text-slate-300 space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-oswald">{userProfile?.name || "User"}</span>
                  {isAdmin && <Shield className="w-4 h-4 text-[#00E3D8]" />}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="relative overflow-hidden px-4 py-2 text-sm font-oswald rounded-md text-white bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] shadow-md hover:scale-105 transition-all"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#0A0A0A]/95 border-t border-slate-800 rounded-lg p-4 animate-slide-up">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md font-oswald text-sm ${
                  currentPage === item.id
                    ? "text-[#00E3D8] bg-slate-800/40"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-800 mt-3 pt-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-4 h-4" />
                  {userProfile?.name}
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-white py-2 rounded-md font-oswald"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
