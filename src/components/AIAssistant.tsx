import React, { useState } from 'react';
import { Send, MessageSquare, X, Loader2 } from 'lucide-react';

const AIAssistant: React.FC<{ appLogo: string }> = ({ appLogo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Chào đồng chí! Tôi là trợ lý ảo. Tôi có thể giúp gì cho đồng chí hôm nay?", isBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    
    // Giả lập AI phản hồi (Ở đây đồng chí có thể gọi API Gemini nếu có)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Tôi đã ghi nhận câu hỏi. Đang kết nối cơ sở dữ liệu chính trị...", isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-96 h-[500px] rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-red-700 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{appLogo}</span>
              <span className="font-black uppercase italic tracking-wider">Trợ lý Chính trị</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-bold ${m.isBot ? 'bg-slate-100 text-slate-700' : 'bg-red-700 text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 flex gap-2">
            <input 
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-red-500 font-bold text-sm"
              placeholder="Hỏi đáp chính trị..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="p-2 bg-red-700 text-white rounded-xl"><Send size={18}/></button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-700 w-16 h-16 rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-red-50"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
