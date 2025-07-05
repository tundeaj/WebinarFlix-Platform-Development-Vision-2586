import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import CreateWebinarModal from '../components/webinar/CreateWebinarModal';
import EnhancedPaymentModal from '../components/payment/EnhancedPaymentModal';
import { useVendor } from '../contexts/VendorContext';

const { FiPlus, FiVideo, FiBook, FiCalendar, FiUsers, FiSettings, FiBarChart3, FiDollarSign, FiEdit, FiPlay, FiEye } = FiIcons;

const HostTools = () => {
  const [activeTab, setActiveTab] = useState('webinars');
  const [showCreateWebinar, setShowCreateWebinar] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const { addEarning } = useVendor();

  const tabs = [
    { id: 'webinars', label: 'My Webinars', icon: FiVideo },
    { id: 'courses', label: 'My Courses', icon: FiBook },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3 },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const [myWebinars, setMyWebinars] = useState([
    {
      id: 1,
      title: "Introduction to React Hooks",
      date: "2024-01-20T15:00:00Z",
      attendees: 45,
      status: "upcoming",
      platform: "Native",
      revenue: "$450",
      price: 10
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      date: "2024-01-15T18:00:00Z",
      attendees: 128,
      status: "completed",
      platform: "Zoom",
      revenue: "$1,280",
      price: 15
    }
  ]);

  const myCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      students: 234,
      progress: 85,
      revenue: "$2,340",
      status: "published",
      price: 99,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "React Native Mobile Development",
      students: 156,
      progress: 60,
      revenue: "$1,560",
      status: "draft",
      price: 129,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    }
  ];

  const handleCreateWebinar = () => {
    setShowCreateWebinar(true);
  };

  const handleWebinarCreated = (webinarData) => {
    setMyWebinars(prev => [webinarData, ...prev]);
    // Simulate earning from webinar creation fee
    addEarning(50, 'Webinar Creation', { webinarId: webinarData.id, title: webinarData.title });
  };

  const createCourse = () => {
    navigate('/course-builder');
  };

  const joinVideoRoom = (webinarId) => {
    navigate(`/video-room/${webinarId}`);
  };

  const handleCoursePayment = (course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log('Payment successful:', paymentResult);
    // Simulate earning from course sale
    if (selectedCourse) {
      addEarning(selectedCourse.price, 'Course Sale', { 
        courseId: selectedCourse.id, 
        title: selectedCourse.title,
        transactionId: paymentResult.transactionId 
      });
    }
  };

  const renderWebinars = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Webinars</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateWebinar}
          className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Webinar</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myWebinars.map((webinar) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-netflix-black rounded-lg p-6 hover:bg-netflix-gray transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                webinar.status === 'upcoming' ? 'bg-blue-500' : 
                webinar.status === 'live' ? 'bg-red-500' : 'bg-green-500'
              } text-white`}>
                {webinar.status.toUpperCase()}
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-netflix-red text-white">
                {webinar.platform}
              </div>
            </div>

            <h3 className="text-white font-semibold mb-2">{webinar.title}</h3>
            <p className="text-netflix-light text-sm mb-4">
              {new Date(webinar.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            <div className="flex items-center justify-between text-sm text-netflix-light mb-4">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiUsers} className="w-4 h-4" />
                <span>{webinar.attendees} registered</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                <span>{webinar.revenue}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {webinar.status === 'upcoming' && (
                <button
                  onClick={() => joinVideoRoom(webinar.id)}
                  className="flex-1 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiPlay} className="w-4 h-4" />
                  <span>Start</span>
                </button>
              )}
              {webinar.status === 'live' && (
                <button
                  onClick={() => joinVideoRoom(webinar.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiVideo} className="w-4 h-4" />
                  <span>Join Live</span>
                </button>
              )}
              {webinar.status === 'completed' && (
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  <span>View</span>
                </button>
              )}
              <button className="flex-1 bg-netflix-gray hover:bg-netflix-light text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Courses</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createCourse}
          className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Course</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-netflix-black rounded-lg p-6 hover:bg-netflix-gray transition-colors"
          >
            <div className="flex items-start space-x-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  } text-white`}>
                    {course.status.toUpperCase()}
                  </div>
                  <span className="text-netflix-red font-bold">{course.revenue}</span>
                </div>
                
                <h3 className="text-white font-semibold mb-2">{course.title}</h3>
                
                <div className="space-y-2 text-sm text-netflix-light">
                  <div className="flex items-center justify-between">
                    <span>Students</span>
                    <span className="text-white">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Progress</span>
                    <span className="text-white">{course.progress}%</span>
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

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleCoursePayment(course)}
                className="flex-1 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Simulate Sale
              </button>
              <button
                onClick={createCourse}
                className="flex-1 bg-netflix-gray hover:bg-netflix-light text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
              >
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => <AnalyticsDashboard />;

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Host Settings</h2>
      
      <div className="bg-netflix-black rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-netflix-light text-sm mb-2">Display Name</label>
            <input
              type="text"
              className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              placeholder="Your display name"
            />
          </div>
          <div>
            <label className="block text-netflix-light text-sm mb-2">Bio</label>
            <textarea
              className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-24"
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
      </div>

      <div className="bg-netflix-black rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Platform Integrations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">Zoom Integration</span>
            <button className="px-4 py-2 bg-netflix-red rounded-lg text-white text-sm">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Microsoft Teams</span>
            <button className="px-4 py-2 bg-netflix-red rounded-lg text-white text-sm">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Google Meet</span>
            <button className="px-4 py-2 bg-netflix-red rounded-lg text-white text-sm">
              Connect
            </button>
          </div>
        </div>
      </div>

      <div className="bg-netflix-black rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Revenue Sharing</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">Platform Fee</span>
            <span className="text-netflix-red font-bold">5%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Your Earnings</span>
            <span className="text-green-400 font-bold">95%</span>
          </div>
          <div className="text-netflix-light text-sm">
            Automatic payouts when you reach $100 or monthly, whichever comes first.
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'webinars': return renderWebinars();
      case 'courses': return renderCourses();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderWebinars();
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Host Dashboard</h1>
          <p className="text-netflix-light">Manage your content and track earnings</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-netflix-black rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-netflix-red text-white'
                  : 'text-netflix-light hover:text-white'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Modals */}
      <CreateWebinarModal
        isOpen={showCreateWebinar}
        onClose={() => setShowCreateWebinar(false)}
        onSuccess={handleWebinarCreated}
      />

      {showPaymentModal && selectedCourse && (
        <EnhancedPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          item={selectedCourse}
          type="course"
        />
      )}
    </motion.div>
  );
};

export default HostTools;