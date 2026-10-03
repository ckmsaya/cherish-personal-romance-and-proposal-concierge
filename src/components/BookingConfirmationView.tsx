import React from 'react';
import { CheckCircle2, ShieldCheck, Mail, Calendar, Clock, MapPin, Heart, Printer, HeartHandshake, MessageSquare } from 'lucide-react';
import { BookingConfirmation } from '../types';
import { buildWhatsAppLink, buildMailtoLink, CONCIERGE_PHONE, CONCIERGE_EMAIL, CONCIERGE_TEAM_NAME } from '../lib/contact';

const NEXT_STEPS = [
  'We check availability for your date, location, and the vendors you selected.',
  'We contact you on WhatsApp or email to confirm the details and send deposit payment instructions.',
  'Your date is secured once your deposit is received. No payment is taken on this website.',
];

interface BookingConfirmationViewProps {
  booking: BookingConfirmation;
  onViewAllBookings: () => void;
  onPlanAnother: () => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  booking,
  onViewAllBookings,
  onPlanAnother,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
          Booking Request Received
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-3">
          Thank You. We’ve Got Your Request.
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Nothing has been charged. We’ll check availability for your date and contact you on WhatsApp or email to confirm the details and send deposit payment instructions.
        </p>
      </div>

      {/* Booking Voucher Card */}
      <div id="printable-cue-card" className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden mb-8">
        {/* Header Bar */}
        <div className="bg-stone-900 text-white p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif-luxury text-2xl font-bold">Cherish Concierge</span>
              <span className="text-[11px] font-semibold bg-rose-600 text-white px-2 py-0.5 rounded-full">
                Booking Request
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Booking Ref: <strong className="text-stone-200 font-mono text-sm">{booking.bookingId}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Summary</span>
            </button>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-6 bg-gradient-to-r from-rose-50/80 via-white to-stone-50 border-b border-stone-100 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 border-2 border-rose-200 flex items-center justify-center flex-shrink-0">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">
              Questions About Your Booking?
            </span>
            <h4 className="text-lg font-bold text-stone-900">{CONCIERGE_TEAM_NAME}</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              WhatsApp {CONCIERGE_PHONE} or email {CONCIERGE_EMAIL}. Quote your booking reference so we can find your request quickly.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <a
                href={buildWhatsAppLink(
                  CONCIERGE_PHONE,
                  `Hi Cherish! Following up on my booking request ${booking.bookingId} (${booking.selectedTier}) for ${booking.eventDate}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={buildMailtoLink(
                  `Booking ${booking.bookingId}`,
                  `Hi Cherish,

Following up on my booking request ${booking.bookingId} (${booking.selectedTier}) for ${booking.eventDate}.

Thanks!`
                )}
                className="inline-flex items-center gap-2 text-xs font-semibold text-rose-900 bg-rose-100/70 hover:bg-rose-200 px-3 py-1.5 rounded-xl transition"
              >
                <Mail className="w-3.5 h-3.5 text-rose-700" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Event Logistics & Payment Receipt Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-stone-100">
          {/* Logistics */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Event Details & Logistics
            </h5>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-center gap-2.5 p-3 bg-stone-50 rounded-xl">
                <Calendar className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Requested Date:</span>
                  <span className="font-bold text-stone-900 text-sm">{booking.eventDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-stone-50 rounded-xl">
                <Clock className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Target Time / Moment:</span>
                  <span className="font-bold text-stone-900 text-sm">{booking.eventTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-stone-50 rounded-xl">
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px]">Location / City:</span>
                  <span className="font-bold text-stone-900 text-sm">{booking.cityLocation}</span>
                </div>
              </div>

              {booking.partnerName && (
                <div className="flex items-center gap-2.5 p-3 bg-stone-50 rounded-xl">
                  <Heart className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px]">Partner / Recipient:</span>
                    <span className="font-bold text-stone-900 text-sm">{booking.partnerName}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Deposit Summary */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Cost Estimate
            </h5>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Selected Tier:</span>
                <span className="font-bold text-stone-900">{booking.selectedTier}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Total Estimated Cost:</span>
                <span className="font-bold text-stone-900">R{booking.totalEstimatedAmount.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-sm">
                <span className="font-bold text-stone-900">Deposit to Secure Date:</span>
                <span className="font-bold text-rose-700 text-base">R{booking.depositPaid.toLocaleString()}</span>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
                <span>Balance Due on Event Day:</span>
                <span className="font-semibold text-stone-800">R{booking.balanceRemaining.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
              <ShieldCheck className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <span>Nothing has been charged. Final pricing is confirmed with you before any payment.</span>
            </div>
          </div>
        </div>

        {/* Script & Cue Sheet (if available from plan) */}
        {booking.plan && (
          <div className="p-6 sm:p-8 bg-stone-50/60 border-b border-stone-100 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <h5 className="font-serif-luxury text-xl font-bold text-stone-900">
                Your Customized Proposal Script & Cue Card
              </h5>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block mb-0.5">
                  Stage Direction & Cue:
                </span>
                <p className="text-xs text-stone-600 italic">
                  {booking.plan.tailoredScript.stageDirection}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                  What To Say:
                </span>
                <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
                  {booking.plan.tailoredScript.whatToSay}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                  Backup Words:
                </span>
                <p className="text-xs text-stone-600 italic">
                  {booking.plan.tailoredScript.backupWords}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps Checklist */}
        <div className="p-6 sm:p-8 space-y-3">
          <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            What Happens Next:
          </h5>
          <ul className="space-y-2">
            {NEXT_STEPS.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onViewAllBookings}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition text-center"
        >
          View All My Requests
        </button>
        <button
          onClick={onPlanAnother}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition text-center"
        >
          Plan Another Romantic Surprise
        </button>
      </div>
    </div>
  );
};
