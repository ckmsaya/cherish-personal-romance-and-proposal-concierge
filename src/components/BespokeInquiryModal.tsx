import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  MessageSquare,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Compass,
  HeartHandshake,
  UserCheck
} from 'lucide-react';
import { BespokeInquiry, ConciergeAgent } from '../types';
import { getDeviceId } from '../lib/deviceId';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/contact';

interface BespokeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquirySubmitted?: (inquiry: BespokeInquiry) => void;
}

const SA_LOCATIONS = [
  'Cape Town (Camps Bay, Signal Hill, Clifton, Kirstenbosch)',
  'Cape Winelands (Franschhoek, Stellenbosch, Paarl)',
  'Johannesburg & Pretoria (Rosebank, Sandton, Northcliff Ridge)',
  'Durban & North Coast (Umhlanga, Ballito, Salt Rock)',
  'Garden Route (Knysna, Plettenberg Bay, Wilderness)',
  'Greater Kruger & Private Safari Game Reserve',
  'Drakensberg & Midlands Meander',
  'Other / Secret Undisclosed Location in SA',
];

const BUDGET_OPTIONS = [
  'Flexible / Need Expert Guidance',
  'R3,500 – R8,000 (Sweet & Intimate)',
  'R8,000 – R20,000 (Luxury Signature)',
  'R20,000 – R45,000 (Cinematic VIP)',
  'R45,000+ (High-End Grand Production)',
];

export const BespokeInquiryModal: React.FC<BespokeInquiryModalProps> = ({
  isOpen,
  onClose,
  onInquirySubmitted,
}) => {
  // Form State
  const [occasion, setOccasion] = useState('Wedding Proposal');
  const [customVision, setCustomVision] = useState('');
  const [locationArea, setLocationArea] = useState(SA_LOCATIONS[0]);
  const [targetTimeline, setTargetTimeline] = useState('');
  const [budgetExpectation, setBudgetExpectation] = useState(BUDGET_OPTIONS[1]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [discreetGuarantee, setDiscreetGuarantee] = useState(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<BespokeInquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVision.trim() || !clientName.trim() || !clientPhone.trim()) {
      setErrorMsg('Please share a brief description of your vision, your name, and cell/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/bespoke-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: getDeviceId(),
          clientName,
          clientPhone,
          clientEmail,
          contactPreference,
          occasion,
          customVision,
          locationArea,
          targetTimeline: targetTimeline || 'Within next 1-2 months',
          budgetExpectation,
          discreetGuarantee,
        }),
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        setSubmittedInquiry(data.inquiry);
        
        // Persist to local storage so it shows in itineraries
        try {
          const stored = localStorage.getItem('cherish_bespoke_inquiries');
          const inquiries = stored ? JSON.parse(stored) : [];
          localStorage.setItem('cherish_bespoke_inquiries', JSON.stringify([data.inquiry, ...inquiries]));
        } catch (err) {
          console.error('Failed to cache bespoke inquiry', err);
        }

        if (onInquirySubmitted) {
          onInquirySubmitted(data.inquiry);
        }
      } else {
        throw new Error(data.error || 'Failed to submit inquiry');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not submit your inquiry. Please try again or reach out to us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDirectWhatsApp = (concierge?: ConciergeAgent) => {
    const phone = concierge ? concierge.phone : '27646261102';
    const text = `Hi Cherish Concierge Team! I want something unique tailored for a ${occasion}. My name is ${clientName || 'a client'}. Can we chat about creating a custom experience?`;
    window.open(buildWhatsAppLink(phone, text), '_blank');
  };

  const handleOpenDirectEmail = () => {
    window.location.href = buildMailtoLink(
      `Bespoke Inquiry: ${occasion}`,
      `Hi Cherish Concierge Team,\n\nMy name is ${clientName || '[your name]'}. I'd like something tailored for a ${occasion}.\n\n${customVision || '[describe your vision here]'}\n\nThanks!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        id="bespoke-inquiry-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-rose-950 text-white p-6 sm:p-8 relative">
          <button
            id="close-bespoke-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Bespoke Concierge Consultation</span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Want Something Unique?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
            Tell our dedicated team what you want, and we can tailor it to your exact needs. No request is too grand, too intimate, or too unconventional.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submittedInquiry ? (
            /* Success State */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full mb-2">
                  Reference: #{submittedInquiry.inquiryId}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
                  We've Received Your Vision!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  Lekker! Your unique concept has been handed to our Senior Concierge Director. We will review every nuance and reach out via your preferred channel within 2 hours.
                </p>
              </div>

              {/* Assigned Director Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={submittedInquiry.assignedConcierge.avatar}
                  alt={submittedInquiry.assignedConcierge.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-300"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                    Your Assigned Lead Director
                  </span>
                  <h4 className="text-base font-bold text-stone-900">
                    {submittedInquiry.assignedConcierge.name}
                  </h4>
                  <p className="text-xs text-stone-500 mb-2">
                    {submittedInquiry.assignedConcierge.title}
                  </p>
                  <p className="text-xs text-stone-600 leading-normal">
                    {submittedInquiry.assignedConcierge.bio}
                  </p>
                </div>
              </div>

              {/* Action: Open WhatsApp or Email directly */}
              <div className="space-y-3 pt-2">
                <a
                  href={submittedInquiry.whatsappQuickLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-emerald-200 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat with {submittedInquiry.assignedConcierge.name}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href={buildMailtoLink(
                    `Bespoke Inquiry #${submittedInquiry.inquiryId}`,
                    `Hi ${submittedInquiry.assignedConcierge.name},\n\nFollowing up on my bespoke inquiry #${submittedInquiry.inquiryId} for a ${submittedInquiry.occasion}.\n\nThanks!`
                  )}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us Instead</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition"
                >
                  Return to Experiences
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2 border-t border-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Confidential & Under Discretion Protocol</span>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Quick WhatsApp Bar */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-900">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block">Need an immediate answer right now?</span>
                    <span className="text-[11px] text-emerald-700">Chat directly with our senior South African team on WhatsApp.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenDirectWhatsApp()}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    WhatsApp Now
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenDirectEmail}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition cursor-pointer"
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Occasion & Setting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    What is the occasion?
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    <option value="Wedding Proposal">Wedding / Marriage Proposal</option>
                    <option value="Asking Someone Out (First Date)">Asking Someone Out (First Date)</option>
                    <option value="Milestone Anniversary">Milestone Anniversary Date</option>
                    <option value="Luxury Romantic Picnic">Luxury Romantic Sunset Picnic</option>
                    <option value="Custom Scavenger Hunt">Story-of-Us Scavenger Hunt</option>
                    <option value="Graduation Tribute">Graduation Pop-Up Surprise</option>
                    <option value="Bachelor / Bachelorette VIP">Bachelor / Bachelorette VIP</option>
                    <option value="Bucket List Safari / Helicopter Trip">Bucket List Safari / Helicopter Trip</option>
                    <option value="Completely Custom Surprise">Completely Custom Surprise Idea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    South African Location
                  </label>
                  <select
                    value={locationArea}
                    onChange={(e) => setLocationArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    {SA_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Vision Textarea */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Describe what you want us to tailor <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={customVision}
                  onChange={(e) => setCustomVision(e.target.value)}
                  placeholder="Tell our team your wildest idea or specific vision! E.g., 'I want to take her up in a helicopter to a private peak on the Franschhoek mountains with a live cellist and chilled MCC waiting...', or 'I want to ask a guy out using a custom clue box delivered to his favorite coffee spot in Rosebank...'"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 transition resize-none leading-relaxed"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Mention inside jokes, partner's hobbies, favorite songs, or any special requests.
                </p>
              </div>

              {/* Timeline & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Target Date / Timeline
                  </label>
                  <input
                    type="text"
                    value={targetTimeline}
                    onChange={(e) => setTargetTimeline(e.target.value)}
                    placeholder="e.g. 24 October 2026, or 'Within 2 months'"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Budget Comfort Range
                  </label>
                  <select
                    value={budgetExpectation}
                    onChange={(e) => setBudgetExpectation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="pt-2 border-t border-stone-100">
                <span className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Your Confidential Contact Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <input
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <input
                      required
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="WhatsApp / Cell Number *"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Email (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                {/* Preferred Reach Out Mode */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1.5">
                    How would you like our concierge to reach out?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'Discreet WhatsApp', icon: MessageSquare },
                      { id: 'call', label: 'Phone Call', icon: Phone },
                      { id: 'email', label: 'Private Email', icon: Lock },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const active = contactPreference === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setContactPreference(opt.id as any)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold border transition ${
                            active
                              ? 'bg-rose-50 text-rose-900 border-rose-400'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Discretion Guarantee */}
                <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={discreetGuarantee}
                    onChange={(e) => setDiscreetGuarantee(e.target.checked)}
                    className="rounded border-stone-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-[11px] text-stone-500">
                    Strict Confidentiality: Do not disclose Cherish or reveal plans to my partner.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                  {errorMsg}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-200 transition disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Assigning Director & Dispatching Brief...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Tell Our Team & Tailor My Experience</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDirectWhatsApp()}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenDirectEmail}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-rose-600" />
                  <span>Direct Email</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
