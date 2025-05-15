import React, { useState } from 'react';
import TeaCard from './TeaCard';
import { teaData } from '../data/teaData';
import { TeaItem } from '../types';

const TeaList = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['all', ...new Set(teaData.map(tea => tea.category))];

  const filteredTeas = teaData.filter(tea => {
    const matchesCategory = activeCategory === 'all' || tea.category === activeCategory;
    const matchesSearch = tea.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tea.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Our Tea Collection
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Explore our wide range of premium milk teas, from classic favorites to unique signature creations.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    activeCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search teas..."
                className="w-full px-4 py-2 rounded-full border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {filteredTeas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-amber-800">No teas found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeas.map(tea => (
              <TeaCard key={tea.id} tea={tea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaList;