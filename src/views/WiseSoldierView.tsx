
import React from 'react';
import { Zap, Trophy, Target, ChevronRight } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';

interface WiseSoldierViewProps {
  user: User;
}

const WiseSoldierView: React.FC<WiseSoldierViewProps> = ({ user }) => (
  <div className="p-4 md:p-12 min-h-full bg-sky-50 flex flex-col items-center justify-center text-center animate-fadeIn">
    <div className="w-full max-w-2xl bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-sky-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#DA251D]" />
      
      <div className="mb-6 md:mb-8">
        <Zap size={64} className="text-[#DA251D] animate-bounce mx-auto md:w-20 md:h-20" />
      </div>

      <h2 className="text-2xl md:text-5xl font-black text-[#2E4D23] mb-4 md:mb-6 uppercase tracking-tighter italic leading-tight">
        Chiến sĩ Thông thái
      </h2>
      
      <p className="text-sm md:text-lg text-stone-600 mb-8 md:mb-10 leading-relaxed font-medium px-2">
        Hệ thống trò chơi trắc nghiệm kiến thức chính trị, pháp luật và lịch sử quân sự. Hãy thể hiện bản lĩnh và trí tuệ của người lính!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 text-left">
        <div className="bg-sky-50 p-4 rounded-2xl flex items-center space-x-3">
          <Trophy className="text-amber-500 shrink-0" size={20} />
          <span className="text-xs md:text-sm font-bold text-stone-700">Bảng xếp hạng tuần</span>
        </div>
        <div className="bg-sky-50 p-4 rounded-2xl flex items-center space-x-3">
          <Target className="text-red-500 shrink-0" size={20} />
          <span className="text-xs md:text-sm font-bold text-stone-700">100+ Thử thách mới</span>
        </div>
      </div>

      <a 
        href="https://kahoot.it" 
        target="_blank" 
        rel="noreferrer"
        className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 font-black text-white transition-all duration-200 bg-[#DA251D] rounded-xl md:rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 shadow-xl active:scale-95"
      >
        <span className="text-base md:text-xl uppercase tracking-widest">Bắt đầu ngay</span>
        <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
      </a>
      
      <AdminEditPrompt user={user} onEdit={() => alert("Admin: Cập nhật link game tại đây.")} />
    </div>
    
    <div className="mt-8 text-stone-400 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
      Học mà chơi - Khơi nguồn sáng tạo
    </div>
  </div>
);

export default WiseSoldierView;
