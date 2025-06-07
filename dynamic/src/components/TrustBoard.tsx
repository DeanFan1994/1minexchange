import { motion } from 'framer-motion';
import useCounter from '@/hooks/useCounter';

interface TrustBoardProps {
  language: 'en' | 'fr';
}

export default function TrustBoard({ language }: TrustBoardProps) {
  const count = useCounter(10000, 2000);

  return (
    <div className="bg-[#003366] p-8 rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-4">
          {language === 'en' ? 'Trusted by over' : 'Fiable pour plus de'}
        </h1>
        <motion.div
          className="text-6xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count.toLocaleString()}+
        </motion.div>
        <p className="text-xl mt-4">
          {language === 'en' ? 'Customers in Cameroon' : 'Clients au Cameroun'}
        </p>
      </div>
    </div>
  );
}