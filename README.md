# Real Estate Website

A modern, responsive real estate website built with Next.js, TypeScript, and Tailwind CSS. Features a stunning day-to-night transition design with animated elements and comprehensive real estate functionality.

## 🚀 Features

- **Modern Design**: Beautiful day-to-night split-screen hero section
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Animations**: Smooth transitions and hover effects
- **Property Listings**: Showcase featured properties with detailed information
- **Contact Forms**: Integrated contact and inquiry forms
- **SEO Optimized**: Built-in SEO best practices
- **Performance**: Fast loading with Next.js optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Validation**: Zod

## 📦 Dependencies

### Core Dependencies
- `next` - React framework for production
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS framework
- `framer-motion` - Animation library
- `lucide-react` - Icon library

### Development Dependencies
- `eslint` - Code linting
- `prettier` - Code formatting
- `@tailwindcss/forms` - Form styling
- `@tailwindcss/typography` - Typography plugin

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: Blue tones for main branding
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Gold/yellow for highlights
- **Day/Night**: Special colors for the hero section

### Animations
Custom animations are defined in the Tailwind config:
- `fade-in`, `slide-up`, `slide-down`
- `scale-in`, `float`, `pulse-slow`

### Components
All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Responsive design principles

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Key Features

### Hero Section
- Split-screen day/night design
- Animated sun, moon, and clouds
- Central skyscraper with day/night windows
- Smooth transitions and floating animations

### Property Listings
- Grid layout with property cards
- Featured property highlighting
- Property details (bedrooms, bathrooms, area)
- Interactive elements (favorites, contact)

### Contact Section
- Contact information display
- Interactive contact form
- Multiple contact methods
- Form validation

## 🚀 Deployment

The project is ready for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email info@realestate.com or create an issue in the repository.
