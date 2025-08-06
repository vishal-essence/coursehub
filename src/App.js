import React, { useState, useEffect } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import Header from './components/Header';

function App() {
  const [courses, setCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [likedCourses, setLikedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  // Load liked courses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('likedCourses');
    if (saved) setLikedCourses(JSON.parse(saved));
  }, []);

  // Save liked courses to localStorage
  useEffect(() => {
    localStorage.setItem('likedCourses', JSON.stringify(likedCourses));
  }, [likedCourses]);

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        
        // Sample course data
        const courseData = [
          {
            id: 1,
            title: "Complete React Developer Course",
            description: "Learn React from scratch to advanced concepts with hands-on projects",
            instructor: "Max Schwarzmüller",
            duration: "40 hours",
            level: "Beginner to Advanced",
            price: "Free",
            category: "Web Development",
            rating: 4.8,
            students: 125000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
            tags: ["React", "JavaScript", "Frontend", "Web Development"]
          },
          {
            id: 2,
            title: "Python for Everybody",
            description: "Learn Python programming fundamentals and data structures",
            instructor: "Dr. Charles Severance",
            duration: "35 hours",
            level: "Beginner",
            price: "Free",
            category: "Programming",
            rating: 4.7,
            students: 98000,
            image: "https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg",
            link: "https://www.coursera.org/specializations/python",
            tags: ["Python", "Programming", "Data Science", "Beginner"]
          },
          {
            id: 3,
            title: "Machine Learning by Andrew Ng",
            description: "Comprehensive introduction to machine learning algorithms and applications",
            instructor: "Andrew Ng",
            duration: "55 hours",
            level: "Intermediate",
            price: "Free",
            category: "Data Science",
            rating: 4.9,
            students: 450000,
            image: "https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg",
            link: "https://www.coursera.org/learn/machine-learning",
            tags: ["Machine Learning", "AI", "Data Science", "Mathematics"]
          },
          {
            id: 4,
            title: "The Complete JavaScript Course",
            description: "Master JavaScript ES6+ and build real-world applications",
            instructor: "Jonas Schmedtmann",
            duration: "68 hours",
            level: "Beginner to Advanced",
            price: "Free",
            category: "Web Development",
            rating: 4.8,
            students: 89000,
            image: "https://img-c.udemycdn.com/course/750x422/851712_fc61_6.jpg",
            link: "https://www.udemy.com/course/the-complete-javascript-course/",
            tags: ["JavaScript", "ES6", "Web Development", "Programming"]
          },
          {
            id: 5,
            title: "Data Structures and Algorithms",
            description: "Learn fundamental computer science concepts and problem-solving",
            instructor: "Abdul Bari",
            duration: "42 hours",
            level: "Intermediate",
            price: "Free",
            category: "Computer Science",
            rating: 4.6,
            students: 67000,
            image: "https://img-c.udemycdn.com/course/750x422/2121018_9fc3_3.jpg",
            link: "https://www.udemy.com/course/datastructurescncpp/",
            tags: ["Algorithms", "Data Structures", "Computer Science", "C++"]
          },
          {
            id: 6,
            title: "Complete Node.js Developer Course",
            description: "Build scalable backend applications with Node.js and Express",
            instructor: "Andrew Mead",
            duration: "38 hours",
            level: "Intermediate",
            price: "Free",
            category: "Backend Development",
            rating: 4.7,
            students: 78000,
            image: "https://img-c.udemycdn.com/course/750x422/922484_52a1_8.jpg",
            link: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
            tags: ["Node.js", "Express", "Backend", "JavaScript"]
          },
          {
            id: 7,
            title: "Flutter & Dart - Complete Guide",
            description: "Build beautiful cross-platform mobile apps with Flutter",
            instructor: "Max Schwarzmüller",
            duration: "45 hours",
            level: "Beginner to Advanced",
            price: "Free",
            category: "Mobile Development",
            rating: 4.8,
            students: 92000,
            image: "https://img-c.udemycdn.com/course/750x422/1708340_7108_3.jpg",
            link: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
            tags: ["Flutter", "Dart", "Mobile Development", "Cross-platform"]
          },
          {
            id: 8,
            title: "AWS Certified Solutions Architect",
            description: "Learn cloud computing and AWS services for certification",
            instructor: "Stephane Maarek",
            duration: "25 hours",
            level: "Intermediate",
            price: "Free",
            category: "Cloud Computing",
            rating: 4.7,
            students: 156000,
            image: "https://img-c.udemycdn.com/course/750x422/3142166_a637_3.jpg",
            link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/",
            tags: ["AWS", "Cloud Computing", "DevOps", "Certification"]
          },
          {
            id: 9,
            title: "Docker and Kubernetes",
            description: "Master containerization and orchestration with Docker & K8s",
            instructor: "Stephen Grider",
            duration: "32 hours",
            level: "Intermediate",
            price: "Free",
            category: "DevOps",
            rating: 4.6,
            students: 89000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
            tags: ["Docker", "Kubernetes", "DevOps", "Containers"]
          },
          {
            id: 10,
            title: "Complete SQL Bootcamp",
            description: "Learn SQL from scratch and master database management",
            instructor: "Jose Portilla",
            duration: "28 hours",
            level: "Beginner to Intermediate",
            price: "Free",
            category: "Database",
            rating: 4.7,
            students: 112000,
            image: "https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg",
            link: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
            tags: ["SQL", "Database", "PostgreSQL", "Data Analysis"]
          },
          {
            id: 11,
            title: "Git and GitHub for Beginners",
            description: "Master version control and collaborative development",
            instructor: "Jason Taylor",
            duration: "15 hours",
            level: "Beginner",
            price: "Free",
            category: "Development Tools",
            rating: 4.5,
            students: 45000,
            image: "https://img-c.udemycdn.com/course/750x422/4187690_4c95_3.jpg",
            link: "https://www.udemy.com/course/git-and-github-bootcamp/",
            tags: ["Git", "GitHub", "Version Control", "Collaboration"]
          },
          {
            id: 12,
            title: "Complete Python Bootcamp",
            description: "Go from zero to hero in Python programming",
            instructor: "Jose Portilla",
            duration: "22 hours",
            level: "Beginner to Intermediate",
            price: "Free",
            category: "Programming",
            rating: 4.6,
            students: 145000,
            image: "https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg",
            link: "https://www.udemy.com/course/complete-python-bootcamp/",
            tags: ["Python", "Programming", "Automation", "Web Scraping"]
          },
          {
            id: 13,
            title: "React Native - The Practical Guide",
            description: "Build native mobile apps with React Native",
            instructor: "Max Schwarzmüller",
            duration: "35 hours",
            level: "Intermediate",
            price: "Free",
            category: "Mobile Development",
            rating: 4.7,
            students: 67000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/react-native-the-practical-guide/",
            tags: ["React Native", "Mobile Development", "JavaScript", "Cross-platform"]
          },
          {
            id: 14,
            title: "Complete Web Developer Bootcamp",
            description: "Learn HTML, CSS, JavaScript, Node.js and more",
            instructor: "Colt Steele",
            duration: "46 hours",
            level: "Beginner",
            price: "Free",
            category: "Web Development",
            rating: 4.5,
            students: 89000,
            image: "https://img-c.udemycdn.com/course/750x422/625204_436a_2.jpg",
            link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
            tags: ["HTML", "CSS", "JavaScript", "Full Stack"]
          },
          {
            id: 15,
            title: "Data Science and Machine Learning Bootcamp",
            description: "Learn data science, machine learning, and deep learning",
            instructor: "Jose Portilla",
            duration: "44 hours",
            level: "Intermediate",
            price: "Free",
            category: "Data Science",
            rating: 4.6,
            students: 78000,
            image: "https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg",
            link: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
            tags: ["Data Science", "Machine Learning", "Python", "Statistics"]
          },
          {
            id: 16,
            title: "Complete Angular Developer Course",
            description: "Master Angular framework and build enterprise applications",
            instructor: "Max Schwarzmüller",
            duration: "38 hours",
            level: "Intermediate",
            price: "Free",
            category: "Web Development",
            rating: 4.7,
            students: 56000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
            tags: ["Angular", "TypeScript", "Frontend", "Web Development"]
          },
          {
            id: 17,
            title: "Complete C# Unity Game Developer 2D",
            description: "Learn Unity 2D game development with C# programming",
            instructor: "Ben Tristem",
            duration: "52 hours",
            level: "Beginner to Intermediate",
            price: "Free",
            category: "Game Development",
            rating: 4.8,
            students: 89000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/unitycourse/",
            tags: ["Unity", "C#", "Game Development", "2D Games"]
          },
          {
            id: 18,
            title: "Complete Linux Administration Bootcamp",
            description: "Master Linux system administration and command line",
            instructor: "Jason Cannon",
            duration: "28 hours",
            level: "Beginner to Intermediate",
            price: "Free",
            category: "System Administration",
            rating: 4.6,
            students: 45000,
            image: "https://img-c.udemycdn.com/course/750x422/4187690_4c95_3.jpg",
            link: "https://www.udemy.com/course/linux-administration-bootcamp/",
            tags: ["Linux", "System Administration", "Command Line", "DevOps"]
          },
          {
            id: 19,
            title: "Complete Ethical Hacking Bootcamp",
            description: "Learn ethical hacking and penetration testing",
            instructor: "Zaid Sabih",
            duration: "42 hours",
            level: "Intermediate",
            price: "Free",
            category: "Cybersecurity",
            rating: 4.7,
            students: 67000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/learn-ethical-hacking-from-scratch/",
            tags: ["Ethical Hacking", "Cybersecurity", "Penetration Testing", "Kali Linux"]
          },
          {
            id: 20,
            title: "Complete Blockchain Developer Bootcamp",
            description: "Learn blockchain development and smart contracts",
            instructor: "Stephen Grider",
            duration: "35 hours",
            level: "Intermediate",
            price: "Free",
            category: "Blockchain",
            rating: 4.5,
            students: 34000,
            image: "https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg",
            link: "https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/",
            tags: ["Blockchain", "Ethereum", "Solidity", "Smart Contracts"]
          }
        ];
        
        setCourses(courseData);
        setFilteredCourses(courseData);
        setFeaturedCourses(courseData.slice(0, 6)); // Top 6 courses as featured
        setError(null);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSearchResults(null);
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(term.toLowerCase()) ||
      course.description.toLowerCase().includes(term.toLowerCase()) ||
      course.category.toLowerCase().includes(term.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );

    setSearchResults({
      results: filtered,
      total_results: filtered.length
    });
    setFilteredCourses(filtered);
    setError(null);
  };

  // Handle like/unlike
  const handleLikeCourse = (course) => {
    setLikedCourses(prev => {
      const isLiked = prev.some(c => c.id === course.id);
      return isLiked 
        ? prev.filter(c => c.id !== course.id)
        : [...prev, course];
    });
  };

  // Handle course click - redirect to course link
  const handleCourseClick = (course) => {
    window.open(course.link, '_blank');
  };

  // Reset filtered courses when search is cleared
  useEffect(() => {
    if (searchTerm.trim() === '' && !searchResults) {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses, searchResults]);

  if (loading && courses.length === 0) {
    return (
      <div className="container">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {error && <div className="error">{error}</div>}
        {searchResults && (
          <div className="search-info">
            <p>Found {searchResults.total_results} courses for "{searchTerm}"</p>
          </div>
        )}

        {/* Featured Courses */}
        {!searchResults && featuredCourses.length > 0 && (
          <section className="section featured-courses-section">
            <h2 className="section-title">⭐ Featured Courses</h2>
            <div className="featured-courses-grid">
              {featuredCourses.map((course, index) => (
                <div key={course.id} className="featured-course-card">
                  <div className="featured-badge">Featured #{index + 1}</div>
                  <CourseCard 
                    course={course} 
                    onLike={handleLikeCourse}
                    onClick={handleCourseClick}
                    isLiked={likedCourses.some(c => c.id === course.id)}
                    isFeatured={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Courses */}
        {!searchResults && (
          <section className="section all-courses-section">
            <h2 className="section-title">📚 All Courses</h2>
            <CourseList 
              courses={filteredCourses} 
              onLike={handleLikeCourse}
              onClick={handleCourseClick}
              likedCourses={likedCourses}
            />
          </section>
        )}

        {/* Search Results */}
        {searchResults && (
          <section className="section search-results-section">
            <h2 className="section-title">🔍 Search Results</h2>
            <CourseList 
              courses={filteredCourses} 
              onLike={handleLikeCourse}
              onClick={handleCourseClick}
              likedCourses={likedCourses}
            />
          </section>
        )}
      </div>
    </div>
  );
}

export default App; 