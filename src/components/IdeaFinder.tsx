import React, { useState } from 'react';
import { Compass, ArrowRight, ArrowLeft, MessageSquare, RotateCcw, Sparkles } from 'lucide-react';
import { OccasionType, PreDesignedExperience } from '../types';
import { PRE_DESIGNED_EXPERIENCES } from '../data/services';
import { buildWhatsAppLink, CONCIERGE_PHONE } from '../lib/contact';

interface IdeaFinderProps {
  onViewExperience: (exp: PreDesignedExperience) => void;
  onRequestExperience: (exp: PreDesignedExperience) => void;
  onOpenBespokeModal: () => void;
}

type Budget = { id: string; label: string; max: number };

const OCCASIONS: { id: OccasionType | 'not_sure'; label: string }[] = [
  { id: 'ask_out', label: 'Asking someone out' },
  { id: 'wedding_proposal', label: 'Wedding proposal' },
  { id: 'romantic_picnic', label: 'Romantic date or picnic' },
  { id: 'scavenger_hunt', label: 'Scavenger hunt' },
  { id: 'flowers_chocolates', label: 'Flowers & gifts' },
  { id: 'graduation_surprise', label: 'Graduation' },
  { id: 'bachelor_bachelorette', label: 'Bachelor / bachelorette' },
  { id: 'not_sure', label: 'Not sure yet' },
];

const BUDGETS: Budget[] = [
  { id: 'under_3k', label: 'Under R3,000', max: 3000 },
  { id: '3k_8k', label: 'R3,000 – R8,000', max: 8000 },
  { id: '8k_20k', label: 'R8,000 – R20,000', max: 20000 },
  { id: 'over_20k', label: 'Over R20,000', max: Infinity },
  { id: 'not_sure', label: 'Not sure yet', max: Infinity },
];

const CITIES = ['Cape Town', 'Cape Winelands', 'Johannesburg', 'Pretoria', 'Durban', 'Garden Route', 'Somewhere else'];

// Occasions for a couple, so a proposal suggests a picnic before a graduation
const ROMANTIC = new Set<string>(['ask_out', 'wedding_proposal', 'romantic_picnic', 'scavenger_hunt', 'flowers_chocolates', 'anniversary_date']);

function rankExperiences(occasion: string, budget: Budget): PreDesignedExperience[] {
  return PRE_DESIGNED_EXPERIENCES
    .map((exp) => {
      let score = 0;
      if (exp.occasion === occasion) score += 10;
      else if (ROMANTIC.has(occasion) && ROMANTIC.has(exp.occasion)) score += 3;
      else if (occasion !== 'not_sure') return { exp, score: 0 };
      if (exp.startingPrice <= budget.max) score += 4;
      else score -= 6;
      // Closer to the top of the budget means a fuller experience for the money
      if (budget.max !== Infinity && exp.startingPrice <= budget.max) score += exp.startingPrice / budget.max;
      return { exp, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ exp }) => exp);
}

const Choice: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode }> = ({ selected, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-semibold transition ${
      selected ? 'border-rose-600 bg-rose-50 text-rose-900' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
    }`}
  >
    {children}
  </button>
);

export const IdeaFinder: React.FC<IdeaFinderProps> = ({ onViewExperience, onRequestExperience, onOpenBespokeModal }) => {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const occasionLabel = OCCASIONS.find((o) => o.id === occasion)?.label ?? '';
  const results = occasion && budget ? rankExperiences(occasion, budget) : [];

  const whatsappMessage = `Hi Cherish! I used Find My Surprise on your website.\nOccasion: ${occasionLabel}\nBudget: ${budget?.label ?? ''}\nCity: ${city ?? ''}\nCan you suggest some ideas?`;

  const reset = () => {
    setStep(0);
    setOccasion(null);
    setBudget(null);
    setCity(null);
  };

  const questions = [
    { title: 'What are you celebrating?', options: OCCASIONS.map((o) => ({ key: o.id, label: o.label })), value: occasion, set: (v: string) => setOccasion(v) },
    { title: 'Roughly what budget do you have in mind?', options: BUDGETS.map((b) => ({ key: b.id, label: b.label })), value: budget?.id ?? null, set: (v: string) => setBudget(BUDGETS.find((b) => b.id === v) ?? null) },
    { title: 'Where will it happen?', options: CITIES.map((c) => ({ key: c, label: c })), value: city, set: (v: string) => setCity(v) },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-rose-600" />
          <span>Find My Surprise</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Not sure where to start?
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Answer three quick questions and we'll suggest the experiences that fit best.
        </p>
      </div>

      {step < questions.length ? (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-5 sm:p-8">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {questions.map((_, idx) => (
              <div key={idx} className={`h-1.5 flex-1 rounded-full ${idx <= step ? 'bg-rose-600' : 'bg-stone-200'}`} />
            ))}
          </div>
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-5">{questions[step].title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {questions[step].options.map((opt) => (
              <Choice
                key={opt.key}
                selected={questions[step].value === opt.key}
                onClick={() => {
                  questions[step].set(opt.key);
                  setStep(step + 1);
                }}
              >
                {opt.label}
              </Choice>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-stone-600">
              <strong className="text-stone-900">{occasionLabel}</strong> · {budget?.label} · {city}
            </p>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800">
              <RotateCcw className="w-3.5 h-3.5" /> Start again
            </button>
          </div>

          {results.length > 0 ? (
            <div className="space-y-3">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">Our suggestions for you</h2>
              {results.map((exp, idx) => (
                <div key={exp.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden flex flex-col sm:flex-row">
                  <img src={exp.heroImage} alt={exp.title} className="w-full sm:w-48 h-40 sm:h-auto object-cover" loading="lazy" />
                  <div className="p-5 flex-1 flex flex-col">
                    {idx === 0 && (
                      <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full mb-2">
                        Best match
                      </span>
                    )}
                    <h3 className="font-bold text-stone-900 leading-snug">{exp.title}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 mb-3">{exp.shortDescription}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewExperience(exp)}
                        className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 hover:bg-stone-50"
                      >
                        View details
                      </button>
                      <button
                        type="button"
                        onClick={() => onRequestExperience(exp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
                      >
                        Get a quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 text-center">
              <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-2">Let's design something just for you</h2>
              <p className="text-sm text-stone-600 mb-4">None of our signature packages fit those answers exactly, but we can tailor one.</p>
              <button
                type="button"
                onClick={onOpenBespokeModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4" /> Tell us your idea
              </button>
            </div>
          )}

          <div className="bg-stone-900 text-white rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold">Prefer to talk it through?</h3>
              <p className="text-xs sm:text-sm text-stone-300">Send us your answers on WhatsApp and we'll suggest ideas personally.</p>
            </div>
            <a
              href={buildWhatsAppLink(CONCIERGE_PHONE, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4" /> Send on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
