import React, { useState, useEffect } from 'react';
import { QrCode, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // ⚡ Tự động truy xuất ảnh nền từ máy tính mà Admin đã tải lên
    const savedBg = localStorage.getItem('login_bg');
    if (savedBg) {
      setBgImage(savedBg);
    }
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ 
        // Hình nền mới được cập nhật sẽ nằm ở đây
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundColor: bgImage ? 'transparent' : '#f1f5f9' 
      }}
    >
      {/* Lớp phủ làm mờ nhẹ ảnh nền để form nổi bật hơn */}
      {bgImage && <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0" />}

      <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full relative z-10 animate-in zoom-in-95 duration-700">
        
        {/* KHỐI TRÁI: GIỮ NGUYÊN MÃ QR & CẬP NHẬT KHẨU HIỆU */}
        <div className="md:w-1/2 bg-[#8B1C1C] p-12 flex flex-col items-center justify-center text-center text-white space-y-10">
          <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl">
            {/* Giữ nguyên mã QR ứng dụng */}
            <QrCode size={180} className="text-[#8B1C1C]" />
          </div>
          
          {/* CẬP NHẬT KHẨU HIỆU MỚI THEO YÊU CẦU */}
          <p className="text-[12px] font-black uppercase tracking-[0.1em] leading-relaxed max-w-[280px]">
            LỰC LƯỢNG VŨ TRANG THỦ ĐÔ HÀ NỘI<br/>
            VƯƠN MÌNH TRONG KỶ NGUYÊN MỚI
          </p>
        </div>

        {/* KHỐI PHẢI: FORM ĐĂNG NHẬP */}
        <div className="md:w-1/2 p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-800 mb-10 tracking-tighter uppercase italic">ĐĂNG NHẬP</h2>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Tên định danh" 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Mật mã" 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all" 
              />
            </div>
            
            <button 
              type="button"
              className="w-full bg-[#CC2020] text-white py-5 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest shadow-[0_15px_30px_rgba(204,32,32,0.3)] hover:bg-red-800 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              VÀO HỆ THỐNG <LogIn size={18} />
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hover:text-red-700 transition-colors">
            CHƯA CÓ TÀI KHOẢN? ĐĂNG KÝ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
