# BBS Observation App — คู่มือติดตั้งใช้งาน (GitHub Pages + Firebase)

แอปสังเกตการณ์ความปลอดภัย (Behavior Based Safety) แบบ 2 ภาษา (ไทย/English)
90 รายการ 26 หมวดหมู่ พร้อมระบบ Action Plan, ติดตามการแก้ไข, รายงานสรุป,
และผู้ใช้หลายคนพร้อมกันผ่าน Firebase

---

## สิ่งที่มีในแพ็กเกจนี้

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | ตัวแอปทั้งหมด (หน้าเว็บ + สไตล์ + โค้ด) |
| `firebase-config.js` | ค่าเชื่อมต่อ Firebase ของคุณ + รายชื่ออีเมลแอดมิน |
| `firestore.rules` | กฎความปลอดภัยของฐานข้อมูล (นำไปวางใน Firebase Console) |
| `README.md` | คู่มือนี้ |

---

## ฟีเจอร์ใหม่ล่าสุด

1. **หน้ารายงานสรุป (Reports)**
   - แก้ไขรายการที่ส่งไปแล้วได้โดยตรงจากตารางในหน้านี้ (ปุ่ม "แก้ไข" ทุกแถว)
   - กรองตาม **พื้นที่ / Area** ที่พบ ได้เหมือนกรองแผนก/เดือน
   - การ์ดใหม่ **"ผู้ส่งรายงาน / Submitters"** แสดงรายชื่อคนที่ส่งพร้อมจำนวนรายการ
   - ตารางเต็ม **"รายการสังเกตการณ์ที่ส่งเข้ามา"** ดูทุกรายการในตัวกรองปัจจุบัน พร้อมแก้ไขได้ทันที

2. **Dashboard**
   - ทุกการ์ดมีปุ่ม "แก้ไข" กดแล้วเข้าแก้ไขรายการนั้นได้ทันที

3. **แผนก / Departments — จำกัดสิทธิ์แอดมิน**
   - เฉพาะอีเมลที่อยู่ใน `ADMIN_EMAILS` (ดูด้านล่าง) เท่านั้นที่ **เพิ่ม/แก้ไขชื่อ/ลบ** แผนกได้
   - ผู้ใช้ทั่วไปจะเห็นเฉพาะรายชื่อแผนกที่แอดมินตั้งไว้ (ดูอย่างเดียว แก้ไขไม่ได้)
   - ผู้ใช้ที่เป็นแอดมินจะเห็นป้าย **ADMIN** ข้างชื่อในแถบด้านบน

---

## ตั้งค่าแอดมิน (สำคัญ)

เปิดไฟล์ `firebase-config.js` แล้วดูท้ายไฟล์ส่วนนี้:

```js
window.ADMIN_EMAILS = [
  "naowadee.k@gmail.com"
  // "another.admin@example.com",
];
```

- ใส่อีเมลที่ใช้ล็อกอินเข้าแอป (อีเมลเดียวกับที่ใช้สมัคร/ล็อกอิน) ของทุกคนที่ต้องการให้เป็นแอดมิน
- เพิ่มได้หลายคน โดยคั่นด้วยคอมมา เช่น:
  ```js
  window.ADMIN_EMAILS = [
    "naowadee.k@gmail.com",
    "hr.manager@company.com"
  ];
  ```
- **ต้องแก้ไฟล์ `firestore.rules` ให้ตรงกันด้วย** (มีคำอธิบายในไฟล์นั้น) แล้วนำไป
  publish ใหม่ใน Firebase Console (ดูขั้นตอนด้านล่าง) ไม่เช่นนั้นการจำกัดสิทธิ์จะ
  เป็นเพียงการซ่อนปุ่มในหน้าเว็บเท่านั้น ไม่ได้ป้องกันจริงในฐานข้อมูล

> หมายเหตุ: ค่าใน `firebase-config.js` (apiKey ฯลฯ) ไม่ใช่ความลับ — เป็นเพียง
> "ที่อยู่" ของโปรเจกต์ Firebase ของคุณ ความปลอดภัยจริงมาจาก Firestore Rules

---

## ขั้นตอนติดตั้ง (ทำครั้งแรก)

### 1. สร้างโปรเจกต์ Firebase
1. ไปที่ https://console.firebase.google.com → "Add project"
2. ตั้งชื่อโปรเจกต์ (เช่น `bbs-observation`) แล้วสร้างให้เสร็จ

### 2. เปิดใช้ Authentication
1. ในเมนูซ้าย ไปที่ **Build → Authentication → Sign-in method**
2. เปิดใช้ **Email/Password**
3. เปิดใช้ **Google** (เลือกอีเมลสำหรับโปรเจกต์)

### 3. สร้าง Firestore Database
1. ไปที่ **Build → Firestore Database → Create database**
2. เลือก Production mode, เลือก location ที่ใกล้ (เช่น asia-southeast1)
3. ไปที่แท็บ **Rules** แล้ววางเนื้อหาทั้งหมดจากไฟล์ `firestore.rules` ที่แก้อีเมล
   แอดมินแล้ว กด **Publish**

### 4. คัดลอกค่า Config มาใส่ไฟล์
1. ไปที่ **Project settings** (ไอคอนเฟือง) → เลื่อนลงไปที่ "Your apps"
2. ถ้ายังไม่มีแอป กด ไอคอน **</>** (Web) เพื่อสร้างแอปเว็บ ตั้งชื่อ แล้วกด Register
3. จะได้ก้อนโค้ดหน้าตาแบบนี้:
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
4. คัดลอกแค่ค่าด้านในวงเล็บปีกกา ไปแทนที่ใน `firebase-config.js` (ส่วน
   `window.FIREBASE_CONFIG`) — ไม่ต้องเอาบรรทัด `import` หรือ `initializeApp` มา
5. อย่าลืมตั้งค่า `ADMIN_EMAILS` ตามหัวข้อด้านบน

### 5. อัปโหลดขึ้น GitHub
1. สร้าง repository ใหม่บน GitHub (public หรือ private ก็ได้ — Pages ใช้ได้ทั้งคู่
   ถ้าเป็น public repo; private repo ต้องมี GitHub Pro/Team/Enterprise)
2. อัปโหลดไฟล์ทั้งหมดในแพ็กเกจนี้ (`index.html`, `firebase-config.js`,
   `firestore.rules`, `README.md`) ขึ้น repo (หน้าแรกของ repo → "Add file" →
   "Upload files")

### 6. เปิด GitHub Pages
1. ไปที่ repo → **Settings → Pages**
2. หัวข้อ "Build and deployment" → Source: **Deploy from a branch**
3. Branch: เลือก `main` และโฟลเดอร์ `/ (root)` → Save
4. รอ 1-3 นาที แล้วรีเฟรชหน้านี้ จะเห็นลิงก์เว็บไซต์ของคุณที่ด้านบน เช่น:
   - ถ้า repo อยู่ใต้บัญชีส่วนตัว: `https://ชื่อผู้ใช้.github.io/ชื่อ-repo/`
   - ถ้า repo อยู่ใต้ organization: `https://ชื่อ-org.github.io/ชื่อ-repo/`
     (ตัวพิมพ์เล็กทั้งหมด)

### 7. อนุญาตโดเมนนี้ใน Firebase
1. กลับไปที่ Firebase Console → **Authentication → Settings → Authorized domains**
2. กด **Add domain** แล้ววางโดเมนจากขั้นตอนที่ 6 (ไม่ต้องมี `https://` หรือ path
   ท้าย เช่นใส่แค่ `natureworks-bbs.github.io`)
3. บันทึก

### 8. ทดสอบ
1. เปิดลิงก์เว็บไซต์จากขั้นตอนที่ 6
2. สมัครสมาชิกด้วยอีเมลที่ใส่ไว้ใน `ADMIN_EMAILS` → ควรเห็นป้าย ADMIN และ
   แก้ไข/เพิ่มแผนกได้
3. สมัครด้วยอีเมลอื่น → ควรเห็นแผนกแบบดูอย่างเดียว เพิ่ม/แก้ไขไม่ได้

---

## เพิ่ม/ลดแอดมินทีหลัง

1. แก้ `window.ADMIN_EMAILS` ใน `firebase-config.js`
2. แก้ `isAdmin()` ใน `firestore.rules` ให้ตรงกัน แล้ว Publish ใหม่ใน Firebase
   Console → Firestore → Rules
3. อัปโหลดไฟล์ `firebase-config.js` ที่แก้แล้วขึ้น GitHub ทับไฟล์เดิม (รอ GitHub
   Pages deploy ใหม่ 1-2 นาที)

---

## แก้ปัญหาที่พบบ่อย

| ปัญหา | วิธีแก้ |
|---|---|
| หน้าเว็บขึ้น 404 | รอ GitHub Pages deploy ให้เสร็จ (เช็คที่แท็บ Actions ของ repo), เช็ค URL ว่าตรงกับ Settings → Pages |
| ล็อกอินไม่ได้ / ขึ้น error โดเมน | ตรวจว่าใส่โดเมน GitHub Pages ใน Authorized domains แล้ว (ขั้นตอน 7) |
| กราฟ/ตัวเลขไม่ขึ้น | กราฟในแอปนี้เป็น CSS ล้วน ไม่พึ่งอินเทอร์เน็ตภายนอก — ถ้ายังไม่ขึ้นให้ลอง Hard refresh (Ctrl+Shift+R) |
| เพิ่ม/แก้ไข/ลบแผนกไม่ได้ทั้งที่เป็นแอดมิน | เช็คว่าอีเมลที่ล็อกอินตรงกับใน `ADMIN_EMAILS` **และ** `firestore.rules` เป๊ะๆ (ตัวพิมพ์เล็ก/ใหญ่ไม่มีผล แต่ตัวสะกดต้องตรง) และเช็คว่า publish rules ใหม่แล้ว |
| คนทั่วไปเห็นปุ่มแก้ไขแผนกด้วย | แปลว่า rules ยังไม่ได้ publish ใหม่ หรืออีเมลเขาดันอยู่ใน ADMIN_EMAILS โดยไม่ตั้งใจ |

---

ติดปัญหาส่วนอื่นเพิ่มเติม ถามแอดมินผู้ดูแลระบบ หรือกลับมาคุยกับ Claude ต่อได้เลยค่ะ
