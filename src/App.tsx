
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Trophy, RefreshCw, Star, Music, Gamepad2, Plus, Trash2, LogIn, Key, 
  Upload, Play, CheckCircle, Image as ImageIcon, Eye, Edit2, Save, X, 
  Type, Monitor, Layout as LayoutIcon, Shield, Camera, Award, Flag, 
  ListMusic, Volume2, FileAudio, FileVideo, AlertTriangle, Disc, Lock, 
  User, MessageSquare, Send, Loader2, ChevronRight, HelpCircle, 
  History as HistoryIcon, BookOpen, QrCode as QrIcon 
} from 'lucide-react';

// --- SETTINGS VIEW ---
const SettingsView: React.FC<{ 
  currentUser: UserAccount; 
  onUpdateUser: (updated: UserAccount) => void;
}> = ({ currentUser, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'feedback'>('profile');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const updated = { ...currentUser, avatarUrl: url };
        onUpdateUser(updated);
        setStatus({ msg: 'Cập nhật ảnh đại diện thành công và đồng bộ hệ thống!', type: 'success' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.next !== passwordForm.confirm) {
      setStatus({ msg: 'Mật khẩu xác nhận không khớp', type: 'error' });
      return;
    }
    if (passwordForm.next.length < 6) {
      setStatus({ msg: 'Mật khẩu mới phải có ít nhất 6 ký tự', type: 'error' });
      return;
    }
    const updated = { ...currentUser, password: passwordForm.next };
    onUpdateUser(updated);
    setPasswordForm({ current: '', next: '', confirm: '' });
    setStatus({ msg: 'Thay đổi mật mã bảo mật thành công!', type: 'success' });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback('');
      setStatus({ msg: 'Cảm ơn đồng chí đã gửi ý kiến đóng góp cho hệ thống!', type: 'success' });
    }, 1500);
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-64 space-y-2">
          {[
            { id: 'profile', label: 'Thông tin cá nhân', icon: User },
            { id: 'password', label: 'Bảo mật mật mã', icon: Lock },
            { id: 'feedback', label: 'Đóng góp ý kiến', icon: MessageSquare },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-red-700 text-white shadow-xl translate-x-2' 
                : 'bg-white text-slate-400 hover:bg-red-50 hover:text-red-700 border border-slate-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50">
             <h3 className="text-xl font-black text-red-700 uppercase italic tracking-tighter">
               {activeTab === 'profile' && 'Hồ sơ người dùng'}
               {activeTab === 'password' && 'Thiết lập bảo mật'}
               {activeTab === 'feedback' && 'Trung tâm phản hồi'}
             </h3>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cấu hình trải nghiệm cá nhân của đồng chí</p>
          </div>

          <div className="p-10 flex-1">
            {status && (
              <div className={`mb-8 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                <CheckCircle size={20} />
                <span className="text-[11px] font-black uppercase tracking-widest">{status.msg}</span>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-10 flex flex-col items-center">
                 <div className="relative group">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden group-hover:opacity-75 transition-all">
                      {currentUser.avatarUrl ? (
                        <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><User size={60} /></div>
                      )}
                    </div>
                    <label className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-700 text-white rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer border-4 border-white hover:scale-110 transition-transform active:scale-95">
                       <Camera size={20} />
                       <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                 </div>

                 <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-4">Định danh quân nhân:</label>
                      <div className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-slate-700 uppercase tracking-widest italic">{currentUser.username}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-4">Vai trò hệ thống:</label>
                      <div className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-red-700 uppercase tracking-widest flex items-center gap-3">
                        <Shield size={18} /> {currentUser.role === 'admin' ? 'Quản trị viên cấp cao' : 'Chiến sĩ - Học viên'}
                      </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordUpdate} className="space-y-8 max-w-md mx-auto">
                 <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Mật mã hiện tại:</label>
                      <input type="password" required className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none transition-all font-bold text-sm bg-slate-50 shadow-inner" placeholder="••••••••" value={passwordForm.current} onChange={e => setPasswordForm({...passwordForm, current: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Mật mã mới:</label>
                      <input type="password" required className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none transition-all font-bold text-sm bg-slate-50 shadow-inner" placeholder="Ít nhất 6 ký tự" value={passwordForm.next} onChange={e => setPasswordForm({...passwordForm, next: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Xác nhận mật mã mới:</label>
                      <input type="password" required className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none transition-all font-bold text-sm bg-slate-50 shadow-inner" placeholder="Nhập lại mật mã mới" value={passwordForm.confirm} onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})} />
                    </div>
                 </div>
                 <button type="submit" className="w-full bg-red-700 text-white py-5 rounded-2xl font-black uppercase text-[11px] shadow-xl tracking-[0.3em] hover:bg-red-800 transition-all active:scale-95 border-b-4 border-red-950 italic flex items-center justify-center gap-3">
                   <Lock size={18} /> Cập nhật mật mã
                 </button>
              </form>
            )}

            {activeTab === 'feedback' && (
              <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-4 flex items-center gap-3"><MessageSquare size={16} className="text-red-700" /> Đồng chí đóng góp ý kiến xây dựng ứng dụng:</label>
                    <textarea 
                      required
                      className="w-full h-56 p-8 border-2 border-slate-100 rounded-[2.5rem] focus:border-red-600 outline-none transition-all font-medium text-slate-700 bg-slate-50 shadow-inner leading-relaxed text-sm custom-scrollbar" 
                      placeholder="Ý kiến của đồng chí về tính năng, nội dung hoặc giao diện..."
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                    />
                 </div>
                 <div className="flex justify-end">
                   <button type="submit" disabled={isSubmitting} className="bg-red-700 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] shadow-xl tracking-[0.3em] hover:bg-red-800 transition-all active:scale-95 border-b-4 border-red-950 italic flex items-center gap-3">
                     {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                     {isSubmitting ? 'Đang truyền gửi...' : 'Gửi đóng góp'}
                   </button>
                 </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AUTH SCREEN ---
const AuthScreen: React.FC<{ data: AppData; onLogin: (user: UserAccount) => void }> = ({ data, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tài khoản Admin mặc định: admin123 / 123456
    if (username === 'admin123' && password === '123456') {
      onLogin({ username: 'admin123', role: 'admin' });
      return;
    }

    const users: UserAccount[] = JSON.parse(localStorage.getItem('military_users_v7') || '[]');
    
    if (isRegistering) {
      if (username === 'admin123') { 
        setError('Tên định danh admin123 được bảo mật, vui lòng chọn tên khác.'); 
        return; 
      }
      if (users.find(u => u.username === username)) { 
        setError('Tài khoản đã tồn tại trên hệ thống.'); 
        return; 
      }
      
      const newUser: UserAccount = { username, password, role: 'user' };
      users.push(newUser);
      localStorage.setItem('military_users_v7', JSON.stringify(users));
      setIsRegistering(false);
      setError('');
      alert('Đăng ký thành công! Mời đồng chí đăng nhập.');
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Thông tin không chính xác. Đồng chí vui lòng Đăng ký nếu chưa có tài khoản.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 relative">
      <div className="bg-white rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-slate-200 z-10 min-h-[700px]">
        <div className="md:w-[50%] relative flex flex-col items-center justify-center overflow-hidden bg-red-950 border-r border-slate-200">
          {data.loginImageUrl ? (
            <img src={data.loginImageUrl} alt="Login Background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          ) : (
            <div className="vpa-hero-bg absolute inset-0"><div className="vpa-watermark"></div></div>
          )}
          <div className="relative z-10 flex flex-col items-center gap-10 text-center px-12">
             <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-xl vpa-float gold-glow cursor-pointer">
                {data.loginLogoUrl ? (
                  <img src={data.loginLogoUrl} className="w-24 h-24 object-contain" alt="Login Logo" />
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg" className="w-24 h-24" alt="Default VPA" />
                )}
             </div>
             <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl border-4 border-[#ffde00]/20 transform transition-all hover:scale-105">
               <QRCodeSVG value={window.location.href} size={140} fgColor="#7f1d1d" />
             </div>
          </div>
          <p className="text-[10px] font-black uppercase opacity-80 tracking-[0.4em] text-white absolute bottom-10 z-10 text-center px-4 leading-relaxed">{data.loginMessage}</p>
        </div>
        
        <div className="p-12 md:p-20 flex-1 bg-white flex flex-col justify-center">
          <div className="mb-14">
            <h3 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">
              {isRegistering ? 'Đăng ký tài khoản' : 'Chào mừng đồng chí'}
            </h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
              {isRegistering ? 'Ghi danh vào hệ thống giáo dục' : 'Hệ thống giáo dục chính trị điện tử'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-8">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black text-center border border-red-100 uppercase tracking-widest">{error}</div>}
            <div className="space-y-6">
              <input className="w-full pl-8 pr-6 py-6 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:border-red-600 font-bold text-slate-700 bg-slate-50 transition-all text-sm shadow-inner" placeholder="Tên định danh cá nhân" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="password" className="w-full pl-8 pr-6 py-6 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:border-red-600 font-bold text-slate-700 bg-slate-50 transition-all text-sm shadow-inner" placeholder="Mật mã bảo mật" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full btn-military text-white py-6 rounded-[1.5rem] font-black uppercase shadow-2xl tracking-[0.3em] text-xs">
              {isRegistering ? 'Xác nhận Đăng ký' : 'Xác nhận Đăng nhập'}
            </button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="w-full text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-8 hover:text-red-700 transition-colors">
              {isRegistering ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chiến sĩ mới? Nhấn để Đăng ký tài khoản'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('military_current_user_v7');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [appData, setAppData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem('military_app_data_v7');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  useEffect(() => { 
    try {
      localStorage.setItem('military_app_data_v7', JSON.stringify(appData)); 
    } catch (e) {
      console.error("Dữ liệu quá lớn, không thể lưu vào bộ nhớ cục bộ:", e);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert("Cảnh báo: Bộ nhớ hệ thống đã đầy (tối đa 5MB). Đồng chí vui lòng xóa bớt các bản nhạc hoặc hình ảnh có kích thước lớn để tiếp tục lưu trữ.");
      }
    }
  }, [appData]);

  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem('military_current_user_v7', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('military_current_user_v7');
    }
  }, [currentUser]);

  const isAdmin = currentUser?.role === 'admin';

  // Hàm cập nhật và đồng bộ thông tin người dùng với cơ sở dữ liệu (localStorage)
  const handleUpdateUser = (updated: UserAccount) => {
    setCurrentUser(updated);
    
    // Nếu không phải admin mặc định (vì admin mặc định không nằm trong danh sách users đăng ký)
    if (updated.username !== 'admin123') {
      const users: UserAccount[] = JSON.parse(localStorage.getItem('military_users_v7') || '[]');
      const index = users.findIndex(u => u.username === updated.username);
      if (index !== -1) {
        users[index] = updated;
        localStorage.setItem('military_users_v7', JSON.stringify(users));
      }
    }
  };

  const updateGlobal = (key: keyof AppData, val: any) => {
    if (isAdmin) setAppData(prev => ({ ...prev, [key]: val }));
  };

  const updateEntertainment = (updater: (prev: AppData['entertainment']) => AppData['entertainment']) => {
    if (isAdmin) setAppData(prev => ({ ...prev, entertainment: updater(prev.entertainment) }));
  };

  const updateSection = (key: keyof AppData, title: string, content: string, img?: string, avatar?: string) => {
    if (!isAdmin) return;
    setAppData(prev => {
      const section = prev[key];
      if (section && typeof section === 'object' && 'body' in section) {
        return { ...prev, [key]: { ...section, title, body: content, imageUrl: img, avatarUrl: avatar } };
      }
      return prev;
    });
  };

  const updateTradition = (key: keyof AppData['tradition'], name: string, history: string, img?: string, avatar?: string) => {
    if (!isAdmin) return;
    setAppData(prev => ({ ...prev, tradition: { ...prev.tradition, [key]: { ...prev.tradition[key], name, history, imageUrl: img, avatarUrl: avatar } } }));
  };

  const updateLecture = (cat: 'newRecruits' | 'hsqcsYear1' | 'hsqcsYear2', id: string, title: string, poster?: string) => {
    if (!isAdmin) return;
    setAppData(prev => ({
      ...prev,
      lectures: { ...prev.lectures, [cat]: prev.lectures[cat].map(l => l.id === id ? { ...l, title, posterUrl: poster } : l) }
    }));
  };

  if (!currentUser) return <AuthScreen data={appData} onLogin={setCurrentUser} />;

  return (
    <Router>
      <div style={{ backgroundImage: `url(${appData.globalBackground})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }} className="min-h-screen transition-all duration-1000">
        <div className="bg-white/95 min-h-screen backdrop-blur-[2px]">
          <Layout playlist={appData.backgroundPlaylist} currentUser={currentUser} appName={appData.appName} appLogo={appData.appLogo} onLogout={() => setCurrentUser(null)}>
            <Routes>
              <Route path="/" element={<HomeView data={appData} isAdmin={isAdmin} onUpdate={updateSection} onUpdateGlobal={updateGlobal} onUpdatePlaylist={(l) => updateGlobal('backgroundPlaylist', l)} />} />
              <Route path="/history-vn" element={<HistoryVNView data={appData} isAdmin={isAdmin} onUpdate={updateSection} />} />
              <Route path="/tradition" element={<TraditionView data={appData} isAdmin={isAdmin} onUpdate={updateTradition} />} />
              <Route path="/lectures" element={<LecturesView data={appData} isAdmin={isAdmin} onUpdateLecture={updateLecture} />} />
              <Route path="/entertainment" element={<EntertainmentView data={appData} isAdmin={isAdmin} onUpdateEntertainment={updateEntertainment} />} />
              <Route path="/game" element={<GameView data={appData} isAdmin={isAdmin} />} />
              <Route path="/settings" element={<SettingsView currentUser={currentUser} onUpdateUser={handleUpdateUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <AIAssistant appLogo={appData.appLogo} />
        </div>
      </div>
    </Router>
  );
};

// --- HOME VIEW ---
const HomeView: React.FC<{ 
  data: AppData; 
  isAdmin: boolean; 
  onUpdate: (key: keyof AppData, t: string, c: string, i?: string, a?: string) => void; 
  onUpdateGlobal: (k: keyof AppData, v: any) => void; 
  onUpdatePlaylist: (l: BackgroundMusic[]) => void 
}> = ({ data, isAdmin, onUpdate, onUpdateGlobal, onUpdatePlaylist }) => {
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // 1. Xử lý Upload Ảnh
  const handleImageUpload = (key: keyof AppData, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => onUpdateGlobal(key, ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("Ảnh quá lớn (tối đa 2MB)");
    }
  };

  // 2. Xử lý Upload Nhạc
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const title = file.name.split('.').slice(0, -1).join('.');
        onUpdatePlaylist([...data.backgroundPlaylist, { title, url: ev.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File nhạc quá lớn (tối đa 2MB)");
    }
  };

  // 3. Xử lý Xóa Nhạc
  const handleDeleteTrack = (index: number) => {
    if (confirm("Đồng chí có chắc muốn xóa bản nhạc này?")) {
      const newList = [...data.backgroundPlaylist];
      newList.splice(index, 1);
      onUpdatePlaylist(newList);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Banner Tiêu đề */}
      <div className="bg-red-800 p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white border-b-4 border-[#ffde00]/50">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md border border-white/20">
             <Flag size={18} className="text-[#ffde00]" /> Lực lượng vũ trang Thủ đô Hà Nội
          </div>
          <h2 className="text-6xl font-black uppercase italic leading-tight tracking-tighter drop-shadow-2xl">{data.appName}</h2>
          <p className="text-xl font-medium text-white/90 max-w-4xl leading-relaxed">Nền tảng giáo dục chính trị điện tử hiện đại dành cho cán bộ, chiến sĩ.</p>
        </div>
        <div className="absolute top-[-50px] right-[-50px] p-8 opacity-5 scale-150 rotate-12 pointer-events-none"><Shield size={380} /></div>
      </div>

      {/* Phần giới thiệu */}
      <EditableSection 
        isAdmin={isAdmin} 
        title={data.intro.title} 
        content={data.intro.body} 
        imageUrl={data.intro.imageUrl} 
        avatarUrl={data.intro.avatarUrl}
        onSave={(t, c, i, a) => onUpdate('intro', t, c, i, a)} 
      />

      {/* Cấu hình hệ thống dành cho Admin */}
      {isAdmin && (
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-10">
          <div className="flex justify-between items-center border-b border-slate-100 pb-8">
            <div className="space-y-2">
               <h3 className="text-sm font-black uppercase text-red-700 flex items-center gap-3 tracking-[0.3em]"><Monitor size={22} /> CẤU HÌNH HỆ THỐNG</h3>
            </div>
            <button onClick={() => setIsEditingGlobal(!isEditingGlobal)} className="p-4 rounded-full bg-slate-100">
              {isEditingGlobal ? <X size={24}/> : <LayoutIcon size={24}/>}
            </button>
          </div>

          {isEditingGlobal && (
            <div className="grid gap-8 animate-in zoom-in duration-300">
              <input 
                className="w-full p-5 border rounded-2xl" 
                value={data.appName} 
                onChange={(e) => onUpdateGlobal('appName', e.target.value)} 
                placeholder="Tên ứng dụng..." 
              />
              
              {/* Grid hình ảnh */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{ key: 'appLogo', label: 'Logo Chính' }, { key: 'globalBackground', label: 'Nền hệ thống' }].map(item => (
                  <div key={item.key} className="bg-slate-50 p-4 rounded-2xl border flex flex-col items-center">
                    <span className="text-[10px] font-bold mb-2 uppercase">{item.label}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(item.key as any, e)} className="text-[10px]" />
                  </div>
                ))}
              </div>

              {/* Quản lý nhạc */}
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="flex justify-between mb-4">
                  <span className="font-bold uppercase text-xs">Danh sách nhạc nền</span>
                  <button onClick={() => audioInputRef.current?.click()} className="text-red-700 font-bold text-xs">+ THÊM NHẠC</button>
                  <input type="file" ref={audioInputRef} className="hidden" accept="audio/*" onChange={handleAudioUpload} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.backgroundPlaylist.map((track, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl flex justify-between border">
                      <span className="text-xs font-bold truncate">{track.title}</span>
                      <button onClick={() => handleDeleteTrack(i)}><Trash2 size={14} className="text-red-500"/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- ENTERTAINMENT VIEW ---
const EntertainmentView: React.FC<{ data: AppData; isAdmin: boolean; onUpdateEntertainment: (updater: (prev: AppData['entertainment']) => AppData['entertainment']) => void }> = ({ data, isAdmin, onUpdateEntertainment }) => {
  const [activeMedia, setActiveMedia] = useState<{url: string, title: string} | null>(null);
  const [isEditingList, setIsEditingList] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{type: 'songs' | 'dances', index: number} | null>(null);

  const handleAddItem = (type: 'songs' | 'dances') => {
    const title = prompt("Tên mục mới:");
    if (title) {
      onUpdateEntertainment(prev => ({ ...prev, [type]: [...prev[type], { title }] }));
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin || !uploadTarget) return;
    
    if (file.size > 3 * 1024 * 1024) { // 3MB limit cho video/audio giải trí
        alert("Tệp giải trí quá lớn. Đồng chí vui lòng chọn tệp nhỏ hơn 3MB.");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const { type, index } = uploadTarget;
      onUpdateEntertainment(prev => {
        const newList = [...prev[type]];
        newList[index] = { ...newList[index], url };
        return { ...prev, [type]: newList };
      });
      setUploadTarget(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteItem = (type: 'songs' | 'dances', index: number) => {
    if (confirm("Xóa mục này?")) {
      onUpdateEntertainment(prev => {
        const newList = [...prev[type]];
        newList.splice(index, 1);
        return { ...prev, [type]: newList };
      });
    }
  };

  return (
    <div className="space-y-14 animate-in fade-in zoom-in duration-700">
      <input type="file" ref={fileInputRef} className="hidden" accept="video/*,audio/*" onChange={handleMediaUpload} />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-red-700 uppercase italic">Góc Giải trí</h2>
        {isAdmin && (
          <button onClick={() => setIsEditingList(!isEditingList)} className="bg-red-700 text-white px-8 py-4 rounded-xl font-black uppercase text-[10px]">
            {isEditingList ? 'Thoát chỉnh sửa' : 'Quản trị Thư viện'}
          </button>
        )}
      </div>

      {activeMedia && (
        <div className="bg-black p-10 rounded-[3rem] border-2 border-red-800 relative z-50">
          <button onClick={() => setActiveMedia(null)} className="absolute -top-6 -right-6 bg-red-600 text-white w-12 h-12 rounded-full font-black">×</button>
          <video src={activeMedia.url} controls autoPlay className="w-full rounded-2xl" />
          <p className="mt-6 text-center text-white font-black uppercase tracking-widest">{activeMedia.title}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl">
           <div className="flex justify-between items-center mb-8 border-b-4 border-[#ffde00] pb-4">
              <h3 className="text-lg font-black uppercase text-red-700">15 Bài hát Quy định</h3>
              {isEditingList && <button onClick={() => handleAddItem('songs')} className="bg-red-700 text-white p-2 rounded-lg"><Plus size={20}/></button>}
           </div>
           <div className="space-y-4">
              {data.entertainment.songs.map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:border-red-600 transition-all">
                  <span className="text-slate-700 font-black text-xs uppercase">{item.title}</span>
                  <div className="flex items-center gap-3">
                    {isEditingList ? (
                      <div className="flex gap-2">
                        <button onClick={() => { setUploadTarget({type:'songs', index:i}); fileInputRef.current?.click(); }} className="text-slate-400 hover:text-red-700"><Upload size={18}/></button>
                        <button onClick={() => handleDeleteItem('songs', i)} className="text-slate-300 hover:text-red-600"><Trash2 size={18}/></button>
                      </div>
                    ) : (
                      <button disabled={!item.url} onClick={() => setActiveMedia({url: item.url!, title: item.title})} className={`p-3 rounded-xl ${item.url ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}><Play size={16} fill="currentColor"/></button>
                    )}
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-[#7f1d1d] p-10 rounded-[3rem] border-2 border-red-900 text-white">
           <div className="flex justify-between items-center mb-8 border-b-4 border-[#ffde00]/50 pb-4">
              <h3 className="text-lg font-black uppercase">Các điệu vũ Quy định</h3>
              {isEditingList && <button onClick={() => handleAddItem('dances')} className="bg-white/10 p-2 rounded-lg"><Plus size={20}/></button>}
           </div>
           <div className="space-y-4">
              {data.entertainment.dances.map((item, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group hover:bg-white/10">
                   <span className="font-black text-xs uppercase text-orange-200">{item.title}</span>
                   <div className="flex gap-3">
                     {isEditingList ? (
                       <button onClick={() => { setUploadTarget({type:'dances', index:i}); fileInputRef.current?.click(); }} className="text-white/40 hover:text-white"><Upload size={18}/></button>
                     ) : (
                       <button disabled={!item.url} onClick={() => setActiveMedia({url: item.url!, title: item.title})} className={`p-3 rounded-xl ${item.url ? 'bg-white text-red-900' : 'bg-white/5 text-white/20'}`}><Play size={16} fill="currentColor"/></button>
                     )}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- TRADITION VIEW (NÂNG CẤP) ---
const TraditionView: React.FC<{ data: AppData; isAdmin: boolean; onUpdate: (key: keyof AppData['tradition'], t: string, c: string, i?: string, a?: string) => void }> = ({ data, isAdmin, onUpdate }) => {
  const [sel, setSel] = useState<keyof AppData['tradition']>('capitalForces');
  const selectedUnit = data.tradition[sel];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700 relative">
      {/* Hiệu ứng ảnh nền mờ đặc thù cho từng đơn vị */}
      {selectedUnit.imageUrl && (
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-5 blur-xl transition-all duration-1000 overflow-hidden">
          <img src={selectedUnit.imageUrl} className="w-full h-full object-cover scale-110" alt="Background Fade" />
        </div>
      )}

      {/* Menu chọn đơn vị */}
      <div className="flex flex-wrap gap-5 p-8 bg-white/70 rounded-[3rem] border-2 border-slate-100 overflow-x-auto custom-scrollbar backdrop-blur-md shadow-xl">
        {(Object.keys(data.tradition) as Array<keyof AppData['tradition']>).map(k => (
          <button 
            key={k} 
            onClick={() => setSel(k)} 
            className={`px-10 py-5 rounded-[2rem] font-black uppercase text-[10px] border-2 transition-all whitespace-nowrap tracking-[0.2em] flex items-center gap-4 ${
              sel === k 
              ? 'bg-red-800 text-white border-red-800 shadow-2xl scale-105' 
              : 'bg-white text-slate-400 border-slate-100 hover:border-red-400 hover:text-red-700 shadow-sm'
            }`}
          >
            {data.tradition[k].avatarUrl ? (
              <img src={data.tradition[k].avatarUrl} className="w-6 h-6 object-contain" />
            ) : (
              <Shield size={16} />
            )}
            {data.tradition[k].name}
          </button>
        ))}
      </div>

      {/* Nội dung chi tiết đơn vị */}
      <div className="animate-in zoom-in duration-500">
        <EditableSection 
          isAdmin={isAdmin} 
          title={selectedUnit.name} 
          content={selectedUnit.history} 
          imageUrl={selectedUnit.imageUrl} 
          avatarUrl={selectedUnit.avatarUrl}
          onSave={(t, c, i, a) => onUpdate(sel, t, c, i, a)} 
        />
      </div>

      <div className="p-8 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Truyền thống anh hùng - Bản lĩnh Thủ đô</p>
      </div>
    </div>
  );
};

// --- LECTURES VIEW (NÂNG CẤP QUẢN TRỊ BÀI GIẢNG) ---
const LecturesView: React.FC<{ data: AppData; isAdmin: boolean; onUpdateLecture: (cat: any, id: string, title: string, poster?: string) => void }> = ({ data, isAdmin, onUpdateLecture }) => {
  const [cat, setCat] = useState<'newRecruits' | 'hsqcsYear1' | 'hsqcsYear2'>('newRecruits');
  const [editingTitle, setEditingTitle] = useState<{id: string, value: string} | null>(null);

  const handlePosterUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isAdmin) {
      if (file.size > 1.5 * 1024 * 1024) {
         alert("Ảnh bài giảng quá lớn (Tối đa 1.5MB).");
         return;
      }
      const reader = new FileReader();
      const lecture = data.lectures[cat].find(l => l.id === id);
      reader.onload = (event) => onUpdateLecture(cat, id, lecture?.title || '', event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getCategoryLabel = (c: string) => {
    switch(c) {
      case 'newRecruits': return 'Chiến sĩ mới';
      case 'hsqcsYear1': return 'HSQ-CS Năm 1';
      case 'hsqcsYear2': return 'HSQ-CS Năm 2';
      default: return '';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Chuyên mục */}
      <div className="bg-red-900 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden border-b-8 border-[#ffde00]/30">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="bg-white/10 p-6 rounded-[2.5rem] border border-white/20 backdrop-blur-xl">
               <BookOpen size={50} className="text-[#ffde00]" />
            </div>
            <div className="text-center md:text-left">
               <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Hệ thống Bài giảng Chính trị</h2>
               <p className="text-red-100 font-medium opacity-80 mt-2">Tổng hợp nội dung ôn tập cho các đối tượng chiến sĩ trong toàn quân.</p>
            </div>
         </div>
         <div className="absolute top-[-20px] right-[-20px] opacity-5 scale-150 rotate-12"><Flag size={300} /></div>
      </div>

      {/* Tabs đối tượng */}
      <div className="flex flex-wrap gap-4 p-4 bg-white/70 rounded-[2.5rem] border-2 border-slate-100 inline-flex shadow-xl backdrop-blur-sm">
        {['newRecruits', 'hsqcsYear1', 'hsqcsYear2'].map(c => (
          <button 
            key={c} 
            onClick={() => setCat(c as any)} 
            className={`px-10 py-4 rounded-[1.5rem] font-black uppercase text-[10px] transition-all tracking-[0.2em] border-2 ${
              cat === c 
              ? 'bg-red-800 text-white border-red-800 shadow-xl scale-105' 
              : 'text-slate-400 border-transparent hover:text-red-800 hover:border-slate-200'
            }`}
          >
            {getCategoryLabel(c)}
          </button>
        ))}
      </div>

      {/* Grid bài giảng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {data.lectures[cat].map((l, index) => (
          <div key={l.id} className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col hover:border-red-400 transition-all group relative">
            {/* Banner hiển thị số bài */}
            <div className="absolute top-6 left-6 z-20 bg-red-700 text-white px-5 py-2 rounded-2xl font-black italic text-[10px] shadow-xl border border-white/20">
              BÀI {index + 1}
            </div>

            {/* Header quản trị */}
            <div className="bg-slate-50 p-10 pt-16 flex flex-col gap-6 border-b border-slate-100">
              {editingTitle?.id === l.id ? (
                <div className="flex flex-col gap-4 animate-in slide-in-from-top-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Tên bài giảng:</label>
                   <div className="flex gap-3">
                      <input 
                        className="flex-1 p-5 rounded-2xl text-slate-800 font-bold text-sm border-2 border-red-200 outline-none focus:border-red-600 bg-white" 
                        value={editingTitle.value} 
                        onChange={(e) => setEditingTitle({id: l.id, value: e.target.value})} 
                        autoFocus
                      />
                      <button 
                        onClick={() => { onUpdateLecture(cat, l.id, editingTitle.value, l.posterUrl); setEditingTitle(null); }} 
                        className="bg-green-600 p-5 rounded-2xl text-white shadow-lg hover:bg-green-700"
                      >
                        <CheckCircle size={24}/>
                      </button>
                   </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-black uppercase text-lg text-slate-800 leading-tight italic">{l.title}</h4>
                  {isAdmin && (
                    <div className="flex gap-4 shrink-0">
                       <button 
                        onClick={() => setEditingTitle({id: l.id, value: l.title})} 
                        className="p-3 bg-white text-slate-400 hover:text-red-700 rounded-xl border border-slate-200 shadow-sm transition-all"
                        title="Đổi tên bài"
                       >
                         <Edit2 size={18}/>
                       </button>
                       <label 
                        className="p-3 bg-white text-slate-400 hover:text-red-700 rounded-xl border border-slate-100 shadow-sm cursor-pointer transition-all"
                        title="Tải ảnh tóm tắt"
                       >
                         <ImageIcon size={18} />
                         <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePosterUpload(l.id, e)} />
                       </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hiển thị hình ảnh tóm tắt nội dung */}
            <div className="flex-1 min-h-[450px] bg-slate-50/20 flex items-center justify-center p-10 relative overflow-hidden group">
              {l.posterUrl ? (
                <div className="w-full h-full relative">
                   <img 
                    src={l.posterUrl} 
                    className="w-full h-full object-contain rounded-[2.5rem] shadow-2xl border-4 border-white transition-transform duration-700 group-hover:scale-[1.02]" 
                    alt="Lecture Poster" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                </div>
              ) : (
                <div className="text-center opacity-10 flex flex-col items-center">
                  <ImageIcon size={100} />
                  <p className="font-black text-[10px] mt-4 tracking-widest uppercase italic">Chưa có ảnh tóm tắt nội dung</p>
                  {isAdmin && <p className="text-[9px] mt-1">Nhấn biểu tượng ảnh phía trên để tải lên</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 text-center">
         <div className="w-20 h-1 bg-red-700 mx-auto rounded-full mb-4"></div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Học tập nghiêm túc - Rèn luyện kỷ cương</p>
      </div>
    </div>
  );
};

const HistoryVNView: React.FC<{ data: AppData; isAdmin: boolean; onUpdate: (key: keyof AppData, t: string, c: string, i?: string, a?: string) => void }> = ({ data, isAdmin, onUpdate }) => (
  <div className="animate-in zoom-in duration-1000">
    <EditableSection 
      isAdmin={isAdmin} 
      title={data.historyVN.title} 
      content={data.historyVN.body} 
      imageUrl={data.historyVN.imageUrl} 
      avatarUrl={data.historyVN.avatarUrl}
      onSave={(t, c, i, a) => onUpdate('historyVN', t, c, i, a)} 
    />
  </div>
);

// --- CẬP NHẬT GAMEVIEW (HỆ THỐNG ÔN TẬP) ---
const GameView: React.FC<{ data: AppData; isAdmin: boolean }> = ({ data, isAdmin }) => {
  const [gameState, setGameState] = useState<'lobby' | 'loading' | 'playing' | 'result'>('lobby');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [topic, setTopic] = useState("Lịch sử Quân đội Việt Nam");

  const topics = [
    { id: 'history', name: 'Lịch sử Quân đội', icon: HistoryIcon, query: 'lịch sử hình thành và các chiến dịch oai hùng của Quân đội Nhân dân Việt Nam' },
    { id: 'politics', name: 'Giáo dục Chính trị', icon: Shield, query: 'chủ nghĩa Mác-Lênin, tư tưởng Hồ Chí Minh và đường lối quốc phòng toàn dân' },
    { id: 'regulations', name: 'Điều lệnh & Kỷ luật', icon: Award, query: '12 điều kỷ luật, 10 lời thề danh dự và các chế độ sinh hoạt trong ngày' },
    { id: 'tradition', name: 'Truyền thống Thủ đô', icon: Flag, query: 'truyền thống Quyết tử để Tổ quốc quyết sinh của LLVT Thủ đô Hà Nội' },
  ];

  const startQuiz = async (t: string) => {
    setTopic(t);
    setGameState('loading');
    const q = await generateQuiz(t);
    if (q.length > 0) {
      setQuestions(q);
      setCurrentIdx(0);
      setScore(0);
      setGameState('playing');
    } else {
      alert("Hệ thống gặp lỗi khi tạo câu hỏi. Đồng chí vui lòng thử lại.");
      setGameState('lobby');
    }
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameState('result');
    }
  };

  if (gameState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-pulse">
        <div className="w-32 h-32 bg-red-700 rounded-full flex items-center justify-center text-white shadow-2xl">
          <Loader2 size={60} className="animate-spin" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-black text-red-700 uppercase tracking-widest italic">Đang thiết lập phòng thi...</h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] mt-2 tracking-[0.2em]">Trí tuệ nhân tạo đang biên soạn bộ đề ôn tập cho đồng chí</p>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-[4rem] shadow-2xl border-2 border-slate-100 overflow-hidden animate-in zoom-in duration-500">
        <div className="bg-red-800 p-12 text-center text-white relative">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
           <Trophy size={80} className="mx-auto text-[#ffde00] mb-6 gold-glow" />
           <h3 className="text-4xl font-black uppercase italic tracking-tighter">Kết quả ôn tập</h3>
           <p className="text-red-200 font-bold uppercase text-xs tracking-widest mt-2">{topic}</p>
        </div>
        <div className="p-14 text-center space-y-10">
           <div className="grid grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Số câu đúng</p>
                 <p className="text-5xl font-black text-red-700 italic">{score} / {questions.length}</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Đánh giá</p>
                 <p className="text-xl font-black text-slate-800 uppercase italic">
                   {percentage >= 80 ? 'Xuất sắc' : percentage >= 60 ? 'Đạt yêu cầu' : 'Cần ôn tập thêm'}
                 </p>
              </div>
           </div>
           <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 italic">
              <p className="text-sm font-bold text-red-800 leading-relaxed">
                "{percentage >= 80 ? 'Đồng chí có kiến thức rất vững chắc. Hãy tiếp tục phát huy!' : 'Việc học tập chính trị là nhiệm vụ thường xuyên. Đồng chí hãy cố gắng trau dồi thêm.'}"
              </p>
           </div>
           <button onClick={() => setGameState('lobby')} className="w-full bg-red-700 text-white py-6 rounded-[2rem] font-black uppercase text-xs shadow-xl tracking-[0.3em] hover:bg-red-800 transition-all border-b-8 border-red-950 flex items-center justify-center gap-4">
             <RefreshCw size={20} /> Làm bộ đề khác
           </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const q = questions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
        <div className="flex justify-between items-center bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-4">
              <div className="bg-red-700 text-white px-4 py-2 rounded-xl font-black italic text-sm">Câu {currentIdx + 1} / {questions.length}</div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{topic}</h4>
           </div>
           <div className="flex items-center gap-3">
              <Shield size={18} className="text-red-700" />
              <span className="text-sm font-black text-red-700 italic">Điểm: {score}</span>
           </div>
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
           <div className="p-12 bg-slate-50 border-b border-slate-100">
              <div className="flex items-start gap-6">
                 <div className="w-14 h-14 bg-red-700 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><HelpCircle size={28} /></div>
                 <h3 className="text-2xl font-black text-slate-800 leading-tight">{q.question}</h3>
              </div>
           </div>
           <div className="p-12 flex-1 space-y-4">
              {q.options.map((opt, i) => {
                let btnStyle = "bg-white border-2 border-slate-100 hover:border-red-400 hover:bg-red-50";
                if (isAnswered) {
                  if (i === q.correctIndex) btnStyle = "bg-green-50 border-green-600 text-green-800";
                  else if (i === selectedOption) btnStyle = "bg-red-50 border-red-600 text-red-800";
                  else btnStyle = "bg-slate-50 border-slate-100 opacity-50";
                }
                return (
                  <button 
                    key={i} 
                    onClick={() => handleOptionClick(i)}
                    disabled={isAnswered}
                    className={`w-full p-6 rounded-2xl text-left transition-all flex items-center gap-6 group ${btnStyle}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${isAnswered && i === q.correctIndex ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-100 text-slate-400 group-hover:text-red-700 group-hover:border-red-200'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-base font-bold flex-1">{opt}</span>
                    {isAnswered && i === q.correctIndex && <CheckCircle className="text-green-600" size={24} />}
                  </button>
                );
              })}
           </div>
           {isAnswered && (
             <div className="p-10 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-bottom-5">
                {q.explanation && (
                  <div className="mb-8 p-6 bg-white rounded-2xl border-l-8 border-red-700 shadow-sm">
                    <p className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-2">Phân tích chuyên sâu:</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">{q.explanation}</p>
                  </div>
                )}
                <div className="flex justify-end">
                   <button onClick={nextQuestion} className="bg-red-700 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] shadow-xl tracking-[0.2em] flex items-center gap-3 hover:bg-red-800 active:scale-95 transition-all">
                     Tiếp tục <ChevronRight size={18} />
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-red-950 p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border-b-[12px] border-[#ffde00]/30">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Dong_Son_drum_surface.svg")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="bg-white/10 p-8 rounded-[3rem] border border-white/20 backdrop-blur-xl gold-glow">
             <Gamepad2 size={80} className="text-[#ffde00]" />
          </div>
          <div className="text-center md:text-left space-y-4 flex-1">
             <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Chiến sĩ Thông thái</h2>
             <p className="text-xl font-medium text-red-100 max-w-2xl leading-relaxed opacity-80">Hệ thống ôn tập trắc nghiệm thông minh. Lựa chọn chủ đề bên dưới để bắt đầu rèn luyện tư duy và bản lĩnh chính trị.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {topics.map(t => (
          <button 
            key={t.id} 
            onClick={() => startQuiz(t.query)}
            className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 text-left hover:border-red-600 hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0 group-hover:bg-red-50 transition-colors"></div>
            <div className="relative z-10 space-y-6">
               <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-red-700 group-hover:text-white transition-all shadow-sm">
                  <t.icon size={40} />
               </div>
               <div>
                  <h4 className="text-2xl font-black uppercase text-slate-800 group-hover:text-red-700 transition-colors mb-2">{t.name}</h4>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed italic">{t.query}</p>
               </div>
               <div className="pt-4 flex items-center gap-3 text-red-700 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Nhấn để vào phòng thi <ChevronRight size={14} />
               </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-10 bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center italic">
         <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Học tập chuyên cần - Rèn luyện kiên tâm - Quyết tâm thắng lợi</p>
      </div>
    </div>
  );
};
// ... Giữ nguyên phần GameView đồ sộ của đồng chí ở phía trên ...

// --- COMPONENT APP CHÍNH ---
const App: React.FC = () => {
  // Tạo dữ liệu mẫu để GameView không bị trống
  const sampleData: AppData = {
    courses: [],
    tests: [],
    statistics: { totalStudyTime: 0, completedLessons: 0, averageScore: 0 }
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          {/* Đường dẫn chính hiển thị Hệ thống Ôn tập */}
          <Route path="/" element={<GameView data={sampleData} isAdmin={true} />} />
          
          {/* Nếu sau này đồng chí thêm trang chủ, hãy đổi path thành "/game" */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// Đảm bảo sau dòng này KHÔNG còn bất kỳ mã nào khác (đặc biệt là ReactDOM)
export default App;
