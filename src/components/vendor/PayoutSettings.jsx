import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useVendor } from '../../contexts/VendorContext';
import toast from 'react-hot-toast';

const { FiCreditCard, FiBank, FiDollarSign, FiClock, FiSave, FiShield } = FiIcons;

const PayoutSettings = () => {
  const { payoutSettings, updatePayoutSettings, earnings } = useVendor();
  const [selectedMethod, setSelectedMethod] = useState(payoutSettings.method || 'bank_transfer');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      threshold: payoutSettings.threshold || 100,
      schedule: payoutSettings.schedule || 'monthly',
      method: payoutSettings.method || 'bank_transfer'
    }
  });

  const payoutMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Direct deposit to your bank account',
      icon: FiBank,
      processingTime: '1-3 business days',
      fees: 'Free',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Transfer to your PayPal account',
      icon: FiCreditCard,
      processingTime: 'Instant',
      fees: '2% + $0.30',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    {
      id: 'stripe',
      name: 'Stripe Express',
      description: 'Stripe Express payout account',
      icon: FiCreditCard,
      processingTime: '2-7 business days',
      fees: 'Free',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, USDC',
      icon: FiDollarSign,
      processingTime: '10-30 minutes',
      fees: 'Network fees apply',
      currencies: ['BTC', 'ETH', 'USDC']
    }
  ];

  const schedules = [
    { value: 'weekly', label: 'Weekly', description: 'Every Monday' },
    { value: 'biweekly', label: 'Bi-weekly', description: 'Every other Monday' },
    { value: 'monthly', label: 'Monthly', description: 'First Monday of each month' },
    { value: 'threshold', label: 'When threshold reached', description: 'Automatic when minimum reached' }
  ];

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const result = await updatePayoutSettings({
        ...data,
        method: selectedMethod
      });
      
      if (result.success) {
        toast.success('Payout settings updated successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to update payout settings:', error);
      toast.error('Failed to update settings. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const calculateNextPayout = () => {
    const schedule = watch('schedule');
    const threshold = watch('threshold');
    
    if (schedule === 'threshold') {
      if (earnings.pendingPayout >= threshold) {
        return 'Ready for payout';
      } else {
        return `$${(threshold - earnings.pendingPayout).toFixed(2)} needed`;
      }
    }
    
    // Calculate next scheduled payout
    const now = new Date();
    const nextPayout = new Date();
    
    switch (schedule) {
      case 'weekly':
        nextPayout.setDate(now.getDate() + (1 - now.getDay() + 7) % 7);
        break;
      case 'biweekly':
        nextPayout.setDate(now.getDate() + (1 - now.getDay() + 14) % 14);
        break;
      case 'monthly':
        nextPayout.setMonth(now.getMonth() + 1, 1);
        nextPayout.setDate(1 + (1 - nextPayout.getDay() + 7) % 7);
        break;
    }
    
    return nextPayout.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Payout Settings</h2>
        <p className="text-netflix-light">Configure how and when you receive your earnings</p>
      </div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-netflix-black rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Current Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${earnings.pendingPayout.toFixed(2)}
            </div>
            <p className="text-netflix-light">Pending Payout</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              ${watch('threshold') || 100}
            </div>
            <p className="text-netflix-light">Payout Threshold</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-netflix-red mb-2">
              {calculateNextPayout()}
            </div>
            <p className="text-netflix-light">Next Payout</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Payout Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Payout Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payoutMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-netflix-red bg-netflix-red bg-opacity-20'
                    : 'border-netflix-gray bg-netflix-gray hover:border-netflix-light'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-netflix-red rounded-lg">
                    <SafeIcon icon={method.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{method.name}</h4>
                    <p className="text-netflix-light text-sm mb-3">{method.description}</p>
                    <div className="space-y-1 text-xs text-netflix-light">
                      <div className="flex justify-between">
                        <span>Processing:</span>
                        <span>{method.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fees:</span>
                        <span>{method.fees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Method-specific forms */}
          {selectedMethod === 'bank_transfer' && (
            <div className="mt-6 p-4 bg-netflix-gray rounded-lg">
              <h4 className="text-white font-semibold mb-4">Bank Account Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Account Number</label>
                  <input
                    type="text"
                    className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Routing Number</label>
                  <input
                    type="text"
                    className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="123456789"
                  />
                </div>
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Bank Name</label>
                  <input
                    type="text"
                    className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="Chase Bank"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'paypal' && (
            <div className="mt-6 p-4 bg-netflix-gray rounded-lg">
              <h4 className="text-white font-semibold mb-4">PayPal Account</h4>
              <div>
                <label className="block text-netflix-light text-sm mb-2">PayPal Email</label>
                <input
                  type="email"
                  className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          )}

          {selectedMethod === 'crypto' && (
            <div className="mt-6 p-4 bg-netflix-gray rounded-lg">
              <h4 className="text-white font-semibold mb-4">Cryptocurrency Wallet</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Preferred Currency</label>
                  <select className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white">
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDC">USD Coin (USDC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Wallet Address</label>
                  <input
                    type="text"
                    className="w-full bg-netflix-black border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="Enter your wallet address"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Payout Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Payout Schedule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-netflix-light text-sm mb-2">Minimum Payout Threshold</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-light">$</span>
                <input
                  {...register('threshold', { 
                    required: 'Threshold is required',
                    min: { value: 10, message: 'Minimum threshold is $10' },
                    max: { value: 10000, message: 'Maximum threshold is $10,000' }
                  })}
                  type="number"
                  min="10"
                  max="10000"
                  className="w-full pl-8 pr-3 py-2 bg-netflix-gray border border-netflix-light rounded-lg text-white"
                />
              </div>
              {errors.threshold && (
                <p className="text-red-400 text-sm mt-1">{errors.threshold.message}</p>
              )}
              <p className="text-netflix-light text-xs mt-1">
                Automatic payout when your balance reaches this amount
              </p>
            </div>

            <div>
              <label className="block text-netflix-light text-sm mb-2">Payout Schedule</label>
              <select
                {...register('schedule')}
                className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              >
                {schedules.map((schedule) => (
                  <option key={schedule.value} value={schedule.value}>
                    {schedule.label} - {schedule.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Security & Compliance</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-netflix-light text-sm">
              <SafeIcon icon={FiShield} className="w-4 h-4 text-green-400" />
              <span>All payout information is encrypted and secure</span>
            </div>
            <div className="flex items-center space-x-2 text-netflix-light text-sm">
              <SafeIcon icon={FiShield} className="w-4 h-4 text-green-400" />
              <span>Tax forms will be generated automatically for earnings over $600</span>
            </div>
            <div className="flex items-center space-x-2 text-netflix-light text-sm">
              <SafeIcon icon={FiShield} className="w-4 h-4 text-green-400" />
              <span>Two-factor authentication required for payout changes</span>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isUpdating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SafeIcon icon={FiSave} className="w-5 h-5" />
            )}
            <span>{isUpdating ? 'Updating...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayoutSettings;