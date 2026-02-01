import React, { useState } from 'react';
import LoginView from './views/LoginView'; 
import Layout from './components/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{username: string, role: string} | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser({ username, role: username === 'admin123' ? 'admin' : 'user' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) return <LoginView onLogin={handleLogin} />;

  const isAdmin = user?.role === 'admin';

  // Component render nội dung chuẩn cho các tập con
  const renderMainContent = () => {
    switch (activeTab) {
      // TRANG CHỦ
      case 'dashboard':
        return (
          <div className="text-center py-12 animate-fadeIn">
            <h1 className="text-3xl md:text-5xl font-black text-green-950 mb-6 uppercase tracking-tighter">SỔ TAY GIÁO DỤC CHÍNH TRỊ</h1>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl inline-block border border-green-100">
              <p className="text-lg text-slate-600">Chào mừng đồng chí **{user?.username}**</p>
              <p className="text-sm text-slate-400 mt-2 italic">Ứng dụng hỗ trợ tra cứu và học tập chính trị dành riêng cho quân nhân</p>
            </div>
          </div>
        );

      // LỊCH SỬ TRUYỀN THỐNG ĐƠN VỊ (CÁC TẬP CON)
      case 'tradition-thudo': return <ContentPage title="Truyền thống LLVT Thủ đô" isAdmin={isAdmin} bg="bg-red-50" />;
      case 'tradition-301': return <ContentPage title="Sư đoàn Bộ binh 301" isAdmin={isAdmin} bg="bg-green-50" />;
      case 'tradition-59': return <ContentPage title="Trung đoàn Bộ binh 59" isAdmin={isAdmin} bg="bg-stone-50" />;
      case 'tradition-692': return <ContentPage title="Trung đoàn Bộ binh 692" isAdmin={isAdmin} bg="bg-blue-50" />;
      case 'tradition-757': return <ContentPage title="Trung đoàn Bộ binh 757" isAdmin={isAdmin} bg="bg-orange-50" />;

      // HỆ THỐNG BÀI GIẢNG (KẾ CẤU RIÊNG CHUYÊN NGHIỆP)
      case 'lecture-newbie': return <LectureGrid title="Bài giảng Chiến sĩ mới" count={6} isAdmin={isAdmin} />;
      case 'lecture-hsq': return <LectureGrid title="Bài giảng HSQ-CS" count={12} isAdmin={isAdmin} />;

      // GÓC GIẢI TRÍ
      case 'music-15': return <ListPage title="15 Bài hát quy định" count={15} isAdmin={isAdmin} />;
      case 'dance-5': return <ListPage title="5 Điệu vũ mở rộng" count={5} isAdmin={isAdmin} />;

      case 'wise-soldier':
        return (
          <div className="bg-white p-4 rounded-3xl h-[80vh] flex flex-col items-center justify-center">
            <h3 className="text-xl font-black mb-4">CHIẾN SĨ THÔNG THÁI</h3>
            <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center">
              <p className="italic text-slate-400">Link trò chơi Wordwall/Kahoot sẽ hiển thị tại đây</p>
            </div>
          </div>
        );

      case 'settings':
        return <SettingsSection user={user} />;

      default: return <div className="p-10 text-center uppercase font-bold text-slate-300">Nội dung đang được cập nhật...</div>;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setActiveTab} activeTab={activeTab}>
      {renderMainContent()}
    </Layout>
  );
}

// CÁC COMPONENT GIAO DIỆN CON
const ContentPage = ({ title, isAdmin, bg }: any) => (
  <div className={`${bg} p-8 md:p-12 rounded-[2.5rem] border shadow-sm animate-fadeIn`}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-black uppercase text-green-900 border-l-8 border-red-700 pl-4">{title}</h2>
      {isAdmin && <button className="bg-yellow-500 text-xs font-bold px-4 py-2 rounded-lg">SỬA NỘI DUNG</button>}
    </div>
    <div className="text-slate-700 text-lg leading-relaxed text-justify">
      Nội dung chi tiết về lịch sử và truyền thống của {title} sẽ được hiển thị đầy đủ tại đây...
    </div>
  </div>
);

const LectureGrid = ({ title, count, isAdmin }: any) => (
  <div className="animate-fadeIn">
    <h2 className="text-2xl font-black uppercase mb-8 text-slate-800">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="text-red-700 font-black mb-2 italic uppercase text-xs tracking-tighter">Bài số {i + 1}</div>
          <div className="font-bold text-slate-800 group-hover:text-green-800 transition-colors">Tên bài giảng chính trị chuyên sâu số {i + 1}</div>
          <div className="mt-4 flex justify-between items-center">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hệ thống GDCT</span>
             <button className="bg-green-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Mở bài học</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ListPage = ({ title, count, isAdmin }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 animate-fadeIn">
    <h2 className="text-2xl font-black uppercase mb-8 border-b pb-4">{title}</h2>
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
          <span className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
          <span className="font-bold text-slate-700 uppercase text-sm">Tên nội dung số {i + 1}</span>
        </div>
      ))}
    </div>
  </div>
);

const SettingsSection = ({ user }: any) => (
  <div className="bg-white p-8 rounded-[3rem] shadow-sm max-w-2xl mx-auto">
    <h2 className="text-xl font-black uppercase mb-8">Cài đặt hệ thống</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tên người dùng</label>
        <input type="text" defaultValue={user?.username} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-2 ring-green-800 font-bold" />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mật khẩu mới</label>
        <input type="password" placeholder="********" className="w-full p-4 bg-slate-50 rounded-2xl border outline-none" />
      </div>
      <button className="w-full bg-green-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Cập nhật thông tin</button>
    </div>
  </div>
);

export default App;
