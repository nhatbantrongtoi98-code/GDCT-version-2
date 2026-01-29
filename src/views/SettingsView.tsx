import React, { useState, useEffect } from 'react';
import { User, Image as ImageIcon, Camera, X, Save, Loader2 } from 'lucide-react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          const isAdmin = data?.role === 'Quản trị viên' || user.email?.includes('admin') || user.displayName?.includes('admin');
          const defaultName = isAdmin ? "NGUYỄN ĐẮC THANH" : (user.displayName || "CHIẾN SĨ");
          
          setUserData({
            fullName: data?.fullName || defaultName,
            role: data?.role || (isAdmin ? "SĨ QUAN QUẢN LÝ" : "CHIẾN SĨ"),
            uid: user.uid
          });
          setNewName(data?.fullName || defaultName);
        });
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  const handleUpdateName = async () => {
    if (!newName.trim() || !userData.uid) return;
    setIsUpdating(true);
    try {
      await update(ref(db, `users/${userData.uid}`), { fullName: newName.trim().toUpperCase() });
      setIsModalOpen(false);
    } catch (error) {
      alert("LỖI CẬP NHẬT");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      {/* HEADER BO GÓC 3REM - ĐÚNG BỐ CỤC CŨ */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.fullName)}`} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 p-2 bg-red-600 text-white rounded-full shadow-lg border-2 border-white"><Camera size={16} /></div>
        </div>
        <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-2 tracking-tight">{userData.fullName}</h2>
        <div className={`px-8 py-2 rounded-full text-white text-[11px] font-black uppercase tracking-widest shadow-md ${userData.role.includes('QUẢN LÝ') ? 'bg-red-700' : 'bg-orange-500'}`}>
          {userData.role}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        <div onClick={() => setIsModalOpen(true)} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:scale-[1.02] transition-all cursor-pointer group">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all"><User size={28} /></div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 uppercase text-sm">Hồ sơ cá nhân</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Sửa tên hiển thị</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 opacity-60">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><ImageIcon size={28} /></div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 uppercase text-sm">Hình nền hệ thống</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Đang phát triển...</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 uppercase italic">Cập nhật danh tính</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value.toUpperCase())} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold uppercase outline-none focus:border-red-600 mb-4" />
            <button onClick={handleUpdateName} disabled={isUpdating} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2">
              {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} LƯU THÔNG TIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
