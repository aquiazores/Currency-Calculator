# Node.js Installation Helper Script
# This script helps you install Node.js properly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Node.js Installation Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is already installed
Write-Host "Checking if Node.js is installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js is already installed! Version: $nodeVersion" -ForegroundColor Green
        Write-Host ""
        $npmVersion = npm --version 2>$null
        if ($npmVersion) {
            Write-Host "✅ npm is also installed! Version: $npmVersion" -ForegroundColor Green
            Write-Host ""
            Write-Host "You're all set! You can now run: npm install" -ForegroundColor Green
            exit 0
        }
    }
} catch {
    Write-Host "❌ Node.js is NOT installed system-wide" -ForegroundColor Red
    Write-Host ""
}

# Check for installer in SAMPLES folder
Write-Host "Looking for Node.js installer (.msi file)..." -ForegroundColor Yellow
$installerPath = Get-ChildItem -Path "E:\SAMPLES" -Filter "node*.msi" -ErrorAction SilentlyContinue | Select-Object -First 1

if ($installerPath) {
    Write-Host "✅ Found installer: $($installerPath.FullName)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Would you like to run the installer now? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq "Y" -or $response -eq "y") {
        Write-Host ""
        Write-Host "Starting installer..." -ForegroundColor Yellow
        Write-Host "Please follow the installation wizard:" -ForegroundColor Cyan
        Write-Host "  1. Click 'Next' through all screens" -ForegroundColor White
        Write-Host "  2. Make sure 'Add to PATH' is checked ✅" -ForegroundColor White
        Write-Host "  3. Click 'Install' and wait for completion" -ForegroundColor White
        Write-Host "  4. Click 'Finish' when done" -ForegroundColor White
        Write-Host ""
        
        Start-Process -FilePath $installerPath.FullName -Wait
        
        Write-Host ""
        Write-Host "Installation complete! Please:" -ForegroundColor Yellow
        Write-Host "  1. Close ALL PowerShell windows" -ForegroundColor White
        Write-Host "  2. Open a NEW PowerShell window" -ForegroundColor White
        Write-Host "  3. Run this script again to verify" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "To install manually:" -ForegroundColor Yellow
        Write-Host "  1. Double-click: $($installerPath.FullName)" -ForegroundColor White
        Write-Host "  2. Follow the installation wizard" -ForegroundColor White
        Write-Host "  3. Make sure 'Add to PATH' is checked" -ForegroundColor White
    }
} else {
    Write-Host "❌ No installer found in E:\SAMPLES" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download Node.js installer:" -ForegroundColor Yellow
    Write-Host "  1. Go to: https://nodejs.org/" -ForegroundColor White
    Write-Host "  2. Click the big green 'LTS' button" -ForegroundColor White
    Write-Host "  3. Save the .msi file to: E:\SAMPLES" -ForegroundColor White
    Write-Host "  4. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or open the download page now? (Y/N)" -ForegroundColor Yellow
    $openBrowser = Read-Host
    
    if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
        Start-Process "https://nodejs.org/"
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "  - INSTALL_NODEJS.md" -ForegroundColor White
Write-Host "  - WINDOWS_SETUP.md" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan




