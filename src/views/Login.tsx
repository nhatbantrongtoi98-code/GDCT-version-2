import React, { useState } from 'react';
import { User, Lock, ChevronRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra không để trống thông tin
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin(username);
    } else {
      setError('Đồng chí vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background: Ảnh Duyệt binh */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://vnanet.vn/Data/Articles/2024/05/07/7325607/vna_p_20240507090253_2961805.jpg')`,
          filter: 'brightness(0.3) contrast(1.1)'
        }}
      />
      
      {/* Overlay Xanh quân đội */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e12]/80 via-transparent to-[#1a2e12]/90 z-[1]" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="relative bg-[#1a2e12]/40 backdrop-blur-xl rounded-[2.5rem] border border-green-500/30 shadow-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg" 
              alt="Logo" 
              className="w-24 h-24 mx-auto drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] mb-4"
            />
            <h1 className="text-yellow-500 text-2xl font-black uppercase tracking-widest">Bộ Quốc Phòng</h1>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mt-1">Quân đội nhân dân Việt Nam</p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-yellow-500/80 uppercase tracking-widest font-bold ml-1">Tài khoản</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" size={18} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full bg-black/20 border border-green-900/50 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-yellow-500/80 uppercase tracking-widest font-bold ml-1">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/20 border border-green-900/50 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500/40 transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-800 to-green-700 border border-yellow-600/50 text-yellow-400 font-black py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              Đăng nhập hệ thống <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center opacity-40 text-[8px] text-white uppercase tracking-widest">
            Phát triển bởi Cục Tuyên huấn - TCCT
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
