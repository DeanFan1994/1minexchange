import { useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { faqData } from '@/data/mock';

interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export default function Faq() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-12 text-center">
          {language === 'en' ? 'Frequently Asked Questions' : 'Questions fréquemment posées'}
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
                {category}
              </h2>
              <div className="space-y-2">
                {faqData
                  .filter(item => item.category === category)
                  .map(item => (
                    <div key={item.id} className="bg-[#003366] rounded-lg overflow-hidden shadow-lg">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-[#002244] transition"
                      >
                        <span className="font-medium">{item.question}</span>
                        <i className={`fa-solid ${expandedId === item.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </button>
                      {expandedId === item.id && (
                        <div className="p-4 border-t border-[#005BAA]">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}
