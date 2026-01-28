import React, { useState } from 'react';
import { 
  Gamepad2, Edit2, Save, ExternalLink, 
  Trophy, Target, RefreshCw, X 
} from 'lucide-react';

const GameView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Đồng chí dán Link trò chơi đã làm sẵn vào đây
  const [gameUrl, setGameUrl] = useState("https://wordwall.net/embed/khung-tro-choi-cua-dong-chi");
  const [tempUrl, setTempUrl] = useState(gameUrl);

  const handleSave = () => {
    setGameUrl(tempUrl);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      {/* Header trang */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-orange-500 rounded-3xl text-white shadow-lg shadow-orange-100">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-orange-600 uppercase italic tracking-tighter">CHIẾN SĨ THÔNG THÁI</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Học mà chơi - Khơi nguồn tri thức</p>
          </div>
        </div>

        {isAdmin && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-black transition-all shadow-xl"
          >
            {isEditing ? <X size={16} /> : <Edit2 size={16} />} 
            {isEditing ? "HỦY BỎ" : "GẮN LINK TRÒ CHƠI"}
          </button>
        )}
      </div>

      {/* Vùng chỉnh sửa dành cho Admin */}
      {isEditing && (
        <div className="bg-white p-6 rounded-[2.5rem] border-2 border-orange-200 shadow-xl animate-in zoom-in-95">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-2">Nhập Link trò chơi của đồng chí (Embed Link):</label>
          <div className="flex gap-3">
            <input 
              className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-orange-500"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Ví dụ: https://wordwall.net/embed/..."
            />
            <button 
              onClick={handleSave}
              className="bg-orange-600 text-white px-8 rounded-2xl font-black text-[10px] hover:bg-orange-700 transition-all flex items-center gap-2"
            >
              <Save size={16} /> CẬP NHẬT
            </button>
          </div>
          <p className="mt-3 text-[10px] text-slate-400 italic px-2">Lưu ý: Đồng chí nên dùng link 'Embed' để trò chơi hiển thị đẹp nhất trong khung.</p>
        </div>
      )}

      {/* KHUNG HIỂN THỊ TRÒ CHƠI (IFRAME) */}
      <div className="flex-1 bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden relative min-h-[600px]">
        <iframe 
          src={gameUrl}
          className="w-full h-full border-none shadow-inner"
          allowFullScreen
          title="Game chiến sĩ"
          allow="autoplay; fullscreen"
        ></iframe>
        
        {/* Lớp phủ hỗ trợ khi không load được game */}
        {!gameUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-50">
            <Target size={64} className="text-slate-200" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest text-center px-10">
              Chưa có trò chơi nào được gắn. <br/> Admin vui lòng nhấn 'Gắn link trò chơi' để bắt đầu.
            </p>
          </div>
        )}
      </div>

      {/* Thanh trạng thái dưới cùng */}
      <div className="flex justify-center gap-8 py-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Trophy size={16} />
          <span className="text-[10px] font-black uppercase">Thi đua lập công</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <RefreshCw size={16} />
          <span className="text-[10px] font-black uppercase">Làm mới trò chơi</span>
        </div>
      </div>
    </div>
  );
};

export default GameView;
