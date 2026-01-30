import React from 'react';

const TraditionView = ({ isAdmin }: { isAdmin: boolean }) => {
  const units = [
    { name: 'LLVT Thủ đô', color: 'bg-red-50', logo: '🏛️' },
    { name: 'Sư đoàn 301', color: 'bg-green-50', logo: '🛡️' },
    { name: 'Trung đoàn 59', color: 'bg-blue-50', logo: '⚔️' },
    { name: 'Trung đoàn 692', color: 'bg-orange-50', logo: '🔫' },
    { name: 'Trung đoàn 757', color: 'bg-purple-50', logo: '🎖️' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-black text-slate-800 uppercase">Lịch sử Truyền thống</h1>
        {isAdmin && (
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold animate-pulse">
            SỬA NỘI DUNG
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map(unit => (
          <div key={unit.name} className={`${unit.color} p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">{unit.logo}</span>
              <div>
                <h3 className="font-black text-slate-800 uppercase text-sm leading-tight">{unit.name}</h3>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Bấm để tra cứu chi tiết</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraditionView;
