import React, { useState, useEffect } from 'react';
import { Shield, Edit2, Plus, ChevronRight, Image as ImageIcon, Save, X, Flag } from 'lucide-react';
import { AppData } from '../types';

interface TraditionViewProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => void;
}

const TraditionView: React.FC<TraditionViewProps> = ({ data, isAdmin, onUpdate }) => {
  const [selectedUnitKey, setSelectedUnitKey] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form tạm để Admin nhập liệu
  const [editForm, setEditForm] = useState({ name: '', history: '', imageUrl: '', avatarUrl: '' });

  // Tự động điền dữ liệu từ Cloud vào Form khi Admin chọn đơn vị
  useEffect(() => {
    if (selectedUnitKey && data.tradition?.[selectedUnitKey]) {
      const unit = data.tradition[selectedUnitKey];
      setEditForm({
        name: unit.name || '',
        history: unit.history || '',
        imageUrl: unit.imageUrl || '',
        avatarUrl: unit.avatarUrl || ''
      });
    }
  }, [selectedUnitKey, data.tradition]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'imageUrl') => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => setEditForm(prev => ({ ...prev, [field]: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedUnitKey) {
      // Gửi dữ liệu về App.tsx để lưu vĩnh viễn lên Firebase
      onUpdate(selectedUnitKey, editForm.name, editForm.history, editForm.imageUrl, editForm.avatarUrl);
      setIsEditing(false);
      alert("Đã đồng bộ logo Trung đoàn 59 lên hệ thống!");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="p-5 bg-red-50 rounded-3xl text-red-700 shadow-inner"><Shield size={40} /></div>
        <div>
          <h2 className="text-4xl font-black text-red-800 uppercase italic tracking-tighter">TRUYỀN THỐNG ĐƠN VỊ</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Dữ liệu trực tuyến 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-3">
          {/* Lấy danh sách đơn vị trực tiếp từ Cloud Data */}
          {data.tradition && Object.entries(data.tradition).map(([key, unit]) => (
            <button
              key={key}
              onClick={() => { setSelectedUnitKey(key); setIsEditing(false); }}
              className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all border-2 ${
                selectedUnitKey === key ? 'bg-red-800 border-red-800 text-white shadow-xl translate-x-2' : 'bg-white border-transparent text-slate-600 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                  {unit.avatarUrl ? <img src={unit.avatarUrl} className="w-full h-full object-contain" /> : <Flag size={20} />}
                </div>
                <span className="font-black text-xs uppercase text-left leading-tight">{unit.name}</span>
              </div>
              <ChevronRight size={18} className={selectedUnitKey === key ? 'opacity-100' : 'opacity-20'} />
            </button>
          ))}
        </div>

        <div className="md:col-span-8">
          {selectedUnitKey ? (
            <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-50 min-h-[500px] relative">
              {isAdmin && (
                <button onClick={() => setIsEditing(!isEditing)} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-red-700 hover:text-white transition-all z-10">
                  {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                </button>
              )}

              {isEditing ? (
                <div className="space-y-6">
                  <input className="w-full p-4 border-2 rounded-2xl font-bold" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col items-center p-6 bg-slate-50 border-2 border-dashed rounded-3xl cursor-pointer">
                      <ImageIcon className="text-slate-400 mb-2" />
                      <span className="text-[10px] font-black uppercase">Cập nhật Logo</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                    </label>
                    <label className="flex flex-col items-center p-6 bg-slate-50 border-2 border-dashed rounded-3xl cursor-pointer">
                      <ImageIcon className="text-slate-400 mb-2" />
                      <span className="text-[10px] font-black uppercase">Ảnh Infographic</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'imageUrl')} />
                    </label>
                  </div>
                  <textarea className="w-full h-64 p-5 border-2 rounded-2xl italic" value={editForm.history} onChange={(e) => setEditForm({...editForm, history: e.target.value})} />
                  <button onClick={handleSave} className="w-full bg-red-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg">
                    <Save size={20} /> LƯU VÀ PHÁT SÓNG LÊN CLOUD
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center p-3 border overflow-hidden">
                      {data.tradition[selectedUnitKey].avatarUrl ? <img src={data.tradition[selectedUnitKey].avatarUrl} className="w-full h-full object-contain" /> : <Shield size={32} className="text-slate-300" />}
                    </div>
                    <h3 className="text-3xl font-black text-red-800 uppercase italic tracking-tighter">{data.tradition[selectedUnitKey].name}</h3>
                  </div>
                  {data.tradition[selectedUnitKey].imageUrl && <img src={data.tradition[selectedUnitKey].imageUrl} className="w-full rounded-[2.5rem] shadow-xl" />}
                  <div className="text-lg text-slate-600 leading-relaxed font-medium italic whitespace-pre-line border-l-4 border-red-700 pl-8">
                    {data.tradition[selectedUnitKey].history}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3.5rem] p-20 text-center">
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Đồng chí hãy chọn một đơn vị để xem lịch sử</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraditionView;
