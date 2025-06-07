import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Exchange from "@/pages/Exchange";
import TestimonialsPage from "@/pages/TestimonialsPage";
import Faq from "@/pages/Faq";
import Compliance from "@/pages/Compliance";
import LiveRates from "@/pages/LiveRates";
import Footer from "@/components/Footer";


import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/live-rates" element={<LiveRates />} />
          <Route path="/rates" element={<Navigate to="/live-rates" replace />} />
        </Routes>
        <Footer language={'en'} />
      </div>
    </AuthContext.Provider>
  );
}