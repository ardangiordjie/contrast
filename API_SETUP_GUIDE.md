# 🔑 API Setup Guide - Real Integration

All API routes are now updated to use **real APIs**. They will automatically:
- ✅ Use real APIs if you have keys
- ✅ Fall back to demo mode if you don't
- ✅ Show which service is being used in logs

---

## 📝 Step 1: Create .env.local File

In your project root, create a file called `.env.local`:

```bash
cd /Users/ardangiordjie/Downloads/contrast-main
touch .env.local
```

Or just create it manually in your editor.

---

## 🔑 Step 2: Add Your API Keys

Copy this template into `.env.local` and replace with your actual keys:

```bash
# === EMAIL SERVICE ===
# Option 1: Resend (recommended - easiest)
RESEND_API_KEY=re_your_key_here

# Option 2: AgentMail (if you have access)
# AGENTMAIL_API_KEY=your_agentmail_key_here

# === WEATHER/SEARCH ===
PERPLEXITY_API_KEY=pplx-your_key_here

# === MEMORY/CONTEXT ===
HYPERSPELL_API_KEY=your_hyperspell_key_here

# === OPTIONAL CUSTOMIZATION ===
FROM_EMAIL=contrast@yourdomain.com
FROM_NAME=Contrast Photography
```

---

## 🎯 What Each API Does

### 1. **Email Service** (Required for live email test)

**Option A: Resend** (Recommended)
- Free tier: 100 emails/day
- Sign up: https://resend.com
- Get key: https://resend.com/api-keys
- Format: `re_xxxxxxxxxxxxx`

**Option B: AgentMail**
- If you have access to AgentMail
- Get your API key from your dashboard
- The route will try AgentMail first, then fall back to Resend

### 2. **Perplexity** (For weather/search data)
- Sign up: https://www.perplexity.ai/api
- Get API key from dashboard
- Format: `pplx-xxxxxxxxxxxxx`
- Cost: ~$5-20 for typical demo usage

### 3. **Hyperspell** (For client memory)
- If you have access to Hyperspell
- Get API key from dashboard
- Falls back to local in-memory storage if not available
- Local storage works fine for demos!

---

## ⚡ Step 3: Test Each API

After adding keys, restart your server:

```bash
pnpm dev
```

### Test Email:
```bash
curl -X POST http://localhost:3000/api/send-live-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","name":"Test User"}'
```

Check the response - it should say:
- `"service": "Resend"` or `"service": "AgentMail"` (if real)
- `"realEmail": true` (if real)

**Check your inbox!** 📧

### Test Weather:
```bash
curl -X POST http://localhost:3000/api/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"San Francisco","query":"cherry blossom forecast"}'
```

Should return:
- `"service": "Perplexity"` (if real)
- `"realData": true` (if real)

### Test Memory:
```bash
curl -X POST http://localhost:3000/api/client-memory \
  -H "Content-Type: application/json" \
  -d '{"action":"recall","clientId":"client-2"}'
```

Should return:
- `"service": "Hyperspell"` (if real)
- `"realAPI": true` (if real)

---

## 🎬 How It Works in Your Demo

### Without API Keys (Demo Mode):
- ✅ Everything still works
- ✅ Simulated delays (realistic timing)
- ✅ Mock data
- ✅ Good enough for most demos
- ⚠️ Console shows: "Demo Mode (No API key)"

### With API Keys (Production Mode):
- ✅ Real API calls
- ✅ Real emails sent
- ✅ Real weather data
- ✅ Actual responses
- ✅ Console shows: "Resend", "Perplexity", "Hyperspell"

**The UI works the same either way!**

---

## 📊 API Activity Log Shows:

When you have real API keys, the log will show:
```
Service: Resend          ← Real service name
Response time: 1,234ms   ← Real timing
Status: success          ← Real status
Response: "Email sent to judge@example.com"
```

When in demo mode, it shows:
```
Service: Demo Mode (No API key - set RESEND_API_KEY)
Response time: 1,500ms   ← Simulated
Status: success
Response: "Email simulated"
```

---

## 🐛 Troubleshooting

### "Unauthorized" or 401 Error
- Check your API key is correct
- Make sure you copied the full key
- Keys should have no spaces or extra characters
- Restart dev server after adding keys

### Email Not Sending (Resend)
- For testing, use: `onboarding@resend.dev` as FROM_EMAIL
- Check spam folder
- Verify API key at https://resend.com/api-keys
- Check console logs for error details

### Perplexity Not Working
- Check you have credits in your account
- Verify model name is correct: `llama-3.1-sonar-small-128k-online`
- Check console logs for error details

### Hyperspell Not Working
- Falls back to local storage (this is fine!)
- Local storage works great for demos
- Only needed if you want persistent memory

---

## 💰 Cost Breakdown

### For a Typical Judge Demo Day:

**Resend (Email):**
- Free tier: 100 emails/day
- Cost: $0 for demos
- You'll use maybe 5-10 emails

**Perplexity (Weather):**
- ~$0.001 per request
- You'll use maybe 10-20 requests
- Cost: ~$0.02 per demo day

**Hyperspell (Memory):**
- Depends on service
- Or use local storage: Free!

**Total: ~$0-5 for a full day of demos**

---

## 🎯 Recommended Setup

### Minimum (Good enough):
```bash
RESEND_API_KEY=your_key_here
```
- Just email is enough for the "holy shit" moment
- Weather/memory can use demo data

### Recommended (Best):
```bash
RESEND_API_KEY=your_key_here
PERPLEXITY_API_KEY=your_key_here
```
- Real emails + real weather data
- Memory can use local storage

### Maximum (Overkill but impressive):
```bash
RESEND_API_KEY=your_key_here
PERPLEXITY_API_KEY=your_key_here
HYPERSPELL_API_KEY=your_key_here
FROM_EMAIL=hello@yourdomain.com
```
- Everything is real
- Full production experience

---

## 📋 Quick Start Checklist

- [ ] Create `.env.local` file
- [ ] Add at least `RESEND_API_KEY`
- [ ] Restart server: `pnpm dev`
- [ ] Test email: Send to yourself
- [ ] Check inbox (including spam)
- [ ] Test in UI: Open http://localhost:3000
- [ ] Click "Show Proof Panel"
- [ ] Try live email test with your email
- [ ] Verify you receive the email
- [ ] Check API Activity Log shows real service
- [ ] You're ready to demo! 🚀

---

## 🎓 Pro Tips

1. **Test Before Judges Arrive**
   - Send yourself a test email
   - Make sure it arrives quickly
   - Check it's not in spam

2. **Have Backup**
   - If API fails, demo mode still works
   - You can still show the code
   - Explain: "This is where it calls the real API"

3. **Show the Proof**
   - Point to service name in API Activity Log
   - Open DevTools to show real POST request
   - Have judge check their inbox

4. **Multiple API Keys**
   - You can have both Resend AND AgentMail keys
   - System will try AgentMail first, then Resend
   - Provides redundancy

---

## 🚀 Ready to Go!

Once you've added your API keys:

1. Restart server: `pnpm dev`
2. Open: http://localhost:3000
3. Click "Show Proof Panel"
4. Test the live email form
5. You should receive a real email!

**Now you're ready to blow judges' minds with real API integration proof.** 🎯

