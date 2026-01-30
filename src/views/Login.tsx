import React from 'react';
import { User, Lock, ChevronRight } from 'lucide-react';

const LoginView = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image: Giữ hình ảnh chiến sĩ hoặc đơn vị */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80')`,
          filter: 'brightness(0.3) saturate(1.2)'
        }}
      />

      {/* Lớp phủ màu đỏ đậm (Vignette) giúp trung tâm nổi bật hơn */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-red-950/40 z-[1]" />

      {/* Card Đăng nhập chính */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="relative bg-stone-950/60 backdrop-blur-2xl rounded-[2.5rem] border border-red-600/30 shadow-[0_0_50px_rgba(220,38,38,0.15)] p-8 overflow-hidden">
          
          {/* Hiệu ứng viền phát sáng đa sắc (Đỏ - Vàng) */}
          <div className="absolute inset-0 border-[2px] border-transparent rounded-[2.5rem] pointer-events-none after:absolute after:inset-0 after:rounded-[2.5rem] after:border-t-red-600/50 after:border-l-red-600/50 after:border-r-yellow-500/30 after:border-b-yellow-500/30" />

          {/* Header: Logo & Title */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4 relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg" 
                alt="Logo" 
                className="w-24 h-24 mx-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] animate-pulse"
              />
            </div>
            <h1 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent text-2xl font-black uppercase tracking-widest mb-1">
              LỰC LƯỢNG VŨ TRANG THỦ ĐÔ 
            </h1>
            <p className="text-red-500 text-[10px] uppercase tracking-[0.3em] font-black opacity-90">
              VƯƠN MÌNH TRONG KỶ NGUYÊN MỚI
            </p>
          </div>

          {/* Form nhập liệu */}
          <form className="space-y-6">
            <div className="space-y-5">
              {/* Tên đăng nhập */}
              <div className="group/input">
                <label className="text-[10px] text-yellow-500 uppercase tracking-widest ml-1 mb-2 block font-bold">
                  Tài khoản
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 group-focus-within/input:text-yellow-400 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Tên đăng nhập"
                    className="w-full bg-red-950/20 border border-red-900/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-stone-500 outline-none focus:border-yellow-500/50 focus:bg-red-900/20 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div className="group/input">
                <label className="text-[10px] text-yellow-500 uppercase tracking-widest ml-1 mb-2 block font-bold">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 group-focus-within/input:text-yellow-400 transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-red-950/20 border border-red-900/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-stone-500 outline-none focus:border-yellow-500/50 focus:bg-red-900/20 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Nút Đăng nhập: Đỏ rực rỡ với chữ vàng */}
            <button className="w-full relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 border-t border-red-400 text-yellow-300 font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(153,27,27,0.4)] active:scale-95 transition-all group/btn">
              <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm drop-shadow-md">
                Đăng nhập <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
              {/* Hiệu ứng tia sáng quét ngang khi hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-12 text-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto mb-4" />
            <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] leading-loose">
              Hệ thống quản lý học tập<br/>
              <span className="text-yellow-600 font-bold">Cục Tuyên huấn - TCCT</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
