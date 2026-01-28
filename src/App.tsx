import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
// ... (giữ nguyên các import khác từ file gốc của đồng chí)
import { 
  Trophy, RefreshCw, Star, Music, Gamepad2, Plus, Trash2, LogIn, Key, 
  Upload, Play, CheckCircle, Image as ImageIcon, Eye, Edit2, Save, X, 
  Type, Monitor, Layout as LayoutIcon, Shield, Camera, Award, Flag, 
  ListMusic, Volume2, FileAudio, FileVideo, AlertTriangle, Disc, Lock, 
  User, MessageSquare, Send, Loader2, ChevronRight, HelpCircle, 
  History as HistoryIcon, BookOpen, QrCode as QrIcon 
} from 'lucide-react';

// --- SIDEBAR COMPONENT (Gắn thêm để đồng bộ tên góc trái) ---
const Sidebar = () => {
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "ADMIN123");

  useEffect(() => {
    const syncName = () => {
      const savedName = localStorage.getItem('user_display_name');
      if (savedName) setDisplayName(savedName);
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
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 cursor-pointer">
          <HistoryIcon size={18} /> <span className="text-[12px] font-black uppercase italic">Trang chủ</span>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-red-700 text-white shadow-lg cursor-pointer">
          <Settings size={18} /> <span className="text-[12px] font-black uppercase italic">Cài đặt</span>
        </div>
      </nav>
      {/* KHẮC PHỤC TRIỆT ĐỂ LỖI TÊN Ở ĐÂY */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-50 shadow-sm">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {displayName}
          </span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">Sĩ quan quản lý</span>
        </div>
      </div>
    </div>
  );
};

// --- SETTINGS VIEW (Bản gốc của đồng chí có thêm logic lưu tên) ---
const SettingsView: React.FC<{ currentUser: any; onUpdateUser: any }> = ({ currentUser, onUpdateUser }) => {
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleSaveAll = () => {
    localStorage.setItem('user_display_name', displayName);
    localStorage.setItem('login_bg', bgImage);
    window.dispatchEvent(new Event('storage')); // Gửi tín hiệu đổi tên cho Sidebar
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 ml-72 bg-slate-50 min-h-screen relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600">
          <span className="text-[11px] font-black uppercase italic">Cập nhật nội dung thành công!</span>
        </div>
      )}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm space-y-6">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><User size={18} className="text-red-700"/> Hồ sơ Admin</h4>
          <input className="w-full p-4 bg-slate-50 rounded-xl font-bold" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div className="bg-white p-8 rounded-[3rem] shadow-sm space-y-6">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><ImageIcon size={18} className="text-red-700"/> Nền đăng nhập</h4>
          <div onClick={() => bgInputRef.current?.click()} className="h-40 rounded-2xl border-4 border-dashed border-slate-100 flex items-center justify-center cursor-pointer overflow-hidden relative">
            {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-50" /> : <Upload className="text-slate-300" />}
            <span className="absolute text-[10px] font-black uppercase">Tải ảnh từ máy tính</span>
          </div>
          <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
          <button onClick={handleSaveAll} className="w-full bg-red-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Lưu tất cả</button>
        </div>
      </div>
    </div>
  );
};

// --- GAME VIEW (Giữ nguyên từ file gốc của đồng chí) ---
const GameView: React.FC<{ data: any; isAdmin: boolean }> = ({ data, isAdmin }) => {
  return (
    <div className="ml-72 p-10 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Hệ thống Ôn tập</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Học tập chuyên cần - Quyết tâm thắng lợi</p>
        </div>
      </div>
      {/* ... (Các phần khác của GameView giữ nguyên như file gốc) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Render bài học/bài thi của đồng chí ở đây */}
      </div>
    </div>
  );
};

// --- COMPONENT APP CHÍNH ---
const App: React.FC = () => {
  const sampleData = { courses: [], tests: [], statistics: { totalStudyTime: 0, completedLessons: 0, averageScore: 0 }};

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Sidebar /> {/* Gắn Sidebar đã sửa lỗi tên */}
        <Routes>
          <Route path="/" element={<GameView data={sampleData} isAdmin={true} />} />
          <Route path="/settings" element={<SettingsView currentUser={{}} onUpdateUser={() => {}} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
