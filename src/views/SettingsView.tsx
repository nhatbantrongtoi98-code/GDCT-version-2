import React, { useState, useRef, useEffect } from 'react';
import {  
  User, Shield, Image as ImageIcon, Camera,  
  Save, Lock, CheckCircle2, History, Upload, X, Loader2
} from 'lucide-react';

const SettingsView: React.FC = () => {
  // 1. Khởi tạo State - Tự động nạp dữ liệu từ kho lưu trữ ngay khi mở trang
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('user_display_name') || "NGUYỄN ĐẮC THANH");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem('user_avatar') || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
  const [bgImage, setBgImage] = useState<string>(() => localStorage.getItem('login_bg') || "");
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // 2. Xử lý tải ảnh với nén dữ liệu nhẹ
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        return alert("❌ LỖI: Ảnh quá nặng (Yêu cầu dưới 2MB)"); 
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'avatar') setAvatar(base64String);
        else setBgImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. HÀM LƯU VĨNH VIỄN - ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT
  const handleSaveAll = async () => {
    setIsSaving(true);

    try {
      // Ghi đè vào bộ nhớ trình duyệt (LocalStorage)
      localStorage.setItem('user_display_name', displayName.trim().toUpperCase());
      localStorage.setItem('user_avatar', avatar);
      localStorage.setItem('login_bg', bgImage);

      // PHÁT TÍN HIỆU ĐỒNG BỘ: 
      // Lệnh này giúp Sidebar và các trang khác cập nhật tên/ảnh ngay lập tức mà không cần F5
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('userUpdate', { 
        detail: { name: displayName, avatar: avatar } 
      }));

      // Giả lập thời gian ghi dữ liệu
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      alert("❌ LỖI: Không thể ghi vào bộ nhớ vĩnh viễn.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG CHUYÊN NGHIỆP */}
      {showToast && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-4 border-green-500 animate-in slide-in-from-right-10">
          <div className="bg-green-500/20 p-2 rounded-full">
            <CheckCircle2 size={24} className="text-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase tracking-widest">Hệ thống thông báo</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase italic">Dữ liệu đã được khóa vĩnh viễn</span>
          </div>
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
              <div className="w-32 h-32 rounded-[2.5rem] border-4 border-slate-50 overflow-hidden shadow-2xl bg-slate-100 group-hover:scale-95 transition-all duration-500">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 p-3 bg-red-700 text-white rounded-2xl border-4 border-white group-hover:rotate-12 transition-all shadow-lg">
                <Camera size={18} />
              </div>
              <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
            </div>

            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{displayName || "CHƯA ĐẶT TÊN"}</h3>
            <div className="mt-3 px-6 py-2 rounded-xl text-[9px] font-black bg-slate-100 text-slate-500 uppercase tracking-[0.2em]">Sĩ quan quản trị</div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Shield size={80} /></div>
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 italic relative z-10"><History size={14}/> Trạng thái lưu trữ</h4>
            <div className="border-l-2 border-red-700 pl-4 py-1 relative z-10">
              <p className="text-[9px] font-bold text-slate-500 uppercase">Cập nhật cuối:</p>
              <p className="text-[10px] text-slate-200 italic font-medium leading-relaxed">
                {new Date().toLocaleDateString('vi-VN')} - Hệ thống ổn định
              </p>
            </div>
          </div>
        </div>

        {/* CỘT 2 & 3: KHU VỰC CÀI ĐẶT CHÍNH */}
        <div className="lg:col-span-2 bg-white p-10 md:p-14 rounded-[4rem] shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* PHẦN 1: THÔNG TIN CÁ NHÂN */}
            <div className="space-y-10">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-red-50 rounded-2xl text-red-700"><User size={20}/></div>
                   <h4 className="text-sm font-black text-slate-800 uppercase italic">Hồ sơ cán bộ</h4>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Họ và tên hiển thị</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-4 ring-red-50 transition-all uppercase" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="NHẬP HỌ TÊN..."
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-slate-50 rounded-2xl text-slate-700"><Lock size={20}/></div>
                   <h4 className="text-sm font-black text-slate-800 uppercase italic">Mật khẩu truy cập</h4>
                </div>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-xs outline-none focus:bg-white transition-all" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-xs outline-none focus:bg-white transition-all" />
                </div>
              </section>
            </div>

            {/* PHẦN 2: TÙY CHỈNH GIAO DIỆN */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                   <div className="p-3 bg-red-50 rounded-2xl text-red-700"><ImageIcon size={20}/></div>
                   <h4 className="text-sm font-black text-slate-800 uppercase italic">Hình nền trang chủ</h4>
              </div>
              
              <div 
                onClick={() => bgInputRef.current?.click()}
                className="flex-1 min-h-[250px] rounded-[3rem] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all relative overflow-hidden group"
              >
                {bgImage ? (
                  <>
                    <img src={bgImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="BG Preview" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-5 bg-white rounded-full shadow-lg text-slate-300 group-hover:text-red-500 transition-all">
                      <Upload size={30} />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-6">
                  <span className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase shadow-xl border border-slate-100 group-hover:bg-red-700 group-hover:text-white transition-all">Thay đổi hình nền</span>
                </div>
              </div>
              <input type="file" ref={bgInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'bg')} />
              <p className="text-[9px] font-bold text-slate-400 text-center uppercase italic leading-relaxed px-4">Khuyến nghị: Sử dụng ảnh ngang (1920x1080) để hiển thị tốt nhất trên màn hình lớn</p>
            </div>
          </div>

          {/* NÚT LƯU TỔNG THỂ */}
          <div className="pt-14 border-t border-slate-50 mt-10">
            <button 
              onClick={handleSaveAll} 
              disabled={isSaving}
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-700 text-white px-16 py-6 rounded-[2.5rem] font-black text-[12px] shadow-[0_25px_50px_-12px_rgba(185,28,28,0.5)] hover:bg-red-800 hover:-translate-y-1 active:translate-y-0 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20}/>}
              {isSaving ? "Đang ghi dữ liệu..." : "Cập nhật cấu hình vĩnh viễn"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
