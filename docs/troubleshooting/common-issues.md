# Common Issues and Solutions

This guide covers common problems you might encounter when working with the Float Vibe Foundry monorepo and their solutions.

## 🚨 Installation Issues

### pnpm install fails

**Problem:** `pnpm install` fails with various errors.

**Solutions:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules packages/*/node_modules
pnpm install

# If using npm/yarn, switch to pnpm
npm install -g pnpm
pnpm install
```

### Workspace dependencies not found

**Problem:** `Cannot find module '@float-vibe-foundry/design-system'`

**Solutions:**
```bash
# Ensure workspace is properly configured
cat pnpm-workspace.yaml

# Reinstall dependencies
pnpm install

# Check if package exists in workspace
pnpm list --depth=0
```

## 🔧 Development Issues

### Port already in use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm --filter design-system dev --port 3001
```

### Hot reload not working

**Problem:** Changes don't reflect in the browser automatically.

**Solutions:**
```bash
# Restart development server
pnpm dev

# Clear browser cache
# Or open in incognito mode

# Check file watchers (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### TypeScript errors

**Problem:** TypeScript compilation errors.

**Solutions:**
```bash
# Run type checking
pnpm type-check

# Fix auto-fixable issues
pnpm lint:fix

# Check specific package
pnpm --filter design-system type-check
```

## 🎨 Design System Issues

### Components not importing

**Problem:** `Module not found` when importing design system components.

**Solutions:**
```bash
# Check exports in design system
cat packages/design-system/src/index.ts

# Ensure component is exported
# Add to packages/design-system/src/components/ui/index.ts
export { MyComponent } from './my-component';

# Rebuild design system
pnpm --filter design-system build
```

### Theme not switching

**Problem:** Dark/light mode toggle doesn't work.

**Solutions:**
```bash
# Check ThemeProvider is wrapping app
# Ensure CSS variables are defined
# Verify attribute prop matches CSS selectors

# Debug theme state
console.log('Theme:', theme, 'IsDark:', isDark);
```

### Styling issues

**Problem:** Components don't look right or styles are missing.

**Solutions:**
```bash
# Check CSS imports
# Ensure globals.css is imported in layout

# Verify Tailwind CSS is configured
cat packages/design-system/tailwind.config.js

# Check CSS variables are defined
# Look for :root and .dark selectors
```

## 📦 Package Issues

### Workspace dependencies

**Problem:** Changes in one package don't reflect in another.

**Solutions:**
```bash
# Use workspace protocol in package.json
{
  "dependencies": {
    "@float-vibe-foundry/design-system": "workspace:*"
  }
}

# Reinstall after changes
pnpm install
```

### Build errors

**Problem:** `pnpm build` fails.

**Solutions:**
```bash
# Clean build artifacts
pnpm clean

# Check TypeScript errors first
pnpm type-check

# Build packages individually
pnpm --filter design-system build
pnpm --filter email-renderer build
```

## 🛠️ Tooling Issues

### ESLint errors

**Problem:** ESLint configuration errors or rule violations.

**Solutions:**
```bash
# Check ESLint config
cat .eslintrc.js

# Fix auto-fixable issues
pnpm lint:fix

# Run on specific files
npx eslint packages/design-system/src/components/ui/button.tsx

# Check ESLint version compatibility
npx eslint --version
```

### Prettier formatting issues

**Problem:** Code formatting conflicts or Prettier not working.

**Solutions:**
```bash
# Format all files
pnpm format

# Check formatting without changes
pnpm format:check

# Check Prettier config
cat .prettierrc

# Resolve conflicts
# Remove .prettierrc and regenerate
```

### Git hooks not working

**Problem:** Pre-commit hooks don't run or fail.

**Solutions:**
```bash
# Check Husky installation
cat .husky/pre-commit

# Reinstall Husky
pnpm prepare

# Check lint-staged config
cat .lintstagedrc.js

# Run hooks manually
npx lint-staged
```

## 🌐 Browser Issues

### Hydration errors

**Problem:** `Warning: Text content did not match` in Next.js.

**Solutions:**
```bash
# Add suppressHydrationWarning to html element
<html lang="en" suppressHydrationWarning>

# Use client wrapper for theme provider
'use client';
import { ThemeProvider } from '@float-vibe-foundry/design-system';
```

### Console errors

**Problem:** JavaScript errors in browser console.

**Solutions:**
```bash
# Check for React version conflicts
pnpm list react

# Ensure all dependencies are compatible
# Check for missing peer dependencies

# Debug with React DevTools
# Install React Developer Tools browser extension
```

## 🔍 Debugging Tips

### Enable debug mode

```bash
# Enable Next.js debug mode
DEBUG=* pnpm dev

# Enable theme debug mode
<ThemeProvider enableDebug={true}>

# Enable ESLint debug mode
npx eslint --debug packages/design-system/src
```

### Check package versions

```bash
# List all package versions
pnpm list --depth=0

# Check for version conflicts
pnpm list react
pnpm list @types/react

# Update packages
pnpm update
```

### Monitor file changes

```bash
# Watch for file changes
find packages/design-system/src -name "*.tsx" -exec echo {} \;

# Check file permissions
ls -la packages/design-system/src/components/ui/
```

## 📞 Getting Help

### Before asking for help

1. **Check this guide** - Your issue might already be covered
2. **Search existing issues** - Look for similar problems
3. **Check logs** - Look at terminal output and browser console
4. **Reproduce the issue** - Create a minimal reproduction

### When reporting issues

Include:
- **Error message** - Copy the exact error
- **Steps to reproduce** - What you did to cause the issue
- **Environment** - OS, Node.js version, pnpm version
- **Relevant files** - Any configuration files that might be relevant

### Useful commands

```bash
# System information
node --version
pnpm --version
npm --version

# Package information
pnpm list --depth=0
pnpm list react
pnpm list @types/react

# Build information
pnpm build --verbose
pnpm type-check --verbose
```

## 🔄 Common Workflows

### Setting up a new component

```bash
# 1. Create component file
touch packages/design-system/src/components/ui/my-component.tsx

# 2. Add to exports
echo "export { MyComponent } from './my-component';" >> packages/design-system/src/components/ui/index.ts

# 3. Add to main exports
echo "export { MyComponent } from './components/ui';" >> packages/design-system/src/index.ts

# 4. Test in application
# Import and use in email-renderer
```

### Fixing dependency issues

```bash
# 1. Clear all caches
pnpm store prune
rm -rf node_modules packages/*/node_modules

# 2. Reinstall
pnpm install

# 3. Check for conflicts
pnpm list --depth=0

# 4. Update if needed
pnpm update
```

### Debugging theme issues

```bash
# 1. Check theme provider
# Ensure ThemeProvider wraps your app

# 2. Check CSS variables
# Look for :root and .dark selectors

# 3. Check theme state
console.log('Theme:', theme, 'IsDark:', isDark);

# 4. Check localStorage
localStorage.getItem('theme')
```

---

**Still having issues?** Create an issue in the repository with the information above. 