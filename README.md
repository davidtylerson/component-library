# Float Vibe Foundry

A monorepo containing the Float design system and applications built with it.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format
```

## 📚 Documentation

📖 **[Full Documentation](./docs/README.md)** - Complete guide to the monorepo

### Quick Links

- [Installation Guide](./docs/getting-started/installation.md)
- [Development Workflow](./docs/development/workflow.md)
- [Design System](./docs/design-system/components.md)
- [Troubleshooting](./docs/troubleshooting/common-issues.md)

## 🏗️ Project Structure

```
float-vibe-foundry/
├── packages/
│   ├── design-system/     # Core design system components
│   ├── email-renderer/    # Email template rendering application
│   └── app-2/            # Future applications
├── docs/                 # Documentation
├── package.json          # Root workspace configuration
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

## 🛠️ Development

### Available Scripts

```bash
pnpm dev              # Start all packages in development mode
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm lint:fix         # Lint and auto-fix issues
pnpm format           # Format all files
pnpm format:check     # Check formatting without changes
pnpm type-check       # TypeScript type checking
pnpm clean            # Clean all build artifacts
```

### Package Scripts

```bash
# Design System
pnpm --filter design-system dev
pnpm --filter design-system build

# Email Renderer
pnpm --filter email-renderer dev
pnpm --filter email-renderer build
```

## 📦 Packages

### Design System (`@float-vibe-foundry/design-system`)

- React components built with Radix UI
- Theme system with dark/light mode support
- Design tokens (colors, spacing, typography)
- CSS-in-JS with Tailwind CSS
- TypeScript support

### Applications

- **Email Renderer**: Email template rendering and preview application
- **Future apps**: Additional applications as needed

## 🛠️ Development Tools

- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **Husky**: Git hooks for pre-commit linting and formatting
- **TypeScript**: Type safety across all packages
- **Tailwind CSS**: Utility-first CSS framework

## 🤝 Contributing

This is a monorepo using pnpm workspaces. Changes to the design system will be immediately available to all applications during development.

See [Contributing Guidelines](./docs/development/contributing.md) for details.

## 📄 License

This project is private and proprietary.
