import React, { useState } from "react";
import { Mail, Mic, Sparkles } from "lucide-react";

const CONTACT_EMAIL = "Cairoblockchainweek@mercaturaforum.com";

export default function SpeakerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Speaker Application – ${formData.name}`;
    const body = `Dear Cairo Blockchain Week Team,

I would like to apply to speak at Cairo Blockchain Week 2025.

Name: ${formData.name}
Email: ${formData.email}
Topic: ${formData.topic}

Short Bio:
${formData.bio}

Looking forward to your response.

Best regards,
${formData.name}`;

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");

    setFormData({ name: "", email: "", topic: "", bio: "" });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] py-20 px-4 sm:px-6 lg:px-8 font-oswald overflow-hidden">
      {/* Hieroglyphic background */}
      <div className="absolute inset-0 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.04] pointer-events-none" />

      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E3D8]/10 via-[#C400FF]/10 to-[#3C6EFF]/10 blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00E3D8]/20 to-[#C400FF]/20 rounded-full text-[#00E3D8] text-sm font-medium mb-6 border border-[#00E3D8]/30 backdrop-blur-md">
            Speak at Cairo Blockchain Week 2025
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,227,216,0.3)]">
            Apply to Speak
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join a global roster of innovators — share your vision on DeFi,
            RWA tokenization, AI, NFTs, and the future of blockchain.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#101010]/70 backdrop-blur-md border border-slate-800 hover:border-[#00E3D8]/60 transition-all rounded-2xl shadow-[0_0_25px_rgba(0,227,216,0.15)] p-8 space-y-6"
        >
          <div className="flex items-center justify-center mb-4">
            <Mic className="w-10 h-10 text-[#00E3D8]" />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2 text-lg">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Jane Doe"
              required
              className="w-full p-4 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-[#00E3D8] focus:ring-1 focus:ring-[#00E3D8] text-white text-lg transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="jane@example.com"
              required
              className="w-full p-4 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-[#C400FF] focus:ring-1 focus:ring-[#C400FF] text-white text-lg transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2 text-lg">
              Topic of Talk
            </label>
            <input
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              type="text"
              placeholder="Tokenizing Real-World Assets"
              required
              className="w-full p-4 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-[#3C6EFF] focus:ring-1 focus:ring-[#3C6EFF] text-white text-lg transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2 text-lg">
              Short Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about your background, expertise, and experience..."
              rows={5}
              required
              className="w-full p-4 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-[#00E3D8] focus:ring-1 focus:ring-[#00E3D8] text-white text-lg transition-all outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] hover:opacity-90 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(0,227,216,0.3)]"
          >
            Submit Application
          </button>
        </form>

        {/* Contact info */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Mail className="w-4 h-4 text-[#00E3D8]" />
            <span>{CONTACT_EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
