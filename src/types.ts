export type OccasionType =
  | 'ask_out'
  | 'wedding_proposal'
  | 'romantic_picnic'
  | 'scavenger_hunt'
  | 'flowers_chocolates'
  | 'graduation_surprise'
  | 'bachelor_bachelorette'
  | 'anniversary_date'
  | 'custom_surprise';

export type ScaleTier = 'sweet' | 'enchanted' | 'cinematic';

export interface ServiceTierOption {
  id: ScaleTier;
  name: string;
  badge: string;
  basePrice: number;
  depositAmount: number;
  description: string;
  highlights: string[];
  idealFor: string;
}

export interface VendorAddon {
  id: string;
  name: string;
  category: 'music' | 'photo_video' | 'decor' | 'gifts' | 'transport' | 'coaching';
  price: number;
  description: string;
  popularWith: string;
}

export interface PreDesignedExperience {
  id: string;
  title: string;
  occasion: OccasionType;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  galleryImages: string[];
  recommendedTier: ScaleTier;
  startingPrice: number;
  depositPrice: number;
  defaultPartnerInterests: string[];
  sampleScriptSnippet: string;
  includedVendors: string[];
  stressReliefFact: string;
}

export interface TailoredScript {
  stageDirection: string;
  whatToSay: string;
  backupWords: string;
}

export interface TimelineStep {
  time: string;
  step: string;
  details: string;
  whoIsDoingWhat: string;
}

export interface VendorSquadMember {
  role: string;
  serviceDescription: string;
  estimatedCost: string;
  status: string;
}

export interface ProposalPlan {
  conceptTitle: string;
  tagline: string;
  overview: string;
  tailoredScript: TailoredScript;
  timeline: TimelineStep[];
  vendorSquad: VendorSquadMember[];
  conciergeAdvice: string[];
  contingencyPlan: string;
  // Metadata for custom plans
  occasion?: OccasionType;
  partnerName?: string;
  scaleTier?: ScaleTier;
  targetDate?: string;
  targetCity?: string;
}

export interface ConciergeAgent {
  name: string;
  title: string;
  avatar: string;
  phone: string;
  bio: string;
}

export interface BookingConfirmation {
  bookingId: string;
  status: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  occasion: string;
  partnerName: string;
  eventDate: string;
  eventTime: string;
  cityLocation: string;
  selectedTier: string;
  totalEstimatedAmount: number;
  depositPaid: number;
  balanceRemaining: number;
  selectedAddons: string[];
  specialNotes?: string;
  assignedConcierge: ConciergeAgent;
  depositReceiptNumber: string;
  bookedAt: string;
  conciergeDirectChannel: string;
  nextSteps: string[];
  plan?: ProposalPlan;
}

export interface BespokeInquiry {
  inquiryId: string;
  status: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  contactPreference: 'whatsapp' | 'call' | 'email';
  occasion: string;
  customVision: string;
  locationArea: string;
  targetTimeline: string;
  budgetExpectation: string;
  discreetGuarantee: boolean;
  submittedAt: string;
  assignedConcierge: ConciergeAgent;
  whatsappQuickLink: string;
  guaranteeMessage: string;
}
