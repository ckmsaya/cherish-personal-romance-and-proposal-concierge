import express from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

  // POST /api/generate-plan: Tailored Proposal & Romantic Surprise Architect
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const {
        partnerName = 'Partner',
        scaleTier = 'enchanted',
      } = req.body;

      // Curated high-craft concierge template tailored to South African setting and scale
      const fallbackPlan = {
        conceptTitle: `The "${scaleTier === 'cinematic' ? 'Winelands Sunset Serenade' : scaleTier === 'sweet' ? 'Sweet Protea Note' : 'Enchanted Signal Hill'}" Surprise for ${partnerName}`,
        tagline: `A seamless Mzansi romance curated with Cape Cap Classique, fynbos styling, and golden hour sunset views.`,
        overview: `From the moment ${partnerName} arrives at the scenic overlook, every subtle detail feels effortlessly serendipitous. We handle the site permits, secret telephoto photography, ambient acoustic strings, and live WhatsApp cue cards behind the scenes so you can remain 100% relaxed.\n\nAs you arrive for sunset sundowners, our team discreetly signals the secret photographer stationed nearby to capture genuine tears and joy against the breathtaking South African landscape.`,
        tailoredScript: {
          stageDirection: `Take a gentle breath as the sunset turns golden over the horizon. Gently take both of ${partnerName}'s hands into yours. Pause for three seconds while the acoustic guitar softens.`,
          whatToSay: `"${partnerName}, from the days we first shared our dreams together to all the laughter we've built, being with you makes every day in my life extraordinary. You inspire me with your heart and your incredible spirit. I don't just want this moment; I want all our tomorrows together. Will you take this next chapter with me?"`,
          backupWords: `"${partnerName}, you have my whole heart, and I couldn't imagine doing this life with anyone else. I love you so much."`,
        },
        timeline: [
          {
            time: 'T-Minus 90 Min',
            step: 'Vendor & Fynbos Styling',
            details: 'Concierge arrives on-site to arrange King Proteas, glass hurricane lanterns, acoustic sound check, and wind shield setup.',
            whoIsDoingWhat: 'Lead SA Concierge & Styling Squad',
          },
          {
            time: 'T-Minus 20 Min',
            step: 'WhatsApp Green-Light Check',
            details: 'You receive a discreet WhatsApp confirmation that the setting is 100% prepared, private, and photographer in position.',
            whoIsDoingWhat: 'Concierge WhatsApp Hotline',
          },
          {
            time: 'The Moment (00:00)',
            step: 'The Reveal & Proposal / Surprise',
            details: 'You guide your partner to the sunset vantage point. The acoustic melody begins softly; you deliver your heartfelt words.',
            whoIsDoingWhat: 'Client & Partner (Photographer shooting 200mm telephoto discreetly)',
          },
          {
            time: '+15 Min',
            step: 'Cap Classique Toast & Artisanal Board',
            details: 'Chilled Méthode Cap Classique (Graham Beck / Pongrácz) uncorked with an artisanal Cape cheese and truffle grazing board.',
            whoIsDoingWhat: 'Hospitality Captain & Florist Hand-off',
          },
          {
            time: '+35 Min',
            step: 'Golden Hour Portrait Mini-Shoot',
            details: '20 minutes of relaxed, joyful portraits while the adrenaline and smiles are at their highest peak.',
            whoIsDoingWhat: 'Lead Photographer & Director',
          },
        ],
        vendorSquad: [
          {
            role: 'Lead Concierge Director',
            serviceDescription: 'On-site live coordination, time-keeper, load-shedding battery backup, cue signaling.',
            estimatedCost: 'Included in Service Tier',
            status: 'Confirmed & Assigned',
          },
          {
            role: 'Discreet Candid Photographer',
            serviceDescription: 'Telephoto surprise coverage + 30-min sunset portrait session with high-res same-day preview gallery.',
            estimatedCost: scaleTier === 'cinematic' ? 'R4,800' : 'R2,500',
            status: 'Included in Concierge Dispatch',
          },
          {
            role: 'Cape Floral & Protea Stylist',
            serviceDescription: 'King Proteas, indigenous fynbos, hurricane glass lanterns, plush rugs, and complete pack-down.',
            estimatedCost: scaleTier === 'cinematic' ? 'R5,500' : 'R2,200',
            status: 'Included in Concierge Dispatch',
          },
          {
            role: 'Live Acoustic Soloist (Guitar / Sax / Violin)',
            serviceDescription: 'Performs 3 special requested songs as you approach and during the celebratory Cap Classique toast.',
            estimatedCost: 'R2,200',
            status: scaleTier === 'sweet' ? 'Optional Add-on' : 'Included in Concierge Dispatch',
          },
        ],
        conciergeAdvice: [
          'Do not rush your words: when your partner looks surprised, allow a few seconds for the beauty and emotion of the moment to settle.',
          'Keep your phone on silent; your concierge will only vibrate your smartwatch or send quiet one-word status codes on WhatsApp.',
          'Remember that nervousness is totally normal and endearing; genuine love always creates the best memory.',
        ],
        contingencyPlan: 'In the event of Cape Doctor gale-force winds or Highveld afternoon thunderstorms, our team holds a private sheltered wine cellar or covered botanical glasshouse alcove at zero surcharge.',
      };

      return res.json({ success: true, plan: fallbackPlan });
    } catch (error) {
      console.error('Server error generating plan:', error);
      return res.status(500).json({ error: 'Failed to generate tailored proposal plan' });
    }
  });

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

      const concierges = [
        {
          name: 'Sipho Dlamini',
          title: 'Senior Romance Director & Winelands Specialist',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Orchestrated over 280 unforgettable proposals and sunset picnics across Cape Town, Franschhoek, and Stellenbosch.',
        },
        {
          name: 'Naledi Khumalo',
          title: 'Lead Proposal Architect & Gauteng Director',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Specialist in luxury rooftop moments, Cradle of Humankind surprises, and milestone graduation galas across Jozi and Pretoria.',
        },
        {
          name: 'Liezl van der Merwe',
          title: 'Coastal Moments & Luxury Picnic Lead',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Durban, Ballito, and Garden Route specialist creating barefoot beach setups, oyster bars, and acoustic serenade surprises.',
        },
      ];

      const assignedConcierge = concierges[Math.floor(Math.random() * concierges.length)];

      const booking = {
        bookingId,
        status: 'Deposit Confirmed & Concierge Assigned',
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
        depositReceiptNumber: `REC-ZA-${Date.now().toString().slice(-6)}`,
        bookedAt: new Date().toISOString(),
        conciergeDirectChannel: 'VIP Concierge WhatsApp & SMS hotline activated',
        nextSteps: [
          'No stress, you are sorted! Your date, location permit, and vendors are officially locked in.',
          `Your dedicated concierge ${assignedConcierge.name} will message you on WhatsApp within 2 hours to confirm details.`,
          'You will receive a rehearsal guide and printable pocket cue card 48 hours prior to the event.',
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

      const concierges = [
        {
          name: 'Sipho Dlamini',
          title: 'Senior Romance Director & Winelands Specialist',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Orchestrated over 280 unforgettable proposals, helicopter cliffside flips, and private estate buyouts across South Africa.',
        },
        {
          name: 'Naledi Khumalo',
          title: 'Lead Proposal Architect & Gauteng/Safari Director',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Specialist in custom bushveld safari moments, Magaliesberg balloon landings, and bespoke city rooftop spectacles.',
        },
        {
          name: 'Liezl van der Merwe',
          title: 'Coastal Romance & Luxury Tailored Experience Lead',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          phone: '+27 64 626 1102',
          bio: 'Garden Route & KwaZulu-Natal coast specialist for barefoot luxury, private catamarans, and secluded cove setups.',
        },
      ];

      // Pick concierge matching location if possible
      let assignedConcierge = concierges[0];
      const locLower = (locationArea || '').toLowerCase();
      if (locLower.includes('jozi') || locLower.includes('johannesburg') || locLower.includes('pretoria') || locLower.includes('safari') || locLower.includes('kruger')) {
        assignedConcierge = concierges[1];
      } else if (locLower.includes('durban') || locLower.includes('ballito') || locLower.includes('natal') || locLower.includes('garden route')) {
        assignedConcierge = concierges[2];
      }

      const prefilledText = encodeURIComponent(
        `Hi ${assignedConcierge.name}! I just submitted my unique bespoke brief #${inquiryId} on Cherish for a ${occasion} in ${locationArea}. Here's what I have in mind: "${customVision.slice(0, 100)}..." Excited to discuss how we can tailor it!`
      );
      const cleanPhone = assignedConcierge.phone.replace(/[^0-9]/g, '');
      const whatsappQuickLink = `https://wa.me/${cleanPhone}?text=${prefilledText}`;

      const inquiry = {
        inquiryId,
        status: 'Bespoke Brief Received & Lead Director Assigned',
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
        guaranteeMessage: 'Your unique idea is held under strict non-disclosure and 100% discretion. We never spoil surprises.',
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
