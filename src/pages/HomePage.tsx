import React from 'react';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import TeaList from '../components/TeaList';
import RecommendationSection from '../components/RecommendationSection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <TeaList />
      <RecommendationSection />
    </div>
  );
};

export default HomePage;