"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';

export default function ServeazeLogin() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState('');

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleContinue = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setLoginError('');

		try {
			const response = await fetch('http://127.0.0.1:8000/api/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password
				})
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('access_token', data.access);
				localStorage.setItem('refresh_token', data.refresh);
				localStorage.setItem('username', data.username);
				localStorage.setItem('email', formData.email);
				handleBackToMain();
			} else {
				const error = await response.json();
				setLoginError(error.detail || 'Login failed.');
			}
		} catch (err) {
			setLoginError('Could not connect to server.');
		}

		setIsLoading(false);
	};

	const handleBackToMain = () => {
		router.push('/');
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-4">
			<div className="w-full max-w-sm">
				<div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-600/30">
					<div className="flex gap-4 mb-6 items-center">
						<Logo size={58} />
						<div>
							<h1 className="text-3xl font-bold text-center text-white mb-2">Serveaze</h1>
							<p className="text-slate-300 ml-1 text-sm">Welcome back</p>
						</div>
					</div>

					<form onSubmit={handleContinue} className="space-y-4">
						<input
							type="text"
							name="email"
							placeholder="Enter your Email"
							value={formData.email}
							onChange={handleInputChange}
							className="w-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-600/50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleInputChange}
							className="w-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-600/50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
							required
						/>
						<div className="pt-4">
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-50"
							>
								{isLoading ? 'Signing In...' : 'Continue'}
							</button>
						</div>
					</form>

					{loginError && <p className="text-red-400 text-center mt-2">{loginError}</p>}

					<div className="mt-8 text-center">
						<button
							onClick={handleBackToMain}
							className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
						>
							<p className='flex gap-2 items-center hover:cursor-pointer'>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
								</svg>
								Back to Home
							</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
