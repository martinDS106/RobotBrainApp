# رفع المشروع على GitHub مرة واحدة

## 1) ثبّت Git (لو مش مثبت)

- من: **https://git-scm.com**
- نزّل وثبّت، ثم افتح CMD واكتب: `git --version`

---

## 2) اعمل ريبو جديد على GitHub

1. ادخل **https://github.com** وسجّل دخول.
2. اضغط **+** → **New repository**.
3. **Repository name:** مثلاً `RobotBrain`.
4. اختار **Public**.
5. **ما تضفش** README ولا .gitignore (اترك الريبو فاضي).
6. اضغط **Create repository**.

---

## 3) عدّل رابط الريبو في الملف

- افتح الملف: **`ارفع_على_GitHub.bat`** (بالمفكرة).
- دور على السطر:
  ```bat
  set "GITHUB_URL=https://github.com/YOUR_USERNAME/RobotBrain.git"
  ```
- غيّر **YOUR_USERNAME** لاسم حسابك على GitHub، و **RobotBrain** لاسم الريبو اللي عملته.
- مثال: `set "GITHUB_URL=https://github.com/AhmedAli/RobotBrain.git"`
- احفظ الملف.

---

## 4) (أول مرة فقط) ضبط اسمك وإيميلك في Git

في CMD من مجلد المشروع:

```bat
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

(استبدل باسمك وإيميلك، ولو عملتها قبل كده مفيش حاجة.)

---

## 5) شغّل الرفع

- دبل كليك على: **`ارفع_على_GitHub.bat`**
- السكربت هيعمل: تهيئة Git، إضافة الملفات، commit، ربط الريبو، ثم push.
- لو طلب **Username**: اكتب اسم المستخدم على GitHub.
- لو طلب **Password**: **ما تكتبش باسورد الحساب**؛ استخدم **Personal Access Token**.

---

## 6) عمل Personal Access Token (لو Git طلب باسورد)

1. على GitHub: **Settings** (من أيقونة صورتك أعلى يمين).
2. من اليسار: **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
3. **Generate new token (classic)**.
4. **Note:** مثلاً `RobotBrain`.
5. فعّل **repo**.
6. **Generate token** وانسخ التوكن.
7. لما Git يطلب **Password**، الصق التوكن (ما يظهرش على الشاشة، عادي).

---

## بعد كده (تحديثات)

لو عدّلت في المشروع وعرّضت ترفع مرة تانية:

- افتح CMD من مجلد المشروع واكتب:
  ```bat
  git add .
  git commit -m "وصف التعديل"
  git push
  ```
- أو نضيف سكربت "تحديث_GitHub.bat" لاحقاً لو حابب.
