import React, { useState } from 'react';
import { Sparkles, Heart, Wand2, Check, Clock, UserCheck, ShieldAlert, ArrowRight, RefreshCw, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { OccasionType, ProposalPlan, ScaleTier } from '../types';

interface TailoredRomanceArchitectProps {
  onPlanGenerated: (plan: ProposalPlan) => void;
  onProceedToBookingWithPlan: (plan: ProposalPlan) => void;
}

const POPULAR_INTERESTS = [
  'Cape Winelands & Cap Classique',
  'Table Mountain & Sunset Sundowners',
  'Artisanal Coffee & Bakeries',
  'Kirstenbosch & Botanical Walks',
  'Fine Dining & Tasting Menus',
  'Beach & Coastal Strolls',
  'Puzzles & Scavenger Hunts',
  'King Proteas & Indigenous Flora',
  'Art Galleries & Live Jazz/Acoustic',
  'Adventure, Hikes & Nature Reserves',
  'Dogs & Animal Lovers',
  'High Tea & Sweet Treats',
];

export const TailoredRomanceArchitect: React.FC<TailoredRomanceArchitectProps> = ({
  onPlanGenerated,
  onProceedToBookingWithPlan,
}) => {
  const [occasion, setOccasion] = useState<OccasionType>('wedding_proposal');
  const [partnerName, setPartnerName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Cape Winelands & Cap Classique', 'Table Mountain & Sunset Sundowners']);
  const [customInterest, setCustomInterest] = useState('');
  const [relationshipStory, setRelationshipStory] = useState('');
  const [scaleTier, setScaleTier] = useState<ScaleTier>('enchanted');
  const [atmosphere, setAtmosphere] = useState('Romantic & Dreamy');
  const [cityLocation, setCityLocation] = useState('Cape Town / Signal Hill & Camps Bay');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<ProposalPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          partnerName: partnerName || 'My Partner',
          partnerInterests: selectedInterests,
          relationshipStory,
          scaleTier,
          atmosphere,
          cityLocation,
          specialRequests,
        }),
      });

      const data = await response.json();
      if (data.success && data.plan) {
        const fullPlan: ProposalPlan = {
          ...data.plan,
          occasion,
          partnerName: partnerName || 'My Partner',
          scaleTier,
          targetCity: cityLocation,
        };
        setGeneratedPlan(fullPlan);
        onPlanGenerated(fullPlan);
      } else {
        setErrorMsg('Could not complete generation. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error generating tailored proposal. Using concierge fallback.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
          <Wand2 className="w-3.5 h-3.5 text-rose-600" />
          <span>Powered by Cherish AI Concierge</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          Tailored Romance & Proposal Architect
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Tell us about your partner and the occasion. Our concierge AI crafts a custom narrative, tailored word-for-word script, exact vendor squad, and minute-by-minute cue sheet.
        </p>
      </div>

      {!generatedPlan ? (
        /* Form Section */
        <form
          id="tailored-architect-form"
          onSubmit={handleGenerate}
          className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-9 space-y-7"
        >
          {/* Step 1: Occasion */}
          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              1. What is the occasion?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'ask_out', label: 'Ask Out / Date' },
                { id: 'wedding_proposal', label: 'Wedding Proposal' },
                { id: 'romantic_picnic', label: 'Luxury Picnic' },
                { id: 'scavenger_hunt', label: 'Scavenger Hunt' },
                { id: 'flowers_chocolates', label: 'Flowers & Sweets' },
                { id: 'graduation_surprise', label: 'Graduation' },
                { id: 'bachelor_bachelorette', label: 'Bachelor/ette' },
                { id: 'custom_surprise', label: 'Custom Surprise' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setOccasion(item.id as OccasionType)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                    occasion === item.id
                      ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Partner's Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                2. Partner's Name or Nickname
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Maya, Alex, Jordan"
                required
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-sm text-stone-900 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                City or Target Location
              </label>
              <input
                type="text"
                value={cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
                placeholder="e.g. Cape Town / Camps Bay, Franschhoek, Johannesburg / Rosebank, Umhlanga"
                required
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-sm text-stone-900 transition"
              />
            </div>
          </div>

          {/* Step 3: Partner's Specific Passions & Interests */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. What are your partner’s specific passions & interests?
              </label>
              <span className="text-[11px] text-stone-500">Pick all that apply</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {POPULAR_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-rose-100 text-rose-900 border-rose-300 font-semibold'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1 text-rose-600" />}
                    {interest}
                  </button>
                );
              })}
            </div>

            {/* Custom interest adder */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomInterest();
                  }
                }}
                placeholder="Add custom interest (e.g. loves rooibos tea, 90s kwaito, pottery)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="button"
                onClick={addCustomInterest}
                className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Step 4: Story & Memories */}
          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              4. Inside jokes, how you met, or special memories
            </label>
            <textarea
              rows={3}
              value={relationshipStory}
              onChange={(e) => setRelationshipStory(e.target.value)}
              placeholder="e.g. We met at a market in Cape Town 3 years ago; we have an ongoing banter about who makes better braai marinade; they always steal my oversized hoodies..."
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-sm text-stone-900 transition resize-none"
            />
          </div>

          {/* Step 5: Scale Tier & Atmosphere */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                5. Desired Service Tier
              </label>
              <div className="space-y-2">
                {[
                  { id: 'sweet', name: 'Sweet Touch', desc: 'Thoughtful delivery & intimate low-key gesture (~R1,950, R450 deposit)' },
                  { id: 'enchanted', name: 'Enchanted Experience', desc: 'Fully styled date/proposal with secret photographer (~R6,800, R1,600 deposit)' },
                  { id: 'cinematic', name: 'Cinematic Grand Production', desc: 'Movie-scale event with live musicians & drone video (~R19,500, R4,500 deposit)' },
                ].map((tier) => (
                  <label
                    key={tier.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      scaleTier === tier.id
                        ? 'bg-rose-50 border-rose-300'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      checked={scaleTier === tier.id}
                      onChange={() => setScaleTier(tier.id as ScaleTier)}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{tier.name}</span>
                      <span className="text-[11px] text-stone-500 block leading-tight">{tier.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Atmosphere & Mood
              </label>
              <select
                value={atmosphere}
                onChange={(e) => setAtmosphere(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-sm text-stone-900 transition mb-3"
              >
                <option value="Romantic & Dreamy">Romantic & Dreamy (Candles, soft strings, blossoms)</option>
                <option value="Intimate & Low-Key">Intimate & Low-Key (Private, gentle, zero public eyes)</option>
                <option value="Playful & Adventurous">Playful & Adventurous (Mystery clues, fun checkpoints)</option>
                <option value="Cinematic & Grand">Cinematic & Grand (Big music swell, awe-inspiring staging)</option>
              </select>

              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                Special Requests or Dietary / Accessibility Notes
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Vegetarian champagne basket, wheelchair accessible spot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-semibold text-base shadow-lg shadow-rose-200 hover:from-rose-700 hover:to-rose-800 active:scale-98 transition disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Our AI Concierge is Crafting Your Custom Proposal...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Architect My Tailored Proposal Plan</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* Generated Plan Showcase */
        <div className="space-y-8 animate-fadeIn">
          {/* Top Congratulations Card */}
          <div className="bg-gradient-to-br from-rose-900 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Personalized Plan for {generatedPlan.partnerName}</span>
              </div>

              <button
                onClick={() => setGeneratedPlan(null)}
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 py-1 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Edit Brief & Re-generate</span>
              </button>
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              {generatedPlan.conceptTitle}
            </h3>
            <p className="text-rose-200 text-sm sm:text-base font-medium mb-6">
              {generatedPlan.tagline}
            </p>

            <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs sm:text-sm text-stone-100 leading-relaxed whitespace-pre-line">
              {generatedPlan.overview}
            </div>
          </div>

          {/* The Tailored Script Box ("What To Say") */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <Heart className="w-5 h-5 text-rose-600" />
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Your Custom Tailored Script & Cue Sheet
              </h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                  Concierge Stage Direction (Body Language & Timing):
                </span>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  {generatedPlan.tailoredScript.stageDirection}
                </p>
              </div>

              <div className="p-5 bg-rose-50/80 rounded-2xl border border-rose-200">
                <span className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block mb-2">
                  What To Say (Word-for-Word Proposal / Ask Out Speech):
                </span>
                <p className="text-sm sm:text-base text-stone-900 font-medium leading-relaxed">
                  {generatedPlan.tailoredScript.whatToSay}
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Backup Line (If You Choke Up with Emotion):
                </span>
                <p className="text-xs sm:text-sm text-stone-700 italic">
                  {generatedPlan.tailoredScript.backupWords}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline of Events */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-rose-600" />
              <h4 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Minute-by-Minute Production Timeline
              </h4>
            </div>

            <div className="space-y-4">
              {generatedPlan.timeline.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/70"
                >
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-mono font-bold">
                    {step.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h5 className="text-sm font-bold text-stone-900">{step.step}</h5>
                      <span className="text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        {step.whoIsDoingWhat}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Squad & Weather Contingency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendor Squad */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-5 h-5 text-rose-600" />
                <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Assigned Vendor Squad
                </h4>
              </div>

              <div className="space-y-3">
                {generatedPlan.vendorSquad.map((v, i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                      <span>{v.role}</span>
                      <span className="text-rose-700">{v.estimatedCost}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">{v.serviceDescription}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge Advice & Weather Backup */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Concierge Stress-Busting Advice
                  </h4>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {generatedPlan.conciergeAdvice.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider block mb-0.5">
                  Weather & Backup Contingency:
                </span>
                <p className="text-xs text-stone-700">{generatedPlan.contingencyPlan}</p>
              </div>
            </div>
          </div>

          {/* Action: Lock In Plan & Pay Deposit */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block mb-1">
                Ready to make it happen?
              </span>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
                Lock In This Plan with a Dedicated Concierge
              </h4>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-lg">
                Pay the modest reservation deposit to hold your date and dispatch our vendor squad. You pay the remaining balance on the event day.
              </p>
            </div>

            <button
              onClick={() => onProceedToBookingWithPlan(generatedPlan)}
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/50 active:scale-98 transition cursor-pointer"
            >
              <span>Lock In Plan & Pay Deposit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
