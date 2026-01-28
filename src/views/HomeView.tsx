import React, { useState } from 'react';
import { Edit2, Save, Image as ImageIcon, Music, Type, Upload, Trash2, Plus } from 'lucide-react';
import { AppData, BackgroundMusic } from '../types';

interface HomeViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: keyof AppData, title: string, body: string, img?: string) => void;
  onUpdateGlobal: (key: keyof AppData, value: any) => void;
  onUpdatePlaylist: (list: BackgroundMusic[]) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ data, isAdmin, onUpdate, onUpdateGlobal, onUpdatePlaylist }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: data.intro.title, body: data.intro.body, imageUrl: data.intro.imageUrl });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof AppData | 'introImg') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (key === 'introImg') setEditForm({ ...editForm, imageUrl: result });
        else onUpdateGlobal(key, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveIntro = () => {
    onUpdate('intro', editForm.title, editForm.body, editForm.imageUrl);
    setIsEditing(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* SECTION 1: BANNER & LOGO */}
      <div className="relative h-80 rounded-[3.5rem] overflow-hidden shadow-2xl group">
        <img src={data.intro.imageUrl} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-900/40 to-transparent flex items-center p-12">
          <div className="flex items-center gap-8">
            <div className="relative group/logo">
              <span className="text-8xl drop-shadow-2xl">{data.appLogo}</span>
              {isAdmin && (
                <button onClick={() => {const l = prompt('Nhập Emoji hoặc Icon làm Logo:', data.appLogo); if(l) onUpdateGlobal('appLogo', l)}} 
                        className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover/logo:opacity-100 transition-all">
                  <Type size={14} className="text-red-700" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-5xl font-black text-white uppercase italic leading-tight drop-shadow-md">
                {data.appName}
              </h2>
              <p className="text-red-100 font-bold tracking-widest uppercase mt-2 opacity-80">Đơn vị quyết thắng</p>
            </div>
          </div>
        </div>
        {isAdmin && (
          <label className="absolute bottom-6 right-6 p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40">
            <ImageIcon size={20} />
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'introImg')} />
          </label>
        )}
      </div>

      {/* SECTION 2: QUẢN TRỊ TOÀN CỤC (CHỈ ADMIN THẤY) */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ImageIcon size={20}/></div>
                <div>
                   <p className="text-xs font-black uppercase text-slate-400">Hình nền ứng dụng</p>
                   <p className="text-sm font-bold text-slate-700">Tùy chỉnh nền trang chính</p>
                </div>
             </div>
             <label className="px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-all">
                THAY ĐỔI
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'globalBackground')} />
             </label>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Music size={20}/></div>
                <div>
                   <p className="text-xs font-black uppercase text-slate-400">Nhạc nền hệ thống</p>
                   <p className="text-sm font-bold text-slate-700">{data.backgroundPlaylist.length} bài hát đang phát</p>
                </div>
             </div>
             <button onClick={() => {
               const title = prompt('Tên bài hát:');
               const url = prompt('Link MP3 (URL):');
               if(title && url) onUpdatePlaylist([...data.backgroundPlaylist, {title, url}]);
             }} className="px-4 py-2 bg-slate-100 hover:bg-amber-600 hover:text-white rounded-xl text-xs font-bold transition-all">
                THÊM NHẠC
             </button>
          </div>
        </div>
      )}

      {/* SECTION 3: GIỚI THIỆU NỘI DUNG */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 relative group">
        {isAdmin && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 hover:text-white">
            <Edit2 size={18} />
          </button>
        )}

        {isEditing ? (
          <div className="space-y-4">
            <input className="w-full text-2xl font-black p-4 border-2 rounded-2xl outline-none focus:border-red-700" 
                   value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
            <textarea className="w-full h-40 p-4 border-2 rounded-2xl outline-none focus:border-red-700 font-medium" 
                      value={editForm.body} onChange={e => setEditForm({...editForm, body: e.target.value})} />
            <div className="flex gap-2">
              <button onClick={saveIntro} className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-200"><Save size={18}/> LƯU THAY ĐỔI</button>
              <button onClick={() => setIsEditing(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold">HỦY</button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-red-800 uppercase italic tracking-tight">{data.intro.title}</h3>
            <div className="w-20 h-1.5 bg-red-700 rounded-full"></div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-line italic">
              "{data.intro.body}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
