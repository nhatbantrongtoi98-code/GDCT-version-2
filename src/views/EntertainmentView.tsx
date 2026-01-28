import React, { useState } from 'react';
import { 
  Music, Video, Plus, Trash2, Edit2, Play, 
  ExternalLink, FileAudio, FileVideo, Save, X 
} from 'lucide-react';

interface MediaLink {
  id: string;
  name: string;
  type: 'audio' | 'video';
  embedUrl: string; // Link nhúng từ YouTube, SoundCloud...
}

const EntertainmentView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [mediaLinks, setMediaLinks] = useState<MediaLink[]>([
    { id: '1', name: '15 Bài hát quy định (Playlist)', type: 'audio', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLxxx' },
    { id: '2', name: 'Vũ điệu hành quân', type: 'video', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ]);

  const addLink = (type: 'audio' | 'video') => {
    const newLink: MediaLink = {
      id: Date.now().toString(),
      name: type === 'audio' ? 'Tên bài hát mới' : 'Tên điệu vũ mới',
      type: type,
      embedUrl: ''
    };
    setMediaLinks([...mediaLinks, newLink]);
  };

  const updateLink = (id: string, field: keyof MediaLink, value: string) => {
    setMediaLinks(mediaLinks.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const deleteLink = (id: string) => {
    if (window.confirm("Xóa link nhúng này?")) {
      setMediaLinks(mediaLinks.filter(l => l.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-red-700 rounded-3xl text-white shadow-lg"><Music size={32} /></div>
          <div>
            <h2 className="text-3xl font-black text-red-800 uppercase italic">GÓC GIẢI TRÍ</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hệ thống nhúng dữ liệu trực tuyến (Cloud Media)</p>
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-[10px] flex items-center gap-2 hover:bg-black transition-all"
          >
            {isEditing ? <Save size={16}/> : <Edit2 size={16}/>}
            {isEditing ? "HOÀN TẤT CHỈNH SỬA" : "QUẢN LÝ LINK NHÚNG"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CỘT NHẠC (Nhúng link âm thanh) */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3">
              <FileAudio className="text-red-700" /> 15 BÀI HÁT QUY ĐỊNH
            </h3>
            {isAdmin && isEditing && (
              <button onClick={() => addLink('audio')} className="text-[10px] font-black text-blue-600 hover:underline">+ THÊM LINK</button>
            )}
          </div>
          
          <div className="space-y-4">
            {mediaLinks.filter(l => l.type === 'audio').map(link => (
              <div key={link.id} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input className="w-full p-2 border rounded-xl text-xs font-bold" value={link.name} onChange={e => updateLink(link.id, 'name', e.target.value)} placeholder="Tên bài hát" />
                    <input className="w-full p-2 border rounded-xl text-xs" value={link.embedUrl} onChange={e => updateLink(link.id, 'embedUrl', e.target.value)} placeholder="Link nhúng (YouTube Embed URL)" />
                    <button onClick={() => deleteLink(link.id)} className="text-red-500 text-[10px] font-bold">XÓA</button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-black text-slate-600 uppercase italic block">{link.name}</span>
                    <iframe src={link.embedUrl} className="w-full h-[150px] rounded-2xl" allow="autoplay"></iframe>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CỘT VŨ ĐIỆU (Nhúng link video) */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-3">
              <FileVideo className="text-blue-700" /> CÁC ĐIỆU VŨ QUÂN ĐỘI
            </h3>
            {isAdmin && isEditing && (
              <button onClick={() => addLink('video')} className="text-[10px] font-black text-blue-600 hover:underline">+ THÊM LINK</button>
            )}
          </div>

          <div className="space-y-4">
            {mediaLinks.filter(l => l.type === 'video').map(link => (
              <div key={link.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input className="w-full p-2 border rounded-xl text-xs font-bold" value={link.name} onChange={e => updateLink(link.id, 'name', e.target.value)} />
                    <input className="w-full p-2 border rounded-xl text-xs" value={link.embedUrl} onChange={e => updateLink(link.id, 'embedUrl', e.target.value)} />
                    <button onClick={() => deleteLink(link.id)} className="text-red-500 text-[10px] font-bold">XÓA</button>
                  </div>
                ) : (
                  <div className="aspect-video rounded-3xl overflow-hidden bg-black shadow-lg">
                    <iframe src={link.embedUrl} className="w-full h-full" allowFullScreen></iframe>
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
