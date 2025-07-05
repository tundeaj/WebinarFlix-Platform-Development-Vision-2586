import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiTwitter, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiYoutube, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiGlobe,
  FiHeart
} = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
      { label: 'Investors', path: '/investors' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'System Status', path: '/status' },
      { label: 'Community', path: '/community' },
      { label: 'Accessibility', path: '/accessibility' }
    ],
    legal: [
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'DMCA', path: '/dmca' },
      { label: 'Sitemap', path: '/sitemap' }
    ],
    features: [
      { label: 'Live Webinars', path: '/webinars' },
      { label: 'Courses', path: '/courses' },
      { label: 'Certificates', path: '/certificates' },
      { label: 'Host Tools', path: '/host' },
      { label: 'Mobile App', path: '/mobile' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: FiTwitter, 
      url: 'https://twitter.com/webinarflix',
      color: '#1DA1F2' 
    },
    { 
      name: 'Facebook', 
      icon: FiFacebook, 
      url: 'https://facebook.com/webinarflix',
      color: '#1877F2' 
    },
    { 
      name: 'Instagram', 
      icon: FiInstagram, 
      url: 'https://instagram.com/webinarflix',
      color: '#E4405F' 
    },
    { 
      name: 'LinkedIn', 
      icon: FiLinkedin, 
      url: 'https://linkedin.com/company/webinarflix',
      color: '#0A66C2' 
    },
    { 
      name: 'YouTube', 
      icon: FiYoutube, 
      url: 'https://youtube.com/webinarflix',
      color: '#FF0000' 
    }
  ];

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'hello@webinarflix.com',
      link: 'mailto:hello@webinarflix.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      label: 'Address',
      value: 'San Francisco, CA',
      link: null
    }
  ];

  return (
    <footer className="bg-netflix-black border-t border-netflix-gray mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="inline-block mb-4">
                  <h2 className="text-2xl font-bold netflix-gradient bg-clip-text text-transparent">
                    WebinarFlix
                  </h2>
                </Link>
                <p className="text-netflix-light mb-6 leading-relaxed">
                  Your gateway to unlimited learning. Join thousands of learners 
                  and experts in our interactive webinar platform.
                </p>
                
                {/* Contact Information */}
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={contact.icon} className="w-4 h-4 text-netflix-red" />
                      {contact.link ? (
                        <a 
                          href={contact.link}
                          className="text-netflix-light hover:text-white transition-colors"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-netflix-light">{contact.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-netflix-light hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-netflix-light hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-netflix-light hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Features Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {footerLinks.features.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-netflix-light hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-netflix-gray py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <span className="text-netflix-light font-medium">Follow us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors group"
                    style={{ '--hover-color': social.color }}
                  >
                    <SafeIcon 
                      icon={social.icon} 
                      className="w-5 h-5 text-netflix-light group-hover:text-white transition-colors" 
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <span className="text-netflix-light font-medium">Stay updated:</span>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-netflix-gray border border-netflix-light rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-netflix-red hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-netflix-gray py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-netflix-light">
              <span>© {currentYear} WebinarFlix. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link to="/sitemap" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-netflix-light">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                <select className="bg-transparent border-none text-netflix-light hover:text-white focus:outline-none cursor-pointer">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <SafeIcon icon={FiHeart} className="w-4 h-4 text-netflix-red" />
                <span>in San Francisco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;