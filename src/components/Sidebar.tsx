import React from 'react';
import { Home, History, Shield, Book, Music, Zap, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username, role }: any) => {
  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={18}/> },
    { id: 'history', label: 'Lịch sử Dân tộc Việt Nam', icon: <History size={18}/> },
    { id: 'tradition', label: 'Lịch sử truyền thống đơn vị', icon: <Shield size={18}/> },
    { id: 'lectures', label: 'Bài giảng chính trị', icon: <Book size={18}/> },
    { id: 'entertainment', label: 'Góc Giải trí', icon: <Music size={18}/> },
    { id: 'wise', label: 'Chiến sĩ thông thái', icon: <Zap size={18}/> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={18}/> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 flex flex-col p-6 z-50 font-['Be_Vietnam_Pro'] shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2 animate-fadeIn">
        <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <img src="/vpa-logo.png" className="w-9 h-9" alt="logo" />
        </div>
        <div>
          <h1 className="text-[#922323] font-black text-sm uppercase leading-none tracking-tighter italic">Sổ tay GDCT</h1>
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Học tập & Rèn luyện</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-[1.25rem] font-black text-[10px] uppercase transition-all tracking-tight ${
              activeTab.includes(item.id) 
              ? 'bg-[#DA251D] text-white shadow-xl shadow-red-100' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#DA251D]'
            }`}
          >
            <span className={activeTab.includes(item.id) ? 'text-white' : 'text-[#DA251D]'}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-50">
        <div className="flex items-center gap-3 mb-4 p-4 bg-[#1A2E14] rounded-3xl border border-white/10 shadow-lg">
          <div className="w-10 h-10 rounded-2xl bg-[#DA251D] flex items-center justify-center text-white font-black text-sm shadow-inner">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-black text-[10px] text-white uppercase tracking-tighter truncate">{username}</span>
            <span className="text-[8px] text-[#FFFF00]/70 font-bold uppercase italic mt-0.5">
              {role === 'admin' ? 'Sĩ quan quản lý' : 'Học viên tra cứu'}
            </span>
          </div>
        </div>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-2 p-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
