import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Camera, Save, Loader2, Mail, Fingerprint, ShieldCheck, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "", avatarUrl: "", email: "", wallpaperUrl: "" });
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewWallpaper, setPreviewWallpaper] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  // 1. ĐỒNG BỘ DỮ LIỆU REALTIME VĨNH VIỄN
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
              avatarUrl: data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.fullName}`,
              email: user.email || "",
              wallpaperUrl: data.wallpaperUrl || ""
            });
            if (!isUpdating) setNewName(data.fullName || "");
          }
        });
      }
    });
    return () => unsubscribe();
  }, [auth, db, isUpdating]);

  // 2. XỬ LÝ FILE ẢNH (AVATAR & WALLPAPER)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'wallpaper') => {
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

  // 3. HÀM LƯU TỔNG THỂ (AVATAR + TÊN + HÌNH NỀN)
  const handleSaveAll = async () => {
    if (!auth.currentUser || !newName.trim()) return;
    setIsUpdating(true);
    try {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      const updates: any = {
        fullName: newName.trim().toUpperCase(),
        updatedAt: new Date().toISOString()
      };

      if (previewImage) updates.avatarUrl = previewImage;
      if (previewWallpaper) updates.wallpaperUrl = previewWallpaper;

      await update(userRef, updates);
      
      setPreviewImage(null);
      setPreviewWallpaper(null);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      alert("❌ LỖI LƯU DỮ LIỆU!");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* CỘT TRÁI: ĐỊNH DANH & HÌNH NỀN */}
        <div className="lg:w-2/5 space-y-8">
          {/* Card Profile */}
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-50 relative group">
            <div className="h-32 bg-slate-100 relative overflow-hidden">
              {/* Hiển thị Wallpaper hiện tại hoặc Preview */}
              {(previewWallpaper || userData.wallpaperUrl) && (
                <img src={previewWallpaper || userData.wallpaperUrl} className="w-full h-full object-cover opacity-80" />
              )}
              <button 
                onClick={() => wallpaperInputRef.current?.click()}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all"
                title="Đổi hình nền"
              >
                <ImageIcon size={18} />
              </button>
              <input type="file" ref={wallpaperInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'wallpaper')} />
            </div>

            <div className="px-8 pb-10 flex flex-col items-center -mt-16">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
                  <img src={previewImage || userData.avatarUrl} className="w-full h-full object-cover" />
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-red-600 text-white rounded-full border-4 border-white shadow-lg active:scale-90 transition-transform">
                  <Camera size={18} />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
              </div>
              <h2 className="mt-6 text-2xl font-black text-slate-800 tracking-tighter uppercase">{userData.fullName}</h2>
              <p className="text-red-600 font-bold text-xs tracking-widest mt-1 italic">{userData.role}</p>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: FORM CHỈNH SỬA */}
        <div className="lg:w-3/5 bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50">
          <header className="mb-10 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Cài đặt vĩnh viễn</h2>
              <p className="text-slate-400">Quản lý hồ sơ và cấu hình hệ thống</p>
            </div>
            <ShieldCheck className="text-red-600/10" size={60} />
          </header>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Họ và tên hiển thị</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value.toUpperCase())}
                  className="w-full pl-16 p-6 bg-slate-50 border-none rounded-[2rem] font-bold text-slate-800 focus:ring-2 ring-red-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Bảo mật tài khoản</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input type="password" value="********" disabled className="w-full pl-16 p-6 bg-slate-50 border-none rounded-[2rem] font-bold text-slate-200" />
                </div>
                <button className="px-8 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all">Thay đổi</button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSaveAll}
            disabled={isUpdating}
            className={`w-full mt-12 p-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 ${
              status === 'success' ? 'bg-green-600' : 'bg-[#0f172a] hover:bg-red-700'
            } text-white`}
          >
            {isUpdating ? <Loader2 className="animate-spin" /> : status === 'success' ? <CheckCircle2 /> : <Save />}
            {status === 'success' ? 'ĐÃ LƯU VĨNH VIỄN' : 'XÁC NHẬN LƯU THAY ĐỔI'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
