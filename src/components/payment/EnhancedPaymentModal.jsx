import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import PaymentProviders from './PaymentProviders';
import toast from 'react-hot-toast';

const { FiX, FiShield, FiCheck } = FiIcons;

const EnhancedPaymentModal = ({ isOpen, onClose, onSuccess, item, type = 'course' }) => {
  const [step, setStep] = useState(1);
  const [paymentResult, setPaymentResult] = useState(null);

  if (!isOpen || !item) return null;

  const handlePaymentSuccess = (result) => {
    setPaymentResult(result);
    setStep(2);
    setTimeout(() => {
      onSuccess(result);
      onClose();
      setStep(1);
      setPaymentResult(null);
    }, 3000);
  };

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-netflix-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Item Details */}
            <div className="bg-netflix-gray rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-netflix-light text-sm mb-2">
                    {type === 'course' ? `by ${item.instructor}` : `by ${item.speaker}`}
                  </p>
                  {type === 'course' && (
                    <div className="flex items-center space-x-4 text-xs text-netflix-light">
                      <span>{item.duration}</span>
                      <span>{item.students} students</span>
                      <span>⭐ {item.rating}</span>
                    </div>
                  )}
                  {type === 'webinar' && (
                    <div className="flex items-center space-x-4 text-xs text-netflix-light">
                      <span>{item.duration}</span>
                      <span>{item.attendees} registered</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-netflix-red">
                    {formatPrice(item.price || 0)}
                  </div>
                  <div className="text-sm text-netflix-light">
                    {type === 'course' ? 'Lifetime access' : 'Event access'}
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">What's included:</h3>
              <div className="space-y-2">
                {type === 'course' ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Lifetime access to content</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Mobile and desktop access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Downloadable resources</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Live webinar access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Recording access for 30 days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Interactive Q&A session</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-400" />
                      <span className="text-netflix-light">Certificate of attendance</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <PaymentProviders
              amount={item.price || 0}
              currency="USD"
              onSuccess={handlePaymentSuccess}
              onCancel={onClose}
              metadata={{
                itemId: item.id,
                itemType: type,
                itemTitle: item.title
              }}
            />

            <div className="mt-6 p-4 bg-netflix-gray rounded-lg">
              <div className="flex items-center space-x-2 text-netflix-light text-sm">
                <SafeIcon icon={FiShield} className="w-4 h-4" />
                <span>30-day money-back guarantee. Secure checkout with SSL encryption.</span>
              </div>
            </div>
          </>
        )}

        {step === 2 && paymentResult && (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-netflix-light mb-4">
              Your purchase has been completed successfully.
            </p>
            
            <div className="bg-netflix-gray rounded-lg p-4 mb-6">
              <div className="text-sm text-netflix-light">Transaction ID</div>
              <div className="font-mono text-white">{paymentResult.transactionId}</div>
            </div>
            
            <div className="text-sm text-netflix-light">
              {type === 'course' 
                ? "You can now access your course from the dashboard."
                : "You'll receive an email with webinar access details."
              }
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EnhancedPaymentModal;