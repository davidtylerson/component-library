# Float Mail - Email Template Builder Requirements & Implementation Guide

## Project Overview
Float Mail is a modern email template builder application that uses the Float Vibe Foundry design system. It allows users to create, edit, preview, and export email templates using React Email components with inline CSS for email compatibility.

## Core Architecture Requirements

### 1. Application Structure
- [ ] **Monorepo Integration**: Built as a package within the existing monorepo
- [ ] **Design System Integration**: Uses `@float-vibe-foundry/design-system` for all UI components
- [ ] **Email Template System**: Uses React Email components for template creation
- [ ] **Port Configuration**: Runs on port 3004 to avoid conflicts

### 2. Design System Compliance
- [ ] **Dark Theme Primary**: Application uses dark theme as the default
- [ ] **Component Usage**: All UI components must come from the design system package
- [ ] **CSS Variables**: Uses design system CSS variables for consistent theming
- [ ] **No Custom Styling**: Application UI should not override design system styles

## Application Shell & Layout

### 3. Main Layout Structure
- [ ] **Sidebar Navigation**: Left sidebar with navigation menu
- [ ] **Header**: Top header with branding and user controls
- [ ] **Main Content Area**: Central content area for template editing
- [ ] **Responsive Design**: Works on desktop and tablet layouts

### 4. Sidebar Components
- [ ] **Logo/Branding**: Float Mail branding in sidebar
- [ ] **Navigation Menu**: 
  - Templates
  - Components
  - Settings
  - Help/Documentation
- [ ] **Template List**: List of saved templates
- [ ] **Component Library**: Access to email components
- [ ] **Collapsible**: Sidebar can be collapsed for more space

### 5. Header Components
- [ ] **Application Title**: "Float Mail" branding
- [ ] **Theme Toggle**: Switch between light/dark themes
- [ ] **User Menu**: User profile and settings
- [ ] **Export Options**: Quick access to export functionality
- [ ] **Save/Preview**: Save and preview buttons

## Core Functionality

### 6. Template Management
- [ ] **Template Creation**: Create new email templates
- [ ] **Template Editing**: Edit existing templates
- [ ] **Template Preview**: Real-time preview of email templates
- [ ] **Template Library**: Browse and manage saved templates
- [ ] **Template Categories**: Organize templates by type/purpose

### 7. Email Component System
- [ ] **React Email Integration**: Use `@react-email/components`
- [ ] **Component Library**: Pre-built email components
- [ ] **Custom Components**: Ability to create custom components
- [ ] **Component Preview**: Preview components before adding to template
- [ ] **Component Documentation**: Help text for each component

### 8. Editor Interface
- [ ] **Monaco Editor**: JSON editor for template configuration
- [ ] **Visual Editor**: Drag-and-drop interface for template building
- [ ] **Code View**: Raw HTML/CSS view of templates
- [ ] **Split View**: Side-by-side editing and preview
- [ ] **Real-time Preview**: Live preview as you edit

### 9. Data Management
- [ ] **JSON Configuration**: Templates stored as JSON
- [ ] **Data Binding**: Dynamic data insertion into templates
- [ ] **Variable System**: Template variables for personalization
- [ ] **Data Preview**: Preview with sample data
- [ ] **Data Validation**: Validate template data structure

## Export & Integration

### 10. Export Functionality
- [ ] **SendGrid Export**: Export templates for SendGrid
- [ ] **HTML Export**: Export as standalone HTML
- [ ] **React Email Export**: Export as React Email components
- [ ] **Inline CSS**: Ensure all CSS is inlined for email compatibility
- [ ] **Email Client Testing**: Preview in different email clients

### 11. Integration Features
- [ ] **API Integration**: Connect to email service providers
- [ ] **Template Sharing**: Share templates between users
- [ ] **Version Control**: Track template versions
- [ ] **Collaboration**: Multi-user editing capabilities

## User Experience

### 12. Navigation & Workflow
- [ ] **Intuitive Navigation**: Clear navigation between sections
- [ ] **Breadcrumbs**: Show current location in app
- [ ] **Search Functionality**: Search templates and components
- [ ] **Keyboard Shortcuts**: Common actions via keyboard
- [ ] **Undo/Redo**: Template editing history

### 13. Responsive Design
- [ ] **Desktop First**: Optimized for desktop use
- [ ] **Tablet Support**: Functional on tablet devices
- [ ] **Mobile Preview**: Mobile email client preview
- [ ] **Adaptive Layout**: Layout adjusts to screen size

## Technical Requirements

### 14. Performance
- [ ] **Fast Loading**: Quick initial load times
- [ ] **Smooth Editing**: Responsive template editing
- [ ] **Efficient Rendering**: Optimized preview rendering
- [ ] **Caching**: Cache templates and components
- [ ] **Lazy Loading**: Load components on demand

### 15. Data Persistence
- [ ] **Local Storage**: Save drafts locally
- [ ] **Cloud Sync**: Sync templates to cloud storage
- [ ] **Auto-save**: Automatic saving of work
- [ ] **Backup System**: Backup important templates
- [ ] **Import/Export**: Import/export template collections

## Implementation Checklist

### Foundation Setup
- [ ] Set up project structure and dependencies
- [ ] Implement basic layout with sidebar and header
- [ ] Configure design system integration
- [ ] Create basic navigation structure
- [ ] Set up routing and page structure

### Core Editor Implementation
- [ ] Implement Monaco editor integration
- [ ] Create template JSON structure
- [ ] Build basic template preview
- [ ] Add template save/load functionality
- [ ] Implement basic component library

### Email Components Integration
- [ ] Integrate React Email components
- [ ] Create component picker interface
- [ ] Build component configuration panels
- [ ] Implement drag-and-drop editing
- [ ] Add component documentation

### Export & Polish
- [ ] Implement SendGrid export
- [ ] Add HTML export functionality
- [ ] Create email client preview
- [ ] Polish UI/UX and responsive design
- [ ] Add keyboard shortcuts and advanced features

## Success Criteria

### Functional Requirements
- [ ] Users can create email templates using visual editor
- [ ] Templates can be previewed in real-time
- [ ] Templates can be exported for SendGrid
- [ ] Application uses design system components consistently
- [ ] Dark theme is applied correctly throughout

### Technical Requirements
- [ ] Application loads quickly (< 3 seconds)
- [ ] Template editing is responsive (< 100ms updates)
- [ ] Export functionality works reliably
- [ ] No console errors or warnings
- [ ] Responsive design works on target devices

### User Experience Requirements
- [ ] Interface is intuitive and easy to navigate
- [ ] Template creation workflow is smooth
- [ ] Preview accurately represents final email
- [ ] Export process is straightforward
- [ ] Application feels fast and responsive

## Risk Mitigation

### Technical Risks
- **Design System Integration**: Ensure proper CSS variable usage
- **Email Client Compatibility**: Test exports in multiple email clients
- **Performance**: Monitor and optimize rendering performance
- **Data Loss**: Implement robust auto-save and backup systems

### User Experience Risks
- **Learning Curve**: Provide clear documentation and help
- **Template Complexity**: Offer templates and examples
- **Export Issues**: Provide clear error messages and troubleshooting

## Dependencies & Tools

### Required Packages
- `@float-vibe-foundry/design-system` - UI components
- `@react-email/components` - Email components
- `@react-email/render` - Email rendering
- `@react-email/tailwind` - Email styling
- `monaco-editor` - Code editing
- `@tabler/icons-react` - Icons
- `next` - React framework
- `tailwindcss` - Styling

### Development Tools
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Playwright for testing
- pnpm for package management

## Notes & Considerations

### Email-Specific Requirements
- All CSS must be inlined for email compatibility
- Templates must work across different email clients
- Images must be hosted and accessible
- Responsive design for mobile email clients

### Design System Integration
- Use only design system components for application UI
- Email templates use React Email components (separate from app UI)
- Maintain clear separation between app styling and email styling
- Follow design system patterns and conventions

### Performance Considerations
- Lazy load components and templates
- Optimize preview rendering
- Cache frequently used components
- Minimize bundle size for faster loading

---

**Next Steps**: 
1. Review and approve this requirements document
2. Begin implementation with project structure setup
3. Implement basic layout with sidebar and header
4. Configure design system integration
5. Create basic navigation and routing 