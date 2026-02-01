import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';

const AuthScreen = ({ onLogin }: { onLogin: (user: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    if (username === 'admin123' && password === '123456') {
      onLogin(username);
    } else if (username !== '' && password !== '') {
      onLogin(username); // Cho phép các user khác vào xem (role user)
    } else {
      alert("Đồng chí vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
        <div className="bg-red-700 p-10 text-center relative">
          <img src="/vpa-logo.png" className="w-20 h-20 mx-auto mb-4 drop-shadow-xl" alt="VPA" />
          <h2 className="text-yellow-400 font-black text-2xl uppercase tracking-tighter">Sổ Tay Điện Tử</h2>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Giáo dục chính trị quân đội</p>
        </div>
        
        <div className="p-10 space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Tên đăng nhập" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-red-700 font-bold text-slate-700"
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" placeholder="Mật khẩu" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-red-700 font-bold text-slate-700"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            onClick={handleLoginSubmit}
            className="w-full bg-red-700 hover:bg-red-800 text-yellow-400 py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
          >
            Đăng nhập hệ thống
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
