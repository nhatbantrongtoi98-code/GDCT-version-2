
import React from 'react';
import VpaLogo from '../components/VpaLogo';
import AdminEditPrompt from '../components/AdminEditPrompt';
import { Shield, BookOpen } from 'lucide-react';
import { User } from '../types';

interface HomeViewProps {
  user: User;
}

const HomeView: React.FC<HomeViewProps> = ({ user }) => (
  <div className="p-6 md:p-12 min-h-full bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 animate-fadeIn">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <VpaLogo size={120} className="mx-auto mb-6" animate />
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2E4D23] mb-4 uppercase leading-tight">
          Ứng dụng bổ trợ học tập chính trị
        </h1>
        <p className="text-lg md:text-xl opacity-75 max-w-2xl mx-auto leading-relaxed italic">
          Nâng cao bản lĩnh chính trị - Sẵn sàng nhận và hoàn thành mọi nhiệm vụ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#DA251D]">
          <h3 className="font-bold text-xl mb-3 flex items-center text-[#DA251D]">
            <Shield className="mr-2" /> Mục tiêu giáo dục
          </h3>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Số hóa toàn bộ hệ thống bài giảng, giúp cán bộ chiến sĩ tiếp cận tri thức mọi lúc, mọi nơi trên đa nền tảng.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#2E4D23]">
          <h3 className="font-bold text-xl mb-3 flex items-center text-[#2E4D23]">
            <BookOpen className="mr-2" /> Nội dung học tập
          </h3>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Hệ thống hóa truyền thống quân đội, đơn vị và các điệu vũ, bài hát quy định trong môi trường quân ngũ.
          </p>
        </div>
      </div>
      
      <div className="mt-12 p-8 bg-[#2E4D23] rounded-3xl text-white text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Shield size={100} /></div>
        <h4 className="text-xl font-bold mb-4 text-[#FFFF00]">"Quân đội ta trung với Đảng, hiếu với dân"</h4>
        <p className="opacity-80 text-sm italic">
          Xây dựng Quân đội nhân dân cách mạng, chính quy, tinh nhuệ, từng bước hiện đại.
        </p>
      </div>

      <AdminEditPrompt user={user} onEdit={() => alert("Cập nhật trang chủ")} />
    </div>
  </div>
);

export default HomeView;
