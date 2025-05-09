import React from 'react';
import './CourseRecommendation.css';

// Updated courses with actual URLs to learning resources
const courses = [
  { name: 'Advanced Java', skill: 'Java', url: 'https://www.geeksforgeeks.org/what-is-advanced-java/' },
  { name: 'React for Beginners', skill: 'React', url: 'https://reactforbeginners.com/' },
  { name: 'MongoDB Essentials', skill: 'MongoDB', url: 'https://www.mongodb.com/resources/products/fundamentals/basics' },
  { name: 'Data Structures in C++', skill: 'C++', url: 'https://www.w3schools.com/cpp/cpp_data_structures.asp' },
  { name: 'Spring Boot Masterclass', skill: 'Spring Boot', url: 'https://codewithmosh.com/p/spring-boot-fundamentals' },
  { name: 'Python for Data Science', skill: 'Python', url: 'https://python.land/data-science' },
  { name: 'AWS Cloud Certification', skill: 'Cloud Computing', url: 'https://aws.amazon.com/free/?trk=14a4002d-4936-4343-8211-b5a150ca592b&sc_channel=ps&ef_id=Cj0KCQjw5ubABhDIARIsAHMighaMajAtlkSBJgcpWLEGMbFcUnwjkWY0L1dHj6492uR8EfvAxrzaFpQaAhOqEALw_wcB:G:s&s_kwcid=AL!4422!3!453325184782!e!!g!!aws!10712784856!111477279771&gad_campaignid=10712784856&gbraid=0AAAAADjHtp8fO8Gwmv6vBcv_8uL6HsbnW&gclid=Cj0KCQjw5ubABhDIARIsAHMighaMajAtlkSBJgcpWLEGMbFcUnwjkWY0L1dHj6492uR8EfvAxrzaFpQaAhOqEALw_wcB&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all' },
  { name: 'Machine Learning Basics', skill: 'Machine Learning', url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/' },
  { name: 'Web Development with Node.js', skill: 'Node.js', url: 'https://www.geeksforgeeks.org/how-to-use-node-js-for-backend-web-development/' },
  { name: 'UX/UI Design Fundamentals', skill: 'Design', url: 'https://www.udemy.com/course/ux-ui-design-for-web-developers/' },
];

const CourseRecommendation = ({ skillsToImprove }) => {
  // Filter courses that match the user's skills to improve
  const recommended = courses.filter((course) =>
    skillsToImprove.some((skill) =>
      course.skill.toLowerCase().includes(skill.toLowerCase())
    )
  );

  return (
    <div className="course-recommendations">
      {recommended.length > 0 ? (
        <ul className="course-list">
          {recommended.map((course, index) => (
            <li key={index} className="course-item">
              <div className="course-info">
                <span className="course-badge">Recommended</span>
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link">
                  <strong>{course.name}</strong>
                </a>
                <span className="course-skill">for <em>{course.skill}</em></span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recommendations">No recommendations found. Update your profile to add skills!</p>
      )}
    </div>
  );
};

export default CourseRecommendation;
