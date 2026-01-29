import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Camera, Save, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "", avatarUrl: "" });
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          const isAdmin = user.email?.includes('admin');
          const defaultName = isAdmin ? "NGUYỄN ĐẮC THANH" : (user.email?.split('@')[0].toUpperCase() || "CHIẾN SĨ");
          
          setUserData({
            fullName: data?.fullName || defaultName,
            role: data?.role || (isAdmin ? "SĨ QUAN QUẢN LÝ" : "CHIẾN SĨ"),
            uid: user.uid,
            avatarUrl: data?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          });
          setNewName(data?.fullName || defaultName);
        });
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  // Xử lý chọn ảnh từ máy tính
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = async () => {
    if (!userData.uid) return;
    setIsUpdating(true);
    try {
      const updates: any = { fullName: newName.trim().toUpperCase() };
      if (previewImage) updates.avatarUrl = previewImage;

      // 1. Lưu thông tin tên và ảnh vào Database
      await update(ref(db, `users/${userData.uid}`), updates);

      // 2. Cập nhật mật khẩu nếu có nhập
      if (newPassword.trim().length >= 6) {
        if (auth.currentUser) await updatePassword(auth.currentUser, newPassword);
        setNewPassword("");
      }

      alert("✅ CẬP NHẬT HỆ THỐNG THÀNH CÔNG!");
    } catch (error) {
      alert("❌ THẤT BẠI: Vui lòng đăng nhập lại để xác thực thay đổi mật khẩu.");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      {/* HEADER: AVATAR & INFO (3.5rem) */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-50 flex flex-col items-center text-center">
        <div className="relative mb-8 group">
          <div className="w-40 h-40 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-105">
            <img src={previewImage || userData.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 p-3 bg-red-600 text-white rounded-full border-2 border-white shadow-lg hover:bg-slate-900 transition-colors"
          >
            <Camera size={20} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 uppercase italic mb-3 tracking-tighter">{userData.fullName}</h2>
        <div className="px-10 py-2 bg-orange-500 text-white rounded-full text-[11px] font-black uppercase tracking-widest">{userData.role}</div>
      </div>

      {/* FORM: THÔNG TIN BẢO MẬT (3rem) */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 space-y-8">
        <div className="flex items-center gap-3 border-b pb-4 border-slate-50">
          <ShieldCheck className="text-red-600" size={24} />
          <h3 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Thông tin bảo mật</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tên hiển thị mới</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value.toUpperCase())} 
                className="w-full pl-14 p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold uppercase outline-none focus:border-red-600 transition-all text-slate-700" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mật khẩu mới</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full pl-14 p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold outline-none focus:border-red-600 transition-all" 
                placeholder="••••••••" 
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSaveAll} 
          disabled={isUpdating} 
          className="w-full bg-slate-900 text-white p-6 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : <Save />} 
          LƯU TẤT CẢ THAY ĐỔI
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
