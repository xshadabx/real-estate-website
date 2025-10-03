'use client';

import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

interface LocationButtonProps {
  location: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LocationButton = ({ location, className = '', size = 'md' }: LocationButtonProps) => {
  const handleLocationClick = () => {
    // Create Google Maps URL with dark theme support
    // Google Maps will automatically use dark theme if user's system is set to dark mode
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    
    // Open in new tab with specific window features to maintain dark theme
    const newWindow = window.open(
      mapsUrl, 
      '_blank', 
      'noopener,noreferrer,width=1200,height=800,scrollbars=yes,resizable=yes'
    );
    
    // Focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.button
      onClick={handleLocationClick}
      className={`
        ${sizeClasses[size]}
        ${className}
        inline-flex items-center gap-2 
        rounded-full font-semibold
        transition-all duration-300
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        group
      `}
      style={{
        background: 'linear-gradient(135deg, #E3EF26 0%, #D4E41A 100%)',
        color: '#000000',
        boxShadow: '0 4px 15px rgba(227, 239, 38, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 8px 25px rgba(227, 239, 38, 0.5)',
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`View location on Google Maps: ${location} (opens in dark theme if your system is set to dark mode)`}
      title={`View ${location} on Google Maps (Dark theme if enabled)`}
    >
      <MapPin className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
      <span className="truncate max-w-32">{location}</span>
      <ExternalLink className={`${iconSizes[size]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
    </motion.button>
  );
};

export default LocationButton;
