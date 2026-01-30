import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const Layout: React.FC<any> = ({ children, currentUser, appName, appLogo, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar di động */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? "block" : "hidden"}`} onClick={() => setIsSidebarOpen(false)}>
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col border-r">
          <div className="p-4 border-b flex items-center gap-2">
            <img src={appLogo} alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-sm">{appName}</span>
          </div>
          <nav className="flex-1 p-4">
             {/* Menu của đồng chí ở đây */}
             <p className="text-xs text-gray-400 uppercase mb-4">Danh mục bài học</p>
             <Link to="/" className="block py-2 text-gray-700">Trang chủ</Link>
             <Link to="/tradition" className="block py-2 text-gray-700">Truyền thống</Link>
          </nav>
          <div className="p-4 border-t">
            <button onClick={onLogout} className="flex items-center gap-2 text-red-600 font-bold">
              <LogOut size={18} /> Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center px-4 lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)}><Menu /></button>
          <span className="ml-4 font-bold">{appName}</span>
        </header>
        <main className="p-4 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
