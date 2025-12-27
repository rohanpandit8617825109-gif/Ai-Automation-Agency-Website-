
import React, { useState } from 'react';
import { Cpu, Instagram, ArrowUpRight, CheckCircle, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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

  const handleWhatsAppRedirect = (e: React.MouseEvent, msg: string) => {
    e.preventDefault();
    window.open(`https://wa.me/918617825109?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md">
                <Cpu size={20} className="text-white" />
              </div>
              <span className="font-sora text-xl font-bold tracking-tight">AI<span className="text-cyan-400">Connect</span></span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8">
              The premium partner for businesses ready to transition into the age of autonomous intelligence.
            </p>
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold text-white mb-2">📸 Follow us on Instagram:</div>
              <a 
                href="https://instagram.com/ai.connect0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-cyan-400/20 transition-all text-neutral-400 hover:text-cyan-400 border border-white/5 group"
              >
                <div className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                   <Instagram size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">@ai.connect0</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sora font-bold mb-6">Capabilities</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">AI Chatbots</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Lead Qualification</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Workflow Optimization</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Google Review Engine</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-bold mb-6">Agency</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#cases" onClick={(e) => scrollToSection(e, 'cases')} className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" onClick={(e) => handleWhatsAppRedirect(e, "Hi Rohan, I'm interested in a partnership with AI Connect.")} className="hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="#" onClick={(e) => handleWhatsAppRedirect(e, "Hi Rohan, I'd like to book my free strategy call.")} className="hover:text-white transition-colors">Free Strategy Call</a></li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-400/10 to-purple-600/10 p-6 rounded-3xl border border-white/5">
            <h4 className="font-sora font-bold mb-4">Start your journey</h4>
            <p className="text-xs text-neutral-500 mb-6">Your email will be sent directly to Rohan's business mail.</p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="Paste your email here..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors" 
                  required
                />
                <button 
                  type="submit"
                  disabled={status !== 'idle'}
                  className="p-2 bg-white text-black rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 shrink-0"
                >
                  {status === 'success' ? <CheckCircle size={16} className="text-green-600" /> : <ArrowUpRight size={16} />}
                </button>
              </div>
              {status === 'success' && (
                <div className="flex items-center gap-2 mt-2 animate-pulse">
                  <Mail size={12} className="text-cyan-400" />
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter">
                    Lead sent to rohanpandit8617825109@gmail.com
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-xs text-neutral-600 gap-4">
          <p>© 2025 AI Connect Ltd. All rights reserved.</p>
          <div className="flex items-center gap-8 text-neutral-500">
            <p className="flex items-center gap-1"><span className="text-white">Call:</span> 8617825109</p>
            <p className="flex items-center gap-1"><span className="text-white">Email:</span> rohanpandit8617825109@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
