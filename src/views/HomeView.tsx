import React, { useState } from 'react';
import { Edit2, Save, Image as ImageIcon, Music, Type, Upload, Trash2, Plus, Monitor } from 'lucide-react';
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

  // HÀM XỬ LÝ ĐỌC FILE TỪ MÁY TÍNH
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // KIỂM TRA DUNG LƯỢNG: Nếu file > 2MB thì cảnh báo (localStorage có hạn)
    if (file.size > 2 * 1024 * 1024 && type !== 'playlist') {
      alert("File ảnh quá lớn! Đồng chí vui lòng chọn ảnh dưới 2MB để đảm bảo hệ thống vận hành mượt mà.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      if (type === 'playlist') {
        const title = file.name.replace(/\.[^/.]+$/, "");
        onUpdatePlaylist([...data.backgroundPlaylist, { title, url: base64String }]);
      } else if (type === 'introImg') {
        onUpdate('intro', editForm.title, editForm.body, base64String);
      } else {
        onUpdateGlobal(type, base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* BANNER & LOGO TỰ CHỌN FILE */}
      <div className="relative h-80 rounded-[3.5rem] overflow-hidden shadow-2xl group">
        <img src={data.intro.imageUrl} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-900/40 to-transparent flex items-center p-12">
          <div className="flex items-center gap-8">
            <div className="relative group/logo">
              {/* Hiển thị Logo: Nếu là hình ảnh thì hiện img, nếu là text thì hiện span */}
              {data.appLogo.startsWith('data:image') ? (
                <img src={data.appLogo} className="w-24 h-24 object-contain rounded-xl shadow-2xl bg-white/20 p-2" />
              ) : (
                <span className="text-8xl drop-shadow-2xl">{data.appLogo}</span>
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
              <p className="text-red-100 font-bold tracking-[0.3em] uppercase mt-2 opacity-80">Đơn vị anh hùng</p>
            </div>
          </div>
        </div>
        {isAdmin && (
          <label className="absolute bottom-6 right-6 p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl cursor-pointer hover:bg-white/40 transition-all">
            <div className="flex items-center gap-2 font-black text-xs uppercase">
               <ImageIcon size={18} /> Đổi ảnh Banner
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'introImg')} />
          </label>
        )}
      </div>

      {/* CÀI ĐẶT HỆ THỐNG TỪ MÁY TÍNH */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Monitor size={20}/></div>
                <div>
                   <p className="text-xs font-black uppercase text-slate-400">Hình nền ứng dụng</p>
                   <p className="text-sm font-bold text-slate-700">Chọn ảnh từ máy tính của bạn</p>
                </div>
             </div>
             <label className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black cursor-pointer hover:bg-blue-600 transition-all">
                TẢI ẢNH LÊN
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'globalBackground')} />
             </label>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Music size={20}/></div>
                <div>
                   <p className="text-xs font-black uppercase text-slate-400">Nhạc nền hệ thống</p>
                   <p className="text-sm font-bold text-slate-700">{data.backgroundPlaylist.length} file nhạc cục bộ</p>
                </div>
             </div>
             <label className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black cursor-pointer hover:bg-amber-600 transition-all">
                TẢI FILE NHẠC
                <input type="file" className="hidden" accept="audio/mp3,audio/wav" onChange={(e) => handleFileUpload(e, 'playlist')} />
             </label>
          </div>
        </div>
      )}

      {/* NỘI DUNG GIỚI THIỆU */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 relative group">
        {isAdmin && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-700 hover:text-white transition-all">
            <Edit2 size={18} />
          </button>
        )}

        {isEditing ? (
          <div className="space-y-4 animate-in zoom-in-95 duration-300">
            <input className="w-full text-2xl font-black p-4 border-2 rounded-2xl outline-none focus:border-red-700" 
                   value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
            <textarea className="w-full h-40
