import React from 'react';
import { HeartHandshake, Sparkles, Calendar, BookOpen, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'catalog' | 'ai_architect' | 'customizer' | 'my_bookings';
  setActiveTab: (tab: 'catalog' | 'ai_architect' | 'customizer' | 'my_bookings') => void;
  bookingsCount: number;
  onOpenBespokeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, bookingsCount, onOpenBespokeModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div 
            id="brand-logo-container"
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-800 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-none">
                  Cherish
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 uppercase tracking-wider">
                  Concierge
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium hidden xs:block">
                Personal Romance & Proposal Assistance
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/60 text-xs font-semibold">
            <button
              id="nav-catalog-btn"
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-full transition-all duration-150 ${
                activeTab === 'catalog'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Curated Experiences
            </button>
            <button
              id="nav-ai-architect-btn"
              onClick={() => setActiveTab('ai_architect')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-150 ${
                activeTab === 'ai_architect'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Romance Architect</span>
            </button>
            <button
              id="nav-customizer-btn"
              onClick={() => setActiveTab('customizer')}
              className={`px-4 py-2 rounded-full transition-all duration-150 ${
                activeTab === 'customizer'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Services & Deposit
            </button>
            <button
              id="nav-bookings-btn"
              onClick={() => setActiveTab('my_bookings')}
              className={`relative px-4 py-2 rounded-full transition-all duration-150 ${
                activeTab === 'my_bookings'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>My Itineraries</span>
              {bookingsCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-600 rounded-full">
                  {bookingsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action: Bespoke Request, PWA Install & Guarantee */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-bespoke-unique-btn"
              onClick={onOpenBespokeModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Want Something Unique?</span>
              <span className="sm:hidden">Custom</span>
            </button>
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Discretion Guarantee</span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-stone-100 overflow-x-auto gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-stone-900 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            Experiences
          </button>
          <button
            onClick={onOpenBespokeModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap bg-rose-100 text-rose-900 border border-rose-300 font-bold"
          >
            <Sparkles className="w-3 h-3 text-rose-600" />
            <span>Unique?</span>
          </button>
          <button
            onClick={() => setActiveTab('ai_architect')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'ai_architect'
                ? 'bg-rose-600 text-white'
                : 'text-stone-700 bg-rose-50 border border-rose-200/60'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>AI Architect</span>
          </button>
          <button
            onClick={() => setActiveTab('customizer')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'customizer' ? 'bg-stone-900 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('my_bookings')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'my_bookings' ? 'bg-stone-900 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Itineraries {bookingsCount > 0 && `(${bookingsCount})`}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
