# 🚀 Quick Setup Guide

Get your Contrast demo running in 5 minutes.

---

## Prerequisites

- Node.js 18+ installed
- pnpm installed (or npm/yarn)
- A modern browser (Chrome/Firefox/Edge)

---

## Installation

### Step 1: Install Dependencies

```bash
cd /Users/ardangiordjie/Downloads/contrast-main
pnpm install
```

### Step 2: Start Development Server

```bash
pnpm dev
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

---

## First Demo Run

### Quick Test (2 minutes)

1. **Open the app** at `http://localhost:3000`

2. **Click "Show Proof Panel"** button in the header

3. **Open DevTools:**
   - Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Go to **Network** tab
   - Enable "Preserve log"

4. **Test API Calls:**
   - Click **🌤️ Demo: Perplexity Weather**
   - Watch the Network tab show the POST request
   - Watch the API Activity Log update
   - Watch the Before/After Tracker show state change

5. **Test Live Email:**
   - Find the "Send It to Me Right Now" panel
   - Enter your email and name
   - Click "Send Me a Quote Now"
   - Wait 30 seconds
   - *Note: In demo mode, emails aren't actually sent. See Production Setup below.*

---

## Demo Mode vs Production Mode

### Demo Mode (Default)
- ✅ Works immediately, no API keys needed
- ✅ Simulates API delays (realistic timing)
- ✅ Shows all UI components working
- ❌ Doesn't send real emails
- ❌ Uses mock data

**Use for:** Testing, local development, UI demos

### Production Mode
- ✅ Makes real API calls
- ✅ Sends actual emails
- ✅ Fetches real weather data
- ✅ Stores real client memory
- ⚠️ Requires API keys

**Use for:** Judge presentations, real demos

---

## Production Setup

### Step 1: Get API Keys

Sign up for these services:

1. **AgentMail** (for email sending)
   - Sign up at: [agentmail.io](https://agentmail.io) (or your email service)
   - Get API key

2. **Perplexity** (for weather/search data)
   - Sign up at: [perplexity.ai](https://www.perplexity.ai/api)
   - Get API key

3. **Hyperspell** (for client memory)
   - Sign up at: [hyperspell.com](https://hyperspell.com) (or your memory service)
   - Get API key

### Step 2: Configure Environment Variables

Copy the example env file:

```bash
cp env.example .env.local
```

Edit `.env.local`:

```bash
AGENTMAIL_API_KEY=your_actual_key_here
PERPLEXITY_API_KEY=your_actual_key_here
HYPERSPELL_API_KEY=your_actual_key_here
```

### Step 3: Update API Routes

Open each API route file and uncomment the real API calls:

**Email: `/app/api/send-live-email/route.ts`**

```typescript
// Uncomment this:
const response = await fetch('https://api.agentmail.io/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.AGENTMAIL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: email,
    subject: `Photography Quote for ${name}`,
    template: 'pricing-quote',
    data: { name, pricing: 450 }
  })
})
```

**Weather: `/app/api/weather/route.ts`**

```typescript
// Uncomment this:
const response = await fetch('https://api.perplexity.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [{
      role: 'user',
      content: `Get current weather forecast for ${location}`
    }]
  })
})
```

**Memory: `/app/api/client-memory/route.ts`**

```typescript
// Uncomment this:
const response = await fetch('https://api.hyperspell.com/memory/store', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.HYPERSPELL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ clientId, data })
})
```

### Step 4: Test Production APIs

```bash
# Restart the dev server to load new env vars
pnpm dev

# Test email endpoint
curl -X POST http://localhost:3000/api/send-live-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Test weather endpoint
curl -X POST http://localhost:3000/api/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"San Francisco","query":"cherry blossom forecast"}'

# Test memory endpoint
curl -X POST http://localhost:3000/api/client-memory \
  -H "Content-Type: application/json" \
  -d '{"action":"store","clientId":"test-1","data":{"preference":"golden hour"}}'
```

---

## Deploying for Judges

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
vercel env add AGENTMAIL_API_KEY
vercel env add PERPLEXITY_API_KEY
vercel env add HYPERSPELL_API_KEY
```

Your app will be live at: `https://contrast-[random].vercel.app`

### Option 2: Local Network Demo

```bash
# Find your local IP
# Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig

# Start server
pnpm dev

# Share URL with judges on same network
# Example: http://192.168.1.100:3000
```

---

## Demo Checklist

Before presenting to judges:

### Pre-Demo Setup
- [ ] `pnpm dev` is running
- [ ] Browser open to `http://localhost:3000`
- [ ] DevTools open (F12 → Network tab)
- [ ] "Preserve log" enabled in Network tab
- [ ] "Show Proof Panel" clicked
- [ ] Demo script printed or memorized

### During Demo
- [ ] Point to DevTools when clicking demo buttons
- [ ] Show API Activity Log updating
- [ ] Show Before/After Tracker
- [ ] Get judge's email for live test
- [ ] Wait for 30-second countdown
- [ ] Don't move on until judge confirms email

### After Demo
- [ ] Show recap of all API calls
- [ ] Offer to show code
- [ ] Answer questions
- [ ] Get feedback

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Port 3000 already in use

```bash
# Use a different port
pnpm dev -- -p 3001
```

### API routes returning 404

```bash
# Make sure you're using App Router structure
# Files should be at: /app/api/*/route.ts
# Not: /pages/api/*.ts
```

### Environment variables not loading

```bash
# Restart dev server after changing .env.local
# Make sure file is named exactly: .env.local
# Not: .env or env.local
```

### TypeScript errors

```bash
# Check TypeScript version
pnpm list typescript

# Should be 5.x
# If not, update:
pnpm add -D typescript@latest
```

---

## Next Steps

1. **Read the Demo Guide:** See `DEMO_GUIDE.md` for full presentation script
2. **Customize the UI:** Edit `/app/page.tsx` and components
3. **Add More Agents:** Create new API routes and connect them
4. **Test with Real Judges:** Get feedback and iterate

---

## Support

### Documentation
- [Demo Guide](./DEMO_GUIDE.md) - Complete presentation guide
- [README](./README.md) - Project overview
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation

### Common Issues
- API calls not showing: Make sure DevTools is open BEFORE clicking
- Email not sending: Check `.env.local` and API route implementation
- Before/After not updating: Check browser console for React errors

### Questions?
- Check the demo guide first
- Look at existing API route files for examples
- Test with `curl` to isolate API issues

---

**You're ready to prove your agents are real. Good luck! 🚀**

