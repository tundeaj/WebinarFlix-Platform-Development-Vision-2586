import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiX, FiVideo, FiUsers, FiCalendar, FiClock, FiGlobe, FiCheck, FiExternalLink } = FiIcons;

const CreateWebinarModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const platforms = [
    {
      id: 'native',
      name: 'WebinarFlix Native',
      description: 'Built-in video conferencing with advanced features',
      icon: FiVideo,
      features: ['HD Video & Audio', 'Screen Sharing', 'Interactive Chat', 'Breakout Rooms', 'Recording'],
      maxParticipants: 1000,
      pricing: 'Free',
      color: 'bg-netflix-red'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Professional video conferencing platform',
      icon: FiVideo,
      features: ['HD Video', 'Screen Share', 'Breakout Rooms', 'Recording', 'Waiting Room'],
      maxParticipants: 500,
      pricing: 'Requires Zoom Pro',
      color: 'bg-blue-500'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Enterprise collaboration platform',
      icon: FiUsers,
      features: ['HD Video', 'File Sharing', 'Whiteboard', 'Recording', 'Live Captions'],
      maxParticipants: 300,
      pricing: 'Requires Teams License',
      color: 'bg-purple-500'
    },
    {
      id: 'meet',
      name: 'Google Meet',
      description: 'Simple and secure video meetings',
      icon: FiGlobe,
      features: ['HD Video', 'Screen Share', 'Live Captions', 'Recording', 'Mobile Apps'],
      maxParticipants: 250,
      pricing: 'Requires Google Workspace',
      color: 'bg-green-500'
    },
    {
      id: 'webex',
      name: 'Cisco Webex',
      description: 'Enterprise-grade video conferencing',
      icon: FiVideo,
      features: ['HD Video', 'Whiteboard', 'Polls', 'Recording', 'Analytics'],
      maxParticipants: 1000,
      pricing: 'Requires Webex License',
      color: 'bg-indigo-500'
    },
    {
      id: 'gotomeeting',
      name: 'GoToMeeting',
      description: 'Professional online meeting platform',
      icon: FiUsers,
      features: ['HD Video', 'Screen Share', 'Drawing Tools', 'Recording', 'Mobile Apps'],
      maxParticipants: 250,
      pricing: 'Requires GoTo License',
      color: 'bg-orange-500'
    }
  ];

  const categories = [
    'Technology', 'Business', 'Marketing', 'Design', 'Development',
    'Data Science', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'DevOps'
  ];

  const onSubmit = async (data) => {
    if (!selectedPlatform) {
      toast.error('Please select a platform');
      return;
    }

    setIsCreating(true);
    try {
      const webinarData = {
        ...data,
        platform: selectedPlatform,
        id: Date.now(),
        status: 'upcoming',
        attendees: 0,
        createdAt: new Date().toISOString()
      };

      // Simulate API call to create webinar
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Platform-specific integration
      await integrateWithPlatform(selectedPlatform, webinarData);

      toast.success('Webinar created successfully!');
      onSuccess(webinarData);
      handleClose();
    } catch (error) {
      console.error('Failed to create webinar:', error);
      toast.error('Failed to create webinar. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const integrateWithPlatform = async (platform, data) => {
    switch (platform) {
      case 'zoom':
        return await createZoomMeeting(data);
      case 'teams':
        return await createTeamsMeeting(data);
      case 'meet':
        return await createGoogleMeeting(data);
      case 'webex':
        return await createWebexMeeting(data);
      case 'gotomeeting':
        return await createGoToMeeting(data);
      default:
        return { meetingUrl: `https://webinarflix.com/room/${data.id}` };
    }
  };

  const createZoomMeeting = async (data) => {
    // In production, this would make actual API calls to Zoom
    const zoomConfig = {
      topic: data.title,
      type: 2, // Scheduled meeting
      start_time: data.date,
      duration: parseInt(data.duration),
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true,
        auto_recording: 'cloud'
      }
    };
    
    console.log('Creating Zoom meeting:', zoomConfig);
    return { meetingUrl: `https://zoom.us/j/${Date.now()}`, meetingId: Date.now() };
  };

  const createTeamsMeeting = async (data) => {
    // Microsoft Graph API integration
    const teamsConfig = {
      subject: data.title,
      startTime: data.date,
      endTime: new Date(new Date(data.date).getTime() + parseInt(data.duration) * 60000).toISOString()
    };
    
    console.log('Creating Teams meeting:', teamsConfig);
    return { meetingUrl: `https://teams.microsoft.com/meet/${Date.now()}` };
  };

  const createGoogleMeeting = async (data) => {
    // Google Calendar API integration
    const meetConfig = {
      summary: data.title,
      start: { dateTime: data.date },
      end: { dateTime: new Date(new Date(data.date).getTime() + parseInt(data.duration) * 60000).toISOString() },
      conferenceData: { createRequest: { requestId: Date.now().toString() } }
    };
    
    console.log('Creating Google Meet:', meetConfig);
    return { meetingUrl: `https://meet.google.com/${Date.now()}` };
  };

  const createWebexMeeting = async (data) => {
    // Webex API integration
    const webexConfig = {
      title: data.title,
      start: data.date,
      end: new Date(new Date(data.date).getTime() + parseInt(data.duration) * 60000).toISOString()
    };
    
    console.log('Creating Webex meeting:', webexConfig);
    return { meetingUrl: `https://webex.com/meet/${Date.now()}` };
  };

  const createGoToMeeting = async (data) => {
    // GoTo API integration
    const gotoConfig = {
      subject: data.title,
      starttime: data.date,
      endtime: new Date(new Date(data.date).getTime() + parseInt(data.duration) * 60000).toISOString()
    };
    
    console.log('Creating GoTo meeting:', gotoConfig);
    return { meetingUrl: `https://global.gotomeeting.com/join/${Date.now()}` };
  };

  const handleClose = () => {
    reset();
    setSelectedPlatform('');
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-netflix-black rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Webinar</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-netflix-gray hover:bg-netflix-light transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-netflix-red' : 'bg-netflix-gray'} text-white font-semibold mr-4`}>
            {step > 1 ? <SafeIcon icon={FiCheck} className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-0.5 ${step > 1 ? 'bg-netflix-red' : 'bg-netflix-gray'} mr-4`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-netflix-red' : 'bg-netflix-gray'} text-white font-semibold`}>
            2
          </div>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Choose Your Platform</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatform === platform.id
                      ? 'border-netflix-red bg-netflix-red bg-opacity-20'
                      : 'border-netflix-gray bg-netflix-gray hover:border-netflix-light'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <SafeIcon icon={platform.icon} className="w-5 h-5 text-white" />
                    </div>
                    {selectedPlatform === platform.id && (
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-netflix-red" />
                    )}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-1">{platform.name}</h4>
                  <p className="text-netflix-light text-sm mb-3">{platform.description}</p>
                  
                  <div className="space-y-1 mb-3">
                    {platform.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-netflix-red rounded-full" />
                        <span className="text-netflix-light text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-netflix-light">Up to {platform.maxParticipants} participants</span>
                    <span className="text-green-400 font-medium">{platform.pricing}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedPlatform}
                className="px-6 py-3 bg-netflix-red hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Next: Webinar Details
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-netflix-light text-sm mb-2">Webinar Title</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="Enter webinar title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Category</label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Date & Time</label>
                <input
                  {...register('date', { required: 'Date is required' })}
                  type="datetime-local"
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                />
                {errors.date && (
                  <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Duration (minutes)</label>
                <select
                  {...register('duration', { required: 'Duration is required' })}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select duration</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                </select>
                {errors.duration && (
                  <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Max Participants</label>
                <input
                  {...register('maxParticipants', { required: 'Max participants is required' })}
                  type="number"
                  min="1"
                  max={platforms.find(p => p.id === selectedPlatform)?.maxParticipants || 1000}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="100"
                />
                {errors.maxParticipants && (
                  <p className="text-red-400 text-sm mt-1">{errors.maxParticipants.message}</p>
                )}
              </div>

              <div>
                <label className="block text-netflix-light text-sm mb-2">Pricing</label>
                <select
                  {...register('pricing')}
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            {watch('pricing') === 'paid' && (
              <div>
                <label className="block text-netflix-light text-sm mb-2">Price ($)</label>
                <input
                  {...register('price', { min: 1 })}
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  placeholder="29.99"
                />
              </div>
            )}

            <div>
              <label className="block text-netflix-light text-sm mb-2">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-24"
                placeholder="Describe your webinar..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-netflix-light text-sm mb-2">Thumbnail URL</label>
              <input
                {...register('thumbnail')}
                type="url"
                className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-netflix-gray hover:bg-netflix-light text-white rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isCreating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <SafeIcon icon={FiVideo} className="w-5 h-5" />
                )}
                <span>{isCreating ? 'Creating...' : 'Create Webinar'}</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreateWebinarModal;