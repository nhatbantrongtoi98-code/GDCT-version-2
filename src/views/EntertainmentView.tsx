
import React from 'react';
import { Music, Play, Radio } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';
import { SONGS, DANCES } from '../constants';

interface EntertainmentViewProps {
  user: User;
  currentPage: string;
}

const EntertainmentView: React.FC<EntertainmentViewProps> = ({ user, currentPage }) => {
  const isSongs = currentPage === 'songs';
  const data = isSongs ? SONGS : DANCES;
  const bgColor = isSongs ? 'bg-emerald-50' : 'bg-amber-50';
  const iconColor = isSongs ? 'text-emerald-600' : 'text-amber-600';

  return (
    <div className={`p-6 md:p-12 min-h-full ${bgColor} animate-fadeIn`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-[#2E4D23] mb-10 flex items-center uppercase">
          <Music className={`mr-4 ${isSongs ? 'text-[#DA251D]' : iconColor}`} size={32} />
          {isSongs ? '15 Bài hát quy định QĐNDVN' : '5 Điệu vũ Quân đội'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-stone-200 group flex items-center justify-between"
            >
              <div className="flex items-center space-x-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${isSongs ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <span className="font-bold text-stone-800 text-lg md:text-xl block">{item}</span>
                  <span className="text-xs uppercase font-bold text-stone-400 tracking-widest">Chính quy - Văn hóa</span>
                </div>
              </div>
              <button className={`${isSongs ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'} text-white p-3 rounded-full transition-transform active:scale-90 shadow-md`}>
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex items-center space-x-6">
          <div className="animate-pulse text-[#DA251D]"><Radio size={40} /></div>
          <div>
            <h4 className="font-bold text-[#2E4D23]">Góc truyền thanh nội bộ</h4>
            <p className="text-sm text-stone-600 italic">Xây dựng đời sống văn hóa tinh thần lành mạnh, vui tươi trong đơn vị.</p>
          </div>
        </div>

        <AdminEditPrompt user={user} onEdit={() => alert("Cập nhật danh mục giải trí")} />
      </div>
    </div>
  );
};

export default EntertainmentView;
