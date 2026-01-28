import React, { useState, useRef } from 'react';
import { User, Shield, Image as ImageIcon, Camera, Save, Lock, CheckCircle2 } from 'lucide-react';

const SettingsView: React.FC = () => {
  // Giả định tài khoản đang đăng nhập là admin123
  const [username] = useState("admin123"); 
  const isAdmin = username === "admin123"; // Quyền tối cao cho admin123

  const [displayName, setDisplayName] = useState("NGUYỄN ĐẮC THANH");
  const [bgUrl, setBgUrl] = useState(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);

  const handleSaveAll = () => {
    if (isAdmin) {
      // Admin123 có quyền lưu link nền vào hệ thống
      localStorage.setItem('login_bg', bgUrl);
      // Logic cập nhật mật khẩu 123456 tại đây nếu cần
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      {/* Toast thông báo thành công */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
          <span className="text-[11px] font-black uppercase">Đã lưu mọi thay đổi cho Admin!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bên trái: Hiển thị danh xưng */}
        <div className="lg:col-span-1 bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full border-[6px] border-red-700 overflow-hidden bg-slate-50">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
          </div>
          <h3 className="mt-8 text-2xl font-black text-slate-800 uppercase">{displayName}</h3>
          <div className="mt-3 px-6 py-2 rounded-full text-[10px] font-black bg-red-700 text-white uppercase tracking-widest">
            🛡️ NGƯỜI ĐIỀU HÀNH TỐI CAO
          </div>
        </div>

        {/* Bên phải: Form chỉnh sửa nội dung */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Phần 1: Tên & Mật khẩu */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-800 uppercase italic">Thông tin Admin</h4>
              <input 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Thay đổi tên Admin..."
              />
              <input 
                type="password" 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm" 
                placeholder="Mật khẩu mới (thay cho 123456)" 
              />
            </div>

            {/* Phần 2: Thay đổi nền (Chỉ admin123 mới thấy và dùng được) */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-800 uppercase italic">Giao diện đăng nhập</h4>
              <textarea 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] min-h-[120px]" 
                placeholder="Dán link ảnh nền muốn thay đổi..."
                value={bgUrl}
                onChange={(e) => setBgUrl(e.target.value)}
              />
              <div className="h-20 rounded-xl overflow-hidden border bg-slate-100 relative">
                <img src={bgUrl} className="w-full h-full object-cover opacity-40" alt="Preview" />
                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase">Xem trước nền hệ thống</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSaveAll}
            className="w-full md:w-auto bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl hover:bg-red-800 transition-all uppercase"
          >
            <Save size={18} className="inline mr-2"/> XÁC NHẬN THAY ĐỔI TOÀN HỆ THỐNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
