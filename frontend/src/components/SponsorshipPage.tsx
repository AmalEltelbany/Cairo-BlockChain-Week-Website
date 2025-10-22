// SponsorshipPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Star,
  Award,
  Check,
  Mail,
  Phone,
  Globe,
  Download,
  Users,
  TrendingUp,
  Network,
  Target,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

const CONTACT_EMAIL = "Cairoblockchainweek@mercaturaforum.com";

/**
 * Animation presets
 */
const containerFade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i } })
};

const cardHover = { scale: 1.03, transition: { duration: 0.25 } };

/**
 * Types
 */
type Tier = {
  name: string;
  icon: React.ReactNode;
  color: string;
  premium?: boolean;
  popular?: boolean;
  exclusive?: boolean;
  startup?: boolean;
  benefits: string[];
  keyBenefits?: string[];
  perfectFor?: string[];
};

type CustomPkg = {
  title: string;
  description: string;
  features: string[];
  color: string;
};

const SponsorshipPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showFAQ, setShowFAQ] = useState<Record<number, boolean>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    tier: '',
    message: ''
  });

  /**
   * Data (kept identical to your original content)
   * Replaced amber gradients / accents with CBCW gradient tokens
   */
  const sponsorshipTiers: Tier[] = [
    {
      name: "Strategic Partnership",
      icon: <Crown className="w-10 h-10 text-[#C400FF]" />,
      color: "from-[#00E3D8] via-[#C400FF] to-[#3C6EFF]",
      premium: true,
      benefits: [
        "Co-branding opportunity with Cairo Blockchain Week",
        "Joint marketing campaigns and press announcements",
        "Exclusive access to attendee insights and analytics",
        "Custom event programming and content creation",
        "Year-round partnership visibility and recognition",
        "First right of refusal for future events",
        "Dedicated account management and premium support",
        "Executive advisory board participation",
        "Exclusive thought leadership content opportunities"
      ],
      keyBenefits: [
        "Brand Visibility: Maximum exposure through co-branding and year-round partnership",
        "Thought Leadership: Custom content creation and advisory board participation",
        "Networking: Exclusive high-level executive access and private events",
        "Market Intelligence: Comprehensive attendee analytics and industry insights",
        "Long-term Partnership: Year-round collaboration and future event priority"
      ],
      perfectFor: [
        "Global Technology Giants (Fortune 500)",
        "Major Financial Institutions and Banks",
        "Government Technology Partners and Agencies",
        "Leading Blockchain Infrastructure Companies",
        "International Consulting Firms"
      ]
    },
    {
      name: "Title Sponsor",
      icon: <Crown className="w-10 h-10 text-[#C400FF]" />,
      color: "from-[#C400FF] via-[#3C6EFF] to-[#00E3D8]",
      exclusive: true,
      benefits: [
        "Event naming rights (Company Name presents Cairo Blockchain Week)",
        "Opening and closing ceremony keynote speaking slots",
        "Exclusive branding on all event materials and digital platforms",
        "Premium 8×6 m booth in the most prominent venue location",
        "VIP hospitality suite for private client meetings",
        "VIP gala dinner invitations + conference passes",
        "Dedicated press conference opportunity with media",
        "Custom networking reception hosting rights",
        "Priority access to speaker green room and VIP areas"
      ],
      keyBenefits: [
        "Brand Visibility: Event naming rights and exclusive branding dominance",
        "Thought Leadership: Opening/closing keynotes and dedicated press opportunities",
        "Networking: VIP hospitality suite and private reception hosting privileges",
        "Exhibition: Premier booth location with maximum visibility and foot traffic",
        "Media Coverage: Dedicated press conferences and comprehensive media package"
      ],
      perfectFor: [
        "Major Cryptocurrency Exchanges",
        "Global Banking and Financial Services Leaders",
        "Leading Technology Corporations",
        "Government Digital Transformation Agencies",
        "Major Blockchain Protocol Foundations"
      ]
    },
    {
      name: "Lead Sponsor",
      icon: <Crown className="w-10 h-10 text-[#00E3D8]" />,
      color: "from-[#00E3D8] via-[#C400FF] to-[#3C6EFF]",
      popular: true,
      benefits: [
        "Keynote/Featured Session on the Main Stage (45 minutes)",
        "Exclusive Brand Mockup installation in the Grand Hall",
        "Full Brand Presence (website, entrance, screens, press materials)",
        "Premium 6×4 m Booth in central high-traffic venue location",
        "Comprehensive Media Coverage + Dedicated Social Announcements",
        "VIP Access: Gala Dinner Invites + Conference Passes",
        "Strategic Partnership Recognition in all communications",
        "Priority panel moderation opportunities"
      ],
      keyBenefits: [
        "Brand Visibility: Logo placement on all event materials and digital platforms",
        "Thought Leadership: Main stage keynote speaking opportunity (45 minutes)",
        "Networking: Exclusive VIP dinner access and premium networking events",
        "Exhibition: Prime booth location with maximum foot traffic flow",
        "Media Coverage: Dedicated press releases and comprehensive social media campaigns"
      ],
      perfectFor: [
        "Cloud Infrastructure & AI Platform Leaders",
        "Enterprise Telecom & Software Innovation Companies",
        "Global Tech Giants Seeking Strategic MENA Visibility",
        "DeFi Protocol Developers",
        "Cybersecurity and Blockchain Security Firms"
      ]
    },
    {
      name: "Platinum Sponsor",
      icon: <Sparkles className="w-10 h-10 text-slate-300" />,
      color: "from-[#3C6EFF] via-[#C400FF] to-[#00E3D8]",
      benefits: [
        "Featured presentation on Main Stage (30 minutes)",
        "Premium 5×4 m booth in high-visibility exhibition area",
        "Logo placement on main event signage and digital displays",
        "Welcome reception co-hosting opportunity with branding",
        "VIP gala invitations + conference passes",
        "Panel moderation opportunity on featured tracks",
        "Branded networking lounge area for client meetings",
        "Social media spotlight campaigns"
      ],
      keyBenefits: [
        "Brand Visibility: Prominent logo placement on key signage and digital displays",
        "Thought Leadership: Main stage presentation and panel moderation opportunities",
        "Networking: Welcome reception co-hosting and branded networking lounge",
        "Exhibition: Premium booth location in high-visibility exhibition area",
        "Marketing: Digital display presence and dedicated social media campaigns"
      ],
      perfectFor: [
        "Enterprise Blockchain Solutions Providers",
        "Financial Technology and Payment Platform Companies",
        "Regional Technology Leaders and Innovation Hubs",
        "Management and Innovation Consulting Firms",
        "Institutional Investment and Trading Platforms"
      ]
    },
    {
      name: "Gold Sponsor",
      icon: <Star className="w-10 h-10 text-[#3C6EFF]" />,
      color: "from-[#00E3D8] via-[#C400FF] to-[#3C6EFF]",
      benefits: [
        "Featured speaker slot on the Law & Arts School Stages",
        "4 × 4 m booth in central high-traffic exhibition zone",
        "Logo placement on main gala screens, entrance gate, event backdrops",
        "Inclusion in press releases and social media campaigns",
        "Featured content in summit newsletter and website",
        "VIP access with gala invitations and conference passes",
        "Participation opportunity in panels on Law & Arts School Stage",
        "Welcome bag branding and promotional material inclusion"
      ],
      keyBenefits: [
        "Brand Visibility: Logo placement on key event materials and digital platforms",
        "Thought Leadership: Featured speaking slots and panel participation opportunities",
        "Networking: VIP gala access and premium networking opportunities",
        "Exhibition: High-traffic booth location in central exhibition area",
        "Marketing: Newsletter inclusion, social media coverage, and welcome bag branding"
      ],
      perfectFor: [
        "Regional Blockchain Solution Providers and Integrators",
        "Enterprise Technology and Software Companies",
        "Fintech, Healthtech, and PropTech Innovation Companies",
        "Professional Services and Technology Consulting Firms",
        "Telecom Business Units and Digital Transformation Teams"
      ]
    },
    {
      name: "Silver Sponsor",
      icon: <Award className="w-10 h-10 text-slate-400" />,
      color: "from-[#B0B0B0] via-[#3C6EFF] to-[#00E3D8]",
      benefits: [
        "Participation opportunity in panels on the Arts School Stage",
        "3 × 3 m professional booth in the exhibition zone",
        "Logo placement on summit website and event backdrops",
        "Dedicated announcement on social media platforms",
        "Featured inclusion in summit newsletter and communications",
        "Gala invitations and full-access conference passes",
        "Networking reception access and industry mixer participation"
      ],
      keyBenefits: [
        "Brand Visibility: Website logo placement and backdrop presence throughout event",
        "Thought Leadership: Panel participation opportunities on specialized tracks",
        "Networking: Gala access and comprehensive networking event participation",
        "Exhibition: Professional booth space in established exhibition area",
        "Marketing: Social media announcements and newsletter feature inclusion"
      ],
      perfectFor: [
        "Mid-sized Technology Firms and Software Companies",
        "Industry-specific Software and Platform Companies",
        "EdTech, LegalTech, and RegTech Solution Providers",
        "Regional Innovation Consultancies and Advisory Firms",
        "Startup Enablers, Accelerators, and Ecosystem Builders"
      ]
    },
    {
      name: "Bronze Sponsor",
      icon: <Award className="w-10 h-10 text-[#3C6EFF]" />,
      color: "from-[#3C6EFF] via-[#C400FF] to-[#00E3D8]",
      benefits: [
        "Participation opportunity in a panel on the Arts School Stage",
        "2 × 2 m booth space in the exhibition zone",
        "Logo placement on summit website and event backdrops",
        "Dedicated announcement on social media platforms",
        "Gala invitation and full-access conference passes",
        "Networking reception access and community engagement"
      ],
      keyBenefits: [
        "Brand Visibility: Website presence and backdrop inclusion throughout venue",
        "Thought Leadership: Panel speaking opportunity on specialized industry tracks",
        "Networking: Gala invitation and comprehensive networking access",
        "Exhibition: Dedicated booth space for product demonstrations",
        "Marketing: Social media recognition and community engagement"
      ],
      perfectFor: [
        "Scaleup Technology Vendors and Solution Providers",
        "SaaS Tools and Platform-as-a-Service Companies",
        "University Incubators and Academic Innovation Centers",
        "Student-focused Blockchain Platforms and Educational Tools",
        "Professional Services Firms and Independent Consultants"
      ]
    },
    {
      name: "Startup Sponsor",
      icon: <Award className="w-10 h-10 text-[#00E3D8]" />,
      color: "from-[#00E3D8] via-[#3C6EFF] to-[#C400FF]",
      startup: true,
      benefits: [
        "Startup pitch competition participation with investor panel",
        "1 × 2 m exhibition table in dedicated startup innovation zone",
        "Logo placement on startup showcase materials and signage",
        "Social media feature in startup spotlight campaign",
        "Full-access conference passes and networking privileges",
        "Dedicated networking session with investors and venture capitalists",
        "Mentorship opportunities with industry leaders"
      ],
      keyBenefits: [
        "Brand Visibility: Startup showcase features and dedicated social media spotlight",
        "Thought Leadership: Pitch competition participation with expert feedback",
        "Networking: Direct access to investors, VCs, and potential strategic partners",
        "Exhibition: Dedicated startup zone presence with high entrepreneur traffic",
        "Growth Opportunity: Exposure to potential clients, partners, and funding sources"
      ],
      perfectFor: [
        "Early-stage Blockchain Startups and Crypto Projects",
        "Cryptocurrency and Digital Asset Development Teams",
        "DeFi Protocol Developers and Smart Contract Innovators",
        "Web3 Application Builders and dApp Developers",
        "Emerging FinTech Companies and Payment Solution Startups"
      ]
    }
  ];

  const customPackages: CustomPkg[] = [
    {
      title: "Workshop Sponsorship",
      description: "Host exclusive technical workshops and masterclasses for industry professionals",
      features: [
        "Dedicated workshop space for 3-hour technical sessions",
        "Professional AV equipment and technical setup support",
        "Workshop materials printing and branded distribution",
        "Attendee registration management and communications",
        "Post-workshop networking session with refreshments",
        "Workshop recording and digital content distribution"
      ],
      color: "from-[#00E3D8] to-[#3C6EFF]"
    },
    {
      title: "Networking Events",
      description: "Sponsor exclusive networking dinners and premium reception experiences",
      features: [
        "Exclusive venue booking at premium Cairo locations",
        "Full catering and premium beverage service",
        "Custom branding throughout venue and materials",
        "VIP guest management and invitation coordination",
        "Professional photography and videography coverage",
        "Transportation arrangements for key attendees"
      ],
      color: "from-[#C400FF] to-[#00E3D8]"
    },
    {
      title: "Digital Presence",
      description: "Maximize your online visibility and social media reach throughout the event",
      features: [
        "Featured content placement on official event website",
        "Dedicated social media campaigns across all platforms",
        "Email newsletter inclusion and feature articles",
        "Live streaming sponsorship and virtual event presence",
        "Digital exhibition space and interactive presentations",
        "Post-event digital content and attendee engagement"
      ],
      color: "from-[#3C6EFF] to-[#C400FF]"
    },
    {
      title: "Innovation Showcase",
      description: "Demonstrate your latest blockchain innovations and technological breakthroughs",
      features: [
        "Dedicated product demonstration stage and presentation time",
        "Interactive exhibition space with hands-on technology displays",
        "Technical presentation opportunity with Q&A sessions",
        "Media interview sessions and press coverage coordination",
        "Innovation award consideration and recognition opportunities",
        "Technology showcase documentation and case study development"
      ],
      color: "from-[#00E3D8] to-[#C400FF]"
    }
  ];

  const sponsorshipBenefits = [
    {
      title: "Government & Academia",
      icon: <Target className="w-8 h-8 text-[#00E3D8]" />,
      description:
        "Connect with Ministers, senior government officials, leading academic figures and blockchain researchers from top universities across the MENA region.",
      stats: "Ministers & Officials",
      highlight: "Direct access to policy makers"
    },
    {
      title: "Global Tech Leaders",
      icon: <TrendingUp className="w-8 h-8 text-[#C400FF]" />,
      description:
        "Network with C-level executives, global tech leaders, and delegates from international bodies shaping the blockchain industry worldwide.",
      stats: "C-Level Executives",
      highlight: "Fortune 500 decision makers"
    },
    {
      title: "Innovation Ecosystem",
      icon: <Network className="w-8 h-8 text-[#3C6EFF]" />,
      description:
        "Engage with VCs, startup founders, ecosystem enablers, and blockchain professionals from leading companies driving innovation.",
      stats: "VCs & Startups",
      highlight: "$2B+ in represented funding"
    },
    {
      title: "Industry Professionals",
      icon: <Users className="w-8 h-8 text-[#00E3D8]" />,
      description:
        "Meet blockchain professionals from leading local and international companies driving technological advancement in the MENA region.",
      stats: "Industry Leaders",
      highlight: "750+ expected attendees"
    }
  ];

  const faqData = [
    {
      question: "What's included in the sponsorship packages?",
      answer:
        "Each package includes booth space, speaking opportunities on Main Stage and Arts & Law School Stages, marketing visibility, networking access, and complimentary passes. Higher tiers include additional premium benefits like VIP gala dinners, custom branding opportunities, and exclusive networking events."
    },
    {
      question: "Can I customize my sponsorship package?",
      answer: `Absolutely! We offer flexible custom packages tailored to your specific marketing objectives and budget. Contact our team at ${CONTACT_EMAIL} to discuss your unique requirements and create a bespoke sponsorship solution.`
    },
    {
      question: "What are the payment terms and options?",
      answer:
        "We accept payment in both USD and EGP with competitive exchange rates. Flexible payment terms are available. Full payment is due 30 days before the event, with a 50% deposit required upon contract signing."
    },
    {
      question: "Who typically attends Cairo Blockchain Week?",
      answer:
        "Attendees include Ministers and senior government officials, leading academic figures and blockchain researchers, C-level executives and global tech leaders, delegates from international bodies, VCs, startup founders, and blockchain professionals from leading companies across the MENA region."
    }
  ];

  /**
   * Handlers (same behavior, preserved)
   */
  const toggleFAQ = (index: number) => {
    setShowFAQ((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTierSelection = (tierName: string) => {
    setSelectedTier(tierName);
    const subject = `Cairo Blockchain Week 2025 - ${tierName} Sponsorship Inquiry`;
    const body = `Dear Cairo Blockchain Week Team,

I am interested in the ${tierName} sponsorship package for Cairo Blockchain Week 2025.

Please provide me with:
- Detailed sponsorship proposal and contract terms
- Payment schedule options and terms
- Additional customization possibilities
- Dedicated account manager contact information

Company Information:
- Name: ${formData.company || '[Please fill]'}
- Contact Person: ${formData.name || '[Please fill]'}
- Email: ${formData.email || '[Please fill]'}
- Industry: [Please specify]

I look forward to discussing this strategic partnership opportunity.

Best regards,
${formData.name || '[Your Name]'}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.open(mailtoLink, '_blank');
  };

  const handleCustomPackageInquiry = (packageTitle: string) => {
    const subject = `Cairo Blockchain Week 2025 - ${packageTitle} Inquiry`;
    const body = `Dear Cairo Blockchain Week Team,

I am interested in the ${packageTitle} for Cairo Blockchain Week 2025.

Please provide me with:
- Detailed package information and specifications
- Customization possibilities
- Available dates and time slots
- Technical requirements and setup details

Company Information:
- Name: ${formData.company || '[Please fill]'}
- Contact Person: ${formData.name || '[Please fill]'}
- Email: ${formData.email || '[Please fill]'}
- Specific Requirements: [Please specify]

Best regards,
${formData.name || '[Your Name]'}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.open(mailtoLink, '_blank');
  };

  const handleDownloadDeck = () => {
    const subject = 'Cairo Blockchain Week 2025 - Sponsorship Deck Request';
    const body = `Dear Cairo Blockchain Week Team,

Please send me the complete sponsorship deck and detailed information package for Cairo Blockchain Week 2025.

Company Information:
- Name: ${formData.company || '[Please fill]'}
- Contact Person: ${formData.name || '[Please fill]'}
- Email: ${formData.email || '[Please fill]'}
- Phone: [Please fill]
- Industry Focus: [Please specify]

Best regards,
${formData.name || '[Your Name]'}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-oswald">
      {/* Textured background overlay (reuses same texture as landing) */}
      <div className="absolute inset-0 -z-10 bg-[url('/textures/hieroglyph-pattern.png')] opacity-[0.04] mix-blend-soft-light pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* HERO */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={containerFade}
          className="text-center mb-16"
        >
          <div className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 bg-gradient-to-r from-[#000000]/30 to-[#ffffff]/2 text-[#00E3D8]">
            Partner with Cairo Blockchain Week
          </div>

          <h1 className="text-5xl md:text-6xl font-ethnocentric bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] bg-clip-text text-transparent animate-[gradientMove_8s_linear_infinite]">
            Sponsorship Opportunities — Cairo Blockchain Week 2025
          </h1>

          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            Reach leaders, decision makers and innovators. Tailored packages for global brands, regional champions, and high-growth startups.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-lg font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] shadow-[0_8px_30px_rgba(0,227,216,0.12)] hover:scale-105 transition-transform"
            >
              Request Sponsor Deck
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 1400, behavior: 'smooth' })}
              className="px-8 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-[#00E3D8] transition-colors"
            >
              Explore Packages
            </button>
          </div>
        </motion.header>

        {/* WHO SHOULD ATTEND / BENEFITS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={containerFade}
            className="text-3xl md:text-4xl font-bold text-center mb-6 font-ethnocentric"
          >
            Who Should Attend
          </motion.h2>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-10">
            Meet Ministers, VCs, enterprise leaders, founders, and researchers shaping the blockchain ecosystem.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {sponsorshipBenefits.map((b, i) => (
              <motion.div
                key={i}
                variants={containerFade}
                custom={i}
                whileHover={cardHover}
                className="p-6 rounded-xl bg-gradient-to-br from-[#0B0B0B]/60 to-[#0A0A0A]/30 border border-slate-800 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(0,227,216,0.06)] transition-all"
              >
                <div className="mb-4 flex items-center justify-between">
                  {b.icon}
                  <span className="text-[#00E3D8] font-medium text-sm bg-white/2 px-3 py-1 rounded-full">{b.stats}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{b.description}</p>
                <div className="text-amber-400 text-sm text-[#C400FF] font-medium">{b.highlight}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SPONSORSHIP TIERS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={containerFade} className="text-3xl md:text-4xl font-bold text-center mb-6 font-ethnocentric">
            Sponsorship Packages
          </motion.h2>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-10">
            Select the tier that matches your goals — from strategic, title-level partnerships to startup showcases.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={containerFade}
                custom={index}
                whileHover={cardHover}
                className={`relative rounded-xl overflow-hidden border border-slate-700 bg-gradient-to-br from-[#0B0B0B]/40 to-[#0A0A0A]/20`}
              >
                {/* Decorative badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E3D8] to-[#3C6EFF] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                    Most Popular
                  </div>
                )}
                {tier.premium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C400FF] to-[#00E3D8] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                    Premium
                  </div>
                )}
                {tier.exclusive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#3C6EFF] to-[#00E3D8] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                    Exclusive
                  </div>
                )}
                {tier.startup && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E3D8] to-[#3C6EFF] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                    Startup Special
                  </div>
                )}

                {/* Header with gradient */}
                <div className={`p-8 text-center bg-gradient-to-r ${tier.color}`}>
                  <div className="mb-4 flex justify-center">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                  <div className="text-sm text-white/90">Investment details on request</div>
                </div>

                {/* Body */}
                <div className="p-8">
                  {/* Key benefits */}
                  {tier.keyBenefits && (
                    <div className="mb-6">
                      <h4 className="text-[#00E3D8] font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {tier.keyBenefits.map((kb, idx) => {
                          const [label, detail] = kb.split(':');
                          return (
                            <li key={idx}>
                              <span className="font-medium text-white/90">{label}:</span>
                              <span className="ml-1 text-slate-300">{detail}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Benefits list */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00E3D8]" />
                      Package Includes
                    </h4>
                    <ul className="space-y-3">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#3C6EFF]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Perfect for */}
                  {tier.perfectFor && (
                    <div className="mb-6">
                      <h4 className="text-[#C400FF] font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Perfect for
                      </h4>
                      <ul className="text-slate-300 text-sm space-y-2">
                        {tier.perfectFor.map((p, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 text-[#00E3D8]">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => handleTierSelection(tier.name)}
                    className={`w-full py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 ${
                      tier.popular || tier.premium || tier.exclusive || tier.startup
                        ? 'bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-[#0A0A0A] shadow-lg'
                        : 'bg-white/8 text-white'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CUSTOM PACKAGES */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={containerFade} className="p-8">
              <h3 className="text-2xl font-bold mb-4 font-ethnocentric">Custom Sponsorship Packages</h3>
              <p className="text-slate-300 mb-6">
                Looking for specific exposure? Custom packages let you design unique experiences: workshops, VIP dinners, digital activations and more.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li>Tailor-made packages to match your marketing goals</li>
                <li>Flexible slot booking for sessions, dinners & exhibitions</li>
                <li>Full technical & production support for bespoke activations</li>
              </ul>
              <div className="mt-6">
                <button onClick={() => window.scrollTo({ top: 2200, behavior: 'smooth' })} className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-[#0A0A0A] font-semibold">
                  Contact our Team
                </button>
              </div>
            </motion.div>

            <motion.div variants={containerFade} className="grid grid-cols-1 gap-4">
              {customPackages.map((p, i) => (
                <motion.div key={i} whileHover={cardHover} className={`p-6 rounded-xl bg-gradient-to-br ${p.color} text-white`}>
                  <h4 className="text-lg font-semibold mb-2">{p.title}</h4>
                  <p className="text-sm mb-4">{p.description}</p>
                  <ul className="text-sm space-y-2 mb-4">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleCustomPackageInquiry(p.title)} className="mt-2 inline-block px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm">
                    Get Details
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={containerFade} className="text-3xl md:text-4xl font-bold text-center mb-6 font-ethnocentric">What Our Sponsors Say</motion.h2>
          <p className="text-center text-slate-300 mb-8">Hear directly from partners who experienced exceptional ROI and networking.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Ahmed Hassan",
                title: "Director, Blockchain Research Center",
                quote:
                  "Cairo Blockchain Week provided an exceptional platform to connect academic research with industry innovation. The quality of attendees and discussions exceeded our expectations significantly.",
                tier: "Academic Partner 2024",
                company: "Cairo University"
              },
              {
                name: "Sarah Al-Masri",
                title: "Regional Director, TechVentures MENA",
                quote:
                  "As a Gold Sponsor, we gained unprecedented access to government officials and tech leaders. The ROI exceeded our projections, and we secured three major partnerships directly from the event.",
                tier: "Gold Sponsor 2024",
                company: "TechVentures MENA"
              },
              {
                name: "Michael Chen",
                title: "VP of Strategic Partnerships",
                quote:
                  "The startup showcase was incredible. We discovered several promising projects and made strategic investments. The networking quality was world-class.",
                tier: "Lead Sponsor 2024",
                company: "Blockchain Capital"
              }
            ].map((t, i) => (
              <motion.div key={i} variants={containerFade} custom={i} className="p-6 rounded-xl bg-[#0B0B0B]/60 border border-slate-800">
                <p className="text-slate-300 text-lg italic mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-slate-400 text-sm">{t.title}</p>
                    <p className="text-[#00E3D8] text-sm font-medium">{t.company}</p>
                  </div>
                  <span className="text-[#3C6EFF] text-sm font-medium bg-white/2 px-3 py-1 rounded-full">
                    {t.tier}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={containerFade} className="text-3xl md:text-4xl font-bold text-center mb-6 font-ethnocentric">Frequently Asked Questions</motion.h2>
          <p className="text-center text-slate-300 mb-8">Everything you need to know before partnering with us.</p>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div key={index} variants={containerFade} className="rounded-xl border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#0B0B0B]/50 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {showFAQ[index] ? <ChevronUp className="w-6 h-6 text-[#00E3D8]" /> : <ChevronDown className="w-6 h-6 text-[#00E3D8]" />}
                </button>

                {showFAQ[index] && (
                  <div className="px-6 pb-6 bg-[#0A0A0A]/60">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT FORM */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 bg-gradient-to-br from-[#0B0B0B]/40 to-[#0A0A0A]/20 rounded-2xl p-8 border border-slate-800">
          <motion.h2 variants={containerFade} className="text-3xl md:text-4xl font-bold text-center mb-4 font-ethnocentric">Get In Touch</motion.h2>
          <p className="text-center text-slate-300 mb-8">Ready to become a sponsor? Fill out the form below and we'll get back to you within 24 hours.</p>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#0B0B0B] border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#00E3D8]/30"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#0B0B0B] border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#C400FF]/30"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-medium mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#0B0B0B] border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-[#3C6EFF]/30"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Interested Tier</label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#0B0B0B] border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Select a tier</option>
                  <option value="strategic">Strategic Partnership</option>
                  <option value="title">Title Sponsor</option>
                  <option value="lead">Lead Sponsor</option>
                  <option value="platinum">Platinum Sponsor</option>
                  <option value="gold">Gold Sponsor</option>
                  <option value="silver">Silver Sponsor</option>
                  <option value="bronze">Bronze Sponsor</option>
                  <option value="startup">Startup Sponsor</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-3 bg-[#0B0B0B] border border-slate-700 rounded-lg text-white"
                placeholder="Tell us about your sponsorship goals and requirements..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  const subject = 'Cairo Blockchain Week 2025 - General Sponsorship Inquiry';
                  const body = `Dear Cairo Blockchain Week Team,

I am interested in sponsorship opportunities for Cairo Blockchain Week 2025.

Company Information:
- Name: ${formData.company || '[Please fill]'}
- Contact Person: ${formData.name || '[Please fill]'}
- Email: ${formData.email || '[Please fill]'}
- Interested Tier: ${formData.tier || 'To be discussed'}

Message:
${formData.message || 'Please contact me to discuss sponsorship opportunities.'}

I look forward to hearing from you.

Best regards,
${formData.name || '[Your Name]'}`;

                  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    body
                  )}`;
                  window.open(mailtoLink, '_blank');

                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    tier: '',
                    message: ''
                  });
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] text-[#0A0A0A] font-semibold"
              >
                Send Inquiry
              </button>

              <button onClick={handleDownloadDeck} className="w-full py-3 rounded-lg border border-slate-700 text-white">
                <Download className="inline w-4 h-4 mr-2" />
                Request Full Deck
              </button>
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(90deg, #00E3D8 0%, #C400FF 50%, #3C6EFF 100%)" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-ethnocentric">Ready to Partner With Us?</h2>
          <p className="text-[#0A0A0A] max-w-3xl mx-auto mb-6">Contact our sponsorship team to design a partnership that delivers exposure, connections and impact.</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-white text-[#0A0A0A] font-semibold shadow-lg">
              <Mail className="w-5 h-5" />
              Email Us
            </a>
            <a href="tel:+20100001100" className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-white/90 text-[#0A0A0A] font-semibold shadow-lg">
              <Phone className="w-5 h-5" />
              +20 100001100
            </a>
            <button onClick={handleDownloadDeck} className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-[#0A0A0A]/10 text-white border border-white/10">
              <Download className="w-5 h-5" />
              Download Sponsorship Deck
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SponsorshipPage;
