import React, { useState, useRef } from 'react';
import { 
  User, Shield, Image as ImageIcon, Camera, 
  Save, Lock, CheckCircle2, History, Upload 
} from 'lucide-react';

const SettingsView: React.FC = () => {
  const [username] = useState("admin123");
  const isAdmin = username === "admin123";

  const [displayName, setDisplayName] = useState("NGUYỄN ĐẮC THANH");
  const [bgImage, setBgImage] = useState<string>(localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  
  // Trạng thái lưu lịch sử thay đổi
  const [historyLogs, setHistoryLogs] = useState<{time: string, action: string}[]>(
    JSON.parse(localStorage.getItem('admin_logs') || '[]')
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

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

  // Xử lý tải ảnh nền từ máy tính
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBgImage(base64String);
        localStorage.setItem('login_bg', base64String);
        triggerSuccess("Đã thay đổi ảnh nền đăng nhập từ máy tính");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveInfo = () => {
    triggerSuccess(`Cập nhật thông tin Admin: ${displayName}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 animate-in fade-in duration-500">
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-b-4 border-red-600">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-[11px] font-black uppercase tracking-widest">Hệ thống đã ghi nhận thay đổi!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT 1: THÔNG TIN & NHẬT KÝ */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-red-700 overflow-hidden shadow-xl mb-6">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase italic">{displayName}</h3>
            <span className="text-[9px] font-black bg-red-700 text-white px-4 py-1 rounded-full mt-2 uppercase">Admin tối cao</span>
          </div>

          {/* BẢNG NHẬT KÝ TỰ ĐỘNG */}
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white">
            <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest mb-6 text-red-500">
              <History size={16}/> Nhật ký hoạt động
            </h4>
            <div className="space-y-4">
              {historyLogs.map((log, i) => (
                <div key={i} className="border-l-2 border-red-900 pl-4 py-1">
                  <p className="text-[10px] font-bold text-slate-400">{log.time}</p>
                  <p className="text-[11px] font-medium text-slate-200 line-clamp-1">{log.action}</p>
                </div>
              ))}
              {historyLogs.length === 0 && <p className="text-[10px] italic text-slate-500">Chưa có hoạt động nào...</p>}
            </div>
          </div>
        </div>

        {/* CỘT 2 & 3: KHÔNG GIAN ĐIỀU HÀNH */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-800 uppercase italic flex items-center gap-2">
                <User size={18} className="text-red-700"/> Hồ sơ Admin
              </h4>
              <input 
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-red-100" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <button onClick={handleSaveInfo} className="w-full bg-slate-100 text-slate-800 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-red-700 hover:text-white transition-all">
                Lưu hồ sơ
              </button>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-800 uppercase italic flex items-center gap-2">
                <ImageIcon size={18} className="text-red-700"/> Giao diện đăng nhập
              </h4>
              <div className="relative group cursor-pointer" onClick={() => bgInputRef.current?.click()}>
                <div className="h-40 rounded-[2rem] overflow-hidden border-4 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center transition-all group-hover:border-red-400">
                  {bgImage ? (
                    <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="Preview" />
                  ) : (
                    <Upload size={32} className="text-slate-300 mb-2" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="bg-white/90 px-4 py-2 rounded-xl text-[9px] font-black uppercase shadow-sm">Tải ảnh từ máy tính</span>
                  </div>
                </div>
                <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={handleBgUpload} />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full">
                <Shield size={14}/>
                <span className="text-[10px] font-black uppercase tracking-tighter">Mọi thay đổi sẽ được lưu vào nhật ký hệ thống</span>
             </div>
             <button 
                onClick={() => triggerSuccess("Admin xác nhận cập nhật toàn bộ hệ thống")}
                className="bg-red-700 text-white px-16 py-5 rounded-[2rem] font-black text-[12px] shadow-2xl hover:scale-105 transition-all uppercase tracking-[0.2em]"
             >
                Xác nhận thay đổi tối cao
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
