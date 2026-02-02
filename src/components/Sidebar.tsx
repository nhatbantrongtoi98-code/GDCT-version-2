import React from 'react';
import { X, Home, History, Shield, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeTab, onNavigate }: any) => {
  return (
    <>
      {/* Lớp nền mờ (Overlay) - Chỉ hiện trên điện thoại khi mở Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[40] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Nội dung Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-72 sm:w-80 bg-[#1b3a1a] text-white 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-right-4 border-yellow-500
      `}>
        {/* Nút đóng (Dấu X) */}
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <h2 className="font-black text-yellow-400 uppercase text-xs tracking-widest">Danh mục học tập</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Danh sách Menu */}
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => { onNavigate('dashboard'); if(window.innerWidth < 1024) setIsOpen(false); }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-yellow-500 text-green-950' : 'hover:bg-green-800'}`}
          >
            <Home size={20} /> Trang chủ
          </button>
          
          <button 
            onClick={() => { onNavigate('history-vn'); if(window.innerWidth < 1024) setIsOpen(false); }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${activeTab === 'history-vn' ? 'bg-yellow-500 text-green-950' : 'hover:bg-green-800'}`}
          >
            <History size={20} /> Lịch sử QĐND VN
          </button>

          {/* Các mục khác tương tự... */}
        </nav>

        {/* Chân Sidebar */}
        <div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-black/20 text-center">
          <p className="text-[10px] text-white/40 uppercase font-black italic">Bản quyền Cục Chính trị - BTL Thủ đô</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
