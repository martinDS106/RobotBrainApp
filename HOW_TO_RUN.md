# 🚀 إزاي تشغّل ROBOT BRAIN - خطوة بخطوة

## ✅ الخطوة 1: تأكد إن كل حاجة مثبتة

### 1.1: افتح Terminal (PowerShell أو CMD)
- اضغط `Windows + R`
- اكتب `powershell` أو `cmd`
- اضغط Enter

### 1.2: اروح لمجلد المشروع
```bash
cd "D:\Bt controller\RobotBrain"
```

### 1.3: تأكد إن المكتبات مثبتة
```bash
npm install
```
**انتظر لحد ما يخلص** (ممكن ياخد 2-3 دقائق)

---

## ✅ الخطوة 2: جهّز جهاز Android

### خيار 1: جهاز حقيقي (موصى به)
1. وصّل تليفونك بالكمبيوتر عبر USB
2. فعّل **Developer Options**:
   - Settings → About Phone
   - اضغط على **Build Number** 7 مرات
3. فعّل **USB Debugging**:
   - Settings → Developer Options → USB Debugging ✅

### خيار 2: Android Emulator
1. افتح **Android Studio**
2. Tools → Device Manager
3. أنشئ Virtual Device جديد
4. شغّله

---

## ✅ الخطوة 3: شغّل Metro Bundler

### 3.1: افتح Terminal جديد
(اترك الـ Terminal الأول مفتوح)

### 3.2: اروح للمجلد تاني
```bash
cd "D:\Bt controller\RobotBrain"
```

### 3.3: شغّل Metro
```bash
npm start
```

**مش هتغلق الـ Terminal ده!** اتركه مفتوح.

**هتشوف حاجة زي كده:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Metro waiting on exp://192.168.1.1:8081                     │
│                                                               │
│  To reload the app press "r"                                 │
│  To open developer menu press "d"                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ الخطوة 4: شغّل التطبيق على Android

### 4.1: افتح Terminal تالت
(أو استخدم الـ Terminal الأول لو Metro شغال)

### 4.2: اروح للمجلد
```bash
cd "D:\Bt controller\RobotBrain"
```

### 4.3: شغّل التطبيق
```bash
npm run android
```

---

## ⏳ ماذا تتوقع؟

### أول مرة:
- Gradle هيداونلود dependencies (5-10 دقائق)
- التطبيق هيتثبت على الجهاز
- التطبيق هيفتح تلقائيًا

### المرات اللي بعدها:
- أسرع (30 ثانية - دقيقة)

---

## 🎉 لو كل حاجة شغلت:

هتشوف شاشة **ROBOT BRAIN** مع:
- Status Bar في الأول
- Voice Orb في الوسط
- Joystick و Sliders
- Quick Commands

---

## ❌ لو واجهت مشاكل:

### المشكلة: "SDK location not found"
**الحل:**
1. أنشئ ملف `android/local.properties` في مجلد `android/`
2. اكتب فيه:
```
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```
(استبدل `YOUR_USERNAME` باسمك)

### المشكلة: "No devices found"
**الحل:**
```bash
# تأكد إن USB Debugging مفعّل
adb devices
```
لو الجهاز مش ظاهر:
```bash
adb kill-server
adb start-server
adb devices
```

### المشكلة: "Metro bundler failed"
**الحل:**
```bash
npm start -- --reset-cache
```

### المشكلة: التطبيق مايشتغلش
**الحل:**
```bash
cd android
.\gradlew clean
cd ..
npm run android
```

### المشكلة: "Module not found"
**الحل:**
```bash
npm install
npm start -- --reset-cache
```

---

## 📱 بعد ما التطبيق يفتح:

1. **الصلاحيات:** هيسألك عن Bluetooth و Location → وافق
2. **الشاشة:** هتشوف Main Controller
3. **التحكم:** دلوقتي التطبيق جاهز (لكن محتاج نكمل المكونات)

---

## 🔄 إعادة التشغيل السريعة:

### مرة تانية:
```bash
# Terminal 1:
cd "D:\Bt controller\RobotBrain"
npm start

# Terminal 2:
cd "D:\Bt controller\RobotBrain"
npm run android
```

---

## 💡 نصائح:

- **أول مرة:** ممكن ياخد وقت (10-15 دقيقة)
- **المرات اللي بعدها:** أسرع (دقيقة)
- **لو عدّلت كود:** اضغط `r` في Metro لإعادة التحميل
- **Developer Menu:** اضغط `d` في Metro أو هز الجهاز

---

## ✅ Checklist قبل التشغيل:

- [ ] Node.js مثبت (18+)
- [ ] npm install اتعمل
- [ ] جهاز Android موصول أو Emulator شغال
- [ ] USB Debugging مفعّل
- [ ] Metro Bundler شغال
- [ ] Terminal جاهز لـ `npm run android`

---

**حظًا موفقًا! 🚀**

لو في أي مشكلة، قولي وأنا أساعدك!


