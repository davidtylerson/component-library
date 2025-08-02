# Float Monorepo Migration Plan

## Overview
This plan outlines the migration from the current single-project structure to a proper monorepo setup using pnpm workspaces. This will enable rapid development of both the design system and applications simultaneously.

## Goals
- [ ] Set up clean monorepo structure
- [ ] Migrate design system with proper CSS handling
- [ ] Create first application workspace
- [ ] Establish fast development workflow
- [ ] Fix all CSS import issues
- [ ] Enable instant updates between packages
- [ ] **NEW: Consolidate CSS into single file (shadcn-style)**

## Phase 1: Preparation and Backup

### 1.1 Backup Current Work
- [ ] Create backup of current project: `cp -r float-prototype-library float-prototype-library-backup`
- [ ] Document current project structure and dependencies
- [ ] Identify critical components and assets to preserve
- [ ] Create inventory of current features and functionality

### 1.2 Plan New Structure
- [ ] Design optimal monorepo directory structure
- [ ] Plan workspace relationships and dependencies
- [ ] Define package naming conventions
- [ ] **NEW: Plan CSS consolidation strategy (single file approach)**

## Phase 2: Create New Monorepo Structure

### 2.1 Initialize Root Workspace
- [ ] Create new directory: `float-workspace`
- [ ] Initialize root `package.json` with workspace configuration
- [ ] Create `pnpm-workspace.yaml` file
- [ ] Set up root TypeScript configuration
- [ ] Create root `.gitignore` file
- [ ] Initialize git repository

### 2.2 Create Design System Package
- [ ] Create `packages/design-system/` directory
- [ ] Set up `packages/design-system/package.json`
- [ ] Configure TypeScript for design system
- [ ] Set up build process with tsup
- [ ] Create proper export structure
- [ ] **NEW: Set up single CSS file structure (no component CSS files)**

### 2.3 Create First Application Package
- [ ] Create `packages/app-1/` directory
- [ ] Set up Next.js application
- [ ] Configure package.json with workspace dependencies
- [ ] Set up TypeScript configuration
- [ ] Configure Next.js for monorepo
- [ ] Set up Tailwind CSS integration

## Phase 3: Migrate Design System Assets

### 3.1 Migrate Core Assets
- [ ] Copy design tokens (`src/tokens/`) to new structure
- [ ] Migrate theme system (`src/themes/`) 
- [ ] Copy component logic (React components)
- [ ] Migrate utility functions and helpers
- [ ] Copy TypeScript types and interfaces
- [ ] Migrate documentation and examples

### 3.2 **NEW: CSS Consolidation (Critical Step)**
- [ ] **Consolidate all component CSS variables into single file**
- [ ] **Extract variables from:**
  - [ ] `src/styles/components/button.css`
  - [ ] `src/styles/components/input.css`
  - [ ] `src/styles/components/input-dropdown.css`
  - [ ] `src/styles/components/card.css`
  - [ ] `src/styles/components/sidebar.css`
- [ ] **Organize CSS into logical sections:**
  - [ ] Foundational colors
  - [ ] Semantic variables
  - [ ] Component variables (button, input, card, sidebar)
  - [ ] Dark mode overrides
  - [ ] Component utility classes
- [ ] **Remove all @import statements from globals.css**
- [ ] **Test that all components still render correctly**
- [ ] **Verify theme switching works**
- [ ] **Ensure no CSS variable conflicts**

### 3.3 Migrate Components
- [ ] Migrate UI components (`src/components/ui/`)
- [ ] Migrate typography components
- [ ] Migrate theme components
- [ ] Update component imports and exports
- [ ] Test component functionality
- [ ] Verify component styling with consolidated CSS

## Phase 4: Establish Development Workflow

### 4.1 Set Up Build Process
- [ ] Configure tsup for design system builds
- [ ] **NEW: Simplify CSS build process (single file copy)**
- [ ] Configure watch mode for development
- [ ] Set up parallel development scripts
- [ ] Test build process end-to-end
- [ ] Verify hot reloading works

### 4.2 Configure Dependencies
- [ ] Set up shared dev dependencies at root
- [ ] Configure workspace dependencies
- [ ] Set up peer dependencies correctly
- [ ] Configure TypeScript project references
- [ ] Test dependency resolution
- [ ] Verify no duplicate installations

### 4.3 Set Up Development Scripts
- [ ] Create root `dev` script for parallel development
- [ ] Set up `build` script for all packages
- [ ] Create `lint` script for code quality
- [ ] Set up `test` script (if needed)
- [ ] Create `clean` script for maintenance
- [ ] Test all development scripts

## Phase 5: Testing and Validation

### 5.1 Test Design System
- [ ] Verify all components render correctly
- [ ] Test theme switching functionality
- [ ] Validate CSS variables and styling
- [ ] Test component variants and props
- [ ] Verify TypeScript types work correctly
- [ ] Test component exports and imports
- [ ] **NEW: Test consolidated CSS file loads correctly**

### 5.2 Test Application Integration
- [ ] Test design system imports in app-1
- [ ] Verify CSS loading in application
- [ ] Test component usage in application
- [ ] Validate theme integration
- [ ] Test hot reloading during development
- [ ] Verify build process for production
- [ ] **NEW: Test single CSS file import works**

### 5.3 Performance Testing
- [ ] Test build times for development
- [ ] Verify bundle sizes are reasonable
- [ ] Test development server startup time
- [ ] Validate memory usage during development
- [ ] Test production build process
- [ ] Verify no performance regressions
- [ ] **NEW: Test CSS file size and loading performance**

## Phase 6: Documentation and Cleanup

### 6.1 Update Documentation
- [ ] Create monorepo README with setup instructions
- [ ] Update design system documentation
- [ ] Create development workflow guide
- [ ] Document package structure and relationships
- [ ] Create troubleshooting guide
- [ ] Update theme usage documentation
- [ ] **NEW: Document CSS consolidation and single file approach**

### 6.2 Clean Up and Optimize
- [ ] Remove unused dependencies
- [ ] Optimize build configurations
- [ ] Clean up file structure
- [ ] Remove backup files and temporary code
- [ ] Optimize TypeScript configurations
- [ ] Finalize git ignore rules
- [ ] **NEW: Remove old component CSS files**
- [ ] **NEW: Clean up any remaining @import references**

### 6.3 Final Validation
- [ ] Run full test suite (if applicable)
- [ ] Verify all development workflows
- [ ] Test production builds
- [ ] Validate deployment process
- [ ] Create final backup of working setup
- [ ] Document any remaining issues or TODOs
- [ ] **NEW: Verify no CSS import errors anywhere**

## Phase 7: Future Planning

### 7.1 Plan for Additional Apps
- [ ] Document process for adding new applications
- [ ] Create templates for new app packages
- [ ] Plan for shared configurations
- [ ] Consider shared testing setup
- [ ] Plan for deployment strategies
- [ ] Consider CI/CD pipeline setup
- [ ] **NEW: Document CSS sharing strategy between apps**

### 7.2 Production Readiness
- [ ] Plan for publishing design system to npm
- [ ] Consider versioning strategy
- [ ] Plan for breaking changes
- [ ] Consider documentation hosting
- [ ] Plan for component storybook
- [ ] Consider automated testing
- [ ] **NEW: Plan for CSS distribution strategy**

## Success Criteria

### Development Workflow
- [ ] Changes to design system immediately reflect in applications
- [ ] No publishing/installing required during development
- [ ] Fast build times (< 5 seconds for incremental builds)
- [ ] Hot reloading works for both design system and applications
- [ ] TypeScript errors caught across all packages

### CSS and Styling
- [ ] **NEW: Single CSS file with no @import statements**
- [ ] **NEW: All component variables consolidated and organized**
- [ ] No CSS import errors
- [ ] Theme switching works correctly
- [ ] All component styles render properly
- [ ] CSS variables work in both light and dark modes
- [ ] No styling conflicts between packages
- [ ] **NEW: CSS file loads efficiently and quickly**

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] Proper type safety across packages
- [ ] Clean import/export structure
- [ ] Consistent code formatting
- [ ] No duplicate dependencies
- [ ] **NEW: Clean CSS organization with clear sections**

## Risk Mitigation

### Backup Strategy
- [ ] Keep original project backup until migration is complete
- [ ] Create intermediate backups at major milestones
- [ ] Document rollback procedures
- [ ] Test backup restoration process
- [ ] **NEW: Backup original CSS files before consolidation**

### Fallback Plan
- [ ] If monorepo setup fails, can revert to original structure
- [ ] Keep original project functional during migration
- [ ] Document alternative approaches if needed
- [ ] Maintain ability to publish from original structure
- [ ] **NEW: If CSS consolidation fails, can revert to component CSS files**

## Timeline Estimate

- **Phase 1-2**: 1-2 days (setup and structure)
- **Phase 3**: 2-3 days (migration and **CSS consolidation**)
- **Phase 4**: 1-2 days (workflow setup)
- **Phase 5**: 1 day (testing and validation)
- **Phase 6**: 1 day (documentation and cleanup)
- **Phase 7**: Ongoing (future planning)

**Total Estimated Time**: 6-9 days

## Notes

- This plan assumes starting fresh with a new monorepo structure
- **CSS consolidation is a critical step that will solve all import issues**
- The goal is to enable rapid development without publishing cycles
- All current functionality should be preserved or improved
- The new structure should be production-ready when complete
- **Following shadcn-style approach with single CSS file**
- **No more component CSS files - everything in one place** 