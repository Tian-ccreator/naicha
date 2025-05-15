import React, { useState } from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TeaItem } from '../types';
import ReviewSection from './ReviewSection';

interface TeaCardProps {
  tea: TeaItem;
}

const TeaCard: React.FC<TeaCardProps> = ({ tea }) => {
  const [selectedSize, setSelectedSize] = useState<string>(Object.keys(tea.prices)[0]);
  const [showReviews, setShowReviews] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(tea, selectedSize);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-56 overflow-hidden relative group">
        <img 
          src={tea.image} 
          alt={tea.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tea.isPopular && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-amber-900">{tea.name}</h3>
          {tea.averageRating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="ml-1 text-sm text-amber-700">
                {tea.averageRating.toFixed(1)} ({tea.totalReviews})
              </span>
            </div>
          )}
        </div>
        
        <p className="text-amber-700 mt-1 h-12 overflow-hidden">{tea.description}</p>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-amber-800 mb-2">Select Size:</p>
          <div className="flex space-x-2 mb-4">
            {Object.entries(tea.prices).map(([size, price]) => (
              <button
                key={size}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedSize === size
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size} ${price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-colors"
          >
            <Plus size={16} />
            <span>Add to Cart</span>
          </button>
        </div>

        {showReviews && (
          <div className="mt-4 pt-4 border-t border-amber-100">
            <ReviewSection teaId={tea.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaCard;