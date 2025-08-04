# Installation Guide

This guide will help you set up the Float Vibe Foundry monorepo on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Installing Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/). We recommend using the LTS version.

### Installing pnpm

Install pnpm globally:

```bash
npm install -g pnpm
```

Or using other methods:

```bash
# Using Homebrew (macOS)
brew install pnpm

# Using Curl
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Clone the Repository

```bash
git clone <repository-url>
cd float-vibe-foundry
```

## Install Dependencies

Install all dependencies for the monorepo:

```bash
pnpm install
```

This will install dependencies for:

- Root workspace
- Design system package
- All application packages

## Verify Installation

Run the following commands to verify everything is working:

```bash
# Check that all packages are installed
pnpm list

# Run linting to check code quality
pnpm lint

# Check formatting
pnpm format:check

# Start development servers
pnpm dev
```

## Development Servers

After installation, you can start the development servers:

```bash
# Start all packages in development mode
pnpm dev

# Or start individual packages
pnpm --filter design-system dev
pnpm --filter app-1 dev
```

## Available Scripts

### Root Level Scripts

```bash
pnpm dev              # Start all packages in development mode
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm lint:fix         # Lint and auto-fix issues
pnpm format           # Format all files
pnpm format:check     # Check formatting without changes
pnpm type-check       # TypeScript type checking
pnpm clean            # Clean all build artifacts
pnpm test             # Run tests (when available)
```

### Package Level Scripts

Each package has its own scripts:

```bash
# Design System
pnpm --filter design-system dev
pnpm --filter design-system build
pnpm --filter design-system lint

# App-1
pnpm --filter app-1 dev
pnpm --filter app-1 build
pnpm --filter app-1 lint
```

## IDE Setup

### VS Code (Recommended)

Install these extensions for the best development experience:

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-import TypeScript modules
- **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
- **GitLens** - Git integration

### Recommended VS Code Settings

Add these to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Environment Variables

Create a `.env.local` file in the root directory if needed:

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your specific values
nano .env.local
```

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**pnpm install fails:**

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

**ESLint errors:**

```bash
# Auto-fix linting issues
pnpm lint:fix
```

**Formatting issues:**

```bash
# Auto-format all files
pnpm format
```

### Getting Help

If you encounter issues:

1. Check the [troubleshooting guide](../troubleshooting/common-issues.md)
2. Ensure all prerequisites are installed correctly
3. Try clearing caches and reinstalling dependencies
4. Check the console for specific error messages

## Next Steps

Once installation is complete:

1. Read the [Quick Start Guide](./quick-start.md) to get familiar with the codebase
2. Explore the [Design System Documentation](../design-system/components.md)
3. Check out the [Development Workflow](../development/workflow.md)

---

**Need help?** Create an issue in the repository or check the troubleshooting guide.
