import React from 'react';
import { X, CheckCircle2, ShieldCheck, Heart, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { PreDesignedExperience } from '../types';

interface ExperienceDetailModalProps {
  experience: PreDesignedExperience | null;
  onClose: () => void;
  onProceedToBooking: (experience: PreDesignedExperience) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  onClose,
  onProceedToBooking,
}) => {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-stone-900 flex-shrink-0">
          <img
            src={experience.heroImage}
            alt={experience.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-600 text-[10px] font-bold uppercase tracking-wider mb-2">
              {experience.categoryLabel}
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-stone-800">
          {/* Stress Relief Callout */}
          <div className="flex items-start gap-3 p-4 bg-rose-50/80 rounded-2xl border border-rose-200/60">
            <ShieldCheck className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider">
                Our Concierge Stress-Free Pledge
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
                {experience.stressReliefFact} You will have a dedicated concierge coordinating every vendor, arrival cue, and timing checkpoint behind the scenes.
              </p>
            </div>
          </div>

          {/* Full Narrative */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              How The Experience Unfolds
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {experience.fullDescription}
            </p>
          </div>

          {/* Sample Script Snippet */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              Tailored Script & Cue Sheet Preview
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-semibold text-rose-700 block mb-0.5">Stage Direction:</span>
                <span className="text-stone-600 italic">"Gently stop walking. Take both of their hands into yours. The background acoustic melody softens to a whisper."</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                <span className="text-[11px] font-semibold text-rose-700 block mb-0.5">What to Say:</span>
                <span className="text-stone-800 font-medium">"{experience.sampleScriptSnippet}"</span>
              </div>
            </div>
          </div>

          {/* Vendors Included */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Professional Vendors Included in Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {experience.includedVendors.map((vendor, index) => (
                <div key={index} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs font-medium text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{vendor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/90 flex-shrink-0 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Package price from</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-stone-900">R{experience.startingPrice.toLocaleString()}</span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                R{experience.depositPrice.toLocaleString()} Deposit to Lock
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToBooking(experience);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-98 transition"
            >
              <span>Customize & Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
