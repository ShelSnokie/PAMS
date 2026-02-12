# 🚀 Getting Started Guide for Collaborators

This guide will help you get the Public Records & Archives Portal running on your machine.

---

## 📋 Prerequisites

Before you start, make sure you have these installed:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **Bun** (Package manager - faster than npm)
   - Install via terminal:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     ```
   - Or download: https://bun.sh/
   - Check version: `bun --version`

3. **Git** (Version control)
   - Download: https://git-scm.com/downloads
   - Check version: `git --version`

### Recommended Tools

- **VS Code** or any code editor
- **Postman** or **Insomnia** (for API testing) - optional

---

## 📥 Step 1: Clone the Repository

### Option A: If you have GitHub access

```bash
# Clone the repository
git clone https://github.com/dnyathi310-commits/public-records-archives-portal.git

# Navigate into the project directory
cd public-records-archives-portal
```

### Option B: If you don't have GitHub access yet

Ask the project owner to add you as a collaborator, then use the command above.

---

## 📦 Step 2: Install Dependencies

```bash
# Install all project dependencies
bun install
```

This will take a few minutes. It will install all the packages listed in `package.json`.

**If this fails:**
```bash
# Try clearing cache and reinstalling
rm -rf node_modules bun.lockb
bun install
```

---

## 🗄️ Step 3: Set Up the Database

The project uses SQLite with Prisma ORM. The database will be created automatically.

```bash
# Create the database and apply the schema
bun run db:push
```

This will:
- Create a `db/custom.db` file
- Set up all the database tables
- Create the admin account

**If this fails:**
```bash
# Make sure db directory exists
mkdir -p db

# Try again
bun run db:push
```

---

## 🚀 Step 4: Start the Development Server

```bash
# Start the development server
bun run dev
```

You should see something like:
```
  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

---

## 🌐 Step 5: Open in Browser

Open your browser and go to:
**http://localhost:3000**

You should see the Public Records & Archives Portal homepage!

---

## 🔐 Step 6: Test the Admin Account

Use these credentials to log in as admin:

- **Email:** `archive@archive.co.zw`
- **Password:** `1234`
- **Department:** Any (admin has access to all)

This account has full access to the system.

---

## 📂 Understanding the Project Structure

```
public-records-archives-portal/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Homepage
│   │   ├── search/             # Search page
│   │   ├── collections/        # Collections page
│   │   ├── login/              # Login page
│   │   └── item/[id]/          # Record details
│   ├── components/             # React components
│   │   └── ui/                 # UI components (shadcn/ui)
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities and configs
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed-simple.ts          # Database seeding
├── db/
│   └── custom.db               # SQLite database (created after setup)
├── public/                     # Static assets
├── README.md                   # Project documentation
├── CONTRIBUTING.md             # Contribution guide
├── TASKS.md                    # Task list
└── COLLABORATION.md            # Collaboration guide
```

---

## 🔄 Daily Development Workflow

### 1. Always Start with Latest Changes

```bash
# Pull the latest changes from GitHub
git pull origin master
```

### 2. Create a Branch for Your Work

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Example:
git checkout -b feature/user-dashboard
```

### 3. Make Your Changes

- Edit files in your code editor
- Save your changes
- Check the browser to see updates (it auto-reloads!)

### 4. Check Your Changes

```bash
# Run linter to check for code issues
bun run lint
```

### 5. Commit Your Changes

```bash
# See what changed
git status

# Add your changes
git add .

# Commit with a message
git commit -m "feat: describe what you did"
```

### 6. Push Your Changes

```bash
# Push your branch to GitHub
git push -u origin feature/your-feature-name
```

### 7. Create a Pull Request

1. Go to: https://github.com/dnyathi310-commits/public-records-archives-portal
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Fill in the form
5. Click "Create Pull Request"

---

## 🛠️ Common Commands

```bash
# Start development server
bun run dev

# Check code quality
bun run lint

# Update database schema
bun run db:push

# Pull latest changes
git pull origin master

# Check current branch
git branch

# Switch branches
git checkout master

# See recent commits
git log --oneline -10

# See what changed
git status

# See file changes
git diff
```

---

## 🐛 Troubleshooting

### "command not found: bun"

**Solution:** Install Bun first:
```bash
curl -fsSL https://bun.sh/install | bash
```

Then restart your terminal or run:
```bash
source ~/.bashrc  # or ~/.zshrc
```

---

### "port 3000 is already in use"

**Solution:** Kill the process using port 3000:

**On Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**On Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then try starting the server again.

---

### "Database not found" or "Prisma error"

**Solution:**
```bash
# Remove the old database
rm db/custom.db

# Create a fresh database
bun run db:push
```

---

### "Permission denied" when pulling/pushing

**Solution:** Make sure you're added as a collaborator:
1. Ask the repository owner to add you
2. Verify your GitHub account is linked
3. Try again

---

### "Module not found" error

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next bun.lockb
bun install
```

---

### Changes not showing in browser

**Solution:**
```bash
# Stop the server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Start server again
bun run dev
```

---

## 📚 Learning Resources

### For the Tech Stack

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev/learn
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Prisma:** https://www.prisma.io/docs
- **shadcn/ui:** https://ui.shadcn.com/

### For Git

- **Git Handbook:** https://guides.github.com/introduction/git-handbook/
- **GitHub Skills:** https://skills.github.com/

---

## 💡 Tips for Success

1. **Pull before you push** - Always get the latest changes first
2. **Write clear commit messages** - Describe what you did and why
3. **Use branches** - Don't work directly on master
4. **Test your changes** - Make sure everything works before committing
5. **Ask questions** - Use GitHub Discussions or Issues to ask for help
6. **Read the docs** - Check README.md, CONTRIBUTING.md, and TASKS.md

---

## 🤝 How to Contribute

1. **Choose a task** from the TASKS.md file
2. **Create an issue** on GitHub if one doesn't exist
3. **Create a branch** for your work
4. **Make your changes**
5. **Test thoroughly**
6. **Commit and push**
7. **Create a Pull Request**
8. **Wait for review and merge**

---

## 📞 Need Help?

### Documentation
- **README.md** - Project overview
- **CONTRIBUTING.md** - How to contribute
- **TASKS.md** - List of tasks to work on
- **COLLABORATION.md** - Collaboration guide

### GitHub
- **Issues:** https://github.com/dnyathi310-commits/public-records-archives-portal/issues
- **Discussions:** https://github.com/dnyathi310-commits/public-records-archives-portal/discussions

---

## ✅ Checklist Before Starting Work

- [ ] Node.js 18+ installed
- [ ] Bun installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] Dependencies installed (`bun install`)
- [ ] Database set up (`bun run db:push`)
- [ ] Dev server running (`bun run dev`)
- [ ] Can access http://localhost:3000

---

**That's it! You're ready to start contributing!** 🎉

If you get stuck, check the troubleshooting section above or create an issue on GitHub.

Happy coding! 🚀
