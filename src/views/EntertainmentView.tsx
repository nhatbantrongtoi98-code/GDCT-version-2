import React, { useState, useRef } from 'react';
import { 
  Music, Video, Plus, Trash2, Edit2, Play, 
  Pause, FileAudio, FileVideo, Volume2
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'audio' | 'video';
  url: string; 
}

const EntertainmentView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  
  // Sử dụng Ref để điều khiển trình phát nhạc ẩn
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newItem: MediaItem = {
          id: Date.now().toString(),
          name: file.name.replace(/\.[^/.]+$/, ""), // Tự động bỏ đuôi file .mp3, .mp4
          type: type,
          url: ev.target?.result as string
        };
        setMediaList(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  const playAudio = (item: MediaItem) => {
    if (!audioRef.current) return;
    
    if (currentPlaying === item.id) {
      audioRef.current.pause();
      setCurrentPlaying(null);
    } else {
      audioRef.current.src = item.url;
      audioRef.current.play();
      setCurrentPlaying(item.id);
    }
  };

  const deleteItem = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa mục này?")) {
      setMediaList(prev => prev.filter(item => item.id !== id));
      if (currentPlaying === id) {
        audioRef.current?.pause();
        setCurrentPlaying(null);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Audio Element ẩn để phát nhạc */}
      <audio ref={audioRef} onEnded={() => setCurrentPlaying(null)} className="hidden" />

      {/* Header trang */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-red-800 rounded-3xl text-white shadow-lg">
            {currentPlaying ? <Volume2 className="animate-pulse" size={40} /> : <Music size={40} />}
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-800 uppercase italic tracking-tighter">GÓC GIẢI TRÍ</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Hệ thống phát đa phương tiện nội bộ</p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex gap-3">
            <label className="flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] cursor-pointer hover:bg-red-800 transition-all shadow-lg shadow-red-100">
              <Plus size={16} /> THÊM NHẠC MP3
              <input type="file" accept="audio/mp3" className="hidden" onChange={(e) => handleFileUpload(e, 'audio')} />
            </label>
            <label className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-[10px] cursor-pointer hover:bg-black transition-all shadow-lg">
              <Plus size={16} /> THÊM VIDEO MP4
              <input type="file" accept="video/mp4" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CỘT 1: DANH SÁCH BÀI HÁT (Xếp theo dạng cột dọc) */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 pb-4 border-b">
            <FileAudio className="text-red-700" size={20} /> 15 BÀI HÁT QUY ĐỊNH
          </h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {mediaList.filter(i => i.type === 'audio').map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${currentPlaying === item.id ? 'bg-red-50 border-red-200' : 'bg-slate-50 hover:bg-slate-100'}`}>
                <div className="flex items-center gap-4">
                  <button onClick={() => playAudio(item)} className={`p-3 rounded-xl transition-all ${currentPlaying === item.id ? 'bg-red-700 text-white animate-bounce' : 'bg-white text-red-700 shadow-sm'}`}>
                    {currentPlaying === item.id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  </button>
                  <span className="text-xs font-black uppercase text-slate-700">{item.name}</span>
                </div>
                {isAdmin && (
                  <button onClick={() => deleteItem(item.id)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 2: DANH SÁCH VŨ ĐIỆU (Video phát tại chỗ) */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 pb-4 border-b">
            <FileVideo className="text-blue-700" size={20} /> 5 ĐIỆU VŨ QUÂN ĐỘI
          </h3>
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {mediaList.filter(i => i.type === 'video').map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black shadow-lg border-4 border-slate-50">
                  <video src={item.url} controls className="w-full h-full object-contain" />
                </div>
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] font-black uppercase text-slate-500">{item.name}</span>
                  {isAdmin && <button onClick={() => deleteItem(item.id)} className="text-red-600"><Trash2 size={16} /></button>}
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
