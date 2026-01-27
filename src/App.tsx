import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#c41e16] uppercase mb-2">
          Sổ tay Giáo dục Chính trị
        </h1>
        <p className="text-lg text-slate-700 font-medium">
          Lực lượng vũ trang Thủ đô
        </p>
      </header>

      <main className="bg-white p-6 rounded-lg shadow-2xl border-t-4 border-[#c41e16] max-w-md w-full text-center">
        <div className="mb-6">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg" 
            alt="Quân kỳ" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-slate-600 leading-relaxed">
            Chào mừng đồng chí đến với hệ thống học tập chính trị trực tuyến Version 2.0.
          </p>
        </div>
        
        <button 
          className="bg-[#c41e16] text-white px-8 py-3 rounded-full font-bold hover:bg-[#7f1d1d] transition-all shadow-lg"
          onClick={() => alert('Hệ thống đang khởi tạo dữ liệu...')}
        >
          VÀO HỌC TẬP
        </button>
      </main>

      <footer className="mt-12 text-sm text-slate-500 font-semibold">
        © 2026 LLVT THỦ ĐÔ - QUYẾT TỬ ĐỂ TỔ QUỐC QUYẾT SINH
      </footer>
    </div>
  );
}

export default App;
