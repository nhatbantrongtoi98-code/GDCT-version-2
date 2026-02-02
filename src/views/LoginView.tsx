import React, { useState } from 'react';
import { User, Lock, ChevronRight, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import VpaLogo from '../components/VpaLogo'; 

interface LoginProps {
  onLogin: (username: string) => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Trạng thái lưu mật khẩu
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      // Nếu rememberMe = true, bạn có thể xử lý lưu vào LocalStorage tại đây
      onLogin(username);
    } else {
      setError('Đồng chí vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-[#0a1407]">
      {/* Nền ảnh */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://vnanet.vn/Data/Articles/2024/05/07/7325607/vna_p_20240507090253_2961805.jpg')`,
          filter: 'brightness(0.25) contrast(1.2)'
        }}
      />
      
      <div className="relative z-10 w-full max-w-[400px] p-8 bg-[#1a2e12]/90 backdrop-blur-xl rounded-[2.5rem] border border-green-800/50 shadow-2xl mx-4">
        <div className="text-center mb-8">
          <VpaLogo size={90} className="mx-auto" animate={true} />
          <h2 className="text-white font-black uppercase tracking-tighter mt-4 text-xl">
            Đăng nhập hệ thống
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tên đăng nhập */}
          <div className="space-y-1">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2">Tên định danh</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" size={18} />
              <input 
                className="w-full bg-black/40 border border-green-900 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 transition-all"
                placeholder="Nhập tên..."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="space-y-1">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2">Mật mã</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" size={18} />
              <input 
                type="password"
                className="w-full bg-black/40 border border-green-900 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Hàng Tiện ích: Lưu mật khẩu & Quên mật khẩu */}
          <div className="flex items-center justify-between px-2 text-[11px]">
            <button 
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              {rememberMe ? (
                <CheckCircle2 size={16} className="text-yellow-500" />
              ) : (
                <Circle size={16} />
              )}
              Lưu mật khẩu
            </button>
            
            <button 
              type="button"
              onClick={() => alert('Đồng chí vui lòng liên hệ Admin đơn vị để cấp lại mật mã!')}
              className="text-yellow-500/80 hover:text-yellow-500 font-bold underline underline-offset-4"
            >
              Quên mật mã?
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button className="w-full bg-gradient-to-r from-red-700 to-red-800 text-yellow-400 font-black py-4 rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-b-4 border-red-950">
            Vào hệ thống <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
