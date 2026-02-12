# 🤝 Contributing to Public Records & Archives Portal

Thank you for your interest in contributing to the Public Records & Archives Portal! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Suggesting Features](#suggesting-features)

## 🌟 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and considerate
- Use welcoming and inclusive language
- Focus on constructive feedback
- Accept criticism gracefully
- Empathize with other contributors

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Bun package manager
- Git installed and configured
- Basic knowledge of TypeScript and React

### Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/public-records-archives-portal.git

# 3. Navigate into the project
cd public-records-archives-portal

# 4. Install dependencies
bun install

# 5. Set up the database
bun run db:push

# 6. Create a feature branch
git checkout -b feature/your-feature-name

# 7. Start the development server
bun run dev
```

## 🔄 Development Workflow

### 1. Choose an Issue

Check the [Issues](https://github.com/dnyathi310-commits/public-records-archives-portal/issues) page:
- Look for issues labeled `good first issue` for beginners
- Pick issues matching your skills and interests
- Comment on the issue to let others know you're working on it

### 2. Create a Branch

Create a descriptive branch for your work:

```bash
# Feature branch
git checkout -b feature/user-dashboard

# Bug fix branch
git checkout -b fix/login-error

# Documentation branch
git checkout -b docs/update-readme
```

### 3. Make Changes

- Write clear, clean code
- Follow our coding standards (see below)
- Add comments for complex logic
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run linter
bun run lint

# Manually test your changes
# - Check the UI in browser
# - Test all affected functionality
# - Verify no breaking changes

# Run tests (when available)
bun test
```

### 5. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Format: <type>(<scope>): <description>

# Examples:
git commit -m "feat: add user dashboard"
git commit -m "fix: resolve login authentication error"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify authentication logic"
git commit -m "test: add unit tests for user service"
git commit -m "chore: update dependencies"
```

### 6. Push Your Changes

```bash
git push origin feature/your-branch-name
```

### 7. Create a Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Request reviews
6. Wait for feedback

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide explicit type annotations
- Avoid `any` type
- Use interfaces for object shapes
- Use enums for fixed sets of values

### React/Next.js

- Use functional components
- Use hooks for state and side effects
- Follow the Rules of Hooks
- Use shadcn/ui components when possible
- Keep components small and focused

### Styling

- Use Tailwind CSS classes
- Follow mobile-first design
- Ensure responsive layouts
- Use semantic HTML
- Test dark/light mode

### File Naming

- Use kebab-case for folders: `user-dashboard/`
- Use PascalCase for components: `UserDashboard.tsx`
- Use camelCase for utilities: `formatDate.ts`

### Comments

- Document complex logic
- Explain why, not what
- Use JSDoc for functions:
  ```typescript
  /**
   * Authenticates a user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Authentication token or null if failed
   */
  async function login(email: string, password: string): Promise<string | null>
  ```

## 📤 Submitting Changes

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project coding standards
- [ ] Tests pass (when available)
- [ ] No ESLint errors
- [ ] Documentation is updated
- [ ] Commit messages follow conventional commits
- [ ] PR description is clear and complete
- [ ] Linked to an issue (if applicable)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that breaks existing functionality)
- [ ] Documentation update

## Related Issue
Fixes #issue_number

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How did you test these changes?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## 🐛 Reporting Issues

### Before Creating an Issue

1. Search existing issues to avoid duplicates
2. Check if the issue has been fixed in the latest version
3. Try to reproduce the issue in a clean environment

### Issue Template

```markdown
## Description
Clear and concise description of the problem

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., Windows 10, macOS 12.0]
- Browser: [e.g., Chrome 100, Safari 15]
- Node version: [e.g., 18.0.0]
- Project version: [e.g., v1.0.0]

## Additional Context
Add any other context about the problem here
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Problem Statement
What problem are you trying to solve?

## Proposed Solution
How do you think this should be implemented?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Add any other context, mockups, or examples

## Impact Assessment
- [ ] Breaking change
- [ ] Requires migration
- [ ] Affects performance
- [ ] Requires database changes
```

## 🎯 Priority Labels

- `critical` - Blocks all work, must fix immediately
- `high` - Important for next release
- `medium` - Normal priority
- `low` - Nice to have, can wait

## 🏷️ Type Labels

- `bug` - Error or unexpected behavior
- `enhancement` - Improvement to existing feature
- `feature` - New functionality
- `documentation` - Docs only
- `design` - UI/UX changes
- `performance` - Speed/memory optimization
- `security` - Security-related

## 👥 Getting Help

If you need help:

1. Check existing issues and documentation
2. Ask in the [Discussions](https://github.com/dnyathi310-commits/public-records-archives-portal/discussions)
3. Contact maintainers through issues

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
