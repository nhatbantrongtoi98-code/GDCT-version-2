import React, { useState, useRef, useEffect } from 'react';
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
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Xử lý tải file và tạo đường dẫn nội bộ (Blob URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo đường dẫn trực tiếp giúp trình duyệt phát nhạc ngay
      const objectUrl = URL.createObjectURL(file);
      const newItem: MediaItem = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: type,
        url: objectUrl
      };
      setMediaList(prev => [...prev, newItem]);
    }
  };

  const playAudio = (item: MediaItem) => {
    if (!audioRef.current) return;
    
    if (currentPlaying === item.id) {
      audioRef.current.pause();
      setCurrentPlaying(null);
    } else {
      audioRef.current.src = item.url;
      // Trình duyệt yêu cầu tương tác người dùng trước khi phát
      audioRef.current.play().catch(error => {
        console.error("Lỗi phát nhạc:", error);
        alert("Trình duyệt chặn tự động phát. Vui lòng nhấn nút Play một lần nữa.");
      });
      setCurrentPlaying(item.id);
    }
  };

  const deleteItem = (id: string, url: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa mục này?")) {
      URL.revokeObjectURL(url); // Giải phóng bộ nhớ máy tính
      setMediaList(prev => prev.filter(item => item.id !== id));
      if (currentPlaying === id) {
        audioRef.current?.pause();
        setCurrentPlaying(null);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Trình phát nhạc ẩn */}
      <audio ref={audioRef} onEnded={() => setCurrentPlaying(null)} />

      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`p-5 rounded-3xl text-white shadow-lg transition-all ${currentPlaying ? 'bg-red-600 animate-pulse' : 'bg-red-800'}`}>
            <Music size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-red-800 uppercase italic">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">15 bài hát quy định & Các điệu vũ quân đội</p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex gap-3">
            <label className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] cursor-pointer hover:bg-blue-700 shadow-lg">
              <Plus size={14} /> THÊM NHẠC (MP3)
              <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'audio')} />
            </label>
            <label className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] cursor-pointer hover:bg-purple-700 shadow-lg">
              <Plus size={14} /> THÊM VŨ ĐIỆU (MP4)
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CỘT NHẠC */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
          <h3 className="text-sm font-black text-slate-800 uppercase mb-6 flex items-center gap-3 border-b pb-4">
            <FileAudio className="text-red-700" /> DANH SÁCH BÀI HÁT
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {mediaList.filter(i => i.type === 'audio').length === 0 && (
              <p className="text-center py-10 text-slate-400 font-bold italic text-xs uppercase">Chưa có bài hát nào được tải lên</p>
            )}
            {mediaList.filter(i => i.type === 'audio').map((item, idx) => (
              <div key={item.id} className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${currentPlaying === item.id ? 'bg-red-50 ring-1 ring-red-200' : 'bg-slate-50 hover:bg-slate-100'}`}>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-300">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="text-[11px] font-bold text-slate-700 uppercase">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => playAudio(item)} className={`p-3 rounded-xl shadow-md transition-all ${currentPlaying === item.id ? 'bg-red-700 text-white' : 'bg-white text-red-700 hover:scale-110'}`}>
                    {currentPlaying === item.id ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor"/>}
                  </button>
                  {isAdmin && (
                    <button onClick={() => deleteItem(item.id, item.url)} className="p-3 text-slate-300 hover:text-red-600"><Trash2 size={14}/></button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT VIDEO */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
          <h3 className="text-sm font-black text-slate-800 uppercase mb-6 flex items-center gap-3 border-b pb-4">
            <FileVideo className="text-blue-700" /> CÁC ĐIỆU VŨ QUÂN ĐỘI
          </h3>
          <div className="space-y-6">
            {mediaList.filter(i => i.type === 'video').length === 0 && (
              <div className="aspect-video bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-slate-500 border-4 border-dashed border-slate-100">
                <Video size={48} className="mb-2 opacity-20" />
                <span className="text-[10px] font-black uppercase italic">Chưa có dữ liệu Video</span>
              </div>
            )}
            {mediaList.filter(i => i.type === 'video').map((item) => (
              <div key={item.id} className="space-y-3 group">
                <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                  <video src={item.url} controls className="w-full h-full object-contain" />
                </div>
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase italic">{item.name}</span>
                  {isAdmin && <button onClick={() => deleteItem(item.id, item.url)} className="text-red-600 p-2 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={14}/></button>}
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
