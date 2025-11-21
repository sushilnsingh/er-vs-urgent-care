import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';

export default function AffiliateDisclosure() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>
          <p className="text-sm text-gray-600 mb-6">Last Updated: November 21, 2024</p>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">FTC Disclosure</h2>
              <p>
                In accordance with the Federal Trade Commission (FTC) guidelines, we are required to disclose that ER vs Urgent Care participates in affiliate marketing programs and may earn commissions from purchases made through links on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">What Are Affiliate Links?</h2>
              <p>
                Affiliate links are special URLs that track when you click on them and make a purchase. If you buy a product through our affiliate link, we earn a small commission at no additional cost to you. The price you pay is exactly the same whether you use our link or not.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Affiliate Partnerships</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Amazon Associates Program</p>
                    <p className="text-sm">
                      We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4">
                When you click on Amazon product links on our site and make a purchase, we may earn a commission (typically 4-8% of the purchase price). This helps us keep our service free for all users.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Google AdSense</h3>
              <p>
                We display advertisements through Google AdSense. Google may use cookies and other technologies to show you relevant ads based on your interests. We earn revenue when visitors view or click on these advertisements.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Telemedicine Partnerships</h3>
              <p>
                We may partner with telemedicine providers and earn commissions when users sign up for their services. These partnerships help us provide better resources to our users while supporting our free service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Commitment to You</h2>
              <p>
                We take our responsibility to you seriously. Here's what we promise:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Honest Recommendations:</strong> We only recommend products and services we believe will be genuinely helpful to our users</li>
                <li><strong>No Extra Cost:</strong> Affiliate commissions never increase the price you pay</li>
                <li><strong>Transparency:</strong> We clearly disclose when content contains affiliate links</li>
                <li><strong>Independence:</strong> Our medical guidance is not influenced by affiliate relationships</li>
                <li><strong>Quality First:</strong> We prioritize user experience over commission potential</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Product Recommendations</h2>
              <p>
                The health and safety products we recommend (such as first aid kits, thermometers, and blood pressure monitors) are chosen based on:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Quality and reliability</li>
                <li>Customer reviews and ratings</li>
                <li>Relevance to our users' needs</li>
                <li>Safety and effectiveness</li>
              </ul>
              <p className="mt-3">
                While we may earn commissions from these recommendations, we only feature products we genuinely believe will benefit our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Medical Guidance Independence</h2>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 my-4">
                <p className="font-semibold text-green-900 mb-2">Important Guarantee</p>
                <p className="text-sm text-green-800">
                  Our AI-powered medical triage recommendations are completely independent of any affiliate relationships. We do NOT alter medical guidance based on potential commissions. Your safety is always our top priority.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why We Use Affiliate Marketing</h2>
              <p>
                Maintaining and improving our free AI-powered medical guidance tool requires significant resources, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>AI API costs (Claude by Anthropic)</li>
                <li>Web hosting and domain fees</li>
                <li>Ongoing development and improvements</li>
                <li>Security and maintenance</li>
              </ul>
              <p className="mt-3">
                Affiliate commissions and advertising revenue help us cover these costs while keeping the tool free and accessible to everyone who needs it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Choice</h2>
              <p>
                Using affiliate links is entirely optional. You are free to:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Visit Amazon or other retailers directly without using our links</li>
                <li>Search for products independently</li>
                <li>Use ad blockers (though it reduces our ability to keep the service free)</li>
              </ul>
              <p className="mt-3">
                We appreciate users who support us by using our affiliate links, as it helps us continue providing this free service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Questions About Affiliate Disclosure</h2>
              <p>
                If you have questions about our affiliate relationships or disclosure practices, please contact us at:
              </p>
              <p className="mt-2">
                Email: sushilnareshsingh@gmail.com<br />
                Website: ervsurgentcare.com
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Disclosure Statement</h3>
              <p className="text-sm">
                "We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites. We also display Google AdSense advertisements and may partner with telemedicine providers. We may earn commissions from purchases or signups made through links on our website. These commissions help support our free service but do not influence our medical guidance or recommendations. For more information, see our Privacy Policy and Terms and Conditions."
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
