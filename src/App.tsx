import React, { useState } from 'react';
import LoginView from './views/LoginView';
import Layout from './components/Layout';
import { INITIAL_DATA } from './constants';
import { User as UserType } from './types';

function App() {
  // Trạng thái kiểm soát việc đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Hàm này sẽ được gọi khi nhấn nút từ LoginView
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

  // Nếu chưa đăng nhập, hiển thị màn hình Login
  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Nếu đã đăng nhập thành công, hiển thị nội dung chính bên trong Layout
  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-green-900 uppercase tracking-tight mb-2">
            {INITIAL_DATA.appName}
          </h2>
          <p className="text-stone-600 italic">"Chất lượng - Hiệu quả - Kịp thời"</p>
          <div className="h-1 w-24 bg-red-600 mx-auto mt-4 rounded-full" />
        </header>

        {/* Khu vực chứa nội dung các chức năng sau khi đăng nhập */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <h3 className="font-bold text-green-800 mb-2">Chào mừng đồng chí!</h3>
            <p className="text-sm text-stone-600">Bắt đầu học tập các nội dung giáo dục chính trị tại thanh Menu bên trái.</p>
          </div>
          {/* Thêm các component khác ở đây */}
        </div>
      </div>
    </Layout>
  );
}

export default App;
