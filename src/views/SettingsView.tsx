import React, { useState } from 'react';
import { 
  User, Shield, MessageSquare, BarChart3, 
  Camera, Save, Lock, Users, Trash2 
} from 'lucide-react';

const SettingsView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'feedback' | 'analytics'>('profile');
  
  // Dữ liệu giả lập cho Admin theo dõi
  const stats = [
    { date: '20/01', visitors: 45 }, { date: '21/01', visitors: 52 },
    { date: '22/01', visitors: 38 }, { date: '23/01', visitors: 65 },
    { date: '24/01', visitors: 48 }, { date: '25/01', visitors: 70 },
  ];

  const feedbacks = [
    { id: 1, user: 'Chiến sĩ A', content: 'Ứng dụng rất bổ ích, dễ học bài.', time: '10:30 - 24/01' },
    { id: 2, user: 'Chiến sĩ B', content: 'Cần thêm nhiều trò chơi hơn nữa.', time: '15:45 - 25/01' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700">
      {/* Sidebar Cài đặt */}
      <div className="lg:w-1/4 space-y-3">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-red-50 overflow-hidden bg-slate-100">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="avatar" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-red-600 text-white rounded-full shadow-lg">
                <Camera size={14} />
              </button>
            </div>
            <h3 className="mt-4 font-black text-slate-800 uppercase text-sm">admin123</h3>
            <span className="text-[9px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mt-1">
              {isAdmin ? 'SĨ QUAN QUẢN LÝ' : 'CHIẾN SĨ'}
            </span>
          </div>

          <nav className="space-y-2">
            <TabButton icon={<User size={18}/>} label="Hồ sơ" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <TabButton icon={<Shield size={18}/>} label="Bảo mật" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
            {isAdmin && (
              <>
                <TabButton icon={<BarChart3 size={18}/>} label="Thống kê truy cập" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                <TabButton icon={<MessageSquare size={18}/>} label="Ý kiến phản hồi" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <div className="flex-1 bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 min-h-[600px]">
        {activeTab === 'profile' && (
          <div className="max-w-md space-y-6">
            <h4 className="text-xl font-black text-slate-800 uppercase italic">Cập nhật hồ sơ</h4>
            <div className="space-y-4">
              <InputGroup label="Tên đăng nhập mới" placeholder="Nhập tên đăng nhập..." />
              <button className="flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] shadow-lg">
                <Save size={16}/> LƯU THAY ĐỔI
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-md space-y-6">
            <h4 className="text-xl font-black text-slate-800 uppercase italic">Đổi mật khẩu</h4>
            <div className="space-y-4">
              <InputGroup label="Mật khẩu hiện tại" type="password" />
              <InputGroup label="Mật khẩu mới" type="password" />
              <InputGroup label="Xác nhận mật khẩu" type="password" />
              <button className="flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-[10px] shadow-lg">
                <Lock size={16}/> CẬP NHẬT BẢO MẬT
              </button>
            </div>
          </div>
        )}

        {isAdmin && activeTab === 'analytics' && (
          <div className="space-y-8">
            <h4 className="text-xl font-black text-slate-800 uppercase italic">Thống kê người dùng</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Hôm nay" value="70" sub="Người truy cập" color="text-green-600" />
              <StatCard label="Tuần này" value="318" sub="Tổng lượt xem" color="text-blue-600" />
            </div>
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Danh sách truy cập 6 ngày gần nhất</p>
              <div className="flex items-end gap-4 h-48">
                {stats.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-red-600 rounded-t-lg transition-all hover:bg-red-700" style={{ height: `${(s.visitors/70)*100}%` }}></div>
                    <span className="text-[9px] font-bold text-slate-500">{s.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isAdmin && activeTab === 'feedback' && (
          <div className="space-y-6">
            <h4 className="text-xl font-black text-slate-800 uppercase italic">Góp ý từ người dùng</h4>
            <div className="space-y-4">
              {feedbacks.map((f) => (
                <div key={f.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-black text-slate-800">{f.user}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{f.time}</span>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-relaxed">{f.content}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component bổ trợ
const TabButton = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[11px] uppercase transition-all ${active ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon} {label}
  </button>
);

const InputGroup = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">{label}</label>
    <input type={type} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-bold outline-none focus:border-red-300" placeholder={placeholder} />
  </div>
);

const StatCard = ({ label, value, sub, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
    <p className="text-[9px] font-bold text-slate-300 mt-1">{sub}</p>
  </div>
);

export default SettingsView;
