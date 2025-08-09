import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth.js';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({userData}));
        }
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-[#f97316]/20">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#7c2d12] text-center mb-2">Sign in to your account</h2>
        <p className="text-sm text-center text-[#a16207] mb-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#f97316] hover:underline">
            Sign up
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required={true}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required={true}
            {...register('password')}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
