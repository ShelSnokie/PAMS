# 🤝 Project Collaboration Guide

This guide will help you collaborate with your friend on the Public Records & Archives Portal project.

---

## 📋 Prerequisites

Before starting, ensure both you and your friend have:

1. **Git installed** on your machines
   - Check: `git --version`
   - Install: https://git-scm.com/downloads

2. **A GitHub account** (or other Git hosting service)
   - GitHub: https://github.com/signup
   - GitLab: https://about.gitlab.com/
   - Bitbucket: https://bitbucket.org/

3. **Node.js & Bun installed**
   - Node.js: https://nodejs.org/
   - Bun: https://bun.sh/

---

## 🚀 Step-by-Step Collaboration Setup

### Step 1: Create a Remote Repository

**Option A: GitHub (Recommended)**

1. Go to https://github.com/new
2. Repository name: `public-records-archives-portal` (or your preferred name)
3. Description: `Public Records & Archives Portal - A collaborative project`
4. Set as **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we have these already)
6. Click "Create repository"

**Option B: GitLab or Bitbucket**

Follow similar steps on your preferred platform.

---

### Step 2: Connect Your Local Repository to Remote

Run these commands in your project directory:

```bash
# Navigate to project directory
cd /home/z/my-project

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/public-records-archives-portal.git

# Verify remote is added
git remote -v
```

**Alternative using SSH (Recommended for security):**

```bash
# Add remote using SSH (requires SSH key setup)
git remote add origin git@github.com:YOUR_USERNAME/public-records-archives-portal.git
```

---

### Step 3: Push Your Code to Remote

```bash
# Push to remote repository
git push -u origin master
```

If you get an error about different branch names, use:

```bash
# Rename to main (GitHub default)
git branch -M main
git push -u origin main
```

---

### Step 4: Invite Your Friend

**On GitHub:**

1. Go to your repository on GitHub
2. Click **Settings** → **Collaborators**
3. Click **Add people**
4. Enter your friend's GitHub username or email
5. Set their permissions:
   - **Admin**: Full access (recommended for close collaboration)
   - **Maintain**: Can manage issues, pull requests, but not settings
   - **Write**: Can push code
   - **Read**: Can only view and clone

6. Click **Add** and your friend will receive an invitation

---

### Step 5: Friend Clones the Repository

Your friend should run these commands on their machine:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/public-records-archives-portal.git

# Navigate into the project
cd public-records-archives-portal

# Install dependencies
bun install

# Set up the database
bun run db:push

# Run the development server
bun run dev
```

---

## 🔄 Daily Collaboration Workflow

### Scenario 1: Making Changes

**When you want to make changes:**

```bash
# 1. Always start by pulling latest changes
git pull origin main

# 2. Create a new branch for your feature (recommended)
git checkout -b feature/your-feature-name

# 3. Make your changes and save files
# ... edit files ...

# 4. Check what changed
git status

# 5. Stage your changes
git add .

# 6. Commit your changes
git commit -m "feat: add your feature description"

# 7. Push your branch
git push -u origin feature/your-feature-name

# 8. Create a Pull Request on GitHub
#    (Go to repository → Pull requests → New pull request)
```

**When your friend wants to make changes:**

They follow the same process with a different branch name.

---

### Scenario 2: Merging Changes (Using Pull Requests)

**Best Practice: Always use Pull Requests for collaboration**

1. **Create Pull Request** on GitHub after pushing your branch
2. **Review** each other's code before merging
3. **Discuss** any changes in the PR comments
4. **Merge** once both agree

**Merging steps:**

```bash
# After PR is merged on GitHub, pull the latest changes
git checkout main
git pull origin main

# Delete your feature branch (optional)
git branch -d feature/your-feature-name
```

---

### Scenario 3: Handling Conflicts

**When both of you edit the same file:**

```bash
# 1. Pull latest changes
git pull origin main

# 2. If conflicts occur, Git will show you:
#    <<<<<<< HEAD
#    Your changes
#    =======
#    Friend's changes
#    >>>>>>> origin/main

# 3. Edit the file to resolve conflicts
#    Keep what you want, delete what you don't

# 4. Mark as resolved
git add <conflicted-file>

# 5. Commit the merge
git commit -m "resolve: merge conflict in <filename>"

# 6. Push the resolved version
git push origin main
```

---

## 📁 What's Shared vs. What's Local

### ✅ Shared (Tracked in Git)
- All source code in `src/`
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Prisma schema (`prisma/schema.prisma`)
- Documentation (`.md` files)
- Public assets (`public/`)
- UI components (`src/components/`)

### ❌ Not Shared (Ignored by .gitignore)
- Database files (`*.db`, `db/custom.db`)
- Node modules (`node_modules/`)
- Build files (`.next/`, `out/`)
- Environment files (`.env*`)
- Upload/download directories (`upload/`, `download/`)
- Temporary files
- Logs (`dev.log`, `server.log`)

### 🔄 Database Synchronization

**Important:** The database file is NOT shared. Each person has their own local database.

**To keep databases in sync:**

1. **Share schema changes** through `prisma/schema.prisma`
2. **Each person runs** after pulling changes:
   ```bash
   bun run db:push
   ```

3. **For sharing data** (if needed):
   - Export data: `bunx prisma db seed`
   - Share seed files in Git
   - Both run seed to populate database

---

## 🛡️ Collaboration Best Practices

### ✅ DO:
- **Pull before pushing** to avoid conflicts
- **Write clear commit messages**:
  ```
  feat: add user authentication
  fix: resolve login page error
  docs: update README with setup instructions
  refactor: improve component structure
  style: format code with prettier
  test: add unit tests for API endpoints
  chore: update dependencies
  ```
- **Use branches** for features, bug fixes, experiments
- **Review each other's code** through Pull Requests
- **Communicate** before making large changes
- **Keep commits small and focused**

### ❌ DON'T:
- **Push directly to main** without discussion (for important changes)
- **Commit large files** (images, binaries) - use external hosting
- **Ignore merge conflicts** - resolve them properly
- **Commit sensitive data** (passwords, API keys)
- **Delete branches** without confirming they're merged

---

## 🔐 Handling Sensitive Information

### Environment Variables

1. **Create `.env.example`** (tracked in Git):
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # API Keys (placeholders only)
   NEXT_PUBLIC_API_URL="your_api_url_here"
   SECRET_KEY="your_secret_key_here"
   ```

2. **Create `.env`** (not tracked, each person has their own):
   ```env
   # Your actual secrets
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_API_URL="https://api.example.com"
   SECRET_KEY="your_actual_secret_key"
   ```

3. **Share `.env.example`** in Git
4. **Each person creates** their own `.env` with real values

---

## 📊 Project-Specific Collaboration Notes

### For This Project (Public Records & Archives Portal):

#### 1. **Database Structure**
- Schema is in `prisma/schema.prisma`
- After pulling changes, always run:
  ```bash
  bun run db:push
  ```

#### 2. **Admin Account**
- Email: `archive@archive.co.zw`
- Password: `1234`
- Each person should create their own test accounts, not share the real admin password

#### 3. **API Development**
- API routes are in `src/app/api/`
- Test APIs locally before pushing
- Document API changes in code comments

#### 4. **UI Components**
- Components are in `src/components/ui/`
- Use existing shadcn/ui components
- Follow the established design system

#### 5. **Security**
- Never commit real user data
- Never commit API keys or secrets
- Review security changes together

---

## 🚦 Common Collaboration Scenarios

### Scenario: "I made changes but my friend can't see them"

**Solution:**
```bash
# On your machine:
git push origin main

# On friend's machine:
git pull origin main
```

---

### Scenario: "We both edited the same file"

**Solution:**
1. Both pull: `git pull origin main`
2. Resolve conflicts (see Scenario 3 above)
3. Both commit and push resolved version

---

### Scenario: "My friend added a new feature, how do I get it?"

**Solution:**
```bash
# Pull latest changes
git pull origin main

# If it's a new branch:
git fetch origin
git checkout feature/their-feature-name
```

---

### Scenario: "I want to revert my changes"

**Solution:**
```bash
# If not committed yet:
git restore filename

# If already committed but not pushed:
git reset HEAD~1

# If already pushed (be careful!):
git revert <commit-hash>
```

---

## 📞 Communication Tips

### Use GitHub for:
- **Issues**: Track bugs, feature requests, tasks
- **Pull Requests**: Code review and discussion
- **Discussions**: General questions and planning
- **Projects**: Organize work with Kanban boards

### Use external tools for:
- **Real-time chat**: Discord, Slack, WhatsApp
- **Video calls**: Zoom, Google Meet
- **Documentation**: Notion, Confluence

---

## 🎯 Suggested Git Workflow

### Option 1: Feature Branch Workflow (Recommended)

```
main (production-ready)
  ├── feature/user-authentication
  ├── feature/record-search
  ├── fix/login-bug
  └── docs/update-readme
```

**Steps:**
1. Create branch from `main`
2. Work on feature
3. Create Pull Request
4. Review and discuss
5. Merge to `main`
6. Delete branch

---

### Option 2: Gitflow Workflow (For larger teams)

```
main (production)
  ├── develop (integration)
      ├── feature/user-authentication
      ├── feature/record-search
      ├── release/v1.0.0
      └── hotfix/critical-bug
```

**Steps:**
1. Create feature branches from `develop`
2. Merge features back to `develop`
3. Create release branches from `develop`
4. Merge releases to `main` and `develop`

---

## 📚 Additional Resources

### Git Documentation
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

### Collaboration Tools
- [GitHub Features](https://docs.github.com/en)
- [Pull Request Best Practices](https://github.com/features/pull-requests)

### Project-Specific Help
- Check `README.md` for project setup
- Check `SECURITY_IMPLEMENTATION.md` for security guidelines
- Check `SESSION_SUMMARY.md` for project overview

---

## ❓ Troubleshooting

### "Permission denied" when pushing

**Cause:** You don't have write access to the repository

**Solution:**
1. Check if you're added as a collaborator
2. Verify you're using the correct account
3. Check if repository is private and you're not a member

---

### "Failed to push some refs"

**Cause:** Remote has changes you don't have locally

**Solution:**
```bash
git pull origin main
git push origin main
```

---

### "SSL certificate problem"

**Cause:** SSL certificate verification failed

**Solution:**
```bash
# Temporary (not recommended for production):
git config --global http.sslVerify false

# Better: Fix your SSL certificates
# Or use SSH instead of HTTPS
```

---

## 🎉 Ready to Collaborate!

You're now set up to collaborate with your friend. Here's a quick checklist:

- [ ] Create remote repository on GitHub/GitLab
- [ ] Connect local repository to remote
- [ ] Push your code
- [ ] Invite friend as collaborator
- [ ] Friend clones the repository
- [ ] Both can make changes and sync
- [ ] Establish communication channels
- [ ] Agree on workflow (branching strategy)

Happy collaborating! 🚀

---

**Need help?** Check the GitHub documentation or ask in the repository Discussions section.
