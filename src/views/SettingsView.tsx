import React, { useState, useRef } from 'react';
import { 
  User, Shield, MessageSquare, BarChart3, 
  Camera, Save, Lock, Image as ImageIcon, CheckCircle2 
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics' | 'theme'>('analytics');
  const [displayName, setDisplayName] = useState<string>("Nguyễn Đắc Thanh");
  const [bgUrl, setBgUrl] = useState<string>("https://images.unsplash.com/photo-1509062522246-3755977927d7");
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Hàm xử lý thay đổi hình nền
  const handleUpdateBackground = (url: string) => {
    setBgUrl(url);
    // Trong thực tế, đồng chí sẽ lưu bgUrl này vào LocalStorage hoặc Database
    localStorage.setItem('login_bg', url); 
    triggerSuccess();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG */}
      {showToast && (
        <div className="fixed top-10 right-10 z-50 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
          <CheckCircle2 size={20} />
          <span className="text-[11px] font-black uppercase">Đã cập nhật giao diện thành công!</span>
        </div>
      )}

      {/* CỘT TRÁI: DANH XƯNG NGƯỜI ĐIỀU HÀNH */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center relative">
          <div className="text-center mt-6">
            <h3 className="text-2xl font-black text-slate-800 uppercase">{displayName}</h3>
            <div className="mt-2 px-6 py-2 rounded-full text-[11px] font-black uppercase bg-red-700 text-white">
              🛡️ NGƯỜI ĐIỀU HÀNH
            </div>
          </div>

          <nav className="w-full mt-10 space-y-2">
            {isAdmin && (
              <>
                <MenuButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={18}/>} label="Thống kê hệ thống" />
                {/* NÚT MỚI: QUẢN LÝ GIAO DIỆN */}
                <MenuButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')} icon={<ImageIcon size={18}/>} label="Giao diện đăng nhập" />
              </>
            )}
            <MenuButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18}/>} label="Hồ sơ cá nhân" />
          </nav>
        </div>
      </div>

      {/* CỘT PHẢI: NỘI DUNG THIẾT LẬP */}
      <div className="flex-1 bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100 min-h-[600px]">
        
        {/* TÍNH NĂNG THAY ĐỔI NỀN TRANG ĐĂNG NHẬP */}
        {isAdmin && activeTab === 'theme' && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
             <h4 className="text-2xl font-black text-slate-800 uppercase italic">Thay đổi hình nền hệ thống</h4>
             
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Link hình nền mới (URL)</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold outline-none focus:ring-2 ring-red-100" 
                    placeholder="Dán link ảnh tại đây (Unsplash, Google Drive...)"
                    onChange={(e) => setBgUrl(e.target.value)}
                  />
                </div>

                {/* Khung xem trước hình nền */}
                <div className="relative w-full h-48 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
                   <img src={bgUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm">Hình nền xem trước</span>
                   </div>
                </div>

                <button 
                  onClick={() => handleUpdateBackground(bgUrl)}
                  className="flex items-center justify-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl hover:bg-red-700 transition-all uppercase"
                >
                  <Save size={18}/> ÁP DỤNG HÌNH NỀN MỚI
                </button>
             </div>
          </div>
        )}

        {/* Các tab khác giữ nguyên... */}
      </div>
    </div>
  );
};

const MenuButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase transition-all ${active ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon} {label}
  </button>
);

export default SettingsView;
