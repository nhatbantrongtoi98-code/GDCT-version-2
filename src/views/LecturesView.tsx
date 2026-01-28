import React, { useState } from 'react';
import { 
  Monitor, Edit2, Save, Image as ImageIcon, 
  ChevronRight, BookOpen, ArrowLeft, Upload, Trash2 
} from 'lucide-react';
import { AppData } from '../types';

interface Lesson {
  id: string;
  title: string;
  content: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  lessons: Lesson[];
}

const LecturesView: React.FC<{ data: AppData; isAdmin: boolean }> = ({ data, isAdmin }) => {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Khởi tạo dữ liệu 18 bài giảng theo yêu cầu
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 'cs-moi', name: 'CHIẾN SĨ MỚI', 
      lessons: Array.from({ length: 6 }, (_, i) => ({ id: `cs-m-${i+1}`, title: `Bài ${i+1}: Nội dung giáo dục chiến sĩ mới`, content: 'Nội dung bài giảng đang cập nhật...' }))
    },
    { 
      id: 'hsq-n1', name: 'HSQ-CS NĂM THỨ NHẤT', 
      lessons: Array.from({ length: 6 }, (_, i) => ({ id: `n1-${i+1}`, title: `Bài ${i+1}: Nội dung giáo dục năm thứ nhất`, content: 'Nội dung bài giảng đang cập nhật...' }))
    },
    { 
      id: 'hsq-n2', name: 'HSQ-CS NĂM THỨ HAI', 
      lessons: Array.from({ length: 6 }, (_, i) => ({ id: `n2-${i+1}`, title: `Bài ${i+1}: Nội dung giáo dục năm thứ hai`, content: 'Nội dung bài giảng đang cập nhật...' }))
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, lessonId: string) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setCategories(prev => prev.map(cat => ({
          ...cat,
          lessons: cat.lessons.map(l => l.id === lessonId ? { ...l, image: base64 } : l)
        })));
        if (selectedLesson?.id === lessonId) setSelectedLesson(prev => prev ? { ...prev, image: base64 } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveLesson = () => {
    if (selectedLesson && selectedCat) {
      setCategories(prev => prev.map(cat => cat.id === selectedCat.id ? {
        ...cat,
        lessons: cat.lessons.map(l => l.id === selectedLesson.id ? selectedLesson : l)
      } : cat));
      setIsEditing(false);
    }
  };

  // Giao diện chi tiết bài giảng
  if (selectedLesson) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-500">
        <button onClick={() => setSelectedLesson(null)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-red-700 transition-all">
          <ArrowLeft size={20} /> QUAY LẠI DANH SÁCH BÀI
        </button>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 relative">
          {isAdmin && (
            <button onClick={() => setIsEditing(!isEditing)} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl hover:bg-red-700 hover:text-white transition-all">
              <Edit2 size={20} />
            </button>
          )}

          {isEditing ? (
            <div className="space-y-6">
              <input className="w-full p-4 border-2 rounded-2xl font-black text-xl text-red-800" value={selectedLesson.title} onChange={e => setSelectedLesson({...selectedLesson, title: e.target.value})} />
              <div className="flex gap-4">
                <label className="flex-1 p-6 bg-slate-50 border-2 border-dashed rounded-3xl cursor-pointer hover:bg-red-50 flex flex-col items-center">
                  <ImageIcon className="text-slate-400 mb-2" />
                  <span className="text-[10px] font-black uppercase">Tải ảnh bài giảng</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, selectedLesson.id)} />
                </label>
                {selectedLesson.image && <div className="w-32 h-24 rounded-2xl overflow-hidden shadow-md"><img src={selectedLesson.image} className="w-full h-full object-cover" /></div>}
              </div>
              <textarea className="w-full h-96 p-6 border-2 rounded-3xl italic" value={selectedLesson.content} onChange={e => setSelectedLesson({...selectedLesson, content: e.target.value})} />
              <button onClick={saveLesson} className="w-full bg-red-800 text-white py-4 rounded-2xl font-black shadow-lg">LƯU BÀI GIẢNG</button>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-red-800 uppercase italic border-l-8 border-red-800 pl-6">{selectedLesson.title}</h2>
              {selectedLesson.image && <img src={selectedLesson.image} className="w-full rounded-[2.5rem] shadow-2xl" />}
              <div className="text-lg text-slate-700 leading-relaxed font-medium italic whitespace-pre-line">{selectedLesson.content}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Tiêu đề trang mới */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="p-5 bg-red-700 rounded-3xl text-white shadow-lg"><Monitor size={40} /></div>
        <div>
          <h2 className="text-4xl font-black text-red-800 uppercase italic tracking-tighter">TÓM TẮT CÁC BÀI GIẢNG CHÍNH TRỊ</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Kho tri thức số cho chiến sĩ</p>
        </div>
      </div>

      {/* Danh mục tập con */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden group">
            <h3 className="text-xl font-black text-slate-800 uppercase mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-red-700 rounded-full"></div> {cat.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => { setSelectedCat(cat); setSelectedLesson(lesson); }}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-red-800 hover:text-white transition-all group/item"
                >
                  <div className="flex items-center gap-4">
                    <BookOpen size={18} className="text-red-700 group-hover/item:text-white" />
                    <span className="text-xs font-bold uppercase truncate max-w-[180px]">{lesson.title}</span>
                  </div>
                  <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 translate-x-[-10px] group-hover/item:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesView;
