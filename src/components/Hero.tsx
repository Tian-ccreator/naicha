import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-amber-50 min-h-screen flex flex-col justify-center">
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble absolute rounded-full bg-amber-200 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: -100,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
            Discover Perfect 
            <span className="text-amber-600"> Bubble Tea</span> Happiness
          </h1>
          <p className="mt-4 text-lg text-amber-800 md:text-xl max-w-md">
            Indulge in our premium milk teas crafted with the finest ingredients and a passion for perfection.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center"
            >
              Explore Menu
              <ChevronRight size={20} className="ml-1" />
            </Link>
            <Link
              to="#"
              className="bg-transparent border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
            <img
              src="https://images.pexels.com/photos/4187768/pexels-photo-4187768.jpeg"
              alt="Bubble Tea Collection"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-amber-200 rounded-lg -z-10" />
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <a href="#features" className="text-amber-800 hover:text-amber-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>

      {/* CSS for animated bubbles */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .bubble {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;