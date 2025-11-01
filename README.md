# 📸 Contrast - AI Photography Coordinator

> Your AI second shooter. Plans, guides, and cleans up after the chaos.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/ardangiordjies-projects/v0-photography-dashboard-design)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org)

---

## About This Project

### Problems We Solve

**1. Expectation Management**
- Clients expect magic shots in impossible conditions.
- **Solution**: A tool that predicts what's realistic given lighting, crowd, and time.

**2. Culling & Backlog Editing**
- After 10+ ceremonies, thousands of RAWs pile up.
- **Solution**: An agent that curates the best shots automatically.

**3. Golden Hour Optimization**
- Timing shifts daily; missing 10 minutes can ruin the look.
- **Solution**: An agent that tells you exactly when and where to shoot.

**4. Directing People**
- People freeze up or move awkwardly.
- **Solution**: AI that gives you posing prompts or reads composition in real time.

**5. Storage Management**
- Drives fill up fast, forcing painful manual deletion.
- **Solution**: An agent that smartly archives or deletes low-quality duplicates.

---

## What Contrast Does

✅ **Plans shoots** by checking light, crowd data, and schedule (powered by **Perplexity**)  
✅ **Curates photos** post-shoot using ML models for sharpness, smiles, or exposure (powered by **Hyperspell**)  
✅ **Auto-organizes & archives** your best work, emailing summaries via **AgentMail**

---

## Why I Built This

I built Contrast because I've shot graduation pictures where timing, lighting, and expectations collided. 

**Contrast is my AI second shooter.** It plans, guides, and cleans up after the chaos.

---

## 🎯 3-Layer Proof Strategy

To demonstrate that our AI agents are **real** (not fake demos), we built a 3-layer proof system:

### **Layer 1: Live API Calls** 🔴
Real-time API activity log showing actual network requests with timestamps, endpoints, and responses.

### **Layer 2: Before/After Proof** 📊
Visual state tracking that shows work was actually done (e.g., inbox changes, photo curation, client updates).

### **Layer 3: "Send It to Me Right Now" Test** 📧
The ultimate proof—judges provide their email and receive a **real-time pricing quote** in their inbox via AgentMail.

**Why this matters**: Anyone can mock up a UI. We prove our agents work by showing real API calls and real results.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/ardangiordjie/contrast.git
cd contrast

# Install dependencies
pnpm install

# Set up environment variables
cp env.local.template .env.local
# Add your API keys to .env.local

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 API Configuration

Contrast integrates with three powerful APIs:

- **[AgentMail](https://agentmail.com)** - Email automation (our sponsor!)
- **[Perplexity](https://perplexity.ai)** - Real-time weather and planning data
- **[Hyperspell](https://hyperspell.com)** - Client memory and context storage

### Setup Instructions

1. Get your API keys from each service
2. Add them to `.env.local`:

```env
AGENTMAIL_API_KEY=am_your_key_here
PERPLEXITY_API_KEY=pplx-your_key_here
HYPERSPELL_API_KEY=hs2-your_key_here
```

3. Restart the dev server

**Need help?** See [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) for detailed instructions.

---

## 📚 Documentation

- **[START_HERE.md](./START_HERE.md)** - 2-minute quick start guide
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Complete 500+ line presentation script
- **[DEMO_CHEATSHEET.md](./DEMO_CHEATSHEET.md)** - 1-page quick reference for demos
- **[API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md)** - Detailed API configuration
- **[AGENTMAIL_STATUS.md](./AGENTMAIL_STATUS.md)** - AgentMail integration status
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical overview

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **AI/APIs**: AgentMail, Perplexity, Hyperspell
- **Deployment**: Vercel

---

## 📸 Features

### Current
- ✅ Live API activity monitoring
- ✅ Real-time email sending (AgentMail)
- ✅ Weather-based shoot planning (Perplexity)
- ✅ Client memory/preferences (Hyperspell)
- ✅ Before/After state tracking
- ✅ Interactive demo panel

### Coming Soon
- 🔄 Photo curation ML models
- 🔄 Smart storage management
- 🔄 Golden hour calculator
- 🔄 Pose suggestion engine
- 🔄 Automated client emails

---

## 🎬 Demo

**For Judges**: 

1. Visit the deployed app
2. Click "Show Proof Panel"
3. Enter your email in the demo form
4. Click "Send Live Email"
5. **Check your inbox** - you'll receive a real quote!

This proves our agents make **real API calls**, not fake demos.

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 🙏 Acknowledgments

Special thanks to:
- **AgentMail** for sponsoring this project
- **Perplexity** for real-time data access
- **Hyperspell** for memory storage
- **UC Berkeley** for the inspiration

---

## 📬 Contact

Built by Ardan Giordjie

- GitHub: [@ardangiordjie](https://github.com/ardangiordjie)
- Project: [github.com/ardangiordjie/contrast](https://github.com/ardangiordjie/contrast)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ☕ and 📸 by a photographer who got tired of manual workflow

</div>
