import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Shield, Image as ImageIcon, Camera, 
  Save, Lock, CheckCircle2, History, Upload 
} from 'lucide-react';

const SettingsView: React.FC = () => {
  // Xác định tài khoản admin123 có quyền tối cao
  const [username] = useState("admin123"); 
  const isAdmin = username === "admin123";

  // Quản lý thông tin cá nhân và giao diện
  const [displayName, setDisplayName] = useState("NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Military");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  
  // Quản lý Nhật ký hoạt động (Logs)
  const [historyLogs, setHistoryLogs] = useState<{time: string, action: string}[]>(
    JSON.parse(localStorage.getItem('admin_logs') || '[]')
  );

  const [showToast, setShowToast] = useState(false);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Hàm ghi nhật ký tự động
  const saveLog = (action: string) => {
    const newLog = {
      time: new Date().toLocaleString('vi-VN'),
      action: action
    };
    const updatedLogs = [newLog, ...historyLogs].slice(0, 5); // Lưu 5 hoạt động gần nhất
    setHistoryLogs(updatedLogs);
    localStorage.setItem('admin_logs', JSON.stringify(updatedLogs));
  };

  const triggerSuccess = (msg: string) => {
    setShowToast(true);
    saveLog(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Xử lý tải ảnh nền đăng nhập từ máy tính (Chỉ Admin)
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBgImage(base64);
        localStorage.setItem('login_bg', base64); // Lưu để file Login.tsx sử dụng
        triggerSuccess("Đã thay đổi ảnh nền trang đăng nhập");
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý tải ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
      triggerSuccess("Đã cập nhật ảnh đại diện mới");
    }
  };

  const handleSaveAll = () => {
    // Lưu các thông tin khác vào hệ thống
    triggerSuccess(`Admin xác nhận cập nhật toàn bộ nội dung hệ thống`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600 animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Cập nhật nội dung thành công!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT 1: HỒ SƠ & NHẬT KÝ */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-[6px] border-red-50 overflow-hidden shadow-inner">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-2 right-2 p-3 bg-red-700 text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all">
                <Camera size={18} />
              </button>
              <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-800 uppercase italic tracking-tighter">{displayName}</h3>
            <div className="mt-3 px-6 py-2 rounded-full text-[10px] font-black bg-red-700 text-white uppercase tracking-[0.2em]">
              🛡️ NGƯỜI ĐIỀU HÀNH TỐI CAO
            </div>
          </div>

          {/* NHẬT KÝ HOẠT ĐỘNG TỰ ĐỘNG */}
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white">
            <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest mb-6 text-red-500 italic">
              <History size={16}/> Nhật ký hệ thống
            </h4>
            <div className="space-y-4">
              {historyLogs.map((log, i) => (
                <div key={i} className="border-l-2 border-red-900 pl-4 py-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">{log.time}</p>
                  <p className="text-[11px] font-medium text-slate-200 line-clamp-1 italic">{log.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT 2 & 3: KHÔNG GIAN ĐIỀU CHỈNH */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* THÔNG TIN & MẬT KHẨU */}
            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic"><User size={18} className="text-red-700"/> Thông tin cá nhân</h4>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-4 italic">Tên đăng nhập mới</label>
                  <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100" value={displayName} onChange={(e) => setDisplayName(e.target.value.toUpperCase())} />
                </div>
              </section>
              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic"><Lock size={18} className="text-red-700"/> Đổi mật khẩu</h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại (123456)" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-300" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-red-300" />
                </div>
              </section>
            </div>

            {/* GIAO DIỆN ĐĂNG NHẬP (CHỈ ADMIN) */}
            <div className="flex flex-col">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase italic mb-6"><ImageIcon size={18} className="text-red-700"/> Giao diện hệ thống</h4>
              
              {isAdmin ? (
                <div className="space-y-4">
                  <div 
                    onClick={() => bgInputRef.current?.click()}
                    className="h-48 rounded-[2.5rem] overflow-hidden border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-red-300 transition-all relative group"
                  >
                    {bgImage ? (
                      <img src={bgImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Preview" />
                    ) : (
                      <Upload size={32} className="text-slate-300 mb-2" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="bg-white/90 px-6 py-2 rounded-2xl text-[10px] font-black uppercase shadow-sm">Tải ảnh nền từ máy tính</span>
                    </div>
                  </div>
                  <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
                  <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-tighter">Khuyến nghị: Ảnh JPG/PNG dưới 2MB</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] text-center border border-dashed border-slate-200">
                  <Shield size={40} className="text-slate-200 mb-4" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed px-4">Bạn đang sử dụng tài khoản chiến sĩ. Liên hệ quản trị viên để thay đổi giao diện chung.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex justify-center md:justify-end">
            <button onClick={handleSaveAll} className="flex items-center gap-3 bg-red-700 text-white px-16 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl hover:bg-red-800 hover:scale-105 transition-all uppercase tracking-[0.2em]">
              <Save size={18}/> Cập nhật tất cả thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
