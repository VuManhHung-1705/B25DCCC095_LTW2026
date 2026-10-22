import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getNavStyle = ({ isActive }) => ({
    color: isActive ? 'red' : '#1e293b',
    fontWeight: isActive ? 'bold' : '500',
  });

  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link" style={getNavStyle}>
        Trang chủ
      </NavLink>
      <NavLink to="/questions" className="nav-link" style={getNavStyle}>
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink to="/history" className="nav-link" style={getNavStyle}>
        Lịch sử
      </NavLink>
    </nav>
  );
};

export default NavBar;