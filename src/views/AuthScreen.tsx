import React, { useState } from 'react';
import { LogIn, Key, User, Shield, AlertTriangle } from 'lucide-react';
import { AppData, UserAccount } from '../types';

interface AuthScreenProps {
  data: AppData;
  onLogin: (user: UserAccount) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ data, onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUsers: UserAccount[] = JSON.parse(localStorage.getItem('military_users_v7') || '[]');
    
    // Kiểm tra tài khoản admin mặc định hoặc tài khoản người dùng đã đăng ký
    const user = (form.username === 'admin123' && form.password === 'bannichinh_2024') 
      ? { username: 'Quản trị viên', role: 'admin' as const }
      : storedUsers.find(u => u.username === form.username && u.password === form.password);

    if (user) {
      onLogin(user);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans"
         style={{ backgroundImage: `url(${data.globalBackground})`, backgroundSize: 'cover' }}>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50 animate-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-8 ring-red-50">
            <span className="text-4xl">{data.appLogo || '🎖️'}</span>
          </div>
          <h1 className="text-2xl font-black text-red-800 uppercase italic tracking-tight">{data.appName}</h1>
          <p className="text-slate-500 text-xs font-bold uppercase mt-2 tracking-[0.2em]">Hệ thống quản lý học tập quân sự</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 outline-none transition-all font-bold"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="relative group">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
            <input
              type="password"
              placeholder="Mật mã"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 outline-none transition-all font-bold"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95">
            <LogIn size={20} /> Vào hệ thống
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
