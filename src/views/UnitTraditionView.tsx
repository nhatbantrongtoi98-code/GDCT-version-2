import React from 'react';
import { Shield, Calendar, Award, MapPin } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';
import { INITIAL_DATA } from '../constants';

interface UnitTraditionViewProps {
  user: User;
  currentPage: string;
}

const UnitTraditionView: React.FC<UnitTraditionViewProps> = ({ user, currentPage }) => {
  // 1. Lấy unitId từ currentPage (ví dụ: 'unit-div301' -> 'div301')
  const unitId = currentPage.replace('unit-', '');

  // 2. Chuyển đổi Object tradition thành Array và tìm đơn vị tương ứng
  // Trong constants.ts của bạn, dữ liệu nằm ở INITIAL_DATA.tradition
  const unit = Object.values(INITIAL_DATA.tradition).find(u => u.id === unitId);

  return (
    <div className="p-6 md:p-12 min-h-full bg-green-50/50 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#2E4D23] text-white p-8 md:p-12 rounded-t-[2rem] shadow-xl flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="bg-[#FFFF00] p-4 rounded-full text-[#2E4D23] shadow-inner">
            <Shield size={64} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              {unit?.name || 'Không tìm thấy đơn vị'}
            </h2>
            <p className="opacity-70 mt-2 italic text-lg">Phát huy truyền thống - Cống hiến tài năng</p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="bg-white p-8 md:p-12 rounded-b-[2rem] shadow-sm border-x border-b border-stone-200 space-y-10">
          <section>
            <h4 className="font-black text-xl text-[#2E4D23] flex items-center mb-4 uppercase tracking-wider">
              <Calendar className="mr-3 text-[#DA251D]" size={24} /> Lịch sử hình thành
            </h4>
            <p className="text-stone-700 leading-relaxed text-base md:text-lg">
              {/* Sửa unit.description thành unit.history để khớp với constants.ts */}
              {unit?.history || 'Thông tin đang được cập nhật...'}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <h4 className="font-black text-lg text-[#2E4D23] flex items-center mb-4 uppercase">
                <Award className="mr-3 text-[#DA251D]" size={22} /> Thành tích
              </h4>
              <ul className="space-y-3 text-stone-600 font-medium">
                <li className="flex items-start"><span className="text-[#DA251D] mr-2">•</span> Huân chương Quân công hạng Nhất</li>
                <li className="flex items-start"><span className="text-[#DA251D] mr-2">•</span> Danh hiệu Anh hùng LLVT Nhân dân</li>
                <li className="flex items-start"><span className="text-[#DA251D] mr-2">•</span> Nhiều năm liền nhận cờ thi đua Chính phủ</li>
              </ul>
            </section>

            <section className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <h4 className="font-black text-lg text-[#2E4D23] flex items-center mb-4 uppercase">
                <MapPin className="mr-3 text-[#DA251D]" size={22} /> Địa bàn
              </h4>
              <p className="text-stone-600 italic">
                Sẵn sàng chiến đấu và cơ động trên mọi địa hình, gắn bó máu thịt với nhân dân Thủ đô.
              </p>
            </section>
          </div>
          
          <AdminEditPrompt user={user} onEdit={() => alert(`Cập nhật truyền thống ${unit?.name}`)} />
        </div>
      </div>
    </div>
  );
};

export default UnitTraditionView;
