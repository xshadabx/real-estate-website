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
  ArrowLeft
} from 'lucide-react';

export default function BuyerProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('saved');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCollection, setActiveCollection] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Aisha AI",
      avatar: "🤖",
      lastMessage: "I found 3 new properties that match your criteria!",
      time: "2 min ago",
      unread: true,
      messages: [
        { id: 1, text: "Hello! I'm Aisha, your AI real estate assistant. How can I help you find your dream home?", sender: "ai", time: "10:30 AM" },
        { id: 2, text: "Hi Aisha! I'm looking for a 2-bedroom condo in San Francisco under $900k", sender: "user", time: "10:32 AM" },
        { id: 3, text: "Perfect! I found 3 excellent options that match your criteria. Would you like me to show you the details?", sender: "ai", time: "10:33 AM" },
        { id: 4, text: "Yes, please show me!", sender: "user", time: "10:34 AM" },
        { id: 5, text: "I found 3 new properties that match your criteria!", sender: "ai", time: "2 min ago" }
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "👩",
      lastMessage: "Thanks for your interest in the downtown condo!",
      time: "1 hour ago",
      unread: true,
      messages: [
        { id: 1, text: "Hi! I saw you're interested in the downtown condo. I'm the listing agent. Would you like to schedule a viewing?", sender: "agent", time: "9:15 AM" },
        { id: 2, text: "Yes, I'd love to see it! What times are available this week?", sender: "user", time: "9:20 AM" },
        { id: 3, text: "I have Tuesday at 2 PM or Thursday at 10 AM available. Which works better for you?", sender: "agent", time: "9:22 AM" },
        { id: 4, text: "Tuesday at 2 PM sounds perfect!", sender: "user", time: "9:25 AM" },
        { id: 5, text: "Great! I'll send you the address and my contact info. Thanks for your interest in the downtown condo!", sender: "agent", time: "1 hour ago" }
      ]
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "👨",
      lastMessage: "The property viewing is scheduled for tomorrow at 2 PM.",
      time: "3 hours ago",
      unread: false,
      messages: [
        { id: 1, text: "Hi! I'm Mike, your mortgage broker. I heard you're looking at properties. I can help you get pre-approved!", sender: "broker", time: "Yesterday" },
        { id: 2, text: "That would be great! What documents do I need?", sender: "user", time: "Yesterday" },
        { id: 3, text: "I'll need your last 2 pay stubs, bank statements, and tax returns. I'll send you a checklist!", sender: "broker", time: "Yesterday" },
        { id: 4, text: "Perfect, I'll gather those documents. Thanks Mike!", sender: "user", time: "Yesterday" },
        { id: 5, text: "The property viewing is scheduled for tomorrow at 2 PM.", sender: "broker", time: "3 hours ago" }
      ]
    }
  ]);

  const [profile, setProfile] = useState({
    photo: '',
    name: 'Sarah Anderson',
    username: '@sarahbuyer',
    bio: 'Looking for my dream home in San Francisco Bay Area. First-time buyer exploring modern condos and townhouses.',
    saved: 42,
    followers: 1234,
    following: 189
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  // Load profile from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
      } catch (e) {
        // If parsing fails, save the default profile
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }
    } else {
      // Save default profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, []);

  const collections = [
    { id: 'all', name: 'All Saved', count: 42, icon: '📋' },
    { id: 'dream', name: 'Dream Homes', count: 15, icon: '✨' },
    { id: 'investment', name: 'Investment', count: 8, icon: '💼' }
  ];

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      title: 'Modern Downtown Condo',
      location: 'San Francisco, CA',
      price: '$875,000',
      beds: 2,
      baths: 2,
      sqft: '1,200',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      title: 'Luxury Townhouse',
      location: 'Palo Alto, CA',
      price: '$1,250,000',
      beds: 3,
      baths: 2.5,
      sqft: '2,100',
      featured: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      title: 'Waterfront Penthouse',
      location: 'Oakland, CA',
      price: '$1,450,000',
      beds: 3,
      baths: 3,
      sqft: '2,500',
      featured: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      title: 'Cozy Suburban Home',
      location: 'Berkeley, CA',
      price: '$725,000',
      beds: 2,
      baths: 2,
      sqft: '1,400',
      featured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      title: 'Modern Family House',
      location: 'San Jose, CA',
      price: '$950,000',
      beds: 4,
      baths: 3,
      sqft: '2,800',
      featured: false
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      title: 'Luxury Villa Estate',
      location: 'Los Altos, CA',
      price: '$2,100,000',
      beds: 5,
      baths: 4,
      sqft: '3,500',
      featured: true
    }
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
    // Save to localStorage so home page can read it
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
    setShowEditModal(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.push('/');
    }
  };

  const handleMessagesClick = () => {
    setShowMessages(true);
    setShowNotifications(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
    setShowMessages(false);
  };

  const handleSendMessage = (messageText?: string) => {
    const messageToSend = messageText || newMessage;
    if (messageToSend.trim() && selectedChat) {
      const chatIndex = chats.findIndex(chat => chat.id === selectedChat);
      if (chatIndex !== -1) {
        const updatedChats = [...chats];
        const newMessageObj = {
          id: Date.now(),
          text: messageToSend,
          sender: "user",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        updatedChats[chatIndex].messages.push(newMessageObj);
        updatedChats[chatIndex].lastMessage = messageToSend;
        updatedChats[chatIndex].time = "now";
        setChats(updatedChats);
        setNewMessage('');
        
        // Simulate AI response for Aisha
        if (selectedChat === 1) {
          setIsTyping(true);
          setTimeout(() => {
            const aiResponses = [
              "I understand! Let me search for more properties that match your criteria. I'll get back to you with some great options!",
              "Great question! Based on your preferences, I found 5 new listings in your area. Would you like me to show you the details?",
              "Perfect! I'm analyzing the market trends and will send you personalized recommendations shortly.",
              "I'm working on finding the best matches for you. This might take a moment...",
              "Excellent! I've identified some amazing properties that fit your budget and location preferences."
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            const aiResponse = {
              id: Date.now() + 1,
              text: randomResponse,
              sender: "ai",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            const updatedChatsWithAI = [...updatedChats];
            updatedChatsWithAI[chatIndex].messages.push(aiResponse);
            updatedChatsWithAI[chatIndex].lastMessage = aiResponse.text;
            updatedChatsWithAI[chatIndex].time = "now";
            setChats(updatedChatsWithAI);
            setIsTyping(false);
          }, 2000);
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chats]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarExpanded(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarExpanded ? 288 : 80 }}
        className={`fixed left-0 top-0 h-full bg-zinc-950 border-r border-zinc-800 z-40 ${
          sidebarExpanded ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-8">
            {sidebarExpanded ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E3EF26' }}>
                    <Home className="w-6 h-6 text-black" />
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
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-black" style={{ background: '#E3EF26' }}>
              <Home className="w-5 h-5" />
              {sidebarExpanded && <span className="font-medium">Dashboard</span>}
            </button>

            <button 
              onClick={handleMessagesClick}
              className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition-colors relative"
            >
              <MessageSquare className="w-5 h-5" />
              {sidebarExpanded && (
                <>
                  <span className="font-medium">Messages</span>
                  <span className="ml-auto text-black text-xs px-2 py-0.5 rounded-full" style={{ background: '#E3EF26' }}>3</span>
                </>
              )}
              {!sidebarExpanded && (
                <span className="absolute -top-1 -right-1 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#E3EF26' }}>3</span>
              )}
            </button>

            <button 
              onClick={handleNotificationsClick}
              className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {sidebarExpanded && (
                <>
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto text-black text-xs px-2 py-0.5 rounded-full" style={{ background: '#E3EF26' }}>5</span>
                </>
              )}
              {!sidebarExpanded && (
                <span className="absolute -top-1 -right-1 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#E3EF26' }}>5</span>
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
              <button className="w-full text-black font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ background: '#E3EF26' }}>
                Upgrade Now
              </button>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 lg:ml-20">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: '#E3EF26' }}
            >
              <Menu className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => router.push('/home')}
              className="p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: '#E3EF26' }}
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </div>
          
          {/* Desktop Back Button */}
          <button
            onClick={() => router.push('/home')}
            className="hidden lg:block p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg mb-4"
            style={{ background: '#E3EF26' }}
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>

          {/* Profile Header Card */}
          <div className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center" style={{ background: '#E3EF26' }}>
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-black">{profile.name.charAt(0)}</span>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-zinc-950 flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{profile.name}</h1>
                <p className="text-zinc-400 text-lg mb-3">{profile.username}</p>
                <p className="text-zinc-300 leading-relaxed mb-6 max-w-2xl">{profile.bio}</p>
                
                <button
                  onClick={() => {
                    setTempProfile({ ...profile });
                    setShowEditModal(true);
                  }}
                  className="px-6 py-3 text-black font-semibold rounded-xl flex items-center gap-2 transition-all hover:opacity-90"
                  style={{ background: '#E3EF26' }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>

                {/* Stats Row */}
                <div className="flex gap-8 mt-6">
                  {[
                    { label: 'Saved', value: profile.saved },
                    { label: 'Followers', value: profile.followers },
                    { label: 'Following', value: profile.following }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-yellow-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Property Collections */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'saved'
                    ? 'text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Saved Properties
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'recent'
                    ? 'text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Recently Viewed
              </button>
            </div>

            {/* Collections Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Collections</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 hover:opacity-90 text-black rounded-lg flex items-center gap-2 transition-opacity" style={{ background: '#E3EF26' }}>
                  <Plus className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>

            {/* Collection Filters */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setActiveCollection(collection.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeCollection === collection.id
                      ? 'text-black shadow-lg shadow-yellow-500/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <span>{collection.icon}</span>
                  <span className="font-medium">{collection.name}</span>
                  <span className="text-xs opacity-75">({collection.count})</span>
                </button>
              ))}
            </div>

            {/* Property Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {properties.map((property) => (
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
                    {property.featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg px-3 py-1 text-xs font-semibold text-white">
                        Featured
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 rounded-full hover:opacity-90 transition-opacity" style={{ background: '#E3EF26' }}>
                      <Heart className="w-5 h-5 text-black fill-black" />
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
                    <div className="text-2xl font-bold text-yellow-400 mb-4">
                      {property.price}
                    </div>

                    {/* Specs */}
                    <div className="flex items-center gap-4 pb-4 mb-4 border-b border-zinc-800 text-zinc-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        <span>{property.sqft}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button className="w-full text-black font-semibold py-3 rounded-xl transition-all hover:opacity-90" style={{ background: '#E3EF26' }}>
                        View Details
                      </button>
                      <button className="w-full text-black font-semibold py-3 rounded-xl transition-all hover:opacity-90" style={{ background: '#E3EF26' }}>
                        Contact
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp-like Messages Modal */}
      <AnimatePresence>
        {showMessages && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => {
                setShowMessages(false);
                setSelectedChat(null);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
                {/* Chat List Sidebar */}
                <div className="w-1/3 border-r border-zinc-800 bg-zinc-900">
                  {/* Header */}
                  <div className="p-4 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-yellow-400">Messages</h3>
                      <button
                        onClick={() => {
                          setShowMessages(false);
                          setSelectedChat(null);
                        }}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Chat List */}
                  <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat.id)}
                        className={`p-4 border-b border-zinc-800 cursor-pointer transition-all hover:bg-zinc-800 ${
                          selectedChat === chat.id ? 'bg-zinc-800 border-l-4 border-l-yellow-400' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                            {chat.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-white truncate">{chat.name}</h4>
                              <span className="text-xs text-zinc-500">{chat.time}</span>
                            </div>
                            <p className="text-zinc-400 text-sm truncate mt-1">{chat.lastMessage}</p>
                          </div>
                          {chat.unread && (
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">
                            {chats.find(chat => chat.id === selectedChat)?.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              {chats.find(chat => chat.id === selectedChat)?.name}
                            </h4>
                            <p className="text-xs text-zinc-500">Online</p>
                          </div>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950">
                        {chats.find(chat => chat.id === selectedChat)?.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                message.sender === 'user'
                                  ? 'bg-yellow-400 text-black'
                                  : message.sender === 'ai'
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                  : 'bg-zinc-800 text-white'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs opacity-70 mt-1">{message.time}</p>
                            </div>
                          </div>
                        ))}
                        {isTyping && selectedChat === 1 && (
                          <div className="flex justify-start">
                            <div className="bg-zinc-800 text-white px-4 py-2 rounded-2xl">
                              <div className="flex items-center space-x-1">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-xs text-zinc-400 ml-2">Aisha is typing...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                        {/* Quick Reply Buttons */}
                        {selectedChat === 1 && (
                          <div className="flex gap-2 mb-3 overflow-x-auto">
                            {[
                              "Show me properties",
                              "What's my budget?",
                              "Schedule a viewing",
                              "Market analysis"
                            ].map((quickReply) => (
                              <button
                                key={quickReply}
                                onClick={() => handleSendMessage(quickReply)}
                                className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 transition-colors whitespace-nowrap"
                              >
                                {quickReply}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                          <button
                            onClick={() => handleSendMessage()}
                            disabled={!newMessage.trim()}
                            className="p-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: '#E3EF26' }}
                          >
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl mx-auto mb-4">
                          💬
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                        <p className="text-zinc-400">Choose a chat to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Notifications Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-yellow-400">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: "property",
                        title: "New Property Match",
                        description: "A new property in San Francisco matches your saved criteria",
                        time: "5 min ago",
                        unread: true
                      },
                      {
                        id: 2,
                        type: "price",
                        title: "Price Drop Alert",
                        description: "The downtown condo you saved dropped by $25,000",
                        time: "1 hour ago",
                        unread: true
                      },
                      {
                        id: 3,
                        type: "viewing",
                        title: "Viewing Reminder",
                        description: "Your property viewing is scheduled for tomorrow at 2 PM",
                        time: "2 hours ago",
                        unread: false
                      },
                      {
                        id: 4,
                        type: "ai",
                        title: "Aisha Recommendation",
                        description: "I found 3 new properties that might interest you",
                        time: "4 hours ago",
                        unread: false
                      },
                      {
                        id: 5,
                        type: "market",
                        title: "Market Update",
                        description: "San Francisco market prices increased by 2.3% this month",
                        time: "1 day ago",
                        unread: false
                      }
                    ].map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-indigo-500/50 ${
                          notification.unread 
                            ? 'bg-zinc-900 border-zinc-800' 
                            : 'bg-zinc-950 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.type === 'property' ? 'bg-blue-500' :
                            notification.type === 'price' ? 'bg-green-500' :
                            notification.type === 'viewing' ? 'bg-purple-500' :
                            notification.type === 'ai' ? 'bg-pink-500' :
                            'bg-orange-500'
                          }`}>
                            {notification.type === 'property' && '🏠'}
                            {notification.type === 'price' && '💰'}
                            {notification.type === 'viewing' && '👁️'}
                            {notification.type === 'ai' && '🤖'}
                            {notification.type === 'market' && '📈'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-white">{notification.title}</h4>
                              <span className="text-sm text-zinc-500">{notification.time}</span>
                            </div>
                            <p className="text-zinc-400 text-sm mt-1">{notification.description}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                    <h3 className="text-2xl font-bold text-yellow-400">
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
                      <div className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden" style={{ background: '#E3EF26' }}>
                        {tempProfile.photo ? (
                          <img src={tempProfile.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-5xl font-bold text-black">{tempProfile.name.charAt(0)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-3 rounded-full hover:opacity-90 transition-opacity"
                        style={{ background: '#E3EF26' }}
                      >
                        <Camera className="w-5 h-5 text-black" />
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
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Username</label>
                      <input
                        type="text"
                        value={tempProfile.username}
                        onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })}
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
                      className="flex-1 px-6 py-3 text-black font-semibold rounded-xl transition-all hover:opacity-90"
                      style={{ background: '#E3EF26' }}
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

