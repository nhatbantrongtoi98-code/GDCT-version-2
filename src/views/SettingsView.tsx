import React, { useState, useRef } from 'react';
import { 
  User, Shield, MessageSquare, BarChart3, 
  Camera, Save, Lock, Trash2, Activity, Globe, CheckCircle2 
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'feedback' | 'analytics'>(isAdmin ? 'analytics' : 'profile');
  
  // Quản lý tên hiển thị và thông báo
  const [displayName, setDisplayName] = useState<string>("Nguyễn Đắc Thanh");
  const [tempName, setTempName] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [avatar, setAvatar] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=MilitaryAdmin");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hàm xử lý hiện thông báo thành công
  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Tự tắt sau 3 giây
  };

  // Cập nhật tên người dùng
  const handleUpdateName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName);
      triggerSuccess();
      setTempName(""); // Xóa ô nhập sau khi lưu
    }
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
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500 relative">
      
      {/* THÔNG BÁO THÀNH CÔNG (TOAST) */}
      {showToast && (
        <div className="fixed top-10 right-10 z-50 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-10">
          <CheckCircle2 size={20} />
          <span className="text-[11px] font-black uppercase tracking-widest">Đã cập nhật nội dung thành công!</span>
        </div>
      )}

      {/* CỘT TRÁI: NGƯỜI ĐIỀU HÀNH */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden">
          {isAdmin && <div className="absolute top-0 left-0 w-full h-2 bg-red-700"></div>}
          
          <div className="relative mt-4">
            <div className="w-32 h-32 rounded-full border-4 border-red-100 overflow-hidden bg-slate-50 shadow-xl">
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 p-3 bg-red-700 text-white rounded-full shadow-lg hover:scale-110 transition-all border-2 border-white">
              <Camera size={16} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </div>

          <div className="text-center mt-6">
            {/* Hiển thị tên đã thay đổi */}
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{displayName}</h3>
            <div className={`mt-2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${
              isAdmin ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {isAdmin ? '🛡️ NGƯỜI ĐIỀU HÀNH' : 'THANH ĐẸP TRAI'}
            </div>
          </div>

          <nav className="w-full mt-10 space-y-2">
            {isAdmin && (
              <>
                <MenuButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={18}/>} label="Thống kê hệ thống" />
                <MenuButton active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} icon={<MessageSquare size={18}/>} label="Ý kiến người dùng" />
              </>
            )}
            <MenuButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18}/>} label="Hồ sơ cá nhân" />
          </nav>
        </div>
      </div>

      {/* CỘT PHẢI: NỘI DUNG */}
      <div className="flex-1 bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100 min-h-[600px]">
        {activeTab === 'profile' && (
          <div className="max-w-md space-y-8">
             <h4 className="text-2xl font-black text-slate-800 uppercase italic">Thiết lập danh tính</h4>
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Tên đăng nhập mới</label>
                  <input 
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all" 
                    placeholder="Nhập tên mới tại đây..."
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleUpdateName}
                  className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] shadow-2xl hover:bg-red-800 transition-all uppercase tracking-[0.1em]"
                >
                  <Save size={18}/> LƯU THAY ĐỔI
                </button>
             </div>
          </div>
        )}

        {/* Tab thống kê cho Người điều hành */}
        {isAdmin && activeTab === 'analytics' && (
          <div className="space-y-10">
            <div className="flex items-center gap-4 border-b pb-6">
              <div className="p-4 bg-red-50 text-red-700 rounded-3xl"><Activity size={24}/></div>
              <h4 className="text-2xl font-black text-slate-800 uppercase italic">Thống kê truy cập thực tế</h4>
            </div>
            {/* Biểu đồ và thông số như các bản trước */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <StatCard label="Lượt truy cập hôm nay" value="128" />
               <StatCard label="Đang trực tuyến" value="15" color="text-green-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component UI bổ trợ
const MenuButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase transition-all ${active ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, color = "text-red-700" }: any) => (
  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</p>
    <p className={`text-4xl font-black ${color} tracking-tighter`}>{value}</p>
  </div>
);

export default SettingsView;
