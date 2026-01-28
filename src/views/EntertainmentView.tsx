import React, { useState, useEffect, useCallback } from 'react';
import { 
  Music, Video, Edit2, FileAudio, FileVideo, Save, AlertCircle, 
  Loader2, XCircle, Youtube, RefreshCw
} from 'lucide-react';

interface MediaLink {
  id: string;
  name: string;
  embedUrl: string;
}

const EntertainmentView: React.FC<{ 
  isAdmin: boolean; 
  data: any; 
  onUpdateEntertainment: (updater: (prev: any) => any) => Promise<void> 
}> = ({ isAdmin, data, onUpdateEntertainment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Khởi tạo state
  const [songs, setSongs] = useState<MediaLink[]>([]);
  const [dances, setDances] = useState<MediaLink[]>([]);

  // Hàm tạo dữ liệu mẫu nếu database trống
  const generateDefaultData = useCallback(() => {
    const defaultSongs = Array.from({ length: 15 }, (_, i) => ({
      id: `song-${i + 1}`,
      name: `Bài hát ${i + 1}`,
      embedUrl: ''
    }));
    const defaultDances = Array.from({ length: 5 }, (_, i) => ({
      id: `dance-${i + 1}`,
      name: `Điệu vũ ${i + 1}`,
      embedUrl: ''
    }));
    return { defaultSongs, defaultDances };
  }, []);

  // ĐỒNG BỘ DỮ LIỆU TỪ SERVER VÀ LOCAL STORAGE
  useEffect(() => {
    if (!isEditing && !isSaving) {
      const serverSongs = data?.entertainment?.songs;
      const serverDances = data?.entertainment?.dances;

      if (serverSongs && serverSongs.length > 0) {
        setSongs(serverSongs);
      } else {
        setSongs(generateDefaultData().defaultSongs);
      }

      if (serverDances && serverDances.length > 0) {
        setDances(serverDances);
      } else {
        setDances(generateDefaultData().defaultDances);
      }
    }
  }, [data, isEditing, isSaving, generateDefaultData]);

  const formatEmbedUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl) return '';
    if (cleanUrl.includes('youtube.com/embed/')) return cleanUrl;
    try {
      let videoId = '';
      if (cleanUrl.includes('watch?v=')) {
        videoId = new URL(cleanUrl).searchParams.get('v') || '';
      } else if (cleanUrl.includes('youtu.be/')) {
        videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : cleanUrl;
    } catch { return cleanUrl; }
  };

  const handleUpdateField = (type: 'songs' | 'dances', id: string, field: keyof MediaLink, value: string) => {
    if (type === 'songs') {
      setSongs(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else {
      setDances(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  // HÀM LƯU CHUYÊN NGHIỆP
  const handleSave = async () => {
    if (isSaving) return;
    
    // Kiểm tra nhanh dữ liệu
    const hasData = songs.some(s => s.embedUrl !== '') || dances.some(d => d.embedUrl !== '');
    if (!hasData) {
      if (!window.confirm("Cảnh báo: Đồng chí chưa nhập bất kỳ link video nào. Vẫn tiếp tục lưu?")) return;
    }

    setIsSaving(true);

    const finalSongs = songs.map(s => ({ ...s, embedUrl: formatEmbedUrl(s.embedUrl) }));
    const finalDances = dances.map(d => ({ ...d, embedUrl: formatEmbedUrl(d.embedUrl) }));

    try {
      // 1. Lưu vào LocalStorage của trình duyệt (Dự phòng lỗi mạng)
      localStorage.setItem('temp_entertainment_data', JSON.stringify({ finalSongs, finalDances }));

      // 2. Đẩy lên Server (Vercel/Database)
      await onUpdateEntertainment((prev: any) => ({
        ...prev,
        entertainment: { 
          songs: finalSongs, 
          dances: finalDances,
          updatedAt: new Date().toISOString()
        }
      }));
      
      setIsEditing(false);
      alert("✅ THÀNH CÔNG: Dữ liệu đã được đồng bộ vĩnh viễn lên hệ thống.");
    } catch (error) {
      console.error("Lỗi đồng bộ:", error);
      alert("❌ LỖI LƯU TRỮ: Máy chủ không phản hồi. Tuy nhiên dữ liệu đã được lưu tạm trên máy tính này.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto px-4">
      {/* HEADER QUẢN TRỊ */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-4 z-20">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg ring-4 ring-red-50">
            <Music size={32} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase italic leading-none">GÓC GIẢI TRÍ</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`h-2 w-2 rounded-full ${isAdmin ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                {isAdmin ? "CHẾ ĐỘ QUẢN TRỊ VIÊN - ĐÃ CẤU HÌNH 15 BÀI & 5 ĐIỆU" : "Nội dung văn hóa nghệ thuật"}
              </p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-[11px] text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200">
                  <XCircle size={18} /> HỦY BỎ
                </button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[11px] text-white bg-blue-600 shadow-xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 transition-all border-b-4 border-blue-800 active:border-b-0">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} XÁC NHẬN LƯU VĨNH VIỄN
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-[11px] text-white bg-slate-900 shadow-2xl hover:bg-black transition-all border-b-4 border-slate-700 active:border-b-0">
                <Edit2 size={18} /> BẮT ĐẦU CHỈNH SỬA
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* KHU VỰC 15 BÀI HÁT */}
        <div className="space-y-6 bg-slate-50/50 p-6 rounded-[3rem] border border-slate-100">
          <div className="flex items-center gap-3 px-4 mb-2">
            <FileAudio className="text-red-700" size={24} />
            <h3 className="text-[15px] font-black text-slate-800 uppercase italic">15 bài hát quy định</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[1200px] pr-2 custom-scrollbar">
            {songs.map((song, index) => (
              <div key={song.id} className={`group p-5 rounded-[2.2rem] transition-all border-2 ${isEditing ? 'bg-white border-blue-100 shadow-md' : 'bg-white/60 border-transparent shadow-sm'}`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-2xl font-black text-[12px] shadow-lg italic shrink-0">
                    {index + 1}
                  </div>
                  {isEditing ? (
                    <input 
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold focus:ring-2 ring-blue-500 outline-none transition-all"
                      value={song.name}
                      onChange={(e) => handleUpdateField('songs', song.id, 'name', e.target.value)}
                      placeholder="Nhập tên bài hát..."
                    />
                  ) : (
                    <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{song.name}</h4>
                  )}
                </div>

                {isEditing ? (
                  <div className="relative group">
                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                    <input 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium outline-none focus:bg-white transition-all"
                      value={song.embedUrl}
                      onChange={(e) => handleUpdateField('songs', song.id, 'embedUrl', e.target.value)}
                      placeholder="Dán link bài hát từ YouTube..."
                    />
                  </div>
                ) : (
                  song.embedUrl && (
                    <div className="rounded-[1.5rem] overflow-hidden aspect-video shadow-inner bg-black border border-slate-200">
                      <iframe src={song.embedUrl} className="w-full h-full" allowFullScreen loading="lazy" />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* KHU VỰC 5 ĐIỆU VŨ */}
        <div className="space-y-6 bg-blue-50/30 p-6 rounded-[3rem] border border-blue-100">
          <div className="flex items-center gap-3 px-4 mb-2">
            <FileVideo className="text-blue-700" size={24} />
            <h3 className="text-[15px] font-black text-slate-800 uppercase italic">5 điệu vũ quân đội</h3>
          </div>

          <div className="space-y-6">
            {dances.map((dance, index) => (
              <div key={dance.id} className={`p-6 rounded-[2.8rem] transition-all border-2 ${isEditing ? 'bg-white border-blue-300 shadow-xl' : 'bg-white border-slate-200 shadow-md'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-blue-100 shadow-lg">
                    <Video size={20} />
                  </div>
                  {isEditing ? (
                    <div className="flex-1 space-y-2">
                      <label className="text-[9px] font-black text-blue-600 uppercase ml-1">Tên điệu vũ</label>
                      <input 
                        className="w-full p-3 bg-slate-50 border border-blue-100 rounded-xl text-[14px] font-black outline-none focus:ring-2 ring-blue-500"
                        value={dance.name}
                        onChange={(e) => handleUpdateField('dances', dance.id, 'name', e.target.value)}
                      />
                    </div>
                  ) : (
                    <h4 className="text-[16px] font-black text-slate-800 italic uppercase">Điệu số {index + 1}: {dance.name}</h4>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-red-600 uppercase ml-1">Đường dẫn video (YouTube)</label>
                    <input 
                      className="w-full p-4 bg-slate-50 border border-blue-100 rounded-xl text-[11px] font-medium outline-none"
                      value={dance.embedUrl}
                      onChange={(e) => handleUpdateField('dances', dance.id, 'embedUrl', e.target.value)}
                      placeholder="Ví dụ: https://www.youtube.com/watch?v=..."
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-100/50">
                    {dance.embedUrl ? (
                      <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                        <Youtube size={48} className="opacity-10" />
                        <span className="text-[10px] font-black uppercase opacity-20 tracking-[0.3em]">Đang chờ cập nhật video</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER HƯỚNG DẪN */}
      <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-xl flex flex-col md:flex-row gap-8 items-center">
        <div className="p-5 bg-amber-50 rounded-3xl text-amber-600 animate-bounce"><AlertCircle size={32} /></div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h4 className="text-[14px] font-black text-slate-800 uppercase italic">Hướng dẫn bảo mật dữ liệu</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-[11px] text-slate-600 font-bold uppercase italic leading-relaxed">
            <p className="flex items-center gap-2"><RefreshCw size={14} className="text-blue-500" /> Sau khi bấm "Lưu", hãy đợi thông báo xác nhận.</p>
            <p className="flex items-center gap-2"><RefreshCw size={14} className="text-blue-500" /> Nếu video không hiện, hãy kiểm tra lại link YouTube.</p>
            <p className="flex items-center gap-2"><RefreshCw size={14} className="text-blue-500" /> Hệ thống tự động ghi nhớ 15 bài và 5 điệu chính quy.</p>
            <p className="flex items-center gap-2"><RefreshCw size={14} className="text-blue-500" /> Nhấn Ctrl + F5 nếu nội dung bị kẹt ở bản cũ.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentView;
