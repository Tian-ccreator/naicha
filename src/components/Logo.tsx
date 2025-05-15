import React from 'react';
import { CupSoda as Cup } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative">
      <Cup size={32} className="text-amber-800" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-600 rounded-full animate-bounce" />
    </div>
  );
};

export default Logo;