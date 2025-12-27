
import React from 'react';

const steps = [
  {
    num: "01",
    title: "Consult",
    desc: "We dive deep into your business metrics and current workflows to find the bottlenecks where AI can provide 10x leverage."
  },
  {
    num: "02",
    title: "Build",
    desc: "Our engineers develop custom LLM chains, API integrations, and automation flows tailored to your specific ecosystem."
  },
  {
    num: "03",
    title: "Launch",
    desc: "After rigorous testing, we deploy your new autonomous workforce, providing full training and ongoing optimization."
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 px-6 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sora text-4xl md:text-5xl font-bold mb-6">The <span className="text-gradient">Formula</span></h2>
          <p className="text-neutral-400 max-w-xl mx-auto">A systematic approach to transforming your manual tasks into high-performance automated systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-8 group">
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/10 z-0"></div>
              )}
              <div className="text-6xl font-sora font-black text-white/5 mb-4 group-hover:text-cyan-400/10 transition-colors">
                {step.num}
              </div>
              <h3 className="font-sora text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-neutral-500 leading-relaxed">
                {step.desc}
              </p>
              <div className="mt-8 w-12 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
