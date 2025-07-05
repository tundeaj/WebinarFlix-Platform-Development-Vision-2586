import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiInfo, FiUsers, FiClock } = FiIcons;

const HeroBanner = () => {
  const featuredWebinar = {
    id: 1,
    title: "The Future of AI in Software Development",
    description: "Join leading experts as they discuss how artificial intelligence is revolutionizing the way we build software. Learn about the latest tools, techniques, and best practices that are shaping the future of development.",
    speaker: "Dr. Sarah Chen",
    date: "2024-01-15T19:00:00Z",
    attendees: "2.5K",
    duration: "90 min",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    status: "live"
  };

  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredWebinar.thumbnail}
          alt={featuredWebinar.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Live Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>LIVE NOW</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredWebinar.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-netflix-light mb-6 leading-relaxed">
              {featuredWebinar.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center space-x-6 text-sm text-netflix-light mb-8">
              <div className="flex items-center space-x-2">
                <img
                  src={`https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face`}
                  alt={featuredWebinar.speaker}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-white">{featuredWebinar.speaker}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiUsers} className="w-4 h-4" />
                <span>{featuredWebinar.attendees} attending</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span>{featuredWebinar.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Join Now</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiInfo} className="w-5 h-5" />
                <span>More Info</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;