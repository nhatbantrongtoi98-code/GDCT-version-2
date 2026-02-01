
import React from 'react';
import { Shield, BookOpen, Star, Flag } from 'lucide-react';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { User } from '../types';
import { UNIT_TRADITIONS } from '../constants';

interface UnitTraditionViewProps {
  user: User;
  currentPage: string;
}

const UnitTraditionView: React.FC<UnitTraditionViewProps> = ({ user, currentPage }) => {
  const unitId = currentPage.replace('unit-', '');
  const unit = UNIT_TRADITIONS.find(u => u.id === unitId) || UNIT_TRADITIONS[0];

  return (
    <div className="min-h-full bg-stone-50 animate-fadeIn font-['Be_Vietnam_Pro']">
      {/* Header Banner */}
      <div className="bg-[#2E4D23] text-white p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 -rotate-12 translate-x-1/4">
          <Shield size={300} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1 bg-[#FFFF00] text-[#2E4D23] text-xs font-black uppercase tracking-widest rounded-full mb-6">
            Lịch sử truyền thống
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 leading-tight">
            {unit.fullName}
          </h2>
          <p className="text-lg md:text-xl opacity-80 italic max-w-2xl">
            "Phát huy truyền thống anh hùng, hoàn thành xuất sắc mọi nhiệm vụ được giao"
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-black text-[#2E4D23] flex items-center">
              <Star className="mr-3 text-[#DA251D]" fill="#DA251D" size={24} />
              Tóm tắt lịch sử
            </h3>
            <div className="h-1 w-20 bg-[#DA251D] rounded-full" />
            <p className="text-stone-600 leading-relaxed text-lg">
              {unit.description} Trải qua quá trình xây dựng, chiến đấu và trưởng thành, đơn vị đã không ngừng lớn mạnh, xây đắp nên những trang sử vàng chói lọi, là niềm tự hào của mỗi cán bộ, chiến sĩ khi học tập và công tác tại đây.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 group hover:border-[#DA251D] transition-colors">
              <Flag className="text-[#DA251D] mb-4" />
              <h4 className="font-bold text-[#2E4D23] text-xl mb-2">Thành tích tiêu biểu</h4>
              <p className="text-sm text-stone-500">Nhiều năm liền đạt danh hiệu Đơn vị Quyết thắng, được tặng thưởng Huân chương Quân công và nhiều bằng khen khác.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 group hover:border-[#2E4D23] transition-colors">
              <BookOpen className="text-[#2E4D23] mb-4" />
              <h4 className="font-bold text-[#2E4D23] text-xl mb-2">Nhiệm vụ trọng tâm</h4>
              <p className="text-sm text-stone-500">Huấn luyện giỏi, kỷ luật nghiêm, sẵn sàng chiến đấu cao, bảo vệ vững chắc địa bàn được phân công.</p>
            </div>
          </div>

          <AdminEditPrompt user={user} onEdit={() => alert(`Cập nhật: ${unit.name}`)} />
        </div>
      </div>
    </div>
  );
};

export default UnitTraditionView;
