# Quick Start Guide

Get up and running with Float Vibe Foundry in 5 minutes!

## 🚀 Prerequisites

Make sure you have:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

## ⚡ Quick Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd float-vibe-foundry
pnpm install
```

### 2. Start Development

```bash
pnpm dev
```

This will start:

- Design system on `http://localhost:3000`
- Email Renderer on `http://localhost:3001`

### 3. Verify Everything Works

Open your browser and check:

- Design system components are rendering
- Theme switching works (light/dark mode)
- No console errors

## 🎯 What You Can Do Now

### Explore the Design System

Visit `http://localhost:3000` to see:

- **Components page**: All UI components
- **Design system page**: Theme and token documentation
- **Buttons page**: Button variants and examples

### Make Your First Change

1. **Edit a component:**

   ```bash
   # Open the button component
   code packages/design-system/src/components/ui/button.tsx
   ```

2. **See changes instantly:**
   - Save the file
   - Watch the browser update automatically
   - No restart needed!

### Add a New Component

1. **Create a new component:**

   ```bash
   # Create a new component file
   touch packages/design-system/src/components/ui/my-component.tsx
   ```

2. **Export it:**

   ```bash
   # Add to the index file
   echo "export { MyComponent } from './my-component';" >> packages/design-system/src/components/ui/index.ts
   ```

3. **Use it in an app:**
   ```typescript
   import { MyComponent } from '@float-vibe-foundry/design-system';
   ```

## 🛠️ Essential Commands

```bash
# Development
pnpm dev              # Start all development servers
pnpm build            # Build all packages
pnpm lint             # Check code quality
pnpm format           # Format code

# Package-specific
pnpm --filter design-system dev    # Start only design system
pnpm --filter email-renderer dev   # Start only email renderer
```

## 📁 Key Files to Know

```
float-vibe-foundry/
├── packages/design-system/src/
│   ├── components/ui/     # UI components
│   ├── themes/           # Theme system
│   ├── tokens/           # Design tokens
│   └── app/              # Design system demo pages
├── packages/email-renderer/src/   # Email rendering application
├── docs/                 # Documentation
└── package.json          # Root configuration
```

## 🎨 Design System Basics

### Using Components

```tsx
import { Button, Card, useTheme } from '@float-vibe-foundry/design-system';

function MyPage() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <Button onClick={() => setTheme('dark')}>Switch to Dark Mode</Button>
    </Card>
  );
}
```

### Theme System

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  );
}
```

## 🔧 Development Tips

### Hot Reloading

- Changes to components update instantly
- No need to restart development servers
- CSS changes are reflected immediately

### TypeScript Support

- Full TypeScript support across all packages
- Auto-completion and type checking
- Import suggestions work automatically

### Styling

- Use Tailwind CSS utility classes
- Design tokens are available as CSS variables
- Theme-aware styling with CSS variables

## 🚨 Common Issues

### Port Already in Use

```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Import Errors

```bash
# Reinstall dependencies
pnpm install
```

### Styling Issues

```bash
# Check if CSS is imported
# Look for globals.css import in layout files
```

## 📚 Next Steps

1. **Read the full documentation:**
   - [Installation Guide](./installation.md)
   - [Development Workflow](../development/workflow.md)
   - [Design System Documentation](../design-system/components.md)

2. **Explore the codebase:**
   - Check out existing components
   - Understand the theme system
   - Look at design tokens

3. **Start building:**
   - Create your first component
   - Build a new application
   - Customize the theme

---

**Need help?** Check the [troubleshooting guide](../troubleshooting/common-issues.md) or create an issue in the repository.
