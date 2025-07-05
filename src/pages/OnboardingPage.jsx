import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../contexts/AuthContext';
import questConfig from '../config/questConfig';
import toast from 'react-hot-toast';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isAuthenticated, navigate]);

  const getAnswers = () => {
    console.log('Onboarding completed with answers:', answers);
    toast.success('Welcome to WebinarFlix! 🎉');
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-netflix-light">Setting up your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark flex">
      {/* Left Section - Visual/Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-netflix-red"></div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 netflix-gradient bg-clip-text text-transparent">
              WebinarFlix
            </h1>
            <h2 className="text-4xl font-semibold mb-6">
              Let's Get Started!
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              We're setting up your personalized learning experience. 
              This will only take a few moments.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Personalized Content</h3>
                  <p className="text-gray-300">Get recommendations based on your interests</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Fast Track Learning</h3>
                  <p className="text-gray-300">Skip the basics if you're already experienced</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Career Growth</h3>
                  <p className="text-gray-300">Build skills that advance your career</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white bg-opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-8 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-lg"></div>
      </motion.div>

      {/* Right Section - Onboarding Component */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center px-8 py-12"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-netflix-black rounded-2xl p-8 shadow-2xl border border-netflix-gray"
            style={{ minHeight: '400px' }}
          >
            <div className="quest-onboarding-container">
              <OnBoarding
                userId={user?.userId || localStorage.getItem('userId')}
                token={user?.token || localStorage.getItem('token')}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Logo */}
      <div className="lg:hidden absolute top-8 left-8 z-10">
        <h1 className="text-2xl font-bold netflix-gradient bg-clip-text text-transparent">
          WebinarFlix
        </h1>
      </div>
    </div>
  );
};

export default OnboardingPage;