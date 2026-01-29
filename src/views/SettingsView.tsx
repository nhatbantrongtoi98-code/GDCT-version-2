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
          if (data) {
            setUserData({
              fullName: data.fullName || user.displayName || "CHIẾN SĨ",
              role: data.role || "Chiến sĩ",
              uid: user.uid
            });
            setNewName(data.fullName || "");
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  const handleUpdateName = async () => {
    if (!newName.trim() || !userData.uid) return;
    setIsUpdating(true);
    try {
      // CẬP NHẬT LÊN DATABASE - SIDEBAR SẼ TỰ ĐỔI THEO TRONG 0.1s
      await update(ref(db, `users/${userData.uid}`), {
        fullName: newName.trim().toUpperCase()
      });
      setIsModalOpen(false);
      alert("✅ ĐÃ CẬP NHẬT DANH TÍNH");
    } catch (error) {
      alert("❌ LỖI");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!userData.uid) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.fullName)}`} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-2">{userData.fullName}</h2>
        <div className={`px-6 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-widest ${userData.role.includes('QUẢN LÝ') || userData.role.includes('Quản trị viên') ? 'bg-red-600' : 'bg-orange-500'}`}>
          {userData.role}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => setIsModalOpen(true)} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:scale-[1.02] transition-all cursor-pointer">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><User size={24} /></div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 uppercase text-sm">Hồ sơ cá nhân</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Sửa tên hiển thị</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black uppercase italic mb-6">Đổi tên mới</h3>
            <input 
              type="text" value={newName} 
              onChange={(e) => setNewName(e.target.value.toUpperCase())}
              className="w-full p-4 bg-slate-50 border-2 rounded-2xl font-bold uppercase mb-4 outline-none focus:border-red-600"
            />
            <button onClick={handleUpdateName} disabled={isUpdating} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
              {isUpdating ? <Loader2 className="animate-spin" /> : <Save />} LƯU THÔNG TIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
