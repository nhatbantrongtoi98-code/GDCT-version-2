import React, { useState, useEffect } from 'react';
import { 
  Music, Video, Edit2, FileAudio, FileVideo, Save, AlertCircle, 
  Loader2, XCircle, Plus, Trash2, Youtube 
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
  
  // State quản lý danh sách bài hát và điệu vũ
  const [songs, setSongs] = useState<MediaLink[]>([]);
  const [dances, setDances] = useState<MediaLink[]>([]);

  // Khởi tạo 15 bài hát và 5 điệu vũ mặc định nếu dữ liệu trống
  useEffect(() => {
    if (!isEditing && !isSaving) {
      const cloudSongs = data?.entertainment?.songs || [];
      const cloudDances = data?.entertainment?.dances || [];

      // Nếu chưa có dữ liệu, tạo khung trống sẵn cho Admin
      if (cloudSongs.length === 0 && isAdmin) {
        const defaultSongs = Array.from({ length: 15 }, (_, i) => ({
          id: `song-default-${i}`,
          name: `Bài hát ${i + 1}`,
          embedUrl: ''
        }));
        setSongs(defaultSongs);
      } else {
        setSongs(cloudSongs);
      }

      if (cloudDances.length === 0 && isAdmin) {
        const defaultDances = Array.from({ length: 5 }, (_, i) => ({
          id: `dance-default-${i}`,
          name: `Điệu vũ ${i + 1}`,
          embedUrl: ''
        }));
        setDances(defaultDances);
      } else {
        setDances(cloudDances);
      }
    }
  }, [data, isEditing, isSaving, isAdmin]);

  // Hàm chuyển đổi link YouTube sang dạng Embed chuẩn
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
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : cleanUrl;
    } catch { return cleanUrl; }
  };

  const handleUpdateField = (type: 'songs' | 'dances', id: string, field: keyof MediaLink, value: string) => {
    if (type === 'songs') {
      setSongs(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else {
      setDances(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    // Lọc bỏ những mục Admin để trống hoàn toàn để tối ưu dữ liệu
    const finalSongs = songs
      .map(s => ({ ...s, embedUrl: formatEmbedUrl(s.embedUrl) }))
      .filter(s => s.name.trim() !== '' || s.embedUrl !== '');
      
    const finalDances = dances
      .map(d => ({ ...d, embedUrl: formatEmbedUrl(d.embedUrl) }))
      .filter(d => d.name.trim() !== '' || d.embedUrl !== '');

    try {
      // Gửi dữ liệu lên Server thông qua hàm onUpdateEntertainment của App
      await onUpdateEntertainment((prev: any) => ({
        ...prev,
        entertainment: { 
          songs: finalSongs, 
          dances: finalDances,
          lastUpdated: new Date().toISOString() 
        }
      }));
      
      setIsEditing(false);
      alert("✅ HỆ THỐNG: Đã đồng bộ dữ liệu thành công lên máy chủ.");
    } catch (error) {
      console.error("Lưu thất bại:", error);
      alert("❌ LỖI: Không thể lưu dữ liệu. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto px-4">
      {/* THANH ĐIỀU KHIỂN CHÍNH */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-red-800 rounded-3xl text-white shadow-lg ring-8 ring-red-50">
            <Music size={32} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase italic leading-none">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest italic">
              {isAdmin ? "💎 CHẾ ĐỘ QUẢN TRỊ: Vui lòng nhập link YouTube để cập nhật" : "Nội dung văn hóa nghệ thuật quân đội chính quy"}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-[11px] text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
                  <XCircle size={18} /> HỦY
                </button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[11px] text-white bg-green-600 shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} LƯU CẤU HÌNH
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
        {/* CỘT 15 BÀI HÁT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-b border-slate-200 pb-4">
            <h3 className="text-[14px] font-black text-slate-800 uppercase flex items-center gap-3 italic">
              <FileAudio className="text-red-700" size={22} /> DANH SÁCH 15 BÀI HÁT QUY ĐỊNH
            </h3>
          </div>

          <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
            {songs.map((song, index) => (
              <div key={song.id} className={`p-5 rounded-[2.2rem] border transition-all ${isEditing ? 'bg-slate-50 border-blue-200' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full font-black text-[11px] italic shadow-md">{index + 1}</span>
                  {isEditing ? (
                    <input 
                      className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold focus:ring-2 ring-red-500 outline-none"
                      value={song.name}
                      onChange={(e) => handleUpdateField('songs', song.id, 'name', e.target.value)}
                      placeholder="Tên bài hát..."
                    />
                  ) : (
                    <h4 className="text-[13px] font-black text-slate-700 uppercase">{song.name || `Bài hát ${index + 1}`}</h4>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                    <Youtube size={16} className="text-red-600" />
                    <input 
                      className="flex-1 text-[11px] outline-none"
                      value={song.embedUrl}
                      onChange={(e) => handleUpdateField('songs', song.id, 'embedUrl', e.target.value)}
                      placeholder="Dán link YouTube tại đây..."
                    />
                  </div>
                ) : (
                  song.embedUrl && (
                    <div className="rounded-2xl overflow-hidden aspect-video shadow-md border border-slate-200">
                      <iframe src={song.embedUrl} className="w-full h-full" allowFullScreen title={song.name} />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 5 ĐIỆU VŨ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-b border-slate-200 pb-4">
            <h3 className="text-[14px] font-black text-slate-800 uppercase flex items-center gap-3 italic">
              <FileVideo className="text-blue-700" size={22} /> 5 ĐIỆU VŨ QUÂN ĐỘI
            </h3>
          </div>

          <div className="space-y-6">
            {dances.map((dance, index) => (
              <div key={dance.id} className={`p-6 rounded-[2.5rem] border transition-all ${isEditing ? 'bg-blue-50 border-blue-300 shadow-inner' : 'bg-white border-slate-100 shadow-md'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-700 text-white rounded-xl shadow-md">
                    <Video size={18} />
                  </div>
                  {isEditing ? (
                    <input 
                      className="flex-1 p-3 bg-white border border-blue-200 rounded-xl text-[13px] font-black focus:ring-2 ring-blue-500 outline-none"
                      value={dance.name}
                      onChange={(e) => handleUpdateField('dances', dance.id, 'name', e.target.value)}
                    />
                  ) : (
                    <h4 className="text-[15px] font-black text-slate-800 uppercase italic">Điệu số {index + 1}: {dance.name}</h4>
                  )}
                </div>

                {isEditing ? (
                  <input 
                    className="w-full p-3 bg-white border border-blue-100 rounded-xl text-[11px] outline-none mb-2"
                    value={dance.embedUrl}
                    onChange={(e) => handleUpdateField('dances', dance.id, 'embedUrl', e.target.value)}
                    placeholder="Dán link YouTube hướng dẫn điệu vũ..."
                  />
                ) : (
                  <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-50">
                    {dance.embedUrl ? (
                      <iframe src={dance.embedUrl} className="w-full h-full" allowFullScreen title={dance.name} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                        <Youtube size={48} className="opacity-10" />
                        <span className="text-[10px] font-bold uppercase opacity-30">Chưa cập nhật video</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER CẢNH BÁO VÀ HƯỚNG DẪN */}
      <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-200 flex gap-5 items-start shadow-inner">
        <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm"><AlertCircle size={24} /></div>
        <div className="space-y-2">
          <p className="text-[11px] text-amber-900 font-bold uppercase italic leading-relaxed">
            HƯỚNG DẪN DÀNH CHO QUẢN TRỊ VIÊN:
          </p>
          <ul className="text-[10px] text-amber-800 font-medium space-y-1 list-disc pl-4">
            <li>Bấm <b>"QUẢN TRỊ NỘI DUNG"</b> để mở các ô nhập liệu.</li>
            <li>Dán trực tiếp link YouTube (Ví dụ: https://www.youtube.com/watch?v=...) vào ô tương ứng.</li>
            <li>Phải bấm <b>"LƯU CẤU HÌNH"</b> và đợi thông báo thành công để dữ liệu được ghi đè vĩnh viễn.</li>
            <li>Nếu nội dung không thay đổi sau khi lưu, hãy nhấn <b>F5</b> để làm mới bộ nhớ đệm trình duyệt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentView;
