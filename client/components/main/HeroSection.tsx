'use client'
import { ArrowRight, Zap, Shield, Users } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Real-time messaging platform
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Connect with friends
                  <span className="block text-blue-500">instantly</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience seamless communication with real-time messaging, 
                  intuitive interface, and secure connections.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/auth/signup"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#features"
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column - Visual/Mockup */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
              <div className="absolute -bottom-8 right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
              
              {/* Chat Interface Mockup */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Mockup Header */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Alice</div>
                  </div>
                </div>

                {/* Mockup Messages */}
                <div className="bg-gray-50 p-6 space-y-4 h-80">
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-sm max-w-xs">
                      <p className="text-gray-900">Hey! How are you?</p>
                      <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                      <p>I&apos;m great! Just checking out this new chat app.</p>
                      <p className="text-xs text-blue-100 mt-1">2:31 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-sm max-w-xs">
                      <p className="text-gray-900">It looks amazing! Love the interface 🎉</p>
                      <p className="text-xs text-gray-500 mt-1">2:32 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                      <p>Right? Super clean and fast!</p>
                      <p className="text-xs text-blue-100 mt-1">2:33 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default HeroSection