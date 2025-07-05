import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-netflix-dark pt-20 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-netflix-black rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-netflix-light mb-8">Last updated: {lastUpdated}</p>
          
          <div className="space-y-6 text-netflix-light">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                enroll in courses, or contact us for support. This may include your name, email address, 
                and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send related information</li>
                <li>To send you technical notices and support messages</li>
                <li>To communicate with you about products, services, and events</li>
                <li>To monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. 
                You may also opt out of certain communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                <a href="mailto:privacy@webinarflix.com" className="text-netflix-red hover:underline ml-1">
                  privacy@webinarflix.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;