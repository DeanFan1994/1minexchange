import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import TrustBoard from '@/components/TrustBoard';
import LogoWall from '@/components/LogoWall';
import Testimonials from '@/components/Testimonials';
import { testimonialsData, logosData } from '@/data/mock';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#FFD700] mb-6">
            {language === 'en' ? 'Fast & Secure Money Exchange' : 'Échange d\'argent rapide et sécurisé'}
          </h1>
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cameroon%20national%20flag&sign=cdd0dcddab6a1c87a76d6d12b1167db3"
                alt="Cameroon Flag"
                className="w-24 h-16 object-cover rounded shadow-md hover:scale-105 transition-transform"
              />
              <span className="mt-2 text-sm">Cameroon</span>
            </div>
            <div className="flex flex-col items-center">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=China%20national%20flag&sign=7daeb87a27a0958ed03079a0ff1d896c"
                alt="China Flag"
                className="w-24 h-16 object-cover rounded shadow-md hover:scale-105 transition-transform"
              />
              <span className="mt-2 text-sm">China</span>
            </div>
          </div>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            {language === 'en' 
              ? 'Transfer money between Cameroon and China in minutes with the best rates'
              : 'Transférez de l\'argent entre le Cameroun et la Chine en quelques minutes avec les meilleurs taux'}
          </p>
           <div className="flex justify-center space-x-4">
            <a 
              href="https://wa.me/237681805111" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFD700] text-[#005BAA] px-6 py-3 rounded-lg font-bold hover:bg-[#E6C200] transition"
            >
              {language === 'en' ? 'Get Started' : 'Commencer'}
            </a>
            <button className="border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-lg font-bold hover:bg-[#003366] transition">
              {language === 'en' ? 'Learn More' : 'En savoir plus'}
            </button>
          </div>
        </div>

        <TrustBoard language={language} />

        {/* Services Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center">
            {language === 'en' ? 'Our Services' : 'Nos Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i class="fa-solid fa-money-bill-transfer"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Currency Exchange' : 'Change de devises'}
              </h3>
              <p>
                {language === 'en' 
                  ? 'Competitive rates for XAF/CNY, XAF/USD and other currency pairs'
                  : 'Taux compétitifs pour XAF/CNY, XAF/USD et autres paires de devises'}
              </p>
            </div>
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i class="fa-solid fa-arrow-up-right-dots"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Fast Transfers' : 'Transferts rapides'}
              </h3>
              <p>
                {language === 'en' 
                  ? 'Send money to China in 3-15 minutes only'
                  : 'Envoyez de l\'argent en Chine en seulement 3 à 15 minutes'}
              </p>
            </div>
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Secure Transactions' : 'Transactions sécurisées'}
              </h3>
              <p>
                {language === 'en' 
                  ? 'Fully licensed and regulated financial services'
                  : 'Services financiers entièrement agréés et réglementés'}
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center">
            {language === 'en' ? 'Our Partners' : 'Nos Partenaires'}
          </h2>
          <LogoWall logos={logosData} />
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">
            {language === 'en' ? 'What Our Clients Say' : 'Ce que disent nos clients'}
          </h2>
          <p className="text-xl text-center mb-8">
            {language === 'en' ? 'Trusted by merchants across Cameroon' : 'Fiable pour les commerçants à travers le Cameroun'}
          </p>
          <Testimonials testimonials={testimonialsData} />
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-[#003366] p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-6">
            {language === 'en' ? 'Ready to Exchange?' : 'Prêt à échanger?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Join thousands of satisfied customers who trust us with their money transfers'
              : 'Rejoignez des milliers de clients satisfaits qui nous font confiance pour leurs transferts d\'argent'}
          </p>
          <a 
            href="https://wa.me/237681805111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FFD700] text-[#005BAA] px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#E6C200] transition whitespace-nowrap"
          >
            {language === 'en' ? 'Start Now' : 'Commencez'}
          </a>
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}