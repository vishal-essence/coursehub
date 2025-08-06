import React, { useState } from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onLike, onClick, isLiked, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(course);
  };

  const handleCardClick = () => {
    onClick(course);
  };

  const truncateText = (text, maxLength = 120) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''} ${isFeatured ? 'featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="course-image">
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=Course+Image';
          }}
        />
        <div className="course-overlay">
          <div className="course-rating">
            ⭐ {course.rating} ({formatNumber(course.students)} students)
          </div>
          <button className="enroll-btn">Enroll Now</button>
        </div>
      </div>

      <button 
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleLikeClick}
        aria-label={isLiked ? 'Unlike course' : 'Like course'}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>

      <div className="course-info">
        <div className="course-header">
          <h3 className="course-title">{course.title}</h3>
          <span className="course-price">{course.price}</span>
        </div>
        
        <p className="course-description">{truncateText(course.description)}</p>
        
        <div className="course-meta">
          <div className="course-instructor">
            <span className="meta-label">Instructor:</span>
            <span className="meta-value">{course.instructor}</span>
          </div>
          
          <div className="course-duration">
            <span className="meta-label">Duration:</span>
            <span className="meta-value">{course.duration}</span>
          </div>
          
          <div className="course-level">
            <span className="meta-label">Level:</span>
            <span className="meta-value">{course.level}</span>
          </div>
        </div>

        <div className="course-category">
          <span className="category-badge">{course.category}</span>
        </div>

        <div className="course-tags">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
