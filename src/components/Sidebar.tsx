import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, LogOut, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username }: any) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleNav = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 1024) setIsMobileOpen(false);
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={19}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={19}/> },
    { 
      id: 'tradition', label: 'Lịch sử truyền thống đơn vị', icon: <Shield size={19}/>,
      subs: [
        { id: 'tradition-thudo', label: 'LLVT Thủ đô' },
        { id: 'tradition-301', label: 'Sư đoàn Bộ binh 301' },
        { id: 'tradition-59', label: 'Trung đoàn Bộ binh 59' },
        { id: 'tradition-692', label: 'Trung đoàn Bộ binh 692' },
        { id: 'tradition-757', label: 'Trung đoàn Bộ binh 757' },
      ]
    },
    { 
      id: 'lectures', label: 'Hệ thống bài giảng chính trị', icon: <Book size={19}/>,
      subs: [
        { id: 'lecture-newbie', label: 'Chiến sĩ mới (6 bài)' },
        { id: 'lecture-hsq', label: 'HSQ-CS (12 bài)' },
      ]
    },
    { 
      id: 'entertainment', label: 'Góc giải trí', icon: <Music size={19}/>,
      subs: [
        { id: 'music-15', label: '15 bài hát quy định' },
        { id: 'dance-5', label: '5 điệu vũ' },
      ]
    },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: <Zap size={19}/> },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: <Settings size={19}/> },
  ];

  return (
    <>
      {/* Nút 3 gạch cho Mobile (Đỏ - Vàng) */}
      <button onClick={() => setIsMobileOpen(true)} className="lg:hidden fixed top-5 left-5 z-[60] bg-red-700 text-yellow-400 p-3 rounded-xl shadow-2xl border border-yellow-500/30">
        <Menu size={24} />
      </button>

      {/* Overlay mờ khi mở menu trên di động */}
      {isMobileOpen && <div className="fixed inset-0 bg-[#1a2e12]/80 z-[55] backdrop-blur-sm lg:hidden" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar chính (Xanh Olive - Viền Vàng) */}
      <aside className={`fixed inset-y-0 left-0 z-[58] w-72 bg-[#1a2e12] border-r-[3px] border-yellow-600 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl`}>
        <div className="p-8 border-b border-yellow-500/10 text-center bg-black/10">
          <img src="/vpa-logo.png" className="w-16 h-16 mx-auto mb-3 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" alt="VPA" />
          <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.2em] leading-tight">QĐND VIỆT NAM</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pt-6 custom-scrollbar">
          {menu.map((item) => (
            <div key={item.id} className="mb-1">
              <button 
                onClick={() => item.subs ? setOpenSub(openSub === item.id ? null : item.id) : handleNav(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-[11px] font-black uppercase transition-all ${activeTab.includes(item.id) ? 'bg-red-700 text-yellow-400 shadow-lg border border-yellow-500/50' : 'text-white/60 hover:bg-white/5 hover:text-yellow-500'}`}
              >
                <div className="flex items-center gap-4">
                    <span className={activeTab.includes(item.id) ? 'text-yellow-400' : 'text-yellow-600'}>{item.icon}</span>
                    {item.label}
                </div>
                {item.subs && (openSub === item.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
              </button>
              {item.subs && openSub === item.id && (
                <div className="ml-9 mt-2 space-y-1 border-l-2 border-yellow-500/20">
                  {item.subs.map(sub => (
                    <button key={sub.id} onClick={() => handleNav(sub.id)} className={`w-full text-left pl-5 py-3 text-[10px] font-bold uppercase transition-colors ${activeTab === sub.id ? 'text-yellow-400 font-black italic' : 'text-white/40 hover:text-yellow-500'}`}>
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer: Thông tin người dùng (Chuẩn quân đội) */}
        <div className="p-4 bg-black/30 border-t border-yellow-500/10">
          <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center font-black text-yellow-400 border border-yellow-500/30 shadow-inner">{username.charAt(0).toUpperCase()}</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white text-[11px] font-black uppercase truncate tracking-tighter">{username}</span>
              <span className="text-[8px] text-yellow-500/40 uppercase font-bold tracking-widest">Học viên tra cứu</span>
            </div>
          </div>
          <button onClick={onLogout} className="w-full py-4 bg-red-700 hover:bg-red-800 text-yellow-400 rounded-xl font-black text-[10px] uppercase shadow-lg border border-yellow-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
