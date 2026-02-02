import React, { useState } from 'react';
import { 
  BookOpen, Edit2, Save, Image as ImageIcon, 
  Plus, Trash2, FileText, ChevronRight, Star
} from 'lucide-react';
import { AppData } from '../types';

interface HistoryVNViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: keyof AppData, title: string, body: string, imageUrl?: string) => void;
}

const HistoryVNView: React.FC<HistoryVNViewProps> = ({ data, isAdmin, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: data.history?.title || "LỊCH SỬ DÂN TỘC VIỆT NAM",
    body: data.history?.body || "",
    imageUrl: data.history?.imageUrl || ""
  });

  // Xử lý nạp ảnh Infographic từ máy tính
  const handleInfographicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 3 * 1024 * 1024) { // Hạn mức 3MB cho ảnh Infographic sắc nét
        const reader = new FileReader();
        reader.onload = (ev) => {
          setFormData({ ...formData, imageUrl: ev.target?.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Ảnh Infographic quá lớn! Đồng chí hãy nén ảnh hoặc chọn file dưới 3MB để đảm bảo tốc độ tải trang.");
      }
    }
  };

  const handleSave = () => {
    onUpdate('history' as any, formData.title, formData.body, formData.imageUrl);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Tiêu đề trang */}
      <div className="flex justify-between items-center bg-gradient-to-r from-red-900 to-red-700 p-8 rounded-[2.5rem] shadow-xl text-white">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
            <BookOpen size={32} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter drop-shadow-md">
              {formData.title}
            </h2>
            <p className="text-xs font-bold text-red-100 uppercase tracking-widest mt-1 opacity-80">
              Hào khí ngàn năm - Rạng danh nòi giống
            </p>
          </div>
        </div>
        
        {isAdmin && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-red-800 px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-lg"
          >
            <Edit2 size={16} /> CHỈNH SỬA NỘI DUNG
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-red-50 space-y-6 animate-in zoom-in-95">
          <div className="grid gap-4">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tiêu đề mục lịch sử</label>
            <input 
              className="w-full p-4 border-2 rounded-2xl font-bold text-slate-800 outline-none focus:border-red-500"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid gap-4">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Nội dung chi tiết (Có thể chèn Icon: 🇻🇳, 🎖️, ✨, ⚔️...)</label>
            <textarea 
              className="w-full h-64 p-5 border-2 rounded-2xl text-slate-700 leading-relaxed outline-none focus:border-red-500"
              placeholder="Nhập nội dung lịch sử tại đây. Đồng chí có thể dùng các ký tự đặc biệt từ bàn phím để làm trang sinh động hơn..."
              value={formData.body}
              onChange={e => setFormData({...formData, body: e.target.value})}
            />
          </div>

          <div className="grid gap-4">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Ảnh Infographic minh họa</label>
            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              {formData.imageUrl ? (
                <div className="relative group w-40 h-24 rounded-xl overflow-hidden shadow-md">
                  <img src={formData.imageUrl} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setFormData({...formData, imageUrl: ""})}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ) : (
                <label className="w-40 h-24 flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-slate-300 cursor-pointer hover:border-red-400 transition-all group">
                  <ImageIcon className="text-slate-300 group-hover:text-red-400" />
                  <span className="text-[9px] font-bold text-slate-400 mt-2">TẢI INFOGRAPHIC</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleInfographicUpload} />
                </label>
              )}
              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-500">Đồng chí nên chọn ảnh dọc hoặc ảnh có độ phân giải cao để chữ trong Infographic dễ đọc.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="flex-1 bg-red-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-800 transition-all">LƯU THAY ĐỔI</button>
            <button onClick={() => setIsEditing(false)} className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black hover:bg-slate-200">HỦY</button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Hiển thị Infographic nếu có */}
          {data.history?.imageUrl && (
            <div className="bg-white p-4 rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 group">
              <div className="relative rounded-[2rem] overflow-hidden">
                <img 
                  src={data.history.imageUrl} 
                  alt="Lịch sử dân tộc" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* Hiển thị Nội dung Văn bản */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-50 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
               <Star size={200} fill="currentColor" className="text-red-800" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-1 bg-red-700 rounded-full"></span>
                  <span className="text-xs font-black uppercase tracking-widest text-red-700">Diễn trình lịch sử</span>
                </div>
                
                <div className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-line italic">
                  {data.history?.body || "Chưa có nội dung lịch sử. Admin vui lòng nạp dữ liệu từ máy tính."}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryVNView;
