
import React, { useState } from 'react';
import VpaLogo from "../components/VpaLogo";
import { User as UserIcon, Lock, AlertCircle, ChevronRight } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-['Be_Vietnam_Pro']">
      {/* Hiệu ứng nền chuyên nghiệp */}
      <div className="absolute inset-0 bg-[#1A2E14] z-[-2]" />
      <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] bg-[#DA251D]/10 rounded-full blur-[120px] z-[-1]" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[600px] h-[600px] bg-[#FFFF00]/5 rounded-full blur-[120px] z-[-1]" />

      <div className="w-full max-w-[400px] glass-effect rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col animate-fadeInUp">
        {/* Thanh màu quân kỳ trang trí */}
        <div className="h-1.5 bg-gradient-to-r from-[#DA251D] via-[#FFFF00] to-[#DA251D]" />
        
        <div className="p-8 md:p-10 flex-1">
          <div className="flex flex-col items-center mb-8">
            <div className="animate-subtle-logo">
              <VpaLogo size={110} className="drop-shadow-2xl" />
            </div>
            <div className="text-center mt-6 space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-[#1A2E14] tracking-tight uppercase">Đăng nhập</h2>
              <p className="text-[#2E4D23] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80">Quân đội nhân dân Việt Nam</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Tài khoản
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#DA251D] transition-colors duration-300">
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-stone-100/50 border border-stone-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#DA251D]/5 focus:border-[#DA251D] focus:bg-white transition-all duration-300 text-sm md:text-base text-stone-800 placeholder:text-stone-300"
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#DA251D] transition-colors duration-300">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-stone-100/50 border border-stone-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#DA251D]/5 focus:border-[#DA251D] focus:bg-white transition-all duration-300 text-sm md:text-base text-stone-800 placeholder:text-stone-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3.5 rounded-2xl border border-red-100 animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span className="text-[11px] md:text-xs font-semibold leading-tight">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 md:py-4.5 rounded-2xl font-bold text-white shadow-xl transform transition-all active:scale-95 flex items-center justify-center space-x-2 ${
                isLoading 
                ? 'bg-stone-400 cursor-not-allowed' 
                : 'bg-[#2E4D23] hover:bg-[#1A2E14] shadow-[#2E4D23]/30'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm tracking-widest uppercase">Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span className="text-sm md:text-base tracking-widest uppercase">Đăng nhập</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center space-y-4">
             <div className="w-16 h-1 bg-stone-100 rounded-full" />
             <div className="text-center text-stone-400 text-[9px] md:text-[11px] leading-relaxed uppercase tracking-widest font-semibold opacity-70">
              Phát triển bởi <br />
              <span className="text-[#2E4D23] font-black">Cục Tuyên huấn - TCCT</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-shake { animation: shake 0.2s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
