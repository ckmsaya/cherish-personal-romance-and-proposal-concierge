import React from 'react';
import { Calendar, Clock, MapPin, UserCheck, ShieldCheck, ArrowRight, HeartHandshake, Phone, Mail, Sparkles, MessageSquare } from 'lucide-react';
import { BookingConfirmation, BespokeInquiry } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/contact';

interface ActiveBookingsListProps {
  bookings: BookingConfirmation[];
  bespokeInquiries?: BespokeInquiry[];
  onSelectBooking: (booking: BookingConfirmation) => void;
  onNewBookingClick: () => void;
  onOpenBespokeModal?: () => void;
}

export const ActiveBookingsList: React.FC<ActiveBookingsListProps> = ({
  bookings,
  bespokeInquiries = [],
  onSelectBooking,
  onNewBookingClick,
  onOpenBespokeModal,
}) => {
  const totalItems = bookings.length + bespokeInquiries.length;

  if (totalItems === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          No Booked Surprises or Inquiries Yet
        </h3>
        <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
          Have an upcoming proposal, date night, graduation, or bespoke surprise in mind? Let our personal concierge craft the experience and handle the stress.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNewBookingClick}
            className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition"
          >
            Explore Experiences & Book
          </button>
          {onOpenBespokeModal && (
            <button
              onClick={onOpenBespokeModal}
              className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Submit Bespoke Request</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
            My Concierge Reservations & Inquiries
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Access your personalized cue cards, vendor squad contacts, and tailored bespoke briefs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenBespokeModal && (
            <button
              onClick={onOpenBespokeModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold transition border border-rose-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>+ Custom Dream</span>
            </button>
          )}
          <button
            onClick={onNewBookingClick}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition"
          >
            <span>+ Plan Another Event</span>
          </button>
        </div>
      </div>

      {/* Bespoke Inquiries Section */}
      {bespokeInquiries.length > 0 && (
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Bespoke Tailored Consultations ({bespokeInquiries.length})
            </h3>
          </div>

          {bespokeInquiries.map((inquiry) => (
            <div
              key={inquiry.inquiryId}
              className="bg-gradient-to-r from-stone-900 to-rose-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-rose-300">#{inquiry.inquiryId}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-700 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      {inquiry.status}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-white">
                    {inquiry.occasion}
                  </h4>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-stone-400 block">Estimated Budget:</span>
                  <span className="text-sm font-semibold text-rose-200">{inquiry.budgetExpectation}</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 my-3 leading-relaxed italic bg-black/20 p-3 rounded-xl border border-white/5">
                "{inquiry.customVision}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span>Location: <strong>{inquiry.locationArea}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span>Timeline: <strong>{inquiry.targetTimeline}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={inquiry.assignedConcierge.avatar}
                    alt={inquiry.assignedConcierge.name}
                    className="w-7 h-7 rounded-full object-cover border border-rose-400"
                  />
                  <span className="text-xs text-stone-200">
                    Lead Director: <strong>{inquiry.assignedConcierge.name}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={inquiry.whatsappQuickLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a
                    href={buildMailtoLink(
                      `Bespoke Inquiry #${inquiry.inquiryId}`,
                      `Hi ${inquiry.assignedConcierge.name},\n\nFollowing up on my bespoke inquiry #${inquiry.inquiryId} for a ${inquiry.occasion}.\n\nThanks!`
                    )}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booked Events Section */}
      {bookings.length > 0 && (
        <div className="space-y-4">
          {bespokeInquiries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Confirmed Reservations ({bookings.length})
              </h3>
            </div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              onClick={() => onSelectBooking(booking)}
              className="group bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-rose-200 transition cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-rose-700">{booking.bookingId}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Deposit Confirmed
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-rose-700 transition">
                    {booking.plan?.conceptTitle || `${booking.selectedTier} Reservation`}
                  </h4>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-500 block">Deposit Paid:</span>
                  <span className="text-lg font-bold text-stone-900">R{booking.depositPaid.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Date: <strong>{booking.eventDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Time: <strong>{booking.eventTime}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Location: <strong>{booking.cityLocation}</strong></span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={booking.assignedConcierge.avatar}
                    alt={booking.assignedConcierge.name}
                    className="w-7 h-7 rounded-full object-cover border border-rose-200"
                  />
                  <span className="text-xs text-stone-700">
                    Concierge Director: <strong>{booking.assignedConcierge.name}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={buildWhatsAppLink(
                      booking.assignedConcierge.phone,
                      `Hi ${booking.assignedConcierge.name}! Following up on my booking ${booking.bookingId} (${booking.selectedTier}) for ${booking.eventDate}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                    aria-label={`WhatsApp ${booking.assignedConcierge.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={buildMailtoLink(
                      `Booking ${booking.bookingId}`,
                      `Hi ${booking.assignedConcierge.name},\n\nFollowing up on my booking ${booking.bookingId} (${booking.selectedTier}) for ${booking.eventDate}.\n\nThanks!`
                    )}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
                    aria-label="Email concierge"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <span className="flex items-center gap-1 text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
                    <span>View Full Cue Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

