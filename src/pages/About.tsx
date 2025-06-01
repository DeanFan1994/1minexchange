import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { certificatesData, teamMembersData } from '@/data/mock';

export default function About() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-20">
          <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">
            {language === 'en' ? 'About Us' : 'À propos de nous'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
                {language === 'en' ? 'Our Certifications' : 'Nos Certifications'}
              </h2>
              <div className="space-y-6">
                {certificatesData.map((cert) => (
                  <div key={cert.id} className="bg-[#003366] p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{cert.title}</h3>
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
                {language === 'en' ? 'Our Team' : 'Notre Équipe'}
              </h2>
              <div className="space-y-6">
                {teamMembersData.map((member) => (
                  <div key={member.id} className="bg-[#003366] p-6 rounded-lg shadow-lg flex items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-[#FFD700]">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}