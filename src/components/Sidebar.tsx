import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, LogOut, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username }: any) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false); 
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={18}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={18}/> },
    { 
      id: 'tradition', label: 'Truyền thống đơn vị', icon: <Shield size={18}/>,
      subs: [
        { id: 'tradition-thudo', label: 'LLVT Thủ đô' },
        { id: 'tradition-301', label: 'Sư đoàn Bộ binh 301' },
        { id: 'tradition-59', label: 'Trung đoàn Bộ binh 59' },
        { id: 'tradition-692', label: 'Trung đoàn Bộ binh 692' },
        { id: 'tradition-757', label: 'Trung đoàn Bộ binh 757' },
      ]
    },
    { 
      id: 'lectures', label: 'Bài giảng chính trị', icon: <Book size={18}/>,
      subs: [
        { id: 'lecture-newbie', label: 'Chiến sĩ mới (6 bài)' },
        { id: 'lecture-hsq', label: 'HSQ-CS (12 bài)' },
      ]
    },
    { 
      id: 'entertainment', label: 'Góc giải trí', icon: <Music size={18}/>,
      subs: [
        { id: 'music-15', label: '15 bài hát quy định' },
        { id: 'dance-5', label: '5 điệu vũ' },
      ]
    },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: <Zap size={18}/> },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: <Settings size={18}/> },
  ];

  return (
    <>
      {/* NÚT 3 GẠCH KHI SIDEBAR ĐÓNG */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[40] bg-[#1a2e12] text-white p-3.5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Menu size={22} />
        <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest pr-2">Menu</span>
      </button>

      {/* OVERLAY LÀM MỜ NỀN */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[45] backdrop-blur-sm transition-all" onClick={() => setIsOpen(false)} />
      )}

      {/* NỘI DUNG SIDEBAR TRƯỢT */}
      <aside className={`fixed inset-y-0 left-0 z-[50] w-80 bg-[#1a2e12] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col shadow-2xl`}>
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center shadow-lg"><img src="/vpa-logo.png" className="w-7 h-7" alt="VPA" /></div>
            <span className="text-yellow-500 font-black uppercase text-[10px] tracking-widest leading-none">Học tập<br/>chính trị</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto pt-6 custom-scrollbar">
          {menu.map((item) => (
            <div key={item.id}>
              <button 
                onClick={() => item.subs ? setOpenSub(openSub === item.id ? null : item.id) : handleNav(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-[11px] font-black uppercase transition-all ${activeTab.includes(item.id) ? 'bg-yellow-500 text-green-950 shadow-lg' : 'text-white/60 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3"><span className={activeTab.includes(item.id) ? 'text-green-950' : 'text-yellow-500'}>{item.icon}</span> {item.label}</div>
                {item.subs && (openSub === item.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>)}
              </button>
              {item.subs && openSub === item.id && (
                <div className="ml-8 mt-2 space-y-1 border-l border-white/10 animate-slideDown">
                  {item.subs.map(sub => (
                    <button key={sub.id} onClick={() => handleNav(sub.id)} className={`w-full text-left pl-5 py-3 text-[10px] font-bold uppercase transition-colors ${activeTab === sub.id ? 'text-yellow-500' : 'text-white/40 hover:text-yellow-500'}`}>
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* PHẦN CUỐI: TÊN NGƯỜI DÙNG & ĐĂNG XUẤT */}
        <div className="p-6 bg-black/30 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-11 h-11 rounded-full bg-red-700 flex items-center justify-center font-black text-lg shadow-inner">{username.charAt(0).toUpperCase()}</div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-black text-sm uppercase truncate text-white">{username}</span>
              <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Quân nhân quản lý</span>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-[11px] uppercase transition-all shadow-lg active:scale-95">
            <LogOut size={16} /> Đăng xuất hệ thống
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
