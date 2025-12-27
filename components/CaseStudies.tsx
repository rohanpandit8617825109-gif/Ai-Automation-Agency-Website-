
import React from 'react';
import { ExternalLink } from 'lucide-react';

const cases = [
  {
    client: "Grand Heritage Hotel",
    result: "85% Auto-Booking Rate",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    tags: ["WhatsApp Bot", "Booking Engine"],
    whatsappMsg: "Hi Rohan, I saw the Grand Heritage Hotel case study and want to achieve an 85% auto-booking rate for my business too."
  },
  {
    client: "Urban Bites Cloud Kitchen",
    result: "3.2x Review Volume",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    tags: ["Review Automation", "Lead Gen"],
    whatsappMsg: "Hi Rohan, I'm interested in the Urban Bites case study. I want to increase my Google Review volume by 3x."
  }
];

const CaseStudies: React.FC = () => {
  const handleViewMetrics = (msg: string) => {
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/918617825109?text=${encodedMsg}`, '_blank');
  };

  return (
    <section id="cases" className="py-24 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-sora text-4xl font-bold mb-4">Success <span className="text-gradient">Stories</span></h2>
          <p className="text-neutral-400">Real results delivered through intelligent automation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2.5rem] glass aspect-[16/10]">
              <img src={item.image} alt={item.client} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                <div className="flex gap-2 mb-4">
                  {item.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30">{t}</span>)}
                </div>
                <h3 className="font-sora text-3xl font-bold text-white mb-2">{item.client}</h3>
                <p className="text-cyan-400 font-medium text-lg mb-6">{item.result}</p>
                <button 
                  onClick={() => handleViewMetrics(item.whatsappMsg)}
                  className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors cursor-pointer"
                >
                  View Full Metrics <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
