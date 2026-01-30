
import React from 'react';
import { Settings, ShieldCheck, User as UserIcon, Palette } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';

interface SettingsViewProps {
  user: User;
  currentPage: string;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, currentPage }) => {
  const getTitle = () => {
    if (currentPage === 'settings-ui') return 'Chỉnh sửa giao diện';
    if (currentPage === 'settings-pass') return 'Cập nhật mật khẩu';
    return 'Thay đổi tên người dùng';
  };

  const getIcon = () => {
    if (currentPage === 'settings-ui') return <Palette size={32} />;
    if (currentPage === 'settings-pass') return <ShieldCheck size={32} />;
    return <UserIcon size={32} />;
  };

  return (
    <div className="p-6 md:p-12 min-h-full bg-stone-100 flex flex-col items-center animate-fadeIn">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-200">
        <div className="flex items-center space-x-4 mb-10 border-b border-stone-100 pb-6">
          <div className="p-4 bg-stone-100 text-[#2E4D23] rounded-2xl">{getIcon()}</div>
          <h2 className="text-2xl md:text-3xl font-black text-stone-800 uppercase tracking-tight">{getTitle()}</h2>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <label className="block text-sm font-black text-stone-500 uppercase tracking-widest">
              {currentPage === 'settings-ui' ? 'Chủ đề giao diện' : currentPage === 'settings-pass' ? 'Mật khẩu hiện tại' : 'Tên hiển thị mới'}
            </label>
            <input 
              type={currentPage === 'settings-pass' ? 'password' : 'text'}
              className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-[#2E4D23]/10 focus:border-[#2E4D23] outline-none transition-all text-lg font-medium"
              placeholder="Nhập thông tin xác thực..."
            />
          </div>

          {currentPage === 'settings-pass' && (
            <div className="space-y-4">
              <label className="block text-sm font-black text-stone-500 uppercase tracking-widest">Mật khẩu mới</label>
              <input 
                type="password"
                className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-[#2E4D23]/10 focus:border-[#2E4D23] outline-none transition-all text-lg font-medium"
                placeholder="Xác nhận mật khẩu mới..."
              />
            </div>
          )}

          <button className="w-full bg-[#2E4D23] hover:bg-[#1A2E14] text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest">
            Xác nhận thay đổi
          </button>
        </form>
        
        <div className="mt-10 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-start space-x-3">
          <Settings className="text-yellow-600 shrink-0 mt-1" size={18} />
          <p className="text-xs text-yellow-800 font-medium italic">
            Lưu ý: Các thay đổi cài đặt hệ thống có thể cần khởi động lại ứng dụng để có hiệu lực hoàn toàn.
          </p>
        </div>
      </div>
      <AdminEditPrompt user={user} onEdit={() => alert("Admin: Quyền cấu hình hệ thống")} />
    </div>
  );
};

export default SettingsView;
