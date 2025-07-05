import { loadStripe } from '@stripe/stripe-js'

class PaymentService {
  constructor() {
    this.stripe = null
    this.init()
  }

  async init() {
    this.stripe = await loadStripe('pk_test_51234567890abcdef...')
  }

  async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      // In a real implementation, this would call your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency,
          metadata
        }),
      })

      const { client_secret } = await response.json()
      return client_secret
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }

  async processPayment(clientSecret, paymentMethod) {
    try {
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod
        }
      )

      if (error) {
        throw error
      }

      return paymentIntent
    } catch (error) {
      console.error('Payment failed:', error)
      throw error
    }
  }

  async createSubscription(customerId, priceId) {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          priceId
        }),
      })

      const subscription = await response.json()
      return subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw error
    }
  }

  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw error
    }
  }

  // Mock payment for demo purposes
  async mockPayment(amount, courseId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'pi_mock_' + Date.now(),
          status: 'succeeded',
          amount: amount * 100,
          currency: 'usd',
          metadata: { courseId }
        })
      }, 2000)
    })
  }
}

export default new PaymentService()