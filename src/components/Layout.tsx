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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/history', label: 'Lịch sử Dân tộc', icon: History },
    { path: '/tradition', label: 'Truyền thống đơn vị', icon: Shield },
    { path: '/lectures', label: 'Bài giảng chính trị', icon: Monitor },
    { path: '/entertainment', label: 'Góc Giải trí', icon: Music },
    { path: '/game', label: 'Chiến sĩ thông thái', icon: Gamepad2 },
    { path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen relative bg-[#f4f7fa] overflow-x-hidden font-sans">
      
      {/* 1. HEADER MOBILE */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#c41e16] text-white flex items-center justify-between px-4 z-[60] shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:scale-90 transition-all">
          <Menu size={28} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.2em] leading-none mb-1">Hệ thống giáo dục</span>
          <h1 className="text-[14px] font-black uppercase tracking-tight truncate max-w-[180px]">
            {appName}
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden bg-white shadow-sm shrink-0">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 2. OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] lg:hidden animate-fade-in" onClick={closeSidebar} />
      )}

      {/* 3. SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-[#1e293b] flex flex-col shadow-2xl transition-transform duration-300 ease-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeSidebar} className="lg:hidden absolute top-5 right-5 text-slate-400">
          <X size={24} />
        </button>

        {/* Branding - Sửa lại logic hiện Logo App */}
        <div className="p-8 pb-6 flex flex-col items-center lg:items-start border-b border-slate-700/50 mb-2">
          <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-xl border-b-4 border-red-600 mb-4 overflow-hidden shrink-0 flex items-center justify-center">
            {appLogo ? (
               <img src={appLogo} alt="Logo" className="w-full h-full object-contain block" />
            ) : (
               <span className="text-4xl">🎖️</span>
            )}
          </div>
          <div className="text-center lg:text-left">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Đơn vị tinh nhuệ</span>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mt-1">
              {appName}
            </h1>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-yellow-400' : 'text-slate-500'} />
                <span className="text-[14px] uppercase tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="m-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg border border-red-500 overflow-hidden shrink-0 bg-white">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate text-left">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest text-left">{currentUser.role}</span>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-600/20 transition-all text-[12px] font-black uppercase">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto military-ux-container">
          {children}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;900&display=swap');
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        
        /* ĐẶC TRỊ LOGO TO VÀ CHỮ ĐẸP TRÊN MOBILE */
        @media (max-width: 768px) {
          /* Logo của các đơn vị bên trong trang Truyền thống */
          .military-ux-container img:not([alt="avatar"]), 
          .military-ux-container .shrink-0 img {
            width: 110px !important; /* Tăng lên 110px cho hoành tráng */
            height: 110px !important;
            min-width: 110px !important;
            margin: 10px auto 20px auto !important;
            display: block !important;
            border-radius: 20px !important;
            object-contain: fit !important;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
            background: white !important;
            padding: 10px !important;
          }

          /* Chỉnh lại các dòng tiêu đề */
          .military-ux-container h1, 
          .military-ux-container h2, 
          .military-ux-container b, 
          .military-ux-container strong {
            font-size: 1.25rem !important;
            font-weight: 900 !important;
            line-height: 1.3 !important;
            color: #b91c1c !important;
            text-align: center !important;
            display: block !important;
            margin-bottom: 1rem !important;
            text-transform: uppercase !important;
          }

          /* Nội dung văn bản */
          .military-ux-container p {
            font-size: 15px !important;
            line-height: 1.7 !important;
            color: #334155 !important;
            background: white !important;
            padding: 18px !important;
            border-radius: 20px !important;
            margin-bottom: 12px !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
