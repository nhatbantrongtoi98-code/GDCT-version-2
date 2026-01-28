import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Trophy, History as HistoryIcon, Settings, LogOut, 
  User, ImageIcon, Save, CheckCircle2, 
  Upload, Camera, ChevronRight, BookOpen, Shield,
  Star, Play, Gamepad2, Layout as LayoutIcon
} from 'lucide-react';

// --- ĐỊNH NGHĨA DỮ LIỆU ---
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
  const [avatar, setAvatar] = useState(localStorage.getItem('user_avatar') || "");

  useEffect(() => {
    const syncData = () => {
      setName(localStorage.getItem('user_display_name') || "ADMIN123");
      setAvatar(localStorage.getItem('user_avatar') || "");
    };
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncName);
  }, []);

  const syncName = () => {
     setName(localStorage.getItem('user_display_name') || "ADMIN123");
     setAvatar(localStorage.getItem('user_avatar') || "");
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2 text-red-700 font-black italic text-lg leading-tight uppercase">
         Hệ thống giáo dục
      </div>
      <nav className="flex-1 space-y-2">
        <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all group">
          <LayoutIcon size={18} className="group-hover:text-red-700" />
          <span className="text-[12px] font-black uppercase italic">Hệ thống ôn tập</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-red-700 text-white shadow-lg shadow-red-100 transition-all">
          <Settings size={18} />
          <span className="text-[12px] font-black uppercase italic">Cài đặt hệ thống</span>
        </Link>
      </nav>
      {/* HIỂN THỊ TÊN & ẢNH ĐẠI DIỆN ĐỒNG BỘ */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-50 shadow-sm bg-slate-100">
          <img src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">{name}</span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">Sĩ quan quản lý</span>
        </div>
      </div>
    </div>
  );
};

// --- 2. COMPONENT GAMEVIEW (GIỮ NGUYÊN NỘI DUNG CŨ CỦA ĐỒNG CHÍ) ---
const GameView: React.FC<{ data: AppData; isAdmin: boolean }> = ({ data }) => {
  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Hệ thống Ôn tập</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 italic">Học tập chuyên cần - Quyết tâm thắng lợi</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-red-700 p-8 rounded-[3rem] text-white shadow-xl shadow-red-100 italic">
          <div className="text-3xl font-black">{data.statistics.totalStudyTime} Phút</div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Thời gian nghiên cứu</div>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm italic">
          <div className="text-3xl font-black text-slate-800">{data.statistics.completedLessons}</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nội dung đã hoàn thành</div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl italic">
          <div className="text-3xl font-black text-red-500">{data.statistics.averageScore}/10</div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Điểm số trung bình</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Render danh sách bài học cũ của đồng chí ở đây */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer">
           <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl"><BookOpen size={24} /></div>
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
           </div>
           <h3 className="text-xl font-black text-slate-800 uppercase italic mb-2">Lịch sử truyền thống đơn vị</h3>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">35 nội dung ôn tập</p>
        </div>
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer">
           <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-slate-900 text-white rounded-2xl"><Gamepad2 size={24} /></div>
           </div>
           <h3 className="text-xl font-black text-slate-800 uppercase italic mb-2">Chiến sĩ thông thái</h3>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trắc nghiệm kiến thức</p>
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT SETTINGSVIEW (SỬA LỖI TẢI ẢNH ĐẠI DIỆN) ---
const SettingsView: React.FC = () => {
  const [nameInput, setNameInput] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState(localStorage.getItem('user_avatar') || "");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  
  const avatarRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    localStorage.setItem('user_display_name', nameInput);
    localStorage.setItem('user_avatar', avatar);
    localStorage.setItem('login_bg', bgImage);
    window.dispatchEvent(new Event('storage'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') setAvatar(reader.result as string);
        else setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-[11px] font-black uppercase italic">Cập nhật thành công!</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
          {/* NHẤN VÀO ĐÂY ĐỂ TẢI ẢNH ĐẠI DIỆN TỪ MÁY TÍNH */}
          <div className="relative cursor-pointer group" onClick={() => avatarRef.current?.click()}>
            <div className="w-44 h-44 rounded-full border-4 border-red-50 overflow-hidden shadow-xl">
              <img src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full border-4 border-white"><Camera size={18} /></div>
            <input type="file" ref={avatarRef} className="hidden" accept="image/*" onChange={(e) => onUpload(e, 'avatar')} />
          </div>
          <h3 className="mt-6 text-xl font-black uppercase italic text-slate-800">{nameInput}</h3>
        </div>

        <div className="md:col-span-2 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-8">
          <section className="space-y-4">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2"><User size={18} className="text-red-700"/> Hồ sơ cá nhân</h4>
            <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none outline-none focus:ring-2 ring-red-100" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2"><ImageIcon size={18} className="text-red-700"/> Ảnh nền đăng nhập</h4>
            <div onClick={() => bgRef.current?.click()} className="h-40 bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
               {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-50" /> : <Upload className="text-slate-300" />}
               <span className="absolute bg-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase shadow-sm">Tải ảnh nền mới</span>
            </div>
            <input type="file" ref={bgRef} className="hidden" accept="image/*" onChange={(e) => onUpload(e, 'bg')} />
          </section>

          <button onClick={handleSave} className="w-full bg-red-700 text-white py-5 rounded-[1.8rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3">
             <Save size={18} /> Lưu tất cả thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP CHÍNH ---
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
        <main className="flex-1 ml-72 overflow-y-auto">
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
