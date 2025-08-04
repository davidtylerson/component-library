# Sidebar Component Approach

## Overview

The design system provides two sidebar component approaches:

1. **Shadcn Sidebar Components** (Recommended) - Modern, feature-rich sidebar components
2. **Custom Sidebar Components** (Legacy) - Simple custom sidebar components

## Recommended Approach: Shadcn Sidebar Components

### Components to Use

```tsx
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarProvider
} from '@float-vibe-foundry/design-system';
```

### Example Usage

```tsx
<SidebarProvider>
  <div className="w-full h-screen bg-bg-quinary flex">
    <Sidebar className="w-[232px] bg-bg-app-base">
      <SidebarContent>
        <SidebarMenu className="mt-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-text-tertiary">Templates</SidebarGroupLabel>
            <SidebarGroupContent>
              {templates.map((templateName) => (
                <SidebarMenuItem key={templateName}>
                  <SidebarMenuButton 
                    isActive={selectedTemplate === templateName}
                    onClick={() => handleTemplateChange(templateName)}
                  >
                    <IconFolder className="h-4 w-4" />
                    <span>{templateName}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  </div>
</SidebarProvider>
```

### Styling

The shadcn sidebar components automatically use the design system's styling:

- **Inactive state**: `text-secondary` text, `fg-tertiary` icons
- **Active state**: `text-primary` text, `fg-secondary` icons  
- **Hover state**: `text-primary` text, `fg-secondary` icons

### CSS Variables

The design system provides these CSS variables for shadcn sidebar components:

```css
/* Light theme */
--sidebar-accent: var(--bg-tertiary);
--sidebar-accent-foreground: var(--text-primary);
--sidebar-ring: var(--border-primary);
--sidebar-foreground: var(--text-secondary);

/* Dark theme */
--sidebar-accent: var(--bg-tertiary);
--sidebar-accent-foreground: var(--text-primary);
--sidebar-ring: var(--border-primary);
--sidebar-foreground: var(--text-secondary);
```

## Legacy Approach: Custom Sidebar Components

### Components to Use

```tsx
import { SidebarItem, SidebarGroup, SidebarSeparator } from '@float-vibe-foundry/design-system';
```

### Example Usage

```tsx
<aside className="float-sidebar-root">
  <nav className="float-sidebar-content space-y-1">
    <SidebarItem icon={IconHome} isActive={true}>Home</SidebarItem>
    <SidebarItem icon={IconSearch}>Search</SidebarItem>
    <SidebarSeparator />
    <SidebarGroup label="Analytics">
      <SidebarItem icon={IconChartBar}>Insights</SidebarItem>
    </SidebarGroup>
  </nav>
</aside>
```

## Migration Guide

### From Custom to Shadcn Sidebar

1. **Replace imports**:
   ```tsx
   // Old
   import { SidebarItem, SidebarGroup } from '@float-vibe-foundry/design-system';
   
   // New
   import { 
     Sidebar, 
     SidebarContent, 
     SidebarMenu, 
     SidebarMenuButton, 
     SidebarMenuItem, 
     SidebarGroup, 
     SidebarGroupLabel, 
     SidebarGroupContent,
     SidebarProvider
   } from '@float-vibe-foundry/design-system';
   ```

2. **Update component structure**:
   ```tsx
   // Old
   <SidebarItem icon={Icon} isActive={isActive} onClick={handleClick}>
     Label
   </SidebarItem>
   
   // New
   <SidebarMenuItem>
     <SidebarMenuButton isActive={isActive} onClick={handleClick}>
       <Icon className="h-4 w-4" />
       <span>Label</span>
     </SidebarMenuButton>
   </SidebarMenuItem>
   ```

3. **Remove custom CSS** - The design system now handles all styling automatically

## Best Practices

1. **Use shadcn sidebar components** for new projects
2. **Import design system CSS** to get automatic styling
3. **Avoid custom CSS overrides** unless absolutely necessary
4. **Use consistent icon sizing** (h-4 w-4 for menu items)
5. **Wrap in SidebarProvider** for full functionality

## Future Plans

- The custom sidebar components will be deprecated in favor of shadcn components
- All projects should migrate to shadcn sidebar components
- The design system will maintain backward compatibility during transition 