import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { mockWebinars } from '../data/mockData';

const { FiSearch, FiFilter, FiCalendar, FiUsers, FiClock, FiPlay } = FiIcons;

const WebinarsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Development', 'Design', 'Business', 'Marketing', 'AI/ML', 'Security', 'Cloud'];
  const statuses = ['all', 'live', 'upcoming', 'completed'];

  const filteredWebinars = mockWebinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || webinar.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">All Webinars</h1>
          <p className="text-netflix-light">Discover and join live webinars from industry experts</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-light w-5 h-5" />
            <input
              type="text"
              placeholder="Search webinars..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-netflix-black border border-netflix-gray rounded-lg text-white focus:outline-none focus:border-netflix-red"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/webinars/${webinar.id}`}>
                <div className="bg-netflix-black rounded-lg overflow-hidden hover:bg-netflix-gray transition-colors group">
                  <div className="relative">
                    <img
                      src={webinar.thumbnail}
                      alt={webinar.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(webinar.status)} text-white`}>
                        {webinar.status.toUpperCase()}
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-netflix-red text-white">
                        {webinar.platform}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <SafeIcon icon={FiPlay} className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-netflix-red transition-colors">
                      {webinar.title}
                    </h3>
                    <p className="text-netflix-light text-sm mb-3">{webinar.speaker}</p>
                    
                    <div className="flex items-center justify-between text-xs text-netflix-light">
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No webinars found</h3>
            <p className="text-netflix-light">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WebinarsPage;