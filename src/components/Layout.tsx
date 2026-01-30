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
      
      {/* HEADER MOBILE: Giao diện phẳng hiện đại */}
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
        <div className="w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden bg-white shadow-sm">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] lg:hidden animate-fade-in" onClick={closeSidebar} />
      )}

      {/* SIDEBAR: Thiết kế chuyên nghiệp, Logo đơn vị to rõ */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-[#1e293b] flex flex-col shadow-2xl transition-transform duration-300 ease-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeSidebar} className="lg:hidden absolute top-5 right-5 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        {/* Branding - Logo to nổi bật */}
        <div className="p-8 pb-6 flex flex-col items-center lg:items-start">
          <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-xl border-b-4 border-red-600 mb-4 transition-transform hover:scale-105">
            <img src={appLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-center lg:text-left">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Đơn vị tinh nhuệ</span>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mt-1">
              {appName}
            </h1>
          </div>
        </div>

        {/* Menu Items: Hiệu ứng Hover chuyên nghiệp */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
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
          <div className="flex items-center gap-3 mb-4 text-left">
            <div className="w-10 h-10 rounded-lg border border-red-500 overflow-hidden shrink-0">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{currentUser.role}</span>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-600/20 transition-all text-[12px] font-black uppercase"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto custom-military-ui">
          {children}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;900&display=swap');
        
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }

        @media (max-width: 768px) {
          /* LOGO ĐƠN VỊ: Cho to lên rõ rệt (100px) */
          .custom-military-ui img[src*="data:image"],
          .custom-military-ui img[class*="w-"],
          .custom-military-ui div[class*="w-12"] {
            width: 100px !important;
            height: 100px !important;
            margin: 0 auto 20px auto !important;
            display: block !important;
            border: 4px solid white !important;
            box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.1) !important;
            border-radius: 24px !important;
          }

          /* TIÊU ĐỀ: Chữ đậm, gọn, đỏ đậm chuyên nghiệp */
          .custom-military-ui h1, 
          .custom-military-ui h2,
          .custom-military-ui b,
          .custom-military-ui strong {
            font-size: 1.3rem !important;
            font-weight: 900 !important;
            line-height: 1.2 !important;
            text-align: center !important;
            color: #b91c1c !important;
            text-transform: uppercase;
            margin-bottom: 1.5rem !important;
            display: block !important;
            letter-spacing: -0.02em !important;
          }

          /* VĂN BẢN NỘI DUNG: Dễ đọc, sạch sẽ */
          .custom-military-ui p {
            font-size: 15px !important;
            line-height: 1.7 !important;
            color: #1e293b !important;
            text-align: justify !important;
            background: white !important;
            padding: 20px !important;
            border-radius: 20px !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
            margin-bottom: 1rem !important;
          }

          /* DANH SÁCH ĐƠN VỊ: Thẻ Card tinh tế */
          .custom-military-ui div[class*="bg-white"] {
            border-radius: 24px !important;
            padding: 18px !important;
            border: 1px solid #e2e8f0 !important;
            transition: transform 0.2s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
