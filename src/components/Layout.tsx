import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, History, Shield, Monitor, Gamepad2, 
  Music, Settings, LogOut, ChevronRight, Menu, X 
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
  // Quản lý trạng thái đóng mở Sidebar trên Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/history', label: 'Lịch sử Dân tộc Việt Nam', icon: History },
    { path: '/tradition', label: 'Lịch sử, truyền thống đơn vị', icon: Shield },
    { path: '/lectures', label: 'Bài giảng chính trị', icon: Monitor },
    { path: '/entertainment', label: 'Góc Giải trí', icon: Music },
    { path: '/game', label: 'Chiến sĩ thông thái', icon: Gamepad2 },
    { path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  // Hàm hỗ trợ đóng sidebar khi click chuyển trang
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen relative bg-slate-50/50">
      
      {/* 1. NÚT ĐIỀU KHIỂN MOBILE (Hiện khi ở màn hình nhỏ) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-[60]">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-red-800">
          <Menu size={28} />
        </button>
        <h1 className="text-sm font-black text-red-800 uppercase italic truncate max-w-[200px]">
          {appName}
        </h1>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-red-200">
          <img src={currentUser.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="avatar" />
        </div>
      </header>

      {/* 2. LỚP PHỦ (OVERLAY) - Đóng menu khi chạm ra ngoài nội dung */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* 3. SIDEBAR TRÁI (Đã tối ưu Responsive) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white flex flex-col p-6 shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none lg:border-r lg:border-slate-200 lg:bg-white/80 lg:backdrop-blur-md
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Nút đóng cho Mobile */}
        <button onClick={closeSidebar} className="lg:hidden absolute top-4 right-4 text-slate-400">
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-10 px-2 mt-4 lg:mt-0">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            {appLogo && appLogo.startsWith('data:image') ? (
              <img src={appLogo} alt="Logo" className="w-full h-full object-contain drop-shadow-sm" />
            ) : (
              <span className="text-3xl">{appLogo || "🎖️"}</span>
            )}
          </div>
          <h1 className="text-xl font-black text-red-800 uppercase italic leading-tight tracking-tighter">
            {appName}
          </h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar} // TỰ ĐỘNG ĐÓNG SIDEBAR KHI CLICK
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
            <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-white overflow-hidden shadow-sm shrink-0">
              <img 
                src={currentUser.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                alt="avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-sm font-black text-slate-800 leading-none truncate">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter italic mt-1">
                {currentUser.role === 'admin' ? 'Sĩ quan Quản lý' : 'Chiến sĩ'}
              </span>
            </div>
          </div>
          <button 
            onClick={() => { onLogout(); closeSidebar(); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* 4. VÙNG NỘI DUNG CHÍNH (Đã sửa padding để không bị header Mobile đè) */}
      <main className="flex-1 p-6 lg:p-10 pt-24 lg:pt-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Layout;
