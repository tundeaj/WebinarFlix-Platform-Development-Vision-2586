import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiPlay, FiBook, FiAward, FiUsers, FiSettings, FiHelpCircle } = FiIcons;

const Sitemap = () => {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: FiHome,
      links: [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/certificates', label: 'Certificates' },
        { path: '/host', label: 'Host Tools' }
      ]
    },
    {
      title: 'Learning',
      icon: FiBook,
      links: [
        { path: '/courses', label: 'All Courses' },
        { path: '/webinars', label: 'All Webinars' },
        { path: '/course-builder', label: 'Course Builder' },
        { path: '/analytics', label: 'Analytics' }
      ]
    },
    {
      title: 'Account',
      icon: FiUsers,
      links: [
        { path: '/login', label: 'Login' },
        { path: '/onboarding', label: 'Onboarding' },
        { path: '/profile', label: 'Profile' },
        { path: '/settings', label: 'Settings' }
      ]
    },
    {
      title: 'Support',
      icon: FiHelpCircle,
      links: [
        { path: '/contact', label: 'Contact Us' },
        { path: '/help', label: 'Help Center' },
        { path: '/community', label: 'Community' },
        { path: '/status', label: 'System Status' }
      ]
    },
    {
      title: 'Legal',
      icon: FiSettings,
      links: [
        { path: '/terms', label: 'Terms of Service' },
        { path: '/privacy', label: 'Privacy Policy' },
        { path: '/cookies', label: 'Cookie Policy' },
        { path: '/dmca', label: 'DMCA' }
      ]
    },
    {
      title: 'Company',
      icon: FiAward,
      links: [
        { path: '/about', label: 'About Us' },
        { path: '/careers', label: 'Careers' },
        { path: '/press', label: 'Press' },
        { path: '/blog', label: 'Blog' },
        { path: '/investors', label: 'Investors' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Sitemap</h1>
          <p className="text-xl text-netflix-light">
            Find all the pages and resources available on WebinarFlix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-netflix-black rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-netflix-red rounded-lg">
                  <SafeIcon icon={section.icon} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-netflix-light hover:text-white transition-colors block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* XML Sitemap Link */}
        <div className="mt-12 text-center">
          <div className="bg-netflix-black rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">XML Sitemap</h2>
            <p className="text-netflix-light mb-4">
              For search engines and automated tools
            </p>
            <a
              href="/sitemap.xml"
              className="inline-flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Download XML Sitemap</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sitemap;