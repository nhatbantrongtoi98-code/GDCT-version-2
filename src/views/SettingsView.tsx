import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, Save, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "" });
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          const isAdmin = user.email?.includes('admin');
          const defaultName = isAdmin ? "NGUYỄN ĐẮC THANH" : (user.email?.split('@')[0].toUpperCase() || "CHIẾN SĨ");
          
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

  const handleSaveAll = async () => {
    if (!userData.uid) return;
    setIsUpdating(true);
    try {
      // 1. Lưu tên mới vào Database (Kích hoạt đồng bộ Sidebar)
      await update(ref(db, `users/${userData.uid}`), { fullName: newName.trim().toUpperCase() });

      // 2. Cập nhật mật khẩu nếu có nhập
      if (newPassword.trim().length >= 6) {
        if (auth.currentUser) await updatePassword(auth.currentUser, newPassword);
        setNewPassword("");
      } else if (newPassword.length > 0) {
        alert("Mật khẩu phải ít nhất 6 ký tự!");
        setIsUpdating(false);
        return;
      }
      alert("✅ ĐÃ CẬP NHẬT VÀ ĐỒNG BỘ THÀNH CÔNG");
    } catch (error) {
      alert("❌ LỖI: Vui lòng đăng nhập lại để thực hiện thay đổi mật khẩu!");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      {/* HEADER BO GÓC 3.5REM CHUẨN */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-50 flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="w-36 h-36 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.fullName)}`} className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-1 right-1 p-2.5 bg-red-600 text-white rounded-full border-2 border-white shadow-lg"><Camera size={18} /></button>
        </div>
        <h2 className="text-4xl font-black text-slate-800 uppercase italic mb-3 tracking-tighter">{userData.fullName}</h2>
        <div className="px-10 py-2 bg-orange-500 text-white rounded-full text-[11px] font-black uppercase tracking-widest">{userData.role}</div>
      </div>

      {/* FORM NHẬP LIỆU - BO GÓC 3REM */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 space-y-8">
        <div className="flex items-center gap-3 border-b pb-4 border-slate-50">
          <ShieldCheck className="text-red-600" size={24} />
          <h3 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Thông tin bảo mật</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Họ tên hiển thị</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value.toUpperCase())} className="w-full pl-14 p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold uppercase outline-none focus:border-red-600 transition-all" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mật khẩu mới</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-14 p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold outline-none focus:border-red-600 transition-all" placeholder="••••••••" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
          </div>
        </div>

        <button onClick={handleSaveAll} disabled={isUpdating} className="w-full bg-slate-900 text-white p-6 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-4 active:scale-95">
          {isUpdating ? <Loader2 className="animate-spin" /> : <Save />} LƯU TẤT CẢ THAY ĐỔI
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
