import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import { User } from './types';

// Import các Views - Đảm bảo các file này tồn tại trong src/views/
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

  // Khôi phục logic: Nhận string từ Login.tsx
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

    if (currentPage === 'home') return <HomeView user={user} />;
    if (currentPage === 'vpa-history') return <HistoryView user={user} />;
    if (currentPage === 'wise-soldier') return <WiseSoldierView user={user} />;
    
    if (currentPage.startsWith('unit-')) {
      return <UnitTraditionView user={user} currentPage={currentPage} />;
    }

    if (currentPage.startsWith('lectures-')) {
      return <LecturesView user={user} currentPage={currentPage} />;
    }

    if (currentPage === 'songs' || currentPage === 'dances') {
      return <EntertainmentView user={user} currentPage={currentPage} />;
    }

    if (currentPage.startsWith('settings-')) {
      return <SettingsView user={user} currentPage={currentPage} />;
    }

    return (
      <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-stone-400 uppercase">Nội dung đang cập nhật</h2>
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
