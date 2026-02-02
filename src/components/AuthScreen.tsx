import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { AppData, UserAccount } from '../types';

const AuthScreen: React.FC<{ data: AppData; onLogin: (user: UserAccount) => void }> = ({ data, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin123' && password === '123456') {
      onLogin({ username: 'admin123', role: 'admin' });
      return;
    }
    const users: UserAccount[] = JSON.parse(localStorage.getItem('military_users_v7') || '[]');
    if (isRegistering) {
      if (users.find(u => u.username === username)) { setError('Tài khoản đã tồn tại.'); return; }
      users.push({ username, password, role: 'user' });
      localStorage.setItem('military_users_v7', JSON.stringify(users));
      setIsRegistering(false);
      alert('Đăng ký thành công!');
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) onLogin(user); else setError('Thông tin không chính xác.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl flex overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-red-900 items-center justify-center p-12 text-white flex-col gap-8">
           <QRCodeSVG value={window.location.href} size={150} fgColor="#7f1d1d" className="bg-white p-2 rounded-xl" />
           <p className="text-xs font-bold uppercase tracking-widest text-center opacity-70">Quét mã để truy cập trên thiết bị di động</p>
        </div>
        <form onSubmit={handleAuth} className="p-12 flex-1 space-y-6">
          <h2 className="text-2xl font-black uppercase text-slate-800">{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h2>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <input className="w-full p-4 border-2 rounded-xl outline-none focus:border-red-700 font-bold" placeholder="Tên định danh" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" className="w-full p-4 border-2 rounded-xl outline-none focus:border-red-700 font-bold" placeholder="Mật mã" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-red-700 text-white py-4 rounded-xl font-black uppercase shadow-lg hover:bg-red-800 transition-all">
            {isRegistering ? 'Xác nhận Đăng ký' : 'Vào hệ thống'}
          </button>
          <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="w-full text-[10px] font-bold text-slate-400 uppercase">
            {isRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AuthScreen;
