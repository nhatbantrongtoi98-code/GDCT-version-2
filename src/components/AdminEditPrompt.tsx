
import React from 'react';
import { Edit2, Lock } from 'lucide-react';
import { User } from '../types';

interface AdminEditPromptProps {
  user: User;
  onEdit: () => void;
}

const AdminEditPrompt: React.FC<AdminEditPromptProps> = ({ user, onEdit }) => {
  const isAdmin = user.username === 'admin123';

  if (!isAdmin) {
    return (
      <div className="mt-8 p-4 bg-stone-200 border border-stone-300 rounded-lg flex items-center justify-center space-x-2 text-stone-500 italic text-sm">
        <Lock size={14} />
        <span>Bạn chỉ có quyền xem thông tin. Chỉ Admin mới có thể cập nhật.</span>
      </div>
    );
  }

  return (
    <button 
      onClick={onEdit}
      className="mt-8 flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
    >
      <Edit2 size={18} />
      <span className="font-semibold">Cập nhật nội dung (Admin)</span>
    </button>
  );
};

export default AdminEditPrompt;
