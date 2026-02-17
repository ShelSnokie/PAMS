# 🏛️ Public Records & Archives Portal

A comprehensive digital platform for accessing public records and historical archives, built with modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 About

This portal provides secure, authenticated access to both public records (birth certificates, death certificates, marriage licenses, property deeds, court records) and historical archives (manuscripts, photographs, maps, government documents). It features role-based access control, view-only document protection, and a formal process for requesting certified copies.

### 🎯 Key Features

- 🔐 **Role-Based Access Control** - 14 user roles from PUBLIC to SYSTEM_ADMIN
- 👁️ **View-Only Documents** - Protected public records with screenshot prevention
- 📋 **Certified Copy Requests** - Formal process for obtaining official documents
- 🏢 **Department-Based Organization** - 15 specialized departments
- 🔍 **Advanced Search** - Search across 28M+ records and 15M+ digital archives
- 📊 **Comprehensive Collections** - 50+ record types organized by category
- 🛡️ **Security Features** - Audit logs, clearance levels, and access tracking

## ✨ Technology Stack

### Core Framework
- **⚡ Next.js 16** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling

### UI Components & Styling
- **🧩 shadcn/ui** - High-quality accessible components
- **🎯 Lucide React** - Consistent icon library
- **🌈 Framer Motion** - Smooth animations
- **🎨 Next Themes** - Dark/light mode support

### Forms & Validation
- **🎣 React Hook Form** - Performant forms
- **✅ Zod** - Schema validation

### State Management & Data
- **🐻 Zustand** - Client state management
- **🔄 TanStack Query** - Server state management

### Database & Backend
- **(Mocked)** - Frontend-only implementation for demonstration
- **🔐 NextAuth.js** - Authentication solution (Mocked)

### Advanced Features
- **📊 TanStack Table** - Data tables with sorting/filtering
- **📈 Recharts** - Data visualization
- **🖼️ Sharp** - Image processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Bun package manager
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/dnyathi310-commits/public-records-archives-portal.git

# Navigate into the project
cd public-records-archives-portal

# Install dependencies
bun install

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
public-records-archives-portal/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Homepage
│   │   ├── search/               # Search functionality
│   │   ├── collections/          # Record collections
│   │   ├── login/                # Authentication
│   │   ├── item/[id]/            # Record detail view
│   │   └── api/                  # API routes (Mock/Static)
│   ├── components/               # React components
│   │   └── ui/                   # shadcn/ui components
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utilities & configs
├── public/                       # Static assets
├── COLLABORATION.md              # Collaboration guide
├── SECURITY_IMPLEMENTATION.md    # Security documentation
└── SESSION_SUMMARY.md             # Project summary
```

## 🗄️ Data Structure (Mock)

The application uses a hierarchical archival structure for demonstration:

- **RecordGroup** - Top-level grouping (e.g., "Vital Records")
- **Series** - Sub-groups within RecordGroups
- **FileUnit** - Individual files or folders
- **Item** - Individual records or documents

### Key Entites

- **User** - Users with roles, departments, clearance levels
- **Department** - 15 specialized departments
- **AuditLog** - Security event tracking

## 👥 User Roles & Permissions

### Public Access
- **PUBLIC** - Unauthenticated visitors, search-only access
- **REGISTERED_USER** - Basic authenticated users, view records

### Staff Roles
- **ARCHIVAL_ASSISTANT** - Basic archival operations
- **REFERENCE_ARCHIVIST** - Research assistance
- **CATALOGING_SPECIALIST** - Metadata and cataloging
- **DIGITIZATION_TECHNICIAN** - Scanning and digitization
- **CONSERVATION_ASSISTANT** - Physical preservation

### Management Roles
- **ACQUISITIONS_ARCHIVIST** - Archive acquisition
- **RECORDS_MANAGER** - Records management
- **SUBJECT_SPECIALIST** - Domain expertise
- **OUTREACH_COORDINATOR** - Public programs

### Leadership Roles
- **DEPARTMENT_HEAD** - Department management
- **PRESERVATION_MANAGER** - Preservation oversight
- **NATIONAL_ARCHIVIST** - Senior archivist
- **SECURITY_OFFICER** - Access control
- **SYSTEM_ADMIN** - Full system access

## 🏢 Departments

1. **Vital Records Department** - Birth, death, marriage, divorce certificates
2. **Land & Property Records** - Deeds, ownership, transfers
3. **Court & Legal Records** - Case files, judgments
4. **Business Registration & Licensing** - Company registration, licenses
5. **Archival Processing** - Arrangement, description, cataloging
6. **Digitization & Digital Preservation** - Scanning, digital preservation
7. **Conservation & Preservation** - Physical preservation, treatment
8. **Reference & Research Services** - Research assistance
9. **Records Management** - Current records management
10. **Acquisition & Transfers** - Archive intake
11. **Outreach & Education** - Exhibitions, education programs
12. **Administration & Finance** - Human resources, budget
13. **Information Technology** - Systems, databases
14. **Security & Access Control** - Access management
15. **Director's Office** - Executive leadership

## 🔐 Security Features

### Document Protection
- **View-Only Mode** - Public records cannot be edited
- **Screenshot Prevention** - Blocks common screenshot methods
- **Right-Click Disabled** - Prevents context menu access
- **Copy Protection** - Blocks text selection and copying
- **Print Prevention** - Disables printing functionality

### Access Control
- **Clearance Levels** - RESTRICTED, CONFIDENTIAL, SECRET, TOP_SECRET
- **Department-Based Access** - Users see only their department's records
- **Role-Based Permissions** - Different capabilities per role
- **Audit Logging** - All access attempts logged
- **Session Management** - Automatic timeout and logout

### Authentication
- **Password Hashing** - bcrypt with 10 rounds
- **Session Tokens** - JWT-based authentication
- **Multi-Factor Authentication (MFA)** - Available for staff accounts
- **Account Status** - Active, suspended, pending, deactivated

## 📋 Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run lint         # Run ESLint

# Production (not used in this environment)
bun run build        # Build for production
bun start            # Start production server
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit with clear messages: `git commit -m "feat: add your feature"`
5. Push to your branch: `git push origin feature/your-feature`
6. Create a Pull Request

See [COLLABORATION.md](COLLABORATION.md) for detailed collaboration instructions.

## 📚 Documentation

- **[COLLABORATION.md](COLLABORATION.md)** - How to collaborate with others
- **[SECURITY_IMPLEMENTATION.md](SECURITY_IMPLEMENTATION.md)** - Security features and implementation
- **[SESSION_SUMMARY.md](SESSION_SUMMARY.md)** - Complete project history and features
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines (coming soon)

## 🐛 Bug Reporting

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

## 💡 Feature Requests

Have an idea? We'd love to hear it! Please:
- Check existing issues first
- Provide a clear description
- Explain the use case
- Suggest possible implementation

## 📊 Current Status

### ✅ Completed Features
- [x] Homepage with record statistics
- [x] Search functionality
- [x] Collections browsing
- [x] User authentication
- [x] Role-based access control
- [x] View-only document protection
- [x] Certified copy request system
- [x] 15 departments structure
- [x] Admin account setup
- [x] Security features implementation

### 🚧 In Progress
- [ ] API endpoints for records
- [ ] Remaining role dashboards
- [ ] Archive workflows
- [ ] Advanced search filters
- [ ] Bulk operations

### 📋 Planned Features
- [ ] Digital watermarking
- [ ] Email notifications
- [ ] Batch document processing
- [ ] Advanced analytics
- [ ] Mobile app (future)

## 🔧 Troubleshooting

### Database Issues

```bash
# Reset database (WARNING: Deletes all data)
rm db/custom.db
bun run db:push
```

### Dependency Issues

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Development Server Issues

```bash
# Kill any running processes on port 3000
lsof -ti:3000 | xargs kill -9

# Restart dev server
bun run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **dnyathi310** - Project Lead

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support and questions:
- Create an [Issue](https://github.com/dnyathi310-commits/public-records-archives-portal/issues)
- Check [Documentation](#-documentation)
- Review [Troubleshooting](#-troubleshooting)

---

Built with ❤️ for the preservation and accessibility of public records and historical archives.
