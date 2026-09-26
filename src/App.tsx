import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ExperienceCard } from './components/ExperienceCard';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { TailoredRomanceArchitect } from './components/TailoredRomanceArchitect';
import { PlanCustomizerAndDeposit } from './components/PlanCustomizerAndDeposit';
import { BookingConfirmationView } from './components/BookingConfirmationView';
import { ActiveBookingsList } from './components/ActiveBookingsList';
import { BespokeTailoringSection } from './components/BespokeTailoringSection';
import { BespokeInquiryModal } from './components/BespokeInquiryModal';
import { PRE_DESIGNED_EXPERIENCES } from './data/services';
import { BookingConfirmation, OccasionType, PreDesignedExperience, ProposalPlan, BespokeInquiry } from './types';
import { HeartHandshake, Phone, Mail, ShieldCheck, Sparkles, ChevronDown, CheckCircle2, HelpCircle } from 'lucide-react';
import { getDeviceId } from './lib/deviceId';
import { buildWhatsAppLink } from './lib/contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'ai_architect' | 'customizer' | 'my_bookings' | 'confirmation'>('catalog');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | 'all'>('all');
  const [selectedExperienceForModal, setSelectedExperienceForModal] = useState<PreDesignedExperience | null>(null);
  
  // Custom AI plan that can be transferred to the customizer & deposit flow
  const [customPlanForBooking, setCustomPlanForBooking] = useState<ProposalPlan | null>(null);
  
  // Confirmed booking for the voucher view
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  
  // List of saved bookings
  const [allBookings, setAllBookings] = useState<BookingConfirmation[]>([]);

  // List of saved bespoke inquiries
  const [allBespokeInquiries, setAllBespokeInquiries] = useState<BespokeInquiry[]>([]);

  // Bespoke consultation modal state
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);

  // Open FAQ accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Load bookings and bespoke inquiries: try the Supabase-backed server first
  // (source of truth), then fall back to the local offline cache.
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('cherish_bookings');
      if (storedBookings) {
        setAllBookings(JSON.parse(storedBookings));
      }
      const storedBespoke = localStorage.getItem('cherish_bespoke_inquiries');
      if (storedBespoke) {
        setAllBespokeInquiries(JSON.parse(storedBespoke));
      }
    } catch (e) {
      console.error('Failed to load stored state', e);
    }

    const deviceId = getDeviceId();

    fetch(`/api/bookings?deviceId=${encodeURIComponent(deviceId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          setAllBookings(data.bookings);
          localStorage.setItem('cherish_bookings', JSON.stringify(data.bookings));
        }
      })
      .catch((e) => console.error('Failed to fetch bookings from server', e));

    fetch(`/api/bespoke-inquiries?deviceId=${encodeURIComponent(deviceId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setAllBespokeInquiries(data.inquiries);
          localStorage.setItem('cherish_bespoke_inquiries', JSON.stringify(data.inquiries));
        }
      })
      .catch((e) => console.error('Failed to fetch bespoke inquiries from server', e));
  }, []);

  const handleOpenWhatsAppDirect = () => {
    window.open(
      buildWhatsAppLink(
        '27646261102',
        'Hi Cherish Concierge Team! I want something unique tailored for our special romantic moment. Can we chat about creating a custom experience?'
      ),
      '_blank'
    );
  };

  const handleBespokeInquirySubmitted = (inquiry: BespokeInquiry) => {
    setAllBespokeInquiries((prev) => [inquiry, ...prev]);
  };

  const handleSelectExperienceForModal = (exp: PreDesignedExperience) => {
    setSelectedExperienceForModal(exp);
  };

  const handleCustomizeExperience = (exp: PreDesignedExperience) => {
    // Construct a starting plan based on the experience
    const initialPlan: ProposalPlan = {
      conceptTitle: exp.title,
      tagline: exp.tagline,
      overview: exp.fullDescription,
      tailoredScript: {
        stageDirection: 'Pause in front of the styled installation. Look gently into their eyes.',
        whatToSay: exp.sampleScriptSnippet,
        backupWords: 'I love you with all my heart.',
      },
      timeline: [
        { time: 'T - 45 min', step: 'Concierge Staging Check', details: 'Florals, lanterns, and candles fully staged.', whoIsDoingWhat: 'Concierge Lead' },
        { time: 'T - 15 min', step: 'Secret Vendor Standby', details: 'Secret photographer in position with telephoto lens.', whoIsDoingWhat: 'Candid Photographer' },
        { time: 'T + 00 min', step: 'The Arrival & The Reveal', details: 'You lead partner to the spot. Green SMS cue sent.', whoIsDoingWhat: 'You & Partner' },
        { time: 'T + 05 min', step: 'Celebratory Toast', details: 'Chilled champagne uncorked, celebration photos.', whoIsDoingWhat: 'Concierge Captain' },
      ],
      vendorSquad: [
        { role: 'Personal Concierge Lead', serviceDescription: 'Overall director & live SMS timing coordinator', estimatedCost: 'Included', status: 'Assigned' },
        { role: 'Secret Candid Photographer', serviceDescription: 'Telephoto coverage & emotional reaction shots', estimatedCost: 'Included', status: 'Ready' },
      ],
      conciergeAdvice: [
        'Take a few deep breaths before walking up.',
        'Keep the ring box in your inner coat pocket or socks to prevent a bulge.',
        'Speak slowly and look directly at their eyes.',
      ],
      contingencyPlan: 'Covered veranda or luxury indoor suite pre-arranged in case of unexpected rain.',
      occasion: exp.occasion,
      scaleTier: exp.recommendedTier,
    };

    setCustomPlanForBooking(initialPlan);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanGenerated = (plan: ProposalPlan) => {
    setCustomPlanForBooking(plan);
  };

  const handleProceedToBookingWithPlan = (plan: ProposalPlan) => {
    setCustomPlanForBooking(plan);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (booking: BookingConfirmation) => {
    setConfirmedBooking(booking);
    setAllBookings((prev) => [booking, ...prev]);
    setActiveTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExistingBooking = (booking: BookingConfirmation) => {
    setConfirmedBooking(booking);
    setActiveTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter experiences
  const filteredExperiences = selectedOccasion === 'all'
    ? PRE_DESIGNED_EXPERIENCES
    : PRE_DESIGNED_EXPERIENCES.filter((e) => e.occasion === selectedOccasion);

  const FAQS = [
    {
      q: 'I am extremely nervous about asking someone out. How do you help?',
      a: 'That is exactly why Cherish exists! We remove all the awkward stammering and logistics fear. We coordinate a charming, low-pressure moment—such as a custom coffee cup reveal, an artisanal chocolate drop, or an intimate picnic. You even receive a tailored word-for-word script and rehearsal coaching so you know exactly what to say.',
    },
    {
      q: 'How does the deposit system work?',
      a: 'You pay a modest reservation deposit (R450 for Sweet Touch, R1,600 for Enchanted, R4,500 for Cinematic) to lock in your date, assign your Senior Concierge Director, and reserve the vendors. The remaining balance is only charged on the day of the event once you are 100% satisfied.',
    },
    {
      q: 'How does the secret candid photographer hide?',
      a: 'Our photographers use high-end 70-200mm telephoto lenses from 50+ yards away, blending in as casual park-goers, tourists, or birdwatchers. Your partner will have zero clue they are being photographed until after the emotional moment is complete and you point them out for portraits.',
    },
    {
      q: 'What if the weather turns bad on the proposal day?',
      a: 'Every single Cherish booking includes a 100% Weather Contingency Guarantee. Your concierge pre-scouts a sheltered romantic alternative (such as a greenhouse, historic library corner, or private indoor salon) and makes the call with you 4 hours in advance.',
    },
    {
      q: 'Can I customize the proposal script or add our own inside jokes?',
      a: 'Absolutely! Our AI Romance Architect drafts the foundational cue sheet, and your dedicated personal concierge reviews and fine-tunes every single line during your 1-on-1 prep call.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab === 'confirmation' ? 'my_bookings' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingsCount={allBookings.length + allBespokeInquiries.length}
        onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* TAB 1: Experiences Catalog */}
        {activeTab === 'catalog' && (
          <div>
            <HeroBanner
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={setSelectedOccasion}
              onOpenAIArchitect={() => {
                setActiveTab('ai_architect');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCustomizer={() => {
                setActiveTab('customizer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
            />

            {/* Catalog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
                <div>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
                    {selectedOccasion === 'all' ? 'Signature Romance Experiences' : 'Tailored Packages'}
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1">
                    Every package is fully orchestrated: custom scripts, secret vendors, and zero stress for you.
                  </p>
                </div>
                <span className="text-xs font-semibold text-stone-500">
                  Showing {filteredExperiences.length} curated options
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredExperiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    onSelectExperience={handleSelectExperienceForModal}
                    onCustomizeExperience={handleCustomizeExperience}
                  />
                ))}
              </div>

              {/* Want Something Unique? Dedicated Custom Tailoring Section */}
              <BespokeTailoringSection
                onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
                onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
              />

              {/* Stress-Free Reassurance Banner */}
              <div className="mt-16 bg-gradient-to-br from-rose-900 via-rose-950 to-stone-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
                <div className="max-w-2xl relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold uppercase tracking-wider mb-3">
                    The Cherish Concierge Promise
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                    "Hey, are you stressing about asking someone out on a date? Fine, leave it to us."
                  </h3>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                    Whether it's asking a boy or girl out for the very first time, popping the ultimate question, surprising them on graduation day, or gathering the crew for a legendary bachelor party—we take every single logistical burden off your shoulders.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('ai_architect');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold shadow-md transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Design a Custom Plan (AI)</span>
                    </button>
                    <button
                      onClick={() => setIsBespokeModalOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-semibold shadow-md transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Want Something Unique? Talk to Us</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('customizer');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition"
                    >
                      Browse Services & Lock Deposit
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-20 max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-2">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h3 className="font-serif-luxury text-3xl font-bold text-stone-900">
                    Everything You Need to Know
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    Have questions before paying your deposit? We are with you every step.
                  </p>
                </div>

                <div className="space-y-3">
                  {FAQS.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-stone-900 hover:text-rose-700"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180 text-rose-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI Tailored Romance Architect */}
        {activeTab === 'ai_architect' && (
          <TailoredRomanceArchitect
            onPlanGenerated={handlePlanGenerated}
            onProceedToBookingWithPlan={handleProceedToBookingWithPlan}
          />
        )}

        {/* TAB 3: Plan Customizer & Deposit Checkout */}
        {activeTab === 'customizer' && (
          <PlanCustomizerAndDeposit
            initialPlan={customPlanForBooking}
            onBookingSuccess={handleBookingSuccess}
          />
        )}

        {/* TAB 4: Confirmation Voucher View */}
        {activeTab === 'confirmation' && confirmedBooking && (
          <BookingConfirmationView
            booking={confirmedBooking}
            onViewAllBookings={() => {
              setActiveTab('my_bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPlanAnother={() => {
              setCustomPlanForBooking(null);
              setActiveTab('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 5: My Booked Itineraries & Bespoke Inquiries */}
        {activeTab === 'my_bookings' && (
          <ActiveBookingsList
            bookings={allBookings}
            bespokeInquiries={allBespokeInquiries}
            onSelectBooking={handleSelectExistingBooking}
            onNewBookingClick={() => {
              setCustomPlanForBooking(null);
              setActiveTab('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBespokeModal={() => setIsBespokeModalOpen(true)}
          />
        )}
      </main>

      {/* Experience Detail Modal */}
      <ExperienceDetailModal
        experience={selectedExperienceForModal}
        onClose={() => setSelectedExperienceForModal(null)}
        onProceedToBooking={handleCustomizeExperience}
      />

      {/* Bespoke Tailored Consultation Inquiry Modal */}
      <BespokeInquiryModal
        isOpen={isBespokeModalOpen}
        onClose={() => setIsBespokeModalOpen(false)}
        onInquirySubmitted={handleBespokeInquirySubmitted}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="font-serif-luxury text-2xl font-bold text-white">Cherish</span>
                <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-900">
                  Concierge
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
                Your discreet, personal assistance team in South Africa for asking people out, popping wedding proposals, luxury picnics, clue scavenger hunts, flower deliveries, graduation tributes, and bachelor parties.
              </p>
              <a
                href="https://wa.me/27646261102"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-rose-300 hover:text-rose-200 transition w-fit"
              >
                <Phone className="w-4 h-4 text-rose-500" />
                <span>24/7 SA Concierge Line & WhatsApp: +27 64 626 1102</span>
              </a>
              <a
                href="mailto:ckmsaya@gmail.com"
                className="flex items-center gap-2 text-xs text-rose-300 hover:text-rose-200 transition w-fit"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>ckmsaya@gmail.com</span>
              </a>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Romantic Services
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('ask_out'); setActiveTab('catalog'); }}>
                  Asking Someone Out (First Dates)
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('wedding_proposal'); setActiveTab('catalog'); }}>
                  Marriage & Wedding Proposals
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('romantic_picnic'); setActiveTab('catalog'); }}>
                  Bohemian Sunset Luxury Picnics
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('scavenger_hunt'); setActiveTab('catalog'); }}>
                  Story-of-Us City Scavenger Hunts
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('flowers_chocolates'); setActiveTab('catalog'); }}>
                  Flowers & Artisan Chocolates
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Custom & Bespoke
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li className="hover:text-amber-300 text-amber-200 font-semibold cursor-pointer flex items-center gap-1.5" onClick={() => setIsBespokeModalOpen(true)}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Want Something Unique? Talk to Us</span>
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('ai_architect'); }}>
                  AI Tailored Romance Architect
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('customizer'); }}>
                  Deposit & Vendor Lock Flow
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('graduation_surprise'); setActiveTab('catalog'); }}>
                  Graduation Celebrations
                </li>
                <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedOccasion('bachelor_bachelorette'); setActiveTab('catalog'); }}>
                  Bachelor & Bachelorette Parties
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} Cherish Concierge Inc. Installable Progressive Web Application.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Confidential & Discretion Guaranteed
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
