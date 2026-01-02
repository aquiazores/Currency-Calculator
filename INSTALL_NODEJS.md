# 🎯 How to Install Node.js on Windows (Step-by-Step)

## ⚠️ Important: You Must RUN the Installer!

**Just downloading the file is NOT enough!** You need to **double-click and run** the installer.

---

## 📥 Step 1: Find the Installer File

1. Go to your `SAMPLES` folder (or wherever you downloaded Node.js)
2. Look for a file that looks like this:
   - `node-v20.10.0-x64.msi` ✅ (This is what you need!)
   - Or `node-v18.17.0-x64.msi` ✅
   - Any file ending in `.msi` with "node" in the name

**If you don't see a `.msi` file:**
- You might have downloaded the wrong thing
- Go to https://nodejs.org/
- Click the big green "LTS" button
- This downloads the correct `.msi` installer file

---

## 🚀 Step 2: RUN the Installer (Double-Click It!)

1. **Find the `.msi` file** in your SAMPLES folder
2. **Double-click it** (don't just leave it there!)
3. You might see a security warning - click "Run" or "Yes"

**What should happen:**
- A window opens saying "Node.js Setup"
- You see an installation wizard
- If nothing happens, right-click the file → "Open with" → "Windows Installer"

---

## 📋 Step 3: Follow the Installation Wizard

### Screen 1: Welcome
- Click **"Next"** button

### Screen 2: License Agreement
- Check "I accept the terms" ✅
- Click **"Next"**

### Screen 3: Installation Location
- Leave it as default (usually `C:\Program Files\nodejs\`)
- Click **"Next"**

### Screen 4: Custom Setup
- **IMPORTANT:** Make sure "Add to PATH" is checked ✅
  - This checkbox should already be checked
  - If it's NOT checked, check it!
- Click **"Next"**

### Screen 5: Ready to Install
- Click **"Install"** button
- You might need to click "Yes" if Windows asks for permission

### Screen 6: Installing
- Wait 1-2 minutes
- You'll see a progress bar
- Don't close the window!

### Screen 7: Completed
- You should see: "Node.js has been successfully installed"
- Click **"Finish"** button

---

## ✅ Step 4: Verify Installation

1. **Close ALL PowerShell/Command Prompt windows**
   - Close every terminal window you have open
   - This is important!

2. **Open a NEW PowerShell:**
   - Press `Win + X`
   - Choose "Windows PowerShell" or "Terminal"
   - Or press `Win + R`, type `powershell`, press Enter

3. **Test from a different folder:**
   ```powershell
   # Go to your home folder (not SAMPLES folder)
   cd ~
   
   # Test Node.js
   node --version
   ```
   
   **✅ Success looks like:**
   ```
   v20.10.0
   ```
   (Your version number might be different - that's fine!)

4. **Test npm:**
   ```powershell
   npm --version
   ```
   
   **✅ Success looks like:**
   ```
   10.2.0
   ```
   (Your version number might be different - that's fine!)

---

## 🎉 Step 5: Now You Can Use npm install!

Once both `node --version` and `npm --version` work, you're ready!

1. **Navigate to your project:**
   ```powershell
   cd "E:\SAMPLES\Currency Calculator\backend"
   ```

2. **Install packages:**
   ```powershell
   npm install
   ```

3. **This should now work!** ✅

---

## 🐛 Troubleshooting

### Problem: "I double-clicked but nothing happened"
**Solution:**
- Right-click the `.msi` file
- Choose "Run as administrator"
- Or try: Right-click → "Open with" → "Windows Installer"

### Problem: "Windows says the file is unsafe"
**Solution:**
- This is normal for downloaded installers
- Click "More info" → "Run anyway"
- Or download directly from nodejs.org (official site)

### Problem: "Installation failed"
**Solution:**
- Make sure you're logged in as Administrator
- Close other programs
- Try running as Administrator (right-click → "Run as administrator")

### Problem: "node --version still doesn't work after installation"
**Solution:**
1. **Restart your computer** (sometimes needed for PATH changes)
2. Open NEW PowerShell after restart
3. Try `node --version` again

---

## 💡 Why This Matters

**Downloading the file ≠ Installing:**
- The `.msi` file is just the installer
- You must RUN it to actually install Node.js
- The installer adds Node.js to your system PATH
- This lets you use `node` and `npm` from anywhere

**Think of it like:**
- Downloading a game installer ≠ Playing the game
- You need to run the installer first!

---

## ✅ Checklist

Before moving on, make sure:
- [ ] Found the `.msi` file in your SAMPLES folder
- [ ] Double-clicked the `.msi` file
- [ ] Installation wizard opened
- [ ] Clicked through all screens
- [ ] Made sure "Add to PATH" was checked
- [ ] Clicked "Install" and waited for completion
- [ ] Saw "Installation successful" message
- [ ] Closed all PowerShell windows
- [ ] Opened NEW PowerShell
- [ ] `node --version` works from home folder
- [ ] `npm --version` works from home folder

---

**Once you see version numbers for both `node` and `npm`, you're all set!** 🎉

Then you can continue with `npm install` in your backend folder.




