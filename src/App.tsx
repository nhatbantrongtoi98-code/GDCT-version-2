import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Types
import { AppData, UserAccount } from './types';
import { INITIAL_DATA } from './data/initialData';

// Import Components
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import AIAssistant from './components/AIAssistant';

// Import Views
import HomeView from './views/HomeView';
import HistoryVNView from './views/HistoryVNView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import GameView from './views/GameView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  // Logic Quản lý State (Giữ nguyên phần useState/useEffect từ hướng dẫn trước của tôi)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('military_current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('military_app_data_v7');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  // ... (Thêm các hàm updateGlobal, updateSection tại đây)

  if (!currentUser) {
    return <AuthScreen data={appData} onLogin={setCurrentUser} />;
  }

  return (
    <Router>
      <div 
        className="min-h-screen"
        style={{ backgroundImage: `url(${appData.globalBackground})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
      >
        <div className="bg-white/95 min-h-screen backdrop-blur-[2px]">
          <Layout 
            playlist={appData.backgroundPlaylist} 
            currentUser={currentUser} 
            appName={appData.appName} 
            appLogo={appData.appLogo} 
            onLogout={() => setCurrentUser(null)}
          >
            <Routes>
              <Route path="/" element={<HomeView data={appData} isAdmin={currentUser.role === 'admin'} onUpdate={updateSection} onUpdateGlobal={updateGlobal} onUpdatePlaylist={(l) => updateGlobal('backgroundPlaylist', l)} />} />
              <Route path="/history-vn" element={<HistoryVNView data={appData} isAdmin={currentUser.role === 'admin'} onUpdate={updateSection} />} />
              <Route path="/tradition" element={<TraditionView data={appData} isAdmin={currentUser.role === 'admin'} onUpdate={updateTradition} />} />
              <Route path="/lectures" element={<LecturesView data={appData} isAdmin={currentUser.role === 'admin'} onUpdateLecture={updateLecture} />} />
              <Route path="/entertainment" element={<EntertainmentView data={appData} isAdmin={currentUser.role === 'admin'} onUpdateEntertainment={updateEntertainment} />} />
              <Route path="/game" element={<GameView data={appData} isAdmin={currentUser.role === 'admin'} />} />
              <Route path="/settings" element={<SettingsView currentUser={currentUser} onUpdateUser={setCurrentUser} />} />
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
