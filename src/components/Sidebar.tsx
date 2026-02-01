import React from 'react';
import { Home, History, ShieldCheck, BookOpen, LogOut, Gamepad2, Settings } from 'lucide-react';

interface SidebarProps {
  onNavigate: (id: string) => void;
  activeTab: string;
  onLogout: () => void;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeTab, onLogout, username }) => {
  // ID ở đây phải khớp chính xác với Case trong App.tsx
  const menuItems = [
    { id: 'dashboard', icon: <Home size={18} />, label: 'Trang chủ' },
    { id: 'history-vn', icon: <History size={18} />, label: 'Lịch sử QĐND VN' },
    { id: 'tradition', icon: <ShieldCheck size={18} />, label: 'Truyền thống đơn vị' },
    { id: 'bai-giang', icon: <BookOpen size={18} />, label: 'Bài giảng chính trị' },
    { id: 'game', icon: <Gamepad2 size={18} />, label: 'Góc giải trí' },
    { id: 'wise-soldier', icon: <Settings size={18} />, label: 'Cài đặt hệ thống' },
  ];

  return (
    <div className="w-72 h-screen bg-[#1a2e12] flex flex-col p-4 shadow-2xl shrink-0 border-r border-white/5">
      {/* Header Sidebar */}
      <div className="p-4 mb-6 border-b border-white/10">
        <h1 className="text-yellow-500 font-black text-[17px] italic uppercase leading-tight tracking-tighter">
          Bổ trợ học tập chính trị
        </h1>
        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1 italic">
          Kỷ cương - Trách nhiệm - Quyết thắng
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left group ${
              activeTab === item.id 
                ? 'bg-yellow-500 text-green-950 font-black shadow-lg shadow-yellow-500/10' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-green-950' : 'text-yellow-500/70 group-hover:text-yellow-500'}`}>
              {item.icon}
            </span>
            <span className="text-[13px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-black/20 rounded-2xl mb-4 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-black shadow-inner border border-white/10">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-bold text-sm truncate uppercase tracking-tighter">{username}</span>
            <span className="text-white/30 text-[9px] uppercase font-bold">Quân nhân quản lý</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-[11px] font-black uppercase transition-all duration-300 border border-red-500/20 hover:border-red-500 shadow-sm"
        >
          <LogOut size={16} /> Đăng xuất hệ thống
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
