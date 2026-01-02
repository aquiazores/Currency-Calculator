# Currency Converter - Complete Setup Guide

This guide will walk you through setting up the Currency Converter step by step.

---

## 📋 Prerequisites

Before you start, make sure you have:

### ✅ Node.js (REQUIRED)
- **Download from:** https://nodejs.org/
- **Choose:** LTS (Long Term Support) version
- **To check if installed:** 
  1. Open terminal/command prompt
  2. Type: `node --version`
  3. You should see something like: `v18.17.0` or `v20.10.0`
  4. If you see an error, install Node.js first!

- **Also check npm:** Type `npm --version`
  - npm comes with Node.js
  - You should see something like: `9.8.0` or `10.2.0`

**⚠️ If Node.js is not installed, `npm install` will NOT work!**

#### 🪟 Windows PowerShell Users - Important!

If you see this error in PowerShell:
```
The command node was not found, but does exist in the current location.
Windows PowerShell does not load commands from the current location by default.
```

**This means:** You have a `node.exe` file in your current folder, but Node.js is NOT properly installed system-wide.

**Solution:**
1. **Don't use `.\node`** - This only works in that one folder
2. **Properly install Node.js:**
   - Go to https://nodejs.org/
   - Download the LTS version (Windows Installer .msi)
   - Run the installer
   - **IMPORTANT:** Check "Add to PATH" during installation (should be checked by default)
   - Restart PowerShell completely (close and reopen)
   - Navigate to a DIFFERENT folder (not where node.exe was)
   - Test: `node --version` (should work from anywhere now!)

3. **If it still doesn't work:**
   - Restart your computer (sometimes needed for PATH changes)
   - Or manually add Node.js to PATH (advanced - see troubleshooting section)

### ✅ Web Browser
- Chrome, Firefox, Edge, Safari, etc.
- Any modern browser works

### ✅ Text Editor (Optional but helpful)
- VS Code (recommended): https://code.visualstudio.com/
- Notepad++ (Windows)
- Any text editor works

---

## 🗂️ Step 1: Understanding the Project Structure

```
Currency Calculator/
├── frontend/
│   └── index.html          # The webpage users see
├── backend/
│   ├── server.js           # The server that handles requests
│   ├── package.json        # List of required packages
│   └── .env                # Your secret keys (create this!)
├── supabase/
│   └── schema.sql          # Database table definitions
└── README.md
```

**Think of it like this:**
- `frontend/index.html` = The restaurant menu (what customers see)
- `backend/server.js` = The kitchen (processes orders)
- `supabase/` = The storage room (keeps records)

---

## 🚀 Step 2: Set Up the Backend

### 2.1 Install Node.js Packages

**⚠️ Before you start:** Make sure Node.js is installed!

1. **Check if Node.js is installed:**
   ```bash
   node --version
   ```
   - If you see a version number (like `v18.17.0`), you're good! ✅
   - If you see an error, install Node.js from https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   
   **🪟 Windows PowerShell Users:**
   - If you see: "node was not found, but does exist in the current location"
   - This means Node.js is NOT properly installed
   - See troubleshooting section below for detailed fix
   - **Don't use `.\node`** - install Node.js properly instead!

2. **Check if npm is installed:**
   ```bash
   npm --version
   ```
   - npm comes with Node.js, so if Node.js works, npm should too
   - If this fails, reinstall Node.js

3. **Open your terminal/command prompt**
   - **Windows:** Press `Win + R`, type `cmd`, press Enter
   - **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter
   - **Linux:** Press `Ctrl + Alt + T`

4. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
   
   **💡 Tip:** Make sure you're in the right folder!
   - Type `dir` (Windows) or `ls` (Mac/Linux) to see files
   - You should see `package.json` and `server.js` in the list
   - If not, you're in the wrong folder!

5. **Install required packages:**
   ```bash
   npm install
   ```

   **What this does:** Downloads all the code libraries we need (Express, Supabase client, etc.)

   **Expected output:** You'll see a list of packages being installed, and a `node_modules` folder will be created.

   **✅ Success looks like:**
   ```
   added 150 packages, and audited 151 packages in 15s
   ```

   **❌ If you get an error, see troubleshooting below!**

6. **Verify installation worked:**
   ```bash
   dir node_modules
   ```
   (On Mac/Linux, use: `ls node_modules`)
   
   - You should see a long list of folders
   - If you see "node_modules" folder exists, installation worked! ✅
   - If you get an error, the installation failed

### 2.2 Create Environment Variables File

1. In the `backend` folder, create a file named `.env`
2. Copy this template into it:

   ```
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_KEY=your_supabase_anon_key_here
   PORT=3000
   ```

3. **Don't fill in the values yet** - we'll get them from Supabase in the next step!

---

## 🗄️ Step 3: Set Up Supabase (Database)

### 3.1 Create a Supabase Project

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub, Google, or email
4. Click **"New Project"**
5. Fill in:
   - **Name:** Currency Converter (or any name you like)
   - **Database Password:** Create a strong password (save it somewhere safe!)
   - **Region:** Choose closest to you
6. Click **"Create new project"**
7. Wait 2-3 minutes for project to be created

### 3.2 Get Your API Keys

1. In your Supabase project dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL** - Copy this (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** - Copy this (long string of letters and numbers)

4. Go back to your `backend/.env` file and replace:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=your_long_key_here
   ```

   **⚠️ Important:** Never share these keys publicly! They're like passwords.

### 3.3 Create Database Tables

1. In Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` from this project
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

**What this does:** Creates two tables:
- `currencies` - Stores currency codes and exchange rates
- `conversion_history` - Stores every conversion you make

### 3.4 Verify Tables Were Created

1. In Supabase dashboard, click **"Table Editor"** in the left sidebar
2. You should see two tables: `currencies` and `conversion_history`
3. Click on `currencies` - you should see 7 currencies already inserted!

---

## 🧪 Step 4: Test the Backend

### 4.1 Start the Server

1. Make sure you're in the `backend` folder in terminal
2. Run:
   ```bash
   node server.js
   ```

3. You should see:
   ```
   ✅ Connected to Supabase!
   🚀 Server is running!
   📍 Listening on http://localhost:3000
   ```

### 4.2 Test the API

**Option 1: Using Browser**
- Open browser and go to: http://localhost:3000
- You should see a JSON response with API information

**Option 2: Using Terminal (curl)**
- Open a NEW terminal window
- Run:
  ```bash
  curl http://localhost:3000
  ```

**Option 3: Test Conversion Endpoint**
- You can test the conversion endpoint using this command:
  ```bash
  curl -X POST http://localhost:3000/convert -H "Content-Type: application/json" -d "{\"amount\":100,\"from\":\"USD\",\"to\":\"EUR\"}"
  ```

If you see a response, your backend is working! ✅

**Keep the server running** - don't close this terminal window!

---

## 🎨 Step 5: Test the Frontend

### 5.1 Open the Frontend

1. Open the file `frontend/index.html` in your web browser
   - **Windows:** Right-click → "Open with" → Choose your browser
   - **Mac:** Right-click → "Open with" → Choose your browser
   - Or drag the file into your browser window

2. You should see a beautiful currency converter interface!

### 5.2 Test a Conversion

1. Enter an amount (e.g., `100`)
2. Select "From Currency" (e.g., USD)
3. Select "To Currency" (e.g., EUR)
4. Click **"Convert"**
5. You should see the result!

**If it doesn't work:**
- Make sure backend server is still running
- Check browser console (F12) for errors
- Verify `API_URL` in `index.html` matches your backend port (default: 3000)

---

## ✅ Step 6: Verify Everything Works

### Checklist:

- [ ] Backend server is running without errors
- [ ] Can access http://localhost:3000 in browser
- [ ] Frontend loads and shows currency dropdowns
- [ ] Can successfully convert currencies
- [ ] Result appears correctly
- [ ] No errors in browser console (F12)

---

## 🐛 Common Problems & Solutions

### Problem: PowerShell says "node was not found, but does exist in the current location"

**This is a Windows PowerShell security feature!**

**What it means:**
- You have a `node.exe` file in your current folder
- But Node.js is NOT installed system-wide
- PowerShell won't run commands from current folder for security

**❌ DON'T do this:** Using `.\node` only works in that one folder - not a real solution!

**✅ DO THIS instead:**

1. **Properly install Node.js:**
   - Go to https://nodejs.org/
   - Download **Windows Installer (.msi)** - LTS version
   - Run the installer
   - **During installation:** Make sure "Add to PATH" is checked (usually checked by default)
   - Click "Next" through all steps
   - Click "Finish" when done

2. **Close ALL PowerShell windows completely**
   - Close every PowerShell/terminal window
   - This is important - PowerShell caches PATH

3. **Open a NEW PowerShell window**
   - Press `Win + X`, choose "Windows PowerShell" or "Terminal"
   - Or press `Win + R`, type `powershell`, press Enter

4. **Test from a different folder:**
   ```powershell
   # Navigate to a different folder (like your home folder)
   cd ~
   
   # Test node
   node --version
   ```
   - Should show version number (like `v20.10.0`)
   - If it works here, Node.js is properly installed! ✅

5. **Now navigate to your project:**
   ```powershell
   cd "E:\SAMPLES\Currency Calculator\backend"
   node --version
   npm --version
   ```
   - Both should work now!

6. **If it still doesn't work after restarting:**
   - Restart your computer (PATH changes sometimes need a full restart)
   - Or manually add to PATH (see advanced solution below)

**Advanced: Manual PATH Configuration (if above doesn't work)**
1. Press `Win + X`, choose "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find "Path", click "Edit"
5. Click "New", add: `C:\Program Files\nodejs\`
6. Click OK on all windows
7. Restart PowerShell

### Problem: "npm install" doesn't work or shows errors

**Error: "npm is not recognized" or "command not found"**
- **Solution:** Node.js is not installed or not in your PATH
  1. Download and install Node.js from https://nodejs.org/ (choose LTS version)
  2. Restart your terminal/command prompt after installing
  3. Verify with: `node --version` and `npm --version`

**Error: "Cannot find module" or "package.json not found"**
- **Solution:** You're not in the right folder
  1. Make sure you're in the `backend` folder
  2. Check by typing `dir` (Windows) or `ls` (Mac/Linux)
  3. You should see `package.json` in the list
  4. If not, navigate: `cd backend` (from project root)

**Error: "npm ERR! network" or "ETIMEDOUT"**
- **Solution:** Network/connection issue
  1. Check your internet connection
  2. Try again: `npm install`
  3. If it persists, try: `npm install --verbose` to see more details
  4. Some networks block npm, try using mobile hotspot

**Error: "npm ERR! code EACCES" (permission denied)**
- **Solution:** Permission issue (common on Mac/Linux)
  1. **Mac/Linux:** Try with sudo (not recommended): `sudo npm install`
  2. **Better solution:** Fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors
  3. **Windows:** Run terminal as Administrator

**Error: "npm ERR! code ELIFECYCLE"**
- **Solution:** Corrupted cache or node_modules
  1. Delete `node_modules` folder (if it exists)
  2. Delete `package-lock.json` (if it exists)
  3. Clear npm cache: `npm cache clean --force`
  4. Try again: `npm install`

**Error: "npm WARN deprecated" or warnings**
- **Solution:** These are just warnings, not errors
  - Warnings are usually safe to ignore
  - If installation completes, you're good to go!

**Still not working?**
1. Make sure you're using a recent version of Node.js (14+)
2. Try updating npm: `npm install -g npm@latest`
3. Check npm version: `npm --version` (should be 6+)
4. Try alternative: `npm ci` (clean install)

### Problem: "Cannot connect to server"
**Solution:** 
- Make sure backend is running (`node server.js`)
- Check that port 3000 is not used by another program
- Verify `API_URL` in `index.html` is correct

### Problem: "Missing Supabase credentials"
**Solution:**
- Make sure `.env` file exists in `backend/` folder
- Check that `.env` has `SUPABASE_URL` and `SUPABASE_KEY`
- Make sure there are no spaces around the `=` sign

### Problem: "Error loading currencies"
**Solution:**
- Check Supabase connection (backend console should show "✅ Connected to Supabase!")
- Verify tables were created in Supabase
- Check that `currencies` table has data

### Problem: "Module not found" error
**Solution:**
- Make sure you ran `npm install` in the `backend/` folder
- Delete `node_modules` folder and run `npm install` again

---

## 🎓 What You've Learned

1. **Backend Server:** Express.js server that handles API requests
2. **Database:** Supabase stores currencies and conversion history
3. **Frontend:** HTML page that users interact with
4. **API Communication:** Frontend sends requests, backend responds

---

## 🚀 Next Steps

Once everything works locally, you can:
1. Deploy backend to Render (see `DEPLOYMENT_GUIDE.md`)
2. Update frontend to use deployed backend URL
3. Add more currencies
4. Add features like conversion history display

---

## 💡 Tips for Beginners

1. **Read error messages carefully** - they usually tell you what's wrong
2. **Check the console** - Browser console (F12) and terminal show helpful errors
3. **One step at a time** - Don't skip steps, each one builds on the previous
4. **Save your work** - Make sure files are saved before testing
5. **Ask questions** - If stuck, review the code comments

---

**Congratulations!** 🎉 You've built a full-stack currency converter!

