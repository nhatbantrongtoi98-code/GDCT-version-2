import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Types & Data
import { AppData, UserAccount } from './types';
import { INITIAL_DATA } from './data/initialData';

// Import Components
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import AIAssistant from './components/AIAssistant';

// Import Views
import HomeView from './views/HomeView';
import GameView from './views/GameView';
// (Đồng chí hãy import thêm các View khác sau khi đã tách file)

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('military_current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('military_app_data_v7');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  // Lưu dữ liệu khi có thay đổi
  useEffect(() => {
    localStorage.setItem('military_app_data_v7', JSON.stringify(appData));
  }, [appData]);

  useEffect(() => {
    if (currentUser) localStorage.setItem('military_current_user_v7', JSON.stringify(currentUser));
    else localStorage.removeItem('military_current_user_v7');
  }, [currentUser]);

  if (!currentUser) {
    return <AuthScreen data={appData} onLogin={setCurrentUser} />;
  }

  return (
    <Router>
      <div 
        className="min-h-screen"
        style={{ backgroundImage: `url(${appData.globalBackground})`, backgroundSize: 'cover' }}
      >
        <div className="bg-white/95 min-h-screen backdrop-blur-sm">
          <Layout 
            currentUser={currentUser} 
            appName={appData.appName} 
            appLogo={appData.appLogo} 
            playlist={appData.backgroundPlaylist}
            onLogout={() => setCurrentUser(null)}
          >
            <Routes>
              <Route path="/" element={<HomeView data={appData} isAdmin={currentUser.role === 'admin'} />} />
              <Route path="/game" element={<GameView data={appData} isAdmin={currentUser.role === 'admin'} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <AIAssistant appLogo={appData.appLogo} />
        </div>
      </div>
    </Router>
  );
};

export default App;
