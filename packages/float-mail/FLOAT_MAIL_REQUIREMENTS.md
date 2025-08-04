# Float Mail Integration Plan

## Overview

This document outlines the plan to integrate the existing email-renderer package functionality into the float-mail application, creating a comprehensive email template builder with React Email support, real-time preview, and code editing capabilities.

## Current State Analysis

### Email Renderer Package Assets

The email-renderer package contains a comprehensive email template system with the following components:

#### 1. **Email Templates** (`src/templates/`)
- **8 Professional Templates**: Welcome, PasswordReset, DisputeConfirm, ReturnConfirmSimple, Affirmation, DisputeMultiple, ReturnConfirmTable, EmailComponents
- **React Email Integration**: All templates use `@react-email/components` for email compatibility
- **Float Branding**: Templates include Float logos and branding elements
- **SendGrid Integration**: Templates use SendGrid CDN for hosted images
- **TypeScript Support**: Full type definitions for template props

#### 2. **React Email Component Library** (`src/react-email-src/components/`)
- **Layout Components**: EmailLayout, Container, Header, Footer
- **Typography Components**: Typography, PageTitle, BodyText, Callout
- **Data Display**: DataTable, GroupedDataTable for structured data
- **Interactive Elements**: Button, Link components
- **Spacing Utilities**: Spacer, Spacing components for layout control
- **Documentation**: Comprehensive README with component usage examples

#### 3. **Template Rendering System** (`src/lib/`)
- **TemplateRenderer Class**: Renders React components to production-ready HTML
- **TemplateLoader Class**: Manages template metadata and sample data
- **Source Code Storage**: Stores template source code for display
- **HTML Compilation**: Converts React Email components to inline CSS HTML
- **Variable Preservation**: Maintains template variables for personalization

#### 4. **SendGrid Export Tool** (`src/components/SendGridExport.tsx`)
- **Production Export**: Converts templates to SendGrid-compatible format
- **JSON Export**: Downloads template as JSON with HTML content
- **Variable Mapping**: Preserves template variables for SendGrid integration
- **HTML Copy**: Allows copying compiled HTML to clipboard
- **Template Metadata**: Includes subject lines and content statistics

#### 5. **Template Types & Data** (`src/types/`, `src/react-email-src/data/`)
- **TypeScript Interfaces**: Complete type definitions for all templates
- **Sample Data**: Realistic data sets for testing each template
- **Template Metadata**: Information about template requirements and variables
- **Validation Schemas**: Data validation for template inputs

#### 6. **Development Tools**
- **Template Preview**: Real-time preview of email templates
- **JSON Editor**: Monaco Editor for template data editing
- **Template Selection**: Interface for choosing different templates
- **Export Options**: Multiple export formats (HTML, SendGrid JSON)

### Current Float Mail Application

- Basic layout with sidebar navigation
- Monaco Editor for JSON data editing
- Design system integration
- Template selection interface

## Integration Plan

### Phase 1: Template Integration

#### 1.1 Import Email Templates
- **Task**: Copy all email templates and components from email-renderer to float-mail
- **Location**: `packages/float-mail/src/templates/`
- **Files to copy**:
  - **8 Template Files**: `src/templates/Welcome.tsx`, `PasswordReset.tsx`, `DisputeConfirm.tsx`, `ReturnConfirmSimple.tsx`, `Affirmation.tsx`, `DisputeMultiple.tsx`, `ReturnConfirmTable.tsx`, `EmailComponents.tsx`
  - **Component Library**: `src/react-email-src/components/` (all 15+ components)
  - **Type Definitions**: `src/types/` and `src/react-email-src/types/`
  - **Sample Data**: `src/react-email-src/data/sampleData.ts`

#### 1.2 Template Rendering System
- **Task**: Integrate the complete template rendering system from email-renderer
- **Location**: `packages/float-mail/src/lib/`
- **Components**:
  - `TemplateRenderer` - Renders React components to production-ready HTML with inline CSS
  - `TemplateLoader` - Manages template metadata, sample data, and validation
  - Source code storage for displaying template code
  - HTML compilation with variable preservation

#### 1.3 Template Selection
- **Task**: Update sidebar to show the 8 real email templates from email-renderer
- **Current**: Template 1, Template 2, Template 3 (placeholders)
- **Target**: Welcome, PasswordReset, DisputeConfirm, ReturnConfirmSimple, Affirmation, DisputeMultiple, ReturnConfirmTable, EmailComponents
- **Implementation**: Use TemplateLoader.getAvailableTemplates() to populate sidebar

### Phase 2: React/HTML Toggle Implementation

#### 2.1 Code Viewer Selection
**Recommendation**: Use Monaco Editor for code viewing

**Options Considered**:
1. **Monaco Editor** (Recommended)
   - Pros: Already integrated, syntax highlighting, read-only mode
   - Cons: Large bundle size
   
2. **CodeMirror**
   - Pros: Lighter weight, good syntax highlighting
   - Cons: Additional dependency
   
3. **Custom implementation**
   - Pros: Full control
   - Cons: Time-consuming, maintenance overhead

**Decision**: Use Monaco Editor in read-only mode for code viewing

#### 2.2 Template Source Code
- **Task**: Extract and display template source code
- **Implementation**: 
  - Store template source code in TemplateRenderer
  - Display React component code when "React" is selected
  - Display compiled HTML when "HTML" is selected
  - Use Monaco Editor with appropriate language mode

#### 2.3 Toggle Functionality
- **Task**: Implement React/HTML toggle
- **Current State**: Toggle exists but doesn't change content
- **Implementation**:
  - React mode: Show template component source code
  - HTML mode: Show compiled HTML output
  - Update Monaco Editor language mode (typescript vs html)

### Phase 3: Preview/Code Toggle Implementation

#### 3.1 Email Preview
- **Task**: Display rendered email preview
- **Implementation**:
  - Use TemplateRenderer.renderTemplate() to generate HTML
  - Display in iframe or div with email-specific styling
  - Ensure email styling is preserved (no CSS conflicts)

#### 3.2 Code Display
- **Task**: Show template code based on React/HTML selection
- **Implementation**:
  - React mode: Show TypeScript/JSX source code
  - HTML mode: Show compiled HTML with inline CSS
  - Use Monaco Editor with syntax highlighting

### Phase 4: JSON Editor Enhancement

#### 4.1 Editor Selection
**Recommendation**: Use Monaco Editor for JSON editing

**Current State**: Monaco Editor is already integrated
**Enhancements Needed**:
- JSON validation with template schema
- Auto-completion based on template variables
- Error highlighting for invalid JSON
- Sample data loading

#### 4.2 JSON Validation
- **Task**: Validate JSON against template requirements
- **Implementation**:
  - Use TemplateLoader.validateData()
  - Show validation errors in Monaco Editor
  - Highlight missing required fields
  - Auto-complete based on template variables

#### 4.3 Sample Data Integration
- **Task**: Load and display sample data for templates
- **Implementation**:
  - Use TemplateLoader.getSampleData()
  - Pre-populate JSON editor with sample data
  - Allow reset to sample data
  - Save/load custom data sets

### Phase 5: Email Styling Preservation

#### 5.1 CSS Isolation
- **Task**: Ensure email styling doesn't conflict with app styling
- **Implementation**:
  - Use iframe for email preview
  - Or use CSS isolation techniques
  - Preserve inline CSS from React Email
  - Maintain email client compatibility

#### 5.2 Responsive Design
- **Task**: Ensure email preview is responsive
- **Implementation**:
  - Mobile preview mode
  - Desktop preview mode
  - Email client simulation
  - Viewport controls

## Technical Implementation Details

### File Structure

```
packages/float-mail/src/
├── templates/                    # Email templates
│   ├── Welcome.tsx
│   ├── PasswordReset.tsx
│   ├── DisputeConfirm.tsx
│   └── ...
├── lib/                         # Core functionality
│   ├── template-renderer.ts     # Template rendering
│   ├── template-loader.ts       # Template management
│   └── template-validator.ts    # Data validation
├── components/                  # UI components
│   ├── EmailPreview.tsx         # Email preview component
│   ├── CodeViewer.tsx           # Code display component
│   ├── JsonEditor.tsx           # Enhanced JSON editor
│   └── TemplateSelector.tsx     # Template selection
├── types/                       # TypeScript definitions
│   ├── template-types.ts        # Template interfaces
│   └── email-types.ts           # Email-specific types
└── utils/                       # Utilities
    ├── sample-data.ts           # Sample data
    └── email-utils.ts           # Email utilities
```

### Key Components

#### EmailPreview Component
```typescript
interface EmailPreviewProps {
  templateName: string;
  data: TemplateData;
  viewMode: 'desktop' | 'mobile';
}
```

#### CodeViewer Component
```typescript
interface CodeViewerProps {
  templateName: string;
  codeType: 'react' | 'html';
  language: 'typescript' | 'html';
}
```

#### JsonEditor Component
```typescript
interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  templateName: string;
  validation: ValidationResult;
}
```

### State Management

```typescript
interface FloatMailState {
  selectedTemplate: string;
  templateData: TemplateData;
  viewMode: 'react' | 'html';
  displayMode: 'preview' | 'code';
  jsonData: string;
  validation: ValidationResult;
  isLoading: boolean;
}
```

## Open Questions

### 1. Code Editor Selection
**Question**: Should we use Monaco Editor for both JSON editing and code viewing, or use different editors for different purposes?

**Options**:
- Monaco Editor for both (current approach)
- Monaco for JSON, CodeMirror for code viewing
- Monaco for JSON, simple pre/code for code viewing

**Recommendation**: Use Monaco Editor for both with appropriate configurations

### 2. Email Preview Implementation
**Question**: How should we implement the email preview to ensure styling isolation?

**Options**:
- iframe with sandboxed content
- CSS isolation with scoped styles
- Shadow DOM implementation
- Separate preview window

**Recommendation**: Use iframe for complete isolation

### 3. Template Source Code Management
**Question**: How should we manage and display template source code?

**Options**:
- Store source code as strings in TemplateRenderer
- Dynamically extract from actual component files
- Use AST parsing to generate readable code
- Maintain separate source files

**Recommendation**: Store source code as strings for simplicity

### 4. Data Validation Strategy
**Question**: How comprehensive should the JSON validation be?

**Options**:
- Basic required field validation
- Type checking and format validation
- Real-time validation with error highlighting
- Schema-based validation with JSON Schema

**Recommendation**: Start with basic validation, enhance over time

### 5. Performance Considerations
**Question**: How should we handle large templates and frequent re-rendering?

**Options**:
- Debounced rendering
- Lazy loading of templates
- Caching rendered results
- Virtual scrolling for large emails

**Recommendation**: Implement debounced rendering and caching

### 6. Export Functionality
**Question**: What export formats should we support?

**Options**:
- HTML export only
- HTML + plain text
- SendGrid export (already built in email-renderer)
- Multiple email service exports

**Recommendation**: Use the existing SendGrid export tool from email-renderer, which is already production-ready

## Detailed Implementation Tasks

### Task 1: Template Integration

#### 1.1 Copy Email Templates
**Objective**: Transfer all email templates and components from email-renderer to float-mail
**Source**: `packages/email-renderer/src/`
**Destination**: `packages/float-mail/src/templates/`

**Required Actions**:
- Copy all 8 template files from email-renderer templates directory
- Copy the complete React Email component library (15+ components)
- Copy TypeScript interface files for template props
- Copy sample data files with realistic test data
- Update import paths in copied files to match new structure
- Ensure all React Email component imports are preserved
- Preserve SendGrid CDN image references

**Files to Transfer**:
- **8 Template Files**: Welcome.tsx, PasswordReset.tsx, DisputeConfirm.tsx, ReturnConfirmSimple.tsx, Affirmation.tsx, DisputeMultiple.tsx, ReturnConfirmTable.tsx, EmailComponents.tsx
- **Component Library**: All files from `src/react-email-src/components/` (EmailLayout, Header, Footer, DataTable, etc.)
- **Type Definitions**: All files from `src/types/` and `src/react-email-src/types/`
- **Sample Data**: `src/react-email-src/data/sampleData.ts` with comprehensive test data

#### 1.2 Integrate Template System Classes
**Objective**: Copy and adapt the complete template rendering and loading system
**Source**: `packages/email-renderer/src/lib/`
**Destination**: `packages/float-mail/src/lib/`

**Required Actions**:
- Copy `TemplateRenderer` class with all methods (including source code storage)
- Copy `TemplateLoader` class with validation logic and sample data management
- Update import paths to match new file structure
- Ensure all dependencies are properly imported
- Test that template loading and rendering works
- Preserve HTML compilation with inline CSS functionality

#### 1.3 Update Template Selection Interface
**Objective**: Replace placeholder templates with the 8 real email templates from email-renderer
**File**: `packages/float-mail/src/app/page.tsx`

**Required Actions**:
- Replace hardcoded template array with `TemplateLoader.getAvailableTemplates()`
- Update sidebar menu items to show real template names (Welcome, PasswordReset, etc.)
- Add proper template change handlers
- Load sample data when template changes
- Update template display names in the UI
- Ensure all 8 templates are available in the sidebar

### Task 2: React/HTML Toggle Implementation

#### 2.1 Template Source Code Storage
**Objective**: Store and manage template source code for display
**File**: `packages/float-mail/src/lib/template-renderer.ts`

**Required Actions**:
- Add source code storage object with all template source code
- Create method to retrieve source code by template name
- Store both React component code and compiled HTML
- Ensure source code is properly formatted and readable
- Add fallback for missing source code

#### 2.2 Code Viewer Component
**Objective**: Create component to display template source code
**File**: `packages/float-mail/src/components/CodeViewer.tsx`

**Required Actions**:
- Create new component for displaying code
- Use Monaco Editor in read-only mode
- Support TypeScript and HTML language modes
- Handle template source code retrieval
- Implement proper error handling for missing code

#### 2.3 Toggle State Management
**Objective**: Implement React/HTML toggle functionality
**File**: `packages/float-mail/src/app/page.tsx`

**Required Actions**:
- Add state for view mode (react/html)
- Add state for display mode (preview/code)
- Create toggle handlers for both modes
- Update UI to reflect current state
- Connect toggles to actual content changes

### Task 3: Preview/Code Toggle Implementation

#### 3.1 Email Preview Component
**Objective**: Create component to display rendered email preview
**File**: `packages/float-mail/src/components/EmailPreview.tsx`

**Required Actions**:
- Create component that renders email templates
- Use TemplateRenderer to generate HTML
- Display in iframe for CSS isolation
- Handle loading states and errors
- Support different view modes (desktop/mobile)

#### 3.2 Main Content Area Update
**Objective**: Update main content area to support preview/code toggle
**File**: `packages/float-mail/src/app/page.tsx`

**Required Actions**:
- Update central content area layout
- Add conditional rendering for preview vs code
- Integrate EmailPreview and CodeViewer components
- Ensure proper state management
- Handle responsive layout changes

### Task 4: JSON Editor Enhancement

#### 4.1 Enhanced JSON Editor Component
**Objective**: Improve JSON editor with validation and sample data
**File**: `packages/float-mail/src/components/JsonEditor.tsx`

**Required Actions**:
- Enhance existing Monaco Editor integration
- Add JSON validation using TemplateLoader
- Implement error highlighting and display
- Add sample data loading functionality
- Create validation error display component

#### 4.2 Template Data Integration
**Objective**: Connect JSON editor to template data system
**File**: `packages/float-mail/src/app/page.tsx`

**Required Actions**:
- Update JSON editor to use template-specific validation
- Load sample data when template changes
- Handle JSON parsing errors gracefully
- Update template data when JSON changes
- Implement auto-save functionality

### Task 5: Dependencies and Configuration

#### 5.1 Required Dependencies
**Objective**: Add all necessary dependencies for email functionality
**File**: `packages/float-mail/package.json`

**Required Actions**:
- Add React Email dependencies
- Add Monaco Editor dependency (if not already present)
- Ensure all peer dependencies are compatible
- Update package-lock or pnpm-lock files
- Test that all imports work correctly

#### 5.2 Type Definitions
**Objective**: Create proper TypeScript definitions
**File**: `packages/float-mail/src/types/template-types.ts`

**Required Actions**:
- Define TemplateData interface
- Define RenderedTemplate interface
- Define TemplateInfo interface
- Define TemplateVariable interface
- Ensure all types are properly exported

### Task 6: Integration Testing

#### 6.1 Template Loading Test
**Objective**: Verify all templates load and function correctly

**Required Actions**:
- Test template selection in sidebar
- Verify sample data loads for each template
- Test template rendering without errors
- Validate template metadata is correct
- Check that all template props are properly typed

#### 6.2 Toggle Functionality Test
**Objective**: Verify all toggle functionality works correctly

**Required Actions**:
- Test React/HTML toggle changes code display
- Test Preview/Code toggle switches views
- Verify code syntax highlighting works
- Test that toggle state persists correctly
- Ensure no errors occur during toggle

#### 6.3 JSON Editor Test
**Objective**: Verify JSON editor enhancements work correctly

**Required Actions**:
- Test JSON validation with template requirements
- Verify sample data loading works
- Test error highlighting displays correctly
- Validate auto-completion functionality
- Ensure JSON changes update template data

#### 6.4 Email Preview Test
**Objective**: Verify email preview renders correctly

**Required Actions**:
- Test email rendering in iframe
- Verify CSS isolation prevents conflicts
- Test responsive design in preview
- Validate email styling is preserved
- Check that no console errors occur

## Success Criteria

1. **Template Integration**: All email templates from email-renderer are available and functional
2. **Toggle Functionality**: React/HTML and Preview/Code toggles work correctly
3. **Code Viewing**: Template source code and compiled HTML are displayed properly
4. **JSON Editing**: Enhanced JSON editor with validation and auto-completion
5. **Email Styling**: Email preview maintains original styling without conflicts
6. **Performance**: Application responds quickly to user interactions
7. **User Experience**: Intuitive interface for template building and editing

## Risk Mitigation

1. **Styling Conflicts**: Use iframe isolation for email preview
2. **Performance Issues**: Implement debouncing and caching
3. **Bundle Size**: Consider code splitting for large templates
4. **Browser Compatibility**: Test across different browsers
5. **Email Client Compatibility**: Validate email rendering in major clients

## Next Steps

1. Review and approve this plan
2. Begin with Task 1 (Template Integration)
3. Set up development environment with email-renderer templates
4. Implement basic template loading and rendering
5. Iterate through each task with testing and validation 