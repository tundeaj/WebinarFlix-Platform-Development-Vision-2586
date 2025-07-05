import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { mockWebinars } from '../data/mockData';

const { FiPlay, FiUsers, FiClock, FiCalendar, FiShare2, FiBookmark } = FiIcons;

const WebinarDetail = () => {
  const { id } = useParams();
  const webinar = mockWebinars.find(w => w.id === parseInt(id));

  if (!webinar) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Webinar not found</h2>
          <p className="text-netflix-light">The webinar you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-16"
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={webinar.thumbnail}
          alt={webinar.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(webinar.status)} text-white`}>
                {webinar.status.toUpperCase()}
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-netflix-red text-white">
                {webinar.platform}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {webinar.title}
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
                <span>
                  {webinar.status === 'live' ? 'Join Live' : 
                   webinar.status === 'upcoming' ? 'Register' : 'Watch Replay'}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiBookmark} className="w-5 h-5" />
                <span>Save</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiShare2} className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About this webinar</h2>
              <p className="text-netflix-light leading-relaxed">
                Join us for an in-depth exploration of the latest technologies and best practices in the industry. 
                This comprehensive session will cover practical applications, real-world examples, and actionable 
                insights that you can immediately implement in your projects. Whether you're a beginner or an 
                experienced professional, this webinar will provide valuable knowledge and networking opportunities.
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What you'll learn</h2>
              <ul className="space-y-3 text-netflix-light">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 flex-shrink-0" />
                  <span>Core concepts and fundamental principles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 flex-shrink-0" />
                  <span>Advanced techniques and best practices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 flex-shrink-0" />
                  <span>Real-world case studies and examples</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 flex-shrink-0" />
                  <span>Q&A session with industry experts</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-netflix-black rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Date & Time</p>
                    <p className="text-netflix-light text-sm">{formatDate(webinar.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiClock} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Duration</p>
                    <p className="text-netflix-light text-sm">{webinar.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-netflix-red" />
                  <div>
                    <p className="text-white font-medium">Attendees</p>
                    <p className="text-netflix-light text-sm">{webinar.attendees} registered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker Info */}
            <div className="bg-netflix-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Speaker</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face`}
                  alt={webinar.speaker}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-white font-medium">{webinar.speaker}</h4>
                  <p className="text-netflix-light text-sm">Senior Developer</p>
                </div>
              </div>
              
              <p className="text-netflix-light text-sm">
                Experienced technology leader with over 10 years in software development 
                and a passion for sharing knowledge with the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WebinarDetail;