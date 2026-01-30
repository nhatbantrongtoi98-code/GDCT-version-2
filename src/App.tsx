
import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import { User } from './types';

// Import các Views
import HomeView from './views/HomeView';
import HistoryView from './views/HistoryView';
import UnitTraditionView from './views/UnitTraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import WiseSoldierView from './views/WiseSoldierView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogin = (username: string) => {
    setUser({
      username,
      role: username === 'admin123' ? 'admin' : 'user'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderContent = () => {
    if (!user) return null;

    // Phân luồng render các View dựa trên currentPage
    if (currentPage === 'home') return <HomeView user={user} />;
    if (currentPage === 'vpa-history') return <HistoryView user={user} />;
    if (currentPage === 'wise-soldier') return <WiseSoldierView user={user} />;
    
    // Trang truyền thống đơn vị (tập con)
    if (currentPage.startsWith('unit-')) {
      return <UnitTraditionView user={user} currentPage={currentPage} />;
    }

    // Trang bài giảng (tập con)
    if (currentPage.startsWith('lectures-')) {
      return <LecturesView user={user} currentPage={currentPage} />;
    }

    // Trang giải trí (tập con)
    if (currentPage === 'songs' || currentPage === 'dances') {
      return <EntertainmentView user={user} currentPage={currentPage} />;
    }

    // Trang cài đặt (tập con)
    if (currentPage.startsWith('settings-')) {
      return <SettingsView user={user} currentPage={currentPage} />;
    }

    // Default Fallback
    return (
      <div className="p-12 text-center h-full flex flex-col items-center justify-center bg-stone-100">
        <h2 className="text-2xl font-bold text-stone-400">Nội dung đang được cập nhật...</h2>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="mt-4 px-6 py-2 bg-[#DA251D] text-white rounded-full font-bold hover:bg-red-700 transition-colors"
        >
          Quay về trang chủ
        </button>
      </div>
    );
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

