import React, { useState } from 'react';
import LoginView from './views/LoginView'; 
import Layout from './components/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{username: string, role: string} | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    const role = username === 'admin123' ? 'admin' : 'user';
    setUser({ username, role });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) return <LoginView onLogin={handleLogin} />;

  const isAdmin = user?.role === 'admin';

  // Hàm render nội dung trang con
  const renderMainContent = () => {
    switch (activeTab) {
      case 'history-vn':
        return <ContentSection title="Lịch sử QĐND Việt Nam" color="bg-red-50" border="border-red-700" isAdmin={isAdmin} content="Quân đội nhân dân Việt Nam là lực lượng nòng cốt của lực lượng vũ trang nhân dân Việt Nam..." />;
      
      // Tập con Lịch sử truyền thống đơn vị
      case 'tradition-thudo': return <ContentSection title="Truyền thống LLVT Thủ đô" color="bg-blue-50" border="border-blue-700" isAdmin={isAdmin} content="Nội dung truyền thống LLVT Thủ đô..." />;
      case 'tradition-301': return <ContentSection title="Sư đoàn Bộ binh 301" color="bg-green-50" border="border-green-700" isAdmin={isAdmin} content="Lịch sử vẻ vang Sư đoàn 301..." />;
      case 'tradition-59': return <ContentSection title="Trung đoàn Bộ binh 59" color="bg-stone-50" border="border-stone-700" isAdmin={isAdmin} content="Lịch sử Trung đoàn 59..." />;
      case 'tradition-692': return <ContentSection title="Trung đoàn Bộ binh 692" color="bg-emerald-50" border="border-emerald-700" isAdmin={isAdmin} content="Lịch sử Trung đoàn 692..." />;
      case 'tradition-757': return <ContentSection title="Trung đoàn Bộ binh 757" color="bg-orange-50" border="border-orange-700" isAdmin={isAdmin} content="Lịch sử Trung đoàn 757..." />;

      // Tập con Bài giảng chính trị
      case 'lecture-newbie': return <LectureList title="Bài giảng Chiến sĩ mới (6 bài)" count={6} isAdmin={isAdmin} />;
      case 'lecture-hsq': return <LectureList title="Bài giảng HSQ-CS (12 bài)" count={12} isAdmin={isAdmin} />;

      // Tập con Giải trí
      case 'music-15': return <ContentSection title="15 Bài hát quy định" color="bg-yellow-50" border="border-yellow-600" isAdmin={isAdmin} content="1. Tiến quân ca\n2. Vì nhân dân quên mình\n3. Giải phóng Điện Biên..." />;
      case 'dance-5': return <ContentSection title="5 Điệu vũ quy định" color="bg-purple-50" border="border-purple-700" isAdmin={isAdmin} content="Danh sách 5 điệu vũ tập thể trong Quân đội..." />;

      case 'wise-soldier':
        return (
          <div className="bg-white p-6 rounded-3xl border shadow-sm text-center">
            <h3 className="text-2xl font-black mb-4 uppercase">Chiến sĩ thông thái</h3>
            <iframe src="https://wordwall.net/embed/..." className="w-full h-[500px] rounded-xl border" title="Game"></iframe>
            {isAdmin && <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded-full text-xs font-bold uppercase">Gắn link trò chơi mới</button>}
          </div>
        );

      case 'settings':
        return <SettingsPage username={user?.username} />;

      default:
        return (
          <div className="animate-fadeIn text-center py-10">
            <h2 className="text-2xl md:text-4xl font-black text-green-900 uppercase mb-4">Sổ tay giáo dục chính trị</h2>
            <p className="text-slate-600 text-sm md:text-lg">Chào mừng đồng chí **{user?.username}** đã đăng nhập hệ thống.</p>
          </div>
        );
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setActiveTab} activeTab={activeTab}>
      {renderMainContent()}
    </Layout>
  );
}

// Sub-components
const ContentSection = ({ title, content, color, border, isAdmin }: any) => (
  <div className={`${color} p-5 md:p-10 rounded-3xl border-l-8 ${border} shadow-sm animate-fadeIn`}>
    <div className="flex justify-between items-start mb-6">
      <h3 className="text-lg md:text-2xl font-black uppercase text-slate-800 leading-tight">{title}</h3>
      {isAdmin && <button className="bg-yellow-500 text-[10px] font-bold px-3 py-1 rounded shadow-sm uppercase">Sửa</button>}
    </div>
    <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line text-justify">{content}</p>
  </div>
);

const LectureList = ({ title, count, isAdmin }: any) => (
  <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
    <h3 className="text-xl font-black text-green-900 mb-6 uppercase border-b pb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center hover:bg-green-50 cursor-pointer transition-all border border-transparent hover:border-green-200">
          <span className="font-bold text-slate-700 text-sm md:text-base italic">Bài {i + 1}: Nội dung bài giảng chính trị số {i + 1}</span>
          <button className="text-green-700 font-bold text-xs uppercase">Xem</button>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = ({ username }: any) => (
  <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 animate-fadeIn">
    <h3 className="text-xl font-black uppercase border-b pb-4 text-slate-800">Cài đặt hệ thống</h3>
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase text-slate-400">Thay đổi tên người dùng</label>
        <input type="text" defaultValue={username} className="p-4 bg-slate-50 border rounded-2xl focus:ring-2 ring-green-600 outline-none text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase text-slate-400">Cập nhật mật khẩu</label>
        <input type="password" placeholder="********" className="p-4 bg-slate-50 border rounded-2xl focus:ring-2 ring-green-600 outline-none text-sm" />
      </div>
      <button className="bg-green-800 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs">Lưu thay đổi</button>
    </div>
  </div>
);

export default App;
