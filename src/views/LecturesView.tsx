import React from 'react';
import { Monitor, Play, Edit2 } from 'lucide-react';
import { AppData } from '../types';

interface LecturesProps {
  data: AppData;
  isAdmin: boolean;
  onUpdateLecture: (cat: string, id: string, title: string, poster: string) => void;
}

const LecturesView: React.FC<LecturesProps> = ({ data, isAdmin, onUpdateLecture }) => {
  const categories = [
    { id: 'newRecruits', name: 'Chiến sĩ mới', color: 'bg-green-600' },
    { id: 'hsqcsYear1', name: 'HSQ-CS Năm 1', color: 'bg-blue-600' },
    { id: 'hsqcsYear2', name: 'HSQ-CS Năm 2', color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-700 rounded-2xl text-white shadow-lg">
          <Monitor size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 uppercase italic">Kho bài giảng điện tử</h2>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-8 ${cat.color} rounded-full`}></div>
            <h3 className="text-xl font-black text-slate-700 uppercase">{cat.name}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.lectures[cat.id as keyof typeof data.lectures].map((lecture) => (
              <div key={lecture.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={lecture.posterUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={lecture.title} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white ring-4 ring-white/30 hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-slate-800 leading-tight line-clamp-2">{lecture.title}</h4>
                </div>
                {isAdmin && (
                  <button className="absolute top-4 right-4 p-2 bg-white/90 text-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md">
                    <Edit2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LecturesView;
