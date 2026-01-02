# 🪟 Windows Setup Quick Guide

This is a quick reference for Windows users, especially if you're seeing PowerShell errors.

---

## ⚠️ Important: Downloading ≠ Installing!

**If you downloaded Node.js and just put it in a folder, that's not enough!**

You need to **RUN THE INSTALLER** to properly install Node.js on your system.

---

## ⚠️ Common Windows Error

If you see this in PowerShell:
```
The command node was not found, but does exist in the current location.
Windows PowerShell does not load commands from the current location by default.
```

**This means Node.js is NOT properly installed!**

**Common mistake:** Just having the `.msi` file in a folder doesn't install it - you need to RUN it!

---

## ✅ Quick Fix (5 Steps)

### Step 1: Find Your Downloaded Node.js Installer
1. Go to your `SAMPLES` folder (or wherever you downloaded it)
2. Look for a file named something like:
   - `node-v20.10.0-x64.msi`
   - `node-v18.17.0-x64.msi`
   - Or just any `.msi` file with "node" in the name

**If you don't have the installer file:**
- Go to https://nodejs.org/
- Click the big green "LTS" button (Long Term Support)
- This downloads a `.msi` file (Windows Installer)
- Save it anywhere (Desktop is fine)

### Step 2: RUN the Installer (This is the important part!)
1. **Double-click the `.msi` file** you downloaded
   - Don't just leave it in the folder - you must RUN it!
   - It should open an installation wizard

2. **Follow the installation wizard:**
   - Click "Next" on the welcome screen
   - Accept the license agreement, click "Next"
   - Choose installation location (default is fine), click "Next"
   - **IMPORTANT:** Make sure "Add to PATH" is checked ✅
     - This checkbox should be checked by default
     - If it's not checked, check it!
   - Click "Next"
   - Click "Install"
   - Wait for installation to complete (may take 1-2 minutes)
   - Click "Finish" when done

**✅ You know it's installed when:**
- You see "Installation completed successfully"
- The installer window closes
- You DON'T see the `.msi` file running anymore

### Step 3: Close ALL PowerShell Windows
- Close every PowerShell/Command Prompt window
- This is critical - PowerShell caches the PATH

### Step 4: Open NEW PowerShell
- Press `Win + X`, choose "Windows PowerShell" or "Terminal"
- Or press `Win + R`, type `powershell`, press Enter

### Step 5: Test Installation
```powershell
# Test from your home folder (not project folder)
cd ~

# Check Node.js
node --version
# Should show: v20.10.0 (or similar version number)

# Check npm
npm --version
# Should show: 10.2.0 (or similar version number)
```

**✅ If both commands show version numbers, you're done!**

---

## 🚀 Now Continue with Setup

Once Node.js is properly installed:

1. **Navigate to your project:**
   ```powershell
   cd "E:\SAMPLES\Currency Calculator\backend"
   ```

2. **Install packages:**
   ```powershell
   npm install
   ```

3. **Create .env file** (see SETUP_GUIDE.md for details)

4. **Start server:**
   ```powershell
   node server.js
   ```

---

## 🐛 Still Not Working?

### Try This:
1. **Restart your computer** (sometimes PATH changes need a full restart)
2. **Test from Command Prompt instead of PowerShell:**
   - Press `Win + R`
   - Type `cmd`, press Enter
   - Try `node --version` there

### Check Installation Location:
Node.js is usually installed at:
```
C:\Program Files\nodejs\
```

You should see these files there:
- `node.exe`
- `npm.cmd`
- `npx.cmd`

### Verify PATH:
1. Press `Win + X`, choose "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find "Path"
5. Look for `C:\Program Files\nodejs\` in the list
6. If it's missing, add it (see SETUP_GUIDE.md for details)

---

## 💡 Why This Happens

**PowerShell Security:**
- PowerShell doesn't run executables from the current folder by default
- This prevents accidentally running malicious scripts
- Node.js needs to be in your system PATH to work everywhere

**Having node.exe in a folder ≠ Installed:**
- If you downloaded node.exe manually, it's not "installed"
- The installer adds Node.js to your system PATH
- This lets you use `node` from any folder

---

## ✅ Success Checklist

- [ ] Node.js installer downloaded from nodejs.org
- [ ] Node.js installed using the .msi installer
- [ ] All PowerShell windows closed
- [ ] New PowerShell opened
- [ ] `node --version` works from home folder
- [ ] `npm --version` works from home folder
- [ ] Can navigate to project folder
- [ ] `npm install` works in backend folder

---

## 📚 More Help

- **Full setup guide:** See `SETUP_GUIDE.md`
- **Troubleshooting:** See "Common Problems" section in `SETUP_GUIDE.md`
- **Node.js docs:** https://nodejs.org/en/docs/

---

**Once Node.js is properly installed, everything else should work smoothly!** 🎉

