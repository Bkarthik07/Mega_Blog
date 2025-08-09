import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate('/');
        }
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
        <h2 className="text-2xl font-bold text-[#7c2d12] text-center mb-2">Create a new account</h2>
        <p className="text-sm text-center text-[#a16207] mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f97316] hover:underline">
            Sign in
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            required
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register('password')}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
