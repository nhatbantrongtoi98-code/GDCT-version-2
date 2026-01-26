
import React, { useState } from 'react';
import { Edit2, Save, X, Upload, ImageIcon, Type, Star, User, Shield } from 'lucide-react';

interface EditableSectionProps {
  title: string;
  content: string;
  imageUrl?: string;
  avatarUrl?: string;
  onSave: (newTitle: string, newContent: string, newImageUrl?: string, newAvatarUrl?: string) => void;
  isAdmin: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, content, imageUrl, avatarUrl, onSave, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl);
  const [localAvatarUrl, setLocalAvatarUrl] = useState(avatarUrl);

  const handleSave = () => {
    onSave(localTitle, localContent, localImageUrl, localAvatarUrl);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("Ảnh nền quá lớn (Tối đa 1.5MB).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => setLocalImageUrl(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 0.5 * 1024 * 1024) {
        alert("Logo quá lớn (Tối đa 0.5MB).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => setLocalAvatarUrl(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/80 rounded-[3rem] shadow-2xl overflow-hidden border-2 border-slate-100 transition-all hover:border-red-100 group relative">
      <div className="bg-slate-50 border-b border-slate-100 p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-5">
          {localAvatarUrl || avatarUrl ? (
            <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-200 p-2 flex items-center justify-center">
              <img src={localAvatarUrl || avatarUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-14 h-14 bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Shield size={28} />
            </div>
          )}
          <div>
            <h3 className="text-[13px] font-black uppercase text-red-700 tracking-[0.2em] italic">
              {isEditing ? 'Biên soạn nội dung chuyên mục' : title}
            </h3>
            {!isEditing && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Lịch sử truyền thống & Niềm tự hào đơn vị</p>}
          </div>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`p-4 rounded-2xl transition-all shadow-md ${isEditing ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-white text-slate-400 hover:text-red-600 border border-slate-200'}`}
          >
            {isEditing ? <X size={20} /> : <Edit2 size={20} />}
          </button>
        )}
      </div>
      
      {(localImageUrl || imageUrl) && !isEditing && (
        <div className="w-full h-[400px] overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-100 relative">
          <img src={localImageUrl || imageUrl} alt={title} className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>
      )}

      <div className="p-10 relative z-10">
        {isEditing && isAdmin ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 col-span-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Logo đơn vị (Biểu trưng):</label>
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-[1.5rem] flex items-center justify-center overflow-hidden shadow-inner">
                      {localAvatarUrl ? (
                        <img src={localAvatarUrl} className="w-full h-full object-contain p-3" alt="Preview" />
                      ) : (
                        <ImageIcon size={30} className="text-slate-200" />
                      )}
                   </div>
                   <label className="flex-1 flex items-center justify-center gap-3 h-20 border-2 border-dashed border-slate-200 rounded-[1.5rem] cursor-pointer hover:bg-slate-50 hover:border-red-400 transition-all">
                      <Upload size={18} className="text-red-700" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Tải Logo mới</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                   </label>
                </div>
              </div>
              <div className="space-y-3 col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Tiêu đề đơn vị / Nội dung:</label>
                <input 
                  className="w-full h-20 px-6 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:border-red-600 font-black uppercase text-xs bg-slate-50 shadow-inner"
                  value={localTitle} onChange={(e) => setLocalTitle(e.target.value)}
                  placeholder="Nhập tên đơn vị hoặc tiêu đề..."
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Ảnh nền truyền thống (Banner):</label>
              <label className="flex items-center justify-center gap-4 w-full h-28 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-slate-50 hover:border-red-400 transition-all">
                <ImageIcon size={24} className="text-red-700" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cập nhật ảnh nền đặc thù</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
              {localImageUrl && (
                <div className="mt-4 w-full h-32 rounded-[1.5rem] overflow-hidden border-2 border-slate-100 shadow-sm relative group">
                   <img src={localImageUrl} className="w-full h-full object-cover" alt="Background Preview" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-black text-white uppercase">Xem trước ảnh nền</p>
                   </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Lịch sử & Nội dung chi tiết:</label>
              <textarea
                className="w-full h-[400px] p-10 border-2 border-slate-100 rounded-[2.5rem] outline-none focus:border-red-600 font-medium text-slate-700 leading-relaxed bg-slate-50 text-base shadow-inner custom-scrollbar"
                value={localContent} onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Nhập nội dung chi tiết tại đây..."
              />
            </div>
            <div className="flex justify-end gap-6 border-t border-slate-100 pt-8">
              <button onClick={() => setIsEditing(false)} className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-red-700 transition-colors">Hủy thao tác</button>
              <button onClick={handleSave} className="bg-red-700 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] shadow-2xl border-b-4 border-red-950 flex items-center gap-3 tracking-[0.3em] hover:bg-red-800 transition-all active:scale-95 italic">
                <Save size={18} /> Lưu thay đổi
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none text-slate-600 font-medium leading-relaxed whitespace-pre-wrap text-base">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableSection;
