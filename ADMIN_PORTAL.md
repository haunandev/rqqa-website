# 🔐 Admin Portal Documentation

Portal admin untuk Yayasan Markaz Qurrota A'yun dengan 3 role berbeda: Siswa, Guru, dan Super Admin.

## 🚀 Akses Portal

**URL**: `http://localhost:3003/admin/login`

## 👥 Demo Credentials

### 1. Siswa (Student)

```
Email: student@example.com
Password: password123
```

**Fitur**:

- 📊 Dashboard dengan statistik pribadi
- 📚 Melihat program yang diikuti
- 📈 Tracking progress belajar
- 🏆 Ranking dan pencapaian

### 2. Guru (Teacher)

```
Email: teacher@example.com
Password: password123
```

**Fitur**:

- 📊 Dashboard dengan overview kelas
- 👥 Manajemen daftar siswa
- 📝 Input dan manajemen nilai
- 📋 Laporan kehadiran

### 3. Super Admin

```
Email: admin@example.com
Password: password123
```

**Fitur**:

- 📊 Dashboard system overview
- 👥 Manajemen seluruh users
- 📚 Manajemen program
- 📊 Generate laporan system
- 🔔 System notifications

## 📁 Folder Structure

```
src/
├── app/
│   └── admin/
│       ├── login/                 # Login page
│       ├── dashboard/             # Redirect page
│       ├── student/               # Student dashboard
│       ├── teacher/               # Teacher dashboard
│       ├── admin-panel/           # Admin dashboard
│       ├── layout.tsx             # Admin layout dengan sidebar
│       └── page.tsx               # Redirect page
│
└── contexts/
    └── AuthContext.tsx            # Authentication context
```

## 🔧 Teknologi

- **Framework**: Next.js 14 (App Router)
- **Auth**: Client-side dengan localStorage (demo)
- **Styling**: Tailwind CSS dengan glass effects
- **Animations**: Framer Motion

## 📋 Features

### ✅ Authentication

- Login dengan email & password
- Role-based access control (RBAC)
- Auto redirect berdasarkan role
- Logout functionality
- Data persisten dengan localStorage

### ✅ UI/UX

- Modern glass effect design
- Responsive sidebar (collapsible)
- Smooth animations
- Role-specific navigation
- Professional dashboard layouts

### ✅ Dashboard Features

#### Student Dashboard

- Welcome card dengan info siswa
- Statistics cards (program aktif, progress, ranking)
- Program enrollment management
- Progress tracking charts
- Activity history

#### Teacher Dashboard

- Welcome card dengan info guru
- System statistics (total siswa, kelas aktif, dll)
- Class overview
- Student management table
- Grade input form
- Grade summary

#### Admin Dashboard

- System status monitoring
- Quick actions panel
- User management table
- Program management
- Reports generation
- Activity logs

## 🚫 Limitations (Demo Version)

⚠️ **Current Limitations**:

- No database integration (data di localStorage)
- No real authentication (mock credentials)
- No actual data storage
- No email verification
- No password reset

## 🔄 Future Integration

Untuk production, perlu menambahkan:

1. **Backend API**
   - Authentication dengan JWT/OAuth
   - Database integration (MongoDB/PostgreSQL)
   - Real user management
   - Email service

2. **Database Schema**

   ```
   - Users (students, teachers, admins)
   - Programs
   - Enrollments
   - Grades
   - Attendance
   - Activities
   ```

3. **Security**
   - Password hashing (bcrypt)
   - CSRF protection
   - Rate limiting
   - Input validation

## 🎨 Customization

### Menambah Navigation Item

Edit `/src/app/admin/layout.tsx`:

```typescript
<NavLink
  href="/admin/teacher?tab=custom"
  label="Custom Tab"
  icon="🎯"
  isOpen={isSidebarOpen}
/>
```

### Mengubah Mock Data

Edit file dashboard (e.g., `/src/contexts/AuthContext.tsx`):

```typescript
const mockUsers = {
  "email@example.com": {
    id: "ID",
    name: "Name",
    email: "email@example.com",
    role: "student" | "teacher" | "admin",
    // ... additional fields
  },
};
```

## 📞 Support

Untuk pertanyaan atau kontribusi, silakan hubungi tim development.

---

**Last Updated**: April 2026  
**Version**: 1.0.0 (Demo)
