import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiPlay, FiVideo, FiAward, FiBarChart3, FiUsers, FiZap, FiShield, FiGlobe, FiChevronDown, FiChevronUp } = FiIcons

const FeatureHighlights = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 0,
      icon: FiPlay,
      title: 'Live Interactive Webinars',
      subtitle: 'Real-time engagement with industry experts',
      description: 'Host and join live webinars with HD video, interactive chat, screen sharing, and Q&A sessions. Connect with thousands of participants worldwide in real-time.',
      benefits: [
        'HD video streaming up to 4K quality',
        'Interactive chat and polls',
        'Screen sharing and presentation tools',
        'Breakout rooms for group discussions',
        'Recording and replay capabilities'
      ],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 1,
      icon: FiVideo,
      title: 'Multi-Platform Integration',
      subtitle: 'Seamless connectivity across all platforms',
      description: 'Integrate with Zoom, Microsoft Teams, Google Meet, and other popular platforms. Host from anywhere, join from any device.',
      benefits: [
        'Zoom, Teams, Meet integration',
        'Cross-platform compatibility',
        'Mobile and desktop apps',
        'Browser-based access',
        'API for custom integrations'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 2,
      icon: FiAward,
      title: 'Digital Certificates',
      subtitle: 'Blockchain-verified credentials',
      description: 'Issue and verify digital certificates with blockchain technology. Build credibility and track learning achievements with tamper-proof credentials.',
      benefits: [
        'Blockchain verification',
        'Custom certificate templates',
        'Automated issuance',
        'QR code verification',
        'Integration with LinkedIn'
      ],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 3,
      icon: FiBarChart3,
      title: 'Advanced Analytics',
      subtitle: 'Data-driven insights and reporting',
      description: 'Comprehensive analytics dashboard with real-time metrics, engagement tracking, and detailed reporting for hosts and participants.',
      benefits: [
        'Real-time engagement metrics',
        'Attendance tracking',
        'Revenue analytics',
        'User behavior insights',
        'Custom report generation'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 4,
      icon: FiUsers,
      title: 'Community Building',
      subtitle: 'Connect learners and experts globally',
      description: 'Build thriving learning communities with discussion forums, networking events, and collaborative learning spaces.',
      benefits: [
        'Discussion forums',
        'Networking events',
        'Mentorship programs',
        'Study groups',
        'Knowledge sharing'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 5,
      icon: FiShield,
      title: 'Enterprise Security',
      subtitle: 'Bank-grade security and compliance',
      description: 'Enterprise-grade security with end-to-end encryption, SSO integration, and compliance with GDPR, HIPAA, and SOC 2.',
      benefits: [
        'End-to-end encryption',
        'SSO integration',
        'GDPR & HIPAA compliance',
        'Role-based access control',
        '24/7 security monitoring'
      ],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500/10'
    }
  ]

  const toggleFeature = (id) => {
    setActiveFeature(activeFeature === id ? null : id)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-netflix-dark to-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-netflix-red/20 border border-netflix-red/30 mb-6"
          >
            <SafeIcon icon={FiZap} className="w-5 h-5 text-netflix-red" />
            <span className="text-netflix-red font-medium">Platform Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Everything You Need to
            <span className="netflix-gradient bg-clip-text text-transparent"> Learn & Teach</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-netflix-light max-w-3xl mx-auto"
          >
            Discover the powerful features that make WebinarFlix the ultimate platform for knowledge sharing and professional development.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-netflix-black border border-netflix-gray hover:border-netflix-light transition-all duration-300 ${
                activeFeature === feature.id ? 'ring-2 ring-netflix-red' : ''
              }`}
            >
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                    <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-netflix-light">{feature.subtitle}</p>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
                  >
                    <SafeIcon 
                      icon={activeFeature === feature.id ? FiChevronUp : FiChevronDown} 
                      className="w-5 h-5 text-white" 
                    />
                  </button>
                </div>
                
                <p className="text-netflix-light mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <AnimatePresence>
                  {activeFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 rounded-xl ${feature.bgColor} border border-current/20`}>
                        <h4 className="text-white font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-netflix-light">
                              <div className="w-1.5 h-1.5 bg-netflix-red rounded-full" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <SafeIcon icon={FiPlay} className="w-5 h-5" />
              <span>Start Free Trial</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-transparent border border-netflix-light hover:bg-netflix-gray text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <SafeIcon icon={FiGlobe} className="w-5 h-5" />
              <span>View Demo</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureHighlights