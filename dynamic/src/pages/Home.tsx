import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import TrustBoard from '@/components/TrustBoard';
import LogoWall from '@/components/LogoWall';
import Testimonials from '@/components/Testimonials';
import { testimonialsData, logosData } from '@/data/mock';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [rate, setRate] = useState<number | null>(null);
  const [xaf, setXaf] = useState('');
  const [cny, setCny] = useState('');
  const [lastEdited, setLastEdited] = useState<'XAF' | 'CNY' | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://fetch-rate-calculation.onrender.com/api/exchange-rate");
        const data = await res.json();
        setRate(data.rate);
        const now = new Date();
        const localTime = now.toLocaleString();
        setLastUpdated(localTime);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };
    fetchRate();
  }, []);

  const calculate = async (type: 'XAF' | 'CNY', amount: number) => {
    if (!rate) return '';
    try {
      const res = await fetch("https://fetch-rate-calculation.onrender.com/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount, rate })
      });
      const data = await res.json();
      return data.result;
    } catch (error) {
      console.error("Calculation error:", error);
      return '';
    }
  };

  const handleXafChange = async (val: string) => {
    setLastEdited('XAF');
    setXaf(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && rate) {
      const result = await calculate("XAF", num);
      if (lastEdited !== 'CNY') {
        setCny(parseFloat(result).toFixed(2));
      }
    }
  };

  const handleCnyChange = async (val: string) => {
    setLastEdited('CNY');
    setCny(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && rate) {
      const result = await calculate("CNY", num);
      if (lastEdited !== 'XAF') {
        setXaf(parseFloat(result).toFixed(0));
      }
    }
  };

  const handleExchangeNow = () => {
    if (!xaf && !cny) {
      alert("Please enter an amount in either XAF or CNY before proceeding.");
      return;
    }
    const message = `Hi, I want to exchange ${xaf || '...'} XAF into ${cny || '...'} RMB, I am going to transfer money to you using MoMo, can I process it now?`;
    const url = `https://wa.me/237681805111?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#FFD700] mb-6">
            {language === 'en' ? 'Fast & Secure Money Exchange' : 'Échange d\'argent rapide et sécurisé'}
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-8">
            {language === 'en'
              ? 'Transfer money between Cameroon and China in minutes with the best rates'
              : 'Transférez de l\'argent entre le Cameroun et la Chine en quelques minutes avec les meilleurs taux'}
          </p>

          <div className="bg-white text-[#005BAA] rounded-lg shadow-lg p-6 max-w-xl mx-auto mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {language === 'en' ? 'Currency Converter' : 'Convertisseur de devises'}
            </h2>
            <div className="text-center text-green-600 font-semibold mb-2">
              {language === 'en' ? 'Current Exchange Rate' : 'Taux de change actuel'}: {rate ?? 'Loading...'}
            </div>
            <div className="text-center text-gray-600 text-sm mb-4">
              {language === 'en' ? 'Last updated: ' : 'Dernière mise à jour :'} {lastUpdated || '...'}
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 mb-4 bg-white">
              <img src="/images/flags/cm-flag.png" alt="Cameroon Flag" className="w-10 h-6 mr-2" />
              <input
                type="number"
                className="w-full focus:outline-none py-2"
                placeholder="XAF"
                value={xaf}
                onChange={(e) => handleXafChange(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 mb-2 bg-white">
              <img src="/images/flags/cn-flag.png" alt="China Flag" className="w-10 h-6 mr-2" />
              <input
                type="number"
                className="w-full focus:outline-none py-2"
                placeholder="CNY"
                value={cny}
                onChange={(e) => handleCnyChange(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600 mt-2 text-center">
              {language === 'en'
                ? '5% charges included already (minimum charges XAF 1k per transaction)'
                : 'Frais de 5% déjà inclus (minimum de XAF 1k par transaction)'}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleExchangeNow}
              className="bg-[#FFD700] text-[#005BAA] px-6 py-3 rounded-lg font-bold hover:bg-[#E6C200] transition"
            >
              {language === 'en' ? 'Exchange Now' : 'Échanger maintenant'}
            </button>
          </div>
        </div>

        <TrustBoard language={language} />
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center">
            {language === 'en' ? 'Our Services' : 'Nos Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i className="fa-solid fa-money-bill-transfer"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Currency Exchange' : 'Change de devises'}
              </h3>
              <p>
                {language === 'en' ? 'Competitive rates for XAF/CNY exchange' : 'Taux compétitifs pour l\'échange XAF/CNY'}
              </p>
            </div>
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i className="fa-solid fa-arrow-up-right-dots"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Fast Transfers' : 'Transferts rapides'}
              </h3>
              <p>
                {language === 'en' ? 'Send money to China in 3-5 minutes' : 'Envoyez de l\'argent en Chine en 3-5 minutes'}
              </p>
            </div>
            <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
              <div className="text-4xl text-[#FFD700] mb-4">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Secure Transactions' : 'Transactions sécurisées'}
              </h3>
              <p>
                {language === 'en' ? 'Fully licensed and regulated financial services' : 'Services financiers entièrement agréés et réglementés'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8 text-center">
            {language === 'en' ? 'Our Partners' : 'Nos Partenaires'}
          </h2>
          <LogoWall logos={logosData} />
        </div>

        <div className="mt-20 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">
            {language === 'en' ? 'What Our Clients Say' : 'Ce que disent nos clients'}
          </h2>
          <p className="text-xl text-center mb-8">
            {language === 'en' ? 'Trusted by merchants across Cameroon' : 'Fiable pour les commerçants à travers le Cameroun'}
          </p>
          <Testimonials testimonials={testimonialsData} />
        </div>

        <div className="mt-20 bg-[#003366] p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-6">
            {language === 'en' ? 'Ready to Exchange?' : 'Prêt à échanger?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'en' ? 'Join thousands of satisfied customers who trust us with their money transfers' : 'Rejoignez des milliers de clients satisfaits qui nous font confiance pour leurs transferts d\'argent'}
          </p>
          <a
            href="https://wa.me/237681805111"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFD700] text-[#005BAA] px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#E6C200] transition whitespace-nowrap min-w-[180px]"
          >
            {language === 'en' ? 'Start Now' : 'Commencez maintenant'}
          </a>
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}
