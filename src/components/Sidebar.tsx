import React, { useState, useEffect } from 'react';
import { 
  Home, History, BookOpen, Gamepad2, 
  Settings, LogOut, ShieldCheck, Trophy 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  // 1. Tự động lấy tên từ bộ nhớ, nếu chưa có thì dùng mặc định
  const [name, setName] = useState(localStorage.getItem('user_display_name') || "ADMIN123");

  useEffect(() => {
    // Hàm cập nhật tên ngay lập tức khi trang Settings nhấn "Lưu"
    const syncName = () => {
      const savedName = localStorage.getItem('user_display_name');
      if (savedName) setName(savedName);
    };

    window.addEventListener('storage', syncName);
    return () => window.removeEventListener('storage', syncName);
  }, []);

  const menuItems = [
    { icon: <Trophy size={20} />, label: 'Hệ thống giáo dục chính trị', active: false, isHeader: true },
    { icon: <Home size={20} />, label: 'Trang chủ', active: false },
    { icon: <History size={20} />, label: 'Lịch sử Dân tộc Việt Nam', active: false },
    { icon: <ShieldCheck size={20} />, label: 'Lịch sử, truyền thống đơn vị', active: false },
    { icon: <BookOpen size={20} />, label: 'Bài giảng chính trị', active: false },
    { icon: <Gamepad2 size={20} />, label: 'chiến sĩ thông thái', active: false },
    { icon: <Settings size={20} />, label: 'Cài đặt', active: true },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm">
      {/* Logo hệ thống */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="text-red-700 font-black italic leading-tight text-lg">
          HỆ THỐNG GIÁO DỤC CHÍNH TRỊ
        </div>
      </div>

      {/* Danh sách Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
              item.active ? 'bg-red-700 text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-[13px] font-bold uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* PHẦN THÔNG TIN USER (ĐÃ KHẮC PHỤC LỖI TÊN) */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
        </div>
        <div className="flex flex-col overflow-hidden">
          {/* Tên này sẽ đổi từ admin123 sang Nguyễn Đắc Thanh ngay khi nhấn lưu */}
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {name}
          </span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">
            Sĩ quan quản lý
          </span>
        </div>
      </div>

      {/* Nút Đăng xuất */}
      <button className="flex items-center gap-3 px-4 py-4 mt-4 text-slate-400 hover:text-red-700 transition-colors">
        <LogOut size={18} />
        <span className="text-[11px] font-bold uppercase italic">Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;
