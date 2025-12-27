
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const tiers = [
  {
    name: "Starter",
    price: "49,999",
    desc: "Perfect for local businesses starting their AI journey.",
    features: ["1 Custom Chatbot", "Google Reviews Automation", "Basic Lead Capture", "Email Support"],
    cta: "Start Scaling",
    featured: false,
    whatsappMsg: "Hi Rohan, I am interested in the Starter AI Plan (₹49,999)."
  },
  {
    name: "Growth",
    price: "1,29,999",
    desc: "For established businesses needing scale and efficiency.",
    features: ["3 Custom Agents", "Advanced Lead Scoring", "CRM Integration", "Social Media Automations", "Priority Support"],
    cta: "Go Pro",
    featured: true,
    whatsappMsg: "Hi Rohan, I want to grow my business with the Growth AI Plan (₹1,29,999)."
  },
  {
    name: "Enterprise",
    price: "4,49,999",
    desc: "Custom solutions for high-volume operations.",
    features: ["Unlimited Agents", "Dedicated Solutions Engineer", "Custom API Development", "White-label Options", "24/7 Phone Support"],
    cta: "Contact Us",
    featured: false,
    whatsappMsg: "Hi Rohan, I need a custom Enterprise AI Solution for my business."
  }
];

const Pricing: React.FC = () => {
  const handlePricingClick = (msg: string) => {
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/918617825109?text=${encodedMsg}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sora text-4xl md:text-5xl font-bold mb-6">Investment <span className="text-gradient">Model</span></h2>
          <p className="text-neutral-400">Predictable pricing for exponential growth. All prices in INR.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-[2rem] flex flex-col ${
                tier.featured 
                  ? 'bg-gradient-to-b from-white/10 to-transparent border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/10' 
                  : 'glass'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400 text-black text-xs font-black uppercase rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-sora text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">₹{tier.price}</span>
                  <span className="text-neutral-500">/one-time</span>
                </div>
                <p className="text-neutral-500 text-sm mt-4">{tier.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-sm text-neutral-300">
                    <CheckCircle2 size={18} className="text-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePricingClick(tier.whatsappMsg)}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                tier.featured 
                  ? 'bg-cyan-400 text-black hover:bg-white' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
