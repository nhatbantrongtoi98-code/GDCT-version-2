import React, { useState } from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, LogOut, ChevronDown, ChevronUp, Menu } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username }: any) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

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
    // ... Thêm các mục khác theo nhu cầu
  ];

  return (
    <>
      <button onClick={() => setIsMobileOpen(true)} className="lg:hidden fixed top-5 left-5 z-[60] bg-red-700 text-yellow-400 p-3 rounded-xl shadow-xl">
        <Menu size={24} />
      </button>

      <aside className={`fixed inset-y-0 left-0 z-[55] w-72 bg-[#2d3a1a] border-r-4 border-yellow-600 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl`}>
        <div className="p-8 border-b border-yellow-500/20 text-center bg-black/10">
          <img src="/vpa-logo.png" className="w-16 h-16 mx-auto mb-2 drop-shadow-lg" alt="VPA" />
          <h2 className="text-yellow-500 font-black text-[10px] uppercase tracking-widest leading-tight">QĐND VIỆT NAM</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 mt-4">
          {menu.map((item) => (
            <div key={item.id}>
              <button 
                onClick={() => item.subs ? setOpenSub(openSub === item.id ? null : item.id) : onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-[11px] font-black uppercase transition-all ${activeTab.includes(item.id) ? 'bg-red-700 text-yellow-400 shadow-lg' : 'text-white/60 hover:text-yellow-500'}`}
              >
                <div className="flex items-center gap-3">
                    <span className={activeTab.includes(item.id) ? 'text-yellow-400' : 'text-yellow-600'}>{item.icon}</span>
                    {item.label}
                </div>
                {item.subs && (openSub === item.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
              </button>
              {item.subs && openSub === item.id && (
                <div className="ml-8 mt-1 border-l-2 border-yellow-500/20 space-y-1">
                  {item.subs.map(sub => (
                    <button key={sub.id} onClick={() => onNavigate(sub.id)} className={`w-full text-left pl-5 py-2.5 text-[10px] font-bold uppercase transition-colors ${activeTab === sub.id ? 'text-yellow-400 italic font-black' : 'text-white/40 hover:text-yellow-500'}`}>
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 bg-black/20 border-t border-yellow-500/10">
          <div className="flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center font-black text-yellow-400 border border-yellow-500/30 shadow-md">{username.charAt(0).toUpperCase()}</div>
            <div className="flex flex-col"><span className="text-white text-[10px] font-bold uppercase truncate">{username}</span><span className="text-[8px] text-yellow-500/40 font-black uppercase tracking-tighter">Học viên tra cứu</span></div>
          </div>
          <button onClick={onLogout} className="w-full py-4 bg-red-700 hover:bg-red-800 text-yellow-400 rounded-xl font-black text-[10px] uppercase shadow-md flex items-center justify-center gap-2 transition-all">
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
