@echo off
chcp 65001 >nul
REM ========================================
REM   اكمل البناء من حيث توقف
REM ========================================

cd /d "%~dp0"

set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

set ANDROID_HOME=C:\Users\Penta1\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator

echo.
echo ========================================
echo   اكمل البناء من حيث توقف
echo ========================================
echo.

echo [1/3] التحقق من Emulator...
call adb devices 2>nul | findstr device >nul
if %errorlevel% == 0 (
    echo    Emulator متصل
) else (
    echo    Emulator مش متصل - بدء Emulator...
    start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_36.1
    timeout /t 15 /nobreak >nul
)
echo.

echo [2/3] بناء APK...
echo    هذا قد يستغرق 5-10 دقائق
echo    انتظر حتى ترى: BUILD SUCCESSFUL
echo.
cd android
call gradlew assembleDebug --no-daemon
set BUILD_RESULT=%errorlevel%
cd ..

if %BUILD_RESULT% == 0 (
    echo.
    echo    تم البناء بنجاح!
    echo.
    echo [3/3] تثبيت APK...
    if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
        call adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"
        if %errorlevel% == 0 (
            echo    تم التثبيت!
            echo.
            echo فتح التطبيق...
            call adb shell am start -n com.robotbrain/.MainActivity
            echo    التطبيق مفتوح!
        ) else (
            echo    فشل التثبيت - جرب تاني
        )
    ) else (
        echo    APK مش موجود
    )
) else (
    echo    فشل البناء
    echo    شوف الاخطاء في Terminal
)

echo.
echo ========================================
echo   تم!
echo ========================================
echo.
pause


