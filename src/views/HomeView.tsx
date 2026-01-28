import React, { useState } from 'react';
import { Edit2, Save, Image as ImageIcon, Music, Type, Upload, Monitor } from 'lucide-react';
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
  const [editForm, setEditForm] = useState({ 
    title: data.intro.title, 
    body: data.intro.body, 
    imageUrl: data.intro.imageUrl 
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024 && type !== 'playlist') {
      alert("File quá lớn! Vui lòng chọn file dưới 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'playlist') {
        const title = file.name.replace(/\.[^/.]+$/, "");
        onUpdatePlaylist([...data.backgroundPlaylist, { title, url: base64String }]);
      } else if (type === 'introImg') {
        setEditForm(prev => ({ ...prev, imageUrl: base64String }));
      } else {
        onUpdateGlobal(type, base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveContent = () => {
    onUpdate('intro', editForm.title, editForm.body, editForm.imageUrl);
    setIsEditing(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* BANNER SECTION */}
      <div className="relative h-80 rounded-[3.5rem] overflow-hidden shadow-2xl group">
        <img src={data.intro.imageUrl || 'https://images.unsplash.com/photo-1590233735520-74673641047d'} 
             className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-900/40 to-transparent flex items-center p-12">
          <div className="flex items-center gap-8">
            <div className="relative group/logo">
              {data.appLogo?.startsWith('data:image') ? (
                <img src={data.appLogo} className="w-24 h-24 object-contain rounded-xl shadow-2xl bg-white/20 p-2" />
              ) : (
                <span className="text-8xl drop-shadow-2xl">{data.appLogo || "🎖️"}</span>
              )}
              {isAdmin && (
                <label className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-red-700 hover:text-white transition-all">
                  <Upload size={14} />
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'appLogo')} />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-5xl font-black text-white uppercase italic drop-shadow-md">{data.appName}</h2>
              <p className="text-red-100 font-bold tracking-[0.3em] uppercase mt-2 opacity-80">Đơn vị quyết thắng</p>
            </div>
          </div>
        </div>
        {isAdmin && (
          <label className="absolute bottom-6 right-6 p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl cursor-pointer hover:bg-white/40 transition-all">
            <div className="flex items-center gap-2 font-black text-xs uppercase"><ImageIcon size={18} /> Đổi ảnh Banner</div>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'introImg')} />
          </label>
        )}
      </div>

      {/* ADMIN CONTROLS */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] border shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Monitor size={20}/></div>
              <p className="text-sm font-bold text-slate-700">Hình nền ứng dụng</p>
            </div>
            <label className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black cursor-pointer hover:bg-blue-600 transition-all">
