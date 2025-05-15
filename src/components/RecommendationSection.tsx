import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { teaData } from '../data/teaData';
import TeaCard from './TeaCard';
import { TeaItem } from '../types';
import { supabase } from '../lib/supabase';

const RecommendationSection = () => {
  const { cartItems } = useCart();
  const [recommendations, setRecommendations] = useState<TeaItem[]>([]);
  
  useEffect(() => {
    loadRecommendations();
  }, [cartItems]);

  const loadRecommendations = async () => {
    // Get categories and flavors from cart items
    const cartItemIds = cartItems.map(item => item.id);
    const cartTeas = teaData.filter(tea => cartItemIds.includes(tea.id));
    const cartCategories = new Set(cartTeas.map(tea => tea.category));
    const cartFlavors = new Set(cartTeas.flatMap(tea => tea.flavors || []));

    // Get average ratings for all teas
    const { data: reviewData } = await supabase
      .from('reviews')
      .select('tea_id, rating');

    // Calculate average ratings
    const ratings = reviewData?.reduce((acc, review) => {
      if (!acc[review.tea_id]) {
        acc[review.tea_id] = { sum: 0, count: 0 };
      }
      acc[review.tea_id].sum += review.rating;
      acc[review.tea_id].count += 1;
      return acc;
    }, {} as Record<string, { sum: number; count: number }>);

    // Generate recommendations based on cart items and ratings
    const recommendedTeas = teaData
      .filter(tea => {
        // Don't recommend items already in cart
        if (cartItemIds.includes(tea.id)) return false;
        
        // Calculate score based on multiple factors
        let score = 0;
        
        // Add points for matching category
        if (cartCategories.has(tea.category)) score += 2;
        
        // Add points for matching flavors
        if (tea.flavors) {
          const matchingFlavors = tea.flavors.filter(flavor => cartFlavors.has(flavor));
          score += matchingFlavors.length;
        }
        
        // Add points for high ratings
        if (ratings && ratings[tea.id]) {
          const avgRating = ratings[tea.id].sum / ratings[tea.id].count;
          score += avgRating;
        }
        
        return score > 2; // Threshold for recommendation
      })
      .sort((a, b) => {
        const aRating = ratings?.[a.id]?.sum / ratings?.[a.id]?.count || 0;
        const bRating = ratings?.[b.id]?.sum / ratings?.[b.id]?.count || 0;
        return bRating - aRating;
      })
      .slice(0, 4);

    setRecommendations(recommendedTeas);
  };
  
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-900 mb-2">
            Recommended for You
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Based on your choices and customer favorites
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(tea => (
            <TeaCard key={tea.id} tea={tea} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;