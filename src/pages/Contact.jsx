import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <p>
              We'd love to hear from you! Whether you have questions, feedback, suggestions, or need support, please don't hesitate to reach out.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  For general inquiries, support, or feedback:
                </p>
                <a 
                  href="mailto:sushilnareshsingh@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                >
                  sushilnareshsingh@gmail.com
                </a>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Website</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  Visit our homepage:
                </p>
                <a 
                  href="https://ervsurgentcare.com" 
                  className="text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                  ervsurgentcare.com
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">What We Can Help With</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Technical Support:</strong> Issues using the tool, bugs, or errors</li>
                <li><strong>Feedback:</strong> Suggestions for improvements or new features</li>
                <li><strong>Partnerships:</strong> Business inquiries or collaboration opportunities</li>
                <li><strong>Press Inquiries:</strong> Media requests or interviews</li>
                <li><strong>General Questions:</strong> Anything else you'd like to know</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Response Time</h2>
              <p>
                We aim to respond to all inquiries within 24-48 hours during business days. Please note that we cannot provide medical advice or emergency support through email.
              </p>
            </section>

            <section className="bg-red-50 border-l-4 border-red-600 p-4 my-6">
              <h3 className="font-semibold text-red-900 mb-2">⚠️ For Medical Emergencies</h3>
              <p className="text-red-800 text-sm">
                If you are experiencing a medical emergency, do NOT email us. Call 911 immediately or go to your nearest Emergency Room. We cannot provide emergency medical support or advice through email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Privacy</h2>
              <p>
                We respect your privacy. Any information you share with us will be handled in accordance with our <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>. We will never share your personal information with third parties without your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Stay Connected</h2>
              <p>
                Want to stay updated on new features, health tips, and important announcements? Follow us on social media or check back regularly for updates.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We Value Your Feedback</h3>
              <p>
                Your input helps us improve and better serve our community. Whether it's a bug report, feature request, or just a note to say hello, we appreciate hearing from you!
              </p>
            </section>
          </div>
        </div>

        <div className="text-center mt-8 pb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
