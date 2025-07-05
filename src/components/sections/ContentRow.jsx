import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import WebinarCard from '../common/WebinarCard';
import CourseCard from '../common/CourseCard';

const { FiChevronLeft, FiChevronRight } = FiIcons;

const ContentRow = ({ title, items, type = 'webinar' }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {type === 'webinar' ? (
              <WebinarCard webinar={item} />
            ) : (
              <CourseCard course={item} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;