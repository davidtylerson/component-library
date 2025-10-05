# Outlook Email Compatibility Guide

This guide covers Outlook-specific compatibility issues and solutions for the Float Mail email template system.

## Overview

Microsoft Outlook uses a unique rendering engine based on Microsoft Word, which has different CSS support compared to modern web browsers. This can cause styling issues, particularly with padding, borders, and layout when users reply to emails.

## Common Outlook Issues

### 1. Padding Removal on Reply

**Problem**: When users reply to emails in Outlook, padding applied to `<div>` elements is often stripped or ignored.

**Symptoms**:

- Main content area loses padding when replying
- Email appears cramped or poorly spaced
- Layout breaks in Outlook reply view

**Root Cause**: Outlook's Word-based rendering engine has limited support for CSS padding on non-table elements, especially during reply operations.

### 2. Border Rendering Issues

**Problem**: Table borders may not display correctly or may be clipped.

**Symptoms**:

- Missing outer borders on tables
- Inconsistent border rendering across email clients
- Border-radius causing border clipping

**Root Cause**: Outlook's limited CSS support and different border-collapse behavior.

## Solutions Implemented

### 1. Table-Based Padding

**Solution**: Use table-based layout with padding applied to `<td>` elements instead of `<div>` elements.

**Implementation**:

```tsx
// ❌ Problematic (div-based padding)
<Container style={{ padding: '24px' }}>
  {children}
</Container>

// ✅ Fixed (table-based padding)
<table width="100%" border="0" cellPadding="0" cellSpacing="0">
  <tbody>
    <tr>
      <td style={{ padding: '24px', boxSizing: 'border-box' }}>
        {children}
      </td>
    </tr>
  </tbody>
</table>
```

**Benefits**:

- Outlook respects padding on `<td>` elements
- Consistent rendering across all email clients
- Padding preserved during reply operations
- No visual changes to email appearance

### 2. Border Optimization

**Solution**: Remove border-radius and overflow properties that can clip borders, and use explicit border declarations.

**Implementation**:

```tsx
// ❌ Problematic (border clipping)
<table style={{
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  overflow: 'hidden',
}}>

// ✅ Fixed (clean borders)
<table style={{
  borderCollapse: 'collapse',
  backgroundColor: '#ffffff',
}}>
```

**Benefits**:

- Complete outer borders visible
- No border clipping issues
- Consistent border rendering
- Email client compatibility

## EmailLayout Component Updates

The `EmailLayout` component has been updated to use table-based padding for Outlook compatibility:

```tsx
// Updated EmailLayout.tsx
<Section
  style={
    {
      /* outer styling */
    }
  }
>
  <Container
    style={
      {
        /* container styling */
      }
    }
  >
    {/* Table-based padding for Outlook compatibility */}
    <table
      width="100%"
      border="0"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              padding: '24px',
              boxSizing: 'border-box',
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  </Container>
</Section>
```

## Best Practices for Outlook Compatibility

### 1. Use Table-Based Layouts

**Always use tables for layout structure**:

```tsx
// ✅ Good - Table-based layout
<table width="100%" border="0" cellPadding="0" cellSpacing="0">
  <tr>
    <td style={{ padding: '20px' }}>
      Content here
    </td>
  </tr>
</table>

// ❌ Avoid - Div-based layout
<div style={{ padding: '20px' }}>
  Content here
</div>
```

### 2. Apply Padding to Table Cells

**Apply padding to `<td>` elements, not containers**:

```tsx
// ✅ Good - Padding on table cell
<td style={{ padding: '16px 24px' }}>
  Content
</td>

// ❌ Avoid - Padding on div
<div style={{ padding: '16px 24px' }}>
  Content
</div>
```

### 3. Use Inline CSS

**Always use inline CSS for critical styling**:

```tsx
// ✅ Good - Inline styles
<td style={{
  padding: '16px',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb'
}}>

// ❌ Avoid - External CSS classes
<td className="content-cell">
```

### 4. Avoid Problematic CSS Properties

**Properties to avoid in Outlook**:

- `border-radius` (can clip borders)
- `overflow: hidden` (can cause clipping)
- `box-shadow` (not supported)
- `transform` (not supported)
- `flexbox` (limited support)

### 5. Use Border-Collapse for Tables

**Always use border-collapse for table borders**:

```tsx
// ✅ Good - Border collapse
<table style={{ borderCollapse: 'collapse' }}>
  <td style={{ border: '1px solid #e5e7eb' }}>

// ❌ Avoid - Default border spacing
<table>
  <td style={{ border: '1px solid #e5e7eb' }}>
```

## Testing Outlook Compatibility

### 1. Development Testing

**Test in Outlook during development**:

1. Compile templates: `npx react-email export`
2. Open compiled HTML in Outlook
3. Test reply functionality
4. Verify padding and borders are preserved

### 2. Email Client Testing

**Test across multiple Outlook versions**:

- Outlook 2016/2019/2021 (Desktop)
- Outlook for Windows (New)
- Outlook for Mac
- Outlook Web App (OWA)

### 3. Reply Testing

**Always test reply functionality**:

1. Send email to Outlook account
2. Reply to the email
3. Verify padding is preserved
4. Check border rendering
5. Test on different Outlook versions

## Troubleshooting

### Padding Still Missing?

**Check these common issues**:

1. **Padding on div instead of td**: Move padding to table cell
2. **External CSS**: Ensure critical styles are inline
3. **Nested tables**: Check for conflicting table structures
4. **Outlook version**: Test on different Outlook versions

### Borders Not Showing?

**Check these common issues**:

1. **Border-radius**: Remove border-radius that clips borders
2. **Overflow hidden**: Remove overflow properties
3. **Border-collapse**: Ensure border-collapse is set
4. **Color format**: Use hex colors instead of color names

### Layout Breaking?

**Check these common issues**:

1. **Flexbox usage**: Replace with table-based layout
2. **CSS Grid**: Not supported, use tables instead
3. **Modern CSS**: Stick to basic CSS properties
4. **Responsive design**: Use media queries carefully

## Migration Guide

### Updating Existing Templates

**To update existing templates for Outlook compatibility**:

1. **Replace div-based padding**:

   ```tsx
   // Before
   <div style={{ padding: '24px' }}>
     {content}
   </div>

   // After
   <table width="100%" border="0" cellPadding="0" cellSpacing="0">
     <tr>
       <td style={{ padding: '24px' }}>
         {content}
       </td>
     </tr>
   </table>
   ```

2. **Remove problematic CSS**:

   ```tsx
   // Before
   <table style={{
     border: '1px solid #e5e7eb',
     borderRadius: '8px',
     overflow: 'hidden',
   }}>

   // After
   <table style={{
     borderCollapse: 'collapse',
     backgroundColor: '#ffffff',
   }}>
   ```

3. **Test thoroughly**:
   - Compile and test in Outlook
   - Test reply functionality
   - Verify across different Outlook versions

## Resources

### Testing Tools

- **Email on Acid**: Comprehensive email client testing
- **Litmus**: Email testing and preview
- **Outlook**: Test directly in Outlook applications

### Documentation

- **Microsoft Outlook CSS Support**: Official documentation
- **Email Client CSS Support**: Can I Email database
- **React Email Documentation**: Framework-specific guidance

### Community

- **Email Developer Community**: Best practices and solutions
- **Stack Overflow**: Common Outlook issues and fixes
- **GitHub Issues**: React Email Outlook compatibility

## Conclusion

Outlook compatibility requires careful attention to CSS support limitations and layout structure. By using table-based layouts, applying padding to table cells, and avoiding problematic CSS properties, you can ensure consistent email rendering across all clients, including Outlook.

The Float Mail system has been updated to use these best practices, ensuring that all templates maintain their appearance and functionality when users reply in Outlook.
