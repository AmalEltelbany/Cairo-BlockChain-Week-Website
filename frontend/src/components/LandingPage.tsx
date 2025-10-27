import React, { useState, useEffect } from "react";
import { Users, Zap, Star, X, Calendar, MapPin, ChevronDown } from "lucide-react";
import heroVideo from "../assets/Cairo_blockchain_week_vfx.mp4";
import heroPoster from "../assets/Cairo_blockchain_week_vfx.png";
import Galaxy from "./Galaxy";

// Enhanced GlitchText Component with proper imports
import GlitchText from './GlitchText';

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-8 h-8 text-[#00E3D8]" />
  </div>
);

const SpeakerModal = ({ speaker, onClose }) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up" 
    onClick={onClose}
  >
    <div 
      className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 rounded-2xl border border-slate-700 max-w-3xl w-full shadow-2xl animate-scale-in overflow-hidden" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-gradient-to-r from-[#00E3D8]/10 to-[#C400FF]/10">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {speaker.name}
          </h2>
          <p className="text-[#00E3D8] mt-1">
            {speaker.title} at {speaker.company}
          </p>
        </div>
        <button 
          onClick={onClose} 
          className="text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6">
        <div className="relative group overflow-hidden rounded-lg">
          <img 
            src={speaker.photoUrl} 
            alt={speaker.name} 
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <p className="mt-4 text-slate-300 leading-relaxed">
          Join us to hear insights from {speaker.name} on the future of blockchain technology and its applications in the MENA region.
        </p>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: <Users className="w-8 h-8 text-[#00E3D8]" />,
      title: "Global Network",
      description: "Connect with blockchain leaders, developers, and innovators from across the MENA region and beyond.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#C400FF]" />,
      title: "Cutting-Edge Tech",
      description: "Explore the latest in blockchain, DeFi, NFTs, and Web3 applications shaping our future.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#3C6EFF]" />,
      title: "Premium Experience",
      description: "Enjoy world-class speakers, cultural events, and networking opportunities in Cairo.",
    },
  ];

  const featuredSpeakers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "CTO",
      company: "BlockChain Innovations",
      photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "CEO",
      company: "MENA Crypto Exchange",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      title: "Head of DeFi",
      company: "Global Finance Protocol",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      title: "Research Director",
      company: "Ethereum Foundation",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const sponsors = [
    { id: 1, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Binance_Logo.svg", name: "Binance" },
    { id: 2, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Ethereum_logo_2014.svg", name: "Ethereum" },
    { id: 3, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Solana_logo.svg", name: "Solana" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Global animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.6s ease-out forwards;
          }
          
          .hover-glow:hover {
            filter: drop-shadow(0 0 20px currentColor);
          }
        `}
      </style>

      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.3}
          glowIntensity={0.5}
          saturation={0.9}
          hueShift={220}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Video background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Animated overlays */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]"></div>
          
          {/* Animated particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#00E3D8] rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 max-w-6xl mx-auto">
            <GlitchText
              speed={1.2}
              enableShadows={true}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-white mb-6"
            >
              Cairo Blockchain Week
            </GlitchText>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0"
               style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Where Ancient Wisdom Meets Future Innovation
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up opacity-0"
                 style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-white font-bold shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,227,216,0.6)]">
                <span className="relative z-10">Register Now</span>
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C400FF] to-[#3C6EFF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="px-8 py-4 rounded-xl border-2 border-slate-400 text-white font-semibold hover:border-[#00E3D8] hover:bg-[#00E3D8]/10 backdrop-blur-sm transition-all hover:scale-105">
                View Schedule
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300 animate-fade-in-up opacity-0"
                 style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 hover-glow transition-all">
                <Calendar className="w-5 h-5 text-[#00E3D8]" />
                <span>March 15–17, 2025</span>
              </div>
              <div className="flex items-center gap-2 hover-glow transition-all">
                <MapPin className="w-5 h-5 text-[#C400FF]" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>

          <ScrollIndicator />
        </section>

        {/* HIGHLIGHTS */}
        <section id="section-highlights" className="relative py-24 px-4 bg-[#0B0B0B]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#00E3D8] to-[#C400FF] bg-clip-text text-transparent transition-all duration-1000 ${isVisible['section-highlights'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Why Attend Cairo Blockchain Week?
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl bg-gradient-to-br from-[#101010]/70 to-[#1a1a1a]/50 border border-slate-800 hover:border-[#00E3D8] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,227,216,0.4)] backdrop-blur-md hover:-translate-y-2 ${isVisible['section-highlights'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="mb-6 flex justify-center transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-white group-hover:text-[#00E3D8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPEAKERS */}
        <section id="section-speakers" className="relative py-24 px-4 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#C400FF] to-[#3C6EFF] bg-clip-text text-transparent transition-all duration-1000 ${isVisible['section-speakers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Featured Speakers
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {featuredSpeakers.map((speaker, index) => (
                <div
                  key={speaker.id}
                  className={`group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-[#00E3D8] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,227,216,0.5)] cursor-pointer hover:-translate-y-3 ${isVisible['section-speakers'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      className="w-full h-80 object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E3D8]/20 to-[#C400FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#00E3D8] transition-colors">{speaker.name}</h3>
                    <p className="text-[#00E3D8] text-sm font-semibold">{speaker.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPONSORS */}
        <section id="section-sponsors" className="relative py-24 px-4 bg-[#0B0B0B]/95">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-[#3C6EFF] to-[#00E3D8] bg-clip-text text-transparent transition-all duration-1000 ${isVisible['section-sponsors'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Our Sponsors
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-16">
              {sponsors.map((s, index) => (
                <img
                  key={s.id}
                  src={s.logoUrl}
                  alt={s.name}
                  className={`h-16 opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-500 filter brightness-200 hover:drop-shadow-[0_0_15px_rgba(0,227,216,0.8)] ${isVisible['section-sponsors'] ? 'opacity-60 scale-100' : 'opacity-0 scale-75'}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative py-32 px-6 bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] overflow-hidden">
          {/* Animated background effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to Shape the Future of Blockchain?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join industry leaders, innovators, and visionaries at Cairo Blockchain Week. Secure your spot and be part of the revolution.
            </p>
            <button className="group px-12 py-5 bg-white text-[#0A0A0A] font-bold rounded-xl hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] hover:scale-110 transition-all duration-300 text-lg animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <span className="group-hover:tracking-wider transition-all duration-300">Register Now</span>
            </button>
          </div>
        </section>
      </div>

      {/* SPEAKER MODAL */}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
};

export default LandingPage;