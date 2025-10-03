'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Menu,
  X,
  MessageSquare,
  Bell,
  LogOut,
  TrendingUp,
  Edit2,
  Camera,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Grid,
  List,
  Plus,
  Shield,
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Globe,
  Award,
  Calendar,
  DollarSign,
  Users,
  Building,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function SellerProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSoldProperties, setShowSoldProperties] = useState(true);

  const [profile, setProfile] = useState({
    photo: '',
    name: 'Sarah Mitchell',
    tagline: 'Luxury Real Estate Specialist | Helping You Find Your Dream Home',
    bio: 'With over 12 years of experience in luxury real estate, I specialize in high-end residential properties and commercial spaces. My commitment to excellence and personalized service has helped over 200 families find their perfect home.',
    phone: '+1 (555) 123-4567',
    email: 'sarah.mitchell@realestate.com',
    website: 'www.sarahmitchellrealty.com',
    experience: 12,
    totalListings: 48,
    activeListings: 15,
    soldProperties: 33,
    rating: 4.9,
    reviewCount: 127,
    totalSalesVolume: '$45,000,000',
    averageDaysOnMarket: 28,
    verified: true,
    licenseNumber: 'RE-12345-NY'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, NY',
      price: '$850,000',
      beds: 2,
      baths: 2,
      sqft: '1,500',
      status: 'active',
      listedDate: '2024-09-15',
      features: ['Open floor plan', 'Floor-to-ceiling windows', 'Modern kitchen']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      title: 'Luxury Waterfront Villa',
      location: 'Long Island, NY',
      price: '$2,500,000',
      beds: 5,
      baths: 4,
      sqft: '4,500',
      status: 'active',
      listedDate: '2024-08-20',
      features: ['Private beach access', 'Infinity pool', 'Smart home system']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      title: 'Commercial Office Space',
      location: 'Brooklyn, NY',
      price: '$1,200,000',
      beds: 0,
      baths: 2,
      sqft: '3,000',
      status: 'sold',
      listedDate: '2024-06-10',
      soldDate: '2024-09-01',
      features: ['Modern layout', 'Parking available', 'Conference rooms']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      title: 'Suburban Family Home',
      location: 'Queens, NY',
      price: '$650,000',
      beds: 4,
      baths: 3,
      sqft: '2,500',
      status: 'active',
      listedDate: '2024-09-01',
      features: ['Large backyard', 'Updated kitchen', 'Hardwood floors']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      title: 'Beachfront Condo',
      location: 'Long Island, NY',
      price: '$1,800,000',
      beds: 3,
      baths: 3,
      sqft: '2,200',
      status: 'active',
      listedDate: '2024-08-15',
      features: ['Direct beach access', 'Balcony with ocean views', 'Resort-style amenities']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      title: 'Urban Studio Apartment',
      location: 'Manhattan, NY',
      price: '$425,000',
      beds: 1,
      baths: 1,
      sqft: '650',
      status: 'sold',
      listedDate: '2024-07-05',
      soldDate: '2024-08-20',
      features: ['Prime location', 'Modern finishes', 'Building amenities']
    }
  ];

  const reviews = [
    {
      id: 1,
      reviewerName: 'John Davis',
      rating: 5,
      date: 'Sep 2024',
      text: 'Sarah made our home buying experience seamless. Her attention to detail and market knowledge is exceptional!',
      verified: true
    },
    {
      id: 2,
      reviewerName: 'Emily Chen',
      rating: 5,
      date: 'Aug 2024',
      text: 'Professional, responsive, and truly cares about finding the right property. Highly recommend!',
      verified: true
    },
    {
      id: 3,
      reviewerName: 'Michael Rodriguez',
      rating: 4,
      date: 'Jul 2024',
      text: 'Great experience overall. Sarah helped us navigate a complex commercial property purchase.',
      verified: true
    }
  ];

  const achievements = [
    { year: 2023, award: 'Top Producer of the Year', organization: 'New York Real Estate Board' },
    { year: 2022, award: 'Luxury Home Specialist', organization: 'Institute for Luxury Home Marketing' }
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setProfile({ ...tempProfile });
    localStorage.setItem('sellerProfile', JSON.stringify(tempProfile));
    setShowEditModal(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.push('/');
    }
  };

  const filteredProperties = properties.filter(property => {
    if (activeTab === 'active') return property.status === 'active';
    if (activeTab === 'sold') return property.status === 'sold';
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarExpanded ? 288 : 80 }}
        className="fixed left-0 top-0 h-full bg-zinc-950 border-r border-zinc-800 z-40"
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-8">
            {sidebarExpanded ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-900 flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl">Prop.AI</span>
                </div>
                <button
                  onClick={() => setSidebarExpanded(false)}
                  className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarExpanded(true)}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors mx-auto"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
              <Home className="w-5 h-5" />
              {sidebarExpanded && <span className="font-medium">Dashboard</span>}
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition-colors relative">
              <MessageSquare className="w-5 h-5" />
              {sidebarExpanded && (
                <>
                  <span className="font-medium">Messages</span>
                  <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                </>
              )}
              {!sidebarExpanded && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
              )}
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              {sidebarExpanded && (
                <>
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
                </>
              )}
              {!sidebarExpanded && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">5</span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl text-red-400 hover:text-red-300 transition-colors mt-4"
            >
              <LogOut className="w-5 h-5" />
              {sidebarExpanded && <span className="font-medium">Log Out</span>}
            </button>
          </nav>

          {/* Upgrade Card */}
          {sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-4 mt-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-white mb-1">Upgrade to Pro</h4>
              <p className="text-sm text-white/80 mb-3">Get AI recommendations</p>
              <button className="w-full bg-white text-orange-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-20'}`}>
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => router.push('/home')}
            className="p-3 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-900 rounded-full hover:opacity-90 transition-opacity shadow-lg mb-4"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          {/* Profile Header Card */}
          <div className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-800 shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-white">{profile.name.charAt(0)}</span>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-zinc-950 flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{profile.name}</h1>
                  {profile.verified && (
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-zinc-400 text-lg mb-2">{profile.tagline}</p>
                <p className="text-zinc-300 leading-relaxed mb-4 max-w-2xl">{profile.bio}</p>
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Globe className="w-4 h-4" />
                    <span>{profile.website}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTempProfile({ ...profile });
                    setShowEditModal(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-zinc-800">
              {[
                { label: 'Experience', value: `${profile.experience} years`, icon: Calendar },
                { label: 'Active Listings', value: profile.activeListings, icon: Building },
                { label: 'Sold Properties', value: profile.soldProperties, icon: CheckCircle },
                { label: 'Total Sales', value: profile.totalSalesVolume, icon: DollarSign },
                { label: 'Rating', value: `${profile.rating}/5`, icon: Star },
                { label: 'Reviews', value: profile.reviewCount, icon: Users },
                { label: 'Avg Days on Market', value: `${profile.averageDaysOnMarket} days`, icon: TrendingUp },
                { label: 'License', value: profile.licenseNumber, icon: Award }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Properties Section */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'active'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Active Listings ({properties.filter(p => p.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('sold')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'sold'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Sold Properties ({properties.filter(p => p.status === 'sold').length})
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ y: -4 }}
                  className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden group transition-all hover:shadow-2xl hover:shadow-indigo-500/20"
                >
                  {/* Property Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold ${
                      property.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {property.status === 'active' ? 'Active' : 'Sold'}
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full">
                      <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    </button>
                  </div>

                  {/* Property Details */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-zinc-400 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {property.price}
                    </div>

                    {/* Specs */}
                    <div className="flex items-center gap-4 pb-4 mb-4 border-b border-zinc-800 text-zinc-400 text-sm">
                      {property.beds > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.beds}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        <span>{property.sqft}</span>
                      </div>
                    </div>

                    {/* Listed Date */}
                    <div className="text-xs text-zinc-500 mb-4">
                      Listed: {property.listedDate}
                      {property.soldDate && (
                        <span className="ml-2">• Sold: {property.soldDate}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all">
                        View Details
                      </button>
                      <button className="w-full border border-zinc-700 hover:border-indigo-500 text-zinc-300 hover:text-white font-semibold py-3 rounded-xl transition-all">
                        Edit Listing
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold">{review.reviewerName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{review.reviewerName}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm mb-2">{review.text}</p>
                  <div className="text-xs text-zinc-500">{review.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Achievements & Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{achievement.award}</div>
                    <div className="text-sm text-zinc-400">{achievement.organization}</div>
                    <div className="text-xs text-zinc-500">{achievement.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowEditModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Edit Profile
                    </h3>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Photo Editor */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        {tempProfile.photo ? (
                          <img src={tempProfile.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-5xl font-bold text-white">{tempProfile.name.charAt(0)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:opacity-90 transition-opacity"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Tagline</label>
                      <input
                        type="text"
                        value={tempProfile.tagline}
                        onChange={(e) => setTempProfile({ ...tempProfile, tagline: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Bio</label>
                      <textarea
                        value={tempProfile.bio}
                        onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Phone</label>
                      <input
                        type="text"
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-6 py-3 border border-zinc-700 hover:border-zinc-600 text-white font-semibold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
