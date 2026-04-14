# 📋 مخطط AdVax — نظّم حياتك

> تطبيق PWA لتنظيم المهام والكورسات والأفكار والأهداف — يعمل بدون إنترنت بعد التثبيت

[![AdVax](https://img.shields.io/badge/صُنع%20بواسطة-AdVax-00d9a6?style=flat-square)](https://facebook.com/AdVax)
[![PWA](https://img.shields.io/badge/PWA-Ready-blueviolet?style=flat-square)](https://web.dev/progressive-web-apps/)
[![Offline](https://img.shields.io/badge/Offline-Supported-success?style=flat-square)](#)

---

## ✨ المميزات

| الميزة | الوصف |
|--------|-------|
| 📋 **إدارة المهام** | أضف مهام بأولويات وتصنيفات وتواريخ |
| 🎓 **متابعة الكورسات** | تتبّع كورساتك على Coursera وUdemy وغيرها |
| 💡 **حفظ الأفكار** | التقط أفكارك فوراً قبل أن تنساها |
| 🎯 **الأهداف** | ضع أهدافاً طويلة المدى وتابع تقدّمك |
| 📊 **لوحة تحكم** | نظرة عامة على كل شيء دفعة واحدة |
| 📴 **Offline** | يعمل بدون إنترنت بعد أول تحميل |
| 💾 **تصدير البيانات** | احفظ بياناتك ملف JSON |
| 📲 **قابل للتثبيت** | ثبّته على هاتفك كتطبيق أصلي |

---

## 🚀 طريقة الرفع على GitHub Pages

### الخطوة 1 — إنشاء مستودع جديد
```bash
# سمّ المستودع: advax-planner
```
اذهب إلى [github.com/new](https://github.com/new) وأنشئ مستودعاً باسم `advax-planner`

### الخطوة 2 — رفع الملفات
```bash
git init
git add .
git commit -m "🚀 Initial commit - AdVax Planner PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/advax-planner.git
git push -u origin main
```

### الخطوة 3 — تفعيل GitHub Pages
1. اذهب إلى **Settings** في المستودع
2. قسم **Pages** من القائمة الجانبية
3. اختر **Branch: main** و **Folder: / (root)**
4. اضغط **Save**

### الخطوة 4 — الوصول للتطبيق
```
https://YOUR_USERNAME.github.io/advax-planner/
```

---

## 📁 هيكل الملفات

```
advax-planner/
├── index.html       ← التطبيق الكامل (HTML + CSS + JS)
├── manifest.json    ← إعدادات PWA
├── sw.js            ← Service Worker (Offline Support)
├── icon.svg         ← أيقونة التطبيق
└── README.md        ← هذا الملف
```

---

## 💾 التخزين

جميع البيانات تُحفظ في **localStorage** في المتصفح:
- لا يوجد خادم (Server) مطلوب
- بياناتك خاصة وتبقى على جهازك فقط
- استخدم زر **💾 تصدير** للنسخ الاحتياطي

---

## 📲 تثبيت التطبيق

**على Android:**
1. افتح الرابط في Chrome
2. ستظهر نافذة "إضافة إلى الشاشة الرئيسية"
3. اضغط "تثبيت"

**على iPhone (iOS):**
1. افتح الرابط في Safari
2. اضغط زر المشاركة 📤
3. اختر "إضافة إلى الشاشة الرئيسية"

---

## 🛠️ تقنيات مستخدمة

- **Vanilla JS** — بدون أي مكتبات خارجية
- **CSS Variables** — للثيم والألوان
- **localStorage API** — للتخزين
- **Service Worker API** — للعمل Offline
- **Web App Manifest** — للتثبيت كتطبيق
- **Google Fonts** (IBM Plex Sans Arabic + Space Mono)

---

## 🏢 صُنع بواسطة

<div align="center">
  <a href="https://facebook.com/AdVax">
    <strong>AdVax</strong> — شركة البرمجيات الذكية
  </a>
</div>

---

*© 2025 AdVax. جميع الحقوق محفوظة.*
