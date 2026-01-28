import React, { useState, useEffect } from 'react';
import { QrCode, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  // Trạng thái lưu trữ ảnh nền lấy từ bộ nhớ
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // ⚡ BƯỚC QUAN TRỌNG: Truy xuất ảnh nền mà Admin đã tải lên từ máy tính
    const savedBg = localStorage.getItem('login_bg');
    if (savedBg) {
      setBgImage(savedBg);
    }
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center transition-all duration-700"
      style={{ 
        // Nếu đã tải ảnh lên thì dùng ảnh đó, nếu chưa thì dùng ảnh mặc định (hoặc màu nền)
        backgroundImage: bgImage ? `url(${bgImage})` : `url('https://your-default-image-url.jpg')`,
        backgroundColor: '#f1f5f9' 
      }}
    >
      {/* Lớp phủ mờ để các ô nhập liệu dễ nhìn hơn nếu ảnh nền quá sáng */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0"></div>

      {/* Khung đăng nhập trung tâm */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full relative z-10 animate-in zoom-in-95 duration-500">
        
        {/* Khối bên trái: Mã QR & Khẩu hiệu mới */}
        <div className="md:w-1/2 bg-[#8B1C1C] p-12 flex flex-col items-center justify-center text-center text-white space-y-8">
          <div className="bg-white p-4 rounded-3xl shadow-lg">
            <QrCode size={160} className="text-[#8B1C1C]" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed px-4">
            LỰC LƯỢNG VŨ TRANG THỦ ĐÔ HÀ NỘI<br/>
            VƯƠN MÌNH TRONG KỶ NGUYÊN MỚI
          </p>
        </div>

        {/* Khối bên phải: Form nhập liệu */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-8">
          <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">ĐĂNG NHẬP</h2>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Tài khoản đăng nhập" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
            />
            <input 
              type="Password" 
              placeholder="Mật mã" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
            />
          </div>

          <button className="w-full bg-[#CC2020] text-white py-4 rounded-xl font-black text-[12px] uppercase shadow-lg hover:bg-red-800 transition-all flex items-center justify-center gap-2">
            VÀO HỆ THỐNG <LogIn size={16} />
          </button>

          <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
            CHƯA CÓ TÀI KHOẢN? ĐĂNG KÝ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
