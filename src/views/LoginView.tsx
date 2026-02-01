import React, { useState } from 'react';
import { User, Lock, ChevronRight, QrCode, Smartphone } from 'lucide-react';

const LoginView = ({ onLogin }: { onLogin: (u: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin123' && password === '123456') {
      onLogin(username);
    } else {
      alert("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2E14] flex items-center justify-center p-6 relative overflow-hidden font-['Be_Vietnam_Pro']">
      {/* Hiệu ứng nền hào quang vàng đỏ */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#DA251D]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FFFF00]/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-[4rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-white/20 animate-fadeInUp">
        
        {/* PHẦN TRÁI: MÀU ĐỎ & QR (GIỮ NGUYÊN BỐ CỤC ẢNH) */}
        <div className="md:w-[45%] bg-gradient-to-br from-[#922323] via-[#DA251D] to-[#922323] p-12 flex flex-col items-center justify-center text-center relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', size: '20px 20px' }} />
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#FFFF00]/30 rounded-[2.5rem] blur-xl group-hover:bg-[#FFFF00]/50 transition-all duration-500" />
            <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border-4 border-[#FFFF00]">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=VPA-LOGIN" className="w-48 h-48 md:w-56 md:h-56" alt="QR" />
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                 <QrCode size={40} className="text-[#DA251D] animate-bounce" />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-center gap-3 text-[#FFFF00]">
              <Smartphone size={20} className="animate-pulse" />
              <p className="font-black uppercase tracking-[0.2em] text-sm">Quét mã để truy cập</p>
            </div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-[200px]">
              Tương thích tốt trên thiết bị di động hệ điều hành iOS và Android
            </p>
          </div>
        </div>

        {/* PHẦN PHẢI: FORM ĐĂNG NHẬP (MÀU TRẮNG - CHỮ ĐỎ VÀNG) */}
        <div className="md:w-[55%] p-12 md:p-20 flex flex-col justify-center bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-[#1A2E14] uppercase italic tracking-tighter leading-none">
              Đăng nhập
            </h2>
            <div className="h-1.5 w-24 bg-[#DA251D] mt-4 rounded-full" />
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Tên định danh</label>
              <div className="relative group">
                <User className="absolute left-5 top-5 text-slate-300 group-focus-within:text-[#DA251D] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Nhập tài khoản của đồng chí..." 
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-[#DA251D] focus:bg-white transition-all font-bold text-slate-700"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mật mã</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-5 text-slate-300 group-focus-within:text-[#DA251D] transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-[#DA251D] focus:bg-white transition-all font-bold text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#DA251D] hover:bg-[#922323] text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(218,37,29,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 group mt-4"
            >
              Vào hệ thống
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-8 flex flex-col items-center gap-4">
              <button type="button" className="text-[11px] font-black text-slate-400 uppercase tracking-tighter hover:text-[#DA251D] transition-colors">
                Chưa có tài khoản? <span className="text-[#DA251D] underline">Đăng ký</span>
              </button>
              
              <div className="flex items-center gap-2 opacity-20">
                <div className="h-px w-8 bg-slate-900" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFFF00] border border-slate-900" />
                <div className="h-px w-8 bg-slate-900" />
              </div>
              
              <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">
                LỰC LƯỢNG VŨ TRANG THỦ ĐÔ - VƯƠN MÌNH TRONG KỶ NGUYÊN MỚI
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default LoginView;
