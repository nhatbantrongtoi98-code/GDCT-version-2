import React, { useState, useEffect } from 'react';
import { Music, Video, Edit2, FileAudio, FileVideo, Save, AlertCircle, Loader2, XCircle, Youtube } from 'lucide-react';

const EntertainmentView: React.FC<{ 
  isAdmin: boolean; 
  data: any; 
  onUpdateEntertainment: (updater: (prev: any) => any) => Promise<void> 
}> = ({ isAdmin, data, onUpdateEntertainment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [songs, setSongs] = useState<any[]>([]);
  const [dances, setDances] = useState<any[]>([]);

  // 1. Khởi tạo dữ liệu: Ưu tiên dữ liệu từ Cloud > LocalStorage > Mặc định
  useEffect(() => {
    if (!isEditing && !isSaving) {
      const savedLocal = localStorage.getItem('military_app_data');
      const localData = savedLocal ? JSON.parse(savedLocal)?.entertainment : null;
      
      const currentSongs = data?.entertainment?.songs || localData?.songs || [];
      const currentDances = data?.entertainment?.dances || localData?.dances || [];

      // Tạo khung 15 bài nếu trống
      if (currentSongs.length === 0) {
        setSongs(Array.from({ length: 15 }, (_, i) => ({ id: `s-${i}`, name: `Bài hát ${i + 1}`, embedUrl: '' })));
      } else { setSongs(currentSongs); }

      // Tạo khung 5 điệu nếu trống
      if (currentDances.length === 0) {
        setDances(Array.from({ length: 5 }, (_, i) => ({ id: `d-${i}`, name: `Điệu vũ ${i + 1}`, embedUrl: '' })));
      } else { setDances(currentDances); }
    }
  }, [data, isEditing, isSaving]);

  const formatEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const finalSongs = songs.map(s => ({ ...s, embedUrl: formatEmbedUrl(s.embedUrl) }));
      const finalDances = dances.map(d => ({ ...d, embedUrl: formatEmbedUrl(d.embedUrl) }));

      await onUpdateEntertainment((prev: any) => ({
        ...prev,
        entertainment: { songs: finalSongs, dances: finalDances }
      }));

      setIsEditing(false);
      alert("✅ ĐÃ LƯU THÀNH CÔNG! Dữ liệu đã được ghi nhớ vĩnh viễn.");
    } catch (e) {
      alert("❌ LỖI KẾT NỐI: Không thể gửi dữ liệu lên máy chủ.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl border flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-700 rounded-2xl text-white"><Music size={28} /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">Góc Giải Trí</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">15 Bài hát & 5 Điệu vũ quy định</p>
          </div>
        </div>
        {isAdmin && (
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`px-8 py-4 rounded-2xl font-black text-[11px] text-white transition-all flex items-center gap-2 ${isEditing ? 'bg-green-600 shadow-green-100 hover:bg-green-700' : 'bg-slate-900 shadow-xl hover:bg-black'}`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : (isEditing ? <Save size={18} /> : <Edit2 size={18} />)}
            {isEditing ? "XÁC NHẬN LƯU CẤU HÌNH" : "QUẢN TRỊ NỘI DUNG"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cột Bài Hát */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-black text-slate-700 uppercase italic ml-4"><FileAudio size={20} /> Danh sách bài hát</h3>
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {songs.map((song, i) => (
              <div key={song.id} className="bg-white p-4 rounded-[1.5rem] border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 bg-slate-100 flex items-center justify-center rounded-full text-[10px] font-bold">{i+1}</span>
                  {isEditing ? (
                    <input className="flex-1 text-[12px] font-bold border-b outline-none focus:border-red-500" value={song.name} onChange={e => setSongs(prev => prev.map(s => s.id === song.id ? {...s, name: e.target.value} : s))} />
                  ) : (
                    <span className="text-[13px] font-black uppercase text-slate-700">{song.name}</span>
                  )}
                </div>
                {isEditing ? (
                  <input className="w-full text-[10px] p-2 bg-slate-50 rounded italic" placeholder="Dán link YouTube..." value={song.embedUrl} onChange={e => setSongs(prev => prev.map(s => s.id === song.id ? {...s, embedUrl: e.target.value} : s))} />
                ) : (
                  song.embedUrl && <iframe src={song.embedUrl} className="w-full aspect-video rounded-xl mt-2" allowFullScreen />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cột Điệu Vũ */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-black text-slate-700 uppercase italic ml-4"><FileVideo size={20} /> 5 Điệu vũ quân đội</h3>
          {dances.map((dance, i) => (
            <div key={dance.id} className="bg-white p-5 rounded-[2rem] border shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Youtube className="text-red-600" />
                {isEditing ? (
                  <input className="flex-1 font-black text-slate-800 border-b outline-none" value={dance.name} onChange={e => setDances(prev => prev.map(d => d.id === dance.id ? {...d, name: e.target.value} : d))} />
                ) : (
                  <span className="font-black text-slate-800 uppercase italic text-[14px]">{dance.name}</span>
                )}
              </div>
              {isEditing ? (
                <input className="w-full text-[11px] p-3 bg-slate-50 rounded-xl" placeholder="Link video điệu vũ..." value={dance.embedUrl} onChange={e => setDances(prev => prev.map(d => d.id === dance.id ? {...d, embedUrl: e.target.value} : d))} />
              ) : (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                  {dance.embedUrl ? <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen /> : <div className="h-full flex items-center justify-center text-slate-500 text-[10px] uppercase font-bold">Chưa có video</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentView;
