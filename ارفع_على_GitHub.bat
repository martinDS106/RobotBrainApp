@echo off
chcp 65001 >nul
set "BATDIR=%~dp0"
if "%BATDIR:~-1%"=="\" set "BATDIR=%BATDIR:~0,-1%"
cd /d "%BATDIR%"

echo.
echo ========================================
echo   Upload RobotBrain to GitHub
echo ========================================
echo.

rem ========== EDIT THIS: your GitHub repo URL ==========
set "GITHUB_URL=https://github.com/martinDS106/RobotBrainApp.git"
rem Example: set "GITHUB_URL=https://github.com/AhmedAli/RobotBrain.git"
rem =====================================================

where git >nul 2>&1
if %errorlevel% neq 0 (
  echo ERROR: Git not found. Install from https://git-scm.com
  pause
  exit /b 1
)

if not exist .git (
  echo [1] Initializing Git...
  git init
  echo     Done.
) else (
  echo [1] Git already initialized.
)
echo.

echo [2] Adding all files...
git add .
echo     Done.
echo.

echo [3] Committing...
git commit -m "RobotBrain - React Native robot controller app"
if %errorlevel% neq 0 (
  echo     No new changes, or commit already exists.
) else (
  echo     Done.
)
echo.

echo [4] Using branch: main
git branch -M main
echo.

echo [5] Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin "%GITHUB_URL%"
echo     Done.
echo.

echo [6] Pulling remote changes first (merge with GitHub)...
git pull origin main --allow-unrelated-histories --no-edit
if %errorlevel% neq 0 (
  echo     Pull had issues - trying push anyway...
)
echo.

echo [7] Pushing to GitHub...
echo     (You may be asked for username and Password.)
echo     Password = Personal Access Token from GitHub, not account password.
echo.
git push -u origin main

if %errorlevel% equ 0 (
  echo.
  echo ========================================
  echo   SUCCESS - Project is on GitHub.
  echo ========================================
) else (
  echo.
  echo ========================================
  echo   If push failed:
  echo   1. Create a new repo on https://github.com/new
  echo   2. Edit this file: set GITHUB_URL= your repo URL
  echo   3. Run this file again.
  echo   4. For password use Personal Access Token (Settings - Developer settings - PAT)
  echo ========================================
)
echo.
pause
