import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Heart, Shield, Zap } from 'lucide-react';

export default function About() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
              <p>
                ER vs Urgent Care is dedicated to helping people make informed healthcare decisions by providing AI-powered guidance on whether to visit an Emergency Room, Urgent Care facility, or manage symptoms at home.
              </p>
              <p>
                We believe that everyone deserves access to quality healthcare information that can help them:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Save thousands of dollars in unnecessary emergency room visits</li>
                <li>Get appropriate care for their medical needs</li>
                <li>Make confident healthcare decisions quickly</li>
                <li>Understand the urgency and severity of their symptoms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why We Created This Tool</h2>
              <p>
                The healthcare system can be confusing and expensive. Many people struggle to determine whether their symptoms require immediate emergency care, can be handled at an urgent care facility, or can be managed at home.
              </p>
              <p className="mt-3">
                <strong>Did you know?</strong>
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>About 30% of emergency room visits could be treated at urgent care</li>
                <li>The average ER visit costs $1,500-$3,000 out of pocket</li>
                <li>The average urgent care visit costs $150-$300</li>
                <li>Americans could save billions by making more informed choices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Enter Symptoms</h3>
                  <p className="text-sm">Describe your symptoms in detail</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
                  <p className="text-sm">Our AI powered by Claude analyzes your information</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Get Guidance</h3>
                  <p className="text-sm">Receive personalized recommendations</p>
                </div>
              </div>
              <p>
                Our tool uses advanced AI technology from Anthropic's Claude to analyze your symptoms and provide guidance based on medical triage principles. The AI considers severity, urgency, and red flags to make conservative, safety-first recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Commitment</h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Safety First</p>
                    <p className="text-sm">
                      When in doubt, our AI errs on the side of caution and recommends higher levels of care. Your safety is our top priority.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                We are committed to:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Providing accurate, evidence-based information</li>
                <li>Never replacing professional medical advice</li>
                <li>Maintaining user privacy and data security</li>
                <li>Continuously improving our AI algorithms</li>
                <li>Being transparent about limitations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Important Disclaimers</h2>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4">
                <p className="font-semibold text-red-900 mb-2">This Is NOT Medical Advice</p>
                <p className="text-sm text-red-800">
                  This tool provides general information and guidance only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.
                </p>
              </div>

              <p className="font-semibold mt-4">Always Call 911 If You Experience:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Chest pain or pressure</li>
                <li>Difficulty breathing</li>
                <li>Severe bleeding</li>
                <li>Loss of consciousness</li>
                <li>Stroke symptoms</li>
                <li>Any life-threatening emergency</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We're Funded</h2>
              <p>
                To keep this service free for users, we display advertisements through Google AdSense and earn commissions through the Amazon Associates program when you purchase recommended health products. We may also partner with telemedicine providers.
              </p>
              <p className="mt-3">
                These partnerships help us maintain and improve the service while keeping it accessible to everyone at no cost. See our <Link to="/affiliate-disclosure" className="text-blue-600 hover:text-blue-700">Affiliate Disclosure</Link> for full details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p>
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <p className="mt-3">
                Email: sushilnareshsingh@gmail.com<br />
                Website: ervsurgentcare.com
              </p>
              <p className="mt-3">
                <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Visit our Contact page →
                </Link>
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
