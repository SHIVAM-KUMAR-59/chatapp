'use client'

import { MessageCircle, ArrowRight, Zap, Shield, Users } from "lucide-react"

const FeaturesSection = () => {
  return (
          <div id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need for
              <span className="block text-blue-500">seamless communication</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology to give you the best messaging experience
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Real-time Messaging
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instant message delivery with WebSocket technology. Your conversations happen in real-time, no delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Modern & Minimal Interface
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Beautiful, minimalist interface designed to reduce clutter, making user experience better and chat smoother.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy Friend Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find and connect with friends effortlessly. Search, add, and manage your contacts in one place.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Clean Interface
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive design that&apos;s easy to navigate. Focus on your conversations without distractions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Works seamlessly across all devices. Chat on your phone, tablet, or desktop with the same great experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized performance for instant loading. No lag, no waiting - just pure speed and efficiency.
              </p>
            </div>
          </div>

          {/* CTA Section within Features */}
          <div className="mt-16 text-center">
            <div className="bg-blue-500 rounded-3xl p-12 md:p-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join to enjoy seamless communication. Create your free account today.
              </p>
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-500 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Start Chatting Now
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FeaturesSection