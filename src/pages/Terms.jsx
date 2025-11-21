import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-sm text-gray-600 mb-6">Last Updated: November 21, 2024</p>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Agreement to Terms</h2>
              <p>
                By accessing or using ER vs Urgent Care ("the Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Medical Disclaimer</h2>
              <p className="font-semibold text-red-700">
                IMPORTANT: This Service provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <ul className="list-disc ml-6 space-y-2 mt-3">
                <li>Always seek the advice of your physician or qualified health provider</li>
                <li>Never disregard professional medical advice or delay seeking it because of information from this Service</li>
                <li>If you think you have a medical emergency, call 911 immediately</li>
                <li>The Service does not create a doctor-patient relationship</li>
                <li>The AI-generated recommendations are for informational purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Use of Service</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Permitted Use</h3>
              <p>You may use the Service for:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Personal, non-commercial informational purposes</li>
                <li>Educational purposes regarding healthcare decisions</li>
                <li>General guidance on medical care options</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Prohibited Use</h3>
              <p>You may NOT use the Service to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Replace professional medical advice or emergency services</li>
                <li>Make definitive medical diagnoses</li>
                <li>Treat life-threatening conditions</li>
                <li>Scrape, copy, or redistribute our content</li>
                <li>Reverse engineer our AI algorithms</li>
                <li>Use for any unlawful purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by ER vs Urgent Care and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">User Responsibilities</h2>
              <p>By using this Service, you agree to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide accurate and complete symptom information</li>
                <li>Use the Service responsibly and not for malicious purposes</li>
                <li>Not submit false or misleading information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Seek emergency care immediately for serious symptoms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Affiliate Disclosure</h2>
              <p>
                This Service contains affiliate links, including Amazon Associates links. We may earn a commission when you make purchases through these links at no additional cost to you. See our Affiliate Disclosure page for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
              <p className="font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ER VS URGENT CARE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="mt-3">
                You expressly understand and agree that your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Accuracy of Information</h2>
              <p>
                While we strive to provide accurate information, we make no representations or warranties about:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The completeness, accuracy, or reliability of any information</li>
                <li>The suitability of recommendations for your specific situation</li>
                <li>The availability or accuracy of cost estimates</li>
                <li>The performance of AI algorithms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Third-Party Links</h2>
              <p>
                Our Service may contain links to third-party websites or services (including Google Maps, Amazon, telemedicine providers). We are not responsible for the content, privacy policies, or practices of any third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless ER vs Urgent Care from any claims, damages, liabilities, costs, and expenses (including attorney fees) arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes by updating the "Last Updated" date. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at:
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
