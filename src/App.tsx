import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import { UserAccount } from './types';

// Lưu ý: Đảm bảo các file này đã tồn tại trong thư mục src/views/
// Nếu chưa có, đồng chí có thể tạm thời comment lại
import HomeView from './views/HomeView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);

  const handleLogin = (userData: UserAccount) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout currentUser={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/tradition" element={<TraditionView isAdmin={user.username === 'admin123'} />} />
          <Route path="/lectures" element={<LecturesView isAdmin={user.username === 'admin123'} />} />
          <Route path="/entertainment" element={<EntertainmentView />} />
          <Route path="/settings" element={<SettingsView currentUser={user} />} />
          {/* Trang mặc định khi không tìm thấy đường dẫn */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
