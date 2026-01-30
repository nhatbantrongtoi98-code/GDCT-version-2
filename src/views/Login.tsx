import React, { useState } from 'react';

const Login = ({ onLogin }: any) => {
  const [form, setForm] = useState({ user: '', pass: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic kiểm tra admin123 hoặc user thường
    onLogin({ 
      username: form.user, 
      role: form.user === 'admin123' ? 'Quản trị viên' : 'Học viên' 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#064e3b] p-4 bg-gradient-to-br from-[#064e3b] to-[#022c22]">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md border-t-8 border-red-600 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          {/* Logo VPA Hoạt hình */}
          <div className="w-24 h-24 mb-4 animate-float">
             <img src="/vpa-logo.png" alt="VPA" className="w-full h-full drop-shadow-lg" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Hệ thống học tập</h2>
          <p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-1 italic">Quân đội nhân dân Việt Nam</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tài khoản quân số</label>
            <input 
              type="text" 
              required
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all font-bold text-slate-700"
              onChange={e => setForm({...form, user: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mật khẩu bảo mật</label>
            <input 
              type="password" 
              required
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all font-bold tracking-widest text-slate-700"
              onChange={e => setForm({...form, pass: e.target.value})}
            />
          </div>
          <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-900/20 active:scale-95 transition-all mt-4">
            Vào hệ thống
          </button>
        </form>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;
