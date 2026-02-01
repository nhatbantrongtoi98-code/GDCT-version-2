
import React, { useState } from 'react';
import { Menu, X, Home, History, Shield, BookOpen, Music, Zap, Settings, LogOut, ChevronRight, ChevronDown, User as UserIcon } from 'lucide-react';
import VpaLogo from './VpaLogo';
import { User } from '../types';
import { UNIT_TRADITIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, setCurrentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'unit-tradition': true, // Mặc định mở các mục quan trọng
    'lectures': true
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const navigateTo = (path: string) => {
    setCurrentPage(path);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'vpa-history', label: 'Lịch sử QĐND VN', icon: History },
    { 
      id: 'unit-tradition', 
      label: 'Truyền thống đơn vị', 
      icon: Shield,
      children: UNIT_TRADITIONS.map(u => ({ id: `unit-${u.id}`, label: u.name }))
    },
    { 
      id: 'lectures', 
      label: 'Bài giảng chính trị', 
      icon: BookOpen,
      children: [
        { id: 'lectures-csm', label: 'Chiến sĩ mới (6 bài)' },
        { id: 'lectures-hsq', label: 'HSQ-CS (12 bài)' },
      ]
    },
    { 
      id: 'entertainment', 
      label: 'Góc giải trí', 
      icon: Music,
      children: [
        { id: 'songs', label: '15 Bài hát quy định' },
        { id: 'dances', label: '5 Điệu vũ quân đội' },
      ]
    },
    { id: 'wise-soldier', label: 'Chiến sĩ thông thái', icon: Zap },
    { 
      id: 'settings', 
      label: 'Cài đặt hệ thống', 
      icon: Settings,
      children: [
        { id: 'settings-ui', label: 'Chỉnh sửa giao diện' },
        { id: 'settings-pass', label: 'Cập nhật mật khẩu' },
        { id: 'settings-user', label: 'Thay đổi tên người dùng' },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-stone-100 font-['Be_Vietnam_Pro']">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-72 md:w-80 bg-[#1A2E14] text-white z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col shadow-2xl`}
      >
        <div className="p-6 md:p-8 flex flex-col items-center border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <VpaLogo size={90} animate />
          <h1 className="mt-4 font-black text-center text-lg md:text-xl leading-tight text-[#FFFF00] uppercase tracking-tighter">
            Học tập Chính trị
          </h1>
          <div className="mt-2 text-[10px] opacity-60 uppercase font-bold tracking-[0.2em] text-white">QĐND Việt Nam</div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                  } else {
                    navigateTo(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                  currentPage === item.id 
                    ? 'bg-[#DA251D] text-white shadow-lg shadow-[#DA251D]/20' 
                    : 'hover:bg-white/10 text-stone-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className={currentPage === item.id ? 'text-white' : 'text-[#FFFF00]'} />
                  <span className={`font-bold text-sm ${currentPage === item.id ? 'text-white' : ''}`}>{item.label}</span>
                </div>
                {item.children && (
                  <div className={`transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} className="opacity-50" />
                  </div>
                )}
              </button>
              
              {item.children && expandedItems[item.id] && (
                <div className="ml-6 space-y-1 border-l-2 border-white/5 pl-4 mt-1 mb-2 animate-fadeInSide">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => navigateTo(child.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs md:text-sm transition-all ${
                        currentPage === child.id 
                          ? 'bg-[#FFFF00]/20 text-[#FFFF00] font-bold' 
                          : 'text-stone-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 md:p-6 border-t border-white/10 bg-black/30">
          <div className="flex items-center space-x-3 mb-4 bg-white/5 p-3 rounded-2xl">
            <div className="bg-[#DA251D] p-2.5 rounded-xl shadow-lg">
              <UserIcon size={18} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate text-white uppercase tracking-tight">{user.username}</p>
              <p className="text-[10px] opacity-50 capitalize font-bold text-[#FFFF00]">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all font-bold text-sm border border-red-600/20 active:scale-95"
          >
            <LogOut size={18} />
            <span>ĐĂNG XUẤT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative z-10">
        {/* Top Header for Mobile */}
        <header className="lg:hidden h-16 bg-[#2E4D23] flex items-center justify-between px-4 text-white shadow-xl sticky top-0 z-30 border-b border-white/10">
          <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <VpaLogo size={36} />
            <div className="flex flex-col">
              <span className="font-black text-xs text-[#FFFF00] uppercase tracking-widest leading-none">QĐND VIỆT NAM</span>
              <span className="text-[8px] opacity-70 uppercase font-bold tracking-tighter">Học tập Chính trị</span>
            </div>
          </div>
          <div className="w-10"></div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-stone-50">
          {children}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes fadeInSide {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInSide { animation: fadeInSide 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Layout;
