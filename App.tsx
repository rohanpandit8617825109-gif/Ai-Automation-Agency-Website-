
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import AIStrategyTool from './components/AIStrategyTool';
import CaseStudies from './components/CaseStudies';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('ai_connect_session');
    if (session) {
      setUser(JSON.parse(session));
    } else {
      const timer = setTimeout(() => setShowAuth(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('ai_connect_session');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500/30 selection:text-cyan-400">
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Hero />
        <Services />
        <AIStrategyTool />
        <Process />
        <CaseStudies />
        <Pricing />
      </main>
      <Footer />
      <WhatsAppWidget />
      <AdminPanel />
      {showAuth && <AuthModal onAuthSuccess={handleAuthSuccess} onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default App;
