import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { 
  Settings, User, Camera, Save, Layout as LayoutIcon, 
  Trophy, BookOpen, Star, Gamepad2 
} from 'lucide-react';

// --- 1. CẤU HÌNH FIREBASE ---
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

// Import các thành phần
import { AppData, UserAccount } from './types';
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
  const [appData, setAppData] = useState<AppData>(INITIAL_DATA);

  // --- ĐỒNG BỘ DỮ LIỆU THỜI GIAN THỰC ---
  useEffect(() => {
    const dataRef = ref(db, 'military_app_data/content');
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAppData(data);
        console.log("Dữ liệu toàn hệ thống đã cập nhật!");
      } else {
        // Nếu Cloud trống, đẩy dữ liệu gốc lên lần đầu vào nhánh content
        set(ref(db, 'military_app_data/content'), INITIAL_DATA);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- HÀM LƯU TỔNG LỰC LÊN CLOUD ---
  const saveToCloud = async (newData: AppData) => {
    try {
      // Đẩy toàn bộ cục newData lên nhánh content
      await set(ref(db, 'military_app_data/content'), newData);
      console.log("Đã đồng bộ mọi thay đổi lên Cloud!");
    } catch (error) {
      console.error("Lỗi đồng bộ Cloud:", error);
    }
  };

  // --- CÁC HÀM CẬP NHẬT GIAO DIỆN ---
  const updateGlobal = (key: keyof AppData, value: any) => {
    const newData = { ...appData, [key]: value };
    setAppData(newData);
    saveToCloud(newData);
  };

  const updateSection = (key: keyof AppData, title: string, body: string, imageUrl?: string, avatarUrl?: string) => {
    const newData = {
      ...appData,
      [key]: { ...appData[key as keyof AppData] as any, title, body, imageUrl, avatarUrl }
    };
    setAppData(newData);
    saveToCloud(newData);
  };

  const updateTradition = (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => {
    const newData = {
      ...appData,
      tradition: {
        ...appData.tradition,
        [key]: { name, history, imageUrl, avatarUrl }
      }
    };
    setAppData(newData);
    saveToCloud(newData);
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
                    const newData = { ...appData, lectures: { ...appData.lectures, [cat]: newList } };
                    setAppData(newData);
                    saveToCloud(newData);
                  }} 
                />
              } />
              <Route path="/entertainment" element={
                <EntertainmentView 
                  data={appData} 
                  isAdmin={isAdmin} 
                  onUpdateEntertainment={(updater) => {
                    const newData = { ...appData, entertainment: updater(appData.entertainment) };
                    setAppData(newData);
                    saveToCloud(newData);
                  }} 
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
