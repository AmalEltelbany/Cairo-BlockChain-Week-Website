import React, { useEffect, useRef, useState } from "react";
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

// Fuzzy Text Component
const FuzzyText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-ethnocentric text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF]">
      {displayText}
    </span>
  );
};

// Real Gooey Nav Component with fixed positioning
const GooeyNav: React.FC<{
  items: readonly { id: string; label: string }[];
  activeIndex: number;
  onItemClick: (id: string) => void;
}> = ({ items, activeIndex, onItemClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gooey blob animation
    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const targetIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex;
    
    // Get actual button position
    const targetButton = buttonRefs.current[targetIndex];
    if (!targetButton) return;
    
    const buttonRect = targetButton.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const centerX = buttonRect.left - containerRect.left + buttonRect.width / 2;
    const centerY = canvas.height / 2;

    // Initialize particles around active/hovered item
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const distance = 30 + Math.random() * 20;
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        radius: 6 + Math.random() * 6,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions with spring physics
      particles.forEach((p, i) => {
        const angle = (Math.PI * 2 * i) / particles.length;
        const targetDistance = 30 + Math.sin(Date.now() * 0.002 + i) * 10;
        const targetX = centerX + Math.cos(angle) * targetDistance;
        const targetY = centerY + Math.sin(angle) * targetDistance;

        // Spring force
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        p.vx += dx * 0.08;
        p.vy += dy * 0.08;

        // Damping
        p.vx *= 0.8;
        p.vy *= 0.8;

        p.x += p.vx;
        p.y += p.vy;
      });

      // Draw with gooey filter effect
      ctx.filter = 'blur(10px) contrast(25)';
      
      // Draw particles
      particles.forEach(p => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, 'rgba(0, 227, 216, 1)');
        gradient.addColorStop(0.5, 'rgba(196, 0, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(60, 110, 255, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.filter = 'none';

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeIndex, hoveredIndex, items.length]);

  return (
    <div ref={containerRef} className="relative h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative flex h-full items-center gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => onItemClick(item.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            className={`relative px-5 py-2 text-sm font-oswald tracking-wide transition-all duration-300 ${
              activeIndex === index
                ? "text-[#00E3D8] scale-105"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

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

  const activeIndex = navItems.findIndex(item => item.id === currentPage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Fuzzy Text */}
          <Link to="/" className="flex items-center gap-3 relative z-10">
            <img src={cbwLogo} alt="Cairo Blockchain Week" className="h-10 w-10 md:h-12 md:w-12" />
            <FuzzyText text="Cairo Blockchain Week" />
          </Link>

          {/* Desktop Nav with Real Gooey Effect */}
          <nav className="hidden md:block flex-1 max-w-2xl mx-8 h-16">
            <GooeyNav
              items={navItems}
              activeIndex={activeIndex}
              onItemClick={onPageChange}
            />
          </nav>

          {/* User + Mobile */}
          <div className="flex items-center gap-4 relative z-10">
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
          <div className="md:hidden mt-2 bg-[#0A0A0A]/95 border-t border-slate-800 rounded-lg p-4">
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