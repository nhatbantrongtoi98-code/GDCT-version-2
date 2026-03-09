import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, History, Shield, Monitor, Gamepad2, 
  Music, Settings, LogOut, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  currentUser: any;
  appName: string;
  appLogo: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, currentUser, appName, appLogo, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/history', label: 'Lịch sử QĐND VN', icon: History },
    { path: '/tradition', label: 'Truyền thống đơn vị', icon: Shield },
    { path: '/lectures', label: 'Bài giảng chính trị', icon: Monitor },
    { path: '/entertainment', label: 'Góc Giải trí', icon: Music },
    { path: '/game', label: 'Chiến sĩ thông thái', icon: Gamepad2 },
    { path: '/settings', label: 'Cài đặt hệ thống', icon: Settings },
  ];

  return (
    <aside className={`
      relative bg-[#1A2E14] flex flex-col shadow-2xl transition-all duration-500 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-72'}
    `}>
      {/* NÚT TOGGLE: Dấu mũi tên thông minh */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-[#DA251D] text-white rounded-full flex items-center justify-center shadow-lg border border-yellow-500 hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* LOGO ĐƠN VỊ */}
      <div className={`p-6 border-b border-white/10 flex flex-col items-center ${isCollapsed ? 'px-2' : ''}`}>
        <div className={`bg-white rounded-xl p-2 shadow-xl transition-all duration-500 ${isCollapsed ? 'w-10 h-10' : 'w-16 h-16 mb-3'}`}>
           <img src={appLogo} alt="VPA Logo" className="w-full h-full object-contain" />
        </div>
        {!isCollapsed && (
          <h1 className="text-[13px] font-black text-[#FFD700] uppercase text-center leading-tight animate-in fade-in">
            {appName}
          </h1>
        )}
      </div>

      {/* DANH SÁCH MENU */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : ""}
              className={`
                flex items-center gap-4 py-3 rounded-xl font-bold transition-all
                ${isActive ? 'bg-[#DA251D] text-white shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'}
                ${isCollapsed ? 'justify-center px-0' : 'px-4'}
              `}
            >
              <Icon size={22} className={isActive ? 'text-[#FFD700]' : ''} />
              {!isCollapsed && <span className="text-[13px] uppercase tracking-wide truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* USER & LOGOUT */}
      <div className={`p-4 bg-black/20 border-t border-white/10 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4 animate-in fade-in">
            <div className="w-10 h-10 rounded-lg border border-[#FFD700] overflow-hidden bg-white shrink-0">
              <img src={currentUser.avatarUrl} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{currentUser.username}</span>
              <span className="text-[9px] text-[#FFD700] uppercase font-black">{currentUser.role}</span>
            </div>
          </div>
        )}
        <button 
          onClick={onLogout}
          className={`flex items-center justify-center gap-2 transition-all ${isCollapsed ? 'text-red-500' : 'w-full py-2.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg border border-red-600/30 text-xs font-black uppercase'}`}
        >
          <LogOut size={18} />
          {!isCollapsed && "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
