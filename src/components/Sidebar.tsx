import React, { useState } from 'react';
import { 
  Home, History, Shield, Book, Music, Zap, Settings, 
  ChevronDown, ChevronUp, LogOut, User, Menu, X 
} from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username }: any) => {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái đóng mở trên di động
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (id: string) => setOpenSub(openSub === id ? null : id);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false); // Tự động đóng sidebar sau khi chọn trên điện thoại
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={18}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={18}/> },
    { 
      id: 'tradition', label: 'Truyền thống đơn vị', icon: <Shield size={18}/>,
      subs: [
        { id: 'tradition-thudo', label: 'LLVT Thủ đô' },
        { id: 'tradition-301', label: 'Sư đoàn 301' },
        { id: 'tradition-59', label: 'Trung đoàn 59' },
        { id: 'tradition-692', label: 'Trung đoàn 692' },
        { id: 'tradition-757', label: 'Trung đoàn 757' },
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
      {/* NÚT 3 GẠCH TRÊN DI ĐỘNG */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#1a2e12] p-4 flex justify-between items-center z-[60] shadow-lg">
        <div className="flex items-center gap-2">
          <img src="/vpa-logo.png" className="w-8 h-8" alt="VPA" />
          <span className="text-yellow-500 font-black text-xs uppercase tracking-tighter">Sổ tay GDCT</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY KHI MỞ MENU TRÊN ĐIỆN THOẠI */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* NỘI DUNG SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[58] w-72 bg-[#1a2e12] text-white 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out 
        flex flex-col shadow-2xl
      `}>
        {/* Header Logo */}
        <div className="p-8 border-b border-white/10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center shadow-lg mb-4">
            <img src="/vpa-logo.png" className="w-10 h-10 object-contain" alt="VPA" />
          </div>
          <h1 className="text-yellow-500 font-black text-sm uppercase leading-tight tracking-tighter">
            Bổ trợ học tập chính trị
          </h1>
        </div>

        {/* Danh sách Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar pt-6">
          {menu.map((item) => (
            <div key={item.id} className="mb-1">
              <button 
                onClick={() => item.subs ? toggleSub(item.id) : handleNavigate(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-[11px] font-black uppercase transition-all duration-200 ${
                  activeTab.includes(item.id) || openSub === item.id
                  ? 'bg-yellow-500 text-green-950 shadow-md' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeTab.includes(item.id) ? 'text-green-950' : 'text-yellow-500/80'}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                {item.subs && (openSub === item.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
              </button>

              {/* Menu con (Subs) */}
              {item.subs && openSub === item.id && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-white/10 animate-slideDown">
                  {item.subs.map(sub => (
                    <button 
                      key={sub.id} 
                      onClick={() => handleNavigate(sub.id)} 
                      className={`w-full text-left p-3 pl-5 text-[10px] font-bold uppercase transition-colors ${
                        activeTab === sub.id ? 'text-yellow-500 font-black' : 'text-white/40 hover:text-yellow-400'
                      }`}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer: User & Logout */}
        <div className="mt-auto p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl mb-4 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-black border border-white/10 shadow-inner">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white font-black text-sm truncate uppercase tracking-tighter">{username}</span>
              <span className="text-white/30 text-[9px] uppercase font-bold tracking-widest">Học viên tra cứu</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[11px] font-black uppercase transition-all shadow-lg active:scale-95"
          >
            <LogOut size={16} /> Đăng xuất hệ thống
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
