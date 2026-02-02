import React, { useState } from 'react';
import { User, Lock, ChevronRight, AlertCircle, CheckSquare, Square } from 'lucide-react';
import VpaLogo from '../components/VpaLogo'; 

interface LoginProps {
  onLogin: (username: string) => void;
  onNavigateToRegister: () => void; // Thêm hàm để chuyển sang trang đăng ký
}

const LoginView: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin(username);
    } else {
      setError('Đồng chí vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-[#0a1407]">
      {/* Lớp nền ảnh nghệ thuật quân đội mờ */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://vnanet.vn/Data/Articles/2024/05/07/7325607/vna_p_20240507090253_2961805.jpg')`,
          filter: 'brightness(0.25) contrast(1.2)'
        }}
      />
      
      <div className="relative z-10 w-full max-w-[420px] p-8 bg-[#1a2e12]/85 backdrop-blur-2xl rounded-[2.5rem] border border-green-800/40 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] mx-4">
        
        {/* Phần đầu: Logo & Tiêu đề */}
        <div className="text-center mb-8">
          <VpaLogo size={110} className="mx-auto" animate={true} />
          <h2 className="text-white font-black uppercase tracking-tighter mt-5 text-[clamp(1.1rem,5vw,1.4rem)]">
            Học tập chính trị
          </h2>
          <p className="text-yellow-500/60 text-[10px] uppercase font-bold tracking-[0.2em]">Quân đội nhân dân Việt Nam</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Trường tài khoản */}
          <div className="group">
            <label className="text-[10px] text-yellow-500 uppercase font-black ml-2 mb-1 block tracking-widest opacity-80">Định danh</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                className="w-full bg-black/40 border border-green-900/50 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="Nhập tên đăng nhập..."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Trường mật khẩu */}
          <div className="group">
            <label className="text-[10px] text-yellow-500 uppercase font-black ml-2 mb-1 block tracking-widest opacity-80">Mật mã</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                type="password"
                className="w-full bg-black/40 border border-green-900/50 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Lưu mật khẩu & Quên mật khẩu */}
          <div className="flex items-center justify-between px-2">
            <button 
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider"
            >
              {rememberMe ? <CheckSquare size={16} className="text-yellow-500" /> : <Square size={16} />}
              Lưu mật khẩu
            </button>
            <button type="button" className="text-yellow-500/50 hover:text-yellow-500 text-[11px] font-bold uppercase tracking-wider transition-colors">
              Quên mật mã?
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 p-3 rounded-xl text-red-400 text-[11px] font-bold border border-red-500/20">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {/* Nút đăng nhập */}
          <button className="w-full bg-gradient-to-r from-red-700 to-red-800 text-yellow-400 font-black py-4 rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-b-4 border-red-950">
            Vào hệ thống <ChevronRight size={18} />
          </button>
        </form>

        {/* Phần đăng ký */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-3">Chưa có tài khoản?</p>
          <button 
            onClick={onNavigateToRegister}
            className="text-yellow-500 hover:text-yellow-400 font-black text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline transition-all"
          >
            Đăng ký tài khoản mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
