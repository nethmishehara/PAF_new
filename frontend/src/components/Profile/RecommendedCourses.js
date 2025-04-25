import React, { useEffect, useState } from 'react';
import { getRecommendedCoursesBySkills } from '../../services/api';
import './CourseRecommendations.css';

function RecommendedCourses({ skills }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (skills.length > 0) {
      getRecommendedCoursesBySkills(skills)
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    }
  }, [skills]);

  return (
    <div>
      <h3>Recommended Courses for You</h3>
      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <div className="course-tags">
              {course.tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCourses;
