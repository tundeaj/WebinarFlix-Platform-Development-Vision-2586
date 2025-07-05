import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiCreditCard, FiDollarSign, FiGlobe, FiShield, FiCheck, FiX } = FiIcons;

const PaymentProviders = ({ amount, currency = 'USD', onSuccess, onCancel, metadata = {} }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const providers = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Secure payments worldwide',
      icon: FiCreditCard,
      fees: '2.9% + $0.30',
      color: 'bg-blue-500',
      supported: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      methods: ['Card', 'Apple Pay', 'Google Pay', 'Bank Transfer']
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'African payment gateway',
      icon: FiGlobe,
      fees: '1.5% + ₦100',
      color: 'bg-green-500',
      supported: ['NGN', 'GHS', 'ZAR', 'KES'],
      methods: ['Card', 'Bank Transfer', 'USSD', 'QR Code']
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Global payments for Africa',
      icon: FiDollarSign,
      fees: '1.4% + local fees',
      color: 'bg-yellow-500',
      supported: ['NGN', 'USD', 'EUR', 'GBP', 'KES', 'GHS'],
      methods: ['Card', 'Mobile Money', 'Bank Transfer', 'USSD']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Digital wallet payments',
      icon: FiShield,
      fees: '2.9% + fixed fee',
      color: 'bg-blue-600',
      supported: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      methods: ['PayPal Balance', 'Card', 'Bank Account']
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Indian payment solutions',
      icon: FiCreditCard,
      fees: '2% + GST',
      color: 'bg-indigo-500',
      supported: ['INR'],
      methods: ['Card', 'UPI', 'Net Banking', 'Wallets']
    },
    {
      id: 'square',
      name: 'Square',
      description: 'Simple payment processing',
      icon: FiDollarSign,
      fees: '2.6% + $0.10',
      color: 'bg-gray-600',
      supported: ['USD', 'CAD', 'AUD', 'GBP'],
      methods: ['Card', 'Digital Wallets', 'Cash App']
    }
  ];

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
    const provider = providers.find(p => p.id === providerId);
    
    if (provider && provider.supported.includes(currency)) {
      setShowCardForm(true);
    } else {
      toast.error(`${provider?.name} doesn't support ${currency}`);
    }
  };

  const processPayment = async () => {
    if (!selectedProvider) {
      toast.error('Please select a payment provider');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentResult = await processWithProvider(selectedProvider, {
        amount,
        currency,
        cardDetails,
        metadata
      });

      if (paymentResult.success) {
        toast.success('Payment successful!');
        onSuccess(paymentResult);
      } else {
        throw new Error(paymentResult.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processWithProvider = async (provider, paymentData) => {
    switch (provider) {
      case 'stripe':
        return await processStripePayment(paymentData);
      case 'paystack':
        return await processPaystackPayment(paymentData);
      case 'flutterwave':
        return await processFlutterwavePayment(paymentData);
      case 'paypal':
        return await processPayPalPayment(paymentData);
      case 'razorpay':
        return await processRazorpayPayment(paymentData);
      case 'square':
        return await processSquarePayment(paymentData);
      default:
        throw new Error('Unsupported payment provider');
    }
  };

  const processStripePayment = async (data) => {
    console.log('Processing Stripe payment:', data);
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      provider: 'stripe',
      amount: data.amount,
      currency: data.currency
    };
  };

  const processPaystackPayment = async (data) => {
    console.log('Processing Paystack payment:', data);
    return {
      success: true,
      transactionId: `paystack_${Date.now()}`,
      provider: 'paystack',
      amount: data.amount,
      currency: data.currency
    };
  };

  const processFlutterwavePayment = async (data) => {
    console.log('Processing Flutterwave payment:', data);
    return {
      success: true,
      transactionId: `flw_${Date.now()}`,
      provider: 'flutterwave',
      amount: data.amount,
      currency: data.currency
    };
  };

  const processPayPalPayment = async (data) => {
    console.log('Processing PayPal payment:', data);
    return {
      success: true,
      transactionId: `paypal_${Date.now()}`,
      provider: 'paypal',
      amount: data.amount,
      currency: data.currency
    };
  };

  const processRazorpayPayment = async (data) => {
    console.log('Processing Razorpay payment:', data);
    return {
      success: true,
      transactionId: `razorpay_${Date.now()}`,
      provider: 'razorpay',
      amount: data.amount,
      currency: data.currency
    };
  };

  const processSquarePayment = async (data) => {
    console.log('Processing Square payment:', data);
    return {
      success: true,
      transactionId: `square_${Date.now()}`,
      provider: 'square',
      amount: data.amount,
      currency: data.currency
    };
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Choose Payment Method</h3>
        <p className="text-netflix-light">Total: {formatAmount(amount, currency)}</p>
      </div>

      {!showCardForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProviderSelect(provider.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedProvider === provider.id
                  ? 'border-netflix-red bg-netflix-red bg-opacity-20'
                  : 'border-netflix-gray bg-netflix-gray hover:border-netflix-light'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${provider.color}`}>
                  <SafeIcon icon={provider.icon} className="w-5 h-5 text-white" />
                </div>
                {selectedProvider === provider.id && (
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-netflix-red" />
                )}
              </div>
              
              <h4 className="text-white font-semibold mb-1">{provider.name}</h4>
              <p className="text-netflix-light text-sm mb-3">{provider.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-netflix-light">Fees:</span>
                  <span className="text-green-400">{provider.fees}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-netflix-light">Supported:</span>
                  <span className={`${provider.supported.includes(currency) ? 'text-green-400' : 'text-red-400'}`}>
                    {currency}
                  </span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {provider.methods.slice(0, 2).map((method, index) => (
                    <span key={index} className="px-2 py-1 bg-netflix-black rounded text-xs text-netflix-light">
                      {method}
                    </span>
                  ))}
                  {provider.methods.length > 2 && (
                    <span className="px-2 py-1 bg-netflix-black rounded text-xs text-netflix-light">
                      +{provider.methods.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">
              Pay with {providers.find(p => p.id === selectedProvider)?.name}
            </h4>
            <button
              onClick={() => {
                setShowCardForm(false);
                setSelectedProvider('');
              }}
              className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-netflix-light text-sm mb-2">Cardholder Name</label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-netflix-light text-sm mb-2">Card Number</label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-netflix-light text-sm mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-netflix-light text-sm mb-2">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-netflix-light text-sm mt-4">
            <SafeIcon icon={FiShield} className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      )}

      {showCardForm && (
        <div className="flex space-x-4 pt-4">
          <button
            onClick={processPayment}
            disabled={isProcessing || !cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv}
            className="flex-1 flex items-center justify-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
            )}
            <span>
              {isProcessing ? 'Processing...' : `Pay ${formatAmount(amount, currency)}`}
            </span>
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-netflix-gray hover:bg-netflix-light text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentProviders;