import React, { useState } from "react";
import { Calendar, MapPin, Users, Zap, Star, Play, X, ArrowRight } from "lucide-react";
import heroVideo from "../assets/Cairo_blockchain_week_vfx.mp4";
import heroPoster from "../assets/Cairo_blockchain_week_vfx.png";

interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  photoUrl: string;
}

interface Sponsor {
  id: number;
  logoUrl: string;
  name: string;
}

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div className="bg-[#0A0A0A] rounded-xl border border-slate-800 max-w-3xl w-full">
      <div className="flex justify-between items-center p-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white font-oswald">{speaker.name}</h2>
          <p className="text-[#00E3D8] font-oswald">
            {speaker.title} at {speaker.company}
          </p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6">
        <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
            poster={speaker.photoUrl}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const highlights = [
    {
      icon: <Users className="w-8 h-8 text-[#00E3D8]" />,
      title: "Global Network",
      description:
        "Connect with blockchain leaders, developers, and innovators from across the MENA region and beyond.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#C400FF]" />,
      title: "Cutting-Edge Tech",
      description:
        "Explore the latest in blockchain, DeFi, NFTs, and Web3 applications shaping our future.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#3C6EFF]" />,
      title: "Premium Experience",
      description:
        "Enjoy world-class speakers, cultural events, and networking opportunities in Cairo.",
    },
  ];

  const featuredSpeakers: Speaker[] = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "CTO",
      company: "BlockChain Innovations",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "CEO",
      company: "MENA Crypto Exchange",
      photoUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      title: "Head of DeFi",
      company: "Global Finance Protocol",
      photoUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      title: "Research Director",
      company: "Ethereum Foundation",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const sponsors: Sponsor[] = [
    { id: 1, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Binance_Logo.svg", name: "Binance" },
    { id: 2, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Ethereum_logo_2014.svg", name: "Ethereum" },
    { id: 3, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Solana_logo.svg", name: "Solana" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-oswald">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center text-center overflow-hidden">
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
        {/* Hieroglyphic Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.08] mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/90" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-ethnocentric bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] bg-clip-text text-transparent animate-[gradientMove_8s_linear_infinite]">
            Cairo Blockchain Week
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 tracking-wide">
            Where Ancient Wisdom Meets Future Innovation
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] font-semibold shadow-lg hover:scale-105 transition-transform">
              Register Now <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
            <button className="border border-slate-600 hover:border-slate-400 text-slate-300 px-8 py-3 rounded-lg font-semibold">
              View Schedule
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-slate-300 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00E3D8]" /> March 15–17, 2025
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C400FF]" /> Cairo, Egypt
            </span>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 bg-[#0B0B0B]/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.06] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Attend Cairo Blockchain Week?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-[#101010]/70 border border-slate-800 hover:border-[#00E3D8] transition-all hover:shadow-[0_0_25px_#00E3D850] backdrop-blur-md"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-center">{item.title}</h3>
                <p className="mt-3 text-slate-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Speakers</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-[#00E3D8] transition-all hover:shadow-[0_0_20px_#00E3D850]"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <img
                  src={speaker.photoUrl}
                  alt={speaker.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 text-left">
                  <h3 className="text-white font-semibold">{speaker.name}</h3>
                  <p className="text-[#00E3D8] text-sm">{speaker.title}</p>
                  <p className="text-slate-400 text-xs">{speaker.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-24 bg-[#0B0B0B]/95">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Sponsors</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {sponsors.map((s) => (
              <img
                key={s.id}
                src={s.logoUrl}
                alt={s.name}
                className="h-12 opacity-70 hover:opacity-100 hover:brightness-125 transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Shape the Future of Blockchain?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join industry leaders, innovators, and visionaries at Cairo Blockchain Week.
            Secure your spot and be part of the blockchain revolution.
          </p>
          <button className="px-10 py-3 bg-white text-[#0A0A0A] font-bold rounded-lg hover:scale-105 transition-transform">
            Register Now
          </button>
        </div>
      </section>

      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
      )}
    </div>
  );
};

export default LandingPage;
