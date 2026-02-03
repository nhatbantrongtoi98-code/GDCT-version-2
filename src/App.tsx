import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
// Bỏ dấu ngoặc nhọn để hết lỗi Build, giữ nguyên đường dẫn cũ
import MainContentView from './views/MainContentView'; 
import { Menu } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subPage, setSubPage] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [user] = useState({ username: 'chiensi123', role: 'user' });

  const handleNavigate = (page: string, sub?: string) => {
    setActiveTab(page);
    setSubPage(sub);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden relative">
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-[60] p-3 bg-green-900 text-yellow-400 rounded-xl shadow-2xl border border-yellow-600/50 hover:scale-105 active:scale-95 transition-all"
        >
          <Menu size={24} />
        </button>
      )}

      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onNavigate={handleNavigate}
        activeTab={activeTab}
        username={user.username}
        onLogout={() => {}}
      />

      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>
        <div className="p-4 md:p-8 pt-20 lg:pt-8">
          {/* Trả về đúng 3 biến gốc: page, subPage, user */}
          <MainContentView page={activeTab as any} subPage={subPage as any} user={user as any} />
        </div>
      </main>
    </div>
  );
};

export default App;
