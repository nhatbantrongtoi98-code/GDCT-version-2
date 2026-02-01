import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, LogOut, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username }: any) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar ẩn mặc định
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false); // Click xong tự động ẩn Sidebar
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={20}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={20}/> },
    { 
      id: 'tradition', label: 'Truyền thống đơn vị', icon: <Shield size={20}/>,
      subs: [
        { id: 'tradition-thudo', label: 'LLVT Thủ đô' },
        { id: 'tradition-301', label: 'Sư đoàn 301' },
        { id: 'tradition-59', label: 'Trung đoàn 59' },
        { id: 'tradition-692', label: 'Trung đoàn 692' },
        { id: 'tradition-757', label: 'Trung đoàn 757' },
      ]
    },
    { 
      id: 'lectures', label: 'Bài giảng chính trị', icon: <Book size={20}/>,
      subs: [
        { id: 'lecture-newbie', label: 'Chiến sĩ mới (6 bài)' },
        { id: 'lecture-hsq', label: 'HSQ-CS (12 bài)' },
      ]
    },
    { 
      id: 'entertainment', label: 'Góc giải trí', icon: <Music size={20}/>,
      subs: [
        { id: 'music-15', label: '15 bài hát quy định' },
        { id: 'dance-5', label: '5 điệu vũ' },
      ]
    },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: <Zap size={20}/> },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: <Settings size={20}/> },
  ];

  return (
    <>
      {/* NÚT 3 GẠCH CỐ ĐỊNH Ở GÓC TRÊN BÊN TRÁI */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[40] bg-[#1a2e12] text-white p-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY LÀM MỜ NỀN KHI SIDEBAR MỞ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[45] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* NỘI DUNG SIDEBAR TRƯỢT TỪ TRÁI SANG */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-80 bg-[#1a2e12] text-white
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
      `}>
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/vpa-logo.png" className="w-10 h-10" alt="VPA" />
            <span className="text-yellow-500 font-black uppercase text-[10px] tracking-widest leading-none">Học tập<br/>chính trị</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto pt-6">
          {menu.map((item) => (
            <div key={item.id}>
              <button 
                onClick={() => item.subs ? setOpenSub(openSub === item.id ? null : item.id) : handleNav(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-[12px] font-black uppercase transition-all ${activeTab.includes(item.id) ? 'bg-yellow-500 text-green-950' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">{item.icon} {item.label}</div>
                {item.subs && (openSub === item.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>)}
              </button>
              {item.subs && openSub === item.id && (
                <div className="ml-8 mt-2 space-y-2 border-l border-white/10">
                  {item.subs.map(sub => (
                    <button 
                      key={sub.id} 
                      onClick={() => handleNav(sub.id)} 
                      className={`w-full text-left pl-4 py-2 text-[10px] font-bold uppercase transition-colors ${activeTab === sub.id ? 'text-yellow-500' : 'text-white/40 hover:text-yellow-500'}`}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-6 bg-black/20 mt-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center font-black text-xl border-2 border-white/10 shadow-lg">{username.charAt(0).toUpperCase()}</div>
            <div className="flex flex-col">
              <span className="font-black text-sm uppercase truncate">{username}</span>
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Học viên tra cứu</span>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-[11px] uppercase transition-all shadow-lg active:scale-95">
            <LogOut size={16} /> Đăng xuất hệ thống
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
