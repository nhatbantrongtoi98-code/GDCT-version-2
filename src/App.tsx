import React, { useState } from 'react';
import LoginView from './views/LoginView'; 
import Layout from './components/Layout';
import { INITIAL_DATA } from './constants';
import { User as UserType } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser({ id: '1', username, role: 'user', displayName: username });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'history-vn':
        return (
          <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-tight border-l-4 border-red-700 pl-4">
                {INITIAL_DATA.historyVN.title}
              </h3>
              <div className="text-slate-700 leading-relaxed text-justify space-y-4 whitespace-pre-line">
                {INITIAL_DATA.historyVN.body}
              </div>
            </div>
          </div>
        );
      case 'tradition':
        return (
          <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-green-800 mb-6 uppercase tracking-tight border-l-4 border-green-800 pl-4">
                {INITIAL_DATA.tradition.title}
              </h3>
              <div className="text-slate-700 leading-relaxed text-justify space-y-4 whitespace-pre-line">
                {INITIAL_DATA.tradition.body}
              </div>
            </div>
          </div>
        );
      case 'bai-giang':
        return (
          <div className="p-8 max-w-4xl mx-auto text-center py-20">
            <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-400 uppercase">Nội dung bài giảng đang được cập nhật</h3>
          </div>
        );
      default: // Trang chủ (dashboard)
        return (
          <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">{INITIAL_DATA.appName}</h2>
              <div className="h-1 w-20 bg-red-600 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mb-6">
                  <Trophy size={24} />
                </div>
                <h4 className="font-black text-slate-800 mb-2 uppercase text-sm">Nhiệm vụ học tập</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Đồng chí hãy hoàn thành các bài giảng chính trị trong tuần này.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={setActiveTab} activeTab={activeTab}>
      {renderMainContent()}
    </Layout>
  );
}

export default App;
