import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login'; // Đảm bảo tệp là Login.tsx (L viết hoa)

// Import các trang nội dung hiện tại của đồng chí
import HomeView from './views/HomeView';
import HistoryView from './views/HistoryView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import GameView from './views/GameView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  // Logo và Thông tin mặc định như ban đầu
  const appName = "HỆ THỐNG GIÁO DỤC CHÍNH TRỊ";
  const appLogo = "https://upload.wikimedia.org/wikipedia/vi/1/1a/Logo_Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.svg";

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <Layout 
        currentUser={user} 
        appName={appName} 
        appLogo={appLogo}
        playlist={[]} // Trả về mảng rỗng như ban đầu
        onLogout={() => setUser(null)}
      >
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/tradition" element={<TraditionView />} />
          <Route path="/lectures" element={<LecturesView />} />
          <Route path="/entertainment" element={<EntertainmentView />} />
          <Route path="/game" element={<GameView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
