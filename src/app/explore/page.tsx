'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2,
  TrendingUp,
  Home as HomeIcon,
  ArrowLeft
} from 'lucide-react';
import LocationButton from '@/components/LocationButton';
import { useProperties, usePropertySearch } from '@/hooks/useConvex';

// Property type
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  featured: boolean;
  imageColor: string;
  image: string;
}

// Generate mock properties
const generateProperties = (count: number): Property[] => {
  const types = ['Villa', 'Apartment', 'Condo', 'Townhouse', 'Studio', 'Penthouse'];
  const locations = ['Downtown', 'Westside', 'Eastview', 'Riverside', 'Hillcrest', 'Bayshore'];
  const colors = ['#9333ea', '#ec4899', '#8b5cf6', '#d946ef', '#a855f7', '#c026d3'];
  
  // Real estate images from Unsplash
  const images = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&h=400&fit=crop'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    title: `${types[i % types.length]} ${Math.floor(Math.random() * 100) + 1}`,
    location: `${locations[i % locations.length]}, ${['Miami', 'LA', 'NYC', 'Chicago'][i % 4]}`,
    price: Math.floor(Math.random() * 900000) + 100000,
    bedrooms: Math.floor(Math.random() * 4) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    sqft: Math.floor(Math.random() * 2000) + 800,
    type: types[i % types.length],
    featured: Math.random() > 0.7,
    imageColor: colors[i % colors.length],
    image: images[i % images.length]
  }));
};

export default function ExplorePage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>(generateProperties(12));
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const observerTarget = useRef<HTMLDivElement>(null);

  // Apply filters
  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Bedrooms filter
    if (selectedBedrooms !== 'Any') {
      const minBeds = parseInt(selectedBedrooms);
      filtered = filtered.filter(p => p.bedrooms >= minBeds);
    }

    // Price filter
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }

    setFilteredProperties(filtered);
  }, [searchQuery, selectedType, selectedBedrooms, minPrice, maxPrice, properties]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newProperties = generateProperties(6);
      setProperties(prev => [...prev, ...newProperties]);
      setIsLoading(false);
    }, 1000);
  };

  const clearFilters = () => {
    setSelectedType('All');
    setSelectedBedrooms('Any');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
  };

  const handleViewDetails = (property: Property) => {
    alert(`AIsha will help you with: ${property.title}\nLocation: ${property.location}\nPrice: $${property.price.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => router.push('/home')}
                  className="p-2 rounded-full hover:opacity-90 transition-opacity"
                  style={{ background: '#E3EF26' }}
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E3EF26' }}>
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl font-bold text-yellow-400 hidden sm:block">
                Prop.AI
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, property type..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
                  className="p-3 rounded-full hover:opacity-90 transition-opacity"
                  style={{ background: '#E3EF26' }}
            >
              <SlidersHorizontal className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-yellow-400">Explore Properties</h2>
          <p className="text-gray-400">{filteredProperties.length} properties available</p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-[#1c1c1e] border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Featured Badge */}
                {property.featured && (
                        <div className="absolute top-4 left-4 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg" style={{ background: '#E3EF26' }}>
                    <TrendingUp className="w-4 h-4 text-black" />
                    <span className="text-xs font-semibold text-black">Featured</span>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <span className="text-xs font-semibold text-white">{property.type}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">{property.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm truncate">{property.location}</span>
                  </div>
                  <LocationButton location={property.location} size="sm" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Bath className="w-4 h-4" />
                    <span className="text-sm">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-sm">{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    ${property.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleViewDetails(property)}
                          className="px-4 py-2 rounded-full text-sm font-semibold text-black hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-200"
                          style={{ background: '#E3EF26' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={observerTarget} className="h-4" />
      </main>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-[#1c1c1e] border border-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Price Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                    className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                    className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Property Type</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {['All', 'Villa', 'Apartment', 'Condo', 'Townhouse', 'Studio', 'Penthouse'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedType === type
                          ? 'text-black'
                          : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                      style={selectedType === type ? { background: '#E3EF26' } : {}}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Bedrooms</label>
                <div className="grid grid-cols-5 gap-3">
                  {['Any', '1+', '2+', '3+', '4+'].map((beds) => (
                    <button
                      key={beds}
                      onClick={() => setSelectedBedrooms(beds)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedBedrooms === beds
                          ? 'text-black'
                          : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                      style={selectedBedrooms === beds ? { background: '#E3EF26' } : {}}
                    >
                      {beds}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-black hover:opacity-90 transition-opacity"
                  style={{ background: '#E3EF26' }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

