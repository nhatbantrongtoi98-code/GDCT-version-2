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
      
      {/* 1. HEADER MOBILE: Trong suốt, hiện đại */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-[60] shadow-sm">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 active:scale-90 transition-all">
          <Menu size={26} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] leading-none mb-1">QĐND VIỆT NAM</span>
          <h1 className="text-[13px] font-black text-slate-900 uppercase tracking-tight truncate max-w-[180px]">
            {appName}
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-100">
          <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 2. OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[3px] z-[70] lg:hidden animate-fade-in" onClick={closeSidebar} />
      )}

      {/* 3. SIDEBAR: Chuyên nghiệp, logo to rõ nét */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none lg:border-r lg:border-slate-100
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeSidebar} className="lg:hidden absolute top-5 right-5 text-slate-400">
          <X size={24} />
        </button>

        {/* Branding Area - Nâng cấp Logo to */}
        <div className="p-8 pb-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="w-20 h-20 flex items-center justify-center bg-white rounded-3xl p-3 shadow-xl shadow-red-100 border border-red-50 mb-4 transition-transform hover:scale-105">
            <img src={appLogo} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.25em]">Đơn vị tinh nhuệ</span>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              {appName}
            </h1>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200 translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-red-600'
                }`}
              >
                <Icon size={19} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="text-[14px] tracking-tight">{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="m-5 p-4 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-black text-slate-800 truncate leading-tight">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentUser.role}</span>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl border border-slate-200 transition-all text-[12px] font-bold"
          >
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT */}
      <main className="flex-1 p-5 lg:p-12 pt-24 lg:pt-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto custom-typography">
          {children}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 768px) {
          /* Ép logo trong các trang nội dung to lên (Trang truyền thống) */
          .custom-typography img[src*="data:image"],
          .custom-typography img[class*="w-"],
          .custom-typography div[class*="w-12"] {
            width: 80px !important; /* To gấp đôi cũ */
            height: 80px !important;
            margin: 0 auto 15px auto !important;
            display: block !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          }

          /* Tối ưu tiêu đề như mẫu đồng chí gửi */
          .custom-typography h1, 
          .custom-typography h2,
          .custom-typography [class*="text-2xl"],
          .custom-typography b,
          .custom-typography strong {
            font-size: 1.25rem !important;
            font-weight: 800 !important;
            line-height: 1.4 !important;
            text-align: center !important;
            color: #c41e16 !important;
            text-transform: uppercase;
            letter-spacing: -0.02em !important;
            margin-bottom: 1rem !important;
            display: block !important;
          }

          .custom-typography p {
            font-size: 15px !important;
            line-height: 1.6 !important;
            color: #334155 !important;
            text-align: justify !important;
            background: white;
            padding: 15px;
            border-radius: 15px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }

          /* Tối ưu các hàng (Rows) bài học */
          .custom-typography div[class*="bg-white"] {
            border-radius: 20px !important;
            padding: 16px !important;
            border: 1px solid #f1f5f9 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
