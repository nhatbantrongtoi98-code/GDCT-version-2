import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Trophy, History, BookOpen, Gamepad2, Settings, LogOut, 
  ShieldCheck, User, Lock, ImageIcon, Save, CheckCircle2, 
  Upload, Camera, ChevronRight, QrCode as QrIcon 
} from 'lucide-react';

// --- ĐỊNH NGHĨA INTERFACE (Để tránh lỗi trang trắng trên Vercel) ---
interface AppData {
  courses: any[];
  tests: any[];
  statistics: {
    totalStudyTime: number;
    completedLessons: number;
    averageScore: number;
  };
}

// --- 1. COMPONENT SIDEBAR (THANH MENU BÊN TRÁI) ---
const Sidebar: React.FC = () => {
  const [name, setName] = useState(localStorage.getItem('user_display_name') || "ADMIN123");

  useEffect(() => {
    const syncName = () => {
      const savedName = localStorage.getItem('user_display_name');
      if (savedName) setName(savedName);
    };
    window.addEventListener('storage', syncName);
    return () => window.removeEventListener('storage', syncName);
  }, []);

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-10 px-2 text-red-700 font-black italic text-lg leading-tight uppercase">
         Hệ thống giáo dục chính trị
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all">
          <History size={18} />
          <span className="text-[12px] font-black uppercase italic">Hệ thống ôn tập</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-red-700 text-white shadow-lg shadow-red-100 transition-all">
          <Settings size={18} />
          <span className="text-[12px] font-black uppercase italic">Cài đặt</span>
        </Link>
      </nav>

      {/* HIỂN THỊ TÊN ĐỒNG BỘ Ở GÓC TRÁI DƯỚI */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-50">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {name}
          </span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">Sĩ quan quản lý</span>
        </div>
      </div>
    </div>
  );
};

// --- 2. COMPONENT GAMEVIEW (Hệ thống ôn tập của đồng chí) ---
const GameView: React.FC<{ data: AppData; isAdmin: boolean }> = ({ data }) => {
  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Hệ thống Ôn tập</h2>
      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Học tập chuyên cần - Quyết tâm thắng lợi</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-white">
        <div className="bg-red-700 p-8 rounded-[2.5rem] shadow-xl shadow-red-100 italic font-black">
           <div className="text-3xl mb-2">{data.statistics.totalStudyTime} Phút</div>
           <div className="text-[10px] uppercase tracking-widest opacity-80">Tổng thời gian học</div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl italic font-black">
           <div className="text-3xl mb-2">{data.statistics.completedLessons}</div>
           <div className="text-[10px] uppercase tracking-widest opacity-80">Bài học hoàn thành</div>
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT SETTINGSVIEW (Trang cài đặt) ---
const SettingsView: React.FC = () => {
  const [nameInput, setNameInput] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    localStorage.setItem('user_display_name', nameInput);
    localStorage.setItem('login_bg', bgImage);
    window.dispatchEvent(new Event('storage'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-[11px] font-black uppercase">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm space-y-6">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><User size={18} className="text-red-700"/> Hồ sơ Admin</h4>
          <input className="w-full p-4 bg-slate-50 rounded-xl font-bold border-none outline-none focus:ring-2 ring-red-100" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-sm space-y-6 text-center">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic justify-center"><ImageIcon size={18} className="text-red-700"/> Nền đăng nhập</h4>
          <div onClick={() => fileInputRef.current?.click()} className="h-40 bg-slate-50 rounded-3xl border-4 border-dashed border-slate-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
             {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-50" /> : <Upload className="text-slate-200" />}
             <span className="absolute text-[10px] font-black uppercase bg-white/80 px-4 py-1 rounded-lg shadow-sm">Tải ảnh nền mới</span>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
          <button onClick={handleSave} className="w-full bg-red-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-red-800 transition-all">Lưu tất cả thay đổi</button>
        </div>
      </div>
    </div>
  );
};

// --- 4. COMPONENT APP CHÍNH ---
const App: React.FC = () => {
  const sampleData: AppData = {
    courses: [],
    tests: [],
    statistics: { totalStudyTime: 1250, completedLessons: 45, averageScore: 8.5 }
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-72">
          <Routes>
            <Route path="/" element={<GameView data={sampleData} isAdmin={true} />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
