import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: { displayName: string } | null;
  onLogout: () => void;
  onNavigate: (id: string) => void;
  activeTab: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, activeTab }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar 
        onNavigate={onNavigate} 
        activeTab={activeTab} 
        onLogout={onLogout} 
        username={user?.displayName || 'Admin'} 
      />
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
