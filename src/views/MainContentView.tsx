import React from 'react';
import { History, Shield, BookOpen, Music, Zap, Info } from 'lucide-react';

interface Props {
  activeTab: string; // ID của trang đang chọn
  isAdmin: boolean;
}

const MainContentView: React.FC<Props> = ({ activeTab, isAdmin }) => {
  
  // 1. TRANG CHỦ (GIỚI THIỆU)
  if (activeTab === 'dashboard') return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-black text-green-900 uppercase">Hệ thống hỗ trợ học tập chính trị</h1>
        <p className="text-slate-600 leading-relaxed italic">
          Chào mừng các đồng chí đến với ứng dụng số hóa tư liệu học tập. 
          Ứng dụng giúp tra cứu nhanh chóng lịch sử, bài giảng và các nội dung quy định.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-2xl border-l-4 border-red-700 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 text-red-700"><Info size={20}/> Mục đích</h3>
          <p className="text-sm text-slate-500 mt-2">Nâng cao hiệu quả giáo dục chính trị tại đơn vị thông qua thiết bị di động.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border-l-4 border-green-700 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 text-green-700"><Zap size={20}/> Cách dùng</h3>
          <p className="text-sm text-slate-500 mt-2">Sử dụng menu bên trái (dấu 3 gạch) để chọn nội dung muốn học tập.</p>
        </div>
      </div>
    </div>
  );

  // 2. TRANG LỊCH SỬ QĐND VN
  if (activeTab === 'history-vn') return (
    <div className="bg-[#fdf6e3] p-6 md:p-10 rounded-3xl shadow-inner border border-stone-200">
      <h2 className="text-2xl font-black text-red-700 uppercase mb-6 flex items-center gap-2"><History/> Lịch sử QĐND Việt Nam</h2>
      <div className="prose prose-stone leading-loose text-stone-800 font-medium">
        <p>Quân đội nhân dân Việt Nam được thành lập ngày 22/12/1944...</p>
        {/* Thêm nội dung lịch sử tại đây */}
      </div>
    </div>
  );

  // 3. TRANG BÀI GIẢNG CHÍNH TRỊ (Mở phần nào xem phần đó)
  if (activeTab === 'lectures-csm' || activeTab === 'lectures-hsq') {
    const isCsm = activeTab === 'lectures-csm';
    const totalLessons = isCsm ? 6 : 12;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-black text-green-900 uppercase mb-4">
          {isCsm ? 'Bài giảng Chiến sĩ mới (6 bài)' : 'Bài giảng HSQ-CS (12 bài)'}
        </h2>
        {Array.from({ length: totalLessons }).map((_, i) => (
          <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <summary className="p-4 font-bold text-slate-700 cursor-pointer list-none flex justify-between items-center group-open:bg-green-800 group-open:text-white transition-all">
              <span>BÀI {i + 1}: Chuyên đề giáo dục chính trị số {i + 1}</span>
              <span className="text-[10px] bg-red-600 text-white px-2 py-1 rounded">MỞ XEM</span>
            </summary>
            <div className="p-5 text-slate-600 border-t border-slate-100 bg-slate-50">
              <p>Nội dung chi tiết bài giảng đang được cập nhật...</p>
              {isAdmin && <button className="mt-4 text-blue-600 text-xs font-bold underline">Sửa nội dung</button>}
            </div>
          </details>
        ))}
      </div>
    );
  }

  // 4. TRANG CHIẾN SĨ THÔNG THÁI (GẮN LINK GAME)
  if (activeTab === 'wise-soldier') return (
    <div className="h-[600px] bg-white rounded-[2rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
        <Zap size={40} />
      </div>
      <h2 className="text-xl font-black text-slate-800 uppercase">Trò chơi học tập</h2>
      {isAdmin ? (
        <div className="mt-4 w-full max-w-sm space-y-2">
          <input className="w-full p-3 border rounded-lg text-sm" placeholder="Dán link Wordwall/Quizizz vào đây..." />
          <button className="w-full bg-green-800 text-white py-2 rounded-lg font-bold">Lưu link</button>
        </div>
      ) : (
        <p className="text-slate-500 italic mt-2">Hệ thống đang tải trò chơi từ Admin...</p>
      )}
    </div>
  );

  return <div className="p-10 text-center text-slate-400">Vui lòng chọn mục từ menu.</div>;
};

export default MainContentView;
