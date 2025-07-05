import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useVendor } from '../contexts/VendorContext';
import BecomeVendorModal from '../components/vendor/BecomeVendorModal';
import VendorDashboard from '../components/vendor/VendorDashboard';

const VendorOnboarding = () => {
  const [showBecomeVendor, setShowBecomeVendor] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isVendor, loading } = useVendor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-netflix-light">Loading vendor information...</p>
        </div>
      </div>
    );
  }

  if (isVendor) {
    return <VendorDashboard />;
  }

  return (
    <div className="min-h-screen bg-netflix-dark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Earning with
            <span className="netflix-gradient bg-clip-text text-transparent"> WebinarFlix</span>
          </h1>
          
          <p className="text-xl text-netflix-light mb-8 leading-relaxed">
            Share your expertise, build your audience, and earn money by creating courses and hosting webinars on our platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-netflix-black rounded-lg p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Earn 95%</h3>
              <p className="text-netflix-light">Keep 95% of your earnings with automatic payouts</p>
            </div>

            <div className="bg-netflix-black rounded-lg p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
              <p className="text-netflix-light">Access millions of learners worldwide</p>
            </div>

            <div className="bg-netflix-black rounded-lg p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-netflix-light">Track performance with detailed insights</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBecomeVendor(true)}
            className="bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Become a Vendor
          </motion.button>
        </motion.div>
      </div>

      <BecomeVendorModal
        isOpen={showBecomeVendor}
        onClose={() => setShowBecomeVendor(false)}
        onSuccess={() => {
          setShowBecomeVendor(false);
          window.location.reload(); // Refresh to show vendor dashboard
        }}
      />
    </div>
  );
};

export default VendorOnboarding;