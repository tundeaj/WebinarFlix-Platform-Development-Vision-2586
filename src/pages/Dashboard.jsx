import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { mockWebinars, mockCourses } from '../data/mockData';

const { FiBook, FiPlay, FiAward, FiTrendingUp, FiClock, FiUsers } = FiIcons;

const Dashboard = () => {
  // Filter user's content
  const registeredWebinars = mockWebinars.slice(0, 3);
  const enrolledCourses = mockCourses.slice(0, 3);
  const completedCourses = mockCourses.filter(c => c.progress === 100);

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: FiBook, color: 'bg-blue-500' },
    { label: 'Webinars Attended', value: '28', icon: FiPlay, color: 'bg-green-500' },
    { label: 'Certificates Earned', value: '8', icon: FiAward, color: 'bg-yellow-500' },
    { label: 'Hours Learned', value: '156', icon: FiClock, color: 'bg-purple-500' }
  ];

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
          <h1 className="text-3xl font-bold text-white mb-2">My Learning Dashboard</h1>
          <p className="text-netflix-light">Track your progress and continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-netflix-black rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netflix-light text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-netflix-black rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg bg-netflix-gray hover:bg-netflix-light transition-colors cursor-pointer">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{course.title}</h3>
                    <p className="text-sm text-netflix-light">{course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-netflix-light">Progress</span>
                        <span className="text-xs text-netflix-light">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Webinars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-netflix-black rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Webinars</h2>
            <div className="space-y-4">
              {registeredWebinars.map((webinar) => (
                <div key={webinar.id} className="flex items-center space-x-4 p-4 rounded-lg bg-netflix-gray hover:bg-netflix-light transition-colors cursor-pointer">
                  <img
                    src={webinar.thumbnail}
                    alt={webinar.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{webinar.title}</h3>
                    <p className="text-sm text-netflix-light">{webinar.speaker}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-netflix-light">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>{webinar.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUsers} className="w-3 h-3" />
                        <span>{webinar.attendees}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    webinar.status === 'live' ? 'bg-red-500' : 'bg-blue-500'
                  } text-white`}>
                    {webinar.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-netflix-black rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-netflix-gray">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiAward} className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Completed React Fundamentals</p>
                <p className="text-netflix-light text-sm">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-netflix-gray">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiPlay} className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Attended AI in Development webinar</p>
                <p className="text-netflix-light text-sm">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-netflix-gray">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiBook} className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Started Python for Data Science</p>
                <p className="text-netflix-light text-sm">3 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;