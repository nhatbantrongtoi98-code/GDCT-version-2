import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Đảm bảo đường dẫn đúng với cấu trúc của đồng chí
import { UserAccount } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: UserAccount;
  appName: string;
  appLogo: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, appName, appLogo, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Trạng thái ẩn/hiện nội dung

  return (
    <div className="flex min-h-screen bg-[#f4f7fa] font-sans overflow-hidden">
      {/* SIDEBAR: Truyền state vào để điều khiển nội dung bên trong */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        currentUser={currentUser}
        appName={appName}
        appLogo={appLogo}
        onLogout={onLogout}
      />

      {/* MAIN CONTENT: Tự động lấp đầy khoảng trống khi Sidebar co lại */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 transition-all duration-500">
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
