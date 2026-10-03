import React from 'react';
import { FileText } from 'lucide-react';
import terms from '../data/terms.json';

export const TermsPage: React.FC = () => {
  const { business } = terms;
  const details: [string, string | null][] = [
    ['Trading name', business.tradingName],
    ['Registered name', business.legalName],
    ['Registration number', business.registrationNumber],
    ['VAT number', business.vatNumber],
    ['Physical address', business.physicalAddress],
    ['Phone & WhatsApp', business.phone],
    ['Email', business.email],
    ['Website', business.website],
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Last updated {terms.lastUpdated}</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">{terms.title}</h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-4">{terms.intro}</p>
      </div>

      <div className="space-y-8">
        {terms.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">{section.heading}</h2>
            <div className="space-y-2.5">
              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm text-stone-700 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-3">Our details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-sm">
            {details
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <React.Fragment key={label}>
                  <dt className="text-stone-500">{label}</dt>
                  <dd className="text-stone-900 font-medium break-words">{value}</dd>
                </React.Fragment>
              ))}
          </dl>
        </section>
      </div>
    </div>
  );
};
