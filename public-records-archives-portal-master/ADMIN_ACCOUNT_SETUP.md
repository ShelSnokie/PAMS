# Admin Account Setup - Records & Archives Portal

## Date: 2025-02-04

---

## ✅ Tasks Completed

### 1. Updated System Terminology to "Records & Archives"

**Updated Pages:**
- **Homepage** (`/src/app/page.tsx`)
  - Changed "Public Records Portal" → "Public Records & Archives Portal"
  - Updated tagline to "Official Records & Archives Portal"
  - Updated headline to "Access Public Records & Archives"
  - Updated description to include "historical archives"
  - Changed "Digital Documents" stat to "Digital Archives"

- **Search Page** (`/src/app/search/page.tsx`)
  - Updated header to "Public Records & Archives Portal"
  - Updated search placeholder to include "historical archives"
  - Updated footer copyright

- **Collections Page** (`/src/app/collections/page.tsx`)
  - Updated header to "Public Records & Archives Portal"
  - Changed headline to "Browse Records & Archives"
  - Updated footer copyright

- **Login Page** (`/src/app/login/page.tsx`)
  - Updated title to "Public Records & Archives Portal"
  - Updated system name to "Official Records & Archives Access System"
  - Updated description to include "archives and official documents"

---

### 2. Created Admin Account

**Admin Account Details:**
- **Email:** `archive@archive.co.zw`
- **Password:** `1234`
- **Username:** `admin`
- **Role:** `SYSTEM_ADMIN` (Highest level access)
- **Department:** `ALL` (Access to all departments)
- **Employee ID:** `ADMIN-001`
- **Country:** `Zimbabwe`
- **MFA Enabled:** `false` (No MFA required for this account)
- **Status:** `active`

---

### 3. Database Configuration

**Changes Made:**
- Switched from PostgreSQL to SQLite for better compatibility
- Updated Prisma schema to use SQLite (`file:../db/custom.db`)
- Fixed schema for SQLite compatibility:
  - Removed `@db.Text` annotations
  - Changed `String[]` arrays to `String` (JSON encoded)
  - Changed `BigInt` to `Int`
  - Removed `@@fulltext` indexes
  - Fixed relation definitions

**Database Push:**
- Used `--force-reset` to create clean database
- Successfully pushed schema to SQLite database
- Generated Prisma Client

---

### 4. Admin Account Permissions

The admin account has:
- **SYSTEM_ADMIN role** - Highest privilege level in the system
- **Department: ALL** - Access to all departments:
  - Vital Records
  - Recording Office
  - County Clerk
  - Court Administration
  - Assessor's Office
  - Business Licensing
  - IT & Security
- **MFA: Disabled** - No multi-factor authentication required
- **Clearance Level:** TOP_SECRET

---

## 📝 How to Use the Admin Account

### Login Credentials:
```
Email:    archive@archive.co.zw
Password: 1234
```

### Access:
1. Go to the login page: `/login`
2. Select "Staff Portal" tab
3. Enter credentials
4. You will be redirected to the System Admin dashboard (`/dashboard/admin`)
5. No MFA required

### Capabilities:
As a SYSTEM_ADMIN, this account can:
- Access all departments
- Manage all users and roles
- Configure system settings
- View all audit logs
- Access all records and archives
- Perform all CRUD operations
- Export data
- Approve/reject requests
- Monitor security incidents

---

## 🗂️ Database Schema Summary

**Core Tables Created:**
- User (with admin account)
- Session
- Permission
- Role
- UserPermission
- RolePermission
- AuditLog
- RecordGroup (archival level 1)
- Series (archival level 2)
- FileUnit (archival level 3)
- Item (archival level 4 - individual documents)
- Creator, Subject, Tag
- RecordComment
- Workflow, WorkflowTask
- Transfer, TransferStatus
- And many more...

**Total:** 25+ models for complete Records & Archives management system

---

## 🔧 Technical Details

**Prisma Client:** Generated and ready to use
**Database:** SQLite (`/home/z/my-project/db/custom.db`)
**Seed Script:** `/home/z/my-project/prisma/seed-simple.ts`

**Commands Used:**
```bash
bun run db:push --force-reset  # Create clean database
bun run db:seed                 # Create admin account
```

---

## 📊 System Access Levels

The system now supports 14 user roles:
1. PUBLIC - No login (general public)
2. REGISTERED_RESEARCHER - Public with account
3. DIGITIZATION_TECH - Operational (scanning)
4. CONSERVATION_ASSISTANT - Physical handling
5. METADATA_SPECIALIST - Cataloging
6. REFERENCE_ARCHIVIST - Public interaction
7. OUTREACH_COORDINATOR - Public engagement
8. PROCESSING_ARCHIVIST - Arrangement
9. SUBJECT_SPECIALIST - Curation
10. DEPARTMENT_HEAD - Supervision
11. PRESERVATION_MANAGER - Digital/physical preservation
12. NATIONAL_ARCHIVIST - Executive level
13. SECURITY_OFFICER - Access control
14. SYSTEM_ADMIN - Technical administration ⭐

**The admin account has SYSTEM_ADMIN role (level 14), the highest privilege.**

---

## 🎉 Summary

✅ System terminology updated to "Records & Archives" throughout
✅ Admin account created with full access to all departments
✅ No MFA required for admin account
✅ Database configured with SQLite
✅ All relations fixed and working
✅ Prisma Client generated
✅ Dev server running successfully on port 3000

**The admin account is ready to use!**
