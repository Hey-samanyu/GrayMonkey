import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Send, Signal, Wifi, Battery, ChevronLeft, MoreHorizontal, Mail, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

const Hero: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleRating = (r: number) => {
    setRating(r);
  };

  const handleSubmitReview = () => {
    if (rating === 0) return;
    setIsSending(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      
      // Show automated reply after a delay
      setTimeout(() => {
        setShowReply(true);
      }, 1500);
    }, 800);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <a href="https://app.youform.com/forms/68kejvwx" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm hover:bg-blue-500/20 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Coming Soon - Join the Waitlist
            </a>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Get More <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">5-Star Reviews</span> on Autopilot
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Automated review requests for gyms and salons. We're putting the finishing touches on the platform. Join the waitlist to get early access and 50% off your first month.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://app.youform.com/forms/68kejvwx"
                className="bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Join the Waitlist <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            
            <p className="mt-6 text-sm text-gray-500 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                2,143 gyms & salons already joined
            </p>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Priority Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Lock in Beta Pricing</span>
              </div>
            </div>
          </div>

          {/* Phone Illustration */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-[340px] perspective-1000 mt-12 lg:mt-0">
             {/* Decorative blob behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* Phone Frame */}
            <div className="relative bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-gray-800 ring-1 ring-white/10">
              {/* Realistic Side Buttons */}
              <div className="absolute top-24 -left-[10px] h-10 w-1.5 bg-gray-700 rounded-l-md shadow-sm"></div> {/* Mute */}
              <div className="absolute top-40 -left-[10px] h-16 w-1.5 bg-gray-700 rounded-l-md shadow-sm"></div> {/* Vol Up */}
              <div className="absolute top-60 -left-[10px] h-16 w-1.5 bg-gray-700 rounded-l-md shadow-sm"></div> {/* Vol Down */}
              <div className="absolute top-48 -right-[10px] h-20 w-1.5 bg-gray-700 rounded-r-md shadow-sm"></div> {/* Power */}

              {/* Screen Container */}
              <div className="bg-white rounded-[3rem] overflow-hidden h-[700px] relative flex flex-col w-full shadow-inner select-none">
                
                {/* Glass Reflection Effect */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-white/20 via-transparent to-transparent pointer-events-none z-30 opacity-50 rounded-[3rem]"></div>

                {/* Status Bar */}
                <div className="h-12 w-full flex justify-between items-center px-6 pt-3 z-20 absolute top-0 left-0">
                  <span className="text-xs font-semibold text-gray-900">9:41</span>
                  <div className="flex items-center gap-1.5 text-gray-900">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-gray-900 rounded-b-2xl z-30 flex items-center justify-center gap-4">
                    <div className="w-10 h-1 bg-gray-800 rounded-full"></div> {/* Speaker */}
                    <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full border border-gray-700"></div> {/* Camera */}
                </div>

                {/* App Header */}
                <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 pt-12 pb-3 px-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2 text-blue-500">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm">Back</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm mb-1">
                       <Logo className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">Business</span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 flex flex-col gap-4 bg-gray-50 overflow-y-auto pb-8">
                  <div className="self-center text-[10px] font-medium text-gray-400 my-2">Today 9:41 AM</div>
                  
                  {/* Incoming Message */}
                  <div className="self-start max-w-[85%] animate-fade-in-up">
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-[13px] text-gray-800 leading-relaxed relative">
                      <p>Hi Sarah! 👋 Thanks for visiting <strong>Elite Fitness</strong> today. We hope you had a great workout!</p>
                      <p className="mt-2">Would you mind taking 10 seconds to share your experience?</p>
                      {/* Tail */}
                      <svg className="absolute top-0 -left-2 w-2.5 h-3 fill-white" viewBox="0 0 10 10">
                        <path d="M10 0v10L0 0h10z" />
                      </svg>
                    </div>
                  </div>

                  {/* Interactive Review Card */}
                  {!isSubmitted ? (
                    <div className={`self-start max-w-[85%] w-full transition-all duration-500 ${isSending ? 'scale-95 opacity-80' : 'scale-100'}`}>
                      <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow">
                        <div className="text-center mb-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rate your experience</span>
                        </div>
                        <div className="flex gap-1.5 justify-center mb-4">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              className="focus:outline-none transform transition-transform active:scale-90"
                              onMouseEnter={() => setHoverRating(s)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => handleRating(s)}
                            >
                              <Star 
                                className={`w-8 h-8 transition-colors duration-200 ${
                                  s <= (hoverRating || rating) 
                                    ? 'text-yellow-400 fill-current drop-shadow-sm' 
                                    : 'text-gray-200 fill-gray-50'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={handleSubmitReview}
                          disabled={rating === 0 || isSending}
                          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2
                            ${rating > 0 
                              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          {isSending ? (
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Leave a Review <Send className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Success State
                    <div className="self-end max-w-[85%] w-auto animate-fade-in-up">
                       <div className="bg-blue-500 p-3.5 rounded-2xl rounded-tr-none shadow-md text-white text-[13px] relative overflow-hidden">
                          {rating === 5 && (
                            // Confetti Background
                            <div className="absolute inset-0 pointer-events-none opacity-20">
                               <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                               <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                               <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-75"></div>
                            </div>
                          )}
                          <p className="flex items-center gap-1.5">
                            Rated {rating} stars! 
                            {[...Array(rating)].map((_, i) => (
                               <Star key={i} className="w-3 h-3 fill-current text-yellow-300" />
                            ))}
                          </p>
                          <p className="mt-1 font-medium">Done! Loved the new equipment.</p>
                          {/* Tail */}
                          <svg className="absolute top-0 -right-2 w-2.5 h-3 fill-blue-500" viewBox="0 0 10 10">
                            <path d="M0 0v10l10-10H0z" />
                          </svg>
                       </div>
                       <div className="text-right text-[10px] text-gray-400 mt-1 flex justify-end items-center gap-1">
                          Delivered <CheckCircle className="w-3 h-3 text-gray-400" />
                       </div>
                    </div>
                  )}

                  {/* Automated Reply */}
                  {showReply && (
                     <div className="self-start max-w-[85%] animate-fade-in-up">
                      <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-[13px] text-gray-800 relative">
                        <p>Thank you so much! 🎉 We appreciate the feedback. See you next time!</p>
                         <svg className="absolute top-0 -left-2 w-2.5 h-3 fill-white" viewBox="0 0 10 10">
                            <path d="M10 0v10L0 0h10z" />
                          </svg>
                      </div>
                      <div className="text-left text-[10px] text-gray-400 mt-1">Just now</div>
                    </div>
                  )}

                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full opacity-20"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
        </svg>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;