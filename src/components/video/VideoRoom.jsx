import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import videoService from '../../services/videoService'
import toast from 'react-hot-toast'

const { FiVideo, FiVideoOff, FiMic, FiMicOff, FiMonitor, FiUsers, FiMessageSquare, FiSettings, FiPhoneOff, FiUser } = FiIcons

const VideoRoom = ({ roomId, isHost, onLeave }) => {
  const [localStream, setLocalStream] = useState(null)
  const [remoteStreams, setRemoteStreams] = useState([])
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [participants, setParticipants] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const localVideoRef = useRef(null)
  const remoteVideoRefs = useRef({})

  useEffect(() => {
    initializeVideo()
    return () => {
      videoService.leaveRoom()
    }
  }, [])

  const initializeVideo = async () => {
    try {
      const stream = await videoService.initializeWebRTC()
      setLocalStream(stream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      
      // Connect to room
      const socket = videoService.connectToRoom(roomId, 'user123', isHost)
      setIsConnected(true)
      toast.success('Connected to video room')
    } catch (error) {
      console.error('Failed to initialize video:', error)
      toast.error('Failed to access camera/microphone')
    }
  }

  const toggleVideo = () => {
    const newState = videoService.toggleVideo()
    setIsVideoOn(newState)
  }

  const toggleAudio = () => {
    const newState = videoService.toggleAudio()
    setIsAudioOn(newState)
  }

  const shareScreen = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await videoService.shareScreen()
        setIsScreenSharing(true)
        toast.success('Screen sharing started')
        
        // Replace video track with screen track
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream
        }
      } else {
        // Stop screen sharing and return to camera
        setIsScreenSharing(false)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream
        }
        toast.success('Screen sharing stopped')
      }
    } catch (error) {
      console.error('Screen sharing failed:', error)
      toast.error('Failed to share screen')
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString()
      }
      setChatMessages([...chatMessages, newMessage])
      setMessage('')
    }
  }

  const leaveRoom = () => {
    videoService.leaveRoom()
    onLeave()
  }

  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col">
      {/* Header */}
      <div className="bg-netflix-black p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-semibold">Video Room</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-netflix-light text-sm">
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-netflix-light">
            <SafeIcon icon={FiUsers} className="w-4 h-4" />
            <span>{participants.length + 1}</span>
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 flex">
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Local Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-netflix-gray rounded-lg overflow-hidden"
            >
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                You {isHost && '(Host)'}
              </div>
              {!isVideoOn && (
                <div className="absolute inset-0 bg-netflix-gray flex items-center justify-center">
                  <div className="w-16 h-16 bg-netflix-light rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Remote Videos */}
            {remoteStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-netflix-gray rounded-lg overflow-hidden"
              >
                <video
                  ref={el => remoteVideoRefs.current[stream.id] = el}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                  Participant {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 bg-netflix-black border-l border-netflix-gray flex flex-col"
          >
            <div className="p-4 border-b border-netflix-gray">
              <h3 className="text-white font-semibold">Chat</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-netflix-red text-sm font-medium">{msg.sender}</span>
                    <span className="text-netflix-light text-xs">{msg.timestamp}</span>
                  </div>
                  <p className="text-white text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-netflix-gray">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-netflix-gray border border-netflix-light rounded px-3 py-2 text-white text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-netflix-red hover:bg-red-700 text-white rounded text-sm transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-netflix-black p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full transition-colors ${
              isAudioOn ? 'bg-netflix-gray hover:bg-netflix-light' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <SafeIcon icon={isAudioOn ? FiMic : FiMicOff} className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-colors ${
              isVideoOn ? 'bg-netflix-gray hover:bg-netflix-light' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <SafeIcon icon={isVideoOn ? FiVideo : FiVideoOff} className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={shareScreen}
            className={`p-3 rounded-full transition-colors ${
              isScreenSharing ? 'bg-netflix-red hover:bg-red-700' : 'bg-netflix-gray hover:bg-netflix-light'
            }`}
          >
            <SafeIcon icon={FiMonitor} className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={() => {}}
            className="p-3 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiSettings} className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={leaveRoom}
            className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
            <SafeIcon icon={FiPhoneOff} className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoRoom