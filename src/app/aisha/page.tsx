'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Menu, 
  X, 
  Send, 
  Mic, 
  Paperclip,
  Plus,
  Shield,
  BarChart2,
  MapPin,
  IndianRupee,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import Orb from '@/components/Orb';

// Message type
interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Property type
interface Property {
  id: number;
  title: string;
  price: string;
  roi: string;
  location: string;
  type: string;
  image: string;
}

export default function AishaChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // All properties for daily rotation
  const allProperties: Property[] = [
    {
      id: 1,
      title: "Luxury Villa - Whitefield",
      price: "₹2.5 Cr",
      roi: "12.5%",
      location: "Bangalore, Karnataka",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Premium Apartment - Bandra",
      price: "₹1.8 Cr",
      roi: "10.8%",
      location: "Mumbai, Maharashtra",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Commercial Space - Cyber City",
      price: "₹3.2 Cr",
      roi: "14.2%",
      location: "Gurgaon, Haryana",
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Modern Villa - Koramangala",
      price: "₹3.8 Cr",
      roi: "11.5%",
      location: "Bangalore, Karnataka",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Penthouse - Juhu",
      price: "₹5.2 Cr",
      roi: "9.8%",
      location: "Mumbai, Maharashtra",
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Office Complex - Noida",
      price: "₹2.9 Cr",
      roi: "13.5%",
      location: "Noida, Uttar Pradesh",
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop"
    }
  ];

  // Get daily rotating properties
  const getDailyProperties = (): Property[] => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const startIndex = dayOfYear % allProperties.length;
    
    const rotated = [];
    for (let i = 0; i < 3; i++) {
      rotated.push(allProperties[(startIndex + i) % allProperties.length]);
    }
    return rotated;
  };

  const dailyProperties = getDailyProperties();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  // Get AI response based on keywords
  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('buy') || msg.includes('purchase')) {
      return "I can help you with buying property! 🏠\n\n• Location Analysis & Comparison\n• Legal Verification & Documentation\n• Market Price Comparison\n• Home Loan Assistance & Tips\n• Property Inspection Guidance\n\nWhat specific aspect would you like to know more about?";
    }
    
    if (msg.includes('sell') || msg.includes('selling')) {
      return "Let me guide you through selling your property! 💰\n\n• Property Valuation Assessment\n• Best Market Timing Analysis\n• Documentation Requirements\n• Property Staging Tips\n• Marketing Strategies\n\nWhich area interests you most?";
    }
    
    if (msg.includes('rent') || msg.includes('lease')) {
      return "I can assist with rental matters! 🔑\n\n• Tenant/Landlord Rights & Responsibilities\n• Rental Agreement Tips\n• Security Deposit Guidelines\n• Rent Control Act Information\n• Maintenance Responsibilities\n\nWhat would you like to explore?";
    }
    
    if (msg.includes('invest') || msg.includes('investment')) {
      return "Let's explore investment opportunities! 📈\n\n• High-Growth Areas Analysis\n• Rental Yield Calculations\n• Capital Appreciation Potential\n• RERA Compliance Check\n• Check sidebar for today's best investments!\n\nWhich city or sector interests you?";
    }
    
    if (msg.includes('fraud') || msg.includes('scam')) {
      return "Stay safe from property fraud! 🛡️\n\n• Red Flags to Watch For\n• Document Verification Steps\n• RERA Registration Check\n• Title Verification Process\n• Encumbrance Certificate Review\n\nUse the Fraud Detection tool in the menu for detailed analysis!";
    }
    
    if (msg.includes('market') || msg.includes('trend')) {
      return "Current Market Trends! 📊\n\n• Bangalore: +12.3% YoY growth\n• Mumbai: Strong luxury segment\n• Pune: Emerging IT corridors\n• Hyderabad: Commercial boom\n• Delhi NCR: Infrastructure development\n\nCheck Market Analysis in the menu for detailed insights!";
    }
    
    if (msg.includes('emi') || msg.includes('loan')) {
      return "Home Loan Information! 🏦\n\n• Current Interest Rates: 8.75% avg\n• Loan-to-Value Ratios: up to 90%\n• Tenure Options: 5-30 years\n• Tax Benefits: Section 80C & 24(b)\n• Processing Fees: 0.5-1% of loan amount\n\nWould you like help calculating EMI?";
    }
    
    if (msg.includes('law') || msg.includes('legal') || msg.includes('rera')) {
      return "Legal Framework in Real Estate! ⚖️\n\n• RERA Act 2016: Buyer protection\n• Transfer of Property Act\n• Stamp Duty & Registration\n• GST on Real Estate\n• Property Rights & Ownership\n\nWhich legal aspect concerns you?";
    }
    
    return "I'm Aisha, your real estate assistant! I can help with:\n\n• Buying & Selling Properties\n• Investment Opportunities\n• Market Analysis & Trends\n• Fraud Detection\n• Legal & Documentation\n• Home Loans & EMI\n• Rental Guidance\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowMarketAnalysis(false);
    
    // Simulate AI response after 1 second
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInputText("Show me the best investment properties in Bangalore");
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setShowMarketAnalysis(false);
    setIsSidebarOpen(false);
  };

  const handleFraudDetection = () => {
    const fraudMessage: Message = {
      id: Date.now(),
      type: 'ai',
      content: "🛡️ Fraud Detection System Activated!\n\nI'm Aisha, and I'll help you verify:\n\n✓ RERA Registration Status\n✓ Developer Track Record\n✓ Property Title Verification\n✓ Encumbrance Certificate\n✓ Approved Building Plans\n✓ NOC from Authorities\n\nPlease share property details (name, location, developer) for verification.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fraudMessage]);
    setIsSidebarOpen(false);
    setShowMarketAnalysis(false);
  };

  const handleMarketAnalysis = () => {
    setShowMarketAnalysis(true);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E3EF26' }}>
              <Home className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Aisha</h1>
              <p className="text-xs text-gray-400">Real Estate Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Chat Messages or Market Analysis */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {showMarketAnalysis ? (
            // Market Analysis Dashboard
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold mb-6">📊 Market Analysis Dashboard</h2>
              
              {/* Top Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Top Performing City</p>
                  <p className="text-xl font-bold text-green-500">Bangalore</p>
                  <p className="text-sm text-gray-400">+12.3% YoY</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Avg Home Loan Rate</p>
                  <p className="text-xl font-bold text-cyan-500">8.75%</p>
                  <p className="text-sm text-gray-400">Competitive rates</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Best ROI Sector</p>
                  <p className="text-xl font-bold text-blue-500">Commercial</p>
                  <p className="text-sm text-gray-400">6-8% rental yield</p>
                </div>
              </div>

              {/* City-wise Performance */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">City-wise Growth (YoY)</h3>
                <div className="space-y-4">
                  {[
                    { name: "Bangalore", growth: 12.3 },
                    { name: "Mumbai", growth: 10.8 },
                    { name: "Pune", growth: 11.5 },
                    { name: "Hyderabad", growth: 9.7 },
                    { name: "Delhi NCR", growth: 8.4 }
                  ].map((city) => (
                    <div key={city.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{city.name}</span>
                        <span className="text-sm text-green-500">+{city.growth}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          background: '#E3EF26',
                          width: `${city.growth * 7}%`
                        }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : messages.length === 0 ? (
            // Welcome Screen with Orb
            <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
              {/* Orb Background - Positioned behind everything */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
                <div className="w-full max-w-3xl aspect-square">
                  <Orb
                    hue={180}
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    forceHoverState={false}
                  />
                </div>
              </div>
              
              {/* Content on top of Orb */}
              <div className="relative flex flex-col items-center px-4" style={{ zIndex: 10 }}>
                <h2 className="text-3xl font-bold mb-4 text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                  Welcome to Aisha
                </h2>
                <p className="text-gray-100 text-lg max-w-md leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Your intelligent real estate assistant. Ask me anything about buying, selling, investing, or understanding the real estate market!
                </p>
              </div>
            </div>
          ) : (
            // Chat Messages
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'text-white'
                        : 'bg-gray-900 border border-gray-800'
                    }`}
                    style={message.type === 'user' ? { background: '#E3EF26', color: '#000000' } : {}}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E3EF26' }}>
                          <Home className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-xs text-cyan-500 font-semibold">Aisha</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2 bg-black border border-gray-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-cyan-500 transition-all">
              <label className="p-2 hover:bg-gray-900 rounded-lg cursor-pointer transition-colors">
                <input type="file" className="hidden" accept="image/*,.pdf,.doc,.docx" />
                <Paperclip className="w-5 h-5 text-gray-400" />
              </label>
              
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about real estate..."
                className="flex-1 bg-transparent outline-none resize-none max-h-32 text-white placeholder-gray-500"
                rows={1}
              />
              
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'hover:bg-gray-900'
                }`}
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`p-2 rounded-lg transition-all ${
                  inputText.trim()
                    ? 'hover:opacity-90'
                    : 'bg-gray-800 cursor-not-allowed'
                }`}
                style={inputText.trim() ? { background: '#E3EF26', color: '#000000' } : {}}
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-black border-l border-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
              className="w-full hover:opacity-90 text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-opacity"
              style={{ background: '#E3EF26' }}
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>

          {/* Feature Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleFraudDetection}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Fraud Detection</h3>
                  <p className="text-xs text-gray-400">Verify property authenticity</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleMarketAnalysis}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-start gap-3">
                <BarChart2 className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Market Analysis</h3>
                  <p className="text-xs text-gray-400">Latest trends & insights</p>
                </div>
              </div>
            </button>
          </div>

          {/* Best Investments Section */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3">Best Investments Today</h3>
            <div className="space-y-3">
              {dailyProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-xl overflow-hidden transition-colors cursor-pointer group"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {property.roi} ROI
                    </div>
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {property.type}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate mb-2">{property.title}</h4>
                    <div className="flex items-center gap-1 text-cyan-500 mb-1">
                      <IndianRupee className="w-3 h-3" />
                      <span className="text-sm font-semibold">{property.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{property.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 Properties update daily based on market trends
            </p>
          </div>

          {/* Logout Button */}
          <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mt-6 transition-colors border border-red-500/20">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Back Button - Bottom Left */}
      <button
        onClick={() => router.push('/home')}
            className="fixed bottom-6 left-6 z-50 p-4 hover:opacity-90 text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50 group"
            style={{ background: '#E3EF26' }}
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Back to Home
        </span>
      </button>
    </div>
  );
}

