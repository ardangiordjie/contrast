# 🎯 Demo Cheat Sheet - Print This!

**30-Second Opener:**
> "Judges need to see real API calls, not fake demos. Let me prove everything here is real."

---

## 🎬 Demo Flow (5 Minutes)

### 1. Setup (30 sec)
- [ ] Open `http://localhost:3000`
- [ ] Press F12 → Network tab
- [ ] Click "Show Proof Panel"
- [ ] Say: "Watch the actual API calls"

### 2. API Proof (1 min)
- [ ] Click **🌤️ Perplexity Weather**
- [ ] Point to DevTools: "That's the real POST request"
- [ ] Point to API Activity Log: "800ms to Perplexity's servers"
- [ ] Point to Before/After: "Agent changed client status"

### 3. Memory Proof (1 min)
- [ ] Click **🧠 Hyperspell Memory**
- [ ] Show response: "Agent recalled client prefers golden hour"
- [ ] Point to Before/After: "Personalized based on memory"

### 4. The Knockout (2+ min)
- [ ] Say: "Give me your email, I'll send you a quote in 30 seconds"
- [ ] Judge enters email
- [ ] Click send
- [ ] **Wait for countdown**
- [ ] Judge checks phone
- [ ] **Judge:** "Holy shit, I got it"
- [ ] **You:** "That was a real API call. Look at the log."

### 5. Closing (30 sec)
- [ ] Show Before/After summary
- [ ] Show API Activity Log (all calls)
- [ ] Say: "Every action was real. Nothing was faked."

---

## 💬 Key Phrases

**Opening:**
- "This is proof, not a demo"
- "Watch the DevTools—you'll see the actual HTTP requests"

**During API Calls:**
- "See that? Real POST request to [Service]"
- "Look at the timestamp—that just happened"
- "Here's the actual response from the API"

**Live Email Test:**
- "Want to participate? Give me your email"
- "In 30 seconds, my agent will send you something"
- "Check your phone right now"

**When They Get Email:**
- "Did you get it?"
- "That's proof—check the timestamp"
- "Look at the API log—that was a real call"

**Closing:**
- "Everything you saw was real"
- "No mock data, no fake responses"
- "This is how AI agents actually work"

---

## 🚨 If Something Goes Wrong

### Email Doesn't Send
✅ Show API Activity Log (proof it tried)  
✅ Show DevTools Network request  
✅ Say: "This is demo mode. In production, that goes to AgentMail's servers"  
✅ Offer to show the code

### API Call Fails
✅ Show the error in DevTools  
✅ Show the error in API Activity Log  
✅ Say: "This proves it's real—fake demos don't fail"

### Judge Skeptical
✅ Offer to show the code  
✅ Run `curl` command in terminal  
✅ Show `.env.local` (without revealing keys)  
✅ Say: "You can verify this yourself"

---

## 🎯 Success = Judge Says:

- "Wait, that's actually real?"
- "Holy shit"
- "How does this work?" (not "Is this real?")
- *Takes photo of your screen*
- *Nods and writes notes*

---

## ⚡ Quick Commands

### Start Server
```bash
pnpm dev
```

### Test Email API
```bash
curl -X POST http://localhost:3000/api/send-live-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test"}'
```

### Open DevTools
- Mac: `Cmd + Option + I`
- Windows/Linux: `F12`

### Show Network Tab
- DevTools → Network → Enable "Preserve log"

---

## 📋 Pre-Demo Checklist

**5 Minutes Before:**
- [ ] Server running (`pnpm dev`)
- [ ] Browser at `http://localhost:3000`
- [ ] DevTools open (F12 → Network)
- [ ] "Preserve log" enabled
- [ ] Clear network log
- [ ] Test one API call
- [ ] This cheat sheet printed/visible

**Right Before:**
- [ ] Take a breath
- [ ] Remember: confidence sells
- [ ] You've built something real
- [ ] Show them the proof

---

## 🏆 Demo Goals

1. ✅ Judge sees API calls in DevTools
2. ✅ Judge sees API Activity Log update
3. ✅ Judge sees Before/After changes
4. ✅ Judge participates (emails themselves)
5. ✅ Judge verifies (checks phone)
6. ✅ Judge believes it's real

---

**Remember:** Judges have seen fake demos. Your job is to make it **impossible to deny** that this is real.

**Proof beats promises. Show them the API calls.**

---

*Good luck! 🚀*

