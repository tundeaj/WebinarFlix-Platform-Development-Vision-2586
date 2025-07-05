import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/sections/HeroBanner';
import ContentRow from '../components/sections/ContentRow';
import FeatureHighlights from '../components/sections/FeatureHighlights';
import { mockWebinars, mockCourses } from '../data/mockData';

const HomePage = () => {
  // Filter data for different sections
  const liveWebinars = mockWebinars.filter(w => w.status === 'live');
  const upcomingWebinars = mockWebinars.filter(w => w.status === 'upcoming');
  const completedWebinars = mockWebinars.filter(w => w.status === 'completed');
  const trendingCourses = mockCourses.slice(0, 4);
  const freeCourses = mockCourses.filter(c => c.price === 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark"
    >
      {/* Hero Section */}
      <HeroBanner />

      {/* Content Sections */}
      <div className="space-y-8 pb-12">
        {/* Live Now */}
        {liveWebinars.length > 0 && (
          <ContentRow title="🔴 Live Now" items={liveWebinars} type="webinar" />
        )}

        {/* Trending This Week */}
        <ContentRow title="📈 Trending This Week" items={trendingCourses} type="course" />

        {/* Upcoming Webinars */}
        <ContentRow title="⏰ Upcoming Webinars" items={upcomingWebinars} type="webinar" />

        {/* Free Courses */}
        <ContentRow title="🎁 Free Courses" items={freeCourses} type="course" />

        {/* Recently Completed */}
        <ContentRow title="🎬 Recently Completed" items={completedWebinars} type="webinar" />
      </div>

      {/* Feature Highlights Section */}
      <FeatureHighlights />

      {/* Recommended for You */}
      <div className="pb-12">
        <ContentRow title="🤖 Recommended for You" items={mockCourses} type="course" />
      </div>
    </motion.div>
  );
};

export default HomePage;