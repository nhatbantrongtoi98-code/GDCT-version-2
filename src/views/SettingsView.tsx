import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Camera, Save, Loader2, Image as ImageIcon, ShieldCheck, Mail, Fingerprint } from 'lucide-react';
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  // State quản lý dữ liệu gốc từ hệ thống
  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "", avatarUrl: "", email: "", wallpaperUrl: "" });
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewWallpaper, setPreviewWallpaper] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. CƠ CHẾ ĐỒNG BỘ VĨNH VIỄN: Lắng nghe mọi thay đổi từ Database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              fullName: data.fullName || "",
              role: data.role || "CHIẾN SĨ",
              uid: user.uid,
              avatarUrl: data.avatarUrl || "",
              email: user.email || "",
              wallpaperUrl: data.wallpaperUrl || ""
            });
            // Đồng bộ ô nhập liệu với Database khi không gõ
            if (!isUpdating) setNewName(data.fullName || "");
          }
        });
      }
    });
    return () => unsubscribe();
  }, [auth, db, isUpdating]);

  // 2. XỬ LÝ CHỌN FILE (AVATAR & WALLPAPER)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'wallpaper') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') setPreviewImage(reader.result as string);
        else setPreviewWallpaper(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. CHIẾN THUẬT LƯU VĨNH VIỄN (COMMIT TO DATABASE)
  const handleSaveVinhVien = async () => {
    if (!auth.currentUser || !newName.trim()) return;
    
    setIsUpdating(true);
    try {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      
      // Tất cả nội dung thay đổi sẽ được đóng gói và gửi lên Database cùng lúc
      const updates: any = {
        fullName: newName.trim().toUpperCase(),
        lastSync: new Date().toISOString()
      };

      if (previewImage) updates.avatarUrl = previewImage;
      if (previewWallpaper) updates.wallpaperUrl = previewWallpaper;

      // Ghi đè vĩnh viễn lên Firebase
      await update(userRef, updates);

      // Xóa trạng thái tạm thời sau khi lưu thành công
      setPreviewImage(null);
      setPreviewWallpaper(null);
      alert("✅ HỆ THỐNG: TẤT CẢ THAY ĐỔI ĐÃ ĐƯỢC LƯU VĨNH VIỄN!");
    } catch (error) {
      alert("❌ LỖI: Không thể lưu. Vui lòng kiểm tra kết nối!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* CỘT 1: THẺ NHẬN DIỆN (THEO MẪU ẢNH 442c33) */}
      <div className="md:w-[35%] bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 flex flex-col overflow-hidden">
        {/* Khu vực Wallpaper thu nhỏ */}
        <div className="h-32 bg-slate-100 relative group">
          <img src={previewWallpaper || userData.wallpaperUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
               className="w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-80" alt="Wallpaper" />
          <button onClick={() => wallpaperInputRef.current?.click()} className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-xl text-white hover:bg-white/50">
            <ImageIcon size={18} />
          </button>
          <input type="file" ref={wallpaperInputRef} className="hidden" accept="image/*" onChange={(e) => handleFile(e, 'wallpaper')} />
        </div>

        <div className="px-10 pb-12 flex flex-col items-center -mt-16">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
              <img src={previewImage || userData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.uid}`} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-red-600 text-white rounded-full border-4 border-white shadow-lg active:scale-90">
              <Camera size={18} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFile(e, 'avatar')} />
          </div>

          <div className="mt-10 w-full space-y-5">
            <div className="flex items-center gap-4 text-slate-400">
              <div className="p-2 bg-slate-50 rounded-lg"><Mail size={16} /></div>
              <span className="text-sm font-medium italic">{userData.email || "chưa xác định"}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="p-2 bg-slate-50 rounded-lg"><Fingerprint size={16} /></div>
              <span className="text-sm font-medium italic truncate">ID: {userData.uid}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CỘT 2: KHỐI NỘI DUNG CÀI ĐẶT (THEO MẪU ẢNH 43d27c) */}
      <div className="md:w-[65%] bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50 flex flex-col justify-between">
        <div>
          <header className="mb-12 relative">
            <h1 className="text-4xl font-black text-[#0f172a] uppercase italic tracking-tighter">Cài đặt vĩnh viễn</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Quản lý hồ sơ và cấu hình hệ thống</p>
            <ShieldCheck className="absolute top-0 right-0 text-red-500/10" size={80} />
          </header>

          <div className="space-y-10">
            {/* Field: Họ tên */}
            <div className="space-y-4 group">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Họ và tên hiển thị</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" size={22} />
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value.toUpperCase())}
                  className="w-full pl-16 p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] font-black text-slate-800 focus:bg-white focus:border-red-600 outline-none transition-all shadow-sm"
                  placeholder="NHẬP TÊN CỦA ĐỒNG CHÍ..."
                />
              </div>
            </div>

            {/* Field: Bảo mật */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Bảo mật tài khoản</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
                  <input type="password" value="********" disabled className="w-full pl-16 p-6 bg-slate-100 rounded-[2rem] font-bold text-slate-300" />
                </div>
                <button className="px-10 bg-slate-50 text-slate-500 rounded-[2rem] font-black text-[11px] uppercase border-2 border-slate-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  Thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nút lưu cuối cùng */}
        <button 
          onClick={handleSaveVinhVien}
          disabled={isUpdating}
          className="w-full mt-12 bg-[#0f172a] text-white p-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-red-700 shadow-[0_20px_50px_rgba(15,23,42,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : <Save />}
          Xác nhận lưu thay đổi
        </button>
      </div>

    </div>
  );
};

export default SettingsView;
