import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import các thành phần
import { AppData, UserAccount, BackgroundMusic } from './types';
import { INITIAL_DATA } from './data/initialData';
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import AIAssistant from './components/AIAssistant';

// Import các khung nhìn
import HomeView from './views/HomeView';
import HistoryVNView from './views/HistoryVNView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import GameView from './views/GameView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  // 1. Khởi tạo người dùng
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('military_current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Khởi tạo dữ liệu ứng dụng
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('military_app_data_v7');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  // 3. Tự động lưu dữ liệu
  useEffect(() => {
    try {
      localStorage.setItem('military_app_data_v7', JSON.stringify(appData));
    } catch (e) {
      console.error("LocalStorage bị tràn! Hãy xóa bớt nhạc hoặc ảnh cũ.");
      alert("Bộ nhớ trình duyệt đã đầy! Đồng chí vui lòng xóa bớt nhạc hoặc ảnh cũ để lưu dữ liệu mới.");
    }
  }, [appData]);

  useEffect(() => {
    if (currentUser) localStorage.setItem('military_current_user_v7', JSON.stringify(currentUser));
    else localStorage.removeItem('military_current_user_v7');
  }, [currentUser]);

  // --- CÁC HÀM CẬP NHẬT DỮ LIỆU ---

  const updateGlobal = (key: keyof AppData, value: any) => {
    setAppData(prev => ({ ...prev, [key]: value }));
  };

  const updateSection = (key: keyof AppData, title: string, body: string, imageUrl?: string, avatarUrl?: string) => {
    setAppData(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof AppData] as any, title, body, imageUrl, avatarUrl }
    }));
  };

  const updateTradition = (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => {
    setAppData(prev => ({
      ...prev,
      tradition: {
        ...prev.tradition,
        [key]: { name, history, imageUrl, avatarUrl }
      }
    }));
  };

  if (!currentUser) return <AuthScreen data={appData} onLogin={setCurrentUser} />;

  const isAdmin = currentUser.role === 'admin';

  return (
    <Router>
      <div 
        className="min-h-screen transition-all duration-500" 
        style={{ 
          backgroundImage: appData.globalBackground ? `url(${appData.globalBackground})` : 'none', 
          backgroundColor: '#f8fafc',
          backgroundSize: 'cover', 
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-white/90 min-h-screen backdrop-blur-md">
          <Layout 
            playlist={appData.backgroundPlaylist} 
            currentUser={currentUser} 
            appName={appData.appName} 
            appLogo={appData.appLogo} 
            onLogout={() => setCurrentUser(null)}
          >
            <Routes>
              <Route path="/" element={
                <HomeView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdate={updateSection} 
                  onUpdateGlobal={updateGlobal}
                  onUpdatePlaylist={(list) => updateGlobal('backgroundPlaylist', list)}
                />
              } />
              <Route path="/history" element={<HistoryVNView data={appData} isAdmin={isAdmin} onUpdate={updateSection} />} />
              <Route path="/tradition" element={<TraditionView data={appData} isAdmin={isAdmin} onUpdate={updateTradition} />} />
              <Route path="/lectures" element={
                <LecturesView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdateLecture={(cat, id, title, poster) => {
                    const category = cat as keyof typeof appData.lectures;
                    const newList = appData.lectures[category].map(l => 
                      l.id === id ? { ...l, title, posterUrl: poster } : l
                    );
                    setAppData(prev => ({ ...prev, lectures: { ...prev.lectures, [cat]: newList } }));
                  }} 
                />
              } />
              <Route path="/entertainment" element={
                <EntertainmentView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdateEntertainment={(updater) => setAppData(prev => ({ ...prev, entertainment: updater(prev.entertainment) }))} 
                />
              } />
              <Route path="/game" element={<GameView data={appData} isAdmin={isAdmin} />} />
              <Route path="/settings" element={<SettingsView currentUser={currentUser} onUpdateUser={setCurrentUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <AIAssistant appLogo={appData.appLogo} />
        </div>
      </div>
    </Router>
  );
};
const SettingsView: React.FC = () => {
  const [nameInput, setNameInput] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState(localStorage.getItem('login_bg') || "");
  // Thêm trạng thái lưu ảnh đại diện
  const [avatarImage, setAvatarImage] = useState(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  const [showToast, setShowToast] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null); // Ref cho ảnh đại diện

  const handleSave = () => {
    localStorage.setItem('user_display_name', nameInput);
    localStorage.setItem('login_bg', bgImage);
    localStorage.setItem('user_avatar', avatarImage); // Lưu ảnh đại diện vào bộ nhớ
    
    window.dispatchEvent(new Event('storage')); // Gửi tín hiệu đồng bộ cho Sidebar
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Hàm xử lý tải ảnh đại diện từ máy tính
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarImage(reader.result as string);
      reader.readAsDataURL(file);
    }
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
    <div className="p-10 bg-slate-50 min-h-screen relative ml-72">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-[11px] font-black uppercase">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: THAY ĐỔI ẢNH ĐẠI DIỆN */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
            <div className="w-40 h-40 rounded-full border-4 border-red-50 overflow-hidden shadow-xl">
              <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full border-4 border-white shadow-lg">
              <Camera size={18} />
            </div>
            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
          </div>
          <h3 className="mt-6 text-xl font-black uppercase italic text-slate-800">{nameInput}</h3>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mt-1">Sĩ quan quản lý</p>
        </div>

        {/* CỘT PHẢI: THÔNG TIN & NỀN ĐĂNG NHẬP */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
            <h4 className="flex items-center gap-2 text-sm font-black uppercase italic"><User size={18} className="text-red-700"/> Thông tin cá nhân</h4>
            <input className="w-full p-4 bg-slate-50 rounded-xl font-bold border-none outline-none focus:ring-2 ring-red-100" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            
            <h4 className="flex items-center gap-2 text-sm font-black uppercase italic pt-4"><ImageIcon size={18} className="text-red-700"/> Nền trang đăng nhập</h4>
            <div onClick={() => fileInputRef.current?.click()} className="h-40 bg-slate-50 rounded-3xl border-4 border-dashed border-slate-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
               {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-50" /> : <Upload className="text-slate-200" />}
               <span className="absolute text-[10px] font-black uppercase bg-white/80 px-4 py-1 rounded-lg shadow-sm">Tải ảnh nền mới từ máy tính</span>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
            
            <button onClick={handleSave} className="w-full bg-red-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3">
              <Save size={18} /> Lưu tất cả thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
