import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mặc định true để test nhanh
  const [user, setUser] = useState({ username: 'admin123', role: 'admin' });
  const [activeTab, setActiveTab] = useState('dashboard');

  const isAdmin = user.role === 'admin';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="text-center py-16 animate-fadeIn">
            <img src="/vpa-logo.png" className="w-40 h-40 mx-auto mb-8 drop-shadow-2xl" alt="logo" />
            <h1 className="text-4xl md:text-6xl font-black text-red-700 uppercase tracking-tighter mb-4">Sổ tay điện tử</h1>
            <p className="text-green-900 font-bold text-lg md:text-2xl uppercase tracking-[0.3em]">Giáo dục chính trị</p>
          </div>
        );

      case 'history-vn':
        return <ContentCard title="Lịch sử Quân đội nhân dân VN" theme="red" isAdmin={isAdmin} />;

      // TẬP CON TRUYỀN THỐNG ĐƠN VỊ
      case 'tradition-thudo': return <ContentCard title="LLVT Thủ đô Hà Nội" theme="red" isAdmin={isAdmin} />;
      case 'tradition-301': return <ContentCard title="Sư đoàn Bộ binh 301" theme="olive" isAdmin={isAdmin} />;
      case 'tradition-692': return <ContentCard title="Trung đoàn Bộ binh 692" theme="red" isAdmin={isAdmin} />;

      // TẬP CON BÀI GIẢNG
      case 'lecture-newbie': return <LectureGrid title="Bài giảng Chiến sĩ mới" count={6} isAdmin={isAdmin} />;
      case 'lecture-hsq': return <LectureGrid title="Bài giảng HSQ-CS" count={12} isAdmin={isAdmin} />;

      // GIẢI TRÍ
      case 'music-15': return <ListPage title="15 Bài hát quy định" count={15} />;
      case 'dance-5': return <ListPage title="5 Điệu vũ mở rộng" count={5} />;

      case 'settings':
        return (
          <div className="max-w-xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border-t-8 border-red-700">
            <h2 className="text-xl font-black uppercase mb-8 text-slate-800">Cài đặt tài khoản</h2>
            <div className="space-y-6">
              <input type="text" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" placeholder="Tên hiển thị" defaultValue={user.username} />
              <button className="w-full bg-red-700 text-yellow-400 py-4 rounded-2xl font-black uppercase shadow-lg">Lưu cập nhật</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar onNavigate={setActiveTab} activeTab={activeTab} onLogout={() => {}} username={user.username} />
      
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="pt-28 lg:pt-12 pb-20 px-4 lg:px-12 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// COMPONENT CON: THẺ NỘI DUNG (CHỮ TỰ CO GIÃN)
const ContentCard = ({ title, theme, isAdmin }: any) => (
  <div className={`bg-white p-6 lg:p-12 rounded-[2.5rem] shadow-2xl border-t-[12px] animate-fadeIn ${theme === 'red' ? 'border-red-700' : 'border-[#4b5320]'}`}>
    <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
      <h2 className="text-xl lg:text-3xl font-black uppercase text-slate-800 leading-tight">{title}</h2>
      {isAdmin && <button className="bg-yellow-500 text-red-700 text-[10px] font-black px-4 py-2 rounded-lg shadow-md">SỬA</button>}
    </div>
    <div className="text-slate-700 text-base lg:text-lg leading-relaxed text-justify space-y-4 font-medium">
      <p>Nội dung chi tiết sẽ được hiển thị tại đây theo chuẩn văn bản quân đội...</p>
    </div>
  </div>
);

// COMPONENT CON: LƯỚI BÀI GIẢNG (OPEN ON CLICK)
const LectureGrid = ({ title, count, isAdmin }: any) => (
  <div className="animate-fadeIn">
    <h2 className="text-2xl font-black uppercase mb-10 text-red-700 border-l-8 border-yellow-500 pl-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border-b-4 border-red-700 p-6 rounded-3xl shadow-lg hover:scale-[1.02] transition-all cursor-pointer group">
          <div className="text-red-700 font-black mb-2 italic text-[10px]">HỌC PHẦN {i+1}</div>
          <div className="font-bold text-slate-800 text-sm mb-6 h-12 overflow-hidden uppercase">Nội dung bài giảng chính trị số {i + 1}</div>
          <button className="w-full bg-[#1a2e12] text-yellow-500 py-3 rounded-xl text-[10px] font-black uppercase shadow-md">Mở bài học</button>
        </div>
      ))}
    </div>
  </div>
);

// COMPONENT CON: DANH SÁCH GIẢI TRÍ
const ListPage = ({ title, count }: any) => (
  <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl border-b-8 border-yellow-500 animate-fadeIn">
    <h2 className="text-2xl font-black uppercase mb-10 text-center text-red-700 italic">{title}</h2>
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-red-50 rounded-2xl border border-slate-100 transition-all cursor-pointer">
          <span className="w-8 h-8 bg-red-700 text-yellow-400 rounded-lg flex items-center justify-center font-black shadow-md text-xs">{i + 1}</span>
          <span className="font-bold text-slate-700 uppercase text-[11px] lg:text-sm">Nội dung số {i + 1}</span>
        </div>
      ))}
    </div>
  </div>
);

export default App;
