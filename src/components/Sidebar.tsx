import React, { useState } from 'react';
import { 
  Home, History, Shield, Book, Music, Zap, Settings, 
  ChevronLeft, ChevronRight, LogOut, Menu, X, ChevronDown 
} from 'lucide-react';

const Sidebar = ({ onNavigate, activeTab, onLogout, username, isCollapsed, setIsCollapsed }: any) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const navAction = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 768) setIsMobileOpen(false);
  };

  const menu = [
    { id: 'dashboard', label: 'Trang chủ', icon: <Home size={22}/> },
    { id: 'history-vn', label: 'Lịch sử QĐND VN', icon: <History size={22}/> },
    { 
      id: 'tradition', label: 'Truyền thống đơn vị', icon: <Shield size={22}/>,
      subs: ['tradition-thudo', 'tradition-301', 'tradition-59', 'tradition-692', 'tradition-757']
    },
    { id: 'lectures', label: 'Bài giảng chính trị', icon: <Book size={22}/>, subs: ['lecture-newbie', 'lecture-hsq'] },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: <Zap size={22}/> },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: <Settings size={22}/> },
  ];

  return (
    <>
      {/* Mobile Header (Ẩn hoàn toàn Sidebar trên điện thoại) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#1a2e12] p-4 flex justify-between items-center z-[60] shadow-md">
        <span className="text-yellow-500 font-black uppercase text-xs tracking-widest">Sổ tay GDCT</span>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white"><Menu /></button>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-[58] bg-[#1a2e12] text-white transition-all duration-300 shadow-2xl flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-72'}
      `}>
        
        {/* Nút Thu gọn (Chỉ hiện trên máy tính) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-yellow-500 rounded-full items-center justify-center text-green-950 shadow-lg z-[60]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo & Header */}
        <div className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-red-700 rounded-lg flex-shrink-0 flex items-center justify-center">
             <img src="/vpa-logo.png" className="w-7 h-7" alt="VPA" />
          </div>
          {!isCollapsed && <span className="font-black text-xs text-yellow-500 uppercase">Học tập chính trị</span>}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-2 mt-4 overflow-y-auto overflow-x-hidden">
          {menu.map((item) => (
            <div key={item.id}>
              <button 
                onClick={() => item.subs && !isCollapsed ? setOpenSub(openSub === item.id ? null : item.id) : navAction(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 px-4'} py-3.5 rounded-xl transition-all ${activeTab.includes(item.id) ? 'bg-yellow-500 text-green-950 font-bold' : 'text-white/60 hover:bg-white/5'}`}
                title={item.label}
              >
                <span className={activeTab.includes(item.id) ? 'text-green-950' : 'text-yellow-500'}>{item.icon}</span>
                {!isCollapsed && <span className="text-[12px] uppercase font-bold truncate">{item.label}</span>}
              </button>
            </div>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 mb-4'}`}>
            <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center font-bold border border-white/20">
              {username.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden text-left">
                <span className="text-xs font-bold truncate">{username}</span>
                <span className="text-[9px] text-white/40 uppercase">Quân nhân</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold uppercase transition-all">
              <LogOut size={14} /> Đăng xuất
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
