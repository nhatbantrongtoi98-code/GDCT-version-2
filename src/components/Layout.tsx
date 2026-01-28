import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, History, Shield, Monitor, Gamepad2, 
  Music, Settings, LogOut, ChevronRight 
} from 'lucide-react';
import { UserAccount, BackgroundMusic } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: UserAccount;
  appName: string;
  appLogo: string;
  playlist: BackgroundMusic[];
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, appName, appLogo, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/history-vn', label: 'Lịch sử QĐ', icon: History },
    { path: '/tradition', label: 'Truyền thống', icon: Shield },
    { path: '/lectures', label: 'Bài giảng', icon: Monitor },
    { path: '/entertainment', label: 'Giải trí', icon: Music },
    { path: '/game', label: 'Ôn luyện', icon: Gamepad2 },
    { path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar trái */}
      <aside className="w-72 bg-white/80 backdrop-blur-md border-r border-slate-200 sticky top-0 h-screen flex flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <span className="text-3xl">{appLogo}</span>
          <h1 className="text-xl font-black text-red-800 uppercase italic leading-tight">{appName}</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all group ${
                  isActive 
                    ? 'bg-red-700 text-white shadow-lg shadow-red-200' 
                    : 'text-slate-500 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-white overflow-hidden shadow-sm">
              <img src={currentUser.avatarUrl || 'https://via.placeholder.com/40'} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-800 leading-none">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter italic">
                {currentUser.role === 'admin' ? 'Sĩ quan Quản lý' : 'Chiến sĩ'}
              </span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Vùng nội dung chính */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
