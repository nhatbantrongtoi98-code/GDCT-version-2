import React from 'react';
import { AppData } from '../types';

interface Props {
  data: AppData;
  isAdmin: boolean;
  onUpdate: (key: keyof AppData, title: string, body: string, img?: string) => void;
}

const HistoryVNView: React.FC<Props> = ({ data, isAdmin, onUpdate }) => {
  // Đồng chí có thể tùy biến giao diện này sau, mục tiêu là để build thành công
  return (
    <div className="p-8 bg-white rounded-[3rem] shadow-sm">
      <h2 className="text-3xl font-black text-red-800 uppercase italic mb-6">Lịch sử Quân đội</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{data.historyVN.title}</h3>
        <p className="text-slate-600 leading-relaxed">{data.historyVN.body}</p>
        {data.historyVN.imageUrl && (
          <img src={data.historyVN.imageUrl} alt="Lịch sử" className="w-full rounded-2xl" />
        )}
      </div>
    </div>
  );
};

export default HistoryVNView;
