import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState<string>("");
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    // Lấy ảnh nền Admin đã tải lên từ máy tính
    const savedBg = localStorage.getItem('login_bg');
    if (savedBg) setBgImage(savedBg);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra tài khoản admin123 mật khẩu 123456
    if (credentials.username === 'admin123' && credentials.password === '123456') {
      localStorage.setItem('user_role', 'admin');
      localStorage.setItem('current_user', 'admin123');
      navigate('/dashboard'); // Hoặc trang chủ của đồng chí
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ 
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundColor: bgImage ? 'transparent' : '#f1f5f9' 
      }}
    >
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full animate-in zoom-in-95 duration-500">
        
        {/* KHỐI TRÁI: QR CODE */}
        <div className="md:w-1/2 bg-[#8B1C1C] p-12 flex flex-col items-center justify-center text-center text-white space-y-8">
          <div className="bg-white p-4 rounded-3xl shadow-inner">
            <QrCode size={180} className="text-[#8B1C1C]" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed">
            QUÉT MÃ ĐỂ TRUY CẬP<br/>TRÊN THIẾT BỊ DI ĐỘNG
          </p>
        </div>

        {/* KHỐI PHẢI: FORM ĐĂNG NHẬP */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-800 mb-8 tracking-tighter uppercase">ĐĂNG NHẬP</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Tên định danh" 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100"
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Mật mã" 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100"
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#CC2020] text-white py-5 rounded-2xl font-black text-[13px] uppercase tracking-widest shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3"
            >
              VÀO HỆ THỐNG <LogIn size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hover:text-red-700">
            CHƯA CÓ TÀI KHOẢN? ĐĂNG KÝ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
