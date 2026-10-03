import React from 'react';
import { MessageSquare, CalendarCheck, Wallet, PartyPopper, Check, ArrowRight, MapPin } from 'lucide-react';
import { ScaleTier } from '../types';
import { SERVICE_TIERS } from '../data/services';

const SectionHeading: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({ eyebrow, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-10">
    <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-3">
      {eyebrow}
    </span>
    <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{title}</h2>
    <p className="text-stone-500 text-sm sm:text-base mt-2 leading-relaxed">{subtitle}</p>
  </div>
);

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Tell us the idea',
    body: 'Pick a package or describe your own idea. Add your date, city, and anything they love.',
  },
  {
    icon: CalendarCheck,
    title: 'Get your free quote',
    body: 'We check availability and send a personalised quote on WhatsApp or email, usually within one business day.',
  },
  {
    icon: Wallet,
    title: 'Secure your date',
    body: 'Happy with the quote? Pay the deposit by EFT to secure your date, then we plan every detail with you.',
  },
  {
    icon: PartyPopper,
    title: 'Show up & shine',
    body: 'We set up, stay out of sight, and give you the cue. You just bring yourself and the words.',
  },
];

export const HowItWorksSection: React.FC = () => (
  <section id="how-it-works" className="mt-20 scroll-mt-24">
    <SectionHeading
      eyebrow="How it works"
      title="From idea to unforgettable in four steps"
      subtitle="No guesswork and no surprises for you. Just the one you are planning for them."
    />
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="relative bg-white rounded-3xl border border-stone-200 p-6 shadow-xs">
            <span className="absolute top-5 right-5 font-serif-luxury text-4xl font-bold text-rose-100 leading-none">
              {idx + 1}
            </span>
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1.5">{step.title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{step.body}</p>
          </li>
        );
      })}
    </ol>
  </section>
);

interface PackagesSectionProps {
  onSelectTier: (tier: ScaleTier) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectTier }) => (
  <section id="packages" className="mt-20 scroll-mt-24">
    <SectionHeading
      eyebrow="Our packages"
      title="Three ways to make it unforgettable"
      subtitle="Every package is fully planned and run for you, and priced to your plans. Tell us what you have in mind and we will send you a free, no-obligation quote."
    />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
      {SERVICE_TIERS.map((tier) => {
        const featured = tier.id === 'enchanted';
        return (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-3xl p-6 sm:p-7 border ${
              featured
                ? 'bg-stone-900 text-white border-stone-900 shadow-xl shadow-rose-200/50 lg:-translate-y-2'
                : 'bg-white text-stone-900 border-stone-200 shadow-xs'
            }`}
          >
            <span
              className={`self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${
                featured ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {tier.badge}
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold">{tier.name}</h3>
            <p className={`text-xs sm:text-sm mt-1 mb-5 leading-relaxed ${featured ? 'text-stone-300' : 'text-stone-600'}`}>
              {tier.description}
            </p>
            <ul className="space-y-2.5 mb-7 flex-1">
              {tier.highlights.map((h) => (
                <li key={h} className={`flex items-start gap-2 text-xs sm:text-sm ${featured ? 'text-stone-200' : 'text-stone-700'}`}>
                  <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${featured ? 'text-rose-400' : 'text-rose-600'}`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <p className={`text-[11px] mb-3 ${featured ? 'text-stone-400' : 'text-stone-500'}`}>
              Ideal for: {tier.idealFor}
            </p>
            <button
              onClick={() => onSelectTier(tier.id)}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition active:scale-98 ${
                featured
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

const AREAS = [
  { region: 'Cape Town', spots: 'Camps Bay, Signal Hill, Clifton, Kirstenbosch' },
  { region: 'Cape Winelands', spots: 'Franschhoek, Stellenbosch, Paarl' },
  { region: 'Johannesburg & Pretoria', spots: 'Sandton, Rosebank, Northcliff, Pretoria East' },
  { region: 'Durban & North Coast', spots: 'Umhlanga, Ballito, Salt Rock' },
  { region: 'Garden Route', spots: 'Knysna, Plettenberg Bay, Wilderness' },
  { region: 'Somewhere else?', spots: 'Ask us. Bespoke plans can travel.' },
];

export const AreasSection: React.FC = () => (
  <section id="areas" className="mt-20 scroll-mt-24">
    <SectionHeading
      eyebrow="Where we plan"
      title="Across South Africa"
      subtitle="Tell us the city and we'll suggest the most beautiful spots for your moment."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {AREAS.map((area) => (
        <div key={area.region} className="flex items-start gap-3 bg-white rounded-2xl border border-stone-200 p-4">
          <MapPin className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-stone-900">{area.region}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{area.spots}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
