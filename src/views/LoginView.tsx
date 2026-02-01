
import React, { useState } from 'react';
import VpaLogo from '../components/VpaLogo';
import { User as UserIcon, Lock, AlertCircle, ChevronRight, QrCode, Laptop, Smartphone, CheckSquare, Square } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

type LoginMethod = 'password' | 'qrcode';

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<LoginMethod>('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập xử lý đăng nhập
    setTimeout(() => {
      if (username.trim()) {
        onLogin(username);
      } else {
        setError('Vui lòng nhập tên đăng nhập');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-['Be_Vietnam_Pro'] selection:bg-[#DA251D] selection:text-white">
      {/* Nền gradient chiều sâu quân đội */}
      <div className="absolute inset-0 bg-[#1A2E14] z-[-2]" />
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#DA251D]/15 rounded-full blur-[150px] z-[-1] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#FFFF00]/10 rounded-full blur-[150px] z-[-1]" />

      <div className="w-full max-w-[480px] glass-effect rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col animate-fadeInUp border border-white/10">
        {/* Military Ribbon Top */}
        <div className="h-2 bg-gradient-to-r from-[#DA251D] via-[#FFFF00] to-[#DA251D]" />
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="animate-subtle-logo p-2 bg-white/5 rounded-full backdrop-blur-sm shadow-inner mb-6">
              <VpaLogo size={100} className="drop-shadow-[0_0_15px_rgba(218,37,29,0.5)]" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-[#1A2E14] tracking-tight uppercase leading-tight">Hệ Thống Quản Lý</h2>
              <p className="text-[#2E4D23] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-90">Học tập Chính trị QĐNDVN</p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-stone-100/80 p-1.5 rounded-2xl mb-8 border border-stone-200 shadow-inner">
            <button 
              onClick={() => setMethod('password')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                method === 'password' ? 'bg-white text-[#DA251D] shadow-md' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Laptop size={14} />
              <span>Tài khoản</span>
            </button>
            <button 
              onClick={() => setMethod('qrcode')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                method === 'qrcode' ? 'bg-white text-[#DA251D] shadow-md' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <QrCode size={14} />
              <span>Mã QR</span>
            </button>
          </div>

          {method === 'password' ? (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest ml-2">Tài khoản đơn vị</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#DA251D] transition-colors">
                    <UserIcon size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#DA251D]/5 focus:border-[#DA251D] transition-all text-sm md:text-base text-stone-800 placeholder:text-stone-300 shadow-sm"
                    placeholder="Nhập tên đăng nhập..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest ml-2">Mật khẩu bảo mật</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#DA251D] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-stone-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#DA251D]/5 focus:border-[#DA251D] transition-all text-sm md:text-base text-stone-800 placeholder:text-stone-300 shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember Password & Forgot Link */}
              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-2 cursor-pointer group select-none">
                  <div className="text-[#2E4D23]" onClick={() => setRememberMe(!rememberMe)}>
                    {rememberMe ? <CheckSquare size={18} fill="currentColor" className="text-[#DA251D] fill-[#DA251D]/10" /> : <Square size={18} className="text-stone-300 group-hover:text-stone-400" />}
                  </div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-tighter">Lưu mật khẩu</span>
                </label>
                <button type="button" className="text-[11px] font-bold text-[#2E4D23] hover:text-[#DA251D] uppercase tracking-tighter underline underline-offset-4">Quên mật khẩu?</button>
              </div>

              {error && (
                <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
                  <AlertCircle size={18} className="shrink-0" />
                  <span className="text-[10px] font-bold leading-tight uppercase tracking-tight">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4.5 rounded-2xl font-black text-white shadow-2xl transform transition-all active:scale-95 flex items-center justify-center space-x-3 group ${
                  isLoading 
                  ? 'bg-stone-400 cursor-not-allowed' 
                  : 'bg-[#2E4D23] hover:bg-[#1A2E14] shadow-[#2E4D23]/40'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase">Đăng nhập</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <button 
                  type="button"
                  className="text-[11px] font-black text-[#DA251D] uppercase tracking-widest hover:text-[#B21E18] transition-colors"
                  onClick={() => alert("Chuyển đến trang đăng ký tài khoản cán bộ/chiến sĩ.")}
                >
                  Chưa có tài khoản? Đăng ký ngay
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-6 animate-fadeIn">
              <div className="relative p-6 bg-white rounded-[2rem] shadow-xl border-2 border-[#FFFF00]/50 group cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={() => onLogin('Chiến sĩ')}>
                <div className="absolute inset-0 bg-[#DA251D]/5 rounded-[2rem] animate-pulse" />
                <div className="relative bg-white p-3 rounded-xl border border-stone-100">
                  <div className="w-48 h-48 md:w-56 md:h-56 grid grid-cols-4 grid-rows-4 gap-2 opacity-80">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-[#1A2E14]' : 'bg-transparent'}`} />
                    ))}
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#1A2E14] rounded-sm m-2" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-4 border-[#1A2E14] rounded-sm m-2" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-4 border-[#1A2E14] rounded-sm m-2" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="bg-white p-1 rounded-lg shadow-md border border-stone-200">
                     <VpaLogo size={32} />
                   </div>
                </div>
              </div>
              
              <div className="text-center space-y-3 px-4">
                <p className="text-xs font-bold text-stone-700">Dùng ứng dụng di động để quét mã</p>
                <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-400 font-black uppercase tracking-widest">
                  <Smartphone size={12} />
                  <span>Chạm mã QR để giả lập quét thành công</span>
                </div>
              </div>
              
              <button 
                onClick={() => onLogin('Chiến sĩ')}
                className="text-[#DA251D] text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Gặp sự cố khi quét?
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col items-center space-y-6">
             <div className="flex items-center space-x-3 w-full opacity-30">
               <div className="h-px bg-stone-400 flex-1" />
               <div className="w-2 h-2 rounded-full bg-[#FFFF00]" />
               <div className="h-px bg-stone-400 flex-1" />
             </div>
             <div className="text-center space-y-1">
              <p className="text-[#2E4D23] font-black text-[9px] md:text-[10px] uppercase tracking-widest leading-none">Bản quyền © {new Date().getFullYear()}</p>
              <p className="text-stone-400 text-[8px] font-bold uppercase tracking-tighter opacity-60">Tổng cục Chính trị Quân đội nhân dân Việt Nam</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoginView;
