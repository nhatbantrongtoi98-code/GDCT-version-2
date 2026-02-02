import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, Plus, Trash2, Edit2, 
  Save, Play, Target, ChevronRight, X, AlertCircle, Loader2
} from 'lucide-react';
import { ref, set, onValue } from "firebase/database";
import { db } from "./firebase-config"; 

interface GameItem {
  id: string;
  title: string;
  url: string;
}

const GameView: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [games, setGames] = useState<GameItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('OFFLINE_GAMES');
      // Fix: Trả về mảng mặc định nếu local trống
      return saved ? JSON.parse(saved) : [{ id: 'init-1', title: 'TRÒ CHƠI CHÍNH TRỊ', url: '' }];
    }
    return [{ id: 'init-1', title: 'TRÒ CHƠI CHÍNH TRỊ', url: '' }];
  });

  useEffect(() => {
    const gamesRef = ref(db, 'military_games');
    const unsubscribe = onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      // Chấp nhận cả object hoặc array từ Firebase
      if (data) {
        const gamesList = Array.isArray(data) ? data : Object.values(data);
        setGames(gamesList as GameItem[]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('OFFLINE_GAMES', JSON.stringify(gamesList));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const formatUrl = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl) return '';
    if (cleanUrl.includes('wordwall.net/resource/')) return cleanUrl.replace('/resource/', '/embed/');
    
    // Tối ưu Youtube nhúng
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      const videoId = cleanUrl.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : cleanUrl;
    }
    if (cleanUrl.includes('youtu.be/')) {
      const videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : cleanUrl;
    }
    return cleanUrl;
  };

  const addGame = () => {
    const newGame: GameItem = {
      // Dùng ID an toàn hơn
      id: `game-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `TRÒ CHƠI MỚI ${games.length + 1}`,
      url: ''
    };
    setGames([...games, newGame]);
  };

  const updateGame = (id: string, field: keyof GameItem, value: string) => {
    setGames(games.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const deleteGame = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa trò chơi này?")) {
      const updatedGames = games.filter(g => g.id !== id);
      setGames(updatedGames);
      if (activeGame?.id === id) setActiveGame(null);
    }
  };

  const handleSaveData = async () => {
    if (!isAdmin) return;
    setIsSaving(true);
    const finalGames = games.map(g => ({ ...g, url: formatUrl(g.url) }));

    try {
      await set(ref(db, 'military_games'), finalGames);
      setIsEditing(false);
      alert("✅ ĐỒNG BỘ THÀNH CÔNG");
    } catch (error) {
      alert("❌ LỖI KẾT NỐI MÁY CHỦ");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 pb-10 animate-in fade-in duration-500">
      {/* Header (Giữ nguyên giao diện đẹp của đồng chí) */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-orange-500 rounded-3xl text-white shadow-lg shadow-orange-100 ring-4 ring-orange-50">
            <Gamepad2 size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-orange-600 uppercase italic tracking-tighter">CHIẾN SĨ THÔNG THÁI</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Đồng bộ trực tuyến (Firebase Active)</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-3">
            {isEditing && (
              <button onClick={addGame} className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-[10px] hover:bg-orange-100 transition-all border border-orange-100">
                <Plus size={16} /> THÊM Ô GAME
              </button>
            )}
            <button 
              onClick={isEditing ? handleSaveData : () => setIsEditing(true)}
              disabled={isSaving}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[10px] shadow-xl transition-all border-b-4 active:border-b-0 ${isEditing ? 'bg-green-600 text-white border-green-800' : 'bg-slate-800 text-white border-slate-950'}`}
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : (isEditing ? <Save size={16} /> : <Edit2 size={16} />)} 
              {isEditing ? "XÁC NHẬN ĐỒNG BỘ" : "QUẢN TRỊ GAME"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start flex-1">
        {/* Sidebar danh sách */}
        <div className="xl:col-span-1 space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
          {games.map((game, index) => (
            <div 
              key={game.id}
              onClick={() => !isEditing && game.url && setActiveGame(game)}
              className={`p-5 rounded-[2rem] border-2 transition-all relative ${activeGame?.id === game.id ? 'bg-orange-600 border-orange-600 text-white shadow-lg translate-x-2' : 'bg-white border-slate-50 text-slate-700 hover:border-orange-200 shadow-sm'} ${!isEditing && game.url ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase opacity-60">Cấu hình {index + 1}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteGame(game.id); }} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[11px] font-bold outline-none focus:ring-2 ring-orange-500" value={game.title} onChange={(e) => updateGame(game.id, 'title', e.target.value.toUpperCase())} placeholder="Tên trò chơi..." />
                  <input className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[10px] text-blue-600 outline-none" value={game.url} onChange={(e) => updateGame(game.id, 'url', e.target.value)} placeholder="Dán link Wordwall/Youtube..." />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${activeGame?.id === game.id ? 'bg-white/20' : 'bg-orange-50 text-orange-600'}`}>
                      <Play size={16} fill="currentColor" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black leading-tight uppercase tracking-tight block">{game.title}</span>
                      <span className="text-[9px] opacity-60 font-bold uppercase italic">{game.url ? 'Sẵn sàng chiến đấu' : 'Chưa có link'}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={activeGame?.id === game.id ? 'opacity-100' : 'opacity-20'} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Màn hình Game Iframe */}
        <div className="xl:col-span-3 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden relative min-h-[750px] flex flex-col">
          {activeGame ? (
            <>
              <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white border-b border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Đang tải dữ liệu: {activeGame.title}</span>
                </div>
                <button onClick={() => setActiveGame(null)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20}/></button>
              </div>
              <iframe 
                src={activeGame.url} 
                className="w-full flex-1 border-none bg-white" 
                allowFullScreen 
                title={activeGame.title} 
                // Fix: Thêm sandbox an toàn và quyền media đầy đủ
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                loading="lazy"
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-slate-50/50">
              <Target size={100} className="text-orange-500/10" />
              <div className="text-center">
                <p className="text-slate-500 font-black uppercase text-lg tracking-[0.3em] italic">TRUNG TÂM GIẢI TRÍ</p>
                <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                  <div className="h-[1px] w-8 bg-slate-200"></div>
                  Hệ thống huấn luyện thông thái
                  <div className="h-[1px] w-8 bg-slate-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameView;
