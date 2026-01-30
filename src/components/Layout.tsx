
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, History, Shield, BookOpen, Music, Zap, Settings, LogOut, ChevronRight, ChevronDown, User as UserIcon } from 'lucide-react';
import VpaLogo from './VpaLogo';
import { User } from '../types';
import { COLORS, UNIT_TRADITIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, setCurrentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-stone-100">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#1A2E14] text-white z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col shadow-2xl overflow-y-auto`}
      >
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <VpaLogo size={80} animate />
          <h1 className="mt-4 font-bold text-center text-lg leading-tight text-[#FFFF00]">
            BỔ TRỢ HỌC TẬP CHÍNH TRỊ
          </h1>
          <div className="mt-2 text-xs opacity-60 italic">Kỷ cương - Trách nhiệm - Quyết thắng</div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
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
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'bg-[#DA251D] text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className={currentPage === item.id ? 'text-white' : 'text-[#FFFF00]'} />
                  <span className="font-medium text-sm lg:text-base">{item.label}</span>
                </div>
                {item.children && (
                  expandedItems[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </button>
              
              {item.children && expandedItems[item.id] && (
                <div className="ml-9 space-y-1 border-l border-white/10 pl-2 mt-1">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => navigateTo(child.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs lg:text-sm transition-colors ${
                        currentPage === child.id 
                          ? 'bg-[#FFFF00]/20 text-[#FFFF00]' 
                          : 'hover:bg-white/5 opacity-80 hover:opacity-100'
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

        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-[#DA251D] p-2 rounded-full">
              {/* Fix: Using UserIcon alias instead of User to avoid conflict with User type from '../types' */}
              <UserIcon size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.username}</p>
              <p className="text-xs opacity-50 capitalize">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-white/5 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg transition-colors border border-red-900/30"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Top Header for Mobile */}
        <header className="lg:hidden h-16 bg-[#2E4D23] flex items-center justify-between px-4 text-white shadow-md sticky top-0 z-30">
          <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <VpaLogo size={32} />
            <span className="font-bold text-sm text-[#FFFF00]">QĐND VIỆT NAM</span>
          </div>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
