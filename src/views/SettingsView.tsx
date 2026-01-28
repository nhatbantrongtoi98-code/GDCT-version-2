import React, { useState, useRef } from 'react';
import {  
  User, Shield, Image as ImageIcon, Camera,  
  Save, Lock, CheckCircle2, History, Upload, X
} from 'lucide-react';

const SettingsView: React.FC = () => {
  // 1. Khai báo tất cả các State cần thiết
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState<string>(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  
  // Refs cho việc chọn file
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // 2. Các hàm xử lý tải ảnh (Avatar & Background)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { return alert("Ảnh phải dưới 2MB"); }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') setAvatar(reader.result as string);
        else setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Hàm lưu tổng thể - KHÓA TẤT CẢ DỮ LIỆU VÀO BỘ NHỚ
  const handleSaveAll = () => {
    localStorage.setItem('user_display_name', displayName);
    localStorage.setItem('user_avatar', avatar);
    localStorage.setItem('login_bg', bgImage);

    setShowToast(true);
    // Phát tín hiệu để các trang khác (Sidebar) cập nhật theo ngay lập tức
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-[#111827] text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật hệ thống thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT 1: HỒ SƠ TÓM TẮT */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div 
              className="relative group mb-6 cursor-pointer" 
              onClick={() => avatarInputRef.current?.click()}
            >
              <div className="w-32 h-32 rounded-full border-4 border-red-50 overflow-hidden shadow-xl bg-slate-100">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 p-2 bg-red-700 text-white rounded-full border-2 border-white group-hover:scale-110 transition-all shadow-lg">
                <Camera size={14} />
              </div>
              <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
            </div>

            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{displayName}</h3>
            <div className="mt-3 px-6 py-1.5 rounded-full text-[9px] font-black bg-red-700 text-white uppercase tracking-widest">Sĩ quan quản lý</div>
          </div>

          <div className="bg-[#111827] p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl">
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 italic"><History size={14}/> Nhật ký hệ thống</h4>
            <div className="border-l border-red-900 pl-4 py-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase">28/01/2026</p>
              <p className="text-[10px] text-slate-200 italic leading-relaxed">Đã sẵn sàng cập nhật dữ liệu</p>
            </div>
          </div>
        </div>

        {/* CỘT 2 & 3: CÀI ĐẶT CHI TIẾT */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* PHẦN 1: THÔNG TIN & MẬT KHẨU */}
            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic"><User size={18} className="text-red-700"/> Hồ sơ cá nhân</h4>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-4 italic">Tên hiển thị mới</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all shadow-inner" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="Nhập tên của bạn..."
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic"><Lock size={18} className="text-red-700"/> An ninh tài khoản</h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại (123456)" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-200" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-200" />
                </div>
              </section>
            </div>

            {/* PHẦN 2: GIAO DIỆN HỆ THỐNG */}
            <div className="flex flex-col space-y-6">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic"><ImageIcon size={18} className="text-red-700"/> Ảnh nền đăng nhập</h4>
              <div 
                onClick={() => bgInputRef.current?.click()}
                className="flex-1 min-h-[200px] rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-red-300 transition-all relative overflow-hidden group shadow-inner"
              >
                {bgImage ? (
                  <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="BG Preview" />
                ) : (
                  <Upload size={32} className="text-slate-200" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 px-6 py-2 rounded-2xl text-[9px] font-black uppercase shadow-sm border border-slate-100 group-hover:bg-red-700 group-hover:text-white transition-all">Tải ảnh nền mới</span>
                </div>
              </div>
              <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'bg')} />
              <p className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-widest italic leading-relaxed">Khuyến nghị: Tỷ lệ 16:9, dung lượng dưới 2MB để hệ thống vận hành mượt mà</p>
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
