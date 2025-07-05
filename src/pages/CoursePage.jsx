import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { mockCourses } from '../data/mockData';

const { FiPlay, FiStar, FiUsers, FiClock, FiBook, FiAward } = FiIcons;

const CoursePage = () => {
  const { id } = useParams();
  const course = mockCourses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course not found</h2>
          <p className="text-netflix-light">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const modules = [
    { id: 1, title: "Introduction to the Course", duration: "15 min", completed: true },
    { id: 2, title: "Setting Up Your Environment", duration: "30 min", completed: true },
    { id: 3, title: "Core Concepts", duration: "45 min", completed: false },
    { id: 4, title: "Advanced Techniques", duration: "60 min", completed: false },
    { id: 5, title: "Project Building", duration: "90 min", completed: false },
    { id: 6, title: "Final Assessment", duration: "20 min", completed: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-16"
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                {course.price === 0 ? 'FREE' : `$${course.price}`}
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-netflix-red text-white">
                {course.category}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Continue Learning</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiAward} className="w-5 h-5" />
                <span>Get Certificate</span>
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Course Progress</span>
                <span className="text-netflix-light">{course.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Course Modules */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Course Content</h2>
              <div className="space-y-3">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      module.completed 
                        ? 'bg-green-900 border-green-500' 
                        : 'bg-netflix-black border-netflix-gray hover:border-netflix-red'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-green-500' : 'bg-gray-600'
                        }`}>
                          {module.completed ? '✓' : module.id}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{module.title}</h3>
                          <p className="text-netflix-light text-sm">{module.duration}</p>
                        </div>
                      </div>
                      <SafeIcon icon={FiPlay} className="w-5 h-5 text-netflix-light" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Course */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About this course</h2>
              <p className="text-netflix-light leading-relaxed">
                This comprehensive course is designed to take you from beginner to advanced level. 
                You'll learn through hands-on projects, real-world examples, and practical exercises 
                that will help you build a strong foundation and develop professional-level skills.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-netflix-black rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Course Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiClock} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Duration</p>
                    <p className="text-netflix-light text-sm">{course.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Students</p>
                    <p className="text-netflix-light text-sm">{course.students} enrolled</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiBook} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Modules</p>
                    <p className="text-netflix-light text-sm">{modules.length} modules</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(course.rating)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{course.rating}/5</p>
                    <p className="text-netflix-light text-sm">Course Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-netflix-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Instructor</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face`}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-white font-medium">{course.instructor}</h4>
                  <p className="text-netflix-light text-sm">Expert Instructor</p>
                </div>
              </div>
              
              <p className="text-netflix-light text-sm">
                Professional instructor with years of industry experience and a passion 
                for teaching. Has helped thousands of students achieve their learning goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePage;