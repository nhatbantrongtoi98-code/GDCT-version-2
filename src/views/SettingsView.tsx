import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Camera, Save, Loader2, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { getDatabase, ref, update, onValue, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  // State quản lý dữ liệu hiển thị
  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "", avatarUrl: "", wallpaperUrl: "" });
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewWallpaper, setPreviewWallpaper] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. CƠ CHẾ QUAN TRỌNG NHẤT: Lắng nghe Realtime
  // Khi đồng chí nhấn lưu ở trang này, Database thay đổi, onValue sẽ ép tất cả các trang khác phải nhận tên mới
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        
        // Dùng onValue thay vì get() để dữ liệu luôn tươi mới
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const currentName = data.fullName || "";
            setUserData({
              fullName: currentName,
              role: data.role || "CHIẾN SĨ",
              uid: user.uid,
              avatarUrl: data.avatarUrl || "",
              wallpaperUrl: data.wallpaperUrl || ""
            });
            // Chỉ cập nhật input nếu người dùng không đang gõ
            if (!isUpdating) setNewName(currentName);
          }
        });
      }
    });
    return () => unsubscribe();
  }, [auth, db, isUpdating]);

  // 2. HÀM LƯU "THÉP": Ép ghi đè vĩnh viễn
  const handleSaveVinhVien = async () => {
    if (!auth.currentUser || !newName.trim()) return;
    
    setIsUpdating(true);
    try {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      const finalName = newName.trim().toUpperCase();
      
      const updates: any = {
        fullName: finalName,
        // Thêm timestamp để ép trình duyệt nhận diện đây là bản ghi mới nhất
        lastSync: Date.now() 
      };

      if (previewImage) updates.avatarUrl = previewImage;
      if (previewWallpaper) updates.wallpaperUrl = previewWallpaper;

      // Ghi trực tiếp vào Database
      await update(userRef, updates);

      // Xóa các bản xem trước sau khi đã lưu thật
      setPreviewImage(null);
      setPreviewWallpaper(null);
      
      alert("✅ ĐÃ KHÓA DỮ LIỆU VĨNH VIỄN VÀO HỆ THỐNG!");
    } catch (error) {
      alert("❌ LỖI GHI DỮ LIỆU: Kiểm tra lại quyền Firebase!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* GIAO DIỆN CỘT TRÁI - CARD TRỰC QUAN */}
      <div className="md:w-[35%] bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden">
        <div className="h-32 bg-slate-100 relative group">
          <img src={previewWallpaper || userData.wallpaperUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800"} 
               className="w-full h-full object-cover opacity-50" alt="Wallpaper" />
          <button onClick={() => wallpaperInputRef.current?.click()} className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-xl text-white"><ImageIcon size={18} /></button>
          <input type="file" ref={wallpaperInputRef} className="hidden" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setPreviewWallpaper(reader.result as string);
              reader.readAsDataURL(file);
            }
          }} />
        </div>

        <div className="px-10 pb-12 flex flex-col items-center -mt-16">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
              <img src={previewImage || userData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.uid}`} className="w-full h-full object-cover" />
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-red-600 text-white rounded-full border-4 border-white shadow-lg"><Camera size={18} /></button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
               const file = e.target.files?.[0];
               if (file) {
                 const reader = new FileReader();
                 reader.onloadend = () => setPreviewImage(reader.result as string);
                 reader.readAsDataURL(file);
               }
            }} />
          </div>
          <h2 className="mt-6 text-2xl font-black text-slate-800 uppercase italic">{userData.fullName || "ĐANG TẢI..."}</h2>
        </div>
      </div>

      {/* GIAO DIỆN CỘT PHẢI - FORM NHẬP LIỆU */}
      <div className="md:w-[65%] bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-[#0f172a] uppercase italic tracking-tighter">Cài đặt vĩnh viễn</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Dữ liệu sẽ được đồng bộ toàn hệ thống</p>
        </header>

        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Họ và tên quân nhân</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value.toUpperCase())}
                className="w-full pl-16 p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] font-black text-slate-800 focus:bg-white focus:border-red-600 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <button 
            onClick={handleSaveVinhVien}
            disabled={isUpdating}
            className="w-full bg-[#0f172a] text-white p-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-red-700 shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="animate-spin" /> : <Save />}
            XÁC NHẬN LƯU VĨNH VIỄN
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
