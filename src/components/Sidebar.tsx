import React from 'react';
import { ChevronLeft, ChevronRight, Home, LogOut } from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed, currentUser, appName, appLogo, onLogout }) => {
  return (
    <aside className={`bg-[#1A2E14] transition-all duration-300 relative ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Nút ẩn hiện nội dung */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-[#DA251D] text-white rounded-full flex items-center justify-center border border-yellow-500 z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nội dung Sidebar (ẩn khi collapsed) */}
      <div className="p-4 text-white">
        {!isCollapsed && <h1 className="font-bold text-[#FFD700]">{appName}</h1>}
        {/* Render menu items ở đây */}
      </div>
    </aside>
  );
};

export default Sidebar;
