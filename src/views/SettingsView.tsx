import React, { useState, useRef } from 'react';
import { User, Shield, Image as ImageIcon, Camera, Save, Lock, CheckCircle2, History, Upload } from 'lucide-react';

const SettingsView: React.FC = () => {
  const isAdmin = true; // Xác thực admin123
  const [displayName, setDisplayName] = useState("NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBgImage(base64);
        // Lưu tạm thời để xem trước
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    // Lưu chính thức vào bộ nhớ để trang Login có thể đọc được
    localStorage.setItem('login_bg', bgImage);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Cột trái: Hồ sơ & Nhật ký */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-red-50 overflow-hidden mb-6">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
          </div>
          <h3 className="text-xl font-black uppercase italic">{displayName}</h3>
          <div className="bg-red-700 text-white px-6 py-1 rounded-full text-[10px] font-black mt-2">NGƯỜI ĐIỀU HÀNH TỐI CAO</div>
        </div>
        
        {/* Nhật ký hệ thống */}
        <div className="bg-[#111827] p-8 rounded-[2.5rem] text-white space-y-4">
          <h4 className="text-red-500 text-[10px] font-black uppercase italic flex items-center gap-2"><History size={14}/> Nhật ký hệ thống</h4>
          <div className="text-[10px] text-slate-400 border-l border-red-900 pl-4 py-1">
             <p>11:40:31 28/1/2026</p>
             <p className="text-slate-200 italic">Admin xác nhận cập nhật toàn bộ nội dung hệ thống</p>
          </div>
        </div>
      </div>

      {/* Cột phải: Form điều chỉnh */}
      <div className="flex-1 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2"><User size={16} className="text-red-700"/> Thông tin cá nhân</h4>
            <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2 pt-4"><Lock size={16} className="text-red-700"/> Đổi mật khẩu</h4>
            <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs" placeholder="Mật khẩu hiện tại (123456)" />
            <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs" placeholder="Mật khẩu mới" />
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase italic flex items-center gap-2"><ImageIcon size={16} className="text-red-700"/> Giao diện hệ thống</h4>
            <div onClick={() => bgInputRef.current?.click()} className="h-52 rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50 overflow-hidden cursor-pointer relative group">
              {bgImage ? <img src={bgImage} className="w-full h-full object-cover opacity-70" alt="Preview" /> : <div className="flex items-center justify-center h-full"><Upload className="text-slate-300" /></div>}
              <div className="absolute inset-0 flex items-center justify-center"><span className="bg-white/90 px-4 py-2 rounded-xl text-[9px] font-black uppercase shadow-sm">Tải ảnh nền từ máy tính</span></div>
            </div>
            <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
            <p className="text-[8px] text-center font-bold text-slate-400 uppercase">Khuyến nghị: Ảnh JPG/PNG dưới 2MB</p>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <button onClick={handleSaveAll} className="bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl uppercase tracking-widest flex items-center gap-3">
            <Save size={18}/> Cập nhật tất cả thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
