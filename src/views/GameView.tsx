import React, { useState } from 'react';
import { 
  Gamepad2, Plus, Trash2, Edit2, 
  Save, Play, Target, ChevronRight
} from 'lucide-react';

interface GameItem {
  id: string;
  title: string;
  url: string;
}

const GameView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [games, setGames] = useState<GameItem[]>([
    { id: '1', title: 'TRÒ CHƠI NHẬN THỨC CHÍNH TRỊ', url: '' }
  ]);

  // Tự động sửa link Wordwall/YouTube sang dạng nhúng (Embed)
  const formatUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (cleanUrl.includes('wordwall.net/resource/')) {
      return cleanUrl.replace('/resource/', '/embed/');
    }
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      return cleanUrl.replace('watch?v=', 'embed/');
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
    const finalValue = field === 'url' ? formatUrl(value) : value;
    setGames(games.map(g => g.id === id ? { ...g, [field]: finalValue } : g));
  };

  const deleteGame = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa trò chơi này không?")) {
      const updatedGames = games.filter(g => g.id !== id);
      setGames(updatedGames);
      if (activeGame?.id === id) setActiveGame(null);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700 pb-10">
      {/* Header chuyên nghiệp */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-orange-500 rounded-3xl text-white shadow-lg shadow-orange-100">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-orange-600 uppercase italic tracking-tighter">CHIẾN SĨ THÔNG THÁI</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Học mà chơi - Khơi nguồn tri thức</p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-3">
            <button 
              onClick={addGame}
              className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-orange-100 transition-all border border-orange-100"
            >
              <Plus size={16} /> THÊM Ô GAME
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] shadow-xl transition-all ${isEditing ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}
            >
              {isEditing ? <Save size={16} /> : <Edit2 size={16} />} 
              {isEditing ? "HOÀN TẤT LƯU" : "QUẢN TRỊ GAME"}
            </button>
          </div>
        )}
      </div>

      {/* Bố cục chia 2 phần: Danh sách & Khung chơi */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start flex-1">
        
        {/* CỘT DANH SÁCH GAME BÊN TRÁI */}
        <div className="xl:col-span-1 space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
          {games.map((game, index) => (
            <div 
              key={game.id}
              onClick={() => !isEditing && game.url && setActiveGame(game)}
              className={`p-5 rounded-[2rem] border-2 transition-all relative group ${
                activeGame?.id === game.id 
                ? 'bg-orange-600 border-orange-600 text-white shadow-lg' 
                : 'bg-white border-slate-50 text-slate-700 hover:border-orange-200'
              } ${!isEditing && 'cursor-pointer'}`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black opacity-40 uppercase">Cấu hình ô {index + 1}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteGame(game.id); }}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-900 focus:border-orange-500 outline-none"
                    value={game.title}
                    onChange={(e) => updateGame(game.id, 'title', e.target.value.toUpperCase())}
                    placeholder="Tên trò chơi..."
                  />
                  <input 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-blue-600"
                    value={game.url}
                    onChange={(e) => updateGame(game.id, 'url', e.target.value)}
                    placeholder="Dán link Wordwall/Quizizz..."
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
                      <span className="text-[9px] opacity-60 font-bold">NHẤN ĐỂ CHƠI</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={activeGame?.id === game.id ? 'opacity-100' : 'opacity-20'} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* KHUNG HIỂN THỊ GAME CỰC ĐẠI BÊN PHẢI */}
        <div className="xl:col-span-3 bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden relative min-h-[750px] flex flex-col">
          {activeGame ? (
            <>
              <div className="bg-slate-900 px-6 py-3 flex justify-between items-center text-white">
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   ĐANG PHÁT: {activeGame.title}
                </span>
                <button onClick={() => setActiveGame(null)} className="p-1 hover:bg-white/10 rounded-lg"><X size={18}/></button>
              </div>
              <iframe 
                src={activeGame.url}
                className="w-full flex-1 border-none"
                allowFullScreen
                title={activeGame.title}
                allow="autoplay; fullscreen; clipboard-write"
              ></iframe>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-slate-50">
              <div className="p-10 bg-white rounded-full shadow-2xl animate-bounce">
                <Target size={80} className="text-orange-200" />
              </div>
              <div className="text-center">
                <p className="text-slate-400 font-black uppercase text-sm tracking-widest">
                   Hệ thống trò chơi giáo dục
                </p>
                <p className="text-[11px] text-slate-300 mt-2 font-bold uppercase italic">
                   Vui lòng chọn một trò chơi ở danh sách bên trái
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameView;
