@echo off
setlocal enabledelayedexpansion
rem Go to folder where this BAT file is (no trailing backslash)
set "BATDIR=%~dp0"
if "%BATDIR:~-1%"=="\" set "BATDIR=%BATDIR:~0,-1%"
cd /d "%BATDIR%"
del check_any_missing.flag 2>nul

echo.
echo ========================================
echo   CHECK EVERYTHING - RobotBrain
echo ========================================
echo.
echo Running from: %CD%
echo.

rem --- 1. Java 17 ---
echo [1] Java 17...
set "JAVA_PATH=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin\java.exe"
if exist "%JAVA_PATH%" (
  "%JAVA_PATH%" -version 2>nul
  echo     OK: Java path exists
) else (
  echo     MISSING: Java 17 at %JAVA_PATH%
  echo. > check_any_missing.flag
)
echo.

rem --- 2. Node.js ---
echo [2] Node.js...
where node >nul 2>&1
if %errorlevel%==0 (
  node -v
  echo     OK: Node is installed
) else (
  echo     MISSING: Node.js (install from nodejs.org)
  echo. > check_any_missing.flag
)
echo.

rem --- 3. Android SDK folder ---
echo [3] Android SDK folder...
set "SDK=C:\Users\Penta1\AppData\Local\Android\Sdk"
if exist "%SDK%" (
  echo     OK: SDK folder exists
) else (
  echo     MISSING: %SDK%
  echo     -> Fix android\local.properties sdk.dir path
  echo. > check_any_missing.flag
)
echo.

rem --- 4. ADB available ---
echo [4] ADB...
set "PATH=%PATH%;%SDK%\platform-tools"
adb version >nul 2>&1
if %errorlevel%==0 (
  echo     OK: adb works
) else (
  echo     MISSING: adb (platform-tools not in PATH)
  echo. > check_any_missing.flag
)
echo.

rem --- 5. Main project files ---
echo [5] Main project files...
if not exist "package.json" (echo     MISSING: package.json & goto :setflag5)
if not exist "App.tsx" (echo     MISSING: App.tsx & goto :setflag5)
if not exist "index.js" (echo     MISSING: index.js & goto :setflag5)
if not exist "babel.config.js" (echo     MISSING: babel.config.js & goto :setflag5)
if not exist "tsconfig.json" (echo     MISSING: tsconfig.json & goto :setflag5)
echo     OK: all main project files exist
goto :after5
:setflag5
echo. >> check_any_missing.flag
:after5
echo.

rem --- 6. Android config files ---
echo [6] Android config...
if not exist "android\gradle.properties" (echo     MISSING: android\gradle.properties & goto :setflag6)
if not exist "android\local.properties" (echo     MISSING: android\local.properties & goto :setflag6)
if not exist "android\settings.gradle" (echo     MISSING: android\settings.gradle & goto :setflag6)
if not exist "android\app\build.gradle" (echo     MISSING: android\app\build.gradle & goto :setflag6)
if not exist "android\app\src\main\AndroidManifest.xml" (echo     MISSING: AndroidManifest.xml & goto :setflag6)
if not exist "android\app\src\main\res\values\strings.xml" (echo     MISSING: strings.xml & goto :setflag6)
if not exist "android\app\src\main\res\drawable\ic_launcher.xml" (echo     MISSING: drawable\ic_launcher.xml & goto :setflag6)
if not exist "android\app\src\main\java\com\robotbrain\MainActivity.kt" (echo     MISSING: MainActivity.kt & goto :setflag6)
if not exist "android\app\src\main\java\com\robotbrain\MainApplication.kt" (echo     MISSING: MainApplication.kt & goto :setflag6)
echo     OK: Android config files exist
goto :after6
:setflag6
echo. >> check_any_missing.flag
:after6
echo.

rem --- 7. node_modules ---
echo [7] node_modules folder...
if not exist "node_modules" (
  echo     MISSING: node_modules  (run: npm install)
  echo. > check_any_missing.flag
) else (
  echo     OK: node_modules exists
)
echo.

rem --- 8. gradle.properties Java home ---
echo [8] gradle.properties - org.gradle.java.home...
findstr /C:"org.gradle.java.home" android\gradle.properties >nul 2>&1
if %errorlevel%==0 (
  echo     OK: org.gradle.java.home line exists
) else (
  echo     MISSING: org.gradle.java.home in android\gradle.properties
  echo. > check_any_missing.flag
)
echo.

rem --- 9. applicationId and app_name ---
echo [9] applicationId and app_name...
findstr /C:"applicationId \"com.robotbrain\"" android\app\build.gradle >nul 2>&1
if %errorlevel%==0 (
  findstr /C:"RobotBrain" android\app\src\main\res\values\strings.xml >nul 2>&1
  if %errorlevel%==0 (
    echo     OK: com.robotbrain + RobotBrain
  ) else (
    echo     CHECK: app_name in strings.xml
  )
) else (
  echo     CHECK: applicationId in android\app\build.gradle
)
echo.

echo ========================================
echo   RESULT:
echo     - All sections above show what is OK or MISSING.
echo     - If you do NOT see any line starting with "MISSING:",
echo       then EVERYTHING is OK and you can run the run-app batch file.
echo ========================================
del check_any_missing.flag 2>nul
echo.
pause
