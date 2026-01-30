import React, { useState } from 'react';
import LoginView from './views/LoginView'; 
import Layout from './components/Layout';
import { INITIAL_DATA } from './constants';
import { User as UserType } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  
  // Quản lý mục đang được chọn
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser({ id: '1', username, role: 'user', displayName: username });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Hàm quyết định nội dung gì sẽ hiển thị ở vùng chính
  const renderMainContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 animate-fadeIn">
            <h3 className="text-2xl font-black text-green-900 mb-4 uppercase">{INITIAL_DATA.intro.title}</h3>
            <p className="text-stone-700 leading-relaxed whitespace-pre-line text-justify">{INITIAL_DATA.intro.body}</p>
          </div>
        );
      case 'history-vn':
        return (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 animate-fadeIn text-justify">
            <h3 className="text-2xl font-black text-red-700 mb-4 uppercase">{INITIAL_DATA.historyVN.title}</h3>
            <p className="text-stone-700 leading-relaxed whitespace-pre-line">{INITIAL_DATA.historyVN.body}</p>
          </div>
        );
      case 'tradition':
        return (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 animate-fadeIn text-justify">
            <h3 className="text-2xl font-black text-yellow-600 mb-4 uppercase">{INITIAL_DATA.tradition.title}</h3>
            <p className="text-stone-700 leading-relaxed whitespace-pre-line">{INITIAL_DATA.tradition.body}</p>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-green-500/10">
              <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🎖️</span>
              </div>
              <h3 className="font-black text-green-900 text-xl mb-3 uppercase tracking-tight">Hệ thống giáo dục chính trị</h3>
              <p className="text-stone-600 leading-relaxed">
                Chào mừng đồng chí **{user?.displayName}**. Hãy chọn các chuyên mục bên trái để bắt đầu nghiên cứu và học tập.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={setActiveTab} // Truyền hàm đổi tab xuống Sidebar
      activeTab={activeTab}      // Truyền tab hiện tại để Sidebar biết mục nào đang chọn
    >
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-green-950 uppercase tracking-widest">
            {INITIAL_DATA.appName}
          </h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full" />
        </header>

        {/* Đây là nơi nội dung thay đổi khi click Sidebar */}
        {renderMainContent()}
      </div>
    </Layout>
  );
}

export default App;
