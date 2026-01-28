import React, { useState } from 'react';
import { User, Lock, MessageSquare, Camera, Save, CheckCircle, Loader2 } from 'lucide-react';
import { UserAccount } from '../types';

interface SettingsProps {
  currentUser: UserAccount;
  onUpdateUser: (updated: UserAccount) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ currentUser, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'feedback'>('profile');
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ ...currentUser, avatarUrl: reader.result as string });
        setStatus({ msg: 'Đã cập nhật ảnh đại diện!', type: 'success' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-700 rounded-2xl text-white shadow-lg shadow-red-200">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase italic">Cài đặt cá nhân</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Tùy chỉnh trải nghiệm của đồng chí</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {[
            { id: 'profile', label: 'Hồ sơ', icon: User },
            { id: 'password', label: 'Bảo mật', icon: Lock },
            { id: 'feedback', label: 'Góp ý', icon: MessageSquare },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-red-700 text-white shadow-lg shadow-red-200' : 'bg-white text-slate-500 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          {activeTab === 'profile' && (
            <div className="space-y-6 text-center">
              <div className="relative w-32 h-32 mx-auto group">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 ring-4 ring-red-50">
                  <img src={currentUser.avatarUrl || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-red-700 text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{currentUser.username}</h3>
                <span className="px-4 py-1 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase italic tracking-widest">
                  {currentUser.role === 'admin' ? 'Sĩ quan quản lý' : 'Chiến sĩ'}
                </span>
              </div>
            </div>
          )}
          
          {status && (
            <div className={`mt-6 p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              <CheckCircle size={14} /> {status.msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
