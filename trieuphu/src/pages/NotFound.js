import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2>404 – Không tìm thấy trang</h2>
      <p style={{ marginBottom: '20px' }}>Đường dẫn bạn truy cập không tồn tại.</p>
      <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;