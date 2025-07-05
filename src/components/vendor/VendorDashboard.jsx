import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import EarningsOverview from './EarningsOverview';
import PayoutSettings from './PayoutSettings';
import { useVendor } from '../../contexts/VendorContext';

const { FiDollarSign, FiSettings, FiBarChart3, FiUsers, FiBookOpen, FiVideo } = FiIcons;

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { vendorProfile, earnings } = useVendor();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'payouts', label: 'Payouts', icon: FiDollarSign },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const quickStats = [
    {
      label: 'Total Revenue',
      value: `$${earnings.totalEarnings.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Active Content',
      value: '12',
      icon: FiBookOpen,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Students',
      value: '1,234',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      label: 'Live Sessions',
      value: '8',
      icon: FiVideo,
      color: 'bg-netflix-red'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <EarningsOverview />;
      case 'payouts':
        return <PayoutSettings />;
      case 'settings':
        return <VendorSettings />;
      default:
        return <EarningsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Vendor Dashboard</h1>
              <p className="text-netflix-light">Welcome back, {vendorProfile?.businessName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                vendorProfile?.verified ? 'bg-green-500' : 'bg-yellow-500'
              } text-white`}>
                {vendorProfile?.verified ? 'Verified' : 'Pending Verification'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
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
    </div>
  );
};

const VendorSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Vendor Settings</h2>
        <p className="text-netflix-light">Manage your vendor profile and preferences</p>
      </div>

      <div className="bg-netflix-black rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-netflix-light text-sm mb-2">Business Name</label>
            <input
              type="text"
              className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              defaultValue="Tech Education Hub"
            />
          </div>
          <div>
            <label className="block text-netflix-light text-sm mb-2">Contact Email</label>
            <input
              type="email"
              className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              defaultValue="contact@techeducation.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-netflix-light text-sm mb-2">Business Description</label>
            <textarea
              className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-24"
              defaultValue="We provide high-quality technology education and training programs..."
            />
          </div>
        </div>
      </div>

      <div className="bg-netflix-black rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Revenue Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Platform Fee</h4>
              <p className="text-netflix-light text-sm">WebinarFlix platform commission</p>
            </div>
            <span className="text-netflix-red font-bold">5%</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Your Share</h4>
              <p className="text-netflix-light text-sm">Your earnings from each sale</p>
            </div>
            <span className="text-green-400 font-bold">95%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;