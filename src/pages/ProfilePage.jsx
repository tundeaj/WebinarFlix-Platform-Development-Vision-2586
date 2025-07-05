import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiCamera, FiGlobe } = FiIcons;

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Passionate developer and lifelong learner. Love sharing knowledge and building amazing products.',
      website: 'https://johndoe.dev',
      company: 'Tech Innovations Inc.',
      role: 'Senior Software Engineer'
    }
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile updated:', data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
      toast.success('Profile image updated!');
    }
  };

  const stats = [
    { label: 'Courses Completed', value: '12', icon: FiUser },
    { label: 'Webinars Attended', value: '28', icon: FiGlobe },
    { label: 'Certificates Earned', value: '8', icon: FiUser },
    { label: 'Hours Learned', value: '156', icon: FiUser }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-netflix-black rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-netflix-red to-red-700 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <button
                onClick={() => {
                  if (isEditing) {
                    reset();
                  }
                  setIsEditing(!isEditing);
                }}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={isEditing ? FiSave : FiEdit3} className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Profile Image */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-netflix-red"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-netflix-red rounded-full p-2 cursor-pointer hover:bg-red-700 transition-colors">
                      <SafeIcon icon={FiCamera} className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">John Doe</h2>
                  <p className="text-netflix-light">Senior Software Engineer</p>
                  <p className="text-netflix-light text-sm">Member since January 2024</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-netflix-gray rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-netflix-light text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Full Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-netflix-light text-sm mb-2">Email Address</label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-netflix-light text-sm mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-netflix-light text-sm mb-2">Location</label>
                  <input
                    {...register('location')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-netflix-light text-sm mb-2">Company</label>
                  <input
                    {...register('company')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-netflix-light text-sm mb-2">Role</label>
                  <input
                    {...register('role')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-netflix-light text-sm mb-2">Website</label>
                  <input
                    {...register('website')}
                    type="url"
                    disabled={!isEditing}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-netflix-light text-sm mb-2">Bio</label>
                  <textarea
                    {...register('bio')}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white disabled:opacity-50 resize-none"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 bg-netflix-gray hover:bg-netflix-light text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2 bg-netflix-red hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;