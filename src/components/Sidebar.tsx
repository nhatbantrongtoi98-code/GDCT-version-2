import React, { useState, useEffect } from 'react';
import { 
  Home, History, BookOpen, Gamepad2, 
  Settings, LogOut, ShieldCheck, Trophy 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  // 1. Tự động lấy Tên và Ảnh từ bộ nhớ, nếu chưa có thì dùng mặc định
  const [name, setName] = useState(() => localStorage.getItem('user_display_name') || "ADMIN123");
  const [avatar, setAvatar] = useState(() => localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");

  useEffect(() => {
    // 2. Hàm đồng bộ hóa tức thì khi Settings nhấn "Lưu"
    const syncUserData = () => {
      const savedName = localStorage.getItem('user_display_name');
      const savedAvatar = localStorage.getItem('user_avatar');
      
      if (savedName) setName(savedName);
      if (savedAvatar) setAvatar(savedAvatar);
    };

    // Lắng nghe tín hiệu từ trang Settings
    window.addEventListener('storage', syncUserData);
    
    // Tạo thêm một bộ nghe tùy chỉnh để đảm bảo đồng bộ trên cùng 1 Tab
    window.addEventListener('userUpdate', syncUserData as EventListener);

    return () => {
      window.removeEventListener('storage', syncUserData);
      window.removeEventListener('userUpdate', syncUserData as EventListener);
    };
  }, []);

  const menuItems = [
    { icon: <Trophy size={20} />, label: 'Hệ thống giáo dục chính trị', active: false },
    { icon: <Home size={20} />, label: 'Trang chủ', active: false },
    { icon: <History size={20} />, label: 'Lịch sử Dân tộc Việt Nam', active: false },
    { icon: <ShieldCheck size={20} />, label: 'Lịch sử, truyền thống đơn vị', active: false },
    { icon: <BookOpen size={20} />, label: 'Bài giảng chính trị', active: false },
    { icon: <Gamepad2 size={20} />, label: 'Chiến sĩ thông thái', active: false },
    { icon: <Settings size={20} />, label: 'Cài đặt', active: true },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm">
      {/* Logo hệ thống chuẩn */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-red-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100">
           <ShieldCheck size={24} />
        </div>
        <div className="text-red-700 font-black italic leading-[1.1] text-[15px] uppercase">
          Hệ thống <br/> Giáo dục chính trị
        </div>
      </div>

      {/* Danh sách Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
              item.active 
              ? 'bg-red-700 text-white shadow-xl shadow-red-200 translate-x-1' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={item.active ? 'text-white' : 'text-slate-400 group-hover:text-red-700'}>
              {item.icon}
            </span>
            <span className="text-[12px] font-black uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* PHẦN THÔNG TIN USER (ĐÃ KHẮC PHỤC LỖI TÊN & ẢNH) */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3 px-2 bg-slate-50/50 p-3 rounded-[2rem]">
        <div className="w-12 h-12 rounded-[1.2rem] overflow-hidden border-2 border-white shadow-md bg-white">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          {/* Tên sẽ tự động đổi từ ADMIN123 sang tên của đồng chí ngay khi nhấn Lưu ở Settings */}
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter leading-none mb-1">
            {name}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest">
              Đang trực tuyến
            </span>
          </div>
        </div>
      </div>

      {/* Nút Đăng xuất */}
      <button className="flex items-center gap-3 px-4 py-5 mt-4 text-slate-400 hover:text-red-700 transition-all group">
        <div className="p-2 rounded-xl group-hover:bg-red-50 transition-all">
          <LogOut size={18} />
        </div>
        <span className="text-[11px] font-black uppercase italic tracking-widest">Đăng xuất hệ thống</span>
      </button>
    </div>
  );
};

export default Sidebar;
