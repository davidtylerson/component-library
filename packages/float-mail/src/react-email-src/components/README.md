# Float React Email Component Library

A comprehensive, responsive component library for building professional email templates with Float branding.

## 🚀 Quick Start

```tsx
import {
  EmailLayout,
  PageTitle,
  BodyText,
  DataTable,
  ActionButton,
} from '../react-email-src/components';

export const MyEmail = () => (
  <EmailLayout preheader="Email preview text">
    <PageTitle>Welcome to Float</PageTitle>
    <BodyText>This is a professional email template.</BodyText>
    <DataTable
      title="Key Information"
      data={[
        { label: 'Status', value: 'Active' },
        { label: 'Account', value: 'Premium' },
      ]}
    />
    <ActionButton href="https://float.tech">Get Started</ActionButton>
  </EmailLayout>
);
```

## 📦 Component Categories

### 🏗️ Layout Components

#### `EmailLayout`

The main wrapper component that provides the standard Float email structure.

```tsx
<EmailLayout
  preheader="Email preview text"
  backgroundColor="#F4F4F5"
  maxWidth="600px"
  showHeader={true}
  showFooter={true}
>
  {/* Your email content */}
</EmailLayout>
```

**Features:**

- ✅ Automatic Float header and footer
- ✅ Responsive design with mobile optimization
- ✅ Proper email client compatibility
- ✅ Viewport meta tag for mobile devices
- ✅ Centered layout with max-width constraint

**Props:**

- `preheader?: string` - Preview text shown in email clients
- `backgroundColor?: string` - Background color (default: `#F4F4F5`)
- `maxWidth?: string` - Maximum width (default: `600px`)
- `showHeader?: boolean` - Show Float header (default: `true`)
- `showFooter?: boolean` - Show Float footer (default: `true`)

---

### 📝 Typography Components

#### `PageTitle`

Large page headings for main content sections.

```tsx
<PageTitle>Welcome to Float</PageTitle>
```

#### `SectionTitle`

Section headings for content organization.

```tsx
<SectionTitle>Account Information</SectionTitle>
```

#### `SubsectionTitle`

Smaller headings for subsections.

```tsx
<SubsectionTitle>Billing Details</SubsectionTitle>
```

#### `BodyText`

Standard body text with proper spacing.

```tsx
<BodyText>This is regular body text for main content.</BodyText>
```

#### `LeadText`

Larger, more prominent text for important content.

```tsx
<LeadText>This is lead text for important introductory content.</LeadText>
```

#### `CaptionText`

Small text for secondary information.

```tsx
<CaptionText>
  This is caption text for small, secondary information.
</CaptionText>
```

#### `MutedText`

Muted text for less important content.

```tsx
<MutedText>This is muted text for less important content.</MutedText>
```

**Typography Props:**

- `align?: 'left' | 'center' | 'right'` - Text alignment
- `className?: string` - Additional CSS classes

---

### 📊 Data Display Components

#### `DataTable`

Simple key-value table for displaying structured data.

```tsx
<DataTable
  title="Trade Details"
  data={[
    { label: 'Trade ID', value: '123456789' },
    { label: 'Amount', value: '$1,000,000' },
    { label: 'Date', value: '2024-01-15' },
  ]}
/>
```

**Features:**

- ✅ Responsive design with word wrapping
- ✅ Left-aligned labels, right-aligned values
- ✅ Proper spacing and borders
- ✅ Mobile-optimized layout

**Props:**

- `data: Array<{label: string, value: string}>` - Table data
- `title?: string` - Optional table title
- `className?: string` - Additional CSS classes

#### `GroupedDataTable`

Complex table with grouped sections for detailed data.

```tsx
<GroupedDataTable
  title="Trade Information"
  groups={[
    {
      groupName: 'Trade Details',
      rows: [
        { field: 'Trade ID', value: '123456789', counterparty: '' },
        { field: 'Amount', value: '$1,000,000', counterparty: '' },
      ],
    },
    {
      groupName: 'Settlement Details',
      rows: [{ field: 'Date', value: '2024-01-15', counterparty: '' }],
    },
  ]}
/>
```

**Features:**

- ✅ Grouped sections with headers
- ✅ Three-column layout (Field, Value, Counterparty)
- ✅ Responsive design with word wrapping
- ✅ Professional styling with proper borders

**Props:**

- `groups: Array<TableGroup>` - Grouped table data
- `title?: string` - Optional table title
- `className?: string` - Additional CSS classes

---

### 🎨 Content Components

#### `Callout`

Highlighted message boxes for important information.

```tsx
<Callout variant="default">
  <BodyText>This is a default callout box for important messages.</BodyText>
</Callout>

<Callout variant="warning">
  <BodyText>This is a warning callout for alerts and notices.</BodyText>
</Callout>

<Callout variant="success">
  <BodyText>This is a success callout for positive confirmations.</BodyText>
</Callout>
```

**Variants:**

- `default` - Light gray background
- `warning` - Yellow background for alerts
- `success` - Green background for confirmations

**Features:**

- ✅ Responsive design with full width
- ✅ Proper padding and borders
- ✅ Color-coded variants
- ✅ Mobile-optimized

---

### 🔘 Interactive Components

#### `Button`

Versatile button component with multiple variants and sizes.

```tsx
<Button href="https://float.tech" variant="primary" size="md" fullWidth={false}>
  Click Me
</Button>
```

**Variants:**

- `primary` - Float brand color (`#4A49A6`)
- `secondary` - Gray background
- `outline` - Transparent with border
- `ghost` - Transparent without border

**Sizes:**

- `sm` - Small (14px, 8px 16px padding)
- `md` - Medium (16px, 12px 24px padding)
- `lg` - Large (18px, 16px 32px padding)

**Features:**

- ✅ Responsive design with full-width option
- ✅ Float brand colors
- ✅ Touch-friendly sizing
- ✅ Email client compatible

#### `ActionButton`

Pre-configured button for common actions.

```tsx
<ActionButton href="https://float.tech" variant="primary" fullWidth={true}>
  Get Started
</ActionButton>
```

#### `Link`

Text links with consistent styling.

```tsx
<Link href="https://float.tech" variant="default">
  Learn more about Float
</Link>
```

**Variants:**

- `default` - Float brand color (`#4A49A6`)
- `muted` - Gray color (`#6b7280`)

#### `TextLink` & `MutedLink`

Specialized link components for common use cases.

```tsx
<BodyText>
  This is a <TextLink href="https://float.tech">text link</TextLink> within body
  text.
</BodyText>
```

---

### 📏 Spacing Components

#### `Spacer`

Flexible spacing component for consistent layouts.

```tsx
<Spacer size="md" direction="vertical" />
<Spacer size="lg" direction="horizontal" />
```

**Sizes:**

- `xs` - Extra small (4px)
- `sm` - Small (8px)
- `md` - Medium (16px)
- `lg` - Large (24px)
- `xl` - Extra large (32px)
- `2xl` - 2X large (48px)

**Directions:**

- `vertical` - Vertical spacing (default)
- `horizontal` - Horizontal spacing

#### Quick Spacing Utilities

```tsx
<XS />     // 4px vertical spacer
<SM />     // 8px vertical spacer
<MD />     // 16px vertical spacer
<LG />     // 24px vertical spacer
<XL />     // 32px vertical spacer
<XXL />    // 48px vertical spacer
```

#### `Divider`

Visual separator for content sections.

```tsx
<Divider color="#e5e7eb" thickness="1px" />
```

---

### 🎯 Layout Components

#### `Card`

Content containers with different styling variants.

```tsx
<Card variant="default" padding="md">
  <SubsectionTitle>Card Title</SubsectionTitle>
  <BodyText>Card content goes here.</BodyText>
</Card>
```

**Variants:**

- `default` - Standard white background
- `elevated` - Subtle shadow for emphasis
- `outlined` - Prominent border

**Padding:**

- `sm` - Small padding (12px)
- `md` - Medium padding (16px)
- `lg` - Large padding (24px)

#### `Row` & `Column`

Flexbox-like layout components.

```tsx
<Row gap="md" align="center" justify="space-between">
  <Column width="50%">
    <Card variant="default">
      <BodyText>Left content</BodyText>
    </Card>
  </Column>
  <Column width="50%">
    <Card variant="default">
      <BodyText>Right content</BodyText>
    </Card>
  </Column>
</Row>
```

**Row Props:**

- `gap?: 'sm' | 'md' | 'lg'` - Space between columns
- `align?: 'start' | 'center' | 'end'` - Vertical alignment
- `justify?: 'start' | 'center' | 'end' | 'space-between'` - Horizontal alignment

**Column Props:**

- `width?: string` - Column width (e.g., "50%", "200px")

#### `CenteredLayout`

Centered content wrapper.

```tsx
<CenteredLayout maxWidth="500px">
  <PageTitle>Centered Content</PageTitle>
  <BodyText>This content is centered.</BodyText>
</CenteredLayout>
```

---

### 🏷️ Branding Components

#### `Header`

Float logo and branding header.

```tsx
<Header logoUrl="custom-logo.png" logoAlt="Custom Logo" logoWidth="120px" />
```

**Features:**

- ✅ Centered Float logo
- ✅ Responsive design
- ✅ Clickable link to float.tech
- ✅ Proper spacing and alignment

#### `Footer`

Company information and branding footer.

```tsx
<Footer
  companyDescription="Custom company description"
  companyName="Custom Company"
  companyAddress="Custom Address"
/>
```

**Features:**

- ✅ Company description with "Learn more" link
- ✅ Small Float logo
- ✅ Company name and address
- ✅ Responsive design

---

## 🎨 Design System

### Colors

- **Primary**: `#4A49A6` (Float purple)
- **Background**: `#F4F4F5` (Light gray)
- **Text Primary**: `#111827` (Dark gray)
- **Text Secondary**: `#374151` (Medium gray)
- **Text Muted**: `#6b7280` (Light gray)
- **Border**: `#eaebed` (Light border)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Yellow)

### Typography

- **Font Family**: `Helvetica-Neue, Helvetica, Arial, sans-serif`
- **Page Title**: 24px, bold
- **Section Title**: 20px, bold
- **Subsection Title**: 16px, bold
- **Body Text**: 14px, normal
- **Caption**: 12px, normal

### Spacing

- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

---

## 📱 Responsive Design

All components are built with mobile-first responsive design:

### Mobile Optimization

- ✅ Viewport meta tag for proper scaling
- ✅ Touch-friendly button sizes
- ✅ Responsive tables with word wrapping
- ✅ Proper margins and padding for mobile
- ✅ Fluid layouts that adapt to screen size

### Email Client Compatibility

- ✅ Outlook support with table-based layouts
- ✅ Gmail mobile app optimization
- ✅ Apple Mail compatibility
- ✅ Cross-platform email client support

---

## 🚀 Usage Examples

### Simple Email Template

```tsx
import {
  EmailLayout,
  PageTitle,
  BodyText,
  ActionButton,
  MD,
} from '../react-email-src/components';

export const WelcomeEmail = () => (
  <EmailLayout preheader="Welcome to Float">
    <PageTitle>Welcome to Float!</PageTitle>
    <BodyText>
      Thank you for joining Float. We're excited to help you streamline your
      financial workflows.
    </BodyText>
    <MD />
    <ActionButton href="https://float.tech/getting-started" fullWidth>
      Get Started
    </ActionButton>
  </EmailLayout>
);
```

### Complex Data Email

```tsx
import {
  EmailLayout,
  PageTitle,
  SectionTitle,
  BodyText,
  Callout,
  DataTable,
  GroupedDataTable,
  MD,
  LG,
} from '../react-email-src/components';

export const TradeConfirmation = () => (
  <EmailLayout preheader="Trade confirmation received">
    <PageTitle>Trade Confirmation</PageTitle>
    <BodyText>
      Your trade has been confirmed with the following details:
    </BodyText>

    <MD />

    <SectionTitle>Trade Summary</SectionTitle>
    <DataTable
      data={[
        { label: 'Trade ID', value: '123456789' },
        { label: 'Amount', value: '$1,000,000' },
        { label: 'Date', value: '2024-01-15' },
      ]}
    />

    <LG />

    <SectionTitle>Detailed Breakdown</SectionTitle>
    <GroupedDataTable
      groups={[
        {
          groupName: 'Trade Details',
          rows: [
            { field: 'Product', value: 'FX Forward', counterparty: '' },
            { field: 'Currency', value: 'USD', counterparty: '' },
          ],
        },
      ]}
    />

    <MD />

    <Callout variant="success">
      <BodyText>Your trade has been successfully processed!</BodyText>
    </Callout>
  </EmailLayout>
);
```

---

## 🔧 Development

### Building Templates

```bash
# Development server
pnpm dev

# Build templates
pnpm build:react-email

# Export HTML files
pnpm export

# Export formatted HTML files
pnpm export:formatted
```

## 📧 Outlook Compatibility

### Important: Outlook Reply Issues

**All templates use table-based padding for Outlook compatibility.** When users reply to emails in Outlook, padding applied to `<div>` elements is often stripped. The `EmailLayout` component uses table-based padding to ensure consistent rendering.

**Key Features**:

- ✅ Table-based padding preserved during Outlook replies
- ✅ Complete border rendering without clipping
- ✅ Cross-client compatibility maintained
- ✅ No visual changes to email appearance

**For more details, see**: `OUTLOOK_COMPATIBILITY_GUIDE.md`

### Best Practices

1. **Use table-based layouts** for main content areas
2. **Apply padding to `<td>` elements**, not `<div>` elements
3. **Use inline CSS** for critical styling
4. **Avoid border-radius** and overflow properties that can clip borders
5. **Test in Outlook** during development

### File Structure

```
react-email-src/
├── components/
│   ├── README.md           # This documentation
│   ├── index.ts            # Component exports
│   ├── EmailLayout.tsx     # Main layout wrapper
│   ├── Header.tsx          # Float header
│   ├── Footer.tsx          # Float footer
│   ├── Typography.tsx      # Text components
│   ├── Spacing.tsx         # Spacing utilities
│   ├── Layout.tsx          # Layout components
│   ├── Interactive.tsx     # Buttons and links
│   ├── Callout.tsx         # Message boxes
│   ├── DataTable.tsx       # Simple tables
│   └── GroupedDataTable.tsx # Complex tables
├── types/                  # TypeScript definitions
└── data/                   # Sample data
```

---

## 📄 License

This component library is part of the Float email template system and is designed for internal use.
