import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './contexts/AuthContext';
import { VendorProvider } from './contexts/VendorContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import questConfig from './config/questConfig';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import WebinarsPage from './pages/WebinarsPage';
import CoursesPage from './pages/CoursesPage';
import WebinarDetail from './pages/WebinarDetail';
import CoursePage from './pages/CoursePage';
import Dashboard from './pages/Dashboard';
import HostTools from './pages/HostTools';
import VideoRoomPage from './pages/VideoRoomPage';
import CertificateViewer from './components/certificates/CertificateViewer';
import CourseBuilder from './components/course/CourseBuilder';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import VendorOnboarding from './pages/VendorOnboarding';

// Legal Pages
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import ContactUs from './pages/legal/ContactUs';
import Sitemap from './pages/legal/Sitemap';

import './App.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <VendorProvider>
          <Router>
            <div className="min-h-screen bg-netflix-dark text-white flex flex-col">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                
                {/* Legal Pages (accessible without authentication) */}
                <Route path="/terms" element={
                  <>
                    <Navbar />
                    <TermsOfService />
                    <Footer />
                  </>
                } />
                <Route path="/privacy" element={
                  <>
                    <Navbar />
                    <PrivacyPolicy />
                    <Footer />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <Navbar />
                    <ContactUs />
                    <Footer />
                  </>
                } />
                <Route path="/sitemap" element={
                  <>
                    <Navbar />
                    <Sitemap />
                    <Footer />
                  </>
                } />
                
                {/* Protected Routes */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <Navbar />
                    <motion.main
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1"
                    >
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/webinars" element={<WebinarsPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/webinars/:id" element={<WebinarDetail />} />
                        <Route path="/courses/:id" element={<CoursePage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/host" element={<HostTools />} />
                        <Route path="/video-room/:id" element={<VideoRoomPage />} />
                        <Route path="/certificates" element={<CertificateViewer />} />
                        <Route path="/course-builder" element={<CourseBuilder />} />
                        <Route path="/analytics" element={<AnalyticsDashboard />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/vendor" element={<VendorOnboarding />} />
                      </Routes>
                    </motion.main>
                    <Footer />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </VendorProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;