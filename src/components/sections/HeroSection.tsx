'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SearchIcon, MapPinIcon, HomeIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Day Section */}
      <div className="absolute inset-0 w-1/2 bg-gradient-to-b from-yellow-50 to-yellow-100">
        {/* Day Sky Elements */}
        <div className="absolute top-0 left-0 w-full h-3/4">
          {/* Sun */}
          <motion.div
            className="absolute top-20 left-20 w-20 h-20 bg-yellow-400 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Clouds */}
          <motion.div
            className="absolute top-16 right-20 w-16 h-8 bg-white/80 rounded-full"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-12 right-32 w-12 h-6 bg-white/70 rounded-full"
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Day Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center mb-6">
              <HomeIcon className="w-8 h-8 text-primary-800 mr-3" />
              <span className="text-xl font-bold text-primary-800">RealEstate</span>
            </div>
            
            <h1 className="text-5xl font-bold text-primary-800 mb-4">
              Real Estate
            </h1>
            <p className="text-xl text-primary-700 mb-8">
              Find Your Dream Home
            </p>
            
            <Button size="lg" className="bg-primary-800 hover:bg-primary-900">
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Day Ground Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-yellow-100">
          {/* Trees */}
          <div className="absolute bottom-0 left-16">
            <div className="w-6 h-16 bg-amber-800"></div>
            <div className="absolute -top-4 -left-3 w-12 h-12 bg-green-600 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-32">
            <div className="w-5 h-14 bg-amber-800"></div>
            <div className="absolute -top-3 -left-2 w-10 h-10 bg-green-600 rounded-full"></div>
          </div>
          
          {/* City Silhouette */}
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-r from-gray-200/50 to-gray-300/50"></div>
        </div>
      </div>

      {/* Night Section */}
      <div className="absolute inset-0 w-1/2 right-0 bg-gradient-to-b from-blue-900 to-blue-950">
        {/* Night Sky Elements */}
        <div className="absolute top-0 right-0 w-full h-3/4">
          {/* Moon */}
          <motion.div
            className="absolute top-16 right-20 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1 right-2 w-3 h-3 bg-blue-900 rounded-full"></div>
          </motion.div>
          
          {/* Stars */}
          <div className="absolute top-12 right-16 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-20 right-32 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-16 right-40 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-24 right-24 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-28 right-36 w-1 h-1 bg-white rounded-full"></div>
          
          {/* Night Clouds */}
          <motion.div
            className="absolute top-14 right-16 w-12 h-6 bg-blue-950 rounded-full"
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-10 right-28 w-8 h-4 bg-blue-950 rounded-full"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Night Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-start pt-8">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-8 text-white"
          >
            <a href="#home" className="hover:text-accent-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-accent-400 transition-colors">About</a>
            <a href="#services" className="hover:text-accent-400 transition-colors">Services</a>
            <a href="#contact" className="hover:text-accent-400 transition-colors">Contact</a>
          </motion.nav>
        </div>

        {/* Night Ground Elements */}
        <div className="absolute bottom-0 right-0 w-full h-1/4 bg-blue-950">
          {/* Trees */}
          <div className="absolute bottom-0 right-16">
            <div className="w-6 h-16 bg-amber-800"></div>
            <div className="absolute -top-4 -right-3 w-12 h-12 bg-blue-950 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 right-32">
            <div className="w-5 h-14 bg-amber-800"></div>
            <div className="absolute -top-3 -right-2 w-10 h-10 bg-blue-950 rounded-full"></div>
          </div>
          
          {/* City Silhouette */}
          <div className="absolute bottom-0 right-0 w-full h-10 bg-gradient-to-l from-gray-800/50 to-gray-900/50"></div>
        </div>
      </div>

      {/* Central Skyscraper */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full z-20">
        <motion.div
          className="relative w-full h-4/5 bg-gradient-to-r from-white to-gray-800"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ transformOrigin: 'bottom' }}
        >
          {/* Day Windows */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-300 to-sky-400 opacity-80"></div>
          
          {/* Night Windows */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-accent-400 to-accent-500 opacity-90"></div>
        </motion.div>
        
        {/* Building Spire */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-white to-gray-800"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Building Entrance */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-20 bg-accent-400 rounded-t-lg"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ transformOrigin: 'bottom' }}
        />
      </div>
    </section>
  );
}
