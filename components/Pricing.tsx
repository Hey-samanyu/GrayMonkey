import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const features = [
    "Unlimited review requests",
    "Unlimited customers",
    "Smart sentiment filtering",
    "Dashboard analytics",
    "Google & Facebook integration",
    "Priority email support",
    "Cancel anytime"
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-900 text-white relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            One plan, everything included. Lock in early-bird pricing today.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors duration-300">
          <div className="p-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-100">Pro Plan</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-white">$49</span>
                  <span className="text-xl text-gray-400">/mo</span>
                </div>
              </div>
              <div className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                Early Access
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="ml-3 text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <a 
              href="https://app.youform.com/forms/68kejvwx"
              className="block w-full text-center bg-white hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Join Waitlist for Early Access
            </a>
            <p className="mt-4 text-center text-sm text-gray-500">
              Limited spots available for beta launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;