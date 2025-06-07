import { Link } from 'react-router-dom';

interface FooterProps {
  language: 'en' | 'fr';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="bg-[#003366] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">
              {language === 'en' ? 'Contact Us' : 'Contactez-nous'}
            </h3>
            <div className="space-y-2">
              <p>Dean</p>
              <p>Douala, Cameroon</p>
              <div className="flex flex-col">
                <a href="tel:+237681805111" className="hover:text-[#FFD700] transition">+237 681 805 111</a>
                <a href="tel:+8618120243037" className="hover:text-[#FFD700] transition">+86 181 2024 3037</a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">
              {language === 'en' ? 'Quick Links' : 'Liens rapides'}
            </h3>
            <div className="space-y-2">
              <Link to="/about" className="block hover:text-[#FFD700] transition">
                {language === 'en' ? 'About' : 'À propos'}
              </Link>
              <Link to="/exchange" className="block hover:text-[#FFD700] transition">
                {language === 'en' ? 'Exchange' : 'Échange'}
              </Link>
              <Link to="/faq" className="block hover:text-[#FFD700] transition">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">
              {language === 'en' ? 'Service Hours' : 'Heures de service'}
            </h3>
            <div className="space-y-2">
              <p>{language === 'en' ? '24/7 Service Available' : 'Service disponible 24h/24, 7j/7'}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#005BAA] mt-8 pt-6 text-center">
          <p>© {new Date().getFullYear()} 1min Exchange. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
        </div>
      </div>
    </footer>
  );
}
