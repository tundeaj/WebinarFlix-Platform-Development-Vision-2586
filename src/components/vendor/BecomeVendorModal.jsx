import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useVendor } from '../../contexts/VendorContext';
import toast from 'react-hot-toast';

const { FiX, FiDollarSign, FiUsers, FiTrendingUp, FiCheck } = FiIcons;

const BecomeVendorModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { becomeVendor } = useVendor();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Earn Revenue',
      description: 'Keep 95% of your earnings with automatic payouts'
    },
    {
      icon: FiUsers,
      title: 'Global Audience',
      description: 'Reach millions of learners worldwide'
    },
    {
      icon: FiTrendingUp,
      title: 'Analytics & Insights',
      description: 'Track your performance with detailed analytics'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await becomeVendor(data);
      if (result.success) {
        toast.success('Vendor application submitted successfully!');
        setStep(3);
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to submit vendor application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-netflix-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Become a Vendor</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-netflix-red' : 'bg-netflix-gray'} text-white font-semibold mr-4`}>
            {step > 1 ? <SafeIcon icon={FiCheck} className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-0.5 ${step > 1 ? 'bg-netflix-red' : 'bg-netflix-gray'} mr-4`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-netflix-red' : 'bg-netflix-gray'} text-white font-semibold mr-4`}>
            {step > 2 ? <SafeIcon icon={FiCheck} className="w-4 h-4" /> : '2'}
          </div>
          <div className={`flex-1 h-0.5 ${step > 2 ? 'bg-netflix-red' : 'bg-netflix-gray'} mr-4`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-netflix-red' : 'bg-netflix-gray'} text-white font-semibold`}>
            3
          </div>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Why Become a Vendor?</h3>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-netflix-gray rounded-lg"
                >
                  <div className="p-3 bg-netflix-red rounded-lg">
                    <SafeIcon icon={benefit.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-netflix-light">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-netflix-gray rounded-lg p-6 mb-6">
              <h4 className="text-white font-semibold mb-4">Revenue Sharing</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-netflix-light">Your Earnings</span>
                  <span className="text-green-400 font-bold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-netflix-light">Platform Fee</span>
                  <span className="text-netflix-light">5%</span>
                </div>
                <div className="border-t border-netflix-light pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Example: $100 Sale</span>
                    <span className="text-green-400 font-bold">You Keep $95</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-netflix-red hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Vendor Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-netflix-light text-sm mb-2">Business Name</label>
                <input
                  {...register('businessName', { required: 'Business name is required' })}
                  type="text"
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="Your business or personal brand name"
                />
                {errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Business Type</label>
                <select
                  {...register('businessType', { required: 'Business type is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select type</option>
                  <option value="individual">Individual/Freelancer</option>
                  <option value="company">Company</option>
                  <option value="educational">Educational Institution</option>
                  <option value="nonprofit">Non-Profit</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Country</label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="NG">Nigeria</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
                {errors.country && (
                  <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Phone Number</label>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-netflix-light text-sm mb-2">Business Address</label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-20"
                  placeholder="Full business address"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-netflix-light text-sm mb-2">Areas of Expertise</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Technology', 'Business', 'Design', 'Marketing', 'Education', 'Health', 'Finance', 'Arts', 'Science'].map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register('expertise')}
                        value={area}
                        className="rounded bg-netflix-gray border-netflix-light"
                      />
                      <span className="text-white text-sm">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-netflix-light text-sm mb-2">Bio/Description</label>
                <textarea
                  {...register('bio', { required: 'Bio is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-24"
                  placeholder="Tell us about yourself and your expertise..."
                />
                {errors.bio && (
                  <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-netflix-gray hover:bg-netflix-light text-white rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <SafeIcon icon={FiCheck} className="w-5 h-5" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
            <p className="text-netflix-light mb-6">
              Thank you for your interest in becoming a vendor. We'll review your application and get back to you within 2-3 business days.
            </p>
            
            <div className="bg-netflix-gray rounded-lg p-4">
              <p className="text-white font-medium mb-2">What's Next?</p>
              <ul className="text-netflix-light text-sm space-y-1">
                <li>• We'll verify your information</li>
                <li>• Set up your payout method</li>
                <li>• Start creating and selling content</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BecomeVendorModal;