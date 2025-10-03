'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Animated Buildings Component
const AnimatedBuildings = () => {
  const [buildings, setBuildings] = useState<Array<{
    id: number;
    height: number;
    width: number;
    delay: number;
    left: number;
  }>>([]);

  useEffect(() => {
    setBuildings(Array.from({ length: 5 }, (_, i) => ({
      id: i,
      height: Math.random() * 150 + 200, // 200-350px
      width: Math.random() * 30 + 80, // 80-110px
      delay: Math.random() * 0.8 + 0.1, // 0.1-0.9s
      left: (i * 20) + Math.random() * 10, // Spread across bottom
    })));
  }, []);

  if (buildings.length === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full h-96 overflow-hidden">
      {buildings.map((building) => (
        <motion.div
          key={building.id}
          className="absolute bottom-0 bg-gradient-to-t from-yellow-400/30 to-yellow-400/10 border-2 border-yellow-400/50"
          style={{
            left: `${building.left}%`,
            width: `${building.width}px`,
            height: `${building.height}px`,
            transformOrigin: 'bottom',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: building.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Building Windows */}
          {Array.from({ length: Math.floor(building.height / 40) }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300/60 rounded-sm"
              style={{
                left: `${20 + (i % 2) * 20}px`,
                top: `${building.height - (i + 1) * 40}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Animated Stars Component
const AnimatedStars = () => {
  const [stars, setStars] = useState<Array<{
    id: number;
    left: number;
    top: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setStars(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: Math.random() * 2,
    })));
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-1/2">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Premium Button Component
const PremiumButton = ({ children, ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        boxShadow: '0 20px 50px rgba(227, 239, 38, 0.7), 0 0 30px rgba(227, 239, 38, 0.4)',
      }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden group"
      style={{
        background: '#E3EF26',
        backgroundSize: '200% 200%',
        boxShadow: '0 15px 35px rgba(227, 239, 38, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50px',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '0%',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10 font-semibold tracking-wide text-black">
        {children}
      </span>
      
      {/* Soft glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)',
          borderRadius: '50px',
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.6, 0.9, 0.6] : 0.4,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
        }}
      />
    </motion.button>
  );
};

export default function PropAIHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Background Elements */}
      <AnimatedStars />
      <AnimatedBuildings />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wider">
            PROP.AI
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 md:mb-6 max-w-5xl leading-tight px-4"
        >
          <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Build Your Wealth Through Trusted Real Estate
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-4xl leading-relaxed font-light px-4"
        >
          Discover premium properties in Bangalore's most prestigious locations. 
          Your journey to smart investments and lasting prosperity begins here.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Link href="/login">
            <PremiumButton
              className="px-12 sm:px-16 md:px-20 py-5 sm:py-6 text-white text-base sm:text-lg font-bold rounded-3xl transition-all duration-300"
            >
              Get Started
            </PremiumButton>
          </Link>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes growUp {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
