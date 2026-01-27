import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Kết nối trực tiếp với file App.tsx trong cùng thư mục src

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
