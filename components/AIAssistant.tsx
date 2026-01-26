
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Shield, Loader2, User } from 'lucide-react';
import { askWiseSoldier } from '../services/geminiService';

const AIAssistant: React.FC<{ appLogo?: string }> = ({ appLogo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Chào đồng chí! Tôi là trợ lý ảo Chiến sĩ Thông thái. Tôi có thể giúp gì cho đồng chí trong việc học tập và tra cứu hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const response = await askWiseSoldier(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-2 border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="ai-chat-gradient p-5 flex items-center justify-between text-white border-b-4 border-[#ffde00]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                 <Bot size={20} className="text-[#ffde00]" />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest leading-none">Chiến sĩ Thông thái</h4>
                <p className="text-[8px] opacity-70 font-bold uppercase mt-1 tracking-tighter">Hệ thống AI Hỗ trợ học tập</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-red-700 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-red-700" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Đang tra cứu...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-700 outline-none focus:border-red-600 transition-all shadow-inner"
              placeholder="Nhập câu hỏi tại đây..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-red-700 text-white p-3 rounded-xl hover:bg-red-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 ai-chat-gradient rounded-full flex items-center justify-center text-white shadow-[0_15px_30px_-5px_rgba(127,29,29,0.5)] border-4 border-white hover:scale-110 active:scale-95 transition-all group relative"
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
             {appLogo ? (
               <img src={appLogo} className="w-10 h-10 object-contain" alt="AI" />
             ) : (
               <Shield size={28} className="text-[#ffde00]" />
             )}
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ffde00] rounded-full border-2 border-white animate-pulse"></div>
          </div>
        )}
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-20 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 text-[9px] font-black uppercase text-red-700 tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Trợ lý ảo Chiến sĩ
          </div>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
