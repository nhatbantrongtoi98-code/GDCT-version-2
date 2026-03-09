import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, History, Shield, Monitor, Gamepad2, 
  Music, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X, Sun, Moon 
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Logic Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/history', label: 'Lịch sử Dân tộc', icon: History },
    { path: '/tradition', label: 'Truyền thống đơn vị', icon: Shield },
    { path: '/lectures', label: 'Bài giảng chính trị', icon: Monitor },
    { path: '/entertainment', label: 'Góc Giải trí', icon: Music },
    { path: '/game', label: 'Chiến sĩ thông thái', icon: Gamepad2 },
    { path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-[#f4f7fa]'} overflow-hidden font-sans`}>
      
      {/* 1. OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* 2. SIDEBAR CHÍNH */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] bg-[#1e293b] flex flex-col shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        lg:sticky lg:h-screen lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
      `}>
        
        {/* Nút Toggle Desktop */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-12 w-6 h-6 bg-red-600 text-white rounded-full items-center justify-center shadow-lg border border-slate-700 hover:bg-red-500 transition-all duration-300 z-[90]"
        >
          <div className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronLeft size={14} />
          </div>
        </button>

        {/* Logo Section */}
        <div className={`p-8 pb-6 flex flex-col items-center border-b border-slate-700/30 mb-2 transition-all duration-500 ${isCollapsed ? 'px-2' : 'lg:items-start'}`}>
          <div className={`bg-white rounded-2xl p-3 shadow-xl border-b-4 border-red-600 flex items-center justify-center shrink-0 transition-all duration-500 ${isCollapsed ? 'w-12 h-12' : 'w-20 h-20 mb-4'}`}>
            <img src={appLogo || "/logo.png"} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100 mt-2'}`}>
            <div className="text-center lg:text-left">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Hệ thống điện tử</span>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">{appName}</h1>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                  isActive ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} className={isActive ? 'text-yellow-400' : 'text-slate-500'} />
                {!isCollapsed && <span className="text-[14px] uppercase tracking-wide truncate animate-in slide-in-from-left-4">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Nút Chuyển Chế độ Dark/Light */}
        <div className="px-4 mb-2">
           <button 
             onClick={() => setIsDarkMode(!isDarkMode)}
             className={`flex items-center gap-4 w-full py-3 rounded-xl transition-all duration-300 ${isCollapsed ? 'justify-center' : 'px-4 bg-slate-700/30 text-slate-300 hover:bg-slate-700'}`}
           >
             {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-400" />}
             {!isCollapsed && <span className="text-[12px] font-bold uppercase">{isDarkMode ? 'Chế độ Sáng' : 'Chế độ Tối'}</span>}
           </button>
        </div>

        {/* User Footer */}
        <div className={`m-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 transition-all duration-500 ${isCollapsed ? 'p-2 flex flex-col items-center gap-4' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-4 text-left">
              <div className="w-10 h-10 rounded-lg border border-red-500 overflow-hidden shrink-0 bg-white">
                <img src={currentUser.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-white truncate">{currentUser.username}</span>
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{currentUser.role}</span>
              </div>
            </div>
          )}
          <button onClick={onLogout} className={`flex items-center justify-center gap-2 transition-all duration-300 ${isCollapsed ? 'text-red-500 hover:scale-110' : 'w-full py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-600/20 text-[12px] font-black uppercase'}`}>
            <LogOut size={16} />
            {!isCollapsed && "Đăng xuất"}
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-[#c41e16] text-white flex items-center justify-between px-4 z-[60] shadow-md">
           <button onClick={() => setIsSidebarOpen(true)}><Menu size={28} /></button>
           <h1 className="text-sm font-black uppercase tracking-tight">{appName}</h1>
           <img src={currentUser.avatarUrl} className="w-10 h-10 rounded-full border-2 border-yellow-400" alt="avatar" />
        </header>

        {/* Nội dung thay đổi theo Dark Mode */}
        <div className={`flex-1 p-4 lg:p-10 overflow-y-auto custom-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-[#f4f7fa]'}`}>
          <div className={`max-w-5xl mx-auto military-ux-container animate-in fade-in slide-in-from-bottom-4 duration-700 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {children}
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;900&display=swap');
        body { font-family: 'Be Vietnam Pro', sans-serif; transition: background-color 0.5s ease; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        
        /* Đồng bộ màu các thẻ Card khi ở Dark Mode */
        .dark .military-ux-container p, 
        .dark .military-ux-container div[class*="bg-white"] {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
          border-color: #334155 !important;
        }
        .dark .military-ux-container h1, .dark .military-ux-container h2 {
          color: #f87171 !important;
        }
      `}</style>
    </div>
  );
};

export default Layout;
