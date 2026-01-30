import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import TraditionView from './views/TraditionView';
import LecturesView from './views/LecturesView';
import EntertainmentView from './views/EntertainmentView';
import SettingsView from './views/SettingsView';
import { UserAccount } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Giả lập tài khoản admin đặc biệt
  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <Layout currentUser={currentUser!} onLogout={() => setIsAuthenticated(false)}>
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/tradition" element={<TraditionView isAdmin={currentUser?.username === 'admin123'} />} />
                  <Route path="/lectures" element={<LecturesView isAdmin={currentUser?.username === 'admin123'} />} />
                  <Route path="/entertainment" element={<EntertainmentView />} />
                  <Route path="/settings" element={<SettingsView user={currentUser!} />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
