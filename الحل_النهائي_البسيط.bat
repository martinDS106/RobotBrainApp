@echo off
rem RobotBrain - Run app (all-in-one, English messages)
set "BATDIR=%~dp0"
if "%BATDIR:~-1%"=="\" set "BATDIR=%BATDIR:~0,-1%"
cd /d "%BATDIR%"

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
set "ANDROID_HOME=C:\Users\Penta1\AppData\Local\Android\Sdk"
set "PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator"

echo.
echo ========================================
echo   RobotBrain - Build, Install, Run
echo ========================================
echo.

rem Step 1: Stop old processes (NO deep clean to keep cache)
echo [1] Stopping Java/Gradle...
taskkill /F /IM java.exe 2>nul
taskkill /F /IM gradle.exe 2>nul
cd android
call gradlew --stop 2>nul
cd ..
timeout /t 2 /nobreak >nul
echo    OK - Done
echo.

rem Step 2: Emulator
echo [2] Checking Emulator...
adb devices 2>nul | findstr /r "device$" >nul
if %errorlevel% neq 0 (
  echo    Starting Emulator...
  start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_36.1
  timeout /t 20 /nobreak >nul
  adb devices 2>nul | findstr /r "device$" >nul
  if %errorlevel% neq 0 (
    echo    ERROR: Emulator not connected. Start it from Android Studio then run this again.
    pause
    exit /b 1
  )
)
echo    OK - Emulator connected
echo.

rem Step 3: Metro
echo [3] Checking Metro Bundler...
netstat -ano 2>nul | findstr :8081 >nul
if %errorlevel% neq 0 (
  echo    Starting Metro...
  start "Metro" cmd /k "npm start"
  timeout /t 5 /nobreak >nul
)
echo    OK - Metro running or started
echo.

rem Step 4: Build APK
echo [4] Building APK (first time may take 10-20 min)...
cd android
call gradlew assembleDebug --no-daemon
set BUILD_RESULT=%errorlevel%
cd ..
if %BUILD_RESULT% neq 0 (
  echo    ERROR: Build failed. Check the output above.
  pause
  exit /b 1
)
echo    OK - Build successful
echo.

rem Step 5: Install APK
echo [5] Installing APK...
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
  adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"
  if %errorlevel% neq 0 (
    echo    WARNING: Install failed. Try running this script again.
  ) else (
    echo    OK - Installed
  )
) else (
  echo    ERROR: APK not found. Build failed.
  pause
  exit /b 1
)
echo.

rem Step 6: Launch app
echo [6] Launching app...
adb shell am start -n com.robotbrain/.MainActivity
if %errorlevel% neq 0 (
  echo    If app did not open: open App Drawer and tap RobotBrain
)
echo.
echo ========================================
echo   Done. App should be on the Emulator.
echo ========================================
echo.
pause
