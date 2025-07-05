import React, { createContext, useContext, useState, useEffect } from 'react';

const VendorContext = createContext();

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};

export const VendorProvider = ({ children }) => {
  const [vendorProfile, setVendorProfile] = useState(null);
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayout: 0,
    thisMonth: 0,
    lastPayout: null,
    nextPayout: null
  });
  const [payoutSettings, setPayoutSettings] = useState({
    method: 'bank_transfer',
    threshold: 100,
    schedule: 'monthly',
    bankDetails: null,
    taxInfo: null
  });
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check vendor status and load data
    loadVendorData();
  }, []);

  const loadVendorData = async () => {
    try {
      // Simulate API call
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const vendorData = JSON.parse(localStorage.getItem('vendorProfile') || 'null');
      const earningsData = JSON.parse(localStorage.getItem('earnings') || '{}');
      
      if (vendorData) {
        setIsVendor(true);
        setVendorProfile(vendorData);
        setEarnings({
          totalEarnings: earningsData.totalEarnings || 0,
          pendingPayout: earningsData.pendingPayout || 0,
          thisMonth: earningsData.thisMonth || 0,
          lastPayout: earningsData.lastPayout || null,
          nextPayout: earningsData.nextPayout || null
        });
      }
    } catch (error) {
      console.error('Failed to load vendor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const becomeVendor = async (vendorData) => {
    try {
      const newVendorProfile = {
        ...vendorData,
        id: Date.now(),
        status: 'pending_verification',
        createdAt: new Date().toISOString(),
        verified: false
      };

      localStorage.setItem('vendorProfile', JSON.stringify(newVendorProfile));
      setVendorProfile(newVendorProfile);
      setIsVendor(true);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to become vendor:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePayoutSettings = async (settings) => {
    try {
      const updatedSettings = { ...payoutSettings, ...settings };
      localStorage.setItem('payoutSettings', JSON.stringify(updatedSettings));
      setPayoutSettings(updatedSettings);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to update payout settings:', error);
      return { success: false, error: error.message };
    }
  };

  const addEarning = (amount, source, metadata = {}) => {
    const platformFee = amount * 0.05; // 5% platform fee
    const vendorEarning = amount - platformFee;
    
    const newEarnings = {
      ...earnings,
      totalEarnings: earnings.totalEarnings + vendorEarning,
      pendingPayout: earnings.pendingPayout + vendorEarning,
      thisMonth: earnings.thisMonth + vendorEarning
    };
    
    setEarnings(newEarnings);
    localStorage.setItem('earnings', JSON.stringify(newEarnings));
    
    // Log transaction
    const transaction = {
      id: Date.now(),
      amount: vendorEarning,
      platformFee,
      source,
      metadata,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Check if payout should be triggered
    checkAutomaticPayout(newEarnings);
  };

  const checkAutomaticPayout = (currentEarnings) => {
    const { threshold, schedule } = payoutSettings;
    const shouldPayout = currentEarnings.pendingPayout >= threshold;
    
    if (shouldPayout) {
      processPayout(currentEarnings.pendingPayout);
    }
  };

  const processPayout = async (amount) => {
    try {
      // Simulate payout processing
      const payout = {
        id: Date.now(),
        amount,
        method: payoutSettings.method,
        status: 'processing',
        initiatedAt: new Date().toISOString(),
        estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      // Update earnings
      const updatedEarnings = {
        ...earnings,
        pendingPayout: 0,
        lastPayout: payout
      };
      
      setEarnings(updatedEarnings);
      localStorage.setItem('earnings', JSON.stringify(updatedEarnings));
      
      // Save payout record
      const payouts = JSON.parse(localStorage.getItem('payouts') || '[]');
      payouts.unshift(payout);
      localStorage.setItem('payouts', JSON.stringify(payouts));
      
      return { success: true, payout };
    } catch (error) {
      console.error('Payout processing failed:', error);
      return { success: false, error: error.message };
    }
  };

  const getTransactions = () => {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  };

  const getPayouts = () => {
    return JSON.parse(localStorage.getItem('payouts') || '[]');
  };

  const value = {
    vendorProfile,
    earnings,
    payoutSettings,
    isVendor,
    loading,
    becomeVendor,
    updatePayoutSettings,
    addEarning,
    processPayout,
    getTransactions,
    getPayouts,
    loadVendorData
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
};