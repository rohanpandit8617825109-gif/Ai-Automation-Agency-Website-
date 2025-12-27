
import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const handleWhatsAppRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://wa.me/918617825109?text=Hi Rohan, I want to book a service with AI Connect.', '_blank');
  };

  const scrollToCases = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('cases');
    if (element) {
      const offset = 80;
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

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-hero">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <a href="#services" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-8 animate-pulse hover:bg-white/10 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          AI Automation Agency 2024
        </a>
        
        <h1 className="font-sora text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
          Scaling Businesses <br />
          <span className="text-gradient">With Intelligence.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-neutral-400 mb-12 leading-relaxed">
          We build autonomous ecosystems that handle your sales, support, and reviews while you focus on high-level strategy. Human creativity meets machine efficiency.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleWhatsAppRedirect}
            className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white transition-all transform hover:-translate-y-1"
          >
            Book Your Service <ArrowRight size={20} />
          </button>
          <button 
            onClick={scrollToCases}
            className="w-full sm:w-auto px-8 py-4 glass text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/20"
          >
            View Case Studies <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-20 max-w-5xl mx-auto glass rounded-2xl p-4 md:p-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold font-sora text-white">2.4k+</div>
            <div className="text-sm text-neutral-500">Hours Saved</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-sora text-white">45%</div>
            <div className="text-sm text-neutral-500">Revenue Lift</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-sora text-white">24/7</div>
            <div className="text-sm text-neutral-500">Uptime Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-sora text-white">100%</div>
            <div className="text-sm text-neutral-500">ROI Focused</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
