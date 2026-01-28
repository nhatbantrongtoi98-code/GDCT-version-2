import React, { useState, useRef } from 'react';
import { 
  User, Shield, MessageSquare, BarChart3, 
  Camera, Save, Lock, Trash2, Users, Activity
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'feedback' | 'analytics'>(isAdmin ? 'analytics' : 'profile');
  const [avatar, setAvatar] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Military");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dữ liệu theo dõi truy cập (Mô phỏng cho Admin)
  const visitStats = [
    { day: 'Thứ 2', count: 42 }, { day: 'Thứ 3', count: 58 },
    { day: 'Thứ 4', count: 35 }, { day: 'Thứ 5', count: 72 },
    { day: 'Thứ 6', count: 50 }, { day: 'Thứ 7', count: 85 },
    { day: 'CN', count: 65 }
  ];

  // Xử lý cập nhật ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN & MENU */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-red-100 overflow-hidden bg-slate-50 shadow-inner">
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-3 bg-red-600 text-white rounded-full shadow-lg hover:scale-110 transition-all"
            >
              <Camera size={16} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </div>

          <div className="text-center mt-6">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">ADMIN123</h3>
            {/* PHÂN BIỆT VAI TRÒ CHUẨN XÁC */}
            <div className={`mt-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
              isAdmin ? 'bg-red-800 text-white shadow-md' : 'bg-slate-100 text-slate-500'
            }`}>
              {isAdmin ? 'SĨ QUAN QUẢN LÝ' : 'CHIẾN SĨ'}
            </div>
          </div>

          <nav className="w-full mt-10 space-y-2">
            {isAdmin && (
              <>
                <MenuButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={18}/>} label="Thống kê truy cập" />
                <MenuButton active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} icon={<MessageSquare size={18}/>} label="Ý kiến phản hồi" />
              </>
            )}
            <MenuButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18}/>} label="Hồ sơ cá nhân" />
            <MenuButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Shield size={18}/>} label="Bảo mật" />
          </nav>
        </div>
      </div>

      {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
      <div className="flex-1 bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 min-h-[650px]">
        
        {/* TAB 1: THỐNG KÊ (CHỈ ADMIN) */}
        {isAdmin && activeTab === 'analytics' && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-2xl font-black text-slate-800 uppercase italic">Theo dõi ứng dụng</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dữ liệu lượt truy cập 7 ngày gần nhất</p>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl font-black text-[10px] flex items-center gap-2">
                <Activity size={14} /> TRỰC TUYẾN: 12
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 h-64 items-end bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-50">
              {visitStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-4 flex-1 group">
                  <div className="relative w-full flex flex-col justify-end h-40">
                    <div 
                      className="w-full bg-red-700 rounded-t-xl transition-all duration-700 group-hover:bg-red-500 shadow-lg"
                      style={{ height: `${(stat.count / 90) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {stat.count}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase">{stat.day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <StatSmall label="Tổng lượt truy cập" value="1,248" />
              <StatSmall label="Người dùng mới" value="+24" />
            </div>
          </div>
        )}

        {/* TAB 2: HỒ SƠ (CẢ 2 ĐỀU CÓ) */}
        {activeTab === 'profile' && (
          <div className="max-w-md space-y-8 animate-in slide-in-from-right-4">
            <h4 className="text-2xl font-black text-slate-800 uppercase italic">Cập nhật hồ sơ</h4>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Tên đăng nhập mới</label>
                <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold outline-none focus:border-red-400 transition-all" placeholder="Nhập tên mới..." />
              </div>
              <button className="flex items-center gap-3 bg-red-800 text-white px-10 py-5 rounded-[1.5rem] font-black text-[11px] shadow-xl hover:bg-red-900 transition-all uppercase tracking-widest">
                <Save size={18}/> Lưu thay đổi
              </button>
            </div>
          </div>
        )}

        {/* CÁC TAB KHÁC (Bảo mật, Phản hồi)... */}
      </div>
    </div>
  );
};

// UI Components hỗ trợ
const MenuButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase transition-all ${
      active ? 'bg-red-800 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
    }`}
  >
    {icon} {label}
  </button>
);

const StatSmall = ({ label, value }: any) => (
  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
  </div>
);

export default SettingsView;
