import React, { useState, useRef } from 'react';
import { 
  Edit2, Save, Image as ImageIcon, Music, Monitor, 
  Upload, Trash2, X, Layout as LayoutIcon, Shield, Flag 
} from 'lucide-react';
import { AppData, BackgroundMusic } from '../types';
import EditableSection from '../components/EditableSection';

interface HomeViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: keyof AppData, t: string, c: string, i?: string, a?: string) => void;
  onUpdateGlobal: (key: keyof AppData, value: any) => void;
  onUpdatePlaylist: (list: BackgroundMusic[]) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ data, isAdmin, onUpdate, onUpdateGlobal, onUpdatePlaylist }) => {
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // 1. Xử lý Upload Ảnh (Giới hạn 2MB để bảo vệ LocalStorage)
  const handleImageUpload = (key: keyof AppData, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (ev) => onUpdateGlobal(key, ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        alert("Ảnh quá lớn! Đồng chí vui lòng chọn ảnh dưới 2MB.");
      }
    }
  };

  // 2. Xử lý Upload Nhạc (Nâng lên 10MB cho file MP3)
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    
    // Nâng hạn mức lên 10MB để phù hợp với file nhạc thực tế
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const title = file.name.split('.').slice(0, -1).join('.');
          const newTrack = { title, url: ev.target?.result as string };
          
          // Cập nhật danh sách nhạc mới
          onUpdatePlaylist([...data.backgroundPlaylist, newTrack]);
          
          if (audioInputRef.current) audioInputRef.current.value = "";
          alert(`Đã nạp bản nhạc: ${title}`);
        };
        reader.readAsDataURL(file);
      } else {
        alert("File nhạc vượt quá 10MB! Đồng chí hãy nén file hoặc chọn bản nhạc ngắn hơn.");
      }
    }
  };

  // 3. Xử lý Xóa Nhạc
  const handleDeleteTrack = (index: number) => {
    if (confirm("Đồng chí có chắc chắn muốn gỡ bản nhạc này khỏi hệ thống?")) {
      const newList = [...data.backgroundPlaylist];
      newList.splice(index, 1);
      onUpdatePlaylist(newList);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* BANNER CHÍNH - Tự động thay đổi theo Logo và Tên App */}
      <div className="bg-red-800 p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white border-b-4 border-[#ffde00]/50">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md border border-white/20">
             <Flag size={18} className="text-[#ffde00]" /> Bộ Tư lệnh Thủ đô Hà Nội
          </div>
          
          <div className="flex items-center gap-6">
            {data.appLogo.startsWith('data:image') ? (
              <img src={data.appLogo} alt="Logo" className="w-20 h-20 object-contain drop-shadow-2xl" />
            ) : (
              <span className="text-6xl drop-shadow-2xl">{data.appLogo || "🎖️"}</span>
            )}
            <h2 className="text-6xl font-black uppercase italic leading-tight tracking-tighter drop-shadow-2xl">
              {data.appName}
            </h2>
          </div>
          
          <p className="text-xl font-medium text-white/90 max-w-4xl leading-relaxed italic">
            "Học tập chuyên cần - Rèn luyện kiên tâm - Quyết tâm thắng lợi"
          </p>
        </div>
        
        {/* Hình nền mờ trang trí */}
        <div className="absolute top-[-50px] right-[-50px] p-8 opacity-5 scale-150 rotate-12 pointer-events-none">
          <Shield size={380} />
        </div>
      </div>

      {/* PHẦN GIỚI THIỆU - Admin có thể sửa text và ảnh banner phụ */}
      <EditableSection 
        isAdmin={isAdmin} 
        title={data.intro.title} 
        content={data.intro.body} 
        imageUrl={data.intro.imageUrl} 
        avatarUrl={data.intro.avatarUrl}
        onSave={(t, c, i, a) => onUpdate('intro', t, c, i, a)} 
      />

      {/* TRUNG TÂM ĐIỀU HÀNH DÀNH CHO ADMIN */}
      {isAdmin && (
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-10">
          <div className="flex justify-between items-center border-b border-slate-100 pb-8">
            <div className="space-y-2">
               <h3 className="text-sm font-black uppercase text-red-700 flex items-center gap-3 tracking-[0.3em]">
                 <Monitor size={22} /> QUẢN TRỊ HỆ THỐNG
               </h3>
               <p className="text-slate-400 text-[10px] font-bold uppercase">Cấu hình giao diện và tài nguyên máy tính cục bộ</p>
            </div>
            <button 
              onClick={() => setIsEditingGlobal(!isEditingGlobal)} 
              className={`p-4 rounded-full transition-all ${isEditingGlobal ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}
            >
              {isEditingGlobal ? <X size={24}/> : <LayoutIcon size={24}/>}
            </button>
          </div>

          {isEditingGlobal && (
            <div className="grid gap-10 animate-in zoom-in duration-300">
              {/* Sửa tên App */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tên hiển thị hệ thống</label>
                <input 
                  className="w-full p-5 border-2 rounded-2xl focus:border-red-600 outline-none font-bold text-slate-700 transition-all" 
                  value={data.appName} 
                  onChange={(e) => onUpdateGlobal('appName', e.target.value)} 
                  placeholder="Nhập tên ứng dụng..." 
                />
              </div>
              
              {/* Tải lên Logo và Hình nền App */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center gap-4 hover:border-red-300 transition-all">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><ImageIcon className="text-red-600" /></div>
                  <div className="text-center">
                    <p className="font-black text-xs uppercase text-slate-700">Logo Chính</p>
                    <p className="text-[10px] text-slate-400 font-bold">Ảnh định dạng .png, .jpg</p>
                  </div>
                  <label className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black cursor-pointer hover:bg-red-700 transition-all">
                    CHỌN FILE
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload('appLogo', e)} className="hidden" />
                  </label>
                </div>

                <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center gap-4 hover:border-red-300 transition-all">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><LayoutIcon className="text-blue-600" /></div>
                  <div className="text-center">
                    <p className="font-black text-xs uppercase text-slate-700">Hình nền toàn trang</p>
                    <p className="text-[10px] text-slate-400 font-bold">Tối đa 2MB</p>
                  </div>
                  <label className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black cursor-pointer hover:bg-blue-700 transition-all">
                    CHỌN FILE
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload('globalBackground', e)} className="hidden" />
                  </label>
                </div>
              </div>

              {/* QUẢN LÝ NHẠC NỀN (Nâng cấp) */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-3">
                      <Music size={20} className="text-[#ffde00]" /> Thư viện nhạc cục bộ
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">Hỗ trợ file .mp3 từ máy tính (Tối đa 10MB)</p>
                  </div>
                  <button 
                    onClick={() => audioInputRef.current?.click()} 
                    className="bg-[#ffde00] text-black px-6 py-2.5 rounded-xl font-black text-[10px] hover:scale-105 transition-all shadow-lg shadow-[#ffde00]/20"
                  >
                    + NẠP BẢN NHẠC MỚI
                  </button>
                  <input type="file" ref={audioInputRef} className="hidden" accept="audio/*" onChange={handleAudioUpload} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.backgroundPlaylist.length > 0 ? (
                    data.backgroundPlaylist.map((track, i) => (
                      <div key={i} className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/10 hover:bg-white/20 transition-all group">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-[10px] font-bold">
                            {i + 1}
                          </div>
                          <span className="text-[11px] font-bold truncate pr-4">{track.title}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteTrack(i)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center border-2 border-dashed border-white/10 rounded-2xl text-slate-500 text-xs font-bold uppercase tracking-widest">
                      Chưa có bản nhạc nào được nạp
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeView;
