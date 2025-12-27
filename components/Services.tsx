
import React from 'react';
import { MessageSquare, Zap, Star, Layout, Database, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <MessageSquare className="text-cyan-400" />,
    title: "AI Chatbots",
    description: "Custom-trained LLM agents that understand your brand voice, handle complex queries, and book appointments 24/7."
  },
  {
    icon: <Zap className="text-purple-500" />,
    title: "Lead Automation",
    description: "End-to-end pipelines that capture, qualify, and nurture leads from social ads straight to your CRM without lifting a finger."
  },
  {
    icon: <Star className="text-yellow-400" />,
    title: "Google Review Systems",
    description: "Automated systems that drive 5-star reviews from happy customers while filtering negative feedback for internal resolution."
  },
  {
    icon: <Database className="text-blue-500" />,
    title: "Custom CRM Ops",
    description: "Integrating your disparate tools into a single source of truth, automating reporting and data entry."
  },
  {
    icon: <Layout className="text-green-400" />,
    title: "Workflow Audit",
    description: "Deep-dive analysis of your current operations to identify high-impact automation opportunities."
  },
  {
    icon: <ShieldCheck className="text-red-400" />,
    title: "AI Compliance",
    description: "Ensuring your AI implementations are secure, private, and compliant with global data standards."
  }
];

const Services: React.FC = () => {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-sora text-4xl md:text-5xl font-bold mb-6">Our <span className="text-gradient">Service Packages</span></h2>
            <p className="text-neutral-400 text-lg">We don't just sell software; we deliver infrastructure for the modern age. Scalable, reliable, and intelligent.</p>
          </div>
          <button 
            onClick={scrollToPricing}
            className="text-cyan-400 font-semibold flex items-center gap-2 hover:underline cursor-pointer"
          >
            Explore All Solutions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl hover:border-cyan-400/30 transition-all group cursor-default">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-sora text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
