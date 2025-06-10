"use client";

import React, { useState } from 'react';
import { Star, ArrowRight, Shield, Clock, Award, MapPin, Phone, Mail, Menu, X } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Home Cleaning",
      description: "Professional deep cleaning services",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      rating: 4.8,
      price: "₹299"
    },
    {
      title: "Salon at Home",
      description: "Beauty services at your doorstep",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      rating: 4.9,
      price: "₹399"
    },
    {
      title: "AC Repair",
      description: "Expert technicians for all brands",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
      rating: 4.7,
      price: "₹199"
    },
    {
      title: "Plumbing",
      description: "24/7 emergency plumbing services",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      rating: 4.6,
      price: "₹149"
    },
    {
      title: "Massage Therapy",
      description: "Relaxing spa treatments at home",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      rating: 4.9,
      price: "₹799"
    },
    {
      title: "Appliance Repair",
      description: "Fix all your home appliances",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.5,
      price: "₹249"
    }
  ];

  const testimonials = [
    {
      name: "Anita Patel",
      rating: 4,
      comment: "Great salon service at home. Very convenient and professional.",
      service: "Beauty Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
	{
      name: "Anita Patel",
      rating: 4,
      comment: "Great salon service at home. Very convenient and professional.",
      service: "Beauty Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
	{
      name: "Anita Patel",
      rating: 4,
      comment: "Great salon service at home. Very convenient and professional.",
      service: "Beauty Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 hover:cursor-default transition-all duration-300">
      {/* Navigation */}
      <nav className="bg-white shadow-lg top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-purple-600 bg-clip-text text-transparent">
                  ServEaze
                </h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline gap-2 font-medium transition-colors">
                <a href="#" className="text-gray-700 hover:text-purple-600 px-3">Services</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 px-3">About</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 px-3">Contact</a>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                  Login
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Services</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600">About</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Contact</a>
              <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg mt-2">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Home Services
              <span className="block bg-orange-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Book trusted professionals for all your home service needs. Quality guaranteed, convenience delivered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="w-80 px-6 py-4 bg-white opacity-80 text-gray-800 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg"
                />
                <button className="absolute right-2 top-2 bg-purple-600 text-white p-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center space-x-8 text-center">
              <div className="flex items-center">
                <Shield className="text-green-400 mr-2" size={24} />
                <span>Verified</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-blue-400 mr-2" size={24} />
                <span>Ontime</span>
              </div>
              <div className="flex items-center">
                <Award className="text-yellow-400 mr-2" size={24} />
                <span>Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from different categories of home services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
				<img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
				/>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="ml-1 text-sm font-medium text-gray-700">{service.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{service.price}</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your service done
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Service</h3>
              <p className="text-gray-600">Select from our different range of home services</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Service</h3>
              <p className="text-gray-600">Pick your preferred date and time slot</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Service</h3>
              <p className="text-gray-600">Our professionals completes the job</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by millions of customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-purple-400 bg-clip-text text-transparent">
                ServEaze
              </h3>
              <p className="text-gray-400 mb-4">
                Trusted organization for all home service needs.
              </p>
              <div className="flex space-x-4">
                <MapPin size={20} className="text-purple-400" />
                <span className="text-gray-400">New Delhi</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 transition-colors">
                <li><a href="#" className="hover:text-white">Home Cleaning</a></li>
                <li><a href="#" className="hover:text-white">Beauty</a></li>
                <li><a href="#" className="hover:text-white">Repairs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 transition-colors">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contribute</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone size={16} className="mr-3 text-purple-400" />
                  <span>1800-123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-3 text-purple-400" />
                  <span>support@serveaze.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>ServEaze</p> <p> All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;