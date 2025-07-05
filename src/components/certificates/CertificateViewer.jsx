import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import certificateService from '../../services/certificateService'
import toast from 'react-hot-toast'

const { FiDownload, FiShare2, FiEye, FiAward, FiCalendar, FiUser, FiX } = FiIcons

const CertificateViewer = ({ userId = 'user123' }) => {
  const [certificates, setCertificates] = useState([])
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = () => {
    const userCertificates = certificateService.getUserCertificates(userId)
    setCertificates(userCertificates)
  }

  const generateSampleCertificate = async () => {
    setIsGenerating(true)
    try {
      const certificateData = {
        type: 'webinar',
        userName: 'John Doe',
        eventTitle: 'Advanced React Patterns',
        completionDate: new Date().toLocaleDateString(),
        instructorName: 'Sarah Johnson',
        duration: '2 hours',
        attendancePercentage: 95
      }

      const certificate = await certificateService.generateCertificate(certificateData)
      await certificateService.saveCertificate(certificateData, userId)
      
      loadCertificates()
      toast.success('Certificate generated successfully!')
    } catch (error) {
      console.error('Failed to generate certificate:', error)
      toast.error('Failed to generate certificate')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadCertificate = async (certificateId) => {
    try {
      // In a real implementation, you would fetch the certificate from the server
      const certificateData = {
        type: 'webinar',
        userName: 'John Doe',
        eventTitle: 'Advanced React Patterns',
        completionDate: new Date().toLocaleDateString(),
        instructorName: 'Sarah Johnson',
        duration: '2 hours',
        attendancePercentage: 95
      }

      const certificate = await certificateService.generateCertificate(certificateData)
      certificate.pdf.save(`certificate-${certificateId}.pdf`)
      toast.success('Certificate downloaded!')
    } catch (error) {
      console.error('Failed to download certificate:', error)
      toast.error('Failed to download certificate')
    }
  }

  const shareCertificate = (certificateId) => {
    const shareUrl = `https://webinarflix.com/verify/${certificateId}`
    if (navigator.share) {
      navigator.share({
        title: 'My WebinarFlix Certificate',
        text: 'Check out my certificate from WebinarFlix!',
        url: shareUrl
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      toast.success('Certificate link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-netflix-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Certificates</h1>
            <p className="text-netflix-light">View and manage your earned certificates</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateSampleCertificate}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <SafeIcon icon={FiAward} className="w-5 h-5" />
            <span>{isGenerating ? 'Generating...' : 'Generate Sample'}</span>
          </motion.button>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-netflix-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiAward} className="w-12 h-12 text-netflix-light" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No certificates yet</h3>
            <p className="text-netflix-light mb-6">Complete courses and attend webinars to earn certificates</p>
            <button
              onClick={generateSampleCertificate}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Generate Sample Certificate
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-netflix-black rounded-lg p-6 hover:bg-netflix-gray transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    certificate.type === 'course' ? 'bg-green-500' : 'bg-blue-500'
                  } text-white`}>
                    {certificate.type.toUpperCase()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadCertificate(certificate.id)}
                      className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => shareCertificate(certificate.id)}
                      className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
                    >
                      <SafeIcon icon={FiShare2} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-white font-semibold mb-2 line-clamp-2">
                  {certificate.eventTitle}
                </h3>
                
                <div className="space-y-2 text-sm text-netflix-light">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>{certificate.completionDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>Certificate ID: {certificate.id.slice(0, 8)}...</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-netflix-gray">
                  <button
                    onClick={() => setSelectedCertificate(certificate)}
                    className="w-full flex items-center justify-center space-x-2 text-netflix-red hover:text-red-400 transition-colors"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-netflix-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Certificate Details</h2>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedCertificate.eventTitle}
                  </h3>
                  <p className="text-netflix-light">
                    Certificate of {selectedCertificate.type === 'course' ? 'Completion' : 'Attendance'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-netflix-light text-sm">Completion Date</span>
                    <p className="text-white">{selectedCertificate.completionDate}</p>
                  </div>
                  <div>
                    <span className="text-netflix-light text-sm">Certificate ID</span>
                    <p className="text-white font-mono text-sm">{selectedCertificate.id}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => downloadCertificate(selectedCertificate.id)}
                    className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                  
                  <button
                    onClick={() => shareCertificate(selectedCertificate.id)}
                    className="flex items-center space-x-2 bg-netflix-gray hover:bg-netflix-light text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <SafeIcon icon={FiShare2} className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CertificateViewer