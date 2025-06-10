"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Logo from 'components/Logo';

// console.log("Importing Logo:", require.);


const categories = [
  { name: "Phones", image: "/images/phone-repair.jpg" },
  { name: "Laptops", image: "/images/laptop-repair.jpg" },
  { name: "Game Consoles", image: "/images/console-repair.jpg" },
];

const featured = [
  {
    id: 1,
    name: "iPhone 13 Screen Replacement",
    price: "₹2,999",
    image: "/images/iphone13.jpg",
  },
  {
    id: 2,
    name: "MacBook Battery Swap",
    price: "₹4,499",
    image: "/images/macbook.jpg",
  },
];

export default function HomePage() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);
	
  return (
    <main className="min-h-screen bg-white text-gray-900">
		<header className="bg-gradient-to-r from-blue-100 to-blue-200 shadow sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
				{/* Logo */}
				<Logo size={48} />
				<a href="/" className="text-xl font-bold text-blue-600 ml-5">Serveaze</a>

				{/* Search Bar */}
				<div className="flex-1 mx-6">
				<input
					type="text"
					placeholder="Search services..."
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				</div>

				{username ? (
					<div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
						{username.charAt(0).toUpperCase()}
					</div>
				) : (
					<a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Login</a>
				)}
			</div>
		</header>

      <section className="py-16 px-6 text-center bg-[url('/image.png')] bg-[center_right_20%] bg-cover">
        <div className="bg-gray-100 w-fit mx-auto p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">Serveaze</h1>
          <p className="text-lg max-w-xl mx-auto mb-6">
            Repair, Don’t Replace
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white shadow rounded overflow-hidden">
              <Image src={cat.image} alt={cat.name} width={500} height={300} className="w-full object-cover" />
              <div className="p-4 text-center font-medium">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featured.map((service) => (
            <div key={service.id} className="bg-white shadow rounded overflow-hidden">
              <Image src={service.image} alt={service.name} width={500} height={300} className="w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-blue-600 mt-2">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Serve. All rights reserved.</p>
      </footer>
    </main>
  );
}
