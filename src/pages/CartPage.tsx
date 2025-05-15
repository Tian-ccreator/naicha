import React from 'react';
import Cart from '../components/Cart';
import RecommendationSection from '../components/RecommendationSection';

const CartPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl font-bold text-amber-900 mb-8 text-center">
          Your Shopping Cart
        </h1>
        <div className="max-w-3xl mx-auto">
          <Cart />
        </div>
      </div>
      <div className="mt-16">
        <RecommendationSection />
      </div>
    </div>
  );
};

export default CartPage;