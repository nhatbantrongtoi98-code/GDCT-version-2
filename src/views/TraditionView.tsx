import React, { useState } from 'react';
import { 
  Shield, Edit2, Plus, Trash2, ChevronRight, 
  Image as ImageIcon, Save, X, Flag 
} from 'lucide-react';
import { AppData } from '../types';

interface SubUnit {
  id: string;
  name: string;
  logo: string;
  content: string;
  infographic?: string;
}

interface TraditionViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: string, name: string, history: string, imageUrl?: string) => void;
}

const TraditionView: React.FC<TraditionViewProps> = ({ data, isAdmin, onUpdate }) => {
  const [selectedUnit, setSelectedUnit] = useState<SubUnit | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Dữ liệu mẫu khởi tạo theo yêu cầu của đồng chí
  const [units, setUnits] = useState<SubUnit[]>([
    { id: '1', name: 'LLVT Thủ đô Hà Nội', logo: '', content: 'Nội dung lịch sử truyền thống LLVT Thủ đô...' },
    { id: '2', name: 'Sư đoàn Bộ binh 301', logo: '', content: 'Lịch sử truyền thống Sư đoàn 301...' },
    { id: '3', name: 'Trung đoàn Bộ binh 59', logo: '', content: 'Lịch sử truyền thống Trung đoàn 59...' },
    { id: '4', name: 'Trung đoàn Bộ binh 692', logo: '', content: 'Lịch sử truyền thống Trung đoàn 692...' },
    { id: '5', name: 'Trung đoàn Bộ binh 757', logo: '', content: 'Lịch sử truyền thống Trung đoàn 757...' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'infographic', unitId: string) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUnits(prev => prev.map(u => u.id === unitId ? { ...u, [field]: ev.target?.result as string } : u));
        if (selectedUnit?.id === unitId) {
          setSelectedUnit(prev => prev ? { ...prev, [field]: ev.target?.result as string } : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveUnitChanges = (unit: SubUnit) => {
    setUnits(prev => prev.map(u => u.id === unit.id ? unit : u));
    setIsEditing(false);
    alert(`Đã cập nhật dữ liệu cho: ${unit.name}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header trang */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="p-5 bg-red-50 rounded-3xl text-red-700 shadow-inner">
          <Shield size={40} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-red-800 uppercase italic tracking-tighter">TRUYỀN THỐNG ĐƠN VỊ</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Vẻ vang qua các thời kỳ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* DANH SÁCH ĐƠN VỊ DỌC (Bên trái) */}
        <div className="md:col-span-4 space-y-3">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => { setSelectedUnit(unit); setIsEditing(false); }}
              className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all border-2 ${
                selectedUnit?.id === unit.id 
                ? 'bg-red-800 border-red-800 text-white shadow-xl translate-x-2' 
                : 'bg-white border-transparent text-slate-600 hover:bg-red-50 hover:border-red-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                  {unit.logo ? <img src={unit.logo} className="w-full h-full object-contain" /> : <Flag size={20} />}
                </div>
                <span className="font-black text-xs uppercase text-left leading-tight">{unit.name}</span>
              </div>
              <ChevronRight size={18} className={selectedUnit?.id === unit.id ? 'opacity-100' : 'opacity-20'} />
            </button>
          ))}
          
          {isAdmin && (
            <button className="w-full p-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-[10px] uppercase hover:border-red-300 hover:text-red-700 transition-all flex items-center justify-center gap-2">
              <Plus size={16} /> Thêm đơn vị con
            </button>
          )}
        </div>

        {/* NỘI DUNG CHI TIẾT (Bên phải) */}
        <div className="md:col-span-8">
          {selectedUnit ? (
            <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-50 min-h-[500px] relative">
              {isAdmin && (
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-red-700 hover:text-white transition-all shadow-sm"
                >
                  {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                </button>
              )}

              {isEditing ? (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tên đơn vị</label>
                    <input 
                      className="w-full p-4 border-2 rounded-2xl font-bold" 
                      value={selectedUnit.name} 
                      onChange={(e) => setSelectedUnit({...selectedUnit, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col items-center p-6 bg-slate-50 border-2 border-dashed rounded-3xl cursor-pointer hover:bg-red-50 transition-all">
                      <ImageIcon className="text-slate-400 mb-2" />
                      <span className="text-[10px] font-black uppercase">Logo Đơn Vị</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo', selectedUnit.id)} />
                    </label>
                    <label className="flex flex-col items-center p-6 bg-slate-50 border-2 border-dashed rounded-3xl cursor-pointer hover:bg-blue-50 transition-all">
                      <ImageIcon className="text-slate-400 mb-2" />
                      <span className="text-[10px] font-black uppercase">Ảnh Infographic</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'infographic', selectedUnit.id)} />
                    </label>
                  </div>

                  <textarea 
                    className="w-full h-64 p-5 border-2 rounded-2xl italic leading-relaxed"
                    value={selectedUnit.content}
                    onChange={(e) => setSelectedUnit({...selectedUnit, content: e.target.value})}
                  />
                  
                  <button onClick={() => saveUnitChanges(selectedUnit)} className="w-full bg-red-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-red-200">
                    <Save size={20} /> LƯU DỮ LIỆU CỤC BỘ
                  </button>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center p-3 border border-slate-100 shadow-inner">
                      {selectedUnit.logo ? <img src={selectedUnit.logo} className="w-full h-full object-contain" /> : <Shield size={32} className="text-slate-300" />}
                    </div>
                    <h3 className="text-3xl font-black text-red-800 uppercase italic tracking-tighter">{selectedUnit.name}</h3>
                  </div>

                  {selectedUnit.infographic && (
                    <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-xl">
                      <img src={selectedUnit.infographic} className="w-full h-auto" alt="Infographic" />
                    </div>
                  )}

                  <div className="text-lg text-slate-600 leading-relaxed font-medium italic whitespace-pre-line border-l-4 border-red-700 pl-8">
                    {selectedUnit.content}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3.5rem] p-20 text-center space-y-4">
              <div className="p-6 bg-white rounded-full text-slate-200 shadow-sm"><Flag size={60} /></div>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Đồng chí hãy chọn một đơn vị bên trái để xem lịch sử truyền thống</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraditionView;
