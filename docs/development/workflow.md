# Development Workflow

This guide outlines the development workflow for the Float Vibe Foundry monorepo, including best practices, coding standards, and development processes.

## 🚀 Daily Development Workflow

### 1. Starting Your Day

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
pnpm install

# Start development servers
pnpm dev
```

### 2. Making Changes

#### Design System Changes

When working on the design system:

```bash
# Navigate to design system
cd packages/design-system

# Make your changes
# The design system will hot-reload automatically
```

#### Application Changes

When working on applications:

```bash
# Navigate to specific app
cd packages/email-renderer

# Make your changes
# The app will hot-reload automatically
```

### 3. Before Committing

```bash
# Run linting to check for issues
pnpm lint

# Auto-fix any linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Auto-format if needed
pnpm format

# Run type checking
pnpm type-check
```

### 4. Committing Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new button variant to design system"

# Push to your branch
git push origin your-branch-name
```

## 📝 Code Standards

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat(design-system): add new card component"
git commit -m "fix(email-renderer): resolve navigation issue"
git commit -m "docs: update installation guide"
```

### Code Style

#### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use explicit return types for public functions
- Avoid `any` type - use `unknown` or proper types

#### React Components

- Use functional components with hooks
- Prefer named exports over default exports
- Use proper TypeScript interfaces for props
- Follow the component naming convention: `PascalCase`

#### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the established design token system
- Use CSS variables for theme values
- Keep component styles scoped

## 🔄 Monorepo Best Practices

### Package Dependencies

#### Adding Dependencies

**Root dependencies (dev tools, build tools):**

```bash
pnpm add -D -w package-name
```

**Package-specific dependencies:**

```bash
pnpm add package-name --filter @float-vibe-foundry/design-system
```

#### Workspace Dependencies

When one package depends on another:

```bash
# In the consuming package's package.json
{
  "dependencies": {
    "@float-vibe-foundry/design-system": "workspace:*"
  }
}
```

### File Organization

```
packages/
├── design-system/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── themes/         # Theme system
│   │   ├── tokens/         # Design tokens
│   │   └── lib/           # Utilities
│   └── package.json
├── email-renderer/
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   └── components/    # App-specific components
│   └── package.json
```

### Import/Export Patterns

#### Design System Exports

```typescript
// packages/design-system/src/index.ts
export { Button } from './components/ui/button';
export { Card } from './components/ui/card';
export { useTheme } from './themes/theme-context';
```

#### Application Imports

```typescript
// In app packages
import { Button, Card, useTheme } from '@float-vibe-foundry/design-system';
```

## 🧪 Testing Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter design-system test

# Run tests in watch mode
pnpm test --watch
```

### Writing Tests

- Write tests for all new components
- Use React Testing Library for component tests
- Follow the AAA pattern (Arrange, Act, Assert)
- Test both success and error cases

## 🚀 Deployment Workflow

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter design-system build
pnpm --filter email-renderer build
```

### Publishing Design System

```bash
# Build the design system
pnpm --filter design-system build

# Publish to npm (when ready)
pnpm --filter design-system publish
```

## 🔧 Development Tools

### VS Code Extensions

Install these extensions for the best experience:

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-import TypeScript modules
- **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
- **GitLens** - Git integration
- **Error Lens** - Inline error display

### Git Hooks

The project uses Husky for pre-commit hooks:

- **Pre-commit**: Runs linting and formatting on staged files
- **Pre-push**: Runs tests (when configured)

### Debugging

#### Design System Debugging

```bash
# Start design system with debugging
pnpm --filter design-system dev --inspect

# Open browser dev tools to debug
```

#### Application Debugging

```bash
# Start app with debugging
pnpm --filter email-renderer dev --inspect

# Use React DevTools for component debugging
```

## 📊 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
pnpm --filter design-system build --analyze
```

### Performance Testing

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Test on different devices and network conditions

## 🔄 Continuous Integration

### Pre-commit Checklist

Before committing, ensure:

- [ ] Code passes linting (`pnpm lint`)
- [ ] Code is properly formatted (`pnpm format:check`)
- [ ] TypeScript compilation passes (`pnpm type-check`)
- [ ] Tests pass (`pnpm test`)
- [ ] No console errors in development
- [ ] Changes work in both light and dark themes

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Run all checks locally
4. Create a pull request with a clear description
5. Request review from team members
6. Address any feedback
7. Merge when approved

## 🆘 Getting Help

### Common Issues

- **Hot reload not working**: Check if the development server is running
- **Import errors**: Ensure workspace dependencies are correctly configured
- **Type errors**: Run `pnpm type-check` to identify issues
- **Styling issues**: Check Tailwind CSS configuration and CSS imports

### Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Need help?** Check the [troubleshooting guide](../troubleshooting/common-issues.md) or create an issue in the repository.
 