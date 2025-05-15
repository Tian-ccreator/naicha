import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="font-serif text-2xl font-bold text-amber-900 mb-4">Your Cart is Empty</h2>
        <p className="text-amber-700 mb-6">Explore our menu and add some delicious teas to your cart!</p>
        <Link 
          to="/menu" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
        >
          View Menu
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="font-serif text-2xl font-bold text-amber-900 mb-4">Your Cart</h2>
        
        <div className="divide-y divide-amber-100">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="py-4 flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-amber-900">{item.name}</h3>
                <p className="text-sm text-amber-600">Size: {item.size}</p>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  className="text-amber-800 hover:text-amber-600 p-1"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="text-amber-800 hover:text-amber-600 p-1"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="ml-4 text-right">
                <div className="font-medium text-amber-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-amber-800 hover:text-amber-600 p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-amber-50 p-6">
        <div className="flex justify-between mb-2">
          <span className="text-amber-800">Subtotal</span>
          <span className="font-medium text-amber-900">${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-amber-800">Delivery Fee</span>
          <span className="font-medium text-amber-900">$2.99</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className="text-amber-900">Total</span>
          <span className="text-amber-900">${(getCartTotal() + 2.99).toFixed(2)}</span>
        </div>
        
        <Link
          to="/checkout"
          className="mt-6 bg-amber-600 hover:bg-amber-700 text-white w-full py-3 rounded-full font-medium transition-colors flex items-center justify-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;