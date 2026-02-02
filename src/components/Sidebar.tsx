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

  // Class định dạng chung cho các mục menu chính
  const navItemClass = "flex items-center px-6 py-4 text-[14px] sm:text-[15px] font-bold uppercase tracking-wider transition-all hover:bg-green-800/50 cursor-pointer border-b border-white/5 active:bg-green-700";
  
  // Class định dạng cho các mục con (Sub-menu)
  const subItemClass = "px-10 py-3 text-[13px] font-medium text-white/70 hover:text-yellow-400 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2";

  const handleLinkClick = (page: PageId, subPage?: SubPageId) => {
    onNavigate(page, subPage);
    // Tự động ẩn sidebar sau khi click trên mobile
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay: Làm mờ nền khi mở Sidebar trên điện thoại */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Sidebar Content */}
      <div 
        className={`fixed inset-y-0 left-0 w-72 sm:w-80 bg-[#1b3a1a] text-white z-50 shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ borderRight: `3px solid ${COLORS.vpaGold || '#ffde00'}` }}
      >
        {/* Header: Logo & User Info */}
        <div className="p-8 flex flex-col items-center bg-gradient-to-b from-[#0d210d] to-[#1b3a1a] border-b border-white/10">
          <div className="w-20 h-20 mb-4 drop-shadow-[0_0_10px_rgba(255,222,0,0.2)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#da251d" stroke="#ffde00" strokeWidth="2"/>
              <polygon points="50,20 58,40 80,40 62,53 69,75 50,62 31,75 38,53 20,40 42,40" fill="#ffde00"/>
            </svg>
          </div>
          <h2 className="text-yellow-400 font-black text-center text-sm tracking-tighter uppercase leading-tight">
            Hệ thống bổ trợ<br/><span className="text-white">Học tập chính trị</span>
          </h2>
          
          {currentUser && (
             <div className="mt-4 px-4 py-1.5 bg-green-900/80 rounded-full border border-yellow-500/30 flex items-center gap-2 shadow-inner">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">
                  {currentUser.role === 'ADMIN' ? '⚓ Quản trị viên' : '🎖️ Chiến sĩ'}
                </span>
             </div>
          )}
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar select-none">
          <div className={navItemClass} onClick={() => handleLinkClick('home')}>
            <span className="mr-3 text-lg">🏠</span> Trang chủ
          </div>

          <div className={navItemClass} onClick={() => handleLinkClick('history_vpa')}>
            <span className="mr-3 text-lg">📜</span> Lịch sử QĐND VN
          </div>

          {/* Group: Truyền thống đơn vị */}
          <div className="border-b border-white/5">
            <div className={navItemClass} onClick={() => toggleExpand('tradition')}>
              <span className="flex-1 italic"><span className="mr-3 not-italic text-lg">🚩</span> Truyền thống đơn vị</span>
              <span className={`text-[10px] transition-transform duration-200 ${expanded === 'tradition' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded === 'tradition' ? 'max-h-64 bg-black/20' : 'max-h-0'}`}>
              <div className={subItemClass} onClick={() => handleLinkClick('tradition_unit', 'llvt_thudo')}>• LLVT Thủ đô</div>
              <div className={subItemClass} onClick={() => handleLinkClick('tradition_unit', 'f301')}>• Sư đoàn BB 301</div>
              <div className={subItemClass} onClick={() => handleLinkClick('tradition_unit', 'e59')}>• Trung đoàn BB 59</div>
              <div className={subItemClass} onClick={() => handleLinkClick('tradition_unit', 'e692')}>• Trung đoàn BB 692</div>
              <div className={subItemClass} onClick={() => handleLinkClick('tradition_unit', 'e757')}>• Trung đoàn BB 757</div>
            </div>
          </div>

          {/* Group: Bài giảng chính trị */}
          <div className="border-b border-white/5">
            <div className={navItemClass} onClick={() => toggleExpand('lectures')}>
              <span className="flex-1 italic"><span className="mr-3 not-italic text-lg">📚</span> Bài giảng chính trị</span>
              <span className={`text-[10px] transition-transform duration-200 ${expanded === 'lectures' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded === 'lectures' ? 'max-h-40 bg-black/20' : 'max-h-0'}`}>
              <div className={subItemClass} onClick={() => handleLinkClick('lectures', 'new_soldier')}>• Chiến sĩ mới (6 bài)</div>
              <div className={subItemClass} onClick={() => handleLinkClick('lectures', 'hsq_cs')}>• HSQ-CS (12 bài)</div>
            </div>
          </div>

          {/* Group: Giải trí */}
          <div className="border-b border-white/5">
            <div className={navItemClass} onClick={() => toggleExpand('ent')}>
              <span className="flex-1 italic"><span className="mr-3 not-italic text-lg">🎸</span> Góc giải trí</span>
              <span className={`text-[10px] transition-transform duration-200 ${expanded === 'ent' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded === 'ent' ? 'max-h-40 bg-black/20' : 'max-h-0'}`}>
              <div className={subItemClass} onClick={() => handleLinkClick('entertainment', 'songs')}>• 15 Bài hát quy định</div>
              <div className={subItemClass} onClick={() => handleLinkClick('entertainment', 'dances')}>• 5 Điệu vũ</div>
            </div>
          </div>

          <div className={navItemClass} onClick={() => handleLinkClick('wise_soldier')}>
            <span className="mr-3 text-lg">💡</span> Chiến sĩ thông thái
          </div>

          {/* Group: Cài đặt */}
          <div className="border-b border-white/5 mb-10">
            <div className={navItemClass} onClick={() => toggleExpand('settings')}>
              <span className="flex-1 italic"><span className="mr-3 not-italic text-lg">⚙️</span> Cài đặt hệ thống</span>
              <span className={`text-[10px] transition-transform duration-200 ${expanded === 'settings' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded === 'settings' ? 'max-h-48 bg-black/20' : 'max-h-0'}`}>
              <div className={subItemClass} onClick={() => handleLinkClick('settings', 'ui_config')}>• Chỉnh sửa giao diện</div>
              <div className={subItemClass} onClick={() => handleLinkClick('settings', 'password_update')}>• Cập nhật mật khẩu</div>
              <div className={subItemClass} onClick={() => handleLinkClick('settings', 'username_change')}>• Thay đổi tên người dùng</div>
            </div>
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 bg-black/40 text-center border-t border-white/5">
            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest leading-relaxed">
              Bản quyền thuộc Cục Chính trị<br/>BTL Thủ đô Hà Nội
            </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
