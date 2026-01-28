import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, Plus, Trash2, Edit2, 
  Save, Play, Target, ChevronRight, X, AlertCircle
} from 'lucide-react';

interface GameItem {
  id: string;
  title: string;
  url: string;
}

const GameView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // KHÓA LƯU TRỮ VĨNH VIỄN TRÊN TRÌNH DUYỆT
  const STORAGE_KEY = 'MILITARY_GAME_DATA_V1';

  // 1. Khởi tạo State từ LocalStorage hoặc dữ liệu mặc định
  const [games, setGames] = useState<GameItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Lỗi đọc dữ liệu:", e);
      }
    }
    return [{ id: '1', title: 'TRÒ CHƠI NHẬN THỨC CHÍNH TRỊ', url: '' }];
  });

  // 2. Tự động sửa link Wordwall/YouTube sang dạng nhúng (Embed)
  const formatUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl) return '';
    if (cleanUrl.includes('wordwall.net/resource/')) {
      return cleanUrl.replace('/resource/', '/embed/');
    }
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      const videoId = cleanUrl.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : cleanUrl;
    }
    return cleanUrl;
  };

  const addGame = () => {
    const newGame: GameItem = {
      id: Date.now().toString(),
      title: `TRÒ CHƠI MỚI ${games.length + 1}`,
      url: ''
    };
    setGames([...games, newGame]);
  };

  const updateGame = (id: string, field: keyof GameItem, value: string) => {
    setGames(games.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const deleteGame = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa trò chơi này không?")) {
      const updatedGames = games.filter(g => g.id !== id);
      setGames(updatedGames);
      if (activeGame?.id === id) setActiveGame(null);
    }
  };

  // 3. HÀM LƯU VĨNH VIỄN (CHUYÊN NGHIỆP)
  const handleSaveData = () => {
    setIsSaving(true);
    
    // Chuẩn hóa toàn bộ URL trước khi lưu
    const finalGames = games.map(g => ({
      ...g,
      url: formatUrl(g.url)
    }));

    try {
      // Lưu vào bộ nhớ trình duyệt
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalGames));
      setGames(finalGames);
      setIsEditing(false);
      
      // Thông báo thành công
      alert("✅ ĐÃ LƯU VĨNH VIỄN: Hệ thống đã ghi nhớ danh sách trò chơi.");
    } catch (error) {
      alert("❌ LỖI: Trình duyệt không cho phép lưu trữ. Vui lòng tắt chế độ ẩn danh.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700 pb-10">
      {/* Header chuyên nghiệp */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-orange-500 rounded-3xl text-white shadow-lg shadow-orange-100 ring-4 ring-orange-50">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-orange-600 uppercase italic tracking-tighter">CHIẾN SĨ THÔNG THÁI</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Hệ thống lưu trữ vĩnh viễn dữ liệu game</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-3">
            {isEditing && (
              <button 
                onClick={addGame}
                className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-orange-100 transition-all border border-orange-100"
              >
                <Plus size={16} /> THÊM Ô GAME
              </button>
            )}
            <button 
              onClick={isEditing ? handleSaveData : () => setIsEditing(true)}
              disabled={isSaving}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[10px] shadow-xl transition-all border-b-4 active:border-b-0 ${
                isEditing 
                ? 'bg-green-600 text-white border-green-800' 
                : 'bg-slate-800 text-white border-slate-950'
              }`}
            >
              {isSaving ? <Save className="animate-spin" size={16} /> : (isEditing ? <Save size={16} /> : <Edit2 size={16} />)} 
              {isEditing ? "XÁC NHẬN LƯU VĨNH VIỄN" : "QUẢN TRỊ GAME"}
            </button>
          </div>
        )}
      </div>

      {/* Bố cục chia 2 phần */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start flex-1">
        
        {/* CỘT DANH SÁCH GAME BÊN TRÁI */}
        <div className="xl:col-span-1 space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
          {games.map((game, index) => (
            <div 
              key={game.id}
              onClick={() => !isEditing && game.url && setActiveGame(game)}
              className={`p-5 rounded-[2rem] border-2 transition-all relative group ${
                activeGame?.id === game.id 
                ? 'bg-orange-600 border-orange-600 text-white shadow-lg translate-x-2' 
                : 'bg-white border-slate-50 text-slate-700 hover:border-orange-200 shadow-sm'
              } ${!isEditing && game.url ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-black uppercase ${activeGame?.id === game.id ? 'text-white/60' : 'text-slate-400'}`}>Cấu hình ô {index + 1}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteGame(game.id); }}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input 
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-900 outline-none focus:ring-2 ring-orange-500"
                    value={game.title}
                    onChange={(e) => updateGame(game.id, 'title', e.target.value.toUpperCase())}
                    placeholder="Tên trò chơi..."
                  />
                  <input 
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[10px] text-blue-600 outline-none"
                    value={game.url}
                    onChange={(e) => updateGame(game.id, 'url', e.target.value)}
                    placeholder="Dán link Wordwall/YouTube..."
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${activeGame?.id === game.id ? 'bg-white/20' : 'bg-orange-50 text-orange-600'}`}>
                      <Play size={16} fill="currentColor" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black leading-tight uppercase tracking-tight block">{game.title}</span>
                      <span className="text-[9px] opacity-60 font-bold uppercase italic">{game.url ? 'Nhấn để bắt đầu' : 'Chưa cấu hình link'}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={activeGame?.id === game.id ? 'opacity-100' : 'opacity-20'} />
                </div>
              )}
            </div>
          ))}
          {!isEditing && games.length === 0 && (
             <div className="text-center p-10 border-2 border-dashed rounded-[2rem] text-slate-300 font-bold text-[10px] uppercase">
                Chưa có dữ liệu trò chơi
             </div>
          )}
        </div>

        {/* KHU VỰC HIỂN THỊ GAME */}
        <div className="xl:col-span-3 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden relative min-h-[750px] flex flex-col">
          {activeGame ? (
            <>
              <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white border-b border-white/10">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">
                     ĐANG CHƠI: {activeGame.title}
                   </span>
                </div>
                <button 
                  onClick={() => setActiveGame(null)} 
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20}/>
                </button>
              </div>
              <iframe 
                src={activeGame.url}
                className="w-full flex-1 border-none bg-white"
                allowFullScreen
                title={activeGame.title}
                allow="autoplay; fullscreen; clipboard-write"
              ></iframe>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-slate-50/50">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative p-12 bg-white rounded-[3rem] shadow-2xl">
                  <Target size={100} className="text-orange-500/20" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-slate-500 font-black uppercase text-lg tracking-[0.3em] italic">
                   TRUNG TÂM GIẢI TRÍ
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <div className="h-[1px] w-8 bg-slate-200"></div>
                  Hệ thống huấn luyện thông thái
                  <div className="h-[1px] w-8 bg-slate-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CẢNH BÁO */}
      <div className="bg-amber-50 p-5 rounded-[2rem] border border-amber-100 flex items-center gap-4">
        <AlertCircle className="text-amber-600" size={24} />
        <p className="text-[11px] text-amber-900 font-bold uppercase italic">
          LƯU Ý: Sau khi chỉnh sửa, đồng chí PHẢI bấm "XÁC NHẬN LƯU VĨNH VIỄN" để dữ liệu được ghi vào bộ nhớ trình duyệt. 
          Nếu nội dung không hiện, hãy nhấn F5.
        </p>
      </div>
    </div>
  );
};

export default GameView;
