# Vercel Deployment Guide

## 🚀 Deploy WhatsApp-Style Messaging to Vercel

### Prerequisites
- GitHub repository: `https://github.com/xshadabx/real-estate-website.git`
- Vercel account connected to GitHub
- Convex project set up

### Deployment Steps

#### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import from GitHub: `xshadabx/real-estate-website`

#### 2. Environment Variables
Set these environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CONVEX_URL=https://outgoing-squirrel-476.convex.cloud
```

#### 3. Build Settings
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

#### 4. Deploy
- Click "Deploy" button
- Vercel will automatically build and deploy
- Your site will be available at: `https://your-project.vercel.app`

### Features Deployed
✅ WhatsApp-style messaging interface
✅ Interactive chat with Aisha AI
✅ Real-time typing indicators
✅ Quick reply buttons
✅ Message bubbles with timestamps
✅ Auto-scroll functionality
✅ Convex database integration

### Post-Deployment
1. Test the messaging system at `/profile`
2. Verify Convex connection
3. Check all interactive features work
4. Test on mobile devices

### Troubleshooting
- If Convex connection fails, check environment variables
- If build fails, ensure all dependencies are in package.json
- Check Vercel logs for any errors

### URLs
- Production: `https://your-project.vercel.app`
- Profile with messaging: `https://your-project.vercel.app/profile`
- Login: `https://your-project.vercel.app/login`
