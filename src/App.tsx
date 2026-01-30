import React, { useState } from 'react';
import Login from './views/Login';
import Layout from './components/Layout';

// Import các Views từ thư mục src/views/
import HomeView from './views/HomeView';
import HistoryView from './views/HistoryVNView';
import UnitTraditionView from './views/UnitTraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import WiseSoldierView from './views/WiseSoldierView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
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
    
    switch (currentPage) {
      case 'home': return <HomeView user={user} />;
      case 'vpa-history': return <HistoryView user={user} />;
      case 'wise-soldier': return <WiseSoldierView user={user} />;
      case 'songs':
      case 'dances': return <EntertainmentView user={user} currentPage={currentPage} />;
      default:
        if (currentPage.startsWith('unit-')) return <UnitTraditionView user={user} currentPage={currentPage} />;
        if (currentPage.startsWith('lectures-')) return <LecturesView user={user} currentPage={currentPage} />;
        if (currentPage.startsWith('settings-')) return <SettingsView user={user} currentPage={currentPage} />;
        return (
          <div className="p-10 text-center flex flex-col items-center justify-center">
             <h2 className="text-xl font-bold text-gray-400">NỘI DUNG ĐANG CẬP NHẬT</h2>
          </div>
        );
    }
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Layout user={user} onLogout={handleLogout} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderContent()}
    </Layout>
  );
};

export default App;
