import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div>
      <NavBar />
      <main className="container">
        {loading ? (
          <div className="card"><p>Đang tải câu hỏi...</p></div>
        ) : error ? (
          <div className="card"><p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p></div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;