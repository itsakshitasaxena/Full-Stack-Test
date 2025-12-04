import React from 'react';

export default function Sidebar({ navigation, currentPage, onNavigate }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🏪 Wholesaler</h2>
      </div>
      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.href)}
            className={`nav-item ${currentPage === item.href ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
