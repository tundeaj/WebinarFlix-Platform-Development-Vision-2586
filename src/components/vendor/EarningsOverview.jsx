import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useVendor } from '../../contexts/VendorContext';
import ReactECharts from 'echarts-for-react';

const { FiDollarSign, FiTrendingUp, FiClock, FiDownload, FiCalendar, FiCreditCard } = FiIcons;

const EarningsOverview = () => {
  const { earnings, getTransactions, getPayouts } = useVendor();
  const [timeRange, setTimeRange] = useState('30d');
  const [transactions, setTransactions] = useState([]);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    setTransactions(getTransactions());
    setPayouts(getPayouts());
  }, []);

  const earningsChartData = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#141414',
      borderColor: '#E50914',
      textStyle: { color: '#ffffff' }
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLine: { lineStyle: { color: '#333333' } },
      axisLabel: { color: '#B3B3B3' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#333333' } },
      axisLabel: { color: '#B3B3B3' },
      splitLine: { lineStyle: { color: '#333333' } }
    },
    series: [{
      data: [850, 1200, 980, 1400, 1800, 2100, 1950],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#E50914', width: 3 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(229,9,20,0.3)' },
            { offset: 1, color: 'rgba(229,9,20,0.1)' }
          ]
        }
      },
      itemStyle: { color: '#E50914' }
    }]
  };

  const stats = [
    {
      label: 'Total Earnings',
      value: `$${earnings.totalEarnings.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      label: 'Pending Payout',
      value: `$${earnings.pendingPayout.toLocaleString()}`,
      icon: FiClock,
      color: 'bg-yellow-500',
      change: `$${earnings.pendingPayout >= 100 ? 'Ready' : (100 - earnings.pendingPayout).toFixed(0) + ' to go'}`
    },
    {
      label: 'This Month',
      value: `$${earnings.thisMonth.toLocaleString()}`,
      icon: FiTrendingUp,
      color: 'bg-blue-500',
      change: '+8.3%'
    },
    {
      label: 'Total Payouts',
      value: payouts.length,
      icon: FiCreditCard,
      color: 'bg-purple-500',
      change: 'All time'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Earnings Overview</h2>
          <p className="text-netflix-light">Track your revenue and payouts</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-netflix-black rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="text-netflix-light text-sm">
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-netflix-light text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Earnings Trend</h3>
          <ReactECharts
            option={earningsChartData}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
            <button className="text-netflix-red hover:text-red-400 text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-netflix-gray rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.source}</p>
                    <p className="text-netflix-light text-sm">{formatDate(transaction.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">+${transaction.amount.toFixed(2)}</p>
                  <p className="text-netflix-light text-sm">{transaction.status}</p>
                </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-netflix-light">No transactions yet</p>
                <p className="text-netflix-light text-sm">Start selling to see your earnings here</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Payout History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-netflix-black rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Payout History</h3>
          <button className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-netflix-gray">
                <th className="text-left text-netflix-light py-3">Date</th>
                <th className="text-left text-netflix-light py-3">Amount</th>
                <th className="text-left text-netflix-light py-3">Method</th>
                <th className="text-left text-netflix-light py-3">Status</th>
                <th className="text-left text-netflix-light py-3">Arrival</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-netflix-gray">
                  <td className="py-3 text-white">{formatDate(payout.initiatedAt)}</td>
                  <td className="py-3 text-green-400 font-bold">${payout.amount.toFixed(2)}</td>
                  <td className="py-3 text-white capitalize">{payout.method.replace('_', ' ')}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payout.status === 'completed' ? 'bg-green-500' :
                      payout.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="py-3 text-netflix-light">{formatDate(payout.estimatedArrival)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {payouts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-netflix-light">No payouts yet</p>
              <p className="text-netflix-light text-sm">Reach $100 minimum to receive your first payout</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EarningsOverview;