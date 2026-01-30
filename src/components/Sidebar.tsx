import React from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, ShieldCheck, Trophy, LogOut } from 'lucide-react';

interface SidebarProps {
  onNavigate: (id: string) => void;
  activeTab: string;
  onLogout: () => void;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeTab, onLogout, username }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={18} />, label: 'Trang chủ' },
    { id: 'history-vn', icon: <History size={18} />, label: 'Lịch sử QĐND VN' },
    { id: 'tradition', icon: <ShieldCheck size={18} />, label: 'Truyền thống đơn vị' },
    { id: 'bai-giang', icon: <BookOpen size={18} />, label: 'Bài giảng chính trị' },
    { id: 'game', icon: <Gamepad2 size={18} />, label: 'Chiến sĩ thông thái' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Cài đặt hệ thống' },
  ];

  return (
    <div className="w-72 h-screen bg-[#1a2e12] flex flex-col p-4 shadow-xl shrink-0">
      <div className="p-4 mb-6 border-b border-white/10">
        <h1 className="text-yellow-500 font-black text-lg italic uppercase leading-tight">
          Bổ trợ học tập chính trị
        </h1>
        <p className="text-white/40 text-[10px] uppercase tracking-tighter mt-1 italic">
          Kỷ cương - Trách nhiệm - Quyết thắng
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === item.id 
                ? 'bg-yellow-500 text-green-950 font-bold shadow-lg' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-[13px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-bold text-sm truncate">{username}</span>
            <span className="text-white/40 text-[10px] uppercase">Học viên</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-bold uppercase transition-all"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
