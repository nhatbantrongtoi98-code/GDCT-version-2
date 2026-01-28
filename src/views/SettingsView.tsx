import React, { useState, useRef } from 'react';
import { 
  User, Shield, Image as ImageIcon, Camera, 
  Save, Lock, CheckCircle2 
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  // 1. Quản lý thông tin cá nhân
  const [displayName, setDisplayName] = useState<string>("NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Military");
  const [bgUrl, setBgUrl] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Thông báo cập nhật thành công cho mọi hành động
  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveAll = () => {
    if (isAdmin && bgUrl) {
      localStorage.setItem('login_bg', bgUrl); // Lưu link nền vào bộ nhớ
    }
    triggerSuccess();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        triggerSuccess();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KHỐI 1: AVATAR & DANH XƯNG */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-[6px] border-red-50 overflow-hidden shadow-inner bg-slate-50">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full shadow-lg border-4 border-white"
              >
                <Camera size={18} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-800 uppercase tracking-tighter">{displayName}</h3>
            <div className={`mt-3 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
              isAdmin ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {isAdmin ? '🛡️ NGƯỜI ĐIỀU HÀNH' : 'ADMIN'}
            </div>
          </div>
        </div>

        {/* KHỐI 2: CHỈNH SỬA CHI TIẾT */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* CỘT TRÁI: TÊN & MẬT KHẨU */}
            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                  <User size={18} className="text-red-700"/> Thông tin cá nhân
                </h4>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-4 italic">Tên hiển thị mới</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-2 ring-red-100" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value.toUpperCase())}
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                  <Lock size={18} className="text-red-700"/> Đổi mật khẩu
                </h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-red-300" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-red-300" />
                </div>
              </section>
            </div>

            {/* CỘT PHẢI: THAY ĐỔI NỀN (CHỈ ADMIN) */}
            <div className="flex flex-col">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic mb-4">
                <ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống
              </h4>
              
              {isAdmin ? (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-4 italic">Gắn ảnh thay đổi nền (URL)</label>
                    <textarea 
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[11px] font-medium outline-none min-h-[120px] focus:ring-2 ring-red-100" 
                      placeholder="Dán link ảnh nền trang đăng nhập tại đây..."
                      value={bgUrl}
                      onChange={(e) => setBgUrl(e.target.value)}
                    />
                  </div>
                  <div className="h-24 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-inner bg-slate-100 relative">
                    <img src={bgUrl} className="w-full h-full object-cover opacity-50" alt="Preview" />
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase text-slate-400">Xem trước nền</div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] text-center border border-dashed border-slate-200">
                  <Shield size={40} className="text-slate-200 mb-4" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed px-4">
                    Bạn đang sử dụng tài khoản chiến sĩ.<br/>liên hệ quản trị viên để thay đổi giao diện chung.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NÚT CẬP NHẬT TỔNG THỂ */}
          <div className="mt-12 flex justify-center md:justify-end">
            <button 
              onClick={handleSaveAll}
              className="flex items-center gap-3 bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl hover:bg-red-800 hover:scale-105 transition-all uppercase tracking-widest"
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
