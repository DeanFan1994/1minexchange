import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { exchangeRatesData } from '@/data/mock';

export default function LiveRates() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [ratesData, setRatesData] = useState(exchangeRatesData);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRatesData(prevData => 
        prevData.map(item => ({
          ...item,
          rate: item.rate + (Math.random() * 0.0002 - 0.0001),
          change: (Math.random() > 0.5 ? '+' : '-') + Math.random().toFixed(4).slice(0,5)
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 生成图表数据
  const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      time: i,
      rate: ratesData[0].rate + (Math.random() * 0.001 - 0.0005)
    }));
  };

  return (
    <div className="min-h-screen bg-[#005BAA] text-white font-['Inter']">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-12 text-center">
          {language === 'en' ? 'Live Exchange Rates' : 'Taux de change en direct'}
        </h1>
        
        {/* 实时汇率图表 */}
        <div className="bg-[#003366] p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
            {language === 'en' ? 'XAF/CNY Rate Trend' : 'Tendance du taux XAF/CNY'}
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#005BAA" />
                <XAxis dataKey="time" stroke="#FFD700" />
                <YAxis stroke="#FFD700" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#003366', borderColor: '#FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#FFD700" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#FFD700' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 主要货币对展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratesData.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#003366] p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#FFD700]">{item.pair}</h3>
                <span className={`text-lg ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
              <div className="text-3xl font-bold">
                {item.rate.toFixed(4)}
              </div>
              <div className="mt-2 text-sm text-gray-300">
                {language === 'en' ? 'Last updated: Just now' : 'Dernière mise à jour: À l\'instant'}
              </div>
            </div>
          ))}
        </div>
      </main>
      <WhatsAppButton />
    </div>
  );
}
