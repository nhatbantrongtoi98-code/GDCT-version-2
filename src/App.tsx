import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import các thành phần
import { AppData, UserAccount, BackgroundMusic } from './types';
import { INITIAL_DATA } from './data/initialData';
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import AIAssistant from './components/AIAssistant';

// Import các khung nhìn
import HomeView from './views/HomeView';
import HistoryVNView from './views/HistoryVNView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import GameView from './views/GameView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  // 1. Khởi tạo người dùng
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('military_current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Khởi tạo dữ liệu ứng dụng
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('military_app_data_v7');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  // 3. Tự động lưu dữ liệu
  useEffect(() => {
    try {
      localStorage.setItem('military_app_data_v7', JSON.stringify(appData));
    } catch (e) {
      console.error("LocalStorage bị tràn! Hãy xóa bớt nhạc hoặc ảnh cũ.");
      alert("Bộ nhớ trình duyệt đã đầy! Đồng chí vui lòng xóa bớt nhạc hoặc ảnh cũ để lưu dữ liệu mới.");
    }
  }, [appData]);

  useEffect(() => {
    if (currentUser) localStorage.setItem('military_current_user_v7', JSON.stringify(currentUser));
    else localStorage.removeItem('military_current_user_v7');
  }, [currentUser]);

  // --- CÁC HÀM CẬP NHẬT DỮ LIỆU ---

  const updateGlobal = (key: keyof AppData, value: any) => {
    setAppData(prev => ({ ...prev, [key]: value }));
  };

  const updateSection = (key: keyof AppData, title: string, body: string, imageUrl?: string, avatarUrl?: string) => {
    setAppData(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof AppData] as any, title, body, imageUrl, avatarUrl }
    }));
  };

  const updateTradition = (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => {
    setAppData(prev => ({
      ...prev,
      tradition: {
        ...prev.tradition,
        [key]: { name, history, imageUrl, avatarUrl }
      }
    }));
  };

  if (!currentUser) return <AuthScreen data={appData} onLogin={setCurrentUser} />;

  const isAdmin = currentUser.role === 'admin';

  return (
    <Router>
      <div 
        className="min-h-screen transition-all duration-500" 
        style={{ 
          backgroundImage: appData.globalBackground ? `url(${appData.globalBackground})` : 'none', 
          backgroundColor: '#f8fafc',
          backgroundSize: 'cover', 
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-white/90 min-h-screen backdrop-blur-md">
          <Layout 
            playlist={appData.backgroundPlaylist} 
            currentUser={currentUser} 
            appName={appData.appName} 
            appLogo={appData.appLogo} 
            onLogout={() => setCurrentUser(null)}
          >
            <Routes>
              <Route path="/" element={
                <HomeView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdate={updateSection} 
                  onUpdateGlobal={updateGlobal}
                  onUpdatePlaylist={(list) => updateGlobal('backgroundPlaylist', list)}
                />
              } />
              <Route path="/history" element={<HistoryVNView data={appData} isAdmin={isAdmin} onUpdate={updateSection} />} />
              <Route path="/tradition" element={<TraditionView data={appData} isAdmin={isAdmin} onUpdate={updateTradition} />} />
              <Route path="/lectures" element={
                <LecturesView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdateLecture={(cat, id, title, poster) => {
                    const category = cat as keyof typeof appData.lectures;
                    const newList = appData.lectures[category].map(l => 
                      l.id === id ? { ...l, title, posterUrl: poster } : l
                    );
                    setAppData(prev => ({ ...prev, lectures: { ...prev.lectures, [cat]: newList } }));
                  }} 
                />
              } />
              <Route path="/entertainment" element={
                <EntertainmentView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdateEntertainment={(updater) => setAppData(prev => ({ ...prev, entertainment: updater(prev.entertainment) }))} 
                />
              } />
              <Route path="/game" element={<GameView data={appData} isAdmin={isAdmin} />} />
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
