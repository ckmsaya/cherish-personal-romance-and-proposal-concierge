import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { PreDesignedExperience } from '../types';

interface ExperienceCardProps {
  experience: PreDesignedExperience;
  onSelectExperience: (experience: PreDesignedExperience) => void;
  onCustomizeExperience: (experience: PreDesignedExperience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onSelectExperience,
  onCustomizeExperience,
}) => {
  return (
    <div
      id={`experience-card-${experience.id}`}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Hero Image with Badge */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={experience.heroImage}
            alt={experience.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-bold shadow-xs">
              {experience.categoryLabel}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[11px] font-semibold text-rose-200 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {experience.stressReliefFact.slice(0, 45)}...
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-2 group-hover:text-rose-700 transition-colors">
            {experience.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-4">
            {experience.tagline}
          </p>

          {/* Vendors Squad Included */}
          <div className="mb-4">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Vendors We Coordinate For You:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {experience.includedVendors.map((vendor, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                >
                  <Check className="w-3 h-3 text-rose-500" />
                  {vendor}
                </span>
              ))}
            </div>
          </div>

          {/* Script Teaser */}
          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/80 mb-4">
            <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500" />
              Sample Personalized Script Teaser:
            </p>
            <p className="text-xs text-stone-700 italic line-clamp-2">
              {experience.sampleScriptSnippet}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 mt-2">
        <div className="flex items-baseline justify-between mb-4 pt-3">
          <div>
            <span className="text-[11px] text-stone-500 font-medium block">Starting package</span>
            <span className="text-xl font-bold text-stone-900">R{experience.startingPrice.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Deposit to Lock: R{experience.depositPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectExperience(experience)}
            className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition text-center"
          >
            View Cue Details
          </button>
          <button
            onClick={() => onCustomizeExperience(experience)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-rose-600 active:scale-98 transition text-center"
          >
            <span>Select & Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
