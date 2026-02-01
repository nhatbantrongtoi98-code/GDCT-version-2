import React, { useState } from 'react';
// Sửa đường dẫn import khớp 100% với ảnh cấu trúc thư mục của đồng chí
import LoginView from './views/LoginView'; 
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
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Hàm hiển thị nội dung động dựa trên Tab được chọn từ Sidebar
  const renderMainContent = () => {
    switch (activeTab) {
      case 'history-vn':
        return (
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 animate-fadeIn text-justify">
            <h3 className="text-2xl font-black text-red-700 mb-6 uppercase border-l-8 border-red-700 pl-6">
              Lịch sử Quân đội nhân dân Việt Nam
            </h3>
            <div className="text-slate-700 leading-[1.8] space-y-4 whitespace-pre-line text-lg">
              Quân đội nhân dân Việt Nam là lực lượng nòng cốt của lực lượng vũ trang nhân dân Việt Nam, đội quân từ nhân dân mà ra, vì nhân dân mà phục vụ. Được Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh sáng lập, giáo dục và rèn luyện, trải qua hơn 80 năm xây dựng, chiến đấu và trưởng thành...
            </div>
          </div>
        );
      case 'tradition':
        return (
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 animate-fadeIn text-justify">
            <h3 className="text-2xl font-black text-green-800 mb-6 uppercase border-l-8 border-green-800 pl-6">
              Truyền thống đơn vị quyết thắng
            </h3>
            <div className="text-slate-700 leading-[1.8] space-y-4 whitespace-pre-line text-lg">
              Đơn vị chúng ta với bề dày lịch sử vẻ vang, luôn hoàn thành xuất sắc mọi nhiệm vụ được giao. Phát huy truyền thống "Đoàn kết, tự lực, tự cường, khắc phục khó khăn", cán bộ chiến sĩ luôn vững vàng tay súng, xứng danh Bộ đội Cụ Hồ trong thời kỳ mới...
            </div>
          </div>
        );
      case 'bai-giang':
        return (
          <div className="max-w-4xl mx-auto text-center py-20 animate-fadeIn bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="text-slate-400 font-bold uppercase tracking-widest text-lg">
              📚 Nội dung bài giảng đang được cập nhật...
            </div>
          </div>
        );
      default: // Trang chủ (dashboard)
        return (
          <div className="max-w-4xl mx-auto mt-10 animate-fadeIn">
            <h2 className="text-3xl font-black text-center text-[#1a2e12] uppercase tracking-widest mb-2">
              SỔ TAY GIÁO DỤC CHÍNH TRỊ ĐIỆN TỬ
            </h2>
            <div className="h-1.5 w-24 bg-red-600 mx-auto mb-12 rounded-full shadow-sm" />
            
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-800 rounded-3xl flex items-center justify-center mb-8 shadow-lg rotate-3">
                <Trophy className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-black text-green-900 uppercase mb-4 tracking-tight">Hệ thống giáo dục chính trị</h3>
              <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                Chào mừng đồng chí **{user?.displayName}**. Hãy chọn các chuyên mục bên trái để bắt đầu nghiên cứu và học tập.
              </p>
            </div>
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

const Trophy = ({ size, className }: { size: number, className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

export default App;
