
import React from 'react';
import { History } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';

interface HistoryViewProps {
  user: User;
}

const HistoryView: React.FC<HistoryViewProps> = ({ user }) => (
  <div className="p-6 md:p-12 min-h-full bg-orange-50/30">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#DA251D] border-b-2 border-[#DA251D] pb-2 mb-8 flex items-center">
        <History className="mr-3" /> Lịch sử QĐND Việt Nam
      </h2>
      <div className="prose prose-stone max-w-none space-y-6 text-sm md:text-base leading-relaxed">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-[#DA251D]">
          <p className="font-bold text-[#2E4D23] text-xl">Ngày thành lập: 22/12/1944</p>
          <p className="mt-2">
            Tại khu rừng Trần Hưng Đạo (tỉnh Cao Bằng), Đội Việt Nam Tuyên truyền Giải phóng quân đã chính thức được thành lập. Đây là tiền thân của Quân đội nhân dân Việt Nam ngày nay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {[
            { year: '1944', event: 'Thành lập Đội VN Tuyên truyền GPQ', color: 'bg-red-50' },
            { year: '1954', event: 'Chiến thắng Điện Biên Phủ lừng lẫy', color: 'bg-yellow-50' },
            { year: '1975', event: 'Chiến dịch Hồ Chí Minh lịch sử', color: 'bg-green-50' }
          ].map(item => (
            <div key={item.year} className={`${item.color} p-6 rounded-xl shadow-sm text-center border border-stone-200 transition-transform hover:scale-105`}>
              <span className="block text-3xl font-black text-[#DA251D] mb-1">{item.year}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">{item.event}</span>
            </div>
          ))}
        </div>
        <p className="text-stone-700">
          Dưới sự lãnh đạo của Đảng và Bác Hồ, Quân đội ta đã lớn mạnh không ngừng, vượt qua muôn vàn gian khổ để giành lại độc lập tự do cho dân tộc.
        </p>
      </div>
      <AdminEditPrompt user={user} onEdit={() => alert("Cập nhật lịch sử")} />
    </div>
  </div>
);

export default HistoryView;
