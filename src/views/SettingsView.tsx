import React, { useState, useRef } from 'react';
import {  
  User, Shield, Image as ImageIcon, Camera,  
  Save, Lock, CheckCircle2, History, Upload  
} from 'lucide-react';

const SettingsView: React.FC = () => {
  const [displayName, setDisplayName] = useState(localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  
  // 1. Quản lý ảnh đại diện (Lấy từ localStorage)
  const [avatar, setAvatar] = useState<string>(localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // 2. Xử lý tải ảnh đại diện
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  // 3. Hàm lưu tổng thể
  const handleSaveAll = () => {
    localStorage.setItem('user_display_name', displayName);
    localStorage.setItem('login_bg', bgImage);
    
    // QUAN TRỌNG: Lưu ảnh đại diện vào bộ nhớ
    localStorage.setItem('user_avatar', avatar);

    setShowToast(true);
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500 relative">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-[#111827] text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            
            {/* PHẦN THAY ĐỔI ẢNH ĐẠI DIỆN */}
            <div 
              className="relative group mb-6 cursor-pointer" 
              onClick={() => avatarInputRef.current?.click()}
            >
              <div className="w-32 h-32 rounded-full border-4 border-red-50 overflow-hidden shadow-xl">
                {/* SỬA TẠI ĐÂY: src={avatar} thay vì link tĩnh */}
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 p-2 bg-red-700 text-white rounded-full border-2 border-white group-hover:scale-110 transition-all">
                <Camera size={14} />
              </div>
              <input 
                type="file" 
                ref={avatarInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
              />
            </div>

            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">
              {displayName}
            </h3>
            <div className="mt-3 px-6 py-1.5 rounded-full text-[9px] font-black bg-red-700 text-white uppercase tracking-widest">
              Người điều hành tối cao
            </div>
          </div>

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

        {/* Cột 2 & 3 giữ nguyên như code của đồng chí... */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col justify-between">
           {/* ... code cũ của đồng chí ... */}
           <div className="pt-10 flex justify-end">
             <button onClick={handleSaveAll} className="flex items-center gap-3 bg-[#CC2020] text-white px-12 py-5 rounded-[2.2rem] font-black text-[11px] shadow-[0_20px_40px_rgba(204,32,32,0.25)] hover:bg-red-800 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
               <Save size={18}/> Cập nhật tất cả thay đổi
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
