import React, { useState, useEffect } from 'react';
import { Home, History, BookOpen, Gamepad2, Settings, LogOut, ShieldCheck, Trophy } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar: React.FC = () => {
  const [displayName, setDisplayName] = useState("CHIẾN SĨ");
  const [role, setRole] = useState("Đang tải...");
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // LẮNG NGHE REALTIME TỪ DATABASE
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setDisplayName(data.fullName || user.displayName || "CHIẾN SĨ");
            setRole(data.role || "Chiến sĩ");
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

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
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="text-red-700 font-black italic leading-tight text-lg uppercase">
          Hệ thống <br/> Giáo dục chính trị
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
            {item.icon}
            <span className="text-[13px] font-bold uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm bg-slate-100">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {displayName}
          </span>
          <span className={`text-[9px] font-bold uppercase italic ${role.includes('QUẢN LÝ') ? 'text-red-600' : 'text-orange-500'}`}>
            {role}
          </span>
        </div>
      </div>

      <button className="flex items-center gap-3 px-4 py-4 mt-4 text-slate-400 hover:text-red-700 transition-colors group">
        <LogOut size={18} />
        <span className="text-[11px] font-bold uppercase italic">Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;
