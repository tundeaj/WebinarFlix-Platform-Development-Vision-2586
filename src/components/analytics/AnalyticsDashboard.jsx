import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiUsers, FiDollarSign, FiTrendingUp, FiPlay, FiBook, FiAward } = FiIcons

const AnalyticsDashboard = ({ hostId = 'host123' }) => {
  const [timeRange, setTimeRange] = useState('7d')
  const [analytics, setAnalytics] = useState({
    totalRevenue: 12450,
    totalStudents: 1234,
    totalWebinars: 24,
    totalCourses: 8,
    certificatesIssued: 456,
    averageRating: 4.7
  })

  const revenueData = {
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
      data: [1200, 1800, 2200, 2800, 3200, 3800, 4200],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#E50914', width: 3 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(229, 9, 20, 0.3)' },
            { offset: 1, color: 'rgba(229, 9, 20, 0.1)' }
          ]
        }
      },
      itemStyle: { color: '#E50914' }
    }]
  }

  const studentEngagementData = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#141414',
      borderColor: '#E50914',
      textStyle: { color: '#ffffff' }
    },
    series: [{
      type: 'pie',
      radius: '70%',
      data: [
        { value: 45, name: 'Completed Courses', itemStyle: { color: '#E50914' } },
        { value: 30, name: 'Active Students', itemStyle: { color: '#00A8FF' } },
        { value: 25, name: 'New Enrollments', itemStyle: { color: '#44BD32' } }
      ],
      label: {
        color: '#ffffff',
        fontSize: 12
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }

  const webinarAttendanceData = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#141414',
      borderColor: '#E50914',
      textStyle: { color: '#ffffff' }
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
      data: [120, 150, 180, 200],
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#E50914' },
            { offset: 1, color: '#B81D24' }
          ]
        }
      }
    }]
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+12%',
      trend: 'up'
    },
    {
      label: 'Total Students',
      value: analytics.totalStudents.toLocaleString(),
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+8%',
      trend: 'up'
    },
    {
      label: 'Webinars Hosted',
      value: analytics.totalWebinars,
      icon: FiPlay,
      color: 'bg-purple-500',
      change: '+15%',
      trend: 'up'
    },
    {
      label: 'Active Courses',
      value: analytics.totalCourses,
      icon: FiBook,
      color: 'bg-yellow-500',
      change: '+3%',
      trend: 'up'
    },
    {
      label: 'Certificates Issued',
      value: analytics.certificatesIssued,
      icon: FiAward,
      color: 'bg-red-500',
      change: '+25%',
      trend: 'up'
    },
    {
      label: 'Average Rating',
      value: analytics.averageRating.toFixed(1),
      icon: FiTrendingUp,
      color: 'bg-indigo-500',
      change: '+0.2',
      trend: 'up'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-netflix-light">Track your performance and growth</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.trend === 'up' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
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
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Revenue Over Time</h3>
          <ReactECharts
            option={revenueData}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>

        {/* Student Engagement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-netflix-black rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Student Engagement</h3>
          <ReactECharts
            option={studentEngagementData}
            style={{ height: '300px' }}
            theme="dark"
          />
        </motion.div>
      </div>

      {/* Webinar Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-netflix-black rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Webinar Attendance</h3>
        <ReactECharts
          option={webinarAttendanceData}
          style={{ height: '300px' }}
          theme="dark"
        />
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-netflix-black rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-netflix-gray rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">New course purchase</p>
              <p className="text-netflix-light text-sm">React Development Masterclass - $99</p>
            </div>
            <span className="text-netflix-light text-sm">2 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-netflix-gray rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Webinar registration</p>
              <p className="text-netflix-light text-sm">AI in Development - 45 new registrations</p>
            </div>
            <span className="text-netflix-light text-sm">5 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-netflix-gray rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiAward} className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Certificate issued</p>
              <p className="text-netflix-light text-sm">JavaScript Fundamentals - 25 certificates</p>
            </div>
            <span className="text-netflix-light text-sm">1 day ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard