import React from 'react';
import { Logo } from './Logo';
import { Star } from 'lucide-react';

interface NavbarProps {
  onLogin?: () => void;
  onDemoRate?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onDemoRate }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="transition-transform group-hover:scale-105">
              <Logo className="w-12 h-12" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight group-hover:text-gray-200 transition-colors">
              Gray Monkey
            </span>
          </div>

          {/* Links - Hidden on mobile for simplicity in this demo */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</a>
            {/* Demo Link */}
            <button 
                onClick={onDemoRate}
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium flex items-center gap-1"
            >
                <Star className="w-4 h-4 fill-current" />
                Demo: Customer View
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="text-white font-medium hover:text-gray-300 transition-colors px-2"
            >
              Log in
            </button>
            <a 
              href="https://app.youform.com/forms/68kejvwx"
              className="hidden sm:inline-block bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm transform hover:scale-105"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;