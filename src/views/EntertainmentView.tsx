import React, { useState, useEffect } from 'react';
import { Music, Video, Edit2, FileAudio, FileVideo, Save, Loader2, XCircle, Youtube } from 'lucide-react';

const EntertainmentView: React.FC<{ 
  isAdmin: boolean; 
  data: any; 
  onUpdateEntertainment: (updater: (prev: any) => any) => Promise<void> 
}> = ({ isAdmin, data, onUpdateEntertainment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Tên kho lưu trữ vĩnh viễn trong trình duyệt
  const STORAGE_KEY = 'MILITARY_ENTERTAINMENT_STORAGE';

  const [songs, setSongs] = useState<any[]>([]);
  const [dances, setDances] = useState<any[]>([]);

  // 1. LẤY DỮ LIỆU TỪ KHO KHI MỞ TRANG
  useEffect(() => {
    // Ưu tiên 1: Dữ liệu đã lưu trong kho (LocalStorage)
    // Ưu tiên 2: Dữ liệu từ Server truyền xuống
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    let initialSongs = [];
    let initialDances = [];

    if (savedData) {
      const parsed = JSON.parse(savedData);
      initialSongs = parsed.songs || [];
      initialDances = parsed.dances || [];
    } else {
      initialSongs = data?.entertainment?.songs || [];
      initialDances = data?.entertainment?.dances || [];
    }

    // Nếu cả 2 đều trống, tạo sẵn khung 15 bài và 5 điệu
    if (initialSongs.length === 0) {
      initialSongs = Array.from({ length: 15 }, (_, i) => ({ id: `s-${i}`, name: `Bài hát ${i + 1}`, embedUrl: '' }));
    }
    if (initialDances.length === 0) {
      initialDances = Array.from({ length: 5 }, (_, i) => ({ id: `d-${i}`, name: `Điệu vũ ${i + 1}`, embedUrl: '' }));
    }

    setSongs(initialSongs);
    setDances(initialDances);
  }, [data]);

  // Hàm chuẩn hóa link Youtube
  const formatUrl = (url: string) => {
    if (!url) return '';
    const id = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('youtu.be/')[1]?.split('?')[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  // 2. HÀM LƯU VĨNH VIỄN
  const handleSave = async () => {
    setIsSaving(true);
    
    const finalSongs = songs.map(s => ({ ...s, embedUrl: formatUrl(s.embedUrl) }));
    const finalDances = dances.map(d => ({ ...d, embedUrl: formatUrl(d.embedUrl) }));

    try {
      // BƯỚC A: Cất vào kho của trình duyệt (Lưu vĩnh viễn tại máy này)
      const dataToSave = { songs: finalSongs, dances: finalDances };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

      // BƯỚC B: Gửi lên Server (Nếu file cha có kết nối Database)
      await onUpdateEntertainment((prev: any) => ({
        ...prev,
        entertainment: dataToSave
      }));

      setIsEditing(false);
      alert("✅ ĐÃ LƯU VĨNH VIỄN: Dữ liệu sẽ không bị mất khi tải lại trang.");
    } catch (e) {
      console.error(e);
      // Ngay cả khi Server lỗi, Bước A đã thành công nên dữ liệu vẫn còn ở máy này
      setIsEditing(false);
      alert("⚠️ LƯU TẠM THỜI: Đã lưu vào máy tính này, nhưng chưa đồng bộ được lên Server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header chuẩn theo yêu cầu */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg"><Music size={28} /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Hệ thống lưu trữ vĩnh viễn 15 bài & 5 điệu</p>
          </div>
        </div>
        {isAdmin && (
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`px-8 py-4 rounded-2xl font-black text-[11px] text-white transition-all flex items-center gap-2 ${isEditing ? 'bg-green-600' : 'bg-slate-900 shadow-xl'}`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : (isEditing ? <Save size={18} /> : <Edit2 size={18} />)}
            {isEditing ? "XÁC NHẬN LƯU VĨNH VIỄN" : "QUẢN TRỊ NỘI DUNG"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DANH SÁCH 15 BÀI HÁT */}
        <div className="bg-slate-50 p-6 rounded-[3rem] border">
          <h3 className="flex items-center gap-2 font-black text-slate-700 uppercase italic mb-6 ml-4"><FileAudio className="text-red-700" /> 15 BÀI HÁT QUY ĐỊNH</h3>
          <div className="space-y-3 max-h-[1000px] overflow-y-auto pr-2">
            {songs.map((song, i) => (
              <div key={song.id} className="bg-white p-4 rounded-3xl border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-red-800 text-white flex items-center justify-center rounded-xl text-[10px] font-black">{i+1}</span>
                  {isEditing ? (
                    <input className="flex-1 text-[12px] font-bold border-b p-1 outline-none focus:border-red-500" value={song.name} onChange={e => setSongs(prev => prev.map(s => s.id === song.id ? {...s, name: e.target.value} : s))} />
                  ) : (
                    <span className="text-[13px] font-black text-slate-700 uppercase">{song.name}</span>
                  )}
                </div>
                {isEditing ? (
                  <input className="w-full text-[10px] p-2 bg-slate-50 rounded-xl italic mt-1 border" placeholder="Dán link Youtube tại đây..." value={song.embedUrl} onChange={e => setSongs(prev => prev.map(s => s.id === song.id ? {...s, embedUrl: e.target.value} : s))} />
                ) : (
                  song.embedUrl && <iframe src={song.embedUrl} className="w-full aspect-video rounded-2xl mt-2 border shadow-inner" allowFullScreen />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5 ĐIỆU VŨ */}
        <div className="bg-blue-50/50 p-6 rounded-[3rem] border">
          <h3 className="flex items-center gap-2 font-black text-slate-700 uppercase italic mb-6 ml-4"><FileVideo className="text-blue-700" /> 5 ĐIỆU VŨ QUÂN ĐỘI</h3>
          <div className="space-y-6">
            {dances.map((dance, i) => (
              <div key={dance.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Youtube className="text-red-600" size={24} />
                  {isEditing ? (
                    <input className="flex-1 font-black text-slate-800 border-b outline-none text-[15px]" value={dance.name} onChange={e => setDances(prev => prev.map(d => d.id === dance.id ? {...d, name: e.target.value} : d))} />
                  ) : (
                    <span className="font-black text-slate-800 uppercase italic text-[15px]">{dance.name}</span>
                  )}
                </div>
                {isEditing ? (
                  <input className="w-full text-[11px] p-3 bg-slate-50 rounded-2xl border" placeholder="Link video điệu vũ..." value={dance.embedUrl} onChange={e => setDances(prev => prev.map(d => d.id === dance.id ? {...d, embedUrl: e.target.value} : d))} />
                ) : (
                  <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl">
                    {dance.embedUrl ? <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen /> : <div className="h-full flex items-center justify-center text-white/20 font-black italic">CHƯA CẬP NHẬT VIDEO</div>}
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
