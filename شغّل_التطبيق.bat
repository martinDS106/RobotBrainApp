@echo off
chcp 65001 >nul
REM ========================================
REM   ROBOT BRAIN - تشغيل التطبيق
REM   ملف واحد شامل لكل حاجة
REM ========================================

cd /d "%~dp0"

REM ========================================
REM   إعداد المتغيرات
REM ========================================
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

set ANDROID_HOME=C:\Users\Penta1\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin

set APP_PACKAGE=com.robotbrain
set APP_ACTIVITY=com.robotbrain.MainActivity

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║         ROBOT BRAIN - تشغيل التطبيق                     ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM ========================================
REM   الخطوة 1: التحقق من Emulator
REM ========================================
echo [1/6] التحقق من Emulator...
call adb devices | findstr device >nul
if %errorlevel% == 0 (
    echo    ✅ Emulator متصل
    call adb devices
) else (
    echo    ⚠️  Emulator مش متصل - بدء Emulator...
    start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_36.1
    echo    ⏳ انتظر 15 ثانية حتى يفتح Emulator...
    timeout /t 15 /nobreak >nul
    
    call adb devices | findstr device >nul
    if %errorlevel% == 0 (
        echo    ✅ Emulator متصل الآن
    ) else (
        echo    ❌ فشل الاتصال بـ Emulator
        echo    ⚠️  شغّل Emulator يدويًا من Android Studio
        pause
        exit /b 1
    )
)
echo.

REM ========================================
REM   الخطوة 2: التحقق من Metro Bundler
REM ========================================
echo [2/6] التحقق من Metro Bundler...
netstat -ano | findstr :8081 >nul
if %errorlevel% == 0 (
    echo    ✅ Metro Bundler شغال
) else (
    echo    ⚠️  Metro Bundler مش شغال - بدء Metro Bundler...
    start "Metro Bundler" cmd /k "npm start"
    echo    ⏳ انتظر 5 ثواني...
    timeout /t 5 /nobreak >nul
    echo    ✅ Metro Bundler بدأ
)
echo.

REM ========================================
REM   الخطوة 3: تنظيف Gradle (اختياري)
REM ========================================
echo [3/6] تنظيف Gradle Daemons القديمة...
cd android
call gradlew --stop >nul 2>&1
cd ..
timeout /t 2 /nobreak >nul
echo    ✅ تم التنظيف
echo.

REM ========================================
REM   الخطوة 4: التحقق من التطبيق المثبت
REM ========================================
echo [4/6] التحقق من التطبيق المثبت...
call adb shell pm list packages | findstr %APP_PACKAGE% >nul
if %errorlevel% == 0 (
    echo    ✅ التطبيق مثبت
    set APP_INSTALLED=1
) else (
    echo    ⚠️  التطبيق مش مثبت - سيتم التثبيت
    set APP_INSTALLED=0
)
echo.

REM ========================================
REM   الخطوة 5: بناء وتثبيت التطبيق
REM ========================================
echo [5/6] بناء وتثبيت التطبيق...
echo    ⏳ هذا قد يستغرق 5-15 دقيقة (أول مرة)
echo.

cd android
if %APP_INSTALLED% == 0 (
    echo    📦 بناء وتثبيت جديد...
    call gradlew installDebug --no-daemon
) else (
    echo    🔄 تحديث التطبيق الموجود...
    call gradlew installDebug --no-daemon
)
set BUILD_RESULT=%errorlevel%
cd ..

if %BUILD_RESULT% == 0 (
    echo    ✅ تم البناء والتثبيت بنجاح!
) else (
    echo    ❌ فشل البناء
    echo    ⚠️  جرب تاني أو شوف الأخطاء في Terminal
    pause
    exit /b 1
)
echo.

REM ========================================
REM   الخطوة 6: فتح التطبيق
REM ========================================
echo [6/6] فتح التطبيق...
call adb shell am start -n %APP_ACTIVITY% >nul 2>&1
if %errorlevel% == 0 (
    echo    ✅ التطبيق مفتوح!
) else (
    echo    ⚠️  فشل فتح التطبيق تلقائيًا
    echo    💡 افتح App Drawer وابحث عن "RobotBrain"
)
echo.

REM ========================================
REM   النتيجة النهائية
REM ========================================
echo ╔══════════════════════════════════════════════════════════╗
echo ║                    تم بنجاح! ✅                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo 📱 التطبيق موجود في Emulator:
echo    - افتح App Drawer (اسحب لأعلى)
echo    - ابحث عن "RobotBrain"
echo    - اضغط على الأيقونة
echo.
echo 🔄 لإعادة التشغيل: اضغط دبل كليك على هذا الملف تاني
echo.
pause


