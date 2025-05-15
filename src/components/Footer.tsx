import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 font-serif text-2xl font-bold text-white">BubbleTea</span>
            </div>
            <p className="text-amber-100 mb-4">
              Crafting the perfect bubble tea experience since 2023. Made with love and premium ingredients.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Instagram size={20} />} href="#" />
              <SocialLink icon={<Facebook size={20} />} href="#" />
              <SocialLink icon={<Twitter size={20} />} href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/menu" label="Menu" />
              <FooterLink href="#" label="About Us" />
              <FooterLink href="#" label="Contact" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Bubble Street, Tea Town, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>hello@bubbletea.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-200">
          <p>&copy; {new Date().getFullYear()} BubbleTea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 flex items-center justify-center transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }) => (
  <li>
    <Link to={href} className="text-amber-100 hover:text-white transition-colors">
      {label}
    </Link>
  </li>
);

export default Footer;