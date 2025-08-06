import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for courses, instructors, or topics..."
            value={searchInput}
            onChange={handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 