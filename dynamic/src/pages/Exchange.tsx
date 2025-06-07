import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

interface ExchangeRate {
  xafToCny: number;
  cnyToXaf: number;
  updatedAt: string;
}

export default function Exchange() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [xafAmount, setXafAmount] = useState<string>('');
  const [cnyAmount, setCnyAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    xafToCny: 0.012,
    cnyToXaf: 83.33,
    updatedAt: "2023-11-15T10:00:00"
  });

  const handleXafChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setXafAmount(value);
      if (value) {
        const result = parseFloat(value) * exchangeRate.xafToCny;
        setCnyAmount(result.toFixed(2));
      } else {
        setCnyAmount('');
      }
    }
  };

  const handleCnyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCnyAmount(value);
      if (value) {
        const result = parseFloat(value) * exchangeRate.cnyToXaf;
        setXafAmount(result.toFixed(2));
      } else {
        setXafAmount('');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-12 text-center">
          {language === 'en' ? 'Exchange Rates' : 'Taux de change'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* XAF to CNY */}
          <div className="bg-[#003366] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
              {language === 'en' ? 'XAF to CNY' : 'XAF vers CNY'}
            </h2>
            <div className="mb-4">
              <label className="block mb-2">
                {language === 'en' ? 'XAF Amount' : 'Montant XAF'}
              </label>
              <input
                type="text"
                value={xafAmount}
                onChange={handleXafChange}
                className="w-full p-3 rounded bg-[#002244] border border-[#005BAA] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition"
                placeholder="0.00"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                {language === 'en' ? 'CNY Equivalent' : 'Équivalent CNY'}
              </label>
              <input
                type="text"
                value={cnyAmount}
                readOnly
                className="w-full p-3 rounded bg-[#002244] border border-[#005BAA] cursor-not-allowed"
              />
            </div>
          </div>

          {/* CNY to XAF */}
          <div className="bg-[#003366] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
              {language === 'en' ? 'CNY to XAF' : 'CNY vers XAF'}
            </h2>
            <div className="mb-4">
              <label className="block mb-2">
                {language === 'en' ? 'CNY Amount' : 'Montant CNY'}
              </label>
              <input
                type="text"
                value={cnyAmount}
                onChange={handleCnyChange}
                className="w-full p-3 rounded bg-[#002244] border border-[#005BAA] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition"
                placeholder="0.00"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                {language === 'en' ? 'XAF Equivalent' : 'Équivalent XAF'}
              </label>
              <input
                type="text"
                value={xafAmount}
                readOnly
                className="w-full p-3 rounded bg-[#002244] border border-[#005BAA] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          {language === 'en' ? 'Exchange rates updated at: ' : 'Taux de change mis à jour le: '}
          {formatDate(exchangeRate.updatedAt)}
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}
