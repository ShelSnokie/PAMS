# 🔄 Department & Role Restructure Plan

**Date:** February 5, 2025
**Purpose:** Streamline departments, fix login flow, create test credentials, and fix admin dashboard

---

## 📋 Current Issues

1. **Too many departments (15)** - Overly complex and redundant
2. **Login requires department selection** - Should auto-route based on role
3. **No mock credentials** - Hard to test different dashboards
4. **Admin dashboard buttons don't work** - Add User/Manage Users not functional

---

## 🏢 Streamlined Department Structure (7 Departments)

### Before (15 Departments):
1. Vital Records Department
2. Land & Property Records
3. Court & Legal Records
4. Business Registration & Licensing
5. Archival Processing
6. Digitization & Digital Preservation
7. Conservation & Preservation
8. Reference & Research Services
9. Records Management
10. Acquisition & Transfers
11. Outreach & Education
12. Administration & Finance
13. Information Technology
14. Security & Access Control
15. Director's Office

### After (7 Streamlined Departments):

#### 1. **Vital Records** (VR)
- **Merges:** Vital Records Department
- **Responsibilities:** Birth, death, marriage, divorce certificates
- **Primary Roles:** 
  - REGISTERED_RESEARCHER (public access)
  - METADATA_SPECIALIST (cataloging)

#### 2. **Property & Legal Records** (PLR)
- **Merges:** Land & Property Records, Court & Legal Records, Business Registration & Licensing
- **Responsibilities:** Property deeds, court records, business registrations, licenses
- **Primary Roles:**
  - REGISTERED_RESEARCHER (public access)
  - METADATA_SPECIALIST (cataloging)

#### 3. **Archival Processing** (AP)
- **Merges:** Archival Processing, Acquisition & Transfers
- **Responsibilities:** Arrangement, description, cataloging, acquisition, transfers
- **Primary Roles:**
  - PROCESSING_ARCHIVIST (lead)
  - SUBJECT_SPECIALIST (domain expertise)
  - METADATA_SPECIALIST (cataloging)
  - DEPARTMENT_HEAD (supervision)

#### 4. **Digital Preservation** (DP)
- **Merges:** Digitization & Digital Preservation, Conservation & Preservation
- **Responsibilities:** Scanning, digitization, physical conservation, digital preservation
- **Primary Roles:**
  - DIGITIZATION_TECH (scanning)
  - CONSERVATION_ASSISTANT (physical handling)
  - PRESERVATION_MANAGER (oversight)

#### 5. **Reference Services** (RS)
- **Merges:** Reference & Research Services, Outreach & Education
- **Responsibilities:** Research assistance, public access, exhibitions, education programs
- **Primary Roles:**
  - REFERENCE_ARCHIVIST (research assistance)
  - OUTREACH_COORDINATOR (public engagement)

#### 6. **Records Management** (RM)
- **Merges:** Records Management
- **Responsibilities:** Current records, retention schedules, records lifecycle
- **Primary Roles:**
  - METADATA_SPECIALIST
  - DEPARTMENT_HEAD

#### 7. **Administration** (ADM)
- **Merges:** Administration & Finance, Information Technology, Security & Access Control, Director's Office
- **Responsibilities:** Admin, finance, IT, security, executive leadership
- **Primary Roles:**
  - SECURITY_OFFICER (access control)
  - NATIONAL_ARCHIVIST (executive)
  - SYSTEM_ADMIN (technical)

---

## 👤 Role-to-Dashboard Mapping

| Role | Dashboard | Department | Priority |
|------|-----------|------------|----------|
| PUBLIC | Home page (no login) | - | N/A |
| REGISTERED_RESEARCHER | `/dashboard/reference` | VR, PLR | Low |
| DIGITIZATION_TECH | `/dashboard/tech` | DP | Medium |
| CONSERVATION_ASSISTANT | `/dashboard/conservation` | DP | Medium |
| METADATA_SPECIALIST | `/dashboard/metadata` | AP, VR, PLR, RM | High |
| REFERENCE_ARCHIVIST | `/dashboard/reference` | RS | High |
| OUTREACH_COORDINATOR | `/dashboard/outreach` | RS | Medium |
| PROCESSING_ARCHIVIST | `/dashboard/processing` | AP | High |
| SUBJECT_SPECIALIST | `/dashboard/specialist` | AP | Medium |
| DEPARTMENT_HEAD | `/dashboard/management` | Any department | High |
| PRESERVATION_MANAGER | `/dashboard/preservation` | DP | High |
| NATIONAL_ARCHIVIST | `/dashboard/executive` | ADM | Critical |
| SECURITY_OFFICER | `/dashboard/security` | ADM | High |
| SYSTEM_ADMIN | `/dashboard/admin` | ADM | Critical |

---

## 🔐 Mock Test Credentials

| Username | Password | Role | Department | Dashboard |
|----------|----------|------|------------|-----------|
| admin | admin123 | SYSTEM_ADMIN | ADM | /dashboard/admin |
| archivist | arch123 | NATIONAL_ARCHIVIST | ADM | /dashboard/executive |
| security | sec123 | SECURITY_OFFICER | ADM | /dashboard/security |
| researcher | res123 | REGISTERED_RESEARCHER | VR | /dashboard/reference |
| metadata | meta123 | METADATA_SPECIALIST | AP | /dashboard/metadata |
| digitizer | dig123 | DIGITIZATION_TECH | DP | /dashboard/tech |
| conservation | cons123 | CONSERVATION_ASSISTANT | DP | /dashboard/conservation |
| reference | ref123 | REFERENCE_ARCHIVIST | RS | /dashboard/reference |
| outreach | out123 | OUTREACH_COORDINATOR | RS | /dashboard/outreach |
| processing | proc123 | PROCESSING_ARCHIVIST | AP | /dashboard/processing |
| specialist | spec123 | SUBJECT_SPECIALIST | AP | /dashboard/specialist |
| manager | mgr123 | DEPARTMENT_HEAD | AP | /dashboard/management |
| preservation | pres123 | PRESERVATION_MANAGER | DP | /dashboard/preservation |

---

## 🔄 Changes Required

### 1. Update Login Page
- ❌ Remove department selection dropdown
- ✅ Auto-detect department from user record
- ✅ Auto-redirect to correct dashboard based on role
- ✅ Keep single login form (public + staff)

### 2. Update Login API
- ✅ Add role-to-dashboard mapping logic
- ✅ Return dashboard URL in response
- ✅ Remove department validation

### 3. Create Seed Data
- ✅ Add mock users with all roles
- ✅ Assign correct departments
- ✅ Set proper roles

### 4. Fix Admin Dashboard
- ✅ Implement "Add User" modal/functionality
- ✅ Implement "Manage Users" page/modal
- ✅ Add user CRUD operations

### 5. Update Navigation
- ✅ Update department references in UI
- ✅ Update department dropdowns (if any)

---

## 📝 Implementation Order

1. ✅ Create mock users seed file
2. ✅ Update login page (remove department selection)
3. ✅ Update login API (auto-redirect logic)
4. ✅ Update department constants
5. ✅ Fix admin dashboard user management
6. ✅ Test all login flows

---

## 🎯 Success Criteria

- [ ] Login page has no department selection
- [ ] Each role redirects to correct dashboard
- [ ] All 13 mock credentials work
- [ ] Admin can add new users
- [ ] Admin can manage existing users
- [ ] Department structure streamlined to 7
- [ ] All dashboards accessible via correct roles

---

**Next:** Implement changes starting with mock users seed file.
