import React, { useState } from 'react';
import { UserAccount } from '../types';

interface LoginProps {
  onLogin: (user: UserAccount) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phân quyền chuẩn: Chỉ đúng tài khoản admin123 mới có role admin
    const role = username === 'admin123' ? 'admin' : 'user';
    onLogin({ 
      username, 
      role, 
      avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=c41e16&color=fff` 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#064e3b] p-4 bg-gradient-to-br from-[#064e3b] to-[#022c22]">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-[10px] border-red-600 animate-fade-in relative overflow-hidden">
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          {/* Logo VPA Hoạt hình bay nhẹ nhàng */}
          <div className="w-24 h-24 mb-4 animate-float">
             <img 
               src="https://upload.wikimedia.org/wikipedia/vi/1/1a/Logo_Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.svg" 
               alt="VPA Logo" 
               className="w-full h-full drop-shadow-2xl" 
             />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Hệ thống giáo dục</h2>
          <p className="text-red-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Quân đội nhân dân Việt Nam</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Tài khoản quân số</label>
            <input 
              type="text" required value={username}
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all font-bold text-slate-700"
              placeholder="admin123 hoặc tên của bạn..."
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Mật khẩu bảo mật</label>
            <input 
              type="password" required value={password}
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all font-bold text-slate-700 tracking-widest"
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-900/30 active:scale-95 transition-all mt-4 border-b-4 border-red-800">
            Đăng nhập ngay
          </button>
        </form>

        {/* Trang trí họa tiết quân đội chìm */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full opacity-50 z-0"></div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-12px) rotate(2deg); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default Login;
