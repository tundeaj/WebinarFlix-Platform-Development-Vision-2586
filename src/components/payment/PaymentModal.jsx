import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import paymentService from '../../services/paymentService'
import toast from 'react-hot-toast'
import stripePromise from '../../lib/stripe'

const { FiX, FiCreditCard, FiLock, FiCheck } = FiIcons

const PaymentForm = ({ course, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
      // For demo purposes, we'll use mock payment
      const paymentResult = await paymentService.mockPayment(course.price, course.id)
      
      if (paymentResult.status === 'succeeded') {
        toast.success('Payment successful!')
        onSuccess(paymentResult)
      } else {
        throw new Error('Payment failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError(error.message)
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-netflix-light text-sm mb-2">
          Card Information
        </label>
        <div className="p-3 bg-netflix-gray border border-netflix-light rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#b3b3b3',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
      </div>

      {paymentError && (
        <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{paymentError}</p>
        </div>
      )}

      <div className="flex items-center space-x-2 text-netflix-light text-sm">
        <SafeIcon icon={FiLock} className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 flex items-center justify-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
          )}
          <span>
            {isProcessing ? 'Processing...' : `Pay $${course.price}`}
          </span>
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-netflix-gray hover:bg-netflix-light text-white rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const PaymentModal = ({ course, isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null

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
        className="bg-netflix-black rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Course Info */}
        <div className="mb-6 p-4 bg-netflix-gray rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{course.title}</h3>
              <p className="text-netflix-light text-sm">{course.instructor}</p>
              <p className="text-netflix-red font-bold text-lg">${course.price}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm
            course={course}
            onSuccess={(paymentResult) => {
              onSuccess(paymentResult)
              onClose()
            }}
            onCancel={onClose}
          />
        </Elements>
      </motion.div>
    </motion.div>
  )
}

export default PaymentModal