import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, currentUser, appName, appLogo, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f4f7fa]">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        currentUser={currentUser}
        appName={appName}
        appLogo={appLogo}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
