import { loadStripe } from '@stripe/stripe-js';

// This would be your Stripe publishable key
const stripePromise = loadStripe('pk_test_51234567890abcdef...');

export default stripePromise;