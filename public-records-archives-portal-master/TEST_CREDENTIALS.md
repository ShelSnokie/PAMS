# 🧪 Test Credentials

**Last Updated:** February 5, 2025

Use these credentials to test different dashboards and features of the Public Records & Archives Portal.

---

## 📋 All Test Credentials

| Username | Password | Role | Department | Dashboard |
|----------|----------|------|------------|-----------|
| admin | 1234 | System Administrator | Administration | /dashboard/admin |
| archivist | arch123 | National Archivist | Administration | /dashboard/executive |
| security | sec123 | Security Officer | Administration | /dashboard/security |
| researcher | res123 | Registered Researcher | Vital Records | /dashboard/reference |
| metadata | meta123 | Metadata Specialist | Archival Processing | /dashboard/metadata |
| digitizer | dig123 | Digitization Technician | Digital Preservation | /dashboard/tech |
| conservation | cons123 | Conservation Assistant | Digital Preservation | /dashboard/conservation |
| reference | ref123 | Reference Archivist | Reference Services | /dashboard/reference |
| outreach | out123 | Outreach Coordinator | Reference Services | /dashboard/outreach |
| processing | proc123 | Processing Archivist | Archival Processing | /dashboard/processing |
| specialist | spec123 | Subject Specialist | Archival Processing | /dashboard/specialist |
| manager | mgr123 | Department Head | Archival Processing | /dashboard/management |
| preservation | pres123 | Preservation Manager | Digital Preservation | /dashboard/preservation |

---

## 🏢 Department Structure (7 Streamlined Departments)

### 1. Vital Records (VR)
- **Responsibilities:** Birth, death, marriage, divorce certificates
- **Test Users:**
  - `researcher` / `res123` - Registered Researcher

### 2. Property & Legal Records (PLR)
- **Responsibilities:** Property deeds, court records, business registrations, licenses
- **Test Users:** None (assigned to other departments for testing)

### 3. Archival Processing (AP)
- **Responsibilities:** Arrangement, description, cataloging, acquisition, transfers
- **Test Users:**
  - `metadata` / `meta123` - Metadata Specialist
  - `processing` / `proc123` - Processing Archivist
  - `specialist` / `spec123` - Subject Specialist
  - `manager` / `mgr123` - Department Head

### 4. Digital Preservation (DP)
- **Responsibilities:** Scanning, digitization, physical conservation, digital preservation
- **Test Users:**
  - `digitizer` / `dig123` - Digitization Technician
  - `conservation` / `cons123` - Conservation Assistant
  - `preservation` / `pres123` - Preservation Manager

### 5. Reference Services (RS)
- **Responsibilities:** Research assistance, public access, exhibitions, education programs
- **Test Users:**
  - `reference` / `ref123` - Reference Archivist
  - `outreach` / `out123` - Outreach Coordinator

### 6. Records Management (RM)
- **Responsibilities:** Current records, retention schedules, records lifecycle
- **Test Users:** None (use other departments for testing)

### 7. Administration (ADM)
- **Responsibilities:** Admin, finance, IT, security, executive leadership
- **Test Users:**
  - `admin` / `admin123` - System Administrator
  - `archivist` / `arch123` - National Archivist
  - `security` / `sec123` - Security Officer

---

## 🎯 How to Use Test Credentials

### Step 1: Go to Login Page
Navigate to: `http://localhost:3000/login`

### Step 2: Enter Credentials
Use any username/password combination from the table above.

### Step 3: Automatic Dashboard Redirect
After login, you will be automatically redirected to the dashboard that matches your role:
- System Admin → Admin Dashboard
- National Archivist → Executive Dashboard
- Security Officer → Security Dashboard
- Reference Archivist → Reference Dashboard
- Digitization Technician → Tech Dashboard
- And so on...

### Step 4: Test Role-Specific Features
Each dashboard shows features and permissions specific to that role.

---

## 🔐 Admin Account

**Primary Admin Account:**
- Username: `admin`
- Password: `admin123`
- Role: System Administrator
- Department: Administration
- Dashboard: `/dashboard/admin`

**Capabilities:**
- Full system access
- User management (add, edit, delete users)
- Role management
- System configuration
- Audit log access
- All department access

---

## 📊 Role Hierarchy

### Executive Level (Highest Access)
1. **System Administrator** (`admin`) - Full system control
2. **National Archivist** (`archivist`) - Executive leadership

### Management Level
3. **Security Officer** (`security`) - Access control
4. **Preservation Manager** (`preservation`) - Digital/physical preservation
5. **Department Head** (`manager`) - Department supervision

### Specialist Level
6. **Processing Archivist** (`processing`) - Arrangement and processing
7. **Subject Specialist** (`specialist`) - Domain expertise
8. **Reference Archivist** (`reference`) - Research assistance
9. **Metadata Specialist** (`metadata`) - Cataloging

### Operational Level
10. **Digitization Technician** (`digitizer`) - Scanning
11. **Conservation Assistant** (`conservation`) - Physical handling
12. **Outreach Coordinator** (`outreach`) - Public engagement

### Public Level (Lowest Access)
13. **Registered Researcher** (`researcher`) - Public access with account
14. **Public** (no login) - Basic public access

---

## 🧪 Quick Test Scenarios

### Scenario 1: Test Admin User Management
1. Login as `admin` / `admin123`
2. Navigate to User Management tab
3. Click "Add User" to create a new user
4. Test editing and deleting users

### Scenario 2: Test Role-Based Access
1. Login as `researcher` / `res123` (low access)
2. Note limited dashboard features
3. Logout and login as `admin` / `admin123` (full access)
4. Compare dashboard capabilities

### Scenario 3: Test Department-Specific Views
1. Login as `digitizer` / `dig123` (Digital Preservation)
2. Note digitization-specific tasks
3. Logout and login as `processing` / `proc123` (Archival Processing)
4. Note processing-specific tasks

### Scenario 4: Test Security Features
1. Login as any user
2. Navigate to a record detail page
3. Try right-click (should be blocked)
4. Try Ctrl+P (should be blocked)
5. Try Ctrl+C (should be blocked)

---

## 📝 Notes

- All test users have MFA disabled for easy testing
- All passwords are simple (in production, use stronger passwords)
- All test users are in "active" status
- Dashboard URLs are automatically determined based on role
- No department selection needed during login

---

## 🔄 Resetting Test Data

If you need to reset the test users:

```bash
# Run the seed script
bun run prisma/seed-mock-users.ts
```

Or manually delete and recreate:

```bash
# Access database
sqlite3 db/custom.db

# Delete all users (except admin if desired)
DELETE FROM User WHERE username != 'admin';

# Exit
.quit

# Run seed again
bun run tsx prisma/seed-mock-users.ts
```

---

## ⚠️ Important

- **DO NOT** use these credentials in production
- **DO NOT** share these credentials publicly
- **DO** change admin password before deployment
- **DO** enable MFA for production accounts
- **DO** use strong passwords in production

---

**For questions or issues, check the Help Center at `/help`** or contact the system administrator.
