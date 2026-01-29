import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Camera, Save, Loader2, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State dữ liệu
  const [userData, setUserData] = useState({ fullName: "", role: "", uid: "", avatarUrl: "" });
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // State đổi mật khẩu
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          const isAdmin = user.email?.includes('admin');
          // Ưu tiên tên trong DB -> Admin mặc định -> Tên email
          const currentName = data?.fullName || (isAdmin ? "NGUYỄN ĐẮC THANH" : user.email?.split('@')[0].toUpperCase());
          
          setUserData({
            fullName: currentName,
            role: data?.role || (isAdmin ? "SĨ QUAN QUẢN LÝ" : "CHIẾN SĨ"),
            uid: user.uid,
            avatarUrl: data?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          });
          setNewName(currentName);
        });
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveInfo = async () => {
    if (!userData.uid) return;
    setIsUpdating(true);
    try {
      const updates: any = { fullName: newName.trim().toUpperCase() };
      if (previewImage) updates.avatarUrl = previewImage;

      await update(ref(db, `users/${userData.uid}`), updates);
      alert("✅ CẬP NHẬT THÔNG TIN THÀNH CÔNG!");
    } catch (error) {
      alert("❌ LỖI CẬP NHẬT!");
    } finally { setIsUpdating(false); }
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) return alert("Mật khẩu xác nhận không khớp!");
    if (passwords.new.length < 6) return alert("Mật khẩu mới phải từ 6 ký tự!");

    setIsUpdating(true);
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, passwords.old);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, passwords.new);
        alert("✅ ĐỔI MẬT KHẨU THÀNH CÔNG!");
        setIsPasswordModalOpen(false);
        setPasswords({ old: "", new: "", confirm: "" });
      }
    } catch (error) {
      alert("❌ MẬT KHẨU CŨ KHÔNG CHÍNH XÁC!");
    } finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* KHỐI 1: AVATAR & TÊN (Bo góc 3.5rem) */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-50 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-40 h-40 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src={previewImage || userData.avatarUrl} className="w-full h-full object-cover" />
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-red-600 text-white rounded-full border-2 border-white"><Camera size={20} /></button>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">{userData.fullName}</h2>
        <div className="px-8 py-2 bg-orange-500 text-white rounded-full text-[11px] font-black uppercase tracking-widest">{userData.role}</div>
      </div>

      {/* KHỐI 2: FORM CHỈNH SỬA (Bo góc 3rem) */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4 border-slate-50">
          <ShieldCheck className="text-red-600" size={24} />
          <h3 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Thông tin bảo mật</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Họ tên hiển thị</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value.toUpperCase())} className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold uppercase outline-none focus:border-red-600" />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mật khẩu</label>
            <button onClick={() => setIsPasswordModalOpen(true)} className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] font-bold text-slate-500 flex justify-between items-center hover:border-red-600 transition-all">
              <span>••••••••••••</span>
              <span className="text-red-600 text-[10px] font-black">THAY ĐỔI</span>
            </button>
          </div>
        </div>

        <button onClick={handleSaveInfo} disabled={isUpdating} className="w-full bg-slate-900 text-white p-6 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-4">
          {isUpdating ? <Loader2 className="animate-spin" /> : <Save />} LƯU TẤT CẢ THAY ĐỔI
        </button>
      </div>

      {/* MODAL ĐỔI MẬT KHẨU */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-800 uppercase italic">Đổi mật khẩu</h3>
              <button onClick={() => setIsPasswordModalOpen(false)}><X className="text-slate-400" /></button>
            </div>
            
            <div className="space-y-4">
              <input type="password" placeholder="MẬT KHẨU CŨ" value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-red-600" />
              <input type="password" placeholder="MẬT KHẨU MỚI" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-red-600" />
              <input type="password" placeholder="XÁC NHẬN MẬT KHẨU MỚI" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-red-600" />
              
              <button onClick={handleChangePassword} disabled={isUpdating} className="w-full bg-red-700 text-white p-5 rounded-2xl font-black uppercase tracking-widest mt-4">
                {isUpdating ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐỔI"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
