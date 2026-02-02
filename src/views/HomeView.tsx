import React, { useState } from 'react';
import { 
  Edit2, Save, Image as ImageIcon, Monitor, 
  Upload, Trash2, Layout as LayoutIcon, Shield, Flag, Camera
} from 'lucide-react';
import { AppData } from '../types';
import EditableSection from '../components/EditableSection';

interface HomeViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: keyof AppData, t: string, c: string, i?: string, a?: string) => void;
  onUpdateGlobal: (key: keyof AppData, value: any) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ data, isAdmin, onUpdate, onUpdateGlobal }) => {
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);

  // Xử lý Upload Ảnh (Giới hạn 2MB)
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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* BANNER CHÍNH - Hiển thị tên Sổ Tay và Ảnh Đơn Vị */}
      <div className="bg-red-800 p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white border-b-4 border-[#ffde00]/50">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md border border-white/20">
             <Flag size={18} className="text-[#ffde00]" /> BỘ TƯ LỆNH THỦ ĐÔ HÀ NỘI
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ảnh đại diện ứng dụng (Logo) */}
            <div className="relative group/logo">
              <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/20 overflow-hidden shadow-2xl">
                {data.appLogo.startsWith('data:image') ? (
                  <img src={data.appLogo} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-6xl">{data.appLogo || "🎖️"}</span>
                )}
              </div>
              {isAdmin && (
                <label className="absolute -bottom-2 -right-2 p-2 bg-yellow-500 text-black rounded-full cursor-pointer hover:bg-white transition-all shadow-lg">
                  <Camera size={16} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('appLogo', e)} />
                </label>
              )}
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-tight tracking-tighter drop-shadow-2xl">
                {data.appName || "SỔ TAY GIÁO DỤC CHÍNH TRỊ ĐIỆN TỬ"}
              </h2>
              <p className="text-xl font-medium text-white/90 mt-2 opacity-80 uppercase tracking-widest">
                LỰC LƯỢNG VŨ TRANG THỦ ĐÔ VƯƠN MÌNH TRONG KỶ NGUYÊN MỚI
              </p>
            </div>
          </div>
        </div>
        
        {/* Hình nền mờ trang trí */}
        <div className="absolute top-[-50px] right-[-50px] p-8 opacity-10 scale-150 rotate-12 pointer-events-none text-white">
          <Shield size={380} />
        </div>
      </div>

      {/* PHẦN GIỚI THIỆU - Có thêm ảnh đơn vị */}
      <div className="grid grid-cols-1 gap-8">
        <EditableSection 
          isAdmin={isAdmin} 
          title={data.intro.title} 
          content={data.intro.body} 
          imageUrl={data.intro.imageUrl} // Đây là nơi hiển thị ảnh đơn vị
          avatarUrl={data.intro.avatarUrl}
          onSave={(t, c, i, a) => onUpdate('intro', t, c, i, a)} 
        />
      </div>

      {/* QUẢN TRỊ GIAO DIỆN (Đã bỏ nhạc nền) */}
      {isAdmin && (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
          <div className="flex justify-between items-center border-b border-slate-50 pb-6">
            <h3 className="text-sm font-black uppercase text-red-700 flex items-center gap-3 tracking-[0.2em]">
              <Monitor size={22} /> CẤU HÌNH GIAO DIỆN SỔ TAY
            </h3>
            <button 
              onClick={() => setIsEditingGlobal(!isEditingGlobal)} 
              className={`p-3 rounded-2xl transition-all ${isEditingGlobal ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}
            >
              <LayoutIcon size={24}/>
            </button>
          </div>

          {isEditingGlobal && (
            <div className="grid gap-8 animate-in zoom-in-95 duration-300">
              {/* Sửa tên App thành Sổ Tay */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tên sổ tay điện tử</label>
                <input 
                  className="w-full p-4 border-2 rounded-2xl focus:border-red-600 outline-none font-bold text-slate-700 transition-all" 
                  value={data.appName} 
                  onChange={(e) => onUpdateGlobal('appName', e.target.value)} 
                  placeholder="Ví dụ: SỔ TAY GIÁO DỤC CHÍNH TRỊ ĐIỆN TỬ" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thay đổi ảnh nền trang */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center gap-4 group hover:border-red-300 transition-all">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform"><ImageIcon className="text-blue-600" /></div>
                  <div className="text-center">
                    <p className="font-black text-xs uppercase text-slate-700">Ảnh nền hệ thống</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Nền toàn bộ trang web</p>
                  </div>
                  <label className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black cursor-pointer hover:bg-blue-700 transition-all">
                    TẢI ẢNH NỀN
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload('globalBackground', e)} className="hidden" />
                  </label>
                </div>

                {/* Gợi ý ảnh đơn vị */}
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-dashed border-red-100 flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><Flag className="text-red-600" /></div>
                  <div className="text-center">
                    <p className="font-black text-xs uppercase text-slate-700">Ảnh Đơn Vị</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sửa trực tiếp tại phần Giới thiệu</p>
                  </div>
                  <div className="text-[10px] font-black text-red-700 bg-white px-4 py-2 rounded-lg shadow-sm">
                    TRANG CHỦ {'>'} GIỚI THIỆU
                  </div>
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
