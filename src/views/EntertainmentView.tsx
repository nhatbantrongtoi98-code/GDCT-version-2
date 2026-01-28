import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, Video, Edit2, FileAudio, FileVideo, Save, AlertCircle, 
  Loader2, CheckCircle2, XCircle, Plus, Trash2, LayoutGrid
} from 'lucide-react';

interface MediaLink {
  id: string;
  name: string;
  embedUrl: string;
}

const EntertainmentView: React.FC<{ 
  isAdmin: boolean; 
  data: any; 
  onUpdateEntertainment: (updater: (prev: any) => any) => void 
}> = ({ isAdmin, data, onUpdateEntertainment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [songs, setSongs] = useState<MediaLink[]>([]);
  const [dances, setDances] = useState<MediaLink[]>([]);
  
  // 1. Đồng bộ dữ liệu từ Cloud
  useEffect(() => {
    if (isEditing || isSaving) return;
    setSongs(data?.entertainment?.songs || []);
    setDances(data?.entertainment?.dances || []);
  }, [data, isEditing, isSaving]);

  // 2. Hàm format URL chuẩn Embed YouTube
  const formatEmbedUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl || cleanUrl.includes('youtube.com/embed/')) return cleanUrl;
    try {
      const videoId = cleanUrl.includes('watch?v=') 
        ? new URL(cleanUrl).searchParams.get('v') 
        : cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : cleanUrl;
    } catch { return cleanUrl; }
  };

  // --- CHỨC NĂNG CHỈ DÀNH CHO ADMIN ---

  const handleAddItem = (type: 'songs' | 'dances') => {
    const newItem: MediaLink = { 
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      name: '', 
      embedUrl: '' 
    };
    if (type === 'songs') setSongs(prev => [...prev, newItem]);
    else setDances(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (type: 'songs' | 'dances', id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa nội dung này không?")) {
      if (type === 'songs') setSongs(prev => prev.filter(item => item.id !== id));
      else setDances(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleUpdateField = (type: 'songs' | 'dances', id: string, field: keyof MediaLink, value: string) => {
    const setter = type === 'songs' ? setSongs : setDances;
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const finalSongs = songs.map(s => ({ ...s, embedUrl: formatEmbedUrl(s.embedUrl) }));
    const finalDances = dances.map(d => ({ ...d, embedUrl: formatEmbedUrl(d.embedUrl) }));

    try {
      await onUpdateEntertainment((prev: any) => ({
        ...prev,
        entertainment: { songs: finalSongs, dances: finalDances }
      }));
      setIsEditing(false);
    } catch (error) {
      alert("Lỗi máy chủ, không thể lưu!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* HEADER BAR */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg ring-8 ring-red-50"><Music size={32} /></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase italic leading-none">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-[0.2em]">Nội dung văn hóa nghệ thuật chính quy</p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-[11px] text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
                  <XCircle size={18} /> HỦY BỎ
                </button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[11px] text-white bg-green-600 shadow-lg shadow-green-100 hover:bg-green-700 disabled:opacity-50 transition-all">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} XÁC NHẬN LƯU
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[11px] text-white bg-slate-900 shadow-xl hover:bg-black transition-all">
                <Edit2 size={18} /> QUẢN TRỊ NỘI DUNG
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* CỘT 1: DANH SÁCH BÀI HÁT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-b pb-4">
            <h3 className="text-[14px] font-black text-slate-800 uppercase flex items-center gap-3 italic">
              <FileAudio className="text-red-700" size={22} /> DANH SÁCH BÀI HÁT
            </h3>
            {isAdmin && isEditing && (
              <button onClick={() => handleAddItem('songs')} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black hover:bg-red-700 shadow-lg shadow-red-100 transition-all">
                <Plus size={16} /> THÊM MỚI
              </button>
            )}
          </div>

          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {songs.length === 0 && <div className="text-center py-10 text-slate-300 font-bold italic text-[12px] uppercase">Chưa có bài hát nào</div>}
            {songs.map((song, index) => (
              <div key={song.id} className="group bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm hover:border-red-100 transition-all relative">
                {isAdmin && isEditing && (
                  <button onClick={() => handleRemoveItem('songs', song.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all z-10">
                    <Trash2 size={14} />
                  </button>
                )}
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold focus:ring-2 ring-red-500 outline-none" value={song.name} onChange={e => handleUpdateField('songs', song.id, 'name', e.target.value)} placeholder="Tên bài hát..." />
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] outline-none" value={song.embedUrl} onChange={e => handleUpdateField('songs', song.id, 'embedUrl', e.target.value)} placeholder="Link video YouTube..." />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-700 rounded-full font-black text-[11px] italic">{index + 1}</span>
                      <h4 className="text-[13px] font-black text-slate-700 uppercase">{song.name || "Chưa đặt tên"}</h4>
                    </div>
                    {song.embedUrl && (
                      <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-inner">
                        <iframe src={song.embedUrl} className="w-full h-full border-none" allowFullScreen />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 2: CÁC ĐIỆU VŨ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-b pb-4">
            <h3 className="text-[14px] font-black text-slate-800 uppercase flex items-center gap-3 italic">
              <FileVideo className="text-blue-700" size={22} /> VIDEO ĐIỆU VŨ
            </h3>
            {isAdmin && isEditing && (
              <button onClick={() => handleAddItem('dances')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                <Plus size={16} /> THÊM MỚI
              </button>
            )}
          </div>

          <div className="space-y-6">
            {dances.length === 0 && <div className="text-center py-10 text-slate-300 font-bold italic text-[12px] uppercase">Chưa có điệu vũ nào</div>}
            {dances.map((dance, index) => (
              <div key={dance.id} className="bg-white p-6 rounded-[2.8rem] border border-slate-100 shadow-md relative group">
                {isAdmin && isEditing && (
                  <button onClick={() => handleRemoveItem('dances', dance.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 z-10 transition-all">
                    <Trash2 size={16} />
                  </button>
                )}

                {isEditing ? (
                  <div className="space-y-4">
                    <input className="w-full p-4 bg-slate-50 border rounded-2xl text-[13px] font-black focus:ring-2 ring-blue-500 outline-none" value={dance.name} onChange={e => handleUpdateField('dances', dance.id, 'name', e.target.value)} placeholder="Tên điệu vũ..." />
                    <input className="w-full p-4 bg-slate-50 border rounded-2xl text-[11px] outline-none" value={dance.embedUrl} onChange={e => handleUpdateField('dances', dance.id, 'embedUrl', e.target.value)} placeholder="Dán link video hướng dẫn..." />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-[15px] font-black text-slate-800 uppercase italic flex items-center gap-3">
                      <span className="text-blue-600">#{index + 1}</span> {dance.name || "Điệu vũ mới"}
                    </h4>
                    <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-50">
                      {dance.embedUrl ? (
                        <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3 italic">
                          <Video size={40} className="opacity-10" />
                          <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Video đang cập nhật</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex gap-5 items-center">
        <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm"><AlertCircle size={24} /></div>
        <p className="text-[11px] text-amber-900 font-bold uppercase italic leading-relaxed">
          Lưu ý dành cho Admin: Hệ thống hỗ trợ dán link YouTube trực tiếp. 
          Hãy bấm "Xác nhận lưu" sau khi thực hiện thêm hoặc xóa để dữ liệu được đồng bộ vĩnh viễn lên máy chủ.
        </p>
      </div>
    </div>
  );
};

export default EntertainmentView;
