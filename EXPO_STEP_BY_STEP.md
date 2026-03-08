# بداية المشروع على Expo من الصفر – خطوة بخطوة

## الجزء 1: التحميلات (على جهازك)

### 1) Node.js
- ادخل على: **https://nodejs.org**
- نزّل النسخة **LTS** (مثلاً 20 أو 22).
- ثبّت واتأكد من CMD:
  ```bash
  node -v
  npm -v
  ```

### 2) Git (اختياري لكن مفيد)
- من: **https://git-scm.com**
- نزّل وثبّت (مش ضروري لو مش هتستخدم Git).

### 3) Android Studio (لو هتشغّل على أندرويد)
- من: **https://developer.android.com/studio**
- ثبّت وافتحه مرة واحدة عشان يحمّل Android SDK.
- من **Tools → Device Manager** اعمل Emulator (جهاز افتراضي) لو عايز تجرّب على المحاكي.

### 4) موبايل أندرويد أو محاكي
- إما موبايل حقيقي (تفعيل وضع المطوّر + USB debugging).
- أو المحاكي اللي أنشأته من Android Studio.

---

## الجزء 2: مشروع Expo جديد (من الصفر)

### الخطوة 1: إنشاء مجلد للمشروع
- اعمل مجلد جديد، مثلاً: `C:\Projects` أو `D:\MyApps`.
- افتح **Command Prompt** أو **PowerShell** واكتب:
  ```bash
  cd D:\MyApps
  ```
  (غيّر المسار لمجلدك.)

### الخطوة 2: إنشاء مشروع Expo
- اكتب الأمر ده (هيعمل مشروع جديد اسمه `RobotBrainExpo`):
  ```bash
  npx create-expo-app@latest RobotBrainExpo
  ```
- لما يسألك:
  - **Template**: اختار **Blank (TypeScript)** أو **Blank**.
  - باقي الخيارات تقدر تضغط Enter (الافتراضي).

### الخطوة 3: الدخول لمجلد المشروع
  ```bash
  cd RobotBrainExpo
  ```

### الخطوة 4: تشغيل المشروع (تجربة)
  ```bash
  npx expo start
  ```
- هتفتح واجهة في الترمينال.
- لو عندك موبايل: نزّل **Expo Go** من المتجر وامسح QR اللي ظاهر.
- لو محاكي: اضغط **a** لفتح التطبيق على أندرويد.

لو شفت شاشة "Open up App.js..." يبقى Expo شغال.

---

## الجزء 3: إضافة حاجات RobotBrain (بلوتوث وغيرها)

مشروع RobotBrain الأصلي بيستخدم **بلوتوث (BLE)**، وده **مش شغال في Expo Go**. عشان كده لازم تعمل **Development Build**.

### الخطوة 5: تثبيت expo-dev-client
  ```bash
  npx expo install expo-dev-client
  ```

### الخطوة 6: تثبيت مكتبة البلوتوث
  ```bash
  npx expo install react-native-ble-plx
  ```
  (لو طلع إنها محتاجة إعداد إضافي، اتبع رسالة الـ Expo.)

### الخطوة 7: إعداد الـ prebuild (مجلد android)
  ```bash
  npx expo prebuild
  ```
  ده هيعمل مجلد **android** (ومجلد **ios** لو على ماك). بعدها التطبيق يبقى "custom" ويقدر يستخدم البلوتوث.

### الخطوة 8: نسخ كود RobotBrain
- انسخ من المشروع القديم (RobotBrain) المجلد **src** كامل.
- انسخه داخل مشروعك الجديد `RobotBrainExpo` (استبدل أو دمج مع الـ src اللي فيه).
- انسخ ملف **App.tsx** من المشروع القديم واستبدل اللي في المشروع الجديد (أو عدّله يدوي لو حابب تبقى على هيكل Expo).
- عدّل **package.json** لو محتاج تضيف مكتبات زي:
  - `@react-navigation/native`, `@react-navigation/native-stack`
  - `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`
  - `zustand`
  - `react-native-permissions`
  وكلها تنزّل بـ:
  ```bash
  npx expo install @react-navigation/native @react-navigation/native-stack react-native-gesture-handler react-native-screens react-native-safe-area-context zustand react-native-permissions
  ```

### الخطوة 9: التشغيل كـ Development Build
  ```bash
  npx expo run:android
  ```
  (أو **npx expo run:ios** على ماك.)
- أول مرة هتبنى الـ APK وتثبّت على المحاكي/الموبايل. بعدها التطبيق يفتح ويدعم البلوتوث.

---

## ملخص الأوامر بالترتيب

| # | الأمر | معناها |
|---|--------|--------|
| 1 | `node -v` | التأكد من تثبيت Node |
| 2 | `cd D:\MyApps` | الدخول لمجلد الشغل |
| 3 | `npx create-expo-app@latest RobotBrainExpo` | إنشاء مشروع Expo جديد |
| 4 | `cd RobotBrainExpo` | الدخول للمشروع |
| 5 | `npx expo start` | تجربة المشروع (Expo Go) |
| 6 | `npx expo install expo-dev-client` | إضافة Development Build |
| 7 | `npx expo install react-native-ble-plx` | إضافة البلوتوث |
| 8 | `npx expo prebuild` | إنشاء مجلدات android (و ios) |
| 9 | نسخ **src** و **App** من RobotBrain | نقل الكود |
| 10 | `npx expo install ...` (المكتبات اللي فوق) | تثبيت مكتبات التنقل والحالة والصلاحيات |
| 11 | `npx expo run:android` | بناء وتشغيل على أندرويد مع البلوتوث |

---

## لو حابب تبدأ بدون بلوتوث (Expo Go فقط)

- اعمل من الخطوة 1 لـ 4 فقط.
- متعملش الخطوات 5–8 (expo-dev-client، BLE، prebuild).
- هتقدر تجرب واجهة وتنقل، لكن البلوتوث مش هيشتغل إلا بعد ما تعمل Development Build (الخطوات 5–9).

لو وقفت في أي خطوة وطلع خطأ، انسخ رسالة الخطأ وابعتلها عشان نحدد الخطوة اللي بعدها.
