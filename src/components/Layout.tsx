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
    <div className="flex min-h-screen relative bg-[#f1f5f9] overflow-x-hidden">
      
      {/* HEADER MOBILE - ĐỎ QUÂN KỲ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#c41e16] text-white flex items-center justify-between px-3 z-[60] shadow-lg">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:bg-red-800 rounded-md transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-[12px] font-bold uppercase tracking-tight text-center flex-1 px-2">
          {appName}
        </h1>
        <div className="w-8 h-8 rounded-sm overflow-hidden border-2 border-[#ffde00] shadow-sm bg-white">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden" onClick={closeSidebar} />
      )}

      {/* SIDEBAR - CHÍNH QUY */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-[#7f1d1d] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none lg:bg-[#7f1d1d]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Nút đóng cho Mobile */}
        <button onClick={closeSidebar} className="lg:hidden absolute top-4 right-4 text-white/70">
          <X size={24} />
        </button>

        {/* LOGO & APP NAME */}
        <div className="p-6 bg-[#c41e16] border-b border-[#ffde00]/30 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white rounded-full p-1 shadow-inner">
              <img src={appLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-lg font-black text-[#ffde00] uppercase leading-tight tracking-tighter drop-shadow-md">
              {appName}
            </h1>
          </div>
        </div>

        {/* MENU ITEMS - NÚT BẤM CỨNG CÁP */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 border-l-4 ${
                  isActive 
                    ? 'bg-[#c41e16] text-white border-[#ffde00] shadow-md' 
                    : 'text-white/80 border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#ffde00]' : 'text-white/60'} />
                <span className="text-[13px] font-bold uppercase tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* USER INFO & LOGOUT */}
        <div className="p-4 bg-black/20 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-sm border border-[#ffde00]/50 overflow-hidden bg-white">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-[#ffde00] uppercase tracking-wider">
                {currentUser.role === 'admin' ? 'Quản lý hệ thống' : 'Học viên/Chiến sĩ'}
              </span>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-600/30 text-white/70 hover:text-white rounded border border-white/10 transition-all text-[12px] font-bold uppercase"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* VÙNG NỘI DUNG CHÍNH */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto military-content">
          {children}
        </div>
      </main>

      <style>{`
        /* Tối ưu văn bản nội dung */
        @media (max-width: 768px) {
          .military-content h1 { font-size: 1.4rem !important; color: #7f1d1d !important; font-weight: 900 !important; }
          .military-content h2 { font-size: 1.2rem !important; color: #c41e16 !important; border-left: 4px solid #ffde00; padding-left: 10px; }
          .military-content p { font-size: 15px !important; line-height: 1.7 !important; text-align: justify; color: #334155; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffde00; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Layout;
