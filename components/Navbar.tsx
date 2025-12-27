
import React from 'react';
import { Cpu, User, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user?: any;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://wa.me/918617825109?text=Hi Rohan, I want to book a call for AI Connect services.', '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu size={24} className="text-white" />
          </div>
          <span className="font-sora text-xl font-bold tracking-tight">AI<span className="text-cyan-400">Connect</span></span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Services</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white transition-colors">Pricing</a>
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  <ShieldCheck size={12} />
                  Verified Member
                </div>
                <span className="text-[10px] text-neutral-500 max-w-[120px] truncate">{user.email}</span>
              </div>
              <div className="relative group">
                <button className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-400/20 transition-all">
                  <User size={18} className="text-white" />
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-neutral-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={onLogout}
                    className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleWhatsAppRedirect}
              className="px-6 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-cyan-400 transition-all active:scale-95 inline-block"
            >
              Book a Call
            </button>
          )}
        </div>

        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
