
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, Send } from 'lucide-react';

const AIStrategyTool: React.FC = () => {
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const generateStrategy = async () => {
    if (!businessType) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I have a business that is a ${businessType}. Generate a 3-point AI automation strategy for me.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              strategies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    benefit: { type: Type.STRING },
                    difficulty: { type: Type.STRING }
                  },
                  required: ["title", "benefit", "difficulty"]
                }
              }
            },
            required: ["summary", "strategies"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setStrategy(data);
    } catch (error) {
      console.error("Failed to generate strategy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="strategy" className="py-24 px-6">
      <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border-cyan-400/20 shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-400/10 rounded-lg">
            <Sparkles className="text-cyan-400" size={24} />
          </div>
          <h2 className="font-sora text-3xl font-bold">Free AI <span className="text-gradient">Strategy Builder</span></h2>
        </div>

        <p className="text-neutral-400 mb-8">Tell us what you do, and our proprietary AI Connect logic will draft your automation roadmap in seconds.</p>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input 
            type="text" 
            placeholder="e.g. Real Estate Agency in Mumbai" 
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-colors text-white"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <button 
            onClick={generateStrategy}
            disabled={loading}
            className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Generate Plan</>}
          </button>
        </div>

        {strategy && (
          <div className="animate-in fade-in slide-in-from-top-5 duration-500">
            <p className="text-cyan-400 font-medium mb-6 leading-relaxed">"{strategy.summary}"</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategy.strategies.map((s: any, i: number) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold mb-2 text-white">{s.title}</h4>
                  <p className="text-sm text-neutral-500 mb-4">{s.benefit}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 bg-white/5 inline-block px-2 py-1 rounded">
                    Complexity: {s.difficulty}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href="#whatsapp" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#whatsapp-toggle')?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
              }} className="text-sm font-semibold text-neutral-400 hover:text-white underline cursor-pointer">
                Book a call to implement this roadmap
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIStrategyTool;
