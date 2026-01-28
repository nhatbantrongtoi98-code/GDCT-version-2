import React, { useState, useEffect } from 'react';
import { QrCode, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  // Trạng thái lưu trữ ảnh nền
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // ⚡ BƯỚC QUAN TRỌNG: Truy xuất ảnh nền từ bộ nhớ hệ thống
    const savedBg = localStorage.getItem('login_bg');
    if (savedBg) {
      setBgImage(savedBg);
    }
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center transition-all duration-1000"
      style={{ 
        // Nếu admin123 đã tải ảnh, sử dụng ảnh đó. Nếu chưa, dùng màu nền mặc định
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundColor: bgImage ? 'transparent' : '#f1f5f9' 
      }}
    >
      {/* Khung đăng nhập trung tâm */}
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full animate-in zoom-in-95 duration-500">
        
        {/* Khối QR bên trái */}
        <div className="md:w-1/2 bg-[#8B1C1C] p-12 flex flex-col items-center justify-center text-center text-white space-y-8">
          <div className="bg-white p-4 rounded-3xl shadow-inner">
            <QrCode size={160} className="text-[#8B1C1C]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
            QUÉT MÃ ĐỂ TRUY CẬP<br/>TRÊN THIẾT BỊ DI ĐỘNG
          </p>
        </div>

        {/* Khối Form bên phải */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-8">
          <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">ĐĂNG NHẬP</h2>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <input 
                type="text" 
                placeholder="Tên định danh" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
              />
            </div>
            <div className="space-y-1">
              <input 
                type="password" 
                placeholder="Mật mã" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
              />
            </div>
          </div>

          <button className="w-full bg-[#CC2020] text-white py-5 rounded-xl font-black text-[12px] uppercase shadow-lg hover:bg-red-800 transition-all flex items-center justify-center gap-2">
            VÀO HỆ THỐNG <LogIn size={16} />
          </button>

          <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hover:text-red-700">
            CHƯA CÓ TÀI KHOẢN? ĐĂNG KÝ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
