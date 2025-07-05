import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiMail, FiPhone, FiMapPin, FiClock, FiSend } = FiIcons;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'hello@webinarflix.com',
      link: 'mailto:hello@webinarflix.com'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      title: 'Address',
      content: '123 Learning Street, San Francisco, CA 94105',
      link: null
    },
    {
      icon: FiClock,
      title: 'Hours',
      content: 'Monday - Friday: 9AM - 6PM PST',
      link: null
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Contact form submitted:', data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-netflix-light">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-netflix-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-netflix-red rounded-lg">
                      <SafeIcon icon={info.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-netflix-light hover:text-white transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-netflix-light">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-netflix-black rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-netflix-light text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      className="w-full px-4 py-3 bg-netflix-gray border border-netflix-light rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red transition-colors"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-netflix-light text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      className="w-full px-4 py-3 bg-netflix-gray border border-netflix-light rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red transition-colors"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-netflix-light text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-netflix-gray border border-netflix-light rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-netflix-light text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 bg-netflix-gray border border-netflix-light rounded-lg text-white focus:outline-none focus:border-netflix-red transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-netflix-light text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows="6"
                    className="w-full px-4 py-3 bg-netflix-gray border border-netflix-light rounded-lg text-white placeholder-netflix-light focus:outline-none focus:border-netflix-red transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;