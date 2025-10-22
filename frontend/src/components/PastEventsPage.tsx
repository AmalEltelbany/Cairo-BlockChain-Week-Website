import React from 'react';
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react';

const PastEventsPage: React.FC = () => {
  const pastEvents = [
    {
      year: 2024,
      title: 'Cairo Blockchain Week 2024',
      date: 'March 18–20, 2024',
      location: 'Four Seasons Hotel Cairo at Nile Plaza',
      attendees: 450,
      description:
        'Our most successful event yet, featuring groundbreaking discussions on DeFi regulation, NFT marketplaces, and the future of Web3 in the MENA region.',
      highlights: [
        'Keynote by Ethereum Foundation representatives',
        'Launch of the MENA Blockchain Alliance',
        '$2M in startup funding announced',
        'Government regulatory framework unveiled',
      ],
    },
    {
      year: 2023,
      title: 'Cairo Blockchain Week 2023',
      date: 'March 15–17, 2023',
      location: 'Conrad Cairo Hotel',
      attendees: 350,
      description:
        'A pivotal year focusing on institutional adoption and the integration of blockchain technology in traditional finance and government services.',
      highlights: [
        'Central Bank of Egypt blockchain initiative',
        'Major banks announce crypto services',
        'Smart city blockchain implementations',
        'Regional developer bootcamp program launch',
      ],
    },
    {
      year: 2022,
      title: 'Cairo Blockchain Week 2022',
      date: 'March 21–23, 2022',
      location: 'Fairmont Nile City',
      attendees: 280,
      description:
        'Our inaugural event that established Cairo as a major blockchain hub in the Middle East, focusing on education and ecosystem building.',
      highlights: [
        'First major blockchain conference in Egypt',
        'Formation of Egyptian Blockchain Association',
        'University blockchain curriculum partnerships',
        'Regional startup accelerator program launch',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-20 px-4 sm:px-6 lg:px-8 relative font-oswald overflow-hidden">
      {/* Hieroglyphic texture overlay */}
      <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.05] pointer-events-none" />

      {/* Gradient header section */}
      <div className="relative text-center mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E3D8]/10 via-[#C400FF]/10 to-[#3C6EFF]/10 blur-3xl" />
        <div className="relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00E3D8]/20 to-[#C400FF]/20 rounded-full text-[#00E3D8] text-sm font-medium mb-6 border border-[#00E3D8]/30 backdrop-blur-md">
            Our Legacy in Blockchain Innovation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,227,216,0.2)]">
            Past Events
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore the journey of Cairo Blockchain Week through the years — from our inaugural
            event to becoming the leading blockchain conference in the MENA region.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-20 max-w-6xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] transform md:-translate-x-0.5 opacity-80" />

        {pastEvents.map((event, index) => (
          <div key={event.year} className="relative mb-16 last:mb-0">
            {/* Glow pulse */}
            <div className="absolute left-2 md:left-1/2 w-4 h-4 bg-[#00E3D8] rounded-full transform md:-translate-x-2 border-4 border-[#0A0A0A] shadow-[0_0_25px_#00E3D880]" />

            <div
              className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:ml-auto md:pl-8'
              }`}
            >
              <div className="bg-[#101010]/70 rounded-xl border border-slate-800 hover:border-[#00E3D8]/60 transition-all duration-300 hover:shadow-[0_0_35px_#00E3D820] backdrop-blur-md overflow-hidden group">
                {/* Header with subtle gradient */}
                <div className="h-48 bg-gradient-to-br from-[#00E3D8]/15 via-[#C400FF]/15 to-[#3C6EFF]/15 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-10" />
                  <div className="text-center relative z-10">
                    <Sparkles className="w-12 h-12 text-[#00E3D8] mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                    <span className="text-4xl font-bold text-white drop-shadow-md">{event.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#00E3D8] to-[#C400FF] bg-clip-text text-transparent">
                      {event.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-slate-300">
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#00E3D8]" />
                      <span className="text-sm">{event.date}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#C400FF]" />
                      <span className="text-sm">{event.location}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#3C6EFF]" />
                      <span className="text-sm">{event.attendees} attendees</span>
                    </span>
                  </div>

                  <p className="text-slate-300 mb-6">{event.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-[#00E3D8] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00E3D8] to-[#C400FF] hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      <span>View Gallery</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="flex items-center justify-center space-x-2 border border-slate-600 hover:border-[#00E3D8] text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      <span>Download Report</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <section className="max-w-6xl mx-auto mb-20 bg-[#101010]/70 rounded-xl p-8 border border-slate-800 hover:border-[#00E3D8] transition-all backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.04] pointer-events-none" />
        <h2 className="text-3xl font-bold text-white text-center mb-8 relative z-10">
          Our Journey in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { icon: TrendingUp, color: '#00E3D8', value: '3', label: 'Years Running' },
            { icon: Users, color: '#C400FF', value: '1,080+', label: 'Total Attendees' },
            { icon: Award, color: '#3C6EFF', value: '150+', label: 'Speakers' },
            { icon: MapPin, color: '#00E3D8', value: '25+', label: 'Countries' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-lg bg-[#0A0A0A]/50 border border-slate-800 hover:border-[#00E3D8]/50 transition-all"
            >
              <stat.icon
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: stat.color }}
              />
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00E3D8] to-[#C400FF] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] rounded-xl p-12 relative z-10 shadow-[0_0_30px_rgba(0,227,216,0.3)]">
        <h2 className="text-3xl font-bold text-white mb-6">Be Part of Our Next Chapter</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join us for <span className="font-semibold">Cairo Blockchain Week 2025</span> and help us
          continue building the future of blockchain technology in the MENA region.
        </p>
        <button className="bg-white hover:scale-105 text-[#0A0A0A] px-8 py-3 rounded-lg font-semibold transition-transform">
          Register for 2025
        </button>
      </section>
    </div>
  );
};

export default PastEventsPage;
