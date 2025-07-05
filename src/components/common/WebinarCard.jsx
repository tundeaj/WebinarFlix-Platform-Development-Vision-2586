import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiUsers, FiClock, FiCalendar } = FiIcons;

const WebinarCard = ({ webinar, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-48 h-32',
    medium: 'w-64 h-36',
    large: 'w-80 h-48'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-shrink-0 cursor-pointer"
    >
      <Link to={`/webinars/${webinar.id}`}>
        <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden bg-netflix-gray`}>
          {/* Thumbnail */}
          <img
            src={webinar.thumbnail || `https://picsum.photos/400/300?random=${webinar.id}`}
            alt={webinar.title}
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

          {/* Status Badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(webinar.status)} text-white`}>
            {webinar.status === 'live' && 'LIVE'}
            {webinar.status === 'upcoming' && 'UPCOMING'}
            {webinar.status === 'completed' && 'REPLAY'}
          </div>

          {/* Platform Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-netflix-red text-white">
            {webinar.platform}
          </div>
        </div>

        {/* Card Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-white group-hover:text-netflix-red transition-colors duration-200 line-clamp-2">
            {webinar.title}
          </h3>
          
          <p className="text-sm text-netflix-light line-clamp-1">
            {webinar.speaker}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-netflix-light">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="w-3 h-3" />
              <span>{formatDate(webinar.date)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUsers} className="w-3 h-3" />
              <span>{webinar.attendees}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} className="w-3 h-3" />
              <span>{webinar.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default WebinarCard;