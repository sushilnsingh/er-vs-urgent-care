import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-6">Last Updated: November 21, 2024</p>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p>
                Welcome to ER vs Urgent Care ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ervsurgentcare.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Information You Provide</h3>
              <p>
                We collect information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Symptom descriptions and health-related information you enter into our tool</li>
                <li>Contact information if you reach out to us</li>
                <li>Feedback and survey responses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide and improve our medical triage guidance service</li>
                <li>Analyze symptom patterns to enhance our AI algorithms</li>
                <li>Display relevant advertisements through Google AdSense</li>
                <li>Recommend relevant health products through Amazon Associates</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements. Google may use cookies and web beacons to collect information about your visits to this and other websites in order to provide relevant advertisements. For more information, visit Google's Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Amazon Associates</h3>
              <p>
                We participate in the Amazon Services LLC Associates Program, an affiliate advertising program. When you click on Amazon links, Amazon may use cookies to track purchases for commission purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Anthropic Claude API</h3>
              <p>
                We use Anthropic's Claude AI to analyze symptoms. Symptom information is processed according to Anthropic's privacy policy and data handling practices.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Analytics</h3>
              <p>
                We use analytics services to understand how users interact with our website. These services may collect information such as your IP address, browser type, and pages visited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and track information and to improve and analyze our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Privacy Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to request correction or deletion of your personal information</li>
                <li>The right to object to or restrict processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Children's Privacy</h2>
              <p>
                Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Email: sushilnareshsingh@gmail.com<br />
                Website: ervsurgentcare.com
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
