import React, { useState } from 'react';
import { User, Lock, ChevronRight } from 'lucide-react';
import VpaLogo from './VpaLogo';

const LoginView: React.FC<{ onLogin: (u: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1407] p-4">
      <div className="w-full max-w-md bg-[#1a2e12]/80 backdrop-blur-md p-8 rounded-[2rem] border border-green-900/50 shadow-2xl">
        <div className="text-center mb-8">
          <VpaLogo size={100} />
          <h2 className="text-white font-black uppercase tracking-tighter mt-4 text-[clamp(1.2rem,4vw,1.5rem)]">
            Hệ thống học tập chính trị
          </h2>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(username); }} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2">Tên định danh</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                className="w-full bg-black/40 border border-green-900 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="Nhập tên đăng nhập..."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-yellow-500 uppercase font-bold ml-2">Mật mã</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
              <input 
                type="password"
                className="w-full bg-black/40 border border-green-900 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all text-[clamp(14px,2.5vw,16px)]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-red-700 to-red-800 text-yellow-400 font-black py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            Vào hệ thống <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
