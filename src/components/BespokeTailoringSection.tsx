import React from 'react';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Heart,
  Clock
} from 'lucide-react';

interface BespokeTailoringSectionProps {
  onOpenBespokeModal: () => void;
  onOpenWhatsAppDirect: () => void;
}

const INSPIRATION_CHIPS = [
  '🚁 Private Franschhoek Peak Helicopter Flip',
  '🐆 Sunset Bushveld Candlelit Safari',
  '🎻 Sunset Cellist on Clifton 4th Beach',
  '🍷 Secluded Historic Wine Cellar Buyout',
  '🗺️ Multi-Stop City Scavenger Hunt',
  '🐾 Surprise Proposal with Rescue Dog & Ring',
];

export const BespokeTailoringSection: React.FC<BespokeTailoringSectionProps> = ({
  onOpenBespokeModal,
  onOpenWhatsAppDirect,
}) => {
  return (
    <section 
      id="bespoke-tailored-experience-section"
      className="relative my-12 sm:my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-rose-950 text-white shadow-2xl border border-stone-800"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Heading & Core Pitch */}
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="uppercase tracking-wider">Custom Tailored Romance & Surprises</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Want Something Unique?
            </h2>

            <p className="text-rose-100/90 text-lg sm:text-xl font-medium leading-relaxed">
              Tell our dedicated team what you want and we can tailor it to your exact needs.
            </p>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Can't find your exact vision in our signature catalog? Whether you want to land a helicopter on a mountain ridge in the Cape Winelands, organize a secluded safari bush surprise in the Kruger, rent out an entire art gallery, or execute a witty inside-joke scavenger hunt — our dedicated South African romance directors handle every permit, musician, floral stylist, and secret cue.
            </p>

            {/* Inspiration Chips */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 block mb-2">
                Popular Tailored Requests:
              </span>
              <div className="flex flex-wrap gap-2">
                {INSPIRATION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={onOpenBespokeModal}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-all cursor-pointer hover:border-rose-400"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Card */}
          <div className="lg:w-96 flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-950">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  Dedicated Concierge Team
                </span>
                <h4 className="text-base font-bold text-white">
                  Direct Bespoke Consultation
                </h4>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-stone-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Custom budget optimization & transparent vendor pricing.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Secret WhatsApp live timing & rehearsal coaching.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>100% weather backup plan guarantee included.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                id="tell-our-team-btn"
                onClick={onOpenBespokeModal}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                <span>Tell Our Team What You Want</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="reach-out-whatsapp-btn"
                onClick={onOpenWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-semibold text-xs transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reach Out on WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict Discretion & NDA Protection Guaranteed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
