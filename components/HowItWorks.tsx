import React from 'react';
import { UserPlus, MessageCircle, Star } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus className="w-6 h-6 text-gray-800" />,
      title: "Add Your Customers",
      description: "After a visit, simply enter your customer's name and phone number into our dashboard. Or, connect your CRM for auto-sync."
    },
    {
      id: 2,
      icon: <MessageCircle className="w-6 h-6 text-gray-800" />,
      title: "We Follow Up Automatically",
      description: "Our system waits for the perfect moment (usually 24h later) to send a polite, personalized SMS asking for feedback."
    },
    {
      id: 3,
      icon: <Star className="w-6 h-6 text-gray-800" />,
      title: "Watch Reviews Roll In",
      description: "Customers click the link. Positive reviews go straight to Google, while negative feedback stays private. You get notified instantly."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            It's as easy as 1-2-3
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Start getting more reviews in less than 5 minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-gray-500 transition-colors duration-300 relative">
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                    {step.id}
                  </span>
                  <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;