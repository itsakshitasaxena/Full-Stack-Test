import React from "react";

export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-text">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline btn-sm">
            <span className="mr-2">🔍</span>
            Search
          </button>
          <button className="btn btn-outline btn-sm">
            <span className="mr-2">🔔</span>
            Notifications
          </button>
          <button className="btn btn-outline btn-sm">
            <span className="mr-2">⚙️</span>
            Settings
          </button>
        </div>
      </div>

      <div className="header-breadcrumb">
        <nav className="breadcrumb">
          <span className="breadcrumb-item">Dashboard</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{title}</span>
        </nav>
      </div>
    </header>
  );
}
