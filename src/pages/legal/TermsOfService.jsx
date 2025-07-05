import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-netflix-light mb-8">Last updated: {lastUpdated}</p>
          
          <div className="space-y-6 text-netflix-light">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using WebinarFlix, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on 
                WebinarFlix's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Disclaimer</h2>
              <p>
                The materials on WebinarFlix's website are provided on an 'as is' basis. 
                WebinarFlix makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or 
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Limitations</h2>
              <p>
                In no event shall WebinarFlix or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on WebinarFlix's website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at 
                <a href="mailto:legal@webinarflix.com" className="text-netflix-red hover:underline ml-1">
                  legal@webinarflix.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;