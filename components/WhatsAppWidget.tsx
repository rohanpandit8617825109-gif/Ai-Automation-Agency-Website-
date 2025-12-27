
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Phone } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are an AI Sales & Support Assistant for AI Connect, representing the owner (Phone: 8617825109). Your goal is to help business owners (Hotels, Restaurants, and Shops) understand how AI can grow their business and get them to book a consultation.

Your Personality: Professional, helpful, concise, and tech-savvy. Speak in a mix of English and simple Hindi (Hinglish) to keep it friendly for Indian clients.

Key Services you offer:
- AI Chatbots for WhatsApp & Instagram (24/7 customer handling).
- Automated Google Review Management (To increase ratings).
- Lead Generation Systems (To find new customers automatically).

Guidelines:
1. If the user asks about pricing, mention that we have plans starting from ₹9,999, but recommend a 'Free Strategy Call' for a custom quote.
2. If the user is interested, ask for their 'Name' and 'Business Type'.
3. Always try to drive the conversation towards booking a call or messaging on 8617825109.
4. Keep answers short (max 2-3 sentences) because people hate reading long texts on WhatsApp.

Example Response Style:
User: AI कैसे मदद करेगा मेरे होटल में?
AI: नमस्ते! AI आपके होटल के लिए 24/7 रिसेप्शनिस्ट की तरह काम करेगा। यह बुकिंग्स संभालेगा और Guests के सवालों के जवाब तुरंत देगा। इससे आपकी सेल्स बढ़ेगी और मेहनत कम होगी। क्या आप अपनी होटल की डिटेल्स शेयर करेंगे?`;

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Namaste! Main AI Connect se hoon. Aapke business ko AI se scale karne mein main kaise help kar sakta hoon? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Global event listener to open the bot from other components
  useEffect(() => {
    const handleOpenBot = () => setIsOpen(true);
    window.addEventListener('open-ai-chatbot', handleOpenBot);
    return () => window.removeEventListener('open-ai-chatbot', handleOpenBot);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}\n\nUser Question: ${userMsg}` }] }
        ]
      });

      const botResponse = response.text || "Sorry, mere system mein kuch issue aa raha hai. Please contact at 8617825109.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Zaroori information ke liye aap direct 8617825109 par call kar sakte hain. 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="whatsapp" className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#075e54] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md overflow-hidden">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Rohan" alt="AI Assistant" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">AI Connect Assistant</p>
                <p className="text-cyan-100 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Active Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5] opacity-100 dark:bg-neutral-950">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-[#dcf8c6] text-neutral-800 rounded-tr-none shadow-sm' 
                    : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-black/5 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-none border border-black/5">
                  <Loader2 className="animate-spin text-green-600" size={16} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border-t border-black/5 flex gap-2">
            <input 
              type="text" 
              placeholder="Type in Hindi or English..." 
              className="flex-1 bg-neutral-100 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-[#25d366] text-white rounded-full hover:bg-[#128c7e] transition-colors flex items-center justify-center shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          id="whatsapp-toggle"
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-neutral-950 text-[10px] font-bold flex items-center justify-center animate-bounce">1</div>
        </button>
      )}
    </div>
  );
};

export default WhatsAppWidget;
