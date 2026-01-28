import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Shield, Image as ImageIcon, Camera, 
  Save, Lock, CheckCircle2, History, Upload 
} from 'lucide-react';

const SettingsView: React.FC = () => {
  // 1. Quản lý thông tin người dùng (Lấy từ bộ nhớ nếu có)
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  
  const isAdmin = true; // Xác định quyền Sĩ quan quản lý
  const bgInputRef = useRef<HTMLInputElement>(null);

  // 2. Hàm xử lý tải ảnh nền từ máy tính
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Hàm lưu tổng thể (Khắc phục triệt để lỗi đồng bộ tên)
  const handleSaveAll = () => {
    // Lưu tên hiển thị mới để Sidebar tự động cập nhật
    localStorage.setItem('user_display_name', displayName);
    
    // Lưu ảnh nền trang đăng nhập
    localStorage.setItem('login_bg', bgImage);

    // Kích hoạt thông báo thành công
    setShowToast(true);
    
    // Phát sự kiện để Sidebar nhận biết tên đã thay đổi ngay lập tức
    window.dispatchEvent(new Event('storage'));

    // Tự động tắt thông báo sau 3 giây
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-[#111827] text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT 1: HỒ SƠ TÓM TẮT */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-red-50 overflow-hidden shadow-xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 p-2 bg-red-700 text-white rounded-full border-2 border-white">
                <Camera size={14} />
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">
              {displayName}
            </h3>
            <div className="mt-3 px-6 py-1.5 rounded-full text-[9px] font-black bg-red-700 text-white uppercase tracking-widest">
              Người điều hành tối cao
            </div>
          </div>

          {/* NHẬT KÝ HỆ THỐNG */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl">
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 italic">
              <History size={14}/> Nhật ký hệ thống
            </h4>
            <div className="border-l border-red-900 pl-4 py-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase">11:40:31 28/1/2026</p>
              <p className="text-[10px] text-slate-200 italic leading-relaxed">Admin xác nhận cập nhật toàn bộ nội dung hệ thống</p>
            </div>
          </div>
        </div>

        {/* CỘT 2 & 3: KHÔNG GIAN ĐIỀU CHỈNH */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* PHẦN 1: THÔNG TIN & MẬT KHẨU */}
            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                  <User size={18} className="text-red-700"/> Thông tin cá nhân
                </h4>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-4 italic">Tên hiển thị mới</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                  <Lock size={18} className="text-red-700"/> Đổi mật khẩu
                </h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại (123456)" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-200" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-200" />
                </div>
              </section>
            </div>

            {/* PHẦN 2: GIAO DIỆN ĐĂNG NHẬP */}
            <div className="flex flex-col space-y-6">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                <ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống
              </h4>
              
              <div 
                onClick={() => bgInputRef.current?.click()}
                className="flex-1 min-h-[220px] rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-red-300 transition-all relative group overflow-hidden shadow-inner"
              >
                {bgImage ? (
                  <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="Preview" />
                ) : (
                  <Upload size={32} className="text-slate-200" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/95 px-6 py-2 rounded-2xl text-[9px] font-black uppercase shadow-sm border border-slate-100">
                    Tải ảnh nền từ máy tính
                  </span>
                </div>
              </div>
              <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
              <p className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-[0.1em] italic">Khuyến nghị: Ảnh JPG/PNG dưới 2MB</p>
            </div>
          </div>

          {/* NÚT LƯU TỔNG THỂ */}
          <div className="pt-10 flex justify-end">
            <button 
              onClick={handleSaveAll} 
              className="flex items-center gap-3 bg-[#CC2020] text-white px-12 py-5 rounded-[2.2rem] font-black text-[11px] shadow-[0_20px_40px_rgba(204,32,32,0.25)] hover:bg-red-800 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              <Save size={18}/> Cập nhật tất cả thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
