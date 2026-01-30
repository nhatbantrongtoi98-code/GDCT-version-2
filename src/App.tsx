import React, { useState } from 'react';
// Quan trọng: Sử dụng tên file viết thường hoàn toàn
import LoginView from './views/loginview'; 
import Layout from './components/Layout';
import { INITIAL_DATA } from './constants';
import { User as UserType } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser({ 
      id: '1',
      username: username, 
      role: 'user', 
      displayName: username 
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-8 max-w-7xl mx-auto animate-fadeIn bg-stone-50 min-h-[80vh] rounded-[2rem] mt-4 shadow-inner">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-[#1a2e12] uppercase tracking-widest mb-2">
            {INITIAL_DATA.appName}
          </h2>
          <div className="h-1.5 w-20 bg-red-600 mx-auto mt-4 rounded-full shadow-sm" />
          <p className="mt-4 text-stone-500 font-medium italic">Quân đội nhân dân Việt Nam</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">🎖️</span>
            </div>
            <h3 className="font-bold text-green-900 text-xl mb-3 uppercase tracking-tight">Sẵn sàng học tập</h3>
            <p className="text-stone-600 leading-relaxed text-sm">
              Chào mừng đồng chí đã đăng nhập thành công. Hãy chọn nội dung bài giảng hoặc lịch sử truyền thống ở menu bên trái để bắt đầu ôn tập.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
