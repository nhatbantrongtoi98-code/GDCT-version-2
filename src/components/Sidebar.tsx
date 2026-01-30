import React, { useState, useEffect } from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, ShieldCheck } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  // ID ở đây phải khớp 100% với Case trong App.tsx
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Trang chủ' },
    { id: 'history-vn', icon: <History size={20} />, label: 'Lịch sử Dân tộc Việt Nam' },
    { id: 'tradition', icon: <ShieldCheck size={20} />, label: 'Lịch sử, truyền thống đơn vị' },
    { id: 'bai-giang', icon: <BookOpen size={20} />, label: 'Bài giảng chính trị' },
    { id: 'game', icon: <Gamepad2 size={20} />, label: 'Chiến sĩ thông thái' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Cài đặt' },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="text-red-700 font-black italic leading-tight text-lg uppercase tracking-tighter">SỔ TAY GDCT</div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onNavigate(item.id)} // Kích hoạt lệnh điều hướng
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
              activeTab === item.id 
                ? 'bg-red-700 text-white shadow-lg shadow-red-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="text-[11px] font-bold uppercase tracking-tighter leading-none">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-50 bg-slate-100">
          <img src={userData.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=Admin"} className="w-full h-full object-cover" alt="User" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[11px] font-black text-slate-800 truncate uppercase italic">{userData.fullName}</span>
          <span className="text-[8px] font-bold text-red-600 uppercase italic">{userData.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
