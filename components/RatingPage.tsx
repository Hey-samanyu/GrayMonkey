import React, { useState } from 'react';
import { Star, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface RatingPageProps {
  businessName?: string;
  customerName?: string;
  onBack?: () => void;
}

const RatingPage: React.FC<RatingPageProps> = ({ 
  businessName = "Elite Fitness", 
  customerName = "Sarah",
  onBack 
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Logic: 4-5 stars is positive, 1-3 stars is negative
  const isPositive = rating >= 4;

  const handleRating = (r: number) => {
    setRating(r);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send feedback to API
  };

  const handleGoogleClick = () => {
    // In a real app, verify click and redirect
    window.open('https://google.com', '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-fade-in-up">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
           <p className="text-gray-500 mb-8">
             {isPositive 
               ? "Your review helps us grow and serve you better." 
               : "We appreciate your honest feedback and will look into this immediately."}
           </p>
           {onBack && (
             <button 
               onClick={onBack}
               className="text-gray-400 hover:text-gray-600 text-sm font-medium"
             >
               Close Demo
             </button>
           )}
        </div>
        <div className="mt-8 opacity-50 grayscale">
            <div className="flex items-center justify-center gap-2">
                <Logo className="w-6 h-6" />
                <span className="text-xs font-semibold text-gray-400">Powered by Gray Monkey</span>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Optional Back Button for Demo */}
      {onBack && (
        <button 
            onClick={onBack}
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 z-10"
        >
            <ArrowLeft className="w-6 h-6" />
        </button>
      )}

      <div className="flex-1 flex flex-col items-center max-w-[400px] mx-auto w-full p-6 pt-12">
        
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-sm border-4 border-white ring-1 ring-gray-100 overflow-hidden">
             {/* Placeholder Business Logo */}
             <div className="text-2xl font-bold text-gray-400">EF</div>
          </div>
          <h1 className="text-lg font-medium text-gray-500 mb-1">{businessName}</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hi {customerName}! 👋</h2>
        </div>

        {/* Main Question */}
        <div className="w-full text-center mb-8 animate-fade-in-up delay-100">
           <p className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
             How was your experience at<br/>{businessName}?
           </p>

           {/* Stars */}
           <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    className={`w-12 h-12 transition-all duration-200 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                        : "fill-gray-100 text-gray-200"
                    }`}
                  />
                </button>
              ))}
           </div>
           <div className="h-6 text-sm font-medium text-yellow-500 transition-opacity duration-300">
              {hoverRating === 5 && "Excellent!"}
              {hoverRating === 4 && "Great!"}
              {hoverRating === 3 && "Average"}
              {hoverRating === 2 && "Poor"}
              {hoverRating === 1 && "Terrible"}
           </div>
        </div>

        {/* Conditional Logic Area */}
        <div className={`w-full transition-all duration-500 ease-in-out ${rating > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          
          {/* POSITIVE FLOW (4-5 Stars) */}
          {rating >= 4 && (
             <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 text-center shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">That's awesome! 🤩</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  We're glad you enjoyed your visit. It would mean the world to us if you shared that on Google.
                </p>
                <button 
                  onClick={handleGoogleClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Leave Google Review <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  This helps other customers find us
                </p>
             </div>
          )}

          {/* NEGATIVE FLOW (1-3 Stars) */}
          {rating > 0 && rating <= 3 && (
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-center shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">We're sorry to hear that 😔</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  We want to do better. Can you tell us what went wrong?
                </p>
                <form onSubmit={handleSubmitFeedback}>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm min-h-[120px] mb-4 resize-none bg-white"
                    placeholder="Your feedback helps us improve..."
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Send Private Feedback
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  🔒 This is private and won't be posted publicly
                </p>
            </div>
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="py-8 text-center opacity-50 grayscale">
        <div className="flex items-center justify-center gap-2">
            <Logo className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-400">Powered by Gray Monkey</span>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default RatingPage;