import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Trophy, History, BookOpen, Gamepad2, Settings, LogOut, 
  ShieldCheck, User, Lock, ImageIcon, Save, CheckCircle2, 
  Upload, Camera, ChevronRight, QrCode as QrIcon 
} from 'lucide-react';

// --- 1. COMPONENT SIDEBAR (THANH MENU BÊN TRÁI) ---
const Sidebar: React.FC = () => {
  // Lấy tên từ bộ nhớ, mặc định là "admin123" nếu chưa có
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "ADMIN123");

  useEffect(() => {
    // Hàm đồng bộ tên khi có thay đổi từ trang Settings
    const syncName = () => {
      const savedName = localStorage.getItem('user_display_name');
      if (savedName) setDisplayName(savedName);
    };
    window.addEventListener('storage', syncName);
    return () => window.removeEventListener('storage', syncName);
  }, []);

  const menuItems = [
    { icon: <Trophy size={18} />, label: 'Hệ thống giáo dục chính trị', path: '/', isHeader: true },
    { icon: <History size={18} />, label: 'Lịch sử Dân tộc Việt Nam', path: '/history' },
    { icon: <ShieldCheck size={18} />, label: 'Lịch sử truyền thống đơn vị', path: '/unit-history' },
    { icon: <BookOpen size={18} />, label: 'Bài giảng chính trị', path: '/lessons' },
    { icon: <Gamepad2 size={18} />, label: 'Chiến sĩ thông thái', path: '/game' },
    { icon: <Settings size={18} />, label: 'Cài đặt', path: '/settings', active: true },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-10 px-2 text-red-700 font-black italic text-lg leading-tight uppercase">
         Hệ thống giáo dục chính trị
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <Link to={item.path} key={idx} className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
            {item.icon}
            <span className="text-[12px] font-black uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* GÓC TRÁI DƯỚI: HIỂN THỊ TÊN ĐÃ ĐƯỢC KHẮC PHỤC LỖI */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-50">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-black text-slate-800 truncate uppercase italic tracking-tighter">
            {displayName}
          </span>
          <span className="text-[9px] font-bold text-red-600 uppercase italic">Sĩ quan quản lý</span>
        </div>
      </div>
      
      <button className="flex items-center gap-3 px-4 py-4 mt-4 text-slate-400 hover:text-red-700 transition-colors">
        <LogOut size={18} />
        <span className="text-[11px] font-bold uppercase italic">Đăng xuất</span>
      </button>
    </div>
  );
};

// --- 2. COMPONENT SETTINGSVIEW (TRANG CÀI ĐẶT) ---
const SettingsView: React.FC = () => {
  const [nameInput, setNameInput] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    localStorage.setItem('user_display_name', nameInput);
    localStorage.setItem('login_bg', bgImage);
    window.dispatchEvent(new Event('storage')); // Kích hoạt đồng bộ Sidebar ngay lập tức
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><User size={18} className="text-red-700"/> Thông tin cá nhân</h4>
          <input className="w-full p-4 bg-slate-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 ring-red-100" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic pt-4"><Lock size={18} className="text-red-700"/> Đổi mật khẩu</h4>
          <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-4 bg-slate-50 rounded-xl text-xs" />
          <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 rounded-xl text-xs" />
        </div>

        <div className="space-y-6 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống</h4>
          <div onClick={() => fileInputRef.current?.click()} className="h-48 rounded-[2rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative">
            {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-50" alt="bg" /> : <Upload className="text-slate-300" />}
            <span className="absolute bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm">Tải ảnh nền đăng nhập</span>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleSave} className="w-full bg-red-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-red-800 transition-all">
            <Save size={18} /> Cập nhật tất cả thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT CHÍNH APP ---
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar luôn hiển thị bên trái */}
        <Sidebar />

        {/* Nội dung chính bên phải */}
        <div className="flex-1 ml-72">
          <Routes>
            <Route path="/" element={<div className="p-20 font-black uppercase italic text-slate-300 text-4xl">Trang chủ hệ thống</div>} />
            <Route path="/settings" element={<SettingsView />} />
            {/* Các Route khác của đồng chí gắn ở đây */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
