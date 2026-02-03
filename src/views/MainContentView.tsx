import React from 'react';
import { History, Shield, BookOpen, Music, Zap, Info, ChevronRight, PlayCircle } from 'lucide-react';
import SettingsView from './SettingsView';

interface Props {
  page: string;
  subPage?: string;
  user: { username: string; role: string };
}

const MainContentView: React.FC<Props> = ({ page, user }) => {
  const isAdmin = user.username === 'admin123';

  // Component tiêu đề trang cho chuyên nghiệp
  const PageHeader = ({ title, icon: Icon }: any) => (
    <div className="mb-6 border-b-2 border-yellow-500 pb-2">
      <h2 className="text-xl md:text-2xl font-black text-green-900 uppercase flex items-center gap-2">
        <Icon size={28} className="text-red-700" /> {title}
      </h2>
    </div>
  );

  if (page === 'settings') return <SettingsView />;

  // 1. TRANG CHỦ
  if (page === 'dashboard') return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      <div className="text-center space-y-4 bg-green-900 p-8 rounded-3xl text-white shadow-xl">
        <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center p-2 animate-bounce">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Vietnam_People%27s_Army_Logo.svg/1200px-Vietnam_People%27s_Army_Logo.svg.png" alt="VPA" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-yellow-400">Hệ thống sổ tay GDCT điện tử</h1>
        <p className="text-sm md:text-base italic opacity-90">Số hóa tư liệu - Nâng cao bản lĩnh chính trị</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white rounded-2xl border-l-8 border-red-700 shadow-md">
          <h3 className="font-bold flex items-center gap-2 text-red-700"><Info size={20}/> GIỚI THIỆU</h3>
          <p className="text-[13px] md:text-sm text-slate-600 mt-2">Ứng dụng hỗ trợ tra cứu lịch sử, bài giảng và các điệu vũ quy định một cách nhanh chóng, chính xác.</p>
        </div>
      </div>
    </div>
  );

  // 2. TRANG LỊCH SỬ QĐND VN
  if (page === 'history-vn') return (
    <div className="bg-[#fdf6e3] p-5 md:p-8 rounded-3xl border border-stone-200 shadow-lg min-h-[500px]">
      <PageHeader title="Lịch sử QĐND Việt Nam" icon={History} />
      <div className="prose prose-sm md:prose-base leading-relaxed text-stone-800 italic">
        <p>Quân đội nhân dân Việt Nam, tiền thân là Đội Việt Nam Tuyên truyền Giải phóng quân, thành lập ngày 22/12/1944...</p>
      </div>
    </div>
  );

  // 3. TRANG TRUYỀN THỐNG ĐƠN VỊ
  if (page.startsWith('tradition-')) return (
    <div className="space-y-4">
      <PageHeader title="Lịch sử truyền thống" icon={Shield} />
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
         <h3 className="font-black text-red-700 uppercase mb-4 text-sm md:text-lg">
           {page === 'tradition-301' ? 'Sư đoàn Bộ binh 301' : 
            page === 'tradition-59' ? 'Trung đoàn 59' : 
            page === 'tradition-692' ? 'Trung đoàn 692' : 'Đơn vị quân đội'}
         </h3>
         <p className="text-sm md:text-base text-slate-700">Nội dung chi tiết về lịch sử vẻ vang của đơn vị đang được cập nhật...</p>
      </div>
    </div>
  );

  // 4. BÀI GIẢNG CHÍNH TRỊ
  if (page === 'lectures-csm' || page === 'lectures-hsq') {
    const isCsm = page === 'lectures-csm';
    return (
      <div className="space-y-4">
        <PageHeader title={isCsm ? "Bài giảng Chiến sĩ mới" : "Bài giảng HSQ-CS"} icon={BookOpen} />
        <div className="grid gap-3">
          {Array.from({ length: isCsm ? 6 : 12 }).map((_, i) => (
            <details key={i} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <summary className="p-4 flex justify-between items-center cursor-pointer font-bold text-sm md:text-base text-green-900 group-open:bg-green-900 group-open:text-yellow-400">
                <span>BÀI {i + 1}: Chuyên đề giáo dục chính trị bài {i + 1}</span>
                <ChevronRight className="group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 bg-slate-50 text-[13px] md:text-sm text-slate-600">
                <p>Nội dung chi tiết bài giảng bài {i + 1}...</p>
                {isAdmin && <button className="mt-3 text-red-600 font-bold underline">Sửa bài giảng</button>}
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  // 5. GÓC GIẢI TRÍ
  if (page === 'music-15' || page === 'dance-5') {
    const isMusic = page === 'music-15';
    return (
      <div className="space-y-4">
        <PageHeader title={isMusic ? "15 Bài hát quy định" : "5 Điệu vũ cơ bản"} icon={Music} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: isMusic ? 15 : 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-red-500 transition-colors">
              <PlayCircle className="text-red-700" />
              <span className="text-xs md:text-sm font-bold text-slate-800">
                {isMusic ? `Bài hát thứ ${i + 1}` : `Điệu vũ thứ ${i + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. CHIẾN SĨ THÔNG THÁI
  if (page === 'wise-soldier') return (
    <div className="h-[500px] bg-white rounded-3xl border-4 border-double border-green-800 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
      <Zap size={60} className="text-yellow-500 mb-4 animate-pulse" />
      <h2 className="text-xl md:text-2xl font-black text-green-900 uppercase">Đấu trường trí tuệ</h2>
      <p className="text-slate-500 text-sm mt-2">Hệ thống đang tải link trò chơi từ máy chủ Admin...</p>
      {isAdmin && (
        <div className="mt-6 w-full max-w-sm">
           <input className="w-full p-3 border-2 border-green-800 rounded-xl text-sm mb-2" placeholder="Dán link game (Quizizz/Wordwall)..." />
           <button className="w-full bg-red-700 text-white py-3 rounded-xl font-bold uppercase tracking-widest">Cập nhật link</button>
        </div>
      )}
    </div>
  );

  return <div className="p-10 text-center text-slate-400 italic">Vui lòng chọn mục để xem nội dung.</div>;
};

export default MainContentView;
