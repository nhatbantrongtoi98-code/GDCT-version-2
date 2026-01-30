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
    <div className="flex min-h-screen relative bg-[#f8fafc] overflow-x-hidden font-sans">
      
      {/* 1. HEADER MOBILE: Thiết kế phẳng (Flat Design) hiện đại */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-[60] shadow-sm">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
          <Menu size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-none mb-1">Sổ tay điện tử</span>
          <h1 className="text-[13px] font-black text-slate-800 uppercase tracking-tight truncate max-w-[180px]">
            {appName}
          </h1>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 2. OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[70] lg:hidden animate-fade-in" 
          onClick={closeSidebar} 
        />
      )}

      {/* 3. SIDEBAR: Giữ nguyên bố cục Desktop, nâng cấp giao diện UI/UX */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none lg:border-r lg:border-slate-200
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeSidebar} className="lg:hidden absolute top-5 right-5 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>

        {/* Branding Area */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-red-50 rounded-2xl p-2 shadow-sm">
              <img src={appLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em]">Hệ thống</span>
              <h1 className="text-xl font-black text-slate-800 uppercase leading-none tracking-tighter">
                {appName}
              </h1>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-red-500' : 'text-slate-400'} />
                <span className="text-[14px] tracking-tight">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 mx-4 mb-6 mt-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0 border-2 border-white">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-black text-slate-800 truncate leading-tight">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{currentUser.role}</span>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 py-2 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg border border-slate-200 transition-all text-[12px] font-bold shadow-sm"
          >
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT: Tối ưu khoảng cách và Font-size chuẩn Mobile */}
      <main className="flex-1 p-5 lg:p-12 pt-24 lg:pt-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto custom-typography">
          {children}
        </div>
      </main>

      {/* CSS KHẮC PHỤC CHỮ XẤU & TỐI ƯU THẨM MỸ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 768px) {
          /* Ép cỡ chữ tiêu đề tinh tế, không bị vỡ dòng */
          .custom-typography h1, 
          .custom-typography h2,
          .custom-typography [class*="text-2xl"], 
          .custom-typography [class*="text-3xl"] {
            font-size: 1.1rem !important;
            font-weight: 800 !important;
            line-height: 1.4 !important;
            text-align: center !important;
            letter-spacing: -0.01em !important;
            margin-bottom: 1.2rem !important;
            color: #1e293b !important;
            text-transform: uppercase;
          }

          /* Highlight tiêu đề quan trọng (Truyền thống đơn vị...) */
          .custom-typography b, 
          .custom-typography strong {
            color: #c41e16 !important;
            font-size: 1.15rem !important;
            display: block !important;
            text-align: center !important;
            margin: 10px 0 !important;
          }

          /* Nội dung bài giảng: Font chữ San-serif sạch sẽ */
          .custom-typography p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            color: #475569 !important;
            text-align: justify !important;
            margin-bottom: 1rem !important;
          }

          /* Bo góc Card và hiệu ứng đổ bóng chuẩn UI hiện đại */
          .custom-typography div[class*="bg-white"] {
            padding: 16px !important;
            margin-bottom: 12px !important;
            border-radius: 16px !important;
            border: 1px solid #f1f5f9 !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
