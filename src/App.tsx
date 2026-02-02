import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContentView from './views/MainContentView';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Trang mặc định
  const [user, setUser] = useState({ username: 'chiensi123', role: 'user' }); // Giả lập user

  const isAdmin = user.username === 'admin123';

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* 1. Thanh Sidebar bên trái */}
      <Sidebar 
        onNavigate={(id: string) => setActiveTab(id)} 
        activeTab={activeTab}
        username={user.username}
        onLogout={() => alert('Đăng xuất')}
      />

      {/* 2. Nội dung chính bên phải */}
      <main className="flex-1 p-6 md:p-10 lg:ml-72 transition-all">
        <MainContentView activeTab={activeTab} isAdmin={isAdmin} />
      </main>
    </div>
  );
};

export default App;
