import React from 'react';
import { Leaf, Truck, Clock, ThumbsUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Leaf className="text-amber-600" size={32} />,
      title: 'Premium Ingredients',
      description: 'We use only the finest quality tea leaves and fresh ingredients for an authentic flavor.'
    },
    {
      icon: <Truck className="text-amber-600" size={32} />,
      title: 'Fast Delivery',
      description: 'Enjoy your favorite bubble tea delivered to your doorstep within 30 minutes.'
    },
    {
      icon: <Clock className="text-amber-600" size={32} />,
      title: 'Freshly Made',
      description: 'Every drink is prepared fresh to order, ensuring the perfect taste every time.'
    },
    {
      icon: <ThumbsUp className="text-amber-600" size={32} />,
      title: 'Customizable',
      description: 'Adjust sweetness, ice level, and toppings to create your perfect bubble tea.'
    }
  ];

  return (
    <div id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Why Choose Our Bubble Tea
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Experience the difference that quality ingredients and passionate craftsmanship make.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-amber-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-amber-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;