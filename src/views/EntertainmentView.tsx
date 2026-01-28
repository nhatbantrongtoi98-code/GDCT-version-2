import React, { useState } from 'react';
import { 
  Music, Video, Edit2, FileAudio, FileVideo, Save, Globe 
} from 'lucide-react';

interface MediaLink {
  id: string;
  name: string;
  embedUrl: string;
}

const EntertainmentView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [songs, setSongs] = useState<MediaLink[]>(
    Array.from({ length: 15 }, (_, i) => ({ id: `s-${i}`, name: `Bài hát số ${i + 1}`, embedUrl: '' }))
  );
  const [dances, setDances] = useState<MediaLink[]>(
    Array.from({ length: 5 }, (_, i) => ({ id: `d-${i}`, name: `Điệu vũ số ${i + 1}`, embedUrl: '' }))
  );

  // Hàm tự động chuyển đổi link YouTube sang dạng Embed
  const formatEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  const updateItem = (list: MediaLink[], setList: Function, id: string, field: keyof MediaLink, value: string) => {
    const finalValue = field === 'embedUrl' ? formatEmbedUrl(value) : value;
    setList(list.map(item => item.id === id ? { ...item, [field]: finalValue } : item));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header trang */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg"><Music size={32} /></div>
          <div>
            <h2 className="text-3xl font-black text-red-800 uppercase italic">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Hệ thống nhúng trực tuyến (Cloud Media)</p>
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-[10px] hover:bg-black transition-all shadow-xl"
          >
            {isEditing ? <Save size={16}/> : <Edit2 size={16}/>}
            {isEditing ? "HOÀN TẤT CHỈNH SỬA" : "QUẢN TRỊ DANH SÁCH"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* CỘT 15 BÀI HÁT */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 border-b pb-4 ml-4">
            <FileAudio className="text-red-700" /> 15 BÀI HÁT QUY ĐỊNH
          </h3>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4">
            {songs.map((song, index) => (
              <div key={song.id} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
                <span className="text-[10px] font-black text-red-800 bg-red-50 px-3 py-1 rounded-full mb-3 inline-block">BÀI SỐ {(index + 1).toString().padStart(2, '0')}</span>
                {isEditing ? (
                  <div className="space-y-3">
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[11px] font-bold" value={song.name} onChange={e => updateItem(songs, setSongs, song.id, 'name', e.target.value)} placeholder="Tên bài hát" />
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[10px]" value={song.embedUrl} onChange={e => updateItem(songs, setSongs, song.id, 'embedUrl', e.target.value)} placeholder="Dán link YouTube tại đây" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-black text-slate-700 uppercase">{song.name}</h4>
                    {song.embedUrl ? (
                      <iframe src={song.embedUrl} className="w-full h-[150px] rounded-2xl border-none" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    ) : (
                      <div className="h-[100px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">Chưa có link bài hát</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 5 ĐIỆU VŨ */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3 border-b pb-4 ml-4">
            <FileVideo className="text-blue-700" /> 5 ĐIỆU VŨ QUÂN ĐỘI
          </h3>
          <div className="space-y-8">
            {dances.map((dance, index) => (
              <div key={dance.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-md">
                <span className="text-[10px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block">ĐIỆU VŨ {(index + 1).toString().padStart(2, '0')}</span>
                {isEditing ? (
                  <div className="space-y-3">
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[11px] font-bold" value={dance.name} onChange={e => updateItem(dances, setDances, dance.id, 'name', e.target.value)} />
                    <input className="w-full p-3 bg-slate-50 border rounded-xl text-[10px]" value={dance.embedUrl} onChange={e => updateItem(dances, setDances, dance.id, 'embedUrl', e.target.value)} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-700 uppercase">{dance.name}</h4>
                    <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                      {dance.embedUrl ? (
                        <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen allow="autoplay; encrypted-media"></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Video className="text-slate-700 opacity-20" size={48} /></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentView;
