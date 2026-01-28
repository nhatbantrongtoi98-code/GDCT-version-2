import React, { useState, useRef } from 'react';
import { User, Shield, Image as ImageIcon, Camera, Save, Lock, CheckCircle2, History, Upload } from 'lucide-react';

const SettingsView: React.FC = () => {
  const isAdmin = true; // Xác thực tài khoản admin123
  const [displayName, setDisplayName] = useState("NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false); // Trạng thái điều khiển thông báo
  const bgInputRef = useRef<HTMLInputElement>(null);

  // 1. Hàm lưu và hiển thị thông báo (Quan trọng nhất)
  const handleSaveAll = (e: React.MouseEvent) => {
    e.preventDefault(); // Chống tải lại trang
    
    // Lưu ảnh nền vào bộ nhớ trình duyệt
    if (bgImage) {
      localStorage.setItem('login_bg', bgImage);
    }
    
    // Bật thông báo thành công ngay lập tức
    setShowToast(true);
    
    // Tự động tắt thông báo sau 3 giây
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    console.log("Đã lưu thành công nền mới!"); 
  };

  // 2. Hàm xử lý khi chọn file từ máy tính
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string); // Hiển thị xem trước ngay tại khung
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8 relative">
      
      {/* KHỐI THÔNG BÁO THÀNH CÔNG (PHẢI HIỆN KHI SHOWTOAST = TRUE) */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[999] flex items-center gap-3 bg-[#111827] text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      {/* CỘT TRÁI: HỒ SƠ & NHẬT KÝ */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-red-50 overflow-hidden mb-6 shadow-xl">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter">{displayName}</h3>
          <div className="bg-red-700 text-white px-6 py-1 rounded-full text-[9px] font-black mt-2 tracking-widest uppercase">
            Người điều hành tối cao
          </div>
        </div>
        
        <div className="bg-[#111827] p-8 rounded-[2.5rem] text-white space-y-4">
          <h4 className="text-red-500 text-[10px] font-black uppercase italic flex items-center gap-2"><History size={14}/> Nhật ký hệ thống</h4>
          <div className="text-[10px] text-slate-400 border-l border-red-900 pl-4 py-1">
             <p className="font-bold">11:40:31 28/1/2026</p>
             <p className="text-slate-200 italic">Đã thay đổi ảnh nền trang đăng nhập</p>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: KHÔNG GIAN CÀI ĐẶT */}
      <div className="flex-1 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2 text-slate-800">
              <User size={18} className="text-red-700"/> Thông tin cá nhân
            </h4>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-4">Tên hiển thị mới</label>
              <input 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </div>
            
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2 text-slate-800">
              <Lock size={18} className="text-red-700"/> Đổi mật khẩu
            </h4>
            <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none" placeholder="Mật khẩu hiện tại (123456)" />
            <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none" placeholder="Mật khẩu mới" />
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2 text-slate-800">
              <ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống
            </h4>
            <div 
              onClick={() => bgInputRef.current?.click()} 
              className="h-56 rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50 overflow-hidden cursor-pointer relative group transition-all hover:border-red-200"
            >
              {bgImage ? (
                <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <Upload className="text-slate-300" size={32} />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/95 px-6 py-2 rounded-2xl text-[9px] font-black uppercase shadow-lg border border-slate-100">Tải ảnh nền từ máy tính</span>
              </div>
            </div>
            <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
            <p className="text-[8px] text-center font-bold text-slate-400 uppercase tracking-widest italic">Khuyến nghị: Ảnh JPG/PNG dưới 2MB</p>
          </div>
        </div>

        {/* NÚT BẤM KÍCH HOẠT LƯU & THÔNG BÁO */}
        <div className="mt-12 flex justify-end">
          <button 
            type="button"
            onClick={handleSaveAll} 
            className="bg-[#CC2020] text-white px-16 py-5 rounded-[2.2rem] font-black text-[11px] shadow-[0_20px_50px_rgba(204,32,32,0.3)] uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-red-800 transition-all hover:scale-105 active:scale-95"
          >
            <Save size={20}/> Cập nhật tất cả thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
