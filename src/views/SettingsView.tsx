import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Shield, Image as ImageIcon, Camera, 
  Save, Lock, CheckCircle2, AlertCircle 
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  // 1. Quản lý thông tin cá nhân
  const [displayName, setDisplayName] = useState<string>("NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  
  // 2. Quản lý hình nền (Chỉ dành cho Admin)
  const [bgUrl, setBgUrl] = useState<string>(localStorage.getItem('login_bg') || "");

  // 3. Trạng thái UI
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hàm thông báo thành công
  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Xử lý cập nhật ảnh đại diện
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

  // Xử lý lưu tất cả thay đổi
  const handleSaveAll = () => {
    if (isAdmin && bgUrl) {
      localStorage.setItem('login_bg', bgUrl);
    }
    // Logic lưu tên và mật khẩu vào hệ thống tại đây
    triggerSuccess();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 animate-in fade-in duration-500">
      
      {/* TOAST THÔNG BÁO */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} />
          <span className="text-[11px] font-black uppercase tracking-[0.1em]">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: THÔNG TIN TỔNG QUAN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-[6px] border-red-50 overflow-hidden shadow-inner bg-slate-50">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full shadow-lg hover:scale-110 transition-all border-4 border-white"
              >
                <Camera size={18} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-800 uppercase tracking-tighter">{displayName}</h3>
            <div className={`mt-3 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
              isAdmin ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {isAdmin ? '🛡️ NGƯỜI ĐIỀU HÀNH' : 'CHIẾN SĨ'}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: FORM CHỈNH SỬA TỔNG HỢP */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* PHẦN 1: HỒ SƠ & MẬT KHẨU (CẢ 2 ĐỀU CÓ) */}
              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                    <User size={18} className="text-red-700"/> Thông tin cá nhân
                  </h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-4">Tên hiển thị mới</label>
                    <input 
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-2 ring-red-100" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value.toUpperCase())}
                    />
                  </div>
                </section>

                <section className="space-y-4 pt-4 border-t border-slate-50">
                  <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                    <Lock size={18} className="text-red-700"/> Đổi mật khẩu
                  </h4>
                  <div className="space-y-3">
                    <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-300" />
                    <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-300" />
                  </div>
                </section>
              </div>

              {/* PHẦN 2: GIAO DIỆN (CHỈ ADMIN) */}
              <div className="space-y-8">
                {isAdmin ? (
                  <section className="space-y-4 animate-in slide-in-from-right-4">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic">
                      <ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-4">Link nền đăng nhập (URL)</label>
                        <textarea 
                          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[11px] font-medium outline-none min-h-[100px]" 
                          placeholder="Dán link ảnh tại đây..."
                          value={bgUrl}
                          onChange={(e) => setBgUrl(e.target.value)}
                        />
                      </div>
                      <div className="h-32 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-inner">
                        <img src={bgUrl || 'https://via.placeholder.com/400x200?text=Chua+co+hinh+nen'} className="w-full h-full object-cover opacity-60" alt="Preview" />
                      </div>
                    </div>
                  </section>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-10 bg-slate-50 rounded-[3rem] text-center">
                    <Shield size={48} className="text-slate-200 mb-4" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
                      Bạn đang sử dụng tài khoản Chiến sĩ.<br/>Liên hệ Quản trị viên để thay đổi giao diện chung.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* NÚT LƯU TỔNG THỂ */}
            <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
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
    </div>
  );
};

export default SettingsView;
