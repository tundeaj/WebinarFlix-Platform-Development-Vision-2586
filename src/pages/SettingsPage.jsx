import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiUser, FiBell, FiShield, FiCreditCard, FiGlobe, FiMoon, FiSun, FiToggleLeft, FiToggleRight } = FiIcons;

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      webinar: true,
      course: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showProgress: true,
      allowMessages: true
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC-8',
      autoplay: true
    }
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    toast.success('Settings updated');
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-netflix-red' : 'bg-netflix-gray'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingSection = ({ title, icon, children }) => (
    <div className="bg-netflix-black rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <SafeIcon icon={icon} className="w-5 h-5 text-netflix-red" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-netflix-light">Manage your account preferences and privacy settings</p>
        </div>

        {/* Notifications */}
        <SettingSection title="Notifications" icon={FiBell}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-netflix-light text-sm">Receive updates via email</p>
              </div>
              <ToggleSwitch
                checked={settings.notifications.email}
                onChange={(value) => updateSetting('notifications', 'email', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Push Notifications</h3>
                <p className="text-netflix-light text-sm">Browser push notifications</p>
              </div>
              <ToggleSwitch
                checked={settings.notifications.push}
                onChange={(value) => updateSetting('notifications', 'push', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Webinar Reminders</h3>
                <p className="text-netflix-light text-sm">Get notified before webinars start</p>
              </div>
              <ToggleSwitch
                checked={settings.notifications.webinar}
                onChange={(value) => updateSetting('notifications', 'webinar', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Course Updates</h3>
                <p className="text-netflix-light text-sm">New lessons and course announcements</p>
              </div>
              <ToggleSwitch
                checked={settings.notifications.course}
                onChange={(value) => updateSetting('notifications', 'course', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Marketing Emails</h3>
                <p className="text-netflix-light text-sm">Promotional content and offers</p>
              </div>
              <ToggleSwitch
                checked={settings.notifications.marketing}
                onChange={(value) => updateSetting('notifications', 'marketing', value)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Privacy */}
        <SettingSection title="Privacy" icon={FiShield}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Public Profile</h3>
                <p className="text-netflix-light text-sm">Make your profile visible to others</p>
              </div>
              <ToggleSwitch
                checked={settings.privacy.profileVisible}
                onChange={(value) => updateSetting('privacy', 'profileVisible', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Show Learning Progress</h3>
                <p className="text-netflix-light text-sm">Display your course completion status</p>
              </div>
              <ToggleSwitch
                checked={settings.privacy.showProgress}
                onChange={(value) => updateSetting('privacy', 'showProgress', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Allow Messages</h3>
                <p className="text-netflix-light text-sm">Let other users send you messages</p>
              </div>
              <ToggleSwitch
                checked={settings.privacy.allowMessages}
                onChange={(value) => updateSetting('privacy', 'allowMessages', value)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Preferences */}
        <SettingSection title="Preferences" icon={FiGlobe}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Language</h3>
                <p className="text-netflix-light text-sm">Choose your preferred language</p>
              </div>
              <select
                value={settings.preferences.language}
                onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                className="bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="pt">Português</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Timezone</h3>
                <p className="text-netflix-light text-sm">Set your local timezone</p>
              </div>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                className="bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+1">Central European (UTC+1)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-play Videos</h3>
                <p className="text-netflix-light text-sm">Automatically play next lesson</p>
              </div>
              <ToggleSwitch
                checked={settings.preferences.autoplay}
                onChange={(value) => updateSetting('preferences', 'autoplay', value)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Account Actions */}
        <SettingSection title="Account" icon={FiUser}>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-netflix-gray hover:bg-netflix-light rounded-lg transition-colors">
              <h3 className="text-white font-medium mb-1">Change Password</h3>
              <p className="text-netflix-light text-sm">Update your account password</p>
            </button>
            
            <button className="w-full text-left p-4 bg-netflix-gray hover:bg-netflix-light rounded-lg transition-colors">
              <h3 className="text-white font-medium mb-1">Download Data</h3>
              <p className="text-netflix-light text-sm">Export your account data</p>
            </button>
            
            <button className="w-full text-left p-4 bg-red-900 hover:bg-red-800 rounded-lg transition-colors">
              <h3 className="text-white font-medium mb-1">Delete Account</h3>
              <p className="text-netflix-light text-sm">Permanently delete your account</p>
            </button>
          </div>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={() => toast.success('All settings saved!')}
            className="px-6 py-3 bg-netflix-red hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;