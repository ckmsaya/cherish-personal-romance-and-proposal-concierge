import React from 'react';
import { Sparkles, Heart, ShieldCheck, ArrowRight, MessageSquare, Lock, Clock } from 'lucide-react';
import { OccasionType } from '../types';
import { buildWhatsAppLink, CONCIERGE_PHONE } from '../lib/contact';

interface HeroBannerProps {
  selectedOccasion: OccasionType | 'all';
  setSelectedOccasion: (occ: OccasionType | 'all') => void;
  onOpenAIArchitect: () => void;
  onOpenCustomizer: () => void;
  onOpenBespokeModal: () => void;
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&auto=format&fit=crop&q=80';
const HERO_IMAGE_SMALL = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedOccasion,
  setSelectedOccasion,
  onOpenAIArchitect,
  onOpenCustomizer,
  onOpenBespokeModal,
}) => {
  const filterTabs: { id: OccasionType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Experiences' },
    { id: 'ask_out', label: 'Ask Someone Out' },
    { id: 'wedding_proposal', label: 'Wedding Proposals' },
    { id: 'romantic_picnic', label: 'Luxury Picnics' },
    { id: 'scavenger_hunt', label: 'Scavenger Hunts' },
    { id: 'flowers_chocolates', label: 'Flowers & Chocolates' },
    { id: 'graduation_surprise', label: 'Graduation Surprises' },
    { id: 'bachelor_bachelorette', label: 'Bachelor Parties' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-stone-50 to-white pt-8 sm:pt-14 pb-10 sm:pb-16 border-b border-stone-200/70">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs sm:text-sm font-semibold mb-5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Proposals, dates & surprises across South Africa</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.05] mb-5">
              You bring the ring.
              <span className="block text-rose-700 italic">We handle everything else.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Cherish plans and runs your proposal, first-date ask, luxury picnic or surprise from start to finish: venue, styling, flowers, a hidden photographer and a script for what to say. Cape Town, the Winelands, Johannesburg, Pretoria and Durban.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
              <button
                id="hero-customizer-btn"
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-semibold shadow-md shadow-rose-200 hover:from-rose-700 hover:to-pink-700 active:scale-98 transition"
              >
                <Heart className="w-4 h-4" />
                <span>Plan My Surprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={buildWhatsAppLink(CONCIERGE_PHONE, "Hi Cherish! I'm planning a surprise and would love some help.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-stone-900 border border-stone-300 text-sm font-semibold hover:bg-stone-50 active:scale-98 transition shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <button
              id="hero-ai-architect-btn"
              onClick={onOpenAIArchitect}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-700 hover:text-rose-800 underline underline-offset-4 decoration-rose-300"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Not sure yet? Get a free AI-drafted plan and script in a minute
            </button>

            {/* Trust strip */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">No payment online</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">We confirm your date first. EFT deposit after that.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Clear Rand pricing</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">Package prices shown upfront, from R1,950.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Talk to a real person</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">Plan it with us directly on WhatsApp or email.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Imagery */}
          <div className="lg:col-span-5 relative hidden sm:block">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-rose-200/60 border-4 border-white">
              <img
                src={HERO_IMAGE}
                alt="A couple sharing a proposal moment at sunset"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent">
                <p className="font-serif-luxury text-2xl text-white font-semibold leading-tight">
                  "Will you marry me?"
                </p>
                <p className="text-xs text-stone-200 mt-1">The words are yours. The setting, styling and timing are on us.</p>
              </div>
            </div>
            <div className="absolute -left-8 bottom-16 w-36 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-[-6deg] hidden lg:block">
              <img src={HERO_IMAGE_SMALL} alt="Protea bouquet and chocolates" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Occasion Filter Scroll */}
        <div id="experiences" className="mt-12 sm:mt-16 scroll-mt-24">
          <p className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            What are you celebrating?
          </p>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setSelectedOccasion(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  selectedOccasion === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              id="hero-bespoke-trigger-btn"
              type="button"
              onClick={onOpenBespokeModal}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl sm:rounded-full text-left bg-rose-50/90 hover:bg-rose-100 text-rose-900 border border-rose-200/80 text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="flex-1">
                Have something unique in mind? <strong>Tell us your idea</strong> and we'll tailor it.
              </span>
              <ArrowRight className="w-3 h-3 text-rose-700 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
