# Float Vibe Foundry Documentation

Welcome to the Float Vibe Foundry documentation! This monorepo contains a comprehensive design system and applications built with it.

## 📚 Documentation Structure

### Getting Started

- [Installation Guide](./getting-started/installation.md) - Set up the monorepo
- [Quick Start](./getting-started/quick-start.md) - Get up and running in 5 minutes
- [Workspace Setup](./getting-started/workspace-setup.md) - Understanding the monorepo structure

### Design System

- [Components](./design-system/components.md) - UI component library
- [Themes](./design-system/themes.md) - Theme system and customization
- [Colors](./design-system/colors.md) - Color system and tokens
- [Tokens](./design-system/tokens.md) - Design tokens and variables

### Applications

- [Email Renderer](./applications/email-renderer.md) - Email template rendering application
- [Creating Apps](./applications/creating-apps.md) - How to create new applications

### Development

- [Workflow](./development/workflow.md) - Development workflow and best practices
- [Contributing](./development/contributing.md) - Contributing guidelines
- [Testing](./development/testing.md) - Testing guidelines

### Troubleshooting

- [Common Issues](./troubleshooting/common-issues.md) - Common problems and solutions
- [Debugging](./troubleshooting/debugging.md) - Debugging guide

## 🏗️ Project Structure

```
float-vibe-foundry/
├── packages/
│   ├── design-system/     # Core design system components
│   ├── email-renderer/    # Email template rendering application
│   └── app-2/            # Future applications
├── docs/                 # This documentation
├── package.json          # Root workspace configuration
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development:**

   ```bash
   pnpm dev
   ```

3. **Run linting:**

   ```bash
   pnpm lint
   ```

4. **Format code:**
   ```bash
   pnpm format
   ```

## 📦 Packages

### Design System (`@float-vibe-foundry/design-system`)

The core design system with:

- React components built with Radix UI
- Theme system with dark/light mode support
- Design tokens (colors, spacing, typography)
- CSS-in-JS with Tailwind CSS
- TypeScript support

### Applications

Individual applications built using the design system:

- **Email Renderer**: Email template rendering and preview application
- **Future apps**: Additional applications as needed

## 🛠️ Development Tools

- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **Husky**: Git hooks for pre-commit linting and formatting
- **TypeScript**: Type safety across all packages
- **Tailwind CSS**: Utility-first CSS framework

## 🤝 Contributing

See [Contributing Guidelines](./development/contributing.md) for details on:

- Code style and formatting
- Pull request process
- Testing requirements
- Documentation updates

## 📄 License

This project is private and proprietary.

---

**Need help?** Check the [troubleshooting guide](./troubleshooting/common-issues.md) or create an issue in the repository.
 