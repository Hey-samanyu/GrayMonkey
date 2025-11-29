import React from 'react';
import { Clock, ShieldCheck, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      color: "bg-gray-800",
      title: "Automated Follow-Ups",
      description: "We automatically send a friendly text request 24 hours after a customer visits. Timing is everything, and we nail it every time."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: "bg-slate-700",
      title: "Smart Filtering",
      description: "Our intelligent system directs happy customers to Google reviews, while unhappy feedback is routed privately to you so you can fix it."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      color: "bg-zinc-600",
      title: "Simple Setup",
      description: "No technical skills needed. Add your customers in seconds or sync with your existing scheduling software. We handle the rest."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-gray-500 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to grow your reputation
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Gray Monkey handles the awkward "ask" for you, ensuring a steady stream of positive feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 transition-transform hover:-translate-y-2 duration-300 border border-gray-100">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center shadow-lg mb-6 rotate-3`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;