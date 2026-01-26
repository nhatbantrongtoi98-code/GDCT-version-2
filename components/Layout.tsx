
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, BookOpen, History, Music, Gamepad2, Menu, X, Play, Pause, Shield, SkipBack, SkipForward, LogOut, User, Star, Settings, Calendar, Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BackgroundMusic, UserAccount } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  playlist: BackgroundMusic[];
  currentUser: UserAccount;
  appName: string;
  appLogo?: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, playlist, currentUser, appName, appLogo, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  const isAdmin = currentUser.role === 'admin';
  const currentTrack = playlist.length > 0 ? playlist[currentTrackIndex % playlist.length] : null;

  useEffect(() => {
    audioRef.current = new Audio();
    const handleEnded = () => handleNext();
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.pause();
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.url;
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    } else if (audioRef.current && !currentTrack) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setIsPlaying(false);
    }
  }, [currentTrack?.url, playlist.length]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (!currentTrack?.url || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const formatFullDate = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return `${days[date.getDay()]}, ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
  };

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Lịch sử Việt Nam', path: '/history-vn', icon: History },
    { name: 'Lịch sử Truyền thống', path: '/tradition', icon: Shield },
    { name: 'Bài giảng Chính trị', path: '/lectures', icon: BookOpen },
    { name: 'Góc Giải trí', path: '/entertainment', icon: Music },
    { name: 'Trò chơi Chiến sĩ', path: '/game', icon: Gamepad2 },
    { name: 'Cài đặt Cá nhân', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-slate-800 font-medium">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#7f1d1d] transition-all duration-300 text-white flex flex-col shadow-xl z-20 border-r-2 border-[#d97706]/40`}>
        <div className="p-5 flex items-center justify-between border-b border-white/5 bg-red-950/20">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Star className="text-[#d97706] w-4 h-4" fill="currentColor" />
              <span className="font-bold text-[10px] uppercase tracking-[0.2em] opacity-90">Hệ thống Nội bộ</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                location.pathname === item.path 
                ? 'bg-[#d97706] text-white shadow-lg' 
                : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <item.icon size={18} />
              {isSidebarOpen && <span className="uppercase text-[9px] tracking-widest font-black">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 bg-red-950/30 border-t border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="User Avatar" />
                ) : (
                  isAdmin ? <Settings size={18} /> : <User size={18} />
                )}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-[8px] font-bold text-orange-200 opacity-60 uppercase tracking-tighter">{isAdmin ? 'Quản trị viên' : 'Chiến sĩ'}</p>
                  <p className="text-[11px] font-black truncate uppercase">{currentUser.username}</p>
                </div>
              )}
           </div>
        </div>

        <div className="p-4 bg-black/10 border-t border-white/5">
           {isSidebarOpen && currentTrack && (
             <div className="mb-2">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Âm hưởng nội bộ</p>
                <p className="text-[9px] font-black truncate text-orange-300 uppercase italic leading-tight">{currentTrack.title}</p>
             </div>
           )}
           <div className={`flex items-center justify-center gap-3 ${!isSidebarOpen && 'flex-col'}`}>
              <button onClick={handlePrev} className="text-white/40 hover:text-white transition-colors"><SkipBack size={14}/></button>
              <button onClick={toggleMusic} className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-all border border-white/10">
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>
              <button onClick={handleNext} className="text-white/40 hover:text-white transition-colors"><SkipForward size={14}/></button>
           </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative flex flex-col bg-transparent">
        <header className="bg-white/95 backdrop-blur-md border-b-2 border-slate-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-5">
             <div className="bg-red-50 p-2.5 rounded-2xl shadow-sm">
               {appLogo ? (
                 <img src={appLogo} alt="Logo Hệ thống" className="w-9 h-9 object-contain" />
               ) : (
                 <div className="w-9 h-9 bg-red-700 rounded-lg flex items-center justify-center text-white"><Shield size={20}/></div>
               )}
             </div>
             <div className="border-l-2 border-slate-200 pl-5">
                <h1 className="text-base font-black text-red-700 uppercase tracking-tight mb-1">{appName}</h1>
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                   <div className="flex items-center gap-1.5">
                     <Calendar size={13} className="text-orange-500" />
                     <span>{formatFullDate(currentTime)}</span>
                   </div>
                   <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                     <Clock size={13} className="text-orange-500" />
                     <span>{currentTime.toLocaleTimeString('vi-VN')}</span>
                   </div>
                </div>
             </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-700 hover:border-red-200 transition-all group">
            <LogOut size={15} className="group-hover:translate-x-0.5 transition-transform" /> <span>Đăng xuất</span>
          </button>
        </header>

        <div className="p-8 md:p-12 max-w-6xl mx-auto w-full flex-1">
          {children}
        </div>

        <footer className="p-5 text-center border-t border-slate-100 bg-white/50 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
           HỆ THỐNG GIÁO DỤC CHÍNH TRỊ QUÂN ĐỘI © {currentTime.getFullYear()} - BẢN QUYỀN LLVT THỦ ĐÔ
        </footer>
      </main>
    </div>
  );
};

export default Layout;
