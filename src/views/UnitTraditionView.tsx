import React, { useState } from 'react';
import { Edit3, Save, Image as ImageIcon, Shield } from 'lucide-react';

const UnitTraditionView = ({ isAdmin }: { isAdmin: boolean }) => {
  const [activeUnit, setActiveUnit] = useState('sư301');
  const [isEditing, setIsEditing] = useState(false);
  const [units, setUnits] = useState<any>({
    sư301: {
      name: "Sư đoàn Bộ binh 301",
      logo: "https://vpa.vn/logo-301.png",
      cover: "https://vpa.vn/cover-301.jpg",
      content: "Sư đoàn 301 là đơn vị chủ lực của LLVT Thủ đô...",
    },
    // ... Thêm các đơn vị khác ở đây
  });

  const current = units[activeUnit];

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fadeIn">
      {/* CỘT TRÁI: DANH SÁCH ĐƠN VỊ */}
      <div className="w-full md:w-80 space-y-3">
        {Object.keys(units).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveUnit(key); setIsEditing(false); }}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${activeUnit === key ? 'bg-red-700 text-white border-red-700 shadow-lg' : 'bg-white text-slate-600 border-transparent hover:border-red-200'}`}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm border">
              <img src={units[key].logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-[11px] uppercase text-left leading-tight">{units[key].name}</span>
          </button>
        ))}
      </div>

      {/* CỘT PHẢI: CHI TIẾT NỘI DUNG */}
      <div className="flex-1 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-50 relative">
        {isAdmin && (
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              className={`p-4 rounded-full shadow-xl transition-all ${isEditing ? 'bg-green-600 text-white' : 'bg-slate-800/40 text-white backdrop-blur-md'}`}
            >
              {isEditing ? <Save size={20}/> : <Edit3 size={20}/>}
            </button>
          </div>
        )}

        {/* ẢNH MINH HỌA LỚN */}
        <div className="h-72 md:h-96 bg-slate-200 relative group">
          <img src={current.cover} className="w-full h-full object-cover" alt="Cover" />
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white text-slate-800 px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-xl flex items-center gap-2">
                <ImageIcon size={16}/> Thay ảnh minh họa
              </button>
            </div>
          )}
        </div>

        {/* PHẦN CHỮ */}
        <div className="p-8 md:p-14">
          <div className="flex items-center gap-6 mb-10 border-b pb-8 border-slate-100">
             <div className="w-20 h-20 bg-slate-50 p-2 rounded-2xl border shadow-inner">
                <img src={current.logo} className="w-full h-full object-contain" alt="Logo" />
             </div>
             <div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">{current.name}</h2>
                <p className="text-red-700 font-bold text-[10px] uppercase tracking-[0.2em] mt-3 italic">Hệ thống dữ liệu truyền thống</p>
             </div>
          </div>

          {isEditing ? (
            <textarea 
              className="w-full h-96 p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] outline-none font-medium leading-relaxed text-slate-700"
              value={current.content}
              onChange={(e) => setUnits({...units, [activeUnit]: {...current, content: e.target.value}})}
            />
          ) : (
            <div className="text-slate-700 text-lg leading-[2.2] text-justify font-medium whitespace-pre-line">
              {current.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitTraditionView;
