# Deployment Guide - Deploy to Render

This guide will help you deploy your Currency Converter backend to Render so it's accessible on the internet.

---

## 🌐 What is Deployment?

**Think of it like this:**
- **Local development:** Your app runs on your computer (localhost:3000)
- **Deployment:** Your app runs on a server on the internet (anyone can access it)

**Why deploy?**
- Share your app with others
- Access it from anywhere
- Make it available 24/7

---

## 📋 Prerequisites

Before deploying, make sure:
- [ ] Your app works locally (tested with `node server.js`)
- [ ] You have a GitHub account (free)
- [ ] Your code is pushed to GitHub (we'll cover this)

---

## 🔧 Step 1: Prepare Your Code for Deployment

### 1.1 Update server.js for Production

We need to make a small change so the server works on Render.

**Current code (line ~10 in server.js):**
```javascript
dotenv.config();
```

**This is fine!** The `dotenv` package will work on Render too.

### 1.2 Make sure package.json has a start script

Open `backend/package.json` and verify it has:
```json
"scripts": {
  "start": "node server.js"
}
```

✅ This should already be there!

---

## 📦 Step 2: Push Code to GitHub

Render needs your code from GitHub. If you haven't done this yet:

### 2.1 Initialize Git (if not already done)

1. Open terminal in your project root folder
2. Run:
   ```bash
   git init
   ```

### 2.2 Create .gitignore (already created!)

Make sure `.gitignore` exists and includes `.env` (so secrets aren't uploaded)

✅ This is already done!

### 2.3 Create GitHub Repository

1. Go to https://github.com
2. Click **"New repository"** (green button)
3. Name it: `currency-converter` (or any name)
4. Make it **Public** (free tier on Render requires public repos)
5. Click **"Create repository"**

### 2.4 Push Your Code

GitHub will show you commands. Run these in your project folder:

```bash
git add .
git commit -m "Initial commit - Currency Converter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/currency-converter.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

---

## 🚀 Step 3: Deploy to Render

### 3.1 Create Render Account

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest way)
4. Authorize Render to access your GitHub

### 3.2 Create New Web Service

1. In Render dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub account if prompted
4. Find and select your `currency-converter` repository
5. Click **"Connect"**

### 3.3 Configure Your Service

Fill in these settings:

**Name:**
- `currency-converter` (or any name you like)

**Region:**
- Choose closest to you (e.g., "Oregon (US West)" for US)

**Branch:**
- `main` (or `master` if that's your branch)

**Root Directory:**
- `backend` (important! This tells Render where your server.js is)

**Runtime:**
- `Node`

**Build Command:**
- `npm install`
- (This installs all packages)

**Start Command:**
- `node server.js`
- (This starts your server)

**Plan:**
- Select **"Free"** (for learning/testing)

### 3.4 Add Environment Variables

**This is CRITICAL!** Render needs your Supabase credentials.

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add these one by one:

   **Variable 1:**
   - Key: `SUPABASE_URL`
   - Value: (paste your Supabase project URL)

   **Variable 2:**
   - Key: `SUPABASE_KEY`
   - Value: (paste your Supabase anon key)

   **Variable 3:**
   - Key: `PORT`
   - Value: `10000`
   - (Render provides port via environment variable, but we set a default)

4. Click **"Save Changes"**

### 3.5 Deploy!

1. Scroll to bottom
2. Click **"Create Web Service"**
3. Wait 2-5 minutes for deployment
4. You'll see build logs - watch for errors!

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Deployment Status

- Render will show you a URL like: `https://currency-converter-xxxx.onrender.com`
- Wait until status shows **"Live"** (green)

### 4.2 Test Your Deployed API

1. Open the URL in browser
2. You should see the same JSON response as localhost
3. Test the convert endpoint:
   ```
   https://your-app.onrender.com/convert
   ```

### 4.3 Update Frontend to Use Deployed Backend

1. Open `frontend/index.html`
2. Find this line (around line 200):
   ```javascript
   const API_URL = 'http://localhost:3000';
   ```
3. Replace with your Render URL:
   ```javascript
   const API_URL = 'https://your-app.onrender.com';
   ```
4. Save and test locally - it should now use the deployed backend!

---

## 🐛 Common Deployment Problems

### Problem: "Build failed" or "Module not found"

**Solution:**
- Make sure `Root Directory` is set to `backend`
- Check that `package.json` is in the `backend` folder
- Verify all dependencies are listed in `package.json`

### Problem: "Application error" or "Cannot connect to Supabase"

**Solution:**
- Check environment variables are set correctly in Render
- Make sure `SUPABASE_URL` and `SUPABASE_KEY` are correct
- No extra spaces in environment variable values
- Check Supabase dashboard - make sure project is active

### Problem: "Port already in use"

**Solution:**
- Render automatically provides a port via `process.env.PORT`
- Our code already handles this: `const PORT = process.env.PORT || 3000;`
- This should work automatically!

### Problem: "Service keeps restarting"

**Solution:**
- Check Render logs (click "Logs" tab)
- Look for error messages
- Common issue: Missing environment variables
- Common issue: Database connection failing

### Problem: "Free tier spins down after inactivity"

**Solution:**
- Render free tier stops your app after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (it's waking up)
- This is normal for free tier!
- Paid plans don't have this limitation

---

## 🔒 Security Best Practices

### ✅ DO:
- Use environment variables for secrets (we're doing this!)
- Keep `.env` in `.gitignore` (already done!)
- Use Supabase Row Level Security (RLS) for production
- Regularly update dependencies

### ❌ DON'T:
- Commit `.env` file to GitHub
- Hardcode API keys in code
- Share your Supabase keys publicly
- Use admin keys in frontend code

---

## 📊 Monitoring Your Deployment

### View Logs

1. In Render dashboard, click your service
2. Click **"Logs"** tab
3. See real-time logs of your application

### View Metrics

1. Click **"Metrics"** tab
2. See CPU, memory usage
3. Monitor request count

---

## 🔄 Updating Your Deployment

When you make changes:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Updated feature"
   git push
   ```

2. Render automatically detects changes and redeploys!
3. Wait 2-5 minutes for new deployment

---

## 💰 Understanding Render Free Tier

**Limitations:**
- Apps spin down after 15 min inactivity
- 750 hours/month free (enough for learning!)
- Slower cold starts (~30 seconds)

**For Production:**
- Consider paid plan ($7/month) for:
  - Always-on service
  - Faster response times
  - More resources

---

## 🎓 What You've Learned

1. **Deployment:** Making your app accessible on the internet
2. **Environment Variables:** Secure way to store secrets
3. **GitHub Integration:** How to connect code to deployment
4. **Production vs Development:** Differences in how apps run

---

## 🚀 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Update frontend to use deployed backend
3. 🎯 Deploy frontend to Netlify/Vercel (optional)
4. 🎯 Add custom domain (optional)
5. 🎯 Set up monitoring and alerts

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Express.js Docs:** https://expressjs.com/

---

**Congratulations!** 🎉 Your currency converter is now live on the internet!

