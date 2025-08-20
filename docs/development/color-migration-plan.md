# Color System Migration Plan

## Overview

This document outlines the step-by-step process for migrating the Float Prototype Library color system from the current mixed HSL/Hex approach to a consistent hex+RGBA system. This migration will improve maintainability, consistency, and developer experience.

## Migration Goals

- [ ] Establish consistent hex+RGBA color format
- [ ] Migrate semantic colors (text, border, background) to new system
- [ ] Update Tailwind configuration to use new color tokens
- [ ] Ensure all components work with new color system
- [ ] Remove legacy color inconsistencies

## Pre-Migration Checklist

- [ ] Backup current color system
- [ ] Identify all color usage across components
- [ ] Set up testing environment with Playwright
- [ ] Create rollback plan

## Phase 1: Semantic Color Migration

### Task 1.1: Audit Current Semantic Colors

- [ ] Review `src/themes/theme.css` for all semantic color definitions
- [ ] Document current opacity values and usage patterns
- [ ] Identify which colors need transparency support
- [ ] Create mapping of old to new color names

**Files to modify:**

- `src/themes/theme.css`
- `tailwind.config.js`

### Task 1.2: Convert Foundational Colors to Hex

- [ ] Convert all `--color-*` variables to hex format
- [ ] Ensure color values match design system specifications
- [ ] Test color accuracy in browser dev tools

**Example conversion:**

```css
/* Before */
--color-brand-700: #4a49a6;

/* After (same, but ensure hex format) */
--color-brand-700: #4a49a6;
```

### Task 1.3: Convert Semantic Colors to RGBA

- [ ] Convert text colors to RGBA with appropriate opacity
- [ ] Convert border colors to RGBA with appropriate opacity
- [ ] Convert background colors to RGBA where transparency is needed
- [ ] Document opacity values for future reference

**Example conversion:**

```css
/* Before */
--text-primary: #1a1a1e;

/* After */
--text-primary: rgba(26, 26, 30, 0.87);
```

### Task 1.4: Update Tailwind Configuration

- [ ] Update `tailwind.config.js` to reference new RGBA values
- [ ] Ensure all semantic color mappings are correct
- [ ] Test that Tailwind classes generate correctly

**Example update:**

```javascript
// Before
text: {
  primary: 'var(--text-primary)',
}

// After
text: {
  primary: 'rgba(26, 26, 30, 0.87)',
}
```

## Phase 2: Component Testing

### Task 2.1: Set Up Playwright Testing

- [ ] Install Playwright if not already installed
- [ ] Create test suite for color system validation
- [ ] Set up visual regression testing for color changes
- [ ] Create test scenarios for light/dark theme switching

**Test files to create:**

- `tests/color-system.spec.ts`
- `tests/theme-switching.spec.ts`

### Task 2.2: Test Semantic Color Changes

- [ ] Test all text colors render with correct opacity
- [ ] Test all border colors render with correct opacity
- [ ] Test all background colors render correctly
- [ ] Verify colors work in both light and dark themes

**Test scenarios:**

```typescript
test('semantic text colors render with correct opacity', async ({ page }) => {
  await page.goto('/test-colors');

  // Test primary text opacity
  const primaryText = page.locator('.text-primary');
  await expect(primaryText).toHaveCSS('color', 'rgba(26, 26, 30, 0.87)');
});
```

### Task 2.3: Test Component Integration

- [ ] Test Button component with new color system
- [ ] Test Card component with new color system
- [ ] Test Input components with new color system
- [ ] Test Dropdown components with new color system

### Task 2.4: Visual Regression Testing

- [ ] Capture baseline screenshots of all components
- [ ] Run tests after color changes
- [ ] Compare before/after screenshots
- [ ] Document any visual differences

## Phase 3: Cleanup and Validation

### Task 3.1: Remove Legacy Color References

- [ ] Search for any remaining HSL color references
- [ ] Remove unused color variables
- [ ] Clean up duplicate color definitions
- [ ] Update documentation to reflect new system

### Task 3.2: Validate Color Consistency

- [ ] Ensure all components use semantic color classes
- [ ] Verify no hardcoded color values remain
- [ ] Check that color system works across all themes
- [ ] Validate accessibility compliance

### Task 3.3: Update Documentation

- [ ] Update component development guidelines
- [ ] Document new color system architecture
- [ ] Create color reference guide for developers
- [ ] Update design system documentation

## Testing Checklist

### Visual Testing

- [ ] All text colors render with correct opacity
- [ ] All border colors render with correct opacity
- [ ] All background colors render correctly
- [ ] Colors work in both light and dark themes
- [ ] No visual regressions in component appearance

### Functional Testing

- [ ] All components render without errors
- [ ] Theme switching works correctly
- [ ] Color classes generate correct CSS
- [ ] No console errors related to color variables

### Accessibility Testing

- [ ] Color contrast meets WCAG AA standards
- [ ] Colors are distinguishable for colorblind users
- [ ] Focus indicators are clearly visible
- [ ] Text remains readable in all color combinations

## Rollback Plan

### If Issues Arise

1. **Immediate rollback**: Restore backup of color system
2. **Investigate**: Identify specific color causing issues
3. **Fix incrementally**: Address one color at a time
4. **Test thoroughly**: Ensure fixes don't introduce new issues

### Rollback Commands

```bash
# Restore backup files
git checkout HEAD~1 -- src/themes/theme.css
git checkout HEAD~1 -- tailwind.config.js

# Rebuild and test
npm run build
npm run test:colors
```

## Post-Migration Tasks

### Task 4.1: Performance Validation

- [ ] Measure CSS bundle size impact
- [ ] Test color rendering performance
- [ ] Validate no performance regressions

### Task 4.2: Team Training

- [ ] Document new color system usage
- [ ] Create examples for common color patterns
- [ ] Train team on new color conventions

### Task 4.3: Future Planning

- [ ] Plan migration of component-specific colors
- [ ] Consider automation for color validation
- [ ] Plan for future color system enhancements

## Success Criteria

The migration is considered successful when:

- [ ] All semantic colors use consistent hex+RGBA format
- [ ] All components render correctly with new colors
- [ ] No visual regressions occur
- [ ] Color system is more maintainable
- [ ] Team can easily work with new color conventions

## Notes

- **Take incremental approach**: Test each color change individually
- **Document everything**: Keep detailed notes of all changes made
- **Test thoroughly**: Don't assume colors will work as expected
- **Ask for help**: If unsure about any color values, consult design team

## File Locations

### Primary Files to Modify

- `src/themes/theme.css` - Main color definitions
- `tailwind.config.js` - Tailwind color configuration
- `src/app/globals.css` - Component-specific color variables

### Test Files to Create

- `tests/color-system.spec.ts` - Color system validation tests
- `tests/theme-switching.spec.ts` - Theme switching tests

### Documentation Files to Update

- `docs/design-system/components.md` - Component development guidelines
- `docs/development/workflow.md` - Development workflow documentation

## Timeline Estimate

- **Phase 1**: 2-3 days (semantic color migration)
- **Phase 2**: 1-2 days (testing and validation)
- **Phase 3**: 1 day (cleanup and documentation)
- **Total**: 4-6 days for complete migration

## Risk Assessment

### Low Risk

- Foundational color conversions (hex to hex)
- Documentation updates

### Medium Risk

- Semantic color opacity changes
- Tailwind configuration updates

### High Risk

- Component integration testing
- Visual regression validation

## Support and Resources

- **Design Team**: Consult for color accuracy and opacity values
- **QA Team**: Help with testing and validation
- **Documentation**: Reference existing component examples
- **Git History**: Use for rollback if needed

---

**Remember**: This migration affects the entire design system. Take your time, test thoroughly, and don't hesitate to ask for help if anything is unclear.
