import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, X, ChevronDown } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, onNavigate, activeTab, username }: any) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleNav = (id: string, sub?: string) => {
    onNavigate(id, sub);
    if (window.innerWidth < 1024) setIsOpen(false); // Tự đóng trên điện thoại
  };

  return (
    <>
      {/* Lớp nền mờ khi mở trên điện thoại */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[40] lg:hidden animate-fadeIn" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-[50] w-72 sm:w-80 bg-[#1b3a1a] text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r-4 border-yellow-500 shadow-2xl flex flex-col`}>
        
        {/* Header Sidebar & Nút Đóng */}
        <div className="p-6 bg-green-950 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700 rounded-full border border-yellow-500 flex items-center justify-center font-bold text-yellow-400">VPA</div>
            <span className="text-[10px] font-black uppercase leading-tight">Hệ thống số tay<br/>GDCT điện tử</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-yellow-500">
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <button onClick={() => handleNav('home')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'home' ? 'bg-yellow-500 text-green-950 shadow-lg' : 'hover:bg-green-800'}`}>
            <Home size={18} /> Trang chủ
          </button>

          <button onClick={() => handleNav('history_vpa')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'history_vpa' ? 'bg-yellow-500 text-green-950' : 'hover:bg-green-800'}`}>
            <History size={18} /> Lịch sử QĐND VN
          </button>

          {/* Ví dụ mục con (Truyền thống) */}
          <div className="space-y-1">
            <button onClick={() => setOpenSub(openSub === 'trad' ? null : 'trad')} className="w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase text-xs hover:bg-green-800">
              <span className="flex items-center gap-4"><Shield size={18} /> Truyền thống</span>
              <ChevronDown size={14} className={`transition-transform ${openSub === 'trad' ? 'rotate-180' : ''}`} />
            </button>
            {openSub === 'trad' && (
              <div className="pl-12 space-y-1 bg-black/10 rounded-xl py-2">
                {['LLVT Thủ đô', 'Sư đoàn 301', 'Trung đoàn 59'].map((item, idx) => (
                  <button key={idx} onClick={() => handleNav('tradition_unit', item)} className="w-full text-left py-2 text-[10px] font-bold text-white/60 hover:text-yellow-400 uppercase tracking-tighter italic">• {item}</button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Footer (Bản quyền) */}
        <div className="p-6 bg-black/40 text-center">
          <p className="text-[9px] text-white/30 uppercase font-black italic tracking-widest">Cục Chính trị - BTL Thủ đô</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
