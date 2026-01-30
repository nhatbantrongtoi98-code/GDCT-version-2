import React, { useState, useEffect } from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, ShieldCheck, Trophy } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 1. Định nghĩa interface cho Props để nhận hàm điều hướng
interface SidebarProps {
  onNavigate: (id: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeTab }) => {
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
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              fullName: data.fullName || "QUÂN NHÂN",
              role: data.role || "SĨ QUAN QUẢN LÝ",
              avatarUrl: data.avatarUrl || ""
            });
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  // 2. Thêm ID cho menuItems để khớp với App.tsx
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Trang chủ' },
    { id: 'history-vn', icon: <History size={20} />, label: 'Lịch sử Dân tộc Việt Nam' },
    { id: 'tradition', icon: <ShieldCheck size={20} />, label: 'Lịch sử, truyền thống đơn vị' },
    { id: 'bai-giang', icon: <BookOpen size={20} />, label: 'Bài giảng chính trị' },
    { id: 'game', icon: <Gamepad2 size={20} />, label: 'Chiến sĩ thông thái' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Cài đặt' },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
         <img src="/vpa-logo.png" alt="Logo" className="w-8 h-8" />
        <div className="text-red-700 font-black italic leading-tight text-lg uppercase">SỔ TAY GDCT</div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            // 3. THÊM SỰ KIỆN CLICK Ở ĐÂY
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
              activeTab === item.id 
                ? 'bg-red-700 text-white shadow-lg shadow-red-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-[13px] font-bold uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User info giữ nguyên... */}
    </div>
  );
};

export default Sidebar;
