class PayoutService {
  constructor() {
    this.processingFee = 0.05; // 5% platform fee
    this.minimumPayout = 10;
    this.maximumPayout = 10000;
  }

  // Calculate vendor earnings after platform fee
  calculateVendorEarnings(grossAmount) {
    const platformFee = grossAmount * this.processingFee;
    const vendorEarnings = grossAmount - platformFee;
    
    return {
      grossAmount,
      platformFee,
      vendorEarnings,
      feePercentage: this.processingFee * 100
    };
  }

  // Check if payout should be triggered automatically
  shouldTriggerAutomaticPayout(pendingAmount, settings) {
    const { threshold, schedule } = settings;
    
    // Check threshold-based payout
    if (schedule === 'threshold' && pendingAmount >= threshold) {
      return { shouldPayout: true, reason: 'threshold_reached' };
    }
    
    // Check scheduled payout
    if (this.isScheduledPayoutDue(schedule) && pendingAmount >= this.minimumPayout) {
      return { shouldPayout: true, reason: 'scheduled_payout' };
    }
    
    return { shouldPayout: false, reason: null };
  }

  // Check if scheduled payout is due
  isScheduledPayoutDue(schedule) {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayOfMonth = now.getDate();
    
    switch (schedule) {
      case 'weekly':
        return dayOfWeek === 1; // Monday
      case 'biweekly':
        const weekOfYear = this.getWeekOfYear(now);
        return dayOfWeek === 1 && weekOfYear % 2 === 0;
      case 'monthly':
        return dayOfMonth === 1 || (dayOfMonth <= 7 && dayOfWeek === 1);
      default:
        return false;
    }
  }

  // Get week number of the year
  getWeekOfYear(date) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDay) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
  }

  // Process payout based on method
  async processPayout(amount, method, accountDetails, vendorId) {
    try {
      const payoutId = `payout_${Date.now()}_${vendorId}`;
      
      // Validate payout amount
      if (amount < this.minimumPayout) {
        throw new Error(`Minimum payout amount is $${this.minimumPayout}`);
      }
      
      if (amount > this.maximumPayout) {
        throw new Error(`Maximum payout amount is $${this.maximumPayout}`);
      }
      
      // Process based on method
      let result;
      switch (method) {
        case 'bank_transfer':
          result = await this.processBankTransfer(amount, accountDetails, payoutId);
          break;
        case 'paypal':
          result = await this.processPayPalPayout(amount, accountDetails, payoutId);
          break;
        case 'stripe':
          result = await this.processStripePayout(amount, accountDetails, payoutId);
          break;
        case 'crypto':
          result = await this.processCryptoPayout(amount, accountDetails, payoutId);
          break;
        default:
          throw new Error('Unsupported payout method');
      }
      
      // Log payout transaction
      await this.logPayoutTransaction({
        id: payoutId,
        vendorId,
        amount,
        method,
        status: result.status,
        estimatedArrival: result.estimatedArrival,
        transactionId: result.transactionId,
        createdAt: new Date().toISOString()
      });
      
      return {
        success: true,
        payoutId,
        ...result
      };
      
    } catch (error) {
      console.error('Payout processing error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Bank transfer processing
  async processBankTransfer(amount, accountDetails, payoutId) {
    // Simulate bank transfer API call
    console.log('Processing bank transfer:', { amount, accountDetails, payoutId });
    
    // In production, integrate with banking APIs like Plaid, Stripe Connect, etc.
    const estimatedArrival = new Date();
    estimatedArrival.setDate(estimatedArrival.getDate() + 3); // 3 business days
    
    return {
      status: 'processing',
      transactionId: `bank_${payoutId}`,
      estimatedArrival: estimatedArrival.toISOString(),
      fees: 0,
      method: 'bank_transfer'
    };
  }

  // PayPal payout processing
  async processPayPalPayout(amount, accountDetails, payoutId) {
    console.log('Processing PayPal payout:', { amount, accountDetails, payoutId });
    
    // In production, use PayPal Payouts API
    const fees = amount * 0.02 + 0.30; // PayPal fees
    const netAmount = amount - fees;
    
    return {
      status: 'completed',
      transactionId: `paypal_${payoutId}`,
      estimatedArrival: new Date().toISOString(), // Instant
      fees,
      netAmount,
      method: 'paypal'
    };
  }

  // Stripe payout processing
  async processStripePayout(amount, accountDetails, payoutId) {
    console.log('Processing Stripe payout:', { amount, accountDetails, payoutId });
    
    // In production, use Stripe Express accounts
    const estimatedArrival = new Date();
    estimatedArrival.setDate(estimatedArrival.getDate() + 2); // 2 business days
    
    return {
      status: 'processing',
      transactionId: `stripe_${payoutId}`,
      estimatedArrival: estimatedArrival.toISOString(),
      fees: 0,
      method: 'stripe'
    };
  }

  // Cryptocurrency payout processing
  async processCryptoPayout(amount, accountDetails, payoutId) {
    console.log('Processing crypto payout:', { amount, accountDetails, payoutId });
    
    // In production, integrate with crypto payment processors
    const networkFee = 0.001; // Example network fee
    const estimatedArrival = new Date();
    estimatedArrival.setMinutes(estimatedArrival.getMinutes() + 30); // 30 minutes
    
    return {
      status: 'processing',
      transactionId: `crypto_${payoutId}`,
      estimatedArrival: estimatedArrival.toISOString(),
      fees: networkFee,
      method: 'crypto'
    };
  }

  // Log payout transaction
  async logPayoutTransaction(transaction) {
    try {
      // In production, save to database
      const existingTransactions = JSON.parse(localStorage.getItem('payoutTransactions') || '[]');
      existingTransactions.unshift(transaction);
      localStorage.setItem('payoutTransactions', JSON.stringify(existingTransactions));
      
      console.log('Payout transaction logged:', transaction);
    } catch (error) {
      console.error('Failed to log payout transaction:', error);
    }
  }

  // Get payout history for vendor
  getPayoutHistory(vendorId, limit = 50) {
    try {
      const transactions = JSON.parse(localStorage.getItem('payoutTransactions') || '[]');
      return transactions
        .filter(t => t.vendorId === vendorId)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get payout history:', error);
      return [];
    }
  }

  // Generate tax documents
  generateTaxDocuments(vendorId, year) {
    try {
      const transactions = this.getPayoutHistory(vendorId);
      const yearTransactions = transactions.filter(t => 
        new Date(t.createdAt).getFullYear() === year
      );
      
      const totalEarnings = yearTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      // Generate 1099 form data
      const tax1099 = {
        vendorId,
        year,
        totalEarnings,
        platformFees: totalEarnings * this.processingFee,
        netEarnings: totalEarnings * (1 - this.processingFee),
        transactionCount: yearTransactions.length,
        generatedAt: new Date().toISOString()
      };
      
      return tax1099;
    } catch (error) {
      console.error('Failed to generate tax documents:', error);
      return null;
    }
  }

  // Validate payout settings
  validatePayoutSettings(settings) {
    const errors = [];
    
    if (!settings.method) {
      errors.push('Payout method is required');
    }
    
    if (!settings.threshold || settings.threshold < this.minimumPayout) {
      errors.push(`Minimum threshold is $${this.minimumPayout}`);
    }
    
    if (settings.threshold > this.maximumPayout) {
      errors.push(`Maximum threshold is $${this.maximumPayout}`);
    }
    
    if (!settings.schedule) {
      errors.push('Payout schedule is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Calculate next payout date
  calculateNextPayoutDate(schedule, lastPayoutDate = null) {
    const now = new Date();
    const nextPayout = new Date();
    
    switch (schedule) {
      case 'weekly':
        // Next Monday
        nextPayout.setDate(now.getDate() + (1 - now.getDay() + 7) % 7);
        break;
      case 'biweekly':
        // Every other Monday
        nextPayout.setDate(now.getDate() + (1 - now.getDay() + 14) % 14);
        break;
      case 'monthly':
        // First Monday of next month
        nextPayout.setMonth(now.getMonth() + 1, 1);
        nextPayout.setDate(1 + (1 - nextPayout.getDay() + 7) % 7);
        break;
      case 'threshold':
        return 'When threshold is reached';
      default:
        return null;
    }
    
    return nextPayout;
  }
}

export default new PayoutService();