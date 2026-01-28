import React from 'react';
import { Shield, Edit2 } from 'lucide-react';
import { AppData } from '../types';

interface TraditionProps {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: string, name: string, history: string, imageUrl?: string, avatarUrl?: string) => void;
}

const TraditionView: React.FC<TraditionProps> = ({ data, isAdmin, onUpdate }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-700 rounded-2xl text-white shadow-lg shadow-red-200">
          <Shield size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase italic">Truyền thống Đơn vị</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Vẻ vang qua các thời kỳ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {Object.entries(data.tradition).map(([key, item]) => (
          <div key={key} className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group relative">
            {item.imageUrl && (
              <div className="w-full md:w-1/3 h-64 rounded-[2.5rem] overflow-hidden shadow-lg">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-black text-red-800 uppercase italic">{item.name}</h3>
              <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line">{item.history}</p>
            </div>
            {isAdmin && (
              <button className="absolute top-6 right-6 p-4 bg-slate-100 text-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 hover:text-white shadow-lg">
                <Edit2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {Object.keys(data.tradition).length === 0 && (
        <div className="text-center p-20 border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 font-bold uppercase tracking-widest text-sm">
          Chưa có dữ liệu truyền thống đơn vị
        </div>
      )}
    </div>
  );
};

export default TraditionView;
