import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import RatingPage from './components/RatingPage';

const App: React.FC = () => {
  // Simple state-based routing for demo purposes
  const [view, setView] = useState<'landing' | 'dashboard' | 'rating'>('landing');

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  if (view === 'rating') {
    return <RatingPage onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <Navbar 
        onLogin={() => setView('dashboard')} 
        onDemoRate={() => setView('rating')}
      />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default App;