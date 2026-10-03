import express from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Real contact channel for every booking and inquiry (no individual staff personas)
const CONCIERGE_TEAM = {
  name: 'Cherish Concierge Team',
  title: 'Cherish Concierge',
  avatar: '',
  phone: '+27 64 626 1102',
  bio: 'We plan and coordinate your surprise with you directly over WhatsApp, phone, or email.',
};

// Initialize Supabase (server-only service_role client — never expose this key to the browser)
let supabase: SupabaseClient | null = null;
const getSupabaseClient = (): SupabaseClient | null => {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return supabase;
};

export function createApiApp() {
  const app = express();
  app.use(express.json());

  // POST /api/book-deposit: Secure Concierge Reservation & Deposit Lock
  app.post('/api/book-deposit', async (req, res) => {
    try {
      const {
        deviceId = null,
        clientName = 'Valued Client',
        clientPhone = '',
        clientEmail = '',
        occasion = 'wedding_proposal',
        partnerName = '',
        eventDate = '',
        eventTime = '',
        cityLocation = 'Cape Town, Western Cape',
        selectedTier = 'Enchanted Experience',
        totalEstimatedAmount = 6500,
        depositAmount = 1500,
        selectedAddons = [],
        specialNotes = '',
        plan = null,
      } = req.body;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const bookingId = `CHR-ZA-${new Date().getFullYear()}-${randomSuffix}`;

      const assignedConcierge = CONCIERGE_TEAM;

      const booking = {
        bookingId,
        status: 'Quote Request Received',
        clientName,
        clientPhone,
        clientEmail,
        occasion,
        partnerName,
        eventDate,
        eventTime,
        cityLocation,
        selectedTier,
        totalEstimatedAmount,
        depositPaid: depositAmount,
        balanceRemaining: totalEstimatedAmount - depositAmount,
        selectedAddons,
        specialNotes,
        assignedConcierge,
        depositReceiptNumber: '',
        bookedAt: new Date().toISOString(),
        conciergeDirectChannel: `WhatsApp ${CONCIERGE_TEAM.phone}`,
        nextSteps: [
          'We check availability for your date, location, and the extras you selected.',
          'We send your personalised quote on WhatsApp or email, usually within one business day.',
          'If you accept, an EFT deposit secures your date. No payment is taken on this website.',
        ],
        plan,
      };

      const db = getSupabaseClient();
      if (db && deviceId) {
        const { error: insertError } = await db.from('bookings').insert({
          booking_id: booking.bookingId,
          device_id: deviceId,
          status: booking.status,
          client_name: booking.clientName,
          client_phone: booking.clientPhone,
          client_email: booking.clientEmail,
          occasion: booking.occasion,
          partner_name: booking.partnerName,
          event_date: booking.eventDate,
          event_time: booking.eventTime,
          city_location: booking.cityLocation,
          selected_tier: booking.selectedTier,
          total_estimated_amount: booking.totalEstimatedAmount,
          deposit_paid: booking.depositPaid,
          balance_remaining: booking.balanceRemaining,
          selected_addons: booking.selectedAddons,
          special_notes: booking.specialNotes,
          assigned_concierge: booking.assignedConcierge,
          deposit_receipt_number: booking.depositReceiptNumber,
          booked_at: booking.bookedAt,
          concierge_direct_channel: booking.conciergeDirectChannel,
          next_steps: booking.nextSteps,
          plan: booking.plan,
        });
        if (insertError) {
          console.error('Supabase error saving booking (booking still confirmed for the client):', insertError);
        }
      }

      return res.json({ success: true, booking });
    } catch (error) {
      console.error('Server error booking deposit:', error);
      return res.status(500).json({ error: 'Failed to process deposit booking' });
    }
  });

  // GET /api/bookings?deviceId=...: Retrieve this device's saved bookings from Supabase
  app.get('/api/bookings', async (req, res) => {
    try {
      const deviceId = typeof req.query.deviceId === 'string' ? req.query.deviceId : '';
      const db = getSupabaseClient();
      if (!db || !deviceId) return res.json({ success: true, bookings: [] });

      const { data, error } = await db
        .from('bookings')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching bookings:', error);
        return res.json({ success: true, bookings: [] });
      }

      const bookings = (data || []).map((row) => ({
        bookingId: row.booking_id,
        status: row.status,
        clientName: row.client_name,
        clientPhone: row.client_phone,
        clientEmail: row.client_email,
        occasion: row.occasion,
        partnerName: row.partner_name,
        eventDate: row.event_date,
        eventTime: row.event_time,
        cityLocation: row.city_location,
        selectedTier: row.selected_tier,
        totalEstimatedAmount: row.total_estimated_amount,
        depositPaid: row.deposit_paid,
        balanceRemaining: row.balance_remaining,
        selectedAddons: row.selected_addons,
        specialNotes: row.special_notes,
        assignedConcierge: row.assigned_concierge,
        depositReceiptNumber: row.deposit_receipt_number,
        bookedAt: row.booked_at,
        conciergeDirectChannel: row.concierge_direct_channel,
        nextSteps: row.next_steps,
        plan: row.plan,
      }));

      return res.json({ success: true, bookings });
    } catch (error) {
      console.error('Server error fetching bookings:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // POST /api/bespoke-inquiry: Want Something Unique? Custom Vision Brief & Concierge Consultation
  app.post('/api/bespoke-inquiry', async (req, res) => {
    try {
      const {
        deviceId = null,
        clientName = 'Valued Client',
        clientPhone = '',
        clientEmail = '',
        contactPreference = 'whatsapp',
        occasion = 'Unique Custom Surprise',
        customVision = '',
        locationArea = 'Cape Town or Anywhere in South Africa',
        targetTimeline = 'Flexible in the next 1-2 months',
        budgetExpectation = 'Tailored to concept',
        discreetGuarantee = true,
      } = req.body;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const inquiryId = `BESPOKE-ZA-${new Date().getFullYear()}-${randomSuffix}`;

      const assignedConcierge = CONCIERGE_TEAM;

      const prefilledText = encodeURIComponent(
        `Hi Cherish! I just submitted my unique bespoke brief #${inquiryId} on Cherish for a ${occasion} in ${locationArea}. Here's what I have in mind: "${customVision.slice(0, 100)}..." Excited to discuss how we can tailor it!`
      );
      const cleanPhone = assignedConcierge.phone.replace(/[^0-9]/g, '');
      const whatsappQuickLink = `https://wa.me/${cleanPhone}?text=${prefilledText}`;

      const inquiry = {
        inquiryId,
        status: 'Bespoke Brief Received',
        clientName,
        clientPhone,
        clientEmail,
        contactPreference,
        occasion,
        customVision,
        locationArea,
        targetTimeline,
        budgetExpectation,
        discreetGuarantee,
        submittedAt: new Date().toISOString(),
        assignedConcierge,
        whatsappQuickLink,
        guaranteeMessage: 'Your idea stays private between you and our team.',
      };

      const db = getSupabaseClient();
      if (db && deviceId) {
        const { error: insertError } = await db.from('bespoke_inquiries').insert({
          inquiry_id: inquiry.inquiryId,
          device_id: deviceId,
          status: inquiry.status,
          client_name: inquiry.clientName,
          client_phone: inquiry.clientPhone,
          client_email: inquiry.clientEmail,
          contact_preference: inquiry.contactPreference,
          occasion: inquiry.occasion,
          custom_vision: inquiry.customVision,
          location_area: inquiry.locationArea,
          target_timeline: inquiry.targetTimeline,
          budget_expectation: inquiry.budgetExpectation,
          discreet_guarantee: inquiry.discreetGuarantee,
          submitted_at: inquiry.submittedAt,
          assigned_concierge: inquiry.assignedConcierge,
          whatsapp_quick_link: inquiry.whatsappQuickLink,
          guarantee_message: inquiry.guaranteeMessage,
        });
        if (insertError) {
          console.error('Supabase error saving bespoke inquiry (inquiry still confirmed for the client):', insertError);
        }
      }

      return res.json({ success: true, inquiry });
    } catch (error) {
      console.error('Server error handling bespoke inquiry:', error);
      return res.status(500).json({ error: 'Failed to process bespoke inquiry' });
    }
  });

  // GET /api/bespoke-inquiries?deviceId=...: Retrieve this device's saved bespoke inquiries from Supabase
  app.get('/api/bespoke-inquiries', async (req, res) => {
    try {
      const deviceId = typeof req.query.deviceId === 'string' ? req.query.deviceId : '';
      const db = getSupabaseClient();
      if (!db || !deviceId) return res.json({ success: true, inquiries: [] });

      const { data, error } = await db
        .from('bespoke_inquiries')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching bespoke inquiries:', error);
        return res.json({ success: true, inquiries: [] });
      }

      const inquiries = (data || []).map((row) => ({
        inquiryId: row.inquiry_id,
        status: row.status,
        clientName: row.client_name,
        clientPhone: row.client_phone,
        clientEmail: row.client_email,
        contactPreference: row.contact_preference,
        occasion: row.occasion,
        customVision: row.custom_vision,
        locationArea: row.location_area,
        targetTimeline: row.target_timeline,
        budgetExpectation: row.budget_expectation,
        discreetGuarantee: row.discreet_guarantee,
        submittedAt: row.submitted_at,
        assignedConcierge: row.assigned_concierge,
        whatsappQuickLink: row.whatsapp_quick_link,
        guaranteeMessage: row.guarantee_message,
      }));

      return res.json({ success: true, inquiries });
    } catch (error) {
      console.error('Server error fetching bespoke inquiries:', error);
      return res.status(500).json({ error: 'Failed to fetch bespoke inquiries' });
    }
  });

  return app;
}
