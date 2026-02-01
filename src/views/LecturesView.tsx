
import React, { useState } from 'react';
import { FileText, ChevronRight, BookOpen, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';
import { LECTURES_NEW_SOLDIERS, LECTURES_HSQ_CS } from '../constants';

interface LecturesViewProps {
  user: User;
  currentPage: string;
}

const LecturesView: React.FC<LecturesViewProps> = ({ user, currentPage }) => {
  const isCsm = currentPage === 'lectures-csm';
  const lectures = isCsm ? LECTURES_NEW_SOLDIERS : LECTURES_HSQ_CS;
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);

  const selectedLecture = lectures.find(l => l.id === selectedLectureId);

  if (selectedLectureId && selectedLecture) {
    return (
      <div className="p-6 md:p-12 min-h-full bg-white animate-fadeIn">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setSelectedLectureId(null)}
            className="flex items-center space-x-2 text-[#2E4D23] font-bold hover:text-[#DA251D] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="uppercase tracking-widest text-sm">Quay lại danh sách</span>
          </button>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-[#DA251D]">
              <div className="bg-[#DA251D]/10 px-4 py-1 rounded-full font-black text-sm uppercase">Bài học {selectedLecture.id}</div>
              <div className="h-px flex-1 bg-stone-100" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#2E4D23] leading-tight">
              {selectedLecture.title}
            </h2>
            
            <div className="flex items-center space-x-6 text-stone-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center"><Clock size={14} className="mr-1" /> 45 Phút</span>
              <span className="flex items-center text-green-600"><CheckCircle2 size={14} className="mr-1" /> Giáo án đã duyệt</span>
            </div>

            <div className="prose prose-stone max-w-none pt-8 border-t border-stone-100">
              <p className="text-xl text-stone-700 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-[#DA251D] first-letter:mr-3 first-letter:float-left">
                {selectedLecture.content}
              </p>
              <div className="bg-stone-50 p-6 rounded-2xl mt-8 border-l-4 border-[#2E4D23]">
                <h4 className="font-black text-[#2E4D23] mb-2 uppercase text-sm">Kết luận rút ra:</h4>
                <p className="text-stone-600 italic">Mỗi quân nhân cần nắm vững nội dung bài học để vận dụng vào thực tiễn thực hiện nhiệm vụ tại đơn vị.</p>
              </div>
            </div>
            
            <AdminEditPrompt user={user} onEdit={() => alert(`Sửa nội dung: ${selectedLecture.title}`)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 min-h-full bg-stone-50 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-[#2E4D23] flex items-center uppercase tracking-tight">
              <BookOpen className="mr-4 text-[#DA251D]" size={40} />
              Hệ thống Bài giảng
            </h2>
            <p className="text-stone-500 font-medium">
              Đối tượng: <span className="text-[#DA251D] font-bold">{isCsm ? 'Chiến sĩ mới (6 bài)' : 'Hạ sĩ quan - Chiến sĩ (12 bài)'}</span>
            </p>
          </div>
          <div className="bg-[#2E4D23] text-[#FFFF00] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
            Học tập chính trị {new Date().getFullYear()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map(lecture => (
            <div 
              key={lecture.id} 
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-200 hover:border-[#DA251D] hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => setSelectedLectureId(lecture.id)}
            >
              <div className="absolute top-0 right-0 p-6 text-stone-100 group-hover:text-red-50 transition-colors">
                <span className="text-5xl font-black italic">0{lecture.id}</span>
              </div>
              <div className="bg-stone-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#DA251D] group-hover:text-white transition-all duration-500">
                <FileText size={28} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-[#2E4D23] leading-snug group-hover:text-[#DA251D] transition-colors">
                {lecture.title}
              </h3>
              <p className="text-stone-400 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                Tìm hiểu về bản chất, truyền thống và các quy định kỷ luật quân đội...
              </p>
              <div className="flex items-center text-[#2E4D23] font-black text-xs uppercase tracking-widest group-hover:text-[#DA251D]">
                Xem bài giảng <ChevronRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturesView;
