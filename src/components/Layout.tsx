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
      
      {/* 1. HEADER MOBILE: Đỏ chính quy, bóng mờ hiện đại */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#c41e16] text-white flex items-center justify-between px-4 z-[60] shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:scale-90 transition-all">
          <Menu size={28} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.2em] leading-none mb-1 text-center">Sổ tay huấn luyện</span>
          <h1 className="text-[14px] font-black uppercase tracking-tight truncate max-w-[180px] text-center">
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

      {/* 3. SIDEBAR: Giữ nguyên bố cục Desktop (w-72) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-[#1e293b] flex flex-col shadow-2xl transition-transform duration-300 ease-out
        lg:sticky lg:h-screen lg:translate-x-0 lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeSidebar} className="lg:hidden absolute top-5 right-5 text-slate-400">
          <X size={24} />
        </button>

        {/* Logo App trên Sidebar */}
        <div className="p-8 pb-6 flex flex-col items-center lg:items-start border-b border-slate-700/30 mb-2">
          <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-xl border-b-4 border-red-600 mb-4 flex items-center justify-center shrink-0">
            {appLogo ? (
               <img src={appLogo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
               <span className="text-4xl">🎖️</span>
            )}
          </div>
          <div className="text-center lg:text-left">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Hệ thống điện tử</span>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mt-1">
              {appName}
            </h1>
          </div>
        </div>

        {/* Menu điều hướng */}
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

        {/* Footer User */}
        <div className="m-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4 text-left">
            <div className="w-10 h-10 rounded-lg border border-red-500 overflow-hidden shrink-0 bg-white">
              <img src={currentUser.avatarUrl || ''} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">{currentUser.username}</span>
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{currentUser.role}</span>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-600/20 transition-all text-[12px] font-black uppercase">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT: Vùng hiển thị nội dung bài học */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto military-ux-container">
          {children}
        </div>
      </main>

      {/* CSS TỐI ƯU THẨM MỸ: ĐẶC TRỊ LOGO & CHỮ TRÊN MOBILE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;900&display=swap');
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }

        @media (max-width: 768px) {
          /* LOGO ĐƠN VỊ: Điều chỉnh về 80px, hiển thị đầy đủ hình ảnh */
          .military-ux-container img:not([alt="avatar"]), 
          .military-ux-container .shrink-0 img {
            width: 80px !important; 
            height: 80px !important;
            min-width: 80px !important;
            margin: 0 auto 15px auto !important;
            display: block !important;
            border-radius: 16px !important;
            object-fit: contain !important; /* Không bao giờ mất chi tiết logo */
            background: #ffffff !important;
            padding: 8px !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
          }

          /* TIÊU ĐỀ: Gọn gàng, màu đỏ sậm chính quy */
          .military-ux-container h1, 
          .military-ux-container h2, 
          .military-ux-container b, 
          .military-ux-container strong {
            font-size: 1.15rem !important;
            font-weight: 800 !important;
            line-height: 1.4 !important;
            color: #b91c1c !important;
            text-align: center !important;
            display: block !important;
            margin-bottom: 0.8rem !important;
            text-transform: uppercase !important;
            letter-spacing: -0.01em !important;
          }

          /* ĐOẠN VĂN: Bo góc mịn, đổ bóng nhẹ */
          .military-ux-container p {
            font-size: 14.5px !important;
            line-height: 1.6 !important;
            color: #334155 !important;
            background: white !important;
            padding: 18px !important;
            border-radius: 20px !important;
            margin-bottom: 12px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
            text-align: justify !important;
          }

          /* CÁC THẺ CARD TRONG NỘI DUNG */
          .military-ux-container div[class*="bg-white"] {
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
