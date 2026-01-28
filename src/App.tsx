import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { 
  Shield, User, Camera, Save, Layout as LayoutIcon, 
  Trophy, BookOpen, Star, Gamepad2 
} from 'lucide-react';

const firebaseConfig = {
  apiKey: "AIzaSyA_E7R1Pgbb3PxdJ4iw_iFWxE1VHYCnU8U",
  authDomain: "gdct-9b57d.firebaseapp.com",
  databaseURL: "https://gdct-9b57d-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "gdct-9b57d",
  storageBucket: "gdct-9b57d.firebasestorage.app",
  messagingSenderId: "818099040678",
  appId: "1:818099040678:web:dd8601e6250c96ec415f67",
  measurementId: "G-9MSSR1LKNT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

import { AppData, UserAccount } from './types';
import { INITIAL_DATA } from './data/initialData';
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import AIAssistant from './components/AIAssistant';
import HomeView from './views/HomeView';
import HistoryVNView from './views/HistoryVNView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import GameView from './views/GameView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('military_current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  const [appData, setAppData] = useState<AppData>(INITIAL_DATA);

  useEffect(() => {
    const dataRef = ref(db, 'military_app_data');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setAppData(data);
    });
    return () => unsubscribe();
  }, []);
  
// 1. Cập nhật lại logic đồng bộ để chạy mượt mà trên cùng 1 tab
// CHỈ GIỮ LẠI MỘT ĐOẠN DUY NHẤT NÀY
useEffect(() => {
  const syncUser = () => {
    const savedUser = localStorage.getItem('military_current_user_v7');
    const savedDisplayName = localStorage.getItem('user_display_name');
    const savedAvatar = localStorage.getItem('user_avatar');

    if (savedUser) {
      const user = JSON.parse(savedUser);
      
      // 1. Tạo đối tượng user mới nhất từ các nguồn lưu trữ
      const updatedUser = {
        ...user,
        name: savedDisplayName || user.name,
        avatar: savedAvatar || user.avatar
      };

      // 2. Cập nhật State để Sidebar/Layout thay đổi ngay lập tức
      setCurrentUser(updatedUser);
      
      // 3. Ghi đè lại khóa chính để dữ liệu luôn đồng nhất khi F5
      localStorage.setItem('military_current_user_v7', JSON.stringify(updatedUser));
    }
  };

  // Đăng ký các sự kiện lắng nghe
  window.addEventListener('storage', syncUser);
  window.addEventListener('user-data-updated', syncUser);

  // Hủy đăng ký khi component bị unmount để tránh rò rỉ bộ nhớ
  return () => {
    window.removeEventListener('storage', syncUser);
    window.removeEventListener('user-data-updated', syncUser);
  };
}, []); // Chạy 1 lần duy nhất khi khởi tạo
  const saveToCloud = async (newData: AppData) => {
    try {
      await set(ref(db, 'military_app_data'), newData);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const updateGlobal = (key: keyof AppData, value: any) => {
    const newData = { ...appData, [key]: value };
    setAppData(newData);
    saveToCloud(newData);
  };

  const updateSection = (key: keyof AppData, title: string, body: string, imageUrl?: string) => {
    const newData = {
      ...appData,
      [key]: { ...appData[key as keyof AppData] as any, title, body, imageUrl }
    };
    setAppData(newData);
    saveToCloud(newData);
  };

  const updateTradition = (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => {
    const newData = {
      ...appData,
      tradition: { ...appData.tradition, [key]: { name, history, imageUrl, avatarUrl } }
    };
    setAppData(newData);
    saveToCloud(newData);
  };

  if (!currentUser) return <AuthScreen data={appData} onLogin={setCurrentUser} />;
  const isAdmin = currentUser.role === 'admin';

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundImage: appData.globalBackground ? `url(${appData.globalBackground})` : 'none', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div className="bg-white/90 min-h-screen backdrop-blur-md">
          <Layout playlist={appData.backgroundPlaylist} currentUser={currentUser} appName={appData.appName} appLogo={appData.appLogo} onLogout={() => {
  localStorage.removeItem('military_current_user_v7');
  setCurrentUser(null);
}>
            <Routes>
              <Route path="/" element={<HomeView data={appData} isAdmin={isAdmin} onUpdate={updateSection} onUpdateGlobal={updateGlobal} onUpdatePlaylist={(list) => updateGlobal('backgroundPlaylist', list)} />} />
              <Route path="/history" element={<HistoryVNView data={appData} isAdmin={isAdmin} onUpdate={updateSection} />} />
              <Route path="/tradition" element={<TraditionView data={appData} isAdmin={isAdmin} onUpdate={updateTradition} />} />
              {/* Tìm đoạn /lectures và thay bằng đoạn này */}
<Route 
  path="/lectures" 
  element={
    <LecturesView 
      data={appData} 
      isAdmin={isAdmin} 
      onUpdateGlobal={updateGlobal} 
    />
  } 
/>
              <Route path="/entertainment" element={<EntertainmentView data={appData} isAdmin={isAdmin} onUpdateEntertainment={(updater) => {
                const newData = { ...appData, entertainment: updater(appData.entertainment) };
                setAppData(newData);
                saveToCloud(newData);
              }} />} />
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
