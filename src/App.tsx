import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Trophy, History as HistoryIcon, Settings, LogOut, 
  User, ImageIcon, Save, CheckCircle2, 
  Upload, Camera, ChevronRight, BookOpen, Shield
} from 'lucide-react';

// --- 1. COMPONENT SIDEBAR (THANH MENU BÊN TRÁI) ---
const Sidebar: React.FC = () => {
  const [name, setName] = useState(localStorage.getItem('user_display_name') || "ADMIN123");
  const [avatar, setAvatar] = useState(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");

  useEffect(() => {
    const syncData = () => {
      setName(localStorage.getItem('user_display_name') || "ADMIN123");
      setAvatar(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
    };
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-10 px-2 text-red-700 font-black italic text-lg leading-tight uppercase">
         Hệ thống giáo dục
      </div>
      <nav className="flex-1 space-y-2">
        <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all">
          <HistoryIcon size={18} />
          <span className="text-[12px] font-black uppercase italic">Hệ thống ôn tập</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-red-700 text-white shadow-lg transition-all">
          <Settings size={18} />
          <span className="text-[12px] font-black uppercase italic">Cài đặt</span>
        </Link>
      </nav>
      {/* HIỂN THỊ TÊN & ẢNH ĐẠI DIỆN ĐỒNG BỘ TỪ MÁY TÍNH */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm bg-slate-100">
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">{name}</span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">Sĩ quan quản lý</span>
        </div>
      </div>
    </div>
  );
};

// --- 2. COMPONENT SETTINGSVIEW (TRANG CÀI ĐẶT CÓ TẢI ẢNH) ---
const SettingsView: React.FC = () => {
  const [nameInput, setNameInput] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  const [avatarImage, setAvatarImage] = useState(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  const [showToast, setShowToast] = useState(false);
  
  const bgInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    localStorage.setItem('user_display_name', nameInput);
    localStorage.setItem('login_bg', bgImage);
    localStorage.setItem('user_avatar', avatarImage); // Lưu ảnh đại diện đã tải lên
    window.dispatchEvent(new Event('storage')); // Gửi tín hiệu cập nhật Sidebar
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'bg' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'bg') setBgImage(reader.result as string);
        else setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-[11px] font-black uppercase italic tracking-widest">Đã cập nhật hồ sơ thành công!</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KHỐI THAY ẢNH ĐẠI DIỆN TỪ MÁY TÍNH */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="relative cursor-pointer group" onClick={() => avatarInputRef.current?.click()}>
            <div className="w-44 h-44 rounded-full border-4 border-red-50 overflow-hidden shadow-xl">
              <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full border-4 border-white shadow-lg">
              <Camera size={20} />
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-all">
                <span className="text-[10px] text-white font-black uppercase">Tải ảnh lên</span>
            </div>
          </div>
          <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'avatar')} />
          <h3 className="mt-6 text-xl font-black uppercase italic text-slate-800">{nameInput}</h3>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mt-1 italic">Sĩ quan quản lý</p>
        </div>

        {/* THÔNG TIN & ẢNH NỀN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><User size={18} className="text-red-700"/> Hồ sơ cá nhân</h4>
              <input className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none focus:ring-2 ring-red-100 transition-all" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><ImageIcon size={18} className="text-red-700"/> Giao diện đăng nhập</h4>
              <div onClick={() => bgInputRef.current?.click()} className="h-40 bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
                 {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-40" alt="bg" /> : <Upload className="text-slate-300" />}
                 <span className="absolute bg-white px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm border">Chọn ảnh nền từ máy tính</span>
              </div>
              <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'bg')} />
            </div>

            <button onClick={handleSave} className="w-full bg-red-700 text-white py-5 rounded-[1.8rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3">
              <Save size={18} /> Lưu toàn bộ thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT GAMEVIEW (HỆ THỐNG ÔN TẬP) ---
const GameView: React.FC = () => {
  return (
    <div className="p-10">
      <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Hệ thống Ôn tập</h2>
      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 mb-10">Học tập chuyên cần - Quyết tâm thắng lợi</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-red-700 p-12 rounded-[3.5rem] text-white italic font-black text-2xl shadow-2xl">
            Chào mừng Sĩ quan quản lý trở lại!
         </div>
         <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex items-center justify-center">
            <Trophy size={64} className="text-red-700 opacity-20" />
         </div>
      </div>
    </div>
  );
};

// --- 4. APP CHÍNH ---
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-72">
          <Routes>
            <Route path="/" element={<GameView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
