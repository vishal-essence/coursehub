import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">
          <span className="course-icon">📚</span>
          OpenCourse Hub
        </h1>
        <p className="header-subtitle">Discover the best free and open source courses</p>
      </div>
    </header>
  );
};

export default Header; 