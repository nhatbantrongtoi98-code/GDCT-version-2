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

  // Điều phối hiển thị nội dung theo yêu cầu
  const renderMainContent = () => {
    switch (activeTab) {
      // 1. TRANG CHỦ
      case 'dashboard':
        return (
          <div className="text-center py-12 animate-fadeIn">
            <h1 className="text-3xl md:text-5xl font-black text-green-950 mb-6 uppercase tracking-tighter">SỔ TAY GIÁO DỤC CHÍNH TRỊ</h1>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl inline-block border border-green-100">
              <p className="text-lg text-slate-600 font-medium">Chào mừng đồng chí **{user?.username}**</p>
              <p className="text-xs text-slate-400 mt-2 italic uppercase tracking-widest">Hệ thống tra cứu học tập quân đội</p>
            </div>
          </div>
        );

      // 2. LỊCH SỬ QĐND VN
      case 'history-vn':
        return <ContentPage title="Lịch sử Quân đội nhân dân Việt Nam" isAdmin={isAdmin} bg="bg-red-50" border="border-red-700" />;

      // 3. LỊCH SỬ TRUYỀN THỐNG ĐƠN VỊ (TẬP CON)
      case 'tradition-thudo': return <ContentPage title="Truyền thống LLVT Thủ đô" isAdmin={isAdmin} bg="bg-blue-50" border="border-blue-800" />;
      case 'tradition-301': return <ContentPage title="Truyền thống Sư đoàn Bộ binh 301" isAdmin={isAdmin} bg="bg-green-50" border="border-green-800" />;
      case 'tradition-59': return <ContentPage title="Truyền thống Trung đoàn Bộ binh 59" isAdmin={isAdmin} bg="bg-stone-50" border="border-stone-800" />;
      case 'tradition-692': return <ContentPage title="Truyền thống Trung đoàn Bộ binh 692" isAdmin={isAdmin} bg="bg-emerald-50" border="border-emerald-800" />;
      case 'tradition-757': return <ContentPage title="Truyền thống Trung đoàn Bộ binh 757" isAdmin={isAdmin} bg="bg-orange-50" border="border-orange-800" />;

      // 4. HỆ THỐNG BÀI GIẢNG CHÍNH TRỊ (MỞ PHẦN NÀO XEM PHẦN ĐÓ)
      case 'lecture-newbie': return <LectureGrid title="Bài giảng Chiến sĩ mới (6 bài)" count={6} isAdmin={isAdmin} />;
      case 'lecture-hsq': return <LectureGrid title="Bài giảng HSQ-CS (12 bài)" count={12} isAdmin={isAdmin} />;

      // 5. GÓC GIẢI TRÍ
      case 'music-15': return <ListPage title="15 Bài hát quy định" count={15} isAdmin={isAdmin} />;
      case 'dance-5': return <ListPage title="5 Điệu vũ mở rộng" count={5} isAdmin={isAdmin} />;

      // 6. CHIẾN SĨ THÔNG THÁI
      case 'wise-soldier':
        return (
          <div className="bg-white p-6 rounded-3xl h-[70vh] flex flex-col items-center justify-center border shadow-sm">
            <h3 className="text-xl font-black mb-6 uppercase text-green-900">Chiến sĩ thông thái</h3>
            <div className="w-full max-w-2xl h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center">
              <p className="italic text-slate-400 mb-4">Admin chưa gắn link trò chơi Wordwall/Kahoot</p>
              {isAdmin && <button className="bg-red-700 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Gắn link ngay</button>}
            </div>
          </div>
        );

      // 7. CÀI ĐẶT
      case 'settings':
        return <SettingsSection user={user} />;

      default: return null;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setActiveTab} activeTab={activeTab}>
      <div className="max-w-6xl mx-auto">
        {renderMainContent()}
      </div>
    </Layout>
  );
}

// COMPONENT HIỂN THỊ NỘI DUNG VĂN BẢN
const ContentPage = ({ title, isAdmin, bg, border }: any) => (
  <div className={`${bg} p-8 md:p-12 rounded-[2.5rem] border-l-[12px] ${border} shadow-sm animate-fadeIn`}>
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-800">{title}</h2>
      {isAdmin && <button className="bg-yellow-500 text-[10px] font-black px-4 py-2 rounded-xl shadow-md uppercase">Chỉnh sửa</button>}
    </div>
    <div className="text-slate-700 text-base md:text-lg leading-[2] text-justify space-y-4">
      <p>Nội dung chi tiết về lịch sử và truyền thống của {title} sẽ được cập nhật tại đây. Chế độ hiển thị tối ưu cho việc đọc trên cả thiết bị di động và máy tính...</p>
    </div>
  </div>
);

// COMPONENT HIỂN THỊ DANH SÁCH BÀI GIẢNG (GRID)
const LectureGrid = ({ title, count, isAdmin }: any) => (
  <div className="animate-fadeIn">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-black uppercase text-slate-800 border-b-4 border-red-700 pb-2">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
          <div className="text-red-700 font-black mb-3 italic uppercase text-[10px] tracking-widest">Học phần {i + 1}</div>
          <div className="font-bold text-slate-800 group-hover:text-green-800 text-base mb-6 leading-tight">Nội dung bài giảng chính trị chuyên đề số {i + 1}</div>
          <button className="w-full bg-slate-100 group-hover:bg-green-900 group-hover:text-white text-slate-500 py-3 rounded-2xl text-[11px] font-black uppercase transition-colors">Vào bài học</button>
        </div>
      ))}
    </div>
  </div>
);

// COMPONENT DANH SÁCH BÀI HÁT/ĐIỆU VŨ
const ListPage = ({ title, count, isAdmin }: any) => (
  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-50 animate-fadeIn">
    <h2 className="text-2xl font-black uppercase mb-10 text-center">{title}</h2>
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 hover:bg-green-50 rounded-2xl border border-transparent hover:border-green-100 transition-all group">
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 bg-green-900 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md">{i + 1}</span>
            <span className="font-bold text-slate-700 uppercase text-xs md:text-sm">Nội dung văn hóa nghệ thuật số {i + 1}</span>
          </div>
          <button className="text-[10px] font-black text-green-800 uppercase group-hover:underline">Xem chi tiết</button>
        </div>
      ))}
    </div>
  </div>
);

// TRANG CÀI ĐẶT
const SettingsSection = ({ user }: any) => (
  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl max-w-2xl mx-auto animate-fadeIn border border-slate-50">
    <h2 className="text-xl font-black uppercase mb-10 text-slate-800 border-l-4 border-green-800 pl-4">Cài đặt hệ thống</h2>
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thay đổi tên hiển thị</label>
        <input type="text" defaultValue={user?.username} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-4 ring-green-800/10 focus:border-green-800 font-bold" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cập nhật mật khẩu</label>
        <input type="password" placeholder="********" className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-green-800" />
      </div>
      <div className="pt-4 space-y-3">
        <button className="w-full bg-green-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-green-900/20">Lưu thay đổi</button>
        <button className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Chỉnh sửa giao diện (UI)</button>
      </div>
    </div>
  </div>
);

export default App;
