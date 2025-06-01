import { useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { certificatesData } from '@/data/mock';

export default function Compliance() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-12 text-center">
          {language === 'en' ? 'Compliance Certifications' : 'Certifications de Conformité'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-[#003366] p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedImage(cert.image)}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">{cert.title}</h3>
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-auto rounded-lg shadow-md hover:opacity-90 transition"
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img 
                src={selectedImage} 
                alt="Enlarged certificate" 
                className="w-full h-auto max-h-screen object-contain"
              />
            </div>
          </div>
        )}
      </main>
      <WhatsAppButton />
    </div>
  );
}
