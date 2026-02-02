
import React, { useState } from 'react';
import { PageId, SubPageId, User } from '../types';
import { COLORS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNavigate: (page: PageId, subPage?: SubPageId) => void;
  currentUser: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onNavigate, currentUser }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const navItemClass = "flex items-center px-4 py-3 text-sm sm:text-base font-medium transition-colors hover:bg-green-800 cursor-pointer border-b border-green-900/50";

  const handleLinkClick = (page: PageId, subPage?: SubPageId) => {
    onNavigate(page, subPage);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Sidebar Content */}
      <div 
        className="fixed inset-y-0 left-0 w-72 sm:w-80 bg-[#1b3a1a] text-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
        style={{ borderRight: `4px solid ${COLORS.vpaGold}` }}
      >
        <div className="p-6 flex flex-col items-center bg-green-950 border-b border-green-900">
          <div className="w-16 h-16 mb-2">
            <div className="w-full h-full scale-125">
              {/* Simple version of logo for sidebar */}
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#da251d" stroke="#ffde00" strokeWidth="2"/>
                <polygon points="50,20 58,40 80,40 62,53 69,75 50,62 31,75 38,53 20,40 42,40" fill="#ffde00"/>
              </svg>
            </div>
          </div>
          <h2 className="text-yellow-400 font-bold text-center leading-tight">HỆ THỐNG BỔ TRỢ<br/>HỌC TẬP CHÍNH TRỊ</h2>
          {currentUser && (
             <div className="mt-4 px-3 py-1 bg-green-900/50 rounded-full text-xs text-green-200">
                {currentUser.role === 'ADMIN' ? '⚓ QUẢN TRỊ VIÊN' : '🎖️ NGƯỜI DÙNG'}
             </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <div className={navItemClass} onClick={() => handleLinkClick('home')}>
            🏠 Trang chủ
          </div>

          <div className={navItemClass} onClick={() => handleLinkClick('history_vpa')}>
            📜 Lịch sử QĐND Việt Nam
          </div>

          {/* Unit Tradition */}
          <div className="border-b border-green-900/50">
            <div 
              className="flex items-center justify-between px-4 py-3 text-sm sm:text-base font-medium hover:bg-green-800 cursor-pointer"
              onClick={() => toggleExpand('tradition')}
            >
              <span>🚩 Truyền thống đơn vị</span>
              <span className="text-xs">{expanded === 'tradition' ? '▼' : '▶'}</span>
            </div>
            {expanded === 'tradition' && (
              <div className="bg-green-950/50 text-sm">
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('tradition_unit', 'llvt_thudo')}>• LLVT Thủ đô</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('tradition_unit', 'f301')}>• Sư đoàn BB 301</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('tradition_unit', 'e59')}>• Trung đoàn BB 59</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('tradition_unit', 'e692')}>• Trung đoàn BB 692</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('tradition_unit', 'e757')}>• Trung đoàn BB 757</div>
              </div>
            )}
          </div>

          {/* Lectures */}
          <div className="border-b border-green-900/50">
            <div 
              className="flex items-center justify-between px-4 py-3 text-sm sm:text-base font-medium hover:bg-green-800 cursor-pointer"
              onClick={() => toggleExpand('lectures')}
            >
              <span>📚 Bài giảng chính trị</span>
              <span className="text-xs">{expanded === 'lectures' ? '▼' : '▶'}</span>
            </div>
            {expanded === 'lectures' && (
              <div className="bg-green-950/50 text-sm">
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('lectures', 'new_soldier')}>• Chiến sĩ mới (6 bài)</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('lectures', 'hsq_cs')}>• HSQ-CS (12 bài)</div>
              </div>
            )}
          </div>

          {/* Entertainment */}
          <div className="border-b border-green-900/50">
            <div 
              className="flex items-center justify-between px-4 py-3 text-sm sm:text-base font-medium hover:bg-green-800 cursor-pointer"
              onClick={() => toggleExpand('ent')}
            >
              <span>🎸 Góc giải trí</span>
              <span className="text-xs">{expanded === 'ent' ? '▼' : '▶'}</span>
            </div>
            {expanded === 'ent' && (
              <div className="bg-green-950/50 text-sm">
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('entertainment', 'songs')}>• 15 Bài hát quy định</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('entertainment', 'dances')}>• 5 Điệu vũ</div>
              </div>
            )}
          </div>

          <div className={navItemClass} onClick={() => handleLinkClick('wise_soldier')}>
            💡 Chiến sĩ thông thái
          </div>

          {/* Settings */}
          <div className="border-b border-green-900/50">
            <div 
              className="flex items-center justify-between px-4 py-3 text-sm sm:text-base font-medium hover:bg-green-800 cursor-pointer"
              onClick={() => toggleExpand('settings')}
            >
              <span>⚙️ Cài đặt hệ thống</span>
              <span className="text-xs">{expanded === 'settings' ? '▼' : '▶'}</span>
            </div>
            {expanded === 'settings' && (
              <div className="bg-green-950/50 text-sm">
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('settings', 'ui_config')}>• Chỉnh sửa giao diện</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('settings', 'password_update')}>• Cập nhật mật khẩu</div>
                <div className="px-8 py-2 hover:text-yellow-400 cursor-pointer" onClick={() => handleLinkClick('settings', 'username_change')}>• Thay đổi tên người dùng</div>
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 bg-red-900/40 text-center text-xs text-white/70 italic border-t border-red-900">
           Bản quyền thuộc Cục Chính trị - BTL Thủ đô Hà Nội
        </div>
      </div>
    </>
  );
};

export default Sidebar;
