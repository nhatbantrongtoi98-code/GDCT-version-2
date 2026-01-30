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
      
      {/* 1. HEADER MOBILE: Đỏ quân kỳ, thanh thoát */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#c41e16] text-white flex items-center justify-between px-3 z-[60] shadow-lg">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:bg-red-800 rounded-md transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-[12px] font-bold uppercase tracking-tight text-center flex-1 px-2 truncate">
          {appName}
        </h1>
        <div className="w-8 h-8 rounded-sm overflow-hidden border-2 border-[#ffde00] bg-white shadow-sm">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 2. OVERLAY: Lớp phủ khi mở menu mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden animate-fade-in" 
          onClick={closeSidebar} 
        />
      )}

      {/* 3. SIDEBAR: Giữ nguyên bố cục Desktop (w-72), linh hoạt trên Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-[#7f1d1d] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none lg:border-r lg:border-white/10
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Nút đóng Sidebar trên Mobile */}
        <button onClick={closeSidebar} className="lg:hidden absolute top-4 right-4 text-white/70 p-1">
          <X size={24} />
        </button>

        {/* LOGO ĐƠN VỊ */}
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

        {/* DANH MỤC MENU */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar} // Tự động đóng sidebar khi click
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 border-l-4 ${
                  isActive 
                    ? 'bg-[#c41e16] text-white border-[#ffde00] shadow-md' 
                    : 'text-white/80 border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#ffde00]' : 'text-white/60'} />
                <span className="text-[13px] font-bold uppercase tracking-wide">{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* THÔNG TIN NGƯỜI DÙNG & ĐĂNG XUẤT */}
        <div className="p-4 bg-black/20 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm border border-[#ffde00]/50 overflow-hidden bg-white shrink-0">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-[#ffde00] uppercase tracking-wider italic">
                {currentUser.role === 'admin' ? 'Sĩ quan Quản lý' : 'Chiến sĩ'}
              </span>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-red-600/40 text-white/70 hover:text-white rounded border border-white/10 transition-all text-[12px] font-bold uppercase"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 4. VÙNG NỘI DUNG CHÍNH: Tối ưu hiển thị văn bản */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto military-content">
          {children}
        </div>
      </main>

      {/* CSS ĐẶC TRỊ LỖI CHỮ TO TRÊN MOBILE */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffde00; border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.2s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 768px) {
          /* Ép tất cả tiêu đề (như trong ảnh đồng chí gửi) phải co lại */
          .military-content h1, 
          .military-content h2,
          .military-content [class*="text-2xl"], 
          .military-content [class*="text-3xl"],
          .military-content b, 
          .military-content strong {
            font-size: 1.15rem !important; /* Cỡ chữ gọn đẹp trên mobile */
            line-height: 1.3 !important;
            text-align: center !important;
            display: block !important;
            margin-bottom: 0.75rem !important;
            color: #7f1d1d !important;
            word-break: break-word !important;
          }

          /* Tối ưu các đoạn văn bản cho chiến sĩ dễ đọc */
          .military-content p, 
          .military-content span:not(.truncate) {
            font-size: 14.5px !important;
            line-height: 1.6 !important;
            text-align: justify !important;
            color: #334155 !important;
          }

          /* Tối ưu các khối Card trắng nội dung */
          .military-content div[class*="bg-white"] {
            padding: 12px !important;
            margin-bottom: 10px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
