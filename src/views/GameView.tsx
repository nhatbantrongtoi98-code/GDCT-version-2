import React, { useState } from 'react';
import { 
  Gamepad2, Plus, Trash2, Edit2, 
  ExternalLink, Save, X, Target, Play
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
    if (window.confirm("Xóa trò chơi này khỏi danh sách?")) {
      setGames(games.filter(g => g.id !== id));
      if (activeGame?.id === id) setActiveGame(null);
    }
  };

  // Hàm xử lý link YouTube sang Embed (tương tự EntertainmentView)
  const formatUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (cleanUrl.includes('wordwall.net/resource/')) {
      return cleanUrl.replace('/resource/', '/embed/');
    }
    return cleanUrl;
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-orange-500 rounded-3xl text-white shadow-lg shadow-orange-100">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-orange-600 uppercase italic tracking-tighter">CHIẾN SĨ THÔNG THÁI</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Kho trò chơi giáo dục chính trị</p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-3">
            <button 
              onClick={addGame}
              className="flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-orange-200 transition-all"
            >
              <Plus size={16} /> THÊM GAME MỚI
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] shadow-xl transition-all ${isEditing ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}
            >
              {isEditing ? <Save size={16} /> : <Edit2 size={16} />} 
              {isEditing ? "LƯU DANH SÁCH" : "CHỈNH SỬA"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* DANH SÁCH GAME BÊN TRÁI */}
        <div className="xl:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {games.map((game) => (
            <div 
              key={game.id}
              onClick={() => !isEditing && game.url && setActiveGame(game)}
              className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer group ${
                activeGame?.id === game.id 
                ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100' 
                : 'bg-white border-slate-50 text-slate-700 hover:border-orange-200 shadow-sm'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <input 
                    className="w-full p-2 bg-slate-50 border rounded-xl text-[10px] font-bold text-slate-900"
                    value={game.title}
                    onChange={(e) => updateGame(game.id, 'title', e.target.value.toUpperCase())}
                    placeholder="Tên trò chơi"
                  />
                  <input 
                    className="w-full p-2 bg-slate-50 border rounded-xl text-[9px] text-blue-600"
                    value={game.url}
                    onChange={(e) => updateGame(game.id, 'url', formatUrl(e.target.value))}
                    placeholder="Dán link (Wordwall, Quizizz...)"
                  />
                  <button onClick={() => deleteGame(game.id)} className="text-red-500 text-[9px] font-bold hover:underline flex items-center gap-1">
                    <Trash2 size={12}/> XÓA GAME
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeGame?.id === game.id ? 'bg-white/20' : 'bg-orange-50 text-orange-600'}`}>
                      <Play size={14} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-black leading-tight uppercase">{game.title}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* KHUNG HIỂN THỊ GAME CỰC ĐẠI BÊN PHẢI */}
        <div className="xl:col-span-3 bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden relative min-h-[700px]">
          {activeGame ? (
            <iframe 
              src={activeGame.url}
              className="absolute inset-0 w-full h-full border-none"
              allowFullScreen
              title={activeGame.title}
              allow="autoplay; fullscreen"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-slate-50">
              <div className="p-8 bg-white rounded-full shadow-2xl animate-bounce">
                <Target size={64} className="text-orange-200" />
              </div>
              <div className="text-center">
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">
                  {games.some(g => g.url) ? "Chọn một trò chơi để bắt đầu" : "Vui lòng gắn link trò chơi"}
                </p>
                <p className="text-[10px] text-slate-300 mt-2 italic">Mẹo: Nhấn 'CHỈNH SỬA' để dán link trò chơi Wordwall của đồng chí</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameView;
