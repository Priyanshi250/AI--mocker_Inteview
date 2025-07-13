"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-900">
        <div className="absolute inset-0 opacity-30">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g fill="none" fillRule="evenodd">
              <g fill="rgba(255,255,255,0.05)">
                <circle cx="30" cy="30" r="2"/>
              </g>
            </g>
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-red-500 to-black rounded-full blur-3xl opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-red-700 to-black rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-red-600 rounded-full blur-2xl opacity-30 animate-spin"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-black via-zinc-800 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-2xl animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white animate-ping"></div>
              </div>
              <div>
                {/* Adjusted gradient for high contrast */}
                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent leading-tight drop-shadow-lg">
                  AI Interview
                </h1>
                <h1 className="text-5xl font-black bg-gradient-to-r from-red-500 via-white to-red-700 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                  MOCKER
                </h1>
              </div>
            </div>
            <p className="text-xl text-white font-semibold mb-2 drop-shadow">
              🚀 Master Your Interviews with AI-Powered Practice
            </p>
            <p className="text-white text-lg drop-shadow">
              Get real-time feedback, personalized questions, and ace your next interview!
            </p>
          </div>

          {/* Sign In Card */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/40 p-8 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-red-900/20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-700/30 to-black/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3 drop-shadow">
                  Welcome Back! 👋
                </h2>
                <p className="text-white/80 text-lg drop-shadow">
                  Ready to crush your next interview?
                </p>
              </div>

              {/* Enhanced Clerk SignIn Component */}
              <div className="clerk-signin-wrapper">
                <SignIn 
                  redirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 p-0 bg-transparent",
                      headerTitle: "text-2xl font-bold text-white mb-2 drop-shadow",
                      headerSubtitle: "text-white/80 text-lg drop-shadow",
                      formButtonPrimary: "w-full bg-gradient-to-r from-black via-red-600 to-red-500 hover:from-black hover:via-red-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
                      formFieldInput: "w-full px-6 py-4 bg-black/30 border-2 border-red-900/40 rounded-xl focus:ring-4 focus:ring-red-400/50 focus:border-red-400 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300",
                      formFieldLabel: "text-white font-semibold mb-3 block text-lg drop-shadow",
                      footerActionLink: "text-red-300 hover:text-red-200 font-semibold transition-colors duration-200",
                      dividerLine: "bg-red-900/30",
                      dividerText: "text-white/60 bg-transparent px-4 font-medium drop-shadow",
                      socialButtonsBlockButton: "w-full bg-black/30 border-2 border-red-900/40 hover:bg-red-900/20 hover:border-red-700/40 transition-all duration-300 rounded-xl py-4 text-white font-semibold backdrop-blur-sm",
                      formFieldLabelRow: "mb-3",
                      formFieldRow: "mb-6",
                      footer: "mt-8 pt-8 border-t border-red-900/30",
                      formFieldInputShowPasswordButton: "text-white/60 hover:text-white transition-colors duration-200",
                      formFieldInputShowPasswordButtonIcon: "w-5 h-5",
                      formFieldInputShowPasswordButtonIconPath: "stroke-current"
                    },
                    layout: {
                      socialButtonsPlacement: "bottom",
                      showOptionalFields: false
                    },
                    variables: {
                      colorPrimary: "#ef4444",
                      colorText: "#FFFFFF",
                      colorTextSecondary: "rgba(255, 255, 255, 0.8)",
                      colorBackground: "transparent",
                      colorInputBackground: "rgba(0, 0, 0, 0.3)",
                      colorInputText: "#FFFFFF"
                    }
                  }}
                />
              </div>

              {/* Features Showcase */}
              <div className="mt-10 pt-8 border-t border-red-900/30">
                <h3 className="text-xl font-bold text-white mb-6 text-center drop-shadow">
                  ✨ What You'll Get
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center p-4 bg-black/30 rounded-2xl border border-red-900/30 backdrop-blur-sm hover:bg-red-900/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-black rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg drop-shadow">AI-Powered Mock Interviews</h4>
                      <p className="text-white/70 text-sm drop-shadow">Practice with intelligent AI that adapts to your responses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-black/30 rounded-2xl border border-red-900/30 backdrop-blur-sm hover:bg-red-900/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-black rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg drop-shadow">Real-Time Analytics</h4>
                      <p className="text-white/70 text-sm drop-shadow">Get instant feedback and performance insights</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-black/30 rounded-2xl border border-red-900/30 backdrop-blur-sm hover:bg-red-900/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg drop-shadow">Personalized Questions</h4>
                      <p className="text-white/70 text-sm drop-shadow">Questions tailored to your industry and experience level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm drop-shadow">
              By signing in, you agree to our{" "}
              <a href="#" className="text-red-300 hover:text-red-200 font-semibold transition-colors duration-200">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-red-300 hover:text-red-200 font-semibold transition-colors duration-200">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 