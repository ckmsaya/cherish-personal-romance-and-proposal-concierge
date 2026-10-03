import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink, CONCIERGE_PHONE } from '../lib/contact';

export const FloatingWhatsApp: React.FC = () => (
  <a
    href={buildWhatsAppLink(CONCIERGE_PHONE, "Hi Cherish! I'm planning a surprise and would love some help.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Cherish on WhatsApp"
    className="print:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-lg shadow-emerald-900/20 transition active:scale-95"
  >
    <MessageSquare className="w-5 h-5" />
    <span className="hidden sm:inline">Chat with us</span>
  </a>
);
