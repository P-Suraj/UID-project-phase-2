"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            user { # Request user details
                id
                username
                email
            }
            token # Request access token
            refreshToken # Request refresh token
        }
    }
`;

export default function ServeazeRegister() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [registerError, setRegisterError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [registerUser, { loading: isLoading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
            if (data.register && data.register.user && data.register.token) {
                localStorage.setItem('username', data.register.user.username);
                localStorage.setItem('accessToken', data.register.token);
                if (data.register.refreshToken) {
                    localStorage.setItem('refreshToken', data.register.refreshToken);
                }

                setSuccessMessage('Registration success! You are now logged in.');
                router.push('/dashboard');
            } else {
                setRegisterError('Registration failed. No user or token received.');
            }
        },
        onError: (error) => {
            setRegisterError(error.message || 'An unexpected error occurred during registration.');
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');
        setSuccessMessage('');

        try {
            await registerUser({
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            });
        } catch (err) {
            console.error('Registration submission error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-600/30">
                    <div className="flex gap-4 mb-6 items-center">
                        {/* <Logo size={58} /> */}
                        <div>
                            <h1 className="text-3xl font-bold text-center text-white mb-2">Serveaze</h1>
                            <p className="text-slate-300 ml-1 text-sm">Register your account</p>
                        </div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-600/50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-600/50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/80 text-white placeholder-slate-400 border border-slate-600/50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>

                    {registerError && <p className="text-red-400 text-center mt-2">{registerError}</p>}
                    {successMessage && <p className="text-green-400 text-center mt-2">{successMessage}</p>}
                </div>
            </div>
        </div>
    );
}