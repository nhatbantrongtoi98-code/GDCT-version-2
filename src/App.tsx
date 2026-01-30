import React, { useState } from 'react';
import LoginView from './views/login-view'; 
import Layout from './components/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{displayName: string} | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser({ displayName: username });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Nội dung trang chủ
  const Dashboard = () => (
    <div className="max-w-4xl mx-auto mt-10 animate-fadeIn">
      <h2 className="text-3xl font-black text-center text-[#1a2e12] uppercase tracking-widest mb-2">
        Sổ tay giáo dục chính trị điện tử
      </h2>
      <div className="h-1 w-24 bg-red-600 mx-auto mb-12 rounded-full" />
      
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-800 rounded-3xl flex items-center justify-center mb-8 shadow-lg rotate-3">
          <Trophy className="text-white" size={40} />
        </div>
        <h3 className="text-2xl font-black text-green-900 uppercase mb-4">Hệ thống giáo dục chính trị</h3>
        <p className="text-slate-600 text-lg max-w-md leading-relaxed">
          Chào mừng đồng chí **{user?.displayName}**. Hãy chọn các chuyên mục bên trái để bắt đầu nghiên cứu và học tập.
        </p>
      </div>
    </div>
  );

  const ContentPage = (title: string, body: string, color: string) => (
    <div className="max-w-4xl mx-auto mt-6 animate-fadeIn">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className={`text-2xl font-black ${color} mb-6 uppercase tracking-tight border-l-8 pl-6`}>
          {title}
        </h3>
        <div className="text-slate-700 leading-[1.8] text-justify space-y-4 whitespace-pre-line text-lg">
          {body}
        </div>
      </div>
    </div>
  );

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setActiveTab} activeTab={activeTab}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'history-vn' && ContentPage(
        "Lịch sử Quân đội nhân dân Việt Nam",
        "Quân đội nhân dân Việt Nam là lực lượng nòng cốt của lực lượng vũ trang nhân dân Việt Nam, đội quân từ nhân dân mà ra, vì nhân dân mà phục vụ...",
        "text-red-700 border-red-700"
      )}
      {activeTab === 'tradition' && ContentPage(
        "Truyền thống đơn vị quyết thắng",
        "Đơn vị chúng ta với bề dày lịch sử vẻ vang, luôn hoàn thành xuất sắc mọi nhiệm vụ được giao, xứng danh bộ đội Cụ Hồ...",
        "text-green-800 border-green-800"
      )}
      {activeTab === 'bai-giang' && <div className="p-20 text-center font-bold text-slate-400 uppercase">Đang cập nhật bài giảng...</div>}
    </Layout>
  );
}

// Icon cho Dashboard
const Trophy = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

export default App;
