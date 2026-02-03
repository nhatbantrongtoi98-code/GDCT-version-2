import React, { useState } from 'react';
import { User, Lock, Palette, Save, ShieldCheck } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4">
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-green-900 uppercase italic mb-8 flex items-center gap-3">
          <ShieldCheck className="text-red-700" size={32} /> Cài đặt hệ thống
        </h2>

        <div className="space-y-8">
          {/* Đổi tên */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Thay đổi tên người dùng</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input type="text" className="w-full pl-14 p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-green-800 outline-none transition-all text-sm md:text-base" placeholder="Nhập tên mới..." />
            </div>
          </div>

          {/* Cập nhật mật khẩu */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Cập nhật mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input type="password" className="w-full pl-14 p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-green-800 outline-none transition-all text-sm md:text-base" placeholder="Mật khẩu mới..." />
            </div>
          </div>

          {/* Chỉnh sửa giao diện */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-4 text-sm md:text-base"><Palette size={20}/> Tùy chỉnh màu sắc quân binh chủng</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-900 border-4 border-white shadow-md cursor-pointer"></div>
              <div className="w-10 h-10 rounded-full bg-blue-900 border-4 border-white shadow-md cursor-pointer opacity-40"></div>
              <div className="w-10 h-10 rounded-full bg-red-900 border-4 border-white shadow-md cursor-pointer opacity-40"></div>
            </div>
          </div>
        </div>

        <button className="w-full mt-10 bg-green-900 text-yellow-400 p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-800 active:scale-95 transition-all">
          <Save size={20} /> Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
