import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, X, ChevronDown, Settings, ListMusic } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, onNavigate, activeTab }: any) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleNav = (id: string, sub?: string) => {
    onNavigate(id, sub);
    if (window.innerWidth < 1024) setIsOpen(false); // Tự đóng khi dùng điện thoại
  };

  const toggleSub = (menuId: string) => {
    setOpenSub(openSub === menuId ? null : menuId);
  };

  return (
    <>
      {/* Overlay cho mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[40] lg:hidden animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-[50] w-72 sm:w-80 bg-[#1b3a1a] text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r-4 border-yellow-500 shadow-2xl flex flex-col`}>
        
        {/* Header với Logo VPA */}
        <div className="p-6 bg-green-950 flex justify-between items-center border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-700 rounded-full border-2 border-yellow-400 flex items-center justify-center font-bold text-yellow-400 shadow-lg animate-pulse">VPA</div>
            <span className="text-[11px] font-black uppercase leading-tight tracking-tighter">
              Hệ thống sổ tay<br/><span className="text-yellow-400">GDCT điện tử</span>
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg text-yellow-500 lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Danh sách Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          
          {/* TRANG CHỦ */}
          <button onClick={() => handleNav('dashboard')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[11px] tracking-wider transition-all ${activeTab === 'dashboard' ? 'bg-yellow-500 text-green-950 shadow-inner' : 'hover:bg-green-800'}`}>
            <Home size={18} /> Trang chủ
          </button>

          {/* LỊCH SỬ QĐND VN */}
          <button onClick={() => handleNav('history-vn')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[11px] tracking-wider transition-all ${activeTab === 'history-vn' ? 'bg-yellow-500 text-green-950' : 'hover:bg-green-800'}`}>
            <History size={18} /> Lịch sử QĐND VN
          </button>

          {/* LỊCH SỬ TRUYỀN THỐNG ĐƠN VỊ (Cấp con) */}
          <div className="space-y-1">
            <button onClick={() => toggleSub('tradition')} className="w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase text-[11px] hover:bg-green-800 transition-colors">
              <span className="flex items-center gap-4"><Shield size={18} /> Truyền thống đơn vị</span>
              <ChevronDown size={14} className={`transition-transform ${openSub === 'tradition' ? 'rotate-180' : ''}`} />
            </button>
            {openSub === 'tradition' && (
              <div className="pl-10 space-y-1 bg-black/20 rounded-xl py-2 animate-in slide-in-from-top-2">
                {['LLVT Thủ đô', 'Sư đoàn BB 301', 'Trung đoàn BB 59', 'Trung đoàn BB 692', 'Trung đoàn BB 757'].map((unit) => (
                  <button key={unit} onClick={() => handleNav(`tradition-${unit}`)} className="w-full text-left py-2.5 px-3 text-[10px] font-bold text-white/70 hover:text-yellow-400 uppercase tracking-tighter italic border-l border-white/10 ml-2">• {unit}</button>
                ))}
              </div>
            )}
          </div>

          {/* BÀI GIẢNG CHÍNH TRỊ (Cấp con) */}
          <div className="space-y-1">
            <button onClick={() => toggleSub('lectures')} className="w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase text-[11px] hover:bg-green-800 transition-colors">
              <span className="flex items-center gap-4"><Book size={18} /> Bài giảng chính trị</span>
              <ChevronDown size={14} className={`transition-transform ${openSub === 'lectures' ? 'rotate-180' : ''}`} />
            </button>
            {openSub === 'lectures' && (
              <div className="pl-10 space-y-1 bg-black/20 rounded-xl py-2">
                <button onClick={() => handleNav('lectures-csm')} className="w-full text-left py-2.5 px-3 text-[10px] font-bold text-white/70 hover:text-yellow-400 uppercase">• Chiến sĩ mới (6 bài)</button>
                <button onClick={() => handleNav('lectures-hsq')} className="w-full text-left py-2.5 px-3 text-[10px] font-bold text-white/70 hover:text-yellow-400 uppercase">• HSQ-CS (12 bài)</button>
              </div>
            )}
          </div>

          {/* GÓC GIẢI TRÍ (Cấp con) */}
          <div className="space-y-1">
            <button onClick={() => toggleSub('entertainment')} className="w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase text-[11px] hover:bg-green-800 transition-colors">
              <span className="flex items-center gap-4"><Music size={18} /> Góc giải trí</span>
              <ChevronDown size={14} className={`transition-transform ${openSub === 'entertainment' ? 'rotate-180' : ''}`} />
            </button>
            {openSub === 'entertainment' && (
              <div className="pl-10 space-y-1 bg-black/20 rounded-xl py-2">
                <button onClick={() => handleNav('music-15')} className="w-full text-left py-2.5 px-3 text-[10px] font-bold text-white/70 hover:text-yellow-400 uppercase">• 15 Bài hát quy định</button>
                <button onClick={() => handleNav('dance-5')} className="w-full text-left py-2.5 px-3 text-[10px] font-bold text-white/70 hover:text-yellow-400 uppercase">• 5 Điệu vũ cơ bản</button>
              </div>
            )}
          </div>

          {/* CHIẾN SĨ THÔNG THÁI */}
          <button onClick={() => handleNav('wise-soldier')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[11px] tracking-wider transition-all ${activeTab === 'wise-soldier' ? 'bg-yellow-500 text-green-950' : 'hover:bg-green-800'}`}>
            <Zap size={18} /> Chiến sĩ thông thái
          </button>

          {/* TRANG CÀI ĐẶT (Mới thêm) */}
          <button onClick={() => handleNav('settings')} className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold uppercase text-[11px] tracking-wider border-t border-white/5 mt-4 transition-all ${activeTab === 'settings' ? 'bg-white/20 text-yellow-400' : 'text-white/40 hover:bg-green-800'}`}>
            <Settings size={18} /> Cài đặt hệ thống
          </button>

        </nav>

        {/* Footer Bản quyền */}
        <div className="p-6 bg-green-950 text-center border-t border-yellow-500/20">
          <p className="text-[9px] text-yellow-500/50 uppercase font-black italic tracking-widest leading-relaxed">
            Bản quyền thuộc về<br/>Cục Chính trị - BTL Thủ đô
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
