import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiBook, FiStar, FiUsers, FiClock } = FiIcons;

const CourseCard = ({ course, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-48 h-32',
    medium: 'w-64 h-36',
    large: 'w-80 h-48'
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-shrink-0 cursor-pointer"
    >
      <Link to={`/courses/${course.id}`}>
        <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden bg-netflix-gray`}>
          {/* Thumbnail */}
          <img
            src={course.thumbnail || `https://picsum.photos/400/300?random=${course.id + 100}`}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <SafeIcon icon={FiPlay} className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Price Badge */}
          {course.price && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
              {course.price === 0 ? 'FREE' : `$${course.price}`}
            </div>
          )}

          {/* Progress Badge */}
          {course.progress && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-netflix-red text-white">
              {course.progress}% Complete
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-white group-hover:text-netflix-red transition-colors duration-200 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="text-sm text-netflix-light line-clamp-1">
            {course.instructor}
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-netflix-light">
            <div className="flex items-center space-x-1">
              {renderStars(course.rating)}
              <span className="ml-1">{course.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUsers} className="w-3 h-3" />
              <span>{course.students}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;