import React, { useState } from 'react';
import { User, Lock, ChevronRight, AlertCircle } from 'lucide-react';
// Sửa đường dẫn import tùy theo vị trí thực tế của file VpaLogo
import VpaLogo from '../components/VpaLogo'; 

interface LoginProps {
  onLogin: (username: string) => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://vnanet.vn/Data/Articles/2024/05/07/7325607/vna_p_20240507090253_2961805.jpg')`,
          filter: 'brightness(0.2) contrast(1.1)'
        }}
      />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-[#1a2e12]/80 backdrop-blur-xl rounded-[2.5rem] border border-green-800/50 shadow-2xl mx-4">
        <div className="text-center mb-10">
          <VpaLogo size={100} className="mx-auto" animate={true} />
          <h2 className="text-white font-black uppercase tracking-tighter mt-4 text-[clamp(1.2rem,4vw,1.5rem)]">
            Học tập chính trị
          </h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2 tracking-widest">Tên định danh</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                className="w-full bg-black/40 border border-green-900 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="Nhập tên đăng nhập..."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2 tracking-widest">Mật mã</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                type="password"
                className="w-full bg-black/40 border border-green-900 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse">
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
