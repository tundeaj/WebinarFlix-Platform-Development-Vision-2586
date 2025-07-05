import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { mockCourses } from '../data/mockData';

const { FiSearch, FiStar, FiUsers, FiClock, FiBook, FiDollarSign } = FiIcons;

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['all', 'Development', 'Design', 'Data Science', 'Marketing', 'Blockchain', 'Mobile'];
  const priceFilters = ['all', 'free', 'paid'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.price === 0) ||
                        (selectedPrice === 'paid' && course.price > 0);
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Courses</h1>
          <p className="text-netflix-light">Master new skills with our comprehensive course library</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-light w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-netflix-black border border-netflix-gray rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-netflix-black border border-netflix-gray rounded-lg text-white focus:outline-none focus:border-netflix-red"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-3 bg-netflix-black border border-netflix-gray rounded-lg text-white focus:outline-none focus:border-netflix-red"
            >
              {priceFilters.map(filter => (
                <option key={filter} value={filter}>
                  {filter === 'all' ? 'All Prices' : filter === 'free' ? 'Free' : 'Paid'}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-netflix-black border border-netflix-gray rounded-lg text-white focus:outline-none focus:border-netflix-red"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/courses/${course.id}`}>
                <div className="bg-netflix-black rounded-lg overflow-hidden hover:bg-netflix-gray transition-colors group">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                      </div>
                    </div>
                    {course.progress > 0 && (
                      <div className="absolute top-2 right-2">
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-netflix-red text-white">
                          {course.progress}% Complete
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-netflix-red transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-netflix-light text-sm mb-3">{course.instructor}</p>
                    
                    <div className="flex items-center justify-between text-xs text-netflix-light mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(course.rating)}
                        <span className="ml-1">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUsers} className="w-3 h-3" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-netflix-light">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      {course.price > 0 && (
                        <div className="flex items-center space-x-1 text-green-400 font-semibold">
                          <SafeIcon icon={FiDollarSign} className="w-3 h-3" />
                          <span>{course.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-netflix-light">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CoursesPage;