import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, isOpen, setIsOpen }: any) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (id: string) => setOpenSub(openSub === id ? null : id);

  const navAction = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 768) setIsOpen(false); // Đóng sidebar khi click trên di động
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={18}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={18}/> },
    { 
      id: 'tradition', 
      label: 'Truyền thống đơn vị', 
      icon: <Shield size={18}/>,
      subs: [
        { id: 'tradition-thudo', label: 'LLVT Thủ đô' },
        { id: 'tradition-301', label: 'Sư đoàn 301' },
        { id: 'tradition-59', label: 'Trung đoàn 59' },
        { id: 'tradition-692', label: 'Trung đoàn 692' },
        { id: 'tradition-757', label: 'Trung đoàn 757' },
      ]
    },
    { 
      id: 'lectures', 
      label: 'Bài giảng chính trị', 
      icon: <Book size={18}/>,
      subs: [
        { id: 'lecture-newbie', label: 'Chiến sĩ mới (6 bài)' },
        { id: 'lecture-hsq', label: 'HSQ-CS (12 bài)' },
      ]
    },
    { 
      id: 'entertainment', 
      label: 'Góc giải trí', 
      icon: <Music size={18}/>,
      subs: [
        { id: 'music-15', label: '15 bài hát quy định' },
        { id: 'dance-5', label: '5 điệu vũ' },
      ]
    },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: <Zap size={18}/> },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: <Settings size={18}/> },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1a2e12] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto`}>
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <img src="/vpa-logo.png" className="w-10 h-10" alt="VPA" />
        <span className="font-black text-xs uppercase tracking-tighter text-yellow-500">Học tập chính trị</span>
      </div>
      <nav className="p-4 space-y-1">
        {menu.map((item) => (
          <div key={item.id}>
            <button 
              onClick={() => item.subs ? toggleSub(item.id) : navAction(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase transition-all ${activeTab.includes(item.id) ? 'bg-yellow-500 text-green-950' : 'hover:bg-white/5 text-white/70'}`}
            >
              <div className="flex items-center gap-3">{item.icon} {item.label}</div>
              {item.subs && (openSub === item.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
            </button>
            {item.subs && openSub === item.id && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10">
                {item.subs.map(sub => (
                  <button key={sub.id} onClick={() => navAction(sub.id)} className="w-full text-left p-3 text-[10px] font-bold uppercase text-white/50 hover:text-yellow-500 transition-colors">
                    • {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
