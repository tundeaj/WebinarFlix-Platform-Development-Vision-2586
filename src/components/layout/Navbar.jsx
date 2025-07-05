import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useVendor } from '../../contexts/VendorContext';
import toast from 'react-hot-toast';

const { FiSearch, FiUser, FiBell, FiMenu, FiX, FiAward, FiLogOut, FiSettings, FiDollarSign } = FiIcons;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isVendor, earnings } = useVendor();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/webinars', label: 'Webinars' },
    { path: '/courses', label: 'Courses' },
    { path: '/dashboard', label: 'My Learning' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/host', label: 'Host' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-netflix-dark to-transparent backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold netflix-gradient bg-clip-text text-transparent"
            >
              WebinarFlix
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-netflix-red border-b-2 border-netflix-red'
                    : 'text-netflix-light hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, webinars..."
                    className="w-64 bg-netflix-black border border-netflix-gray rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-netflix-red"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="ml-2 p-2 rounded-full hover:bg-netflix-gray transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full hover:bg-netflix-gray transition-colors"
                >
                  <SafeIcon icon={FiSearch} className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Vendor Earnings (if vendor) */}
            {isVendor && (
              <Link to="/vendor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                  <span>${earnings.pendingPayout.toFixed(0)}</span>
                </motion.div>
              </Link>
            )}

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-netflix-gray transition-colors relative"
            >
              <SafeIcon icon={FiBell} className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-netflix-red rounded-full"></span>
            </motion.button>

            {/* Certificates */}
            <Link to="/certificates">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-netflix-gray transition-colors"
              >
                <SafeIcon icon={FiAward} className="w-5 h-5" />
              </motion.button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-netflix-gray transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </motion.button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-netflix-black rounded-lg shadow-xl border border-netflix-gray py-2"
                >
                  <div className="px-4 py-3 border-b border-netflix-gray">
                    <p className="text-white font-medium">Welcome back!</p>
                    <p className="text-netflix-light text-sm">
                      {user?.userId?.slice(0, 8)}...
                    </p>
                    {isVendor && (
                      <div className="mt-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                          Vendor
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-netflix-light hover:text-white hover:bg-netflix-gray transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  {isVendor ? (
                    <Link
                      to="/vendor"
                      className="flex items-center space-x-3 px-4 py-2 text-netflix-light hover:text-white hover:bg-netflix-gray transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                      <span>Vendor Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      to="/vendor"
                      className="flex items-center space-x-3 px-4 py-2 text-netflix-light hover:text-white hover:bg-netflix-gray transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                      <span>Become a Vendor</span>
                    </Link>
                  )}
                  
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-netflix-light hover:text-white hover:bg-netflix-gray transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <SafeIcon icon={FiSettings} className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  
                  <div className="border-t border-netflix-gray my-2"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-netflix-light hover:text-white hover:bg-netflix-gray transition-colors"
                  >
                    <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-netflix-gray transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-netflix-black border-t border-netflix-gray"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-netflix-red bg-netflix-gray'
                      : 'text-netflix-light hover:text-white hover:bg-netflix-gray'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-netflix-gray pt-2 mt-2">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-netflix-light hover:text-white hover:bg-netflix-gray rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/vendor"
                  className="block px-3 py-2 text-base font-medium text-netflix-light hover:text-white hover:bg-netflix-gray rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isVendor ? 'Vendor Dashboard' : 'Become a Vendor'}
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-netflix-light hover:text-white hover:bg-netflix-gray rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-netflix-light hover:text-white hover:bg-netflix-gray rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;