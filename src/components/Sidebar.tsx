import React, { useState, useEffect } from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, ShieldCheck, Trophy } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar: React.FC = () => {
  // 1. Sửa lại State để khớp hoàn toàn với cấu trúc Database
  const [userData, setUserData] = useState({ 
    fullName: "QUÂN NHÂN", 
    role: "SĨ QUAN QUẢN LÝ", 
    avatarUrl: "" 
  });
  
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        // Lắng nghe Realtime - Cài đặt thay đổi là Sidebar đổi theo ngay lập tức
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              fullName: data.fullName || "QUÂN NHÂN",
              role: data.role || "SĨ QUAN QUẢN LÝ",
              avatarUrl: data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.fullName || 'Admin'}`
            });
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  const menuItems = [
    { icon: <Trophy size={20} />, label: 'SỔ TAY GDCT' },
    { icon: <Home size={20} />, label: 'Trang chủ' },
    { icon: <History size={20} />, label: 'Lịch sử Dân tộc Việt Nam' },
    { icon: <ShieldCheck size={20} />, label: 'Lịch sử, truyền thống đơn vị' },
    { icon: <BookOpen size={20} />, label: 'Bài giảng chính trị' },
    { icon: <Gamepad2 size={20} />, label: 'Chiến sĩ thông thái' },
    { icon: <Settings size={20} />, label: 'Cài đặt', active: true },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
         {/* Logo đơn vị */}
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Emblem_of_the_Vietnam_People%27s_Army.svg/1200px-Emblem_of_the_Vietnam_People%27s_Army.svg.png" className="w-8 h-8 object-contain" alt="Logo" />
        <div className="text-red-700 font-black italic leading-tight text-lg uppercase">SỔ TAY GDCT</div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-red-700 text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:bg-slate-50'}`}>
            {item.icon}
            <span className="text-[13px] font-bold uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* PHẦN HIỂN THỊ NGƯỜI DÙNG - ĐÃ SỬA LỖI BIẾN MẤT TÊN */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm bg-slate-100 flex-shrink-0">
          <img 
            src={userData.avatarUrl} 
            className="w-full h-full object-cover" 
            alt="User" 
            onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/150" }}
          />
        </div>
        <div className="flex flex-col overflow-hidden text-left">
          {/* Đã sửa từ userData.name thành userData.fullName */}
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {userData.fullName}
          </span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">
            {userData.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
