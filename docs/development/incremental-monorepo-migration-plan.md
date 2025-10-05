# Incremental Monorepo Migration Plan

## 🎯 **Objective**

Consolidate duplicate UI components from the root `src/` directory into the `packages/design-system/` package, eliminating code duplication while maintaining a working application throughout the process.

## 🚨 **Previous Attempt Pitfalls (AVOID THESE)**

- ❌ **Big Bang Approach**: Tried to move everything at once
- ❌ **No Testing**: Made changes without verifying functionality
- ❌ **Broken Imports**: Created cascading import failures
- ❌ **File Deletion**: Removed working code before replacement was proven
- ❌ **No Rollback Plan**: Changes couldn't be easily undone

## ✅ **New Approach: Incremental Migration**

- **One Component at a Time**: Move and test each component individually
- **Always Working**: Application must function after each step
- **Easy Rollback**: Each step can be undone independently
- **Thorough Testing**: Verify functionality before proceeding

---

## 📋 **Phase 1: Preparation & Analysis**

### Task 1.1: Document Current State

- [ ] Create inventory of all components in `src/components/`
- [ ] Create inventory of all components in `packages/design-system/src/components/`
- [ ] Identify duplicate components between locations
- [ ] Document current import patterns in root app

### Task 1.2: Setup Development Environment

- [ ] Ensure both root app and design system package can run simultaneously
- [ ] Verify `pnpm dev` starts both servers without conflicts
- [ ] Test that root app imports work correctly
- [ ] Test that design system package builds successfully

### Task 1.3: Create Migration Branch

- [ ] Create new branch: `git checkout -b incremental-migration`
- [ ] Ensure working tree is clean: `git status` shows no changes
- [ ] Document current commit hash for rollback reference

---

## 📋 **Phase 2: Component Migration (One at a Time)**

### Migration Process for Each Component:

1. **Copy** component to design system package
2. **Test** design system package builds
3. **Update** root app imports to use design system
4. **Test** root app functionality
5. **Remove** old component from root
6. **Verify** everything still works
7. **Commit** successful migration

### Task 2.1: Migrate Button Component

- [ ] Copy `src/components/ui/button.tsx` to `packages/design-system/src/components/ui/`
- [ ] Update design system `src/index.ts` to export Button
- [ ] Update root app imports: `import { Button } from '@float-vibe-foundry/design-system'`
- [ ] Test button functionality in root app
- [ ] Remove `src/components/ui/button.tsx`
- [ ] Test root app still works
- [ ] Commit: `git commit -m "feat: migrate Button component to design system"`

### Task 2.2: Migrate Card Component

- [ ] Copy `src/components/ui/card/` to `packages/design-system/src/components/ui/`
- [ ] Update design system exports
- [ ] Update root app imports
- [ ] Test card functionality
- [ ] Remove old card component
- [ ] Test root app
- [ ] Commit changes

### Task 2.3: Migrate Typography Components

- [ ] Copy `src/components/typography/` to `packages/design-system/src/components/`
- [ ] Update design system exports
- [ ] Update root app imports
- [ ] Test typography functionality
- [ ] Remove old typography components
- [ ] Test root app
- [ ] Commit changes

### Task 2.4: Migrate Remaining UI Components

- [ ] Continue with accordion, alert, aspect-ratio, etc.
- [ ] Follow same process for each component
- [ ] Test thoroughly after each migration
- [ ] Commit each successful migration

---

## 📋 **Phase 3: Theme System Migration**

### Task 3.1: Migrate Theme Context

- [ ] Copy `src/themes/theme-context.tsx` to design system
- [ ] Update design system exports
- [ ] Update root app imports
- [ ] Test theme switching functionality
- [ ] Remove old theme context
- [ ] Test root app
- [ ] Commit changes

### Task 3.2: Migrate Theme CSS

- [ ] Copy `src/themes/theme.css` to design system
- [ ] Update design system imports
- [ ] Update root app to import from design system
- [ ] Test theme styles work correctly
- [ ] Remove old theme CSS
- [ ] Test root app
- [ ] Commit changes

---

## 📋 **Phase 4: Utility & Hook Migration**

### Task 4.1: Migrate Hooks

- [ ] Copy `src/hooks/` to design system
- [ ] Update design system exports
- [ ] Update root app imports
- [ ] Test hook functionality
- [ ] Remove old hooks
- [ ] Test root app
- [ ] Commit changes

### Task 4.2: Migrate Utilities

- [ ] Copy `src/lib/` to design system
- [ ] Update design system exports
- [ ] Update root app imports
- [ ] Test utility functions
- [ ] Remove old utilities
- [ ] Test root app
- [ ] Commit changes

---

## 📋 **Phase 5: Cleanup & Verification**

### Task 5.1: Remove Empty Directories

- [ ] Remove empty `src/components/ui/` directory
- [ ] Remove empty `src/components/` directory
- [ ] Remove empty `src/themes/` directory
- [ ] Remove empty `src/hooks/` directory
- [ ] Remove empty `src/lib/` directory

### Task 5.2: Update Import Statements

- [ ] Search for any remaining local imports
- [ ] Update all imports to use design system package
- [ ] Ensure no broken import paths exist

### Task 5.3: Final Testing

- [ ] Test root app functionality completely
- [ ] Test design system package builds
- [ ] Test both packages can run simultaneously
- [ ] Verify no console errors
- [ ] Test in both light and dark themes

---

## 🧪 **Testing Checklist for Each Migration**

Before proceeding to the next component, verify:

### Design System Package

- [ ] Component builds without errors
- [ ] Component exports correctly from index.ts
- [ ] No TypeScript compilation errors
- [ ] Component renders in design system package

### Root Application

- [ ] Component imports without errors
- [ ] Component renders correctly
- [ ] Component functionality works as expected
- [ ] No console errors or warnings
- [ ] Component works in both themes

### Integration

- [ ] Hot reload works for both packages
- [ ] Changes to design system reflect in root app
- [ ] No import resolution conflicts

---

## 🚨 **Rollback Procedures**

### If a Migration Breaks Something:

1. **Immediate**: `git checkout -- .` to restore working files
2. **Verify**: Test that root app works again
3. **Investigate**: Identify what went wrong
4. **Fix**: Resolve the issue
5. **Retry**: Attempt migration again with fixes

### If Multiple Migrations Are Broken:

1. **Reset**: `git reset --hard <last-working-commit>`
2. **Restart**: Begin migration from the last working state
3. **Smaller Steps**: Break down problematic migrations into smaller pieces

---

## 📝 **Implementation Notes for AI Assistant**

### File Structure Context

- **Root App**: `src/` - Main Next.js application
- **Design System**: `packages/design-system/src/` - Component library
- **Package.json**: Root has workspace dependencies configured
- **Imports**: Use `@float-vibe-foundry/design-system` for design system imports

### Key Commands

```bash
# Start both servers
pnpm dev

# Build design system
pnpm --filter design-system build

# Install dependencies
pnpm install

# Check status
git status
```

### Import Pattern Changes

```typescript
// BEFORE (local import)
import { Button } from '@/components/ui/button';

// AFTER (design system import)
import { Button } from '@float-vibe-foundry/design-system';
```

### Testing Approach

1. **Always test after each change**
2. **Verify both packages work**
3. **Check for console errors**
4. **Test component functionality**
5. **Commit only after successful testing**

---

## 🎯 **Success Criteria**

Migration is complete when:

- [ ] All UI components exist only in design system package
- [ ] Root app imports all components from design system
- [ ] No duplicate components exist
- [ ] Both packages run without errors
- [ ] All functionality works as expected
- [ ] No broken imports or missing dependencies

---

## ⚠️ **Critical Rules**

1. **NEVER delete working code until replacement is proven**
2. **ALWAYS test after each change**
3. **ONE component at a time**
4. **COMMIT after each successful migration**
5. **ROLLBACK immediately if something breaks**
6. **VERIFY both packages work before proceeding**

This plan ensures a safe, incremental migration that maintains a working application throughout the entire process.
