import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryTime: '30-45 minutes',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment and send the order
    // For demo purposes, we'll just simulate success
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={28} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-amber-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-amber-700 mb-8">
              Your order has been placed successfully. We'll deliver your bubble tea shortly!
            </p>
            <div className="bg-amber-50 p-4 rounded-lg mb-8">
              <p className="text-amber-800 font-medium">
                Estimated delivery time: {formData.deliveryTime}
              </p>
              <p className="text-amber-800">
                We've sent a confirmation email to {formData.email}
              </p>
            </div>
            <Link
              to="/"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors inline-block"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl font-bold text-amber-900 mb-8 text-center">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
                Delivery Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-amber-800 mb-1" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 mb-1" htmlFor="deliveryTime">
                      Delivery Time
                    </label>
                    <select
                      id="deliveryTime"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                    >
                      <option value="30-45 minutes">As soon as possible (30-45 min)</option>
                      <option value="1 hour">In about 1 hour</option>
                      <option value="2 hours">In about 2 hours</option>
                      <option value="3 hours">In about 3 hours</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-amber-800 mb-1" htmlFor="address">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none mb-4"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-800 mb-1" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-amber-800 mb-1" htmlFor="zipCode">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
                  Payment Method
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="h-4 w-4 border-amber-200 focus:ring-amber-600"
                    />
                    <label htmlFor="card" className="ml-2 text-amber-800">
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="h-4 w-4 border-amber-200 focus:ring-amber-600"
                    />
                    <label htmlFor="cash" className="ml-2 text-amber-800">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="mb-6 p-4 border-2 border-amber-200 rounded-md bg-amber-50">
                    <p className="text-amber-800 mb-2">
                      For demo purposes, no actual payment will be processed.
                    </p>
                    <p className="text-amber-800">
                      In a real application, a secure payment form would be here.
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full py-3 rounded-full font-medium transition-colors"
                >
                  Place Order (${(getCartTotal() + 2.99).toFixed(2)})
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-amber-900 mb-4">
                  Order Summary
                </h2>
                
                <div className="divide-y divide-amber-100">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="py-3 flex">
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <p className="text-amber-900 text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-amber-600">Size: {item.size} × {item.quantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-amber-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;