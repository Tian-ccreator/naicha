import React from 'react';
import TeaList from '../components/TeaList';
import RecommendationSection from '../components/RecommendationSection';

const MenuPage = () => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-4 text-center">
          Our Bubble Tea Menu
        </h1>
      </div>
      <TeaList />
      <RecommendationSection />
    </div>
  );
};

export default MenuPage;