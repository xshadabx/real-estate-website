'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Heart, 
  Sparkles, 
  Eye, 
  Shield, 
  Calendar,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Clock,
  Home,
  User,
  Compass,
  ArrowLeft
} from 'lucide-react';
import LocationButton from '@/components/LocationButton';
import { useProperties, useFeaturedProperties } from '@/hooks/useDatabase';

// Property Card Component
const PropertyCard = ({ 
  property, 
  isAishaPick = false, 
  showHeart = true 
}: { 
  property: any; 
  isAishaPick?: boolean; 
  showHeart?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="group relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      tabIndex={0}
      role="button"
      aria-label={`View ${property.title}`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-zinc-900/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-white font-bold text-lg">{property.price}</span>
        </div>
        
        {/* Aisha Pick Badge */}
        {isAishaPick && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-3 py-1.5">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-sm">Aisha Pick</span>
            </div>
          </div>
        )}
        
        {/* Heart Button */}
        {showHeart && (
          <motion.button
            className={`absolute bottom-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-black/50 text-white hover:bg-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6">
      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
        {property.title}
      </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>
          <LocationButton location={property.location} size="sm" />
        </div>
        
        {/* Amenities */}
        <div className="border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.beds} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.baths} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Bottom Navigation Component
const BottomNavigation = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      active: true
    },
    {
      id: 'aisha',
      label: 'Aisha',
      icon: Sparkles,
      active: false
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      active: false
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      active: false
    }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm mx-auto px-4 sm:bottom-6 sm:max-w-md"
    >
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-full shadow-2xl px-6 py-3">
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            const handleClick = () => {
              setActiveTab(item.id);
              if (item.id === 'aisha') {
                router.push('/aisha');
              } else if (item.id === 'explore') {
                router.push('/explore');
              } else if (item.id === 'profile') {
                // Check if user is seller or buyer
                const storedSellerProfile = localStorage.getItem('sellerProfile');
                const storedBuyerProfile = localStorage.getItem('userProfile');
                
                // Priority: Check seller profile first, then buyer profile
                if (storedSellerProfile) {
                  console.log('Navigating to seller profile');
                  router.push('/seller-profile');
                } else if (storedBuyerProfile) {
                  console.log('Navigating to buyer profile');
                  router.push('/profile');
                } else {
                  // Default to buyer profile if no profile found
                  console.log('No profile found, defaulting to buyer profile');
                  router.push('/profile');
                }
              }
            };

            return (
              <motion.button
                key={item.id}
                onClick={handleClick}
                className={`relative flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-black shadow-lg ring-2 ring-yellow-400/30'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-gray-200'
                }`}
                style={isActive ? { background: '#E3EF26' } : {}}
                whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-2'
                  }`}
                />
                <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                  isActive ? 'text-cyan-400' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-500/40 blur-md"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
export default function BuyerDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('Guest');
  
  // Use database hooks
  const { properties, loading: propertiesLoading } = useProperties();
  const { featuredProperties, loading: featuredLoading } = useFeaturedProperties();

  useEffect(() => {
    // Get username from localStorage (saved from profile page)
    const storedProfile = localStorage.getItem('userProfile');
    const storedSellerProfile = localStorage.getItem('sellerProfile');
    
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setUsername(profile.name || 'Guest');
      } catch (e) {
        setUsername('Guest');
      }
    } else if (storedSellerProfile) {
      try {
        const profile = JSON.parse(storedSellerProfile);
        setUsername(profile.name || 'Guest');
      } catch (e) {
        setUsername('Guest');
      }
    }
  }, []);

  const [recentlyViewed] = useState([
    {
      id: 1,
      title: "Modern 2BHK Apartment",
      location: "Koramangala, Bengaluru",
      price: "₹45L",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      location: "Jubilee Hills, Hyderabad",
      price: "₹1.8Cr",
      beds: 4,
      baths: 4,
      sqft: "3,500",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Spacious 3BHK Flat",
      location: "Whitefield, Bengaluru",
      price: "₹62L",
      beds: 3,
      baths: 2,
      sqft: "1,650",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    }
  ]);

  const [nearbyProperties] = useState([
    {
      id: 4,
      title: "Cozy 1BHK Studio",
      location: "Indiranagar, Bengaluru",
      price: "₹28L",
      beds: 1,
      baths: 1,
      sqft: "650",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Premium 2BHK Flat",
      location: "HSR Layout, Bengaluru",
      price: "₹58L",
      beds: 2,
      baths: 2,
      sqft: "1,100",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Luxury Penthouse",
      location: "MG Road, Bengaluru",
      price: "₹1.2Cr",
      beds: 3,
      baths: 3,
      sqft: "2,200",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    }
  ]);

  const [aishaProperties] = useState([
    {
      id: 7,
      title: "Smart Home Villa",
      location: "Electronic City, Bengaluru",
      price: "₹72L",
      beds: 3,
      baths: 3,
      sqft: "1,800",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      title: "Executive Apartment",
      location: "Banjara Hills, Hyderabad",
      price: "₹1.5Cr",
      beds: 4,
      baths: 4,
      sqft: "2,800",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    },
    {
      id: 9,
      title: "Luxury Condo",
      location: "Marathahalli, Bengaluru",
      price: "₹2.2Cr",
      beds: 4,
      baths: 4,
      sqft: "3,200",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop"
    }
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/login')}
          className="p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg mb-6"
          style={{ background: '#E3EF26' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your next dream property
          </p>
        </motion.div>

        {/* Recently Viewed Properties */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>
            <button className="text-purple-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {recentlyViewed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Clock}
              title="No properties viewed yet"
              description="Start exploring properties to see them here"
            />
          )}
        </motion.section>

        {/* Recommended Properties */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Recommended Properties</h2>
          
          {/* Nearby Properties */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-white">Nearby Properties</h3>
              <span className="text-gray-400">({nearbyProperties.length} properties)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {nearbyProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* AIsha's Personalized Picks */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-white">Aisha's Personalized Picks</h3>
              <span className="text-gray-400">({aishaProperties.length} properties)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {aishaProperties.map((property) => (
                <PropertyCard key={property.id} property={property} isAishaPick={true} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Package Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl p-8"
          style={{ background: '#E3EF26' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">Premium Buyer Plan</h3>
              <div className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5" />
                <span>Expires on 12th Dec 2025</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:max-w-2xl">
              <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
                <Eye className="w-6 h-6 text-black" />
                <div>
                  <p className="text-black font-semibold">Unlimited Views</p>
                  <p className="text-gray-800 text-sm">Browse all properties</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
                <Sparkles className="w-6 h-6 text-black" />
                <div>
                  <p className="text-black font-semibold">Aisha Assistant</p>
                  <p className="text-gray-800 text-sm">AI recommendations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
                <Shield className="w-6 h-6 text-black" />
                <div>
                  <p className="text-black font-semibold">Fraud Detection</p>
                  <p className="text-gray-800 text-sm">Safe transactions</p>
                </div>
              </div>
            </div>
            
            <button className="bg-black text-yellow-400 font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap">
              Upgrade Plan
            </button>
          </div>
        </motion.section>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
