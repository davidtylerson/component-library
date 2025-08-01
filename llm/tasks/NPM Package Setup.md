# Design System NPM Package Setup

## Overview
Convert the existing design system (`@davidtylerson/component-library`) into a publishable npm package that can be imported into the email template project.

## Prerequisites
- [x] Node.js v16+ installed
- [ ] npm account with publish permissions (IN PROGRESS - User creating account)
- [x] Access to the design system repository
- [x] Git repository cloned locally

## Phase 1: Prepare Design System for Publishing

### 1.1 Update Package Configuration
- [x] Navigate to design system directory: `cd component-library`
- [x] Update `package.json` with proper npm package configuration:
  ```json
  {
    "name": "@float/design-system",
    "version": "1.0.0",
    "description": "Float Design System with email components",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "exports": {
      ".": {
        "import": "./dist/index.js",
        "types": "./dist/index.d.ts"
      },
      "./email": {
        "import": "./dist/email/index.js",
        "types": "./dist/email/index.d.ts"
      }
    },
    "files": ["dist"],
    "keywords": ["design-system", "components", "email", "react"],
    "author": "Float Technologies",
    "license": "ISC"
  }
  ```

### 1.2 Create TypeScript Build Configuration
- [x] Create `tsconfig.build.json` for production builds:
  ```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "outDir": "./dist",
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "removeComments": false
    },
    "exclude": [
      "node_modules",
      "dist",
      "src/app",
      "src/stories",
      ".storybook",
      "docs"
    ]
  }
  ```

### 1.3 Create Email-Specific TypeScript Config
- [x] Create `tsconfig.email.json` for email components:
  ```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "outDir": "./dist/email",
      "rootDir": "./src/components/email",
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true
    },
    "include": ["src/components/email/**/*"],
    "exclude": ["node_modules", "dist", "src/app", "src/stories"]
  }
  ```

### 1.4 Update Build Scripts
- [x] Add build scripts to `package.json`:
  ```json
  {
    "scripts": {
      "build": "tsc --project tsconfig.build.json",
      "build:email": "tsc --project tsconfig.email.json",
      "build:all": "npm run build && npm run build:email",
      "prepublishOnly": "npm run build:all",
      "clean": "rm -rf dist",
      "dev": "npm run build:all -- --watch"
    }
  }
  ```

## Phase 2: Create Email-Compatible Components

### 2.1 Create Email Components Directory
- [x] Create directory structure: `mkdir -p src/components/email`
- [x] Create email component index file: `touch src/components/email/index.ts`

### 2.2 Create Email Button Component
- [x] Create `src/components/email/button.tsx`:
  ```typescript
  import React from 'react';

  interface EmailButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    href?: string;
    style?: React.CSSProperties;
    fullWidth?: boolean;
  }

  export const EmailButton: React.FC<EmailButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    href,
    style,
    fullWidth = false,
    ...props
  }) => {
    // Convert design system colors to inline styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: '#4A49A6',
            color: '#ffffff',
            border: '1px solid #4A49A6',
          };
        case 'secondary':
          return {
            backgroundColor: '#f8f9fa',
            color: '#4A49A6',
            border: '1px solid #dee2e6',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: '#4A49A6',
            border: '1px solid transparent',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: '#4A49A6',
            border: '1px solid #4A49A6',
          };
        case 'destructive':
          return {
            backgroundColor: '#dc3545',
            color: '#ffffff',
            border: '1px solid #dc3545',
          };
        default:
          return {
            backgroundColor: '#4A49A6',
            color: '#ffffff',
            border: '1px solid #4A49A6',
          };
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return {
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '4px',
          };
        case 'lg':
          return {
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '6px',
          };
        default:
          return {
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '4px',
          };
      }
    };

    const baseStyles = {
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center' as const,
      fontWeight: '500',
      cursor: 'pointer',
      width: fullWidth ? '100%' : 'auto',
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    if (href) {
      return (
        <a href={href} style={baseStyles} {...props}>
          {children}
        </a>
      );
    }

    return (
      <button style={baseStyles} {...props}>
        {children}
      </button>
    );
  };
  ```

### 2.3 Create Email Typography Components
- [x] Create `src/components/email/typography.tsx`:
  ```typescript
  import React from 'react';

  interface EmailTextProps {
    children: React.ReactNode;
    variant?: 'body' | 'heading' | 'caption' | 'lead' | 'muted';
    style?: React.CSSProperties;
  }

  export const EmailText: React.FC<EmailTextProps> = ({ 
    children, 
    variant = 'body', 
    style 
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'heading':
          return {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1A1A1E',
            margin: '0 0 16px 0',
            lineHeight: '1.2',
          };
        case 'lead':
          return {
            fontSize: '16px',
            color: '#1A1A1E',
            margin: '0 0 12px 0',
            lineHeight: '1.5',
          };
        case 'caption':
          return {
            fontSize: '12px',
            color: '#6B7280',
            margin: '0 0 8px 0',
            lineHeight: '1.4',
          };
        case 'muted':
          return {
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 12px 0',
            lineHeight: '1.5',
          };
        default:
          return {
            fontSize: '14px',
            color: '#1A1A1E',
            margin: '0 0 12px 0',
            lineHeight: '1.5',
          };
      }
    };

    return (
      <div style={{ ...getVariantStyles(), ...style }}>
        {children}
      </div>
    );
  };

  export const EmailHeading: React.FC<EmailTextProps> = (props) => (
    <EmailText variant="heading" {...props} />
  );

  export const EmailCaption: React.FC<EmailTextProps> = (props) => (
    <EmailText variant="caption" {...props} />
  );

  export const EmailMuted: React.FC<EmailTextProps> = (props) => (
    <EmailText variant="muted" {...props} />
  );
  ```

### 2.4 Create Email Layout Components
- [x] Create `src/components/email/layout.tsx`:
  ```typescript
  import React from 'react';

  interface EmailLayoutProps {
    children: React.ReactNode;
    preheader?: string;
  }

  export const EmailLayout: React.FC<EmailLayoutProps> = ({ 
    children, 
    preheader 
  }) => (
    <>
      {preheader && (
        <div style={{
          color: 'transparent',
          display: 'none',
          height: '0',
          maxHeight: '0',
          maxWidth: '0',
          opacity: '0',
          overflow: 'hidden',
          visibility: 'hidden',
          width: '0',
        }}>
          {preheader}
        </div>
      )}
      <div style={{
        backgroundColor: '#F4F4F5',
        fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.3',
        margin: '0',
        padding: '0',
      }}>
        {children}
      </div>
    </>
  );

  interface EmailContainerProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }

  export const EmailContainer: React.FC<EmailContainerProps> = ({
    children,
    style
  }) => (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#ffffff',
      border: '1px solid #eaebed',
      borderRadius: '16px',
      ...style
    }}>
      {children}
    </div>
  );

  interface EmailHeaderProps {
    logoUrl?: string;
    logoAlt?: string;
    logoWidth?: string;
    logoHeight?: string;
  }

  export const EmailHeader: React.FC<EmailHeaderProps> = ({
    logoUrl = "http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png",
    logoAlt = "Float",
    logoWidth = "100px",
    logoHeight = "auto"
  }) => {
    return (
      <div style={{
        width: '100px',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <a href="https://float.tech" style={{ 
          color: '#4A49A6', 
          fontWeight: 'bold', 
          textDecoration: 'none'
        }}>
          <img
            src={logoUrl}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            style={{
              display: 'block',
              margin: '0 auto',
              border: '0',
              outline: 'none',
              textDecoration: 'none',
              height: 'auto',
              maxWidth: '200px',
              width: '100%',
            }}
          />
        </a>
      </div>
    );
  };

  interface EmailFooterProps {
    children?: React.ReactNode;
  }

  export const EmailFooter: React.FC<EmailFooterProps> = ({ children }) => (
    <div style={{
      clear: 'both',
      paddingTop: '24px',
      textAlign: 'center',
      width: '100%',
    }}>
      {children || (
        <>
          <p style={{
            color: '#9a9ea6',
            fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'normal',
            margin: '0',
            marginBottom: '16px',
            paddingBottom: '0px',
            textAlign: 'center',
          }}>
            Float helps financial institutions interact seamlessly through shared digital workflows and standardized APIs across the transaction lifecycle.{' '}
            <a href="https://float.tech" style={{
              color: '#4A49A6',
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '0px',
              textAlign: 'center',
              textDecoration: 'underline',
            }}>
              Learn more
            </a>.
          </p>
          <a href="https://float.tech" style={{
            color: '#4A49A6',
            fontSize: '14px',
            fontWeight: 'bold',
            paddingBottom: '0px',
            textAlign: 'center',
            textDecoration: 'underline',
          }}>
            <img src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/6a3db2b3-d35b-423f-8aac-830de81fb114/32x32.png" 
                 alt="Float Logo" 
                 width="32" 
                 height="32" 
                 style={{
                   display: 'inline-block',
                   marginBottom: '16px',
                 }} />
          </a>
          <div style={{
            color: '#9a9ea6',
            fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
            fontSize: '14px',
            paddingBottom: '0px',
          }}>
            <div>Float Technologies Inc.</div>
            <div>SoHo, New York</div>
          </div>
        </>
      )}
    </div>
  );
  ```

### 2.5 Create Email Component Index
- [x] Update `src/components/email/index.ts`:
  ```typescript
  // Email-compatible components
  export { EmailButton } from './button';
  export { EmailText, EmailHeading, EmailCaption, EmailMuted } from './typography';
  export { EmailLayout, EmailContainer, EmailHeader, EmailFooter } from './layout';

  // Re-export for convenience
  export type { EmailButtonProps } from './button';
  export type { EmailTextProps } from './typography';
  export type { EmailLayoutProps, EmailContainerProps, EmailHeaderProps, EmailFooterProps } from './layout';
  ```

### 2.6 Update Main Component Index
- [x] Update `src/components/ui/index.ts` to include email exports:
  ```typescript
  // Main UI components
  export * from './button';
  export * from './dropdown-menu/dropdown-menu';
  export * from '../typography/heading'; 
  export * from '../typography/text';
  export * from './toggle';
  export * from './toggle-group';
  export * from './slider';
  export * from './popover';
  export * from './hover-card';
  export * from './sheet';
  export * from './command';
  export * from './collapsible';
  export * from './context-menu';

  // Email components
  export * from '../email';
  ```

## Phase 3: Build and Test

### 3.1 Clean Previous Builds
- [x] Run: `npm run clean`
- [x] Verify `dist/` directory is removed

### 3.2 Build Components
- [x] Run: `npm run build:all`
- [x] Verify `dist/` directory is created with:
  - [x] `dist/index.js` (main components)
  - [x] `dist/index.d.ts` (main types)
  - [x] `dist/email/index.js` (email components)
  - [x] `dist/email/index.d.ts` (email types)

### 3.3 Test Build Output
- [x] Check that all components are properly exported
- [x] Verify TypeScript declarations are generated
- [x] Test import statements work correctly

## Phase 4: Publish to NPM

### 4.1 Prepare for Publishing
- [x] Login to npm: `npm login` (COMPLETED)
- [x] Verify package name is available: `npm view @float/design-system`
- [x] Check package.json for correct configuration

### 4.2 Publish Package
- [x] Run: `npm publish --access public` (PUBLISHED AS @tydavidson/design-system@1.0.5)
- [x] Verify package is published: `npm view @tydavidson/design-system`
- [x] Check package contents: `npm pack --dry-run`

### 4.3 Verify Installation
- [x] Create test directory: `mkdir test-install && cd test-install`
- [x] Initialize npm: `npm init -y`
- [x] Install package: `npm install @tydavidson/design-system`
- [x] Test imports:
  ```typescript
  import { Button } from '@tydavidson/design-system';
  import { EmailButton } from '@tydavidson/design-system/email';
  ```

## Phase 5: Integration with Email Project

### 5.1 Install in Email Project
- [ ] Navigate to email project: `cd ../float-resources`
- [ ] Install design system: `npm install @float/design-system`
- [ ] Verify installation in `package.json`

### 5.2 Update Email Templates
- [ ] Update `emails/Welcome.tsx` to use design system:
  ```typescript
  import { 
    EmailLayout, 
    EmailText, 
    EmailButton, 
    EmailContainer,
    EmailHeader,
    EmailFooter
  } from '@float/design-system/email';
  ```

### 5.3 Test Integration
- [ ] Run: `npm run dev`
- [ ] Verify templates render correctly
- [ ] Run: `npm run build:react-email`
- [ ] Run: `npm run export`
- [ ] Check exported HTML for proper styling

## Phase 6: Documentation and Maintenance

### 6.1 Update README
- [ ] Add installation instructions
- [ ] Add usage examples for both web and email components
- [ ] Document available components and props
- [ ] Add troubleshooting section

### 6.2 Create CHANGELOG
- [ ] Create `CHANGELOG.md`
- [ ] Document initial release
- [ ] Add versioning guidelines

### 6.3 Set Up CI/CD (Optional)
- [ ] Configure GitHub Actions for automated publishing
- [ ] Set up automated testing
- [ ] Configure semantic versioning

## Update Workflow

### Making Changes to Design System
- [ ] Make changes to components
- [ ] Run: `npm run build:all`
- [ ] Test locally: `npm link`
- [ ] Test in email project: `npm link @float/design-system`
- [ ] Publish: `npm version patch && npm publish`
- [ ] Update email project: `npm update @float/design-system`

### Version Management
- [ ] Use semantic versioning (patch/minor/major)
- [ ] Update CHANGELOG.md for each release
- [ ] Tag releases in Git
- [ ] Notify team of breaking changes

## Troubleshooting

### Common Issues
- [ ] **Build fails**: Check TypeScript configuration
- [ ] **Import errors**: Verify exports in index files
- [ ] **Publish fails**: Check npm login and package name
- [ ] **Installation fails**: Verify package.json configuration

### Verification Checklist
- [ ] All components build successfully
- [ ] TypeScript declarations are generated
- [ ] Package publishes to npm
- [ ] Package installs correctly
- [ ] Components import without errors
- [ ] Email templates render properly
- [ ] Exported HTML has correct styling

## Success Criteria
- [ ] Design system is published as `@float/design-system`
- [ ] Email components are available via `@float/design-system/email`
- [ ] Email templates successfully use design system components
- [ ] Build process works consistently
- [ ] Update workflow is documented and tested
- [ ] Team can install and use the package

## Next Steps After Setup
1. Create additional email components (Card, DataTable, etc.)
2. Add Storybook stories for email components
3. Set up automated testing
4. Create design tokens for consistent styling
5. Build email rendering application with JSON data binding 