import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = ({ courses, onLike, onClick, likedCourses }) => {
  if (courses.length === 0) {
    return (
      <div className="no-courses">
        <h3>No courses found</h3>
        <p>Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onLike={onLike}
            onClick={onClick}
            isLiked={likedCourses?.some(c => c.id === course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
