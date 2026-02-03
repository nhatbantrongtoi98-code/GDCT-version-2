import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
// SỬA DÒNG NÀY: Bỏ dấu ngoặc nhọn để hết lỗi build
import MainContentView from './views/MainContentView'; 
import { Menu } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subPage, setSubPage] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Dữ liệu giả định người dùng, role admin sẽ hiện nút sửa
  const [user] = useState({ username: 'chiensi123', role: 'admin' });

  const handleNavigate = (page: string, sub?: string) => {
    setActiveTab(page);
    setSubPage(sub);
    // Tự động đóng sidebar trên mobile khi chọn menu
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden relative">
      {/* Nút 3 gạch (Hiện khi Sidebar đóng) */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-[60] p-3 bg-green-900 text-yellow-400 rounded-xl shadow-2xl border border-yellow-600/50 hover:scale-105 active:scale-95 transition-all"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onNavigate={handleNavigate}
        activeTab={activeTab}
        username={user.username}
        onLogout={() => {}}
      />

      {/* Nội dung chính */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
        <div className="p-4 md:p-8 pt-20 lg:pt-8">
          {/* Truyền đúng props vào MainContentView */}
          <MainContentView 
            activeTab={activeTab} 
            isAdmin={user.role === 'admin'} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
