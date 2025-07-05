import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../contexts/AuthContext';
import questConfig from '../config/questConfig';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    const userData = {
      userId,
      token,
      newUser,
      loginTime: new Date().toISOString()
    };

    login(userData);
    toast.success('Login successful!');

    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark flex">
      {/* Left Section - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-netflix-red via-red-800 to-netflix-black"></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 netflix-gradient bg-clip-text text-transparent">
              WebinarFlix
            </h1>
            <h2 className="text-3xl font-semibold mb-4">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Your gateway to unlimited learning. Join thousands of learners and experts 
              in our interactive webinar platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-lg">Access premium courses</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-lg">Join live webinars</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-lg">Earn certificates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-lg">Connect with experts</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      </motion.div>

      {/* Right Section - Login Form */}
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
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-netflix-light">Enter your credentials to access your account</p>
            </div>

            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-netflix-light text-sm">
                Don't have an account? Sign up to get started
              </p>
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

export default LoginPage;