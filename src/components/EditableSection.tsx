import React, { useState } from 'react';
import { Edit2, Save, Image as ImageIcon, User } from 'lucide-react';

interface Props {
  isAdmin: boolean;
  title: string;
  content: string;
  imageUrl?: string;
  avatarUrl?: string;
  onSave: (title: string, content: string, imageUrl?: string, avatarUrl?: string) => void;
}

const EditableSection: React.FC<Props> = ({ isAdmin, title, content, imageUrl, avatarUrl, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, content, imageUrl, avatarUrl });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'avatarUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFormData({ ...formData, [field]: ev.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-8 rounded-[3rem] border-2 border-red-100 shadow-xl space-y-4 animate-in zoom-in-95">
        <input className="w-full p-4 border rounded-xl font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea className="w-full h-40 p-4 border rounded-xl" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
        <div className="flex gap-4">
           <button onClick={() => onSave(formData.title, formData.content, formData.imageUrl, formData.avatarUrl)} className="bg-red-700 text-white px-6 py-2 rounded-xl font-bold">LƯU</button>
           <button onClick={() => setIsEditing(false)} className="bg-slate-100 px-6 py-2 rounded-xl font-bold">HỦY</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-50 relative group">
      {isAdmin && (
        <button onClick={() => setIsEditing(true)} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-red-700 hover:text-white transition-all">
          <Edit2 size={20} />
        </button>
      )}
      <h3 className="text-3xl font-black text-red-800 uppercase italic mb-6">{title}</h3>
      <p className="text-slate-600 leading-relaxed whitespace-pre-line font-medium italic">"{content}"</p>
    </div>
  );
};

export default EditableSection;
