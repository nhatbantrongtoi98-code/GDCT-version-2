import React, { useState } from 'react';
import Login from './views/Login'; 
import Sidebar from './components/Sidebar';
import UnitTraditionView from './views/UnitTraditionView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', role: 'user' });
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (u: string) => {
    setIsLoggedIn(true);
    // Tài khoản quản trị admin123 mật khẩu 123456 đã được xử lý tại Login.tsx
    setUser({ 
      username: u, 
      role: u === 'admin123' ? 'admin' : 'user' 
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: '', role: 'user' });
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] font-['Be_Vietnam_Pro'] selection:bg-[#DA251D] selection:text-white">
      <Sidebar 
        onNavigate={setActiveTab} 
        activeTab={activeTab} 
        onLogout={handleLogout} 
        username={user.username} 
        role={user.role}
      />
      
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="p-4 lg:p-10 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="bg-[#1A2E14] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                  <img src="/vpa-logo.png" className="w-40 h-40" alt="VPA" />
               </div>
               <h1 className="text-4xl font-black uppercase italic tracking-tighter">Chào mừng {user.username}</h1>
               <p className="mt-4 text-[#FFFF00] font-bold uppercase text-xs tracking-[0.3em] opacity-80">Hệ thống sổ tay giáo dục chính trị điện tử</p>
               <div className="mt-8 flex gap-4">
                  <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-[10px] font-bold uppercase">Phiên bản 2026.1</div>
                  <div className="px-6 py-2 bg-[#DA251D] rounded-full text-[10px] font-bold uppercase shadow-lg">Trạng thái: Sẵn sàng</div>
               </div>
            </div>
          )}
          
          {activeTab.includes('tradition') && (
            <UnitTraditionView isAdmin={user.role === 'admin'} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
