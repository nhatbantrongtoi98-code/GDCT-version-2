import React, { useState, useEffect } from 'react';
import { 
  Music, Video, Edit2, FileAudio, FileVideo, Save, AlertCircle 
} from 'lucide-react';

interface MediaLink {
  id: string;
  name: string;
  embedUrl: string;
}

// 1. Thêm Props để nhận dữ liệu và hàm lưu từ App.tsx
const EntertainmentView: React.FC<{ 
  isAdmin: boolean; 
  data: any; 
  onUpdateEntertainment: (updater: (prev: any) => any) => void 
}> = ({ isAdmin, data, onUpdateEntertainment }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // 2. Đồng bộ hóa State nội bộ với dữ liệu từ Firebase
  const [songs, setSongs] = useState<MediaLink[]>([]);
  const [dances, setDances] = useState<MediaLink[]>([]);

  useEffect(() => {
    if (data?.entertainment) {
      setSongs(data.entertainment.songs || []);
      setDances(data.entertainment.dances || []);
    }
  }, [data]);

  const formatEmbedUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      return cleanUrl.replace('watch?v=', 'embed/') + "?rel=0&autoplay=0";
    }
    if (cleanUrl.includes('youtu.be/')) {
      return cleanUrl.replace('youtu.be/', 'youtube.com/embed/') + "?rel=0&autoplay=0";
    }
    if (cleanUrl.includes('soundcloud.com') && !cleanUrl.includes('api.soundcloud.com')) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23ff5500&auto_play=false&hide_related=true`;
    }
    return cleanUrl;
  };

  const updateItem = (list: MediaLink[], setList: Function, id: string, field: keyof MediaLink, value: string) => {
    const finalValue = field === 'embedUrl' ? formatEmbedUrl(value) : value;
    setList(list.map(item => item.id === id ? { ...item, [field]: finalValue } : item));
  };

  // 3. Hàm thực hiện lưu dữ liệu lên Cloud
  const handleSave = () => {
    onUpdateEntertainment((prev: any) => ({
      ...prev,
      songs: songs,
      dances: dances
    }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg"><Music size={32} /></div>
          <div>
            <h2 className="text-3xl font-black text-red-800 uppercase italic">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">15 bài hát quy định & 5 điệu vũ quân đội</p>
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] shadow-xl transition-all ${isEditing ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}
          >
            {isEditing ? <Save size={16}/> : <Edit2 size={16}/>}
            {isEditing ? "LƯU CẤU HÌNH" : "QUẢN TRỊ DANH SÁCH"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 border-b pb-4 ml-4">
            <FileAudio className="text-red-700" /> DANH SÁCH BÀI HÁT
          </h3>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
            {songs.map((song, index) => (
              <div key={song.id} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-red-700 bg-red-50 px-3 py-1 rounded-full uppercase">BÀI SỐ {(index + 1).toString().padStart(2, '0')}</span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[11px] font-bold" value={song.name} onChange={e => updateItem(songs, setSongs, song.id, 'name', e.target.value)} placeholder="Tên bài hát" />
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[10px]" value={song.embedUrl} onChange={e => updateItem(songs, setSongs, song.id, 'embedUrl', e.target.value)} placeholder="Dán link YouTube hoặc SoundCloud" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-black text-slate-700 uppercase leading-tight">{song.name}</h4>
                    {song.embedUrl ? (
                      <iframe 
                        src={song.embedUrl} 
                        className="w-full h-[120px] rounded-2xl border-none shadow-inner" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="h-[100px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">Trống</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 border-b pb-4 ml-4">
            <FileVideo className="text-blue-700" /> 5 ĐIỆU VŨ QUÂN ĐỘI
          </h3>
          <div className="space-y-8">
            {dances.map((dance, index) => (
              <div key={dance.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-md">
                <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block uppercase">ĐIỆU VŨ {(index + 1).toString().padStart(2, '0')}</span>
                {isEditing ? (
                  <div className="space-y-3">
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[11px] font-bold" value={dance.name} onChange={e => updateItem(dances, setDances, dance.id, 'name', e.target.value)} />
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[10px]" value={dance.embedUrl} onChange={e => updateItem(dances, setDances, dance.id, 'embedUrl', e.target.value)} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-700 uppercase leading-tight">{dance.name}</h4>
                    <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                      {dance.embedUrl ? (
                        <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen allow="autoplay; encrypted-media"></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10"><Video size={48} /></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4 items-start">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
            **Lưu ý về lỗi phát nhạc:** Nếu bài hát báo lỗi "Không khả dụng", đó là do YouTube chặn phát nhạc có bản quyền trên trang web nhúng. 
            <br/>**Mẹo:** Đồng chí hãy thử tìm bài hát đó trên **SoundCloud** và dán link vào, hoặc chọn các video YouTube có chữ **"Lyrics"** hoặc **"Karaoke"** thường sẽ không bị chặn.
          </p>
        </div>
      )}
    </div>
  );
};

export default EntertainmentView;
