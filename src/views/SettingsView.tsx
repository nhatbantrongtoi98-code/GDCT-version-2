import React, { useState, useEffect } from 'react';
import { User, Image as ImageIcon, Camera, X, Save, Loader2 } from 'lucide-react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsView: React.FC = () => {
  const auth = getAuth();
  const db = getDatabase();
  
  const [userData, setUserData] = useState({
    fullName: "Đang xác thực...",
    role: "Chiến sĩ",
    uid: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // TỰ ĐỘNG NHẬN DIỆN NGƯỜI DÙNG HIỆN TẠI
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        const unsubscribeDb = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData({
              fullName: data.fullName || "Chiến sĩ mới",
              role: data.role || "Chiến sĩ",
              uid: currentUser.uid
            });
            setNewName(data.fullName || "");
          }
        });
        return () => unsubscribeDb();
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  // HÀM CẬP NHẬT TÊN LÊN FIREBASE
  const handleUpdateName = async () => {
    if (!newName.trim() || !userData.uid) return;
    setIsUpdating(true);
    try {
      await update(ref(db, `users/${userData.uid}`), {
        fullName: newName.trim().toUpperCase() // Tự động viết hoa tên
      });
      setIsModalOpen(false);
      alert("✅ ĐÃ CẬP NHẬT TÊN TRÊN HỆ THỐNG");
    } catch (error) {
      alert("❌ LỖI KẾT NỐI MÁY CHỦ");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      {/* Profile Header - Giữ nguyên Layout bo góc 3rem */}
      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg shadow-slate-200">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.fullName)}`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 p-2 bg-red-600 text-white rounded-full shadow-lg border-2 border-white">
            <Camera size={16} />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2 italic">
          {userData.fullName}
        </h2>
        
        <div className={`px-6 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-md ${userData.role === 'Quản trị viên' ? 'bg-red-600' : 'bg-orange-500'}`}>
          {userData.role}
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setIsModalOpen(true)}
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all">
            <User size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 uppercase text-sm">Hồ sơ cá nhân</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Sửa tên hiển thị</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5 opacity-60 grayscale cursor-not-allowed">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <ImageIcon size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 uppercase text-sm">Hình nền hệ thống</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Đang phát triển...</p>
          </div>
        </div>
      </div>

      {/* MODAL CẬP NHẬT TÊN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Cập nhật danh tính</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên mới của đồng chí</label>
                  <input 
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value.toUpperCase())}
                    placeholder="NHẬP TÊN..."
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 font-bold text-slate-700 transition-all uppercase"
                  />
                </div>

                <button 
                  onClick={handleUpdateName}
                  disabled={isUpdating}
                  className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  LƯU THÔNG TIN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
