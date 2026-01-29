import React, { useState, useEffect } from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, LogOut, ShieldCheck, Trophy } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar: React.FC = () => {
  const [userData, setUserData] = useState({ name: "", role: "", avatar: "" });
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          const isAdmin = user.email?.includes('admin') || data?.role?.includes('QUẢN LÝ');
          
          // Logic: Admin mặc định Nguyễn Đắc Thanh, Chiến sĩ lấy tên đăng nhập
          const defaultName = isAdmin ? "NGUYỄN ĐẮC THANH" : (user.email?.split('@')[0].toUpperCase() || "CHIẾN SĨ");

          setUserData({
            name: data?.fullName || defaultName,
            role: data?.role || (isAdmin ? "SĨ QUAN QUẢN LÝ" : "CHIẾN SĨ"),
            avatar: data?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          });
        });
      }
    });
    return () => unsubscribe();
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
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm bg-slate-100">
          <img src={userData.avatar} className="w-full h-full object-cover" alt="User" />
        </div>
        <div className="flex flex-col overflow-hidden text-left">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">{userData.name}</span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">{userData.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
