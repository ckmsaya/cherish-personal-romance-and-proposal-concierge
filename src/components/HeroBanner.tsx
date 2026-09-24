import React from 'react';
import { Sparkles, Heart, ShieldCheck, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { OccasionType } from '../types';

interface HeroBannerProps {
  selectedOccasion: OccasionType | 'all';
  setSelectedOccasion: (occ: OccasionType | 'all') => void;
  onOpenAIArchitect: () => void;
  onOpenCustomizer: () => void;
  onOpenBespokeModal: () => void;
}

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
        <div className="text-center max-w-3xl mx-auto">
          {/* Reassurance Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs sm:text-sm font-semibold mb-5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Stressed about asking someone out or popping the question? Lekker, leave it to us.</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1] mb-5">
            Cherish Premier Proposal & Romance Concierge.
          </h1>

          <p className="text-base sm:text-xl text-stone-600 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            From Cape Town and the Winelands to Jozi, Pretoria, and Durban—sending indigenous King Protea bouquets, orchestrating sunset luxury picnics with Cap Classique, or staging full-scale cinematic proposals with secret photographers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              id="hero-ai-architect-btn"
              onClick={onOpenAIArchitect}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-semibold shadow-md shadow-rose-200 hover:from-rose-700 hover:to-pink-700 active:scale-98 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tailor Plan for My Partner (AI)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-customizer-btn"
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-stone-900 border border-stone-300 text-sm font-semibold hover:bg-stone-50 active:scale-98 transition shadow-xs"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Choose Services & Lock Deposit</span>
            </button>
          </div>

          {/* Reassurance Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-stone-200/80 text-left">
            <div className="flex items-start gap-2.5 p-2">
              <UserCheck className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Dedicated Concierge</h4>
                <p className="text-[11px] text-stone-500 leading-snug">Personal director assigned to coordinate every vendor.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2">
              <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Customized Scripts</h4>
                <p className="text-[11px] text-stone-500 leading-snug">Word-for-word cue sheets tailored to your relationship.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2">
              <ShieldCheck className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Easy Deposit Lock</h4>
                <p className="text-[11px] text-stone-500 leading-snug">Lock your date with a modest deposit; pay balance day of.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Occasion Filter Scroll */}
        <div className="mt-10 sm:mt-12">
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

          {/* Dedicated "Want something unique?" Reach out prompt */}
          <div className="mt-4 flex items-center justify-center">
            <button
              id="hero-bespoke-trigger-btn"
              type="button"
              onClick={onOpenBespokeModal}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50/90 hover:bg-rose-100 text-rose-900 border border-rose-200/80 text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600 group-hover:rotate-12 transition-transform" />
              <span>
                Want something unique? <strong>Tell our dedicated team what you want</strong> and we can tailor it to your needs.
              </span>
              <span className="font-bold text-rose-700 underline underline-offset-2 ml-1 flex items-center">
                Reach out <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
