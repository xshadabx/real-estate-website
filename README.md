# 🏠 Prop.AI - Mobile-Optimized Real Estate Website

A modern, responsive real estate platform built with Next.js 14, featuring mobile-first design, dark theme, and Google Maps integration.

## ✨ Features

### 📱 Mobile-First Design
- **Touch-Friendly Navigation**: Bottom navigation optimized for mobile
- **Responsive Layout**: Automatically adapts to any screen size
- **Mobile Menu**: Hamburger menu with overlay for profile access
- **Touch Gestures**: Smooth animations and interactions

### 🖥️ Desktop Experience
- **Full Sidebar**: Always-visible profile sidebar on desktop
- **Multi-Column Grid**: Up to 4 property columns on large screens
- **Hover Effects**: Rich desktop interactions
- **Desktop Layout**: Full-width experience with sidebar

### 🎨 Modern UI/UX
- **Dark Theme**: Sleek dark interface with yellow accents (#E3EF26)
- **Smooth Animations**: Framer Motion powered transitions
- **Professional Design**: Clean, modern real estate interface
- **Consistent Branding**: Yellow accent color throughout

### 🗺️ Location Integration
- **Google Maps**: Direct integration with location buttons
- **Dark Theme Maps**: Matches website's dark aesthetic
- **Touch-Friendly**: Mobile-optimized map interactions

### 🤖 AI Assistant
- **Aisha Chat**: AI-powered property recommendations
- **Real-time Chat**: Interactive chat interface
- **Smart Suggestions**: Personalized property advice

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/prop-ai-real-estate.git
cd prop-ai-real-estate

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# The static files will be in the 'out' directory
# Ready for deployment to any static hosting service
```

## 📱 Responsive Design

### Mobile (< 640px)
- Single column property grid
- Bottom navigation bar
- Touch-friendly buttons (10x10)
- Mobile menu with overlay
- Compact spacing

### Tablet (640px - 1023px)
- 2-column property grid
- Medium navigation buttons (12x12)
- Hybrid mobile/desktop features
- Balanced layout

### Desktop (1024px+)
- 3-4 column property grid
- Full sidebar navigation
- Large navigation buttons (14x14)
- Desktop hover effects
- Full-width layout

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Backend**: Supabase (ready for integration)
- **Deployment**: Static export ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── home/              # Dashboard page
│   ├── explore/           # Property browsing
│   ├── profile/           # User profile
│   ├── aisha/             # AI assistant
│   └── login/             # Authentication
├── components/            # Reusable components
│   ├── auth/              # Authentication forms
│   ├── providers/         # React context providers
│   └── sections/          # Page sections
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Automatic deployment on every push
3. Global CDN and edge functions

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

### GitHub Pages
1. Push the `out` directory contents
2. Enable GitHub Pages in repository settings

## 🎯 Key Features

### Property Listings
- **Responsive Grid**: 1-4 columns based on screen size
- **Location Buttons**: Direct Google Maps integration
- **Property Cards**: Beautiful cards with images and details
- **Search & Filter**: Advanced property filtering

### User Profiles
- **Buyer Profiles**: Property collections and preferences
- **Seller Profiles**: Listing management and analytics
- **Responsive Sidebar**: Mobile overlay, desktop always-visible

### AI Assistant (Aisha)
- **Chat Interface**: Real-time chat with AI
- **Property Recommendations**: Smart suggestions
- **Mobile Optimized**: Touch-friendly chat interface

## 📱 Mobile Optimizations

- **Touch Navigation**: Bottom navigation for easy thumb access
- **Responsive Images**: Optimized for mobile bandwidth
- **Touch Targets**: Minimum 44px touch targets
- **Swipe Gestures**: Smooth mobile interactions
- **Viewport Meta**: Proper mobile rendering

## 🖥️ Desktop Features

- **Full Sidebar**: Always-visible profile sidebar
- **Multi-Column Layout**: Up to 4 property columns
- **Hover Effects**: Rich desktop interactions
- **Keyboard Navigation**: Full keyboard support
- **Large Screens**: Optimized for 1920px+ displays

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Variables
Create `.env.local` for Supabase integration:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@prop-ai.com or create an issue on GitHub.

---

**Built with ❤️ for the future of real estate** 🏠✨