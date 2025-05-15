import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className={`ml-2 font-serif text-2xl font-bold ${isScrolled ? 'text-amber-800' : 'text-amber-800'}`}>
            BubbleTea
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" label="Home" isScrolled={isScrolled} />
          <NavLink to="/menu" label="Menu" isScrolled={isScrolled} />
          <NavLink to="#" label="About" isScrolled={isScrolled} />
          <NavLink to="#" label="Contact" isScrolled={isScrolled} />
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/cart" 
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-amber-100' : 'hover:bg-white/20'
            }`}
          >
            <ShoppingBag className={isScrolled ? 'text-amber-800' : 'text-amber-800'} size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-amber-800' : 'text-amber-800'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-amber-800' : 'text-amber-800'} size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/menu" label="Menu" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="#" label="About" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="#" label="Contact" onClick={() => setMobileMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, isScrolled }) => (
  <Link 
    to={to} 
    className={`font-medium transition-colors ${
      isScrolled ? 'text-amber-900 hover:text-amber-600' : 'text-amber-900 hover:text-amber-700'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link 
    to={to} 
    className="text-amber-900 hover:text-amber-600 font-medium py-2"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;