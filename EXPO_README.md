# تشغيل RobotBrain بـ Expo

المشروع دلوقتي مضاف له **Expo** عشان تقدر تستخدم أوامر Expo (مثل `expo start` و `expo run:android`).

## ملاحظة مهمة

- التطبيق بيستخدم **بلوتوث (BLE)** ووحدات native تانية، فمش هيشتغل على **Expo Go**.
- لازم تستخدم **Development Build** (بناء تطبيق تطوير)، وده اللي بيوفره `expo-dev-client` مع الـ `android/` الموجود.

---

## أول مرة (تثبيت حزم Expo)

من مجلد المشروع شغّل:

```bash
npx expo install expo expo-dev-client
```

ده هيثبّت إصدارات متوافقة مع المشروع.

---

## أوامر Expo

| الأمر | الوظيفة |
|--------|---------|
| `npm run expo:start` أو `npx expo start` | تشغيل سيرفر التطوير (مثل Metro مع واجهة Expo) |
| `npm run expo:android` أو `npx expo run:android` | بناء وتشغيل على أندرويد (يستخدم مجلد `android/`) |
| `npm run expo:ios` أو `npx expo run:ios` | بناء وتشغيل على iOS (لو عندك مجلد `ios/`) |

---

## طريقة التشغيل العادية

1. شغّل المحاكي أو وصّل جهاز أندرويد.
2. من مجلد المشروع:
   ```bash
   npx expo start
   ```
3. من واجهة Expo اضغط **a** لفتح التطبيق على أندرويد، أو شغّل في ترمينال تاني:
   ```bash
   npx expo run:android
   ```

---

## لو لسه بتستخدم الطريقة القديمة

- **الحل_النهائي_البسيط.bat** لسه يشتغل (بناء وتثبيت من Gradle مباشرة).
- **`npm start`** ثم **`npm run android`** لسه متاحين.

Expo هنا إضافة عشان لو حابب تعتمد على أوامر Expo وتجرب EAS Build لاحقاً.
