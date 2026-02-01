
import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import Layout from './components/Layout';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      <MainRouter user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Layout>
  );
};

export default App;
