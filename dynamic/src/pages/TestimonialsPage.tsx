import { useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import Testimonials from '@/components/Testimonials';
import { testimonialsData } from '@/data/mock';

export default function TestimonialsPage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-12 text-center">
          {language === 'en' ? 'Customer Testimonials' : 'Témoignages Clients'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedTestimonial !== null ? (
            <div className="col-span-full">
              <div className="bg-[#003366] rounded-lg p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
                    <img
                      src={testimonialsData[selectedTestimonial].avatar}
                      alt={testimonialsData[selectedTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[#FFD700]">
                      {testimonialsData[selectedTestimonial].name}
                    </h3>
                    <p className="mt-4 text-lg">
                      "{testimonialsData[selectedTestimonial].comment}"
                    </p>
                    <button
                      onClick={() => setSelectedTestimonial(null)}
                      className="mt-6 px-4 py-2 bg-[#FFD700] text-[#005BAA] rounded hover:bg-[#E6C200] transition"
                    >
                      {language === 'en' ? 'Back to List' : 'Retour à la liste'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Testimonials 
              testimonials={testimonialsData} 
              onSelect={setSelectedTestimonial}
            />
          )}
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}
