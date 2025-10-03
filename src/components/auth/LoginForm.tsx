'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create appropriate profile based on role
    if (formData.role === 'seller') {
      const sellerProfile = {
        name: formData.firstName + ' ' + formData.lastName,
        tagline: 'Real Estate Professional',
        bio: 'Experienced real estate professional helping clients find their perfect properties.',
        phone: '+1 (555) 123-4567',
        email: formData.email,
        website: 'www.example.com',
        experience: 5,
        totalListings: 0,
        activeListings: 0,
        soldProperties: 0,
        rating: 5.0,
        reviewCount: 0,
        totalSalesVolume: '$0',
        averageDaysOnMarket: 0,
        verified: true,
        licenseNumber: 'RE-XXXXX-XX'
      };
      localStorage.setItem('sellerProfile', JSON.stringify(sellerProfile));
      // Clear any existing buyer profile
      localStorage.removeItem('userProfile');
      console.log('Seller profile saved:', sellerProfile);
    } else {
      const buyerProfile = {
        name: formData.firstName + ' ' + formData.lastName,
        username: '@' + formData.firstName.toLowerCase(),
        bio: 'Looking for my dream home. First-time buyer exploring properties.',
        saved: 0,
        followers: 0,
        following: 0
      };
      localStorage.setItem('userProfile', JSON.stringify(buyerProfile));
      // Clear any existing seller profile
      localStorage.removeItem('sellerProfile');
      console.log('Buyer profile saved:', buyerProfile);
    }
    
    // Redirect to home page after successful login/signup
    router.push('/home');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: '#E3EF26' }}
          >
            <UserIcon className="w-8 h-8 text-black" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {isLogin ? 'Welcome Back' : 'Join Prop.AI'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300"
          >
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name fields for signup */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="John"
                    required={!isLogin}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password for signup */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={formData.role === 'buyer'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  formData.role === 'buyer'
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-white/20 bg-white/10 text-gray-300 hover:border-white/40'
                }`}>
                  <div className="text-center">
                    <div className="text-sm font-medium">Buyer</div>
                    <div className="text-xs opacity-75">Looking for properties</div>
                  </div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={formData.role === 'seller'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  formData.role === 'seller'
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-white/20 bg-white/10 text-gray-300 hover:border-white/40'
                }`}>
                  <div className="text-center">
                    <div className="text-sm font-medium">Seller</div>
                    <div className="text-xs opacity-75">Selling properties</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 font-bold text-lg rounded-xl shadow-lg transition-all duration-300 ${
              isLoading 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'text-black hover:shadow-xl'
            }`}
            style={{
              background: isLoading ? 'none' : '#E3EF26',
              boxShadow: isLoading ? 'none' : '0 10px 30px rgba(227, 239, 38, 0.4)',
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </motion.button>

          {/* Toggle Login/Signup */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center">
              <button
                type="button"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}
