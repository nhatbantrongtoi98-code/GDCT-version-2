import React, { useState } from 'react';
import { 
  Music, Video, Plus, Trash2, Edit2, Play, 
  Pause, List, FileAudio, FileVideo, Save, X 
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'audio' | 'video';
  url: string; // Base64 hoặc Blob URL từ máy tính
}

const EntertainmentView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>('audio');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Khởi tạo dữ liệu mẫu (Admin sẽ nạp thật từ máy tính)
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    { id: 'a1', name: 'Tiến quân ca', type: 'audio', url: '' },
    { id: 'v1', name: 'Vũ điệu Hành quân', type: 'video', url: '' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      // Giới hạn: Audio < 10MB, Video < 50MB để đảm bảo hiệu năng trình duyệt
      const limit = type === 'audio' ? 10 : 50;
      if (file.size > limit * 1024 * 1024) {
        alert(`File quá lớn! Vui lòng chọn file ${type} dưới ${limit}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const newItem: MediaItem = {
          id: Date.now().toString(),
          name: file.name.split('.')[0],
          type: type,
          url: ev.target?.result as string
        };
        setMediaList([...mediaList, newItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteItem = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa mục này?")) {
      setMediaList(mediaList.filter(item => item.id !== id));
    }
  };

  const updateName = (id: string, newName: string) => {
    setMediaList(mediaList.map(item => item.id === id ? { ...item, name: newName } : item));
    setIsEditing(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header trang */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-red-800 rounded-3xl text-white shadow-lg"><Music size={40} /></div>
          <div>
            <h2 className="text-4xl font-black text-red-800 uppercase italic tracking-tighter">GÓC GIẢI TRÍ</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">15 bài hát quy định & Các điệu vũ quân đội</p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex gap-3">
            <label className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs cursor-pointer hover:bg-blue-700 transition-all shadow-lg">
              <Plus size={16} /> THÊM NHẠC (MP3)
              <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'audio')} />
            </label>
            <label className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-xs cursor-pointer hover:bg-purple-700 transition-all shadow-lg">
              <Plus size={16} /> THÊM VŨ ĐIỆU (MP4)
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
            </label>
          </div>
        )}
      </div>

      {/* Tabs chuyển đổi Dạng Cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CỘT 1: 15 BÀI HÁT QUY ĐỊNH */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800 uppercase flex items-center gap-3 pb-4 border-b border-slate-50">
            <FileAudio className="text-red-700" /> 15 BÀI HÁT QUY ĐỊNH
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {mediaList.filter(i => i.type === 'audio').map((item, index) => (
              <div key={item.id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-red-50 transition-all">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-[10px] font-black text-slate-300">{(index + 1).toString().padStart(2, '0')}</span>
                  {isEditing === item.id ? (
                    <input 
                      autoFocus className="bg-white border rounded px-2 py-1 font-bold text-xs w-full"
                      defaultValue={item.name}
                      onBlur={(e) => updateName(item.id, e.target.value)}
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-700 uppercase">{item.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  {isAdmin && (
                    <>
                      <button onClick={() => setIsEditing(item.id)} className="p-2 text-blue-600 hover:bg-white rounded-xl"><Edit2 size={14}/></button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 text-red-600 hover:bg-white rounded-xl"><Trash2 size={14}/></button>
                    </>
                  )}
                  <div className="p-2 bg-red-800 text-white rounded-xl cursor-pointer"><Play size={14} fill="currentColor"/></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 2: CÁC ĐIỆU VŨ QUÂN ĐỘI */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800 uppercase flex items-center gap-3 pb-4 border-b border-slate-50">
            <FileVideo className="text-blue-700" /> VŨ ĐIỆU QUÂN ĐỘI (MP4)
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {mediaList.filter(i => i.type === 'video').map((item) => (
              <div key={item.id} className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden group">
                {item.url ? (
                  <video src={item.url} controls className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                    <Video size={40} />
                    <span className="text-[10px] font-bold uppercase">Chưa có dữ liệu Video</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                  <span className="bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {item.name}
                  </span>
                  {isAdmin && (
                    <div className="flex gap-2 pointer-events-auto">
                      <button onClick={() => deleteItem(item.id)} className="p-2 bg-red-600 text-white rounded-xl shadow-lg"><Trash2 size={14}/></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentView;
