import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Sparkles, Send, Calendar, Clock, MapPin, User, Phone, Mail, ArrowRight, HeartHandshake, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingConfirmation, OccasionType, ProposalPlan, ScaleTier } from '../types';
import { SERVICE_TIERS, VENDOR_ADDONS } from '../data/services';
import { getDeviceId } from '../lib/deviceId';

interface PlanCustomizerAndDepositProps {
  initialPlan?: ProposalPlan | null;
  initialTier?: ScaleTier | null;
  onBookingSuccess: (booking: BookingConfirmation) => void;
}

export const PlanCustomizerAndDeposit: React.FC<PlanCustomizerAndDepositProps> = ({
  initialPlan,
  initialTier,
  onBookingSuccess,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>(
    initialPlan?.occasion || 'wedding_proposal'
  );
  const [selectedTierId, setSelectedTierId] = useState<ScaleTier>(
    initialPlan?.scaleTier || initialTier || 'enchanted'
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Event details
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [eventTime, setEventTime] = useState('6:30 PM (Golden Hour Sunset)');
  const [cityLocation, setCityLocation] = useState(initialPlan?.targetCity || 'Cape Town / Camps Bay & Signal Hill');
  const [partnerName, setPartnerName] = useState(initialPlan?.partnerName || '');

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate pricing
  const currentTier = SERVICE_TIERS.find((t) => t.id === selectedTierId) || SERVICE_TIERS[1];
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = VENDOR_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalEstimatedAmount = currentTier.basePrice + addonsTotal;
  const depositAmount = currentTier.depositAmount;
  const balanceRemaining = totalEstimatedAmount - depositAmount;

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter((i) => i !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const handleDepositPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setErrorMsg('Please enter your name, phone number, and email so we can confirm your booking.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/book-deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: getDeviceId(),
          clientName,
          clientPhone,
          clientEmail,
          occasion: selectedOccasion,
          partnerName,
          eventDate,
          eventTime,
          cityLocation,
          selectedTier: currentTier.name,
          totalEstimatedAmount,
          depositAmount,
          selectedAddons: selectedAddonIds,
          specialNotes: specialNotes || (initialPlan ? `Custom AI Concept: ${initialPlan.conceptTitle}` : ''),
          plan: initialPlan || null,
        }),
      });

      const data = await response.json();
      if (data.success && data.booking) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#f43f5e', '#f59e0b', '#ec4899', '#ffffff'],
        });

        const fullBooking: BookingConfirmation = data.booking;

        // Cache locally too so "My Itineraries" still works offline
        try {
          const savedBookings = JSON.parse(localStorage.getItem('cherish_bookings') || '[]');
          savedBookings.unshift(fullBooking);
          localStorage.setItem('cherish_bookings', JSON.stringify(savedBookings));
        } catch (storageErr) {
          console.error(storageErr);
        }

        onBookingSuccess(fullBooking);
      } else {
        setErrorMsg('Your booking request could not be sent. Please verify your details.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not send your booking request. Please check your connection or WhatsApp us.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
          <span>Build Your Package & Request a Booking</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
          Select Your Services & Request Your Date
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          Choose what works for you and send us your request. No payment is taken online: we confirm availability with you first, then send deposit details to secure your date. The balance is paid on the day.
        </p>
      </div>

      {initialPlan && (
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-0.5">
              Custom AI Plan Attached:
            </span>
            <h4 className="text-sm sm:text-base font-bold text-stone-900">{initialPlan.conceptTitle}</h4>
            <p className="text-xs text-stone-600 line-clamp-1">{initialPlan.tagline}</p>
          </div>
          <span className="text-xs text-rose-800 font-semibold bg-white/80 px-3 py-1.5 rounded-xl border border-rose-200 flex-shrink-0">
            Script & Timeline Synced
          </span>
        </div>
      )}

      <form onSubmit={handleDepositPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customization Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-7">
          {/* 1. Occasion Category */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              1. What Service or Occasion are you celebrating?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'ask_out', label: 'Ask Someone Out' },
                { id: 'wedding_proposal', label: 'Wedding Proposal' },
                { id: 'romantic_picnic', label: 'Luxury Picnic' },
                { id: 'scavenger_hunt', label: 'Scavenger Hunt' },
                { id: 'flowers_chocolates', label: 'Flowers & Sweets' },
                { id: 'graduation_surprise', label: 'Graduation' },
                { id: 'bachelor_bachelorette', label: 'Bachelor Party' },
                { id: 'custom_surprise', label: 'Custom Surprise' },
              ].map((occ) => (
                <button
                  type="button"
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id as OccasionType)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                    selectedOccasion === occ.id
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Service Tier Options */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                2. Select Your Concierge Plan Tier
              </label>
              <span className="text-[11px] text-stone-500 font-medium">All tiers include personal planning support</span>
            </div>

            <div className="space-y-3">
              {SERVICE_TIERS.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/40 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-stone-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-bold text-stone-900 text-sm sm:text-base">{tier.name}</span>
                        <span className="text-[10px] font-semibold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                          {tier.badge}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-stone-900">R{tier.basePrice.toLocaleString()}</span>
                        <span className="text-[11px] text-emerald-700 block font-semibold">
                          R{tier.depositAmount.toLocaleString()} deposit
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 mb-2.5 pl-6">{tier.description}</p>

                    <div className="pl-6 flex flex-wrap gap-1.5">
                      {tier.highlights.slice(0, 3).map((h, idx) => (
                        <span key={idx} className="text-[10px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md font-medium">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Add-on Vendors & Specialized Services */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. Add Professional Vendors & Enhancements (Optional)
              </label>
              <span className="text-[11px] text-stone-500 font-medium">Add to your squad</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {VENDOR_ADDONS.map((addon) => {
                const isChecked = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      isChecked
                        ? 'bg-rose-50 border-rose-300 text-stone-900'
                        : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs font-bold leading-snug">{addon.name}</span>
                        <span className="text-xs font-bold text-rose-700 flex-shrink-0">+R{addon.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-tight mb-2">{addon.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 text-[10px]">
                      <span className="text-stone-400 font-medium">{addon.popularWith}</span>
                      <span className={`font-semibold ${isChecked ? 'text-rose-700' : 'text-stone-500'}`}>
                        {isChecked ? '✓ Added' : '+ Add'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Date, Time, Location & Recipient */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
              4. Event Logistics & Timeline
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1">Target Date</span>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1">Preferred Time / Moment</span>
                <select
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                >
                  <option value="6:30 PM (Golden Hour Sunset)">6:30 PM (Golden Hour Sunset)</option>
                  <option value="1:00 PM (Afternoon Sunshine)">1:00 PM (Afternoon Sunshine)</option>
                  <option value="8:00 PM (Starlight & Lanterns)">8:00 PM (Starlight & Lanterns)</option>
                  <option value="10:30 AM (Morning Breeze / Brunch)">10:30 AM (Morning Breeze / Brunch)</option>
                  <option value="Custom Time (Coordinate with Concierge)">Custom Time (Coordinate with Concierge)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1">City or Venue</span>
                <input
                  type="text"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  placeholder="e.g. Cape Town, Franschhoek, Johannesburg, Durban, Umhlanga"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1">Partner's / Recipient's Name</span>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Zola, Liam, Thando, Lerato"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-stone-700 block mb-1">
                Special Instructions for Our Team (Optional)
              </span>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Please send WhatsApp alerts; partner loves King Proteas and MCC; song: 'Special Star'"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Checkout, Deposit Breakdown & Payment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Payment Summary Box */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Booking Request
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No payment online
                </span>
              </div>

              {/* Price Calculation Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span>Base Plan: <strong>{currentTier.name}</strong></span>
                  <span className="font-bold text-stone-900">R{currentTier.basePrice.toLocaleString()}</span>
                </div>

                {selectedAddonIds.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Added Vendors ({selectedAddonIds.length}):
                    </span>
                    {selectedAddonIds.map((id) => {
                      const addon = VENDOR_ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      return (
                        <div key={id} className="flex items-center justify-between text-stone-600 pl-2">
                          <span className="truncate pr-2">+{addon.name}</span>
                          <span className="font-medium text-stone-800">R{addon.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-stone-900 text-sm font-semibold">
                  <span>Total Estimated Cost:</span>
                  <span>R{totalEstimatedAmount.toLocaleString()}</span>
                </div>

                {/* Highlighted Deposit Card */}
                <div className="p-4 bg-gradient-to-br from-rose-50 to-rose-100/70 rounded-2xl border border-rose-200 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold text-rose-950 block">
                        Deposit to Secure Your Date:
                      </span>
                      <span className="text-[11px] text-rose-700">
                        Payable after we confirm availability
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-rose-700">
                      R{depositAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-rose-200/80 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Remaining balance due on event day:</span>
                    <span className="font-bold text-stone-900">R{balanceRemaining.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Your Contact Details
                </span>

                <div>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your Full Name"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Cell / WhatsApp (e.g. 082 123 4567)"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* How payment works */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <p className="font-semibold text-stone-900">How payment works</p>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Sending this request does not charge you. We will WhatsApp or email you to confirm availability and send EFT details for the deposit. Your date is secured once the deposit is received.
                </p>
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
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-rose-200 transition disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Sending Your Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Booking Request</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-500 leading-tight">
                We usually reply within one business day.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
