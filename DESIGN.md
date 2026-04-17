# Design System - Venta Productos

## Overview

**Project Type**: E-commerce website for industrial/technical products  
**Platform**: Next.js 15 with Tailwind CSS  
**Core Functionality**: Product catalog, shopping cart, quotes (cotizaciones), user authentication, admin dashboard  
**Target Audience**: B2B buyers, industrial clients, technical product purchasers

---

## Visual Theme & Atmosphere

### Overall Mood
- **Professional & Trustworthy**: Clean, corporate aesthetic that conveys reliability for B2B transactions
- **Technical Precision**: Data-focused presentation emphasizing specifications, pricing, and technical details
- **Approachable Luxury**: Premium feel without being ostentatious - trust-building for significant purchases

### Design Philosophy
- **Function First**: Every visual element serves a purpose - no decorative fluff
- **Information Density**: Appropriate for technical products - show specs, comparisons, details
- **Clarity Over Creativity**: When in doubt, prioritize readability and comprehension
- **Warm Professionalism**: Balance corporate trustworthiness with approachability

### Visual Density
- **Medium-High**: Product pages contain substantial information (specs, prices, variations)
- **Structured Layouts**: Grid-based organization with clear visual hierarchy
- **Generous Whitespace**: Prevents information overload despite high density

---

## Color Palette

### Primary Colors

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--primary-50` | `#f0f9ff` | Lightest primary | Backgrounds, subtle highlights |
| `--primary-100` | `#e0f2fe` | Light primary | Card backgrounds, input fields |
| `--primary-200` | `#bae6fd` | Subtle primary | Borders, dividers |
| `--primary-300` | `#7dd3fc` | Light accent | Hover states, secondary elements |
| `--primary-400` | `#38bdf8` | Primary blue | Primary buttons, links, icons |
| `--primary-500` | `#0ea5e9` | Core primary | Active states, key actions |
| `--primary-600` | `#0284c7` | Dark primary | Text on light backgrounds, emphasis |
| `--primary-700` | `#0369a1` | Darkest primary | Strong emphasis, headings |

### Neutral Colors

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--neutral-50` | `#f8fafc` | Off-white | Page backgrounds (light mode) |
| `--neutral-100` | `#f1f5f9` | Light gray | Card backgrounds, secondary surfaces |
| `--neutral-200` | `#e2e8f0` | Border gray | Dividers, subtle borders |
| `--neutral-300` | `#cbd5e1` | Medium gray | Placeholder text, disabled states |
| `--neutral-400` | `#94a3b8` | Muted text | Secondary text, labels |
| `--neutral-500` | `#64748b` | Body gray | Body text, descriptions |
| `--neutral-600` | `#475569` | Dark gray | Subheadings, emphasis |
| `--neutral-700` | `#334155` | Dark text | Primary text (light mode) |
| `--neutral-800` | `#1e293b` | Darker text | Headings, strong emphasis |
| `--neutral-900` | `#0f172a` | Near black | Dark mode backgrounds |

### Semantic Colors

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--success-500` | `#22c55e` | Green | Success states, availability, confirmations |
| `--success-600` | `#16a34a` | Dark green | Success hover, important success |
| `--warning-500` | `#f59e0b` | Amber | Warnings, limited stock |
| `--warning-600` | `#d97706` | Dark amber | Warning hover |
| `--error-500` | `#ef4444` | Red | Errors, out of stock, validation errors |
| `--error-600` | `#dc2626` | Dark red | Error hover, critical states |
| `--accent-500` | `#8b5cf6` | Purple | Special highlights, featured items |
| `--accent-600` | `#7c3aed` | Dark purple | Accent hover |

### Dark Mode Colors

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--dark-bg` | `#0f172a` | Dark background | Page background (dark mode) |
| `--dark-surface` | `#1e293b` | Dark surface | Cards, elevated elements |
| `--dark-border` | `#334155` | Dark borders | Dividers in dark mode |
| `--dark-text` | `#f1f5f9` | Dark mode text | Primary text |
| `--dark-muted` | `#94a3b8` | Dark mode muted | Secondary text |

---

## Typography

### Font Family

**Primary Font**: `'Plus Jakarta Sans', sans-serif`  
- Modern geometric sans-serif
- Excellent readability at all sizes
- Professional yet friendly character

**Usage**:
- All body text
- UI elements
- Navigation
- Product descriptions

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|--------------|-------|
| `text-xs` | 12px | 400 | 1.5 | Labels, badges, captions |
| `text-sm` | 14px | 400 | 1.5 | Secondary text, descriptions |
| `text-base` | 16px | 400 | 1.6 | Body text, general content |
| `text-lg` | 18px | 500 | 1.5 | Subheadings, emphasis |
| `text-xl` | 20px | 600 | 1.4 | Section titles |
| `text-2xl` | 24px | 600 | 1.3 | Page titles |
| `text-3xl` | 30px | 700 | 1.2 | Hero titles |
| `text-4xl` | 36px | 700 | 1.2 | Large hero titles |
| `text-5xl` | 48px | 800 | 1.1 | Major landing headlines |

### Font Weights

- **400 (Regular)**: Body text, descriptions
- **500 (Medium)**: Emphasis, subheadings
- **600 (Semibold)**: Headings, important elements
- **700 (Bold)**: Major headings, key actions
- **800 (Extra Bold)**: Hero headlines only

---

## Component Styling

### Buttons

**Primary Button**
```css
background: #0ea5e9;
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease;
```
- Hover: `translateY(-2px)`, `box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3)`
- Active: `translateY(0)`, reduced shadow

**Secondary Button**
```css
background: transparent;
color: #0ea5e9;
border: 2px solid #0ea5e9;
padding: 10px 22px;
border-radius: 8px;
font-weight: 600;
```
- Hover: `background: #0ea5e9`, `color: white`

**Ghost Button**
```css
background: transparent;
color: #64748b;
padding: 8px 16px;
border-radius: 6px;
```
- Hover: `background: #f1f5f9`, `color: #0f172a`

**Premium Button (CTA)**
- Adds shimmer effect on hover
- Subtle gradient overlay
- Enhanced shadow: `0 10px 30px rgba(0, 0, 0, 0.15)`

### Cards

**Product Card**
```css
background: white;
border: 1px solid #e2e8f0;
border-radius: 12px;
padding: 16px;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```
- Hover: `transform: translateY(-8px) scale(1.01)`, `box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15)`
- Dark mode: `background: #1e293b`, `border-color: #334155`

**Feature Card**
```css
background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
border-radius: 16px;
padding: 24px;
```

### Form Inputs

**Text Input**
```css
background: white;
border: 1px solid #e2e8f0;
border-radius: 8px;
padding: 12px 16px;
color: #1e293b;
transition: all 0.2s ease;
```
- Focus: `border-color: #0ea5e9`, `box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2)`
- Error: `border-color: #ef4444`, error message below
- Dark mode: `background: #1e293b`, `border-color: #334155`, `color: #f1f5f9`

**Select Dropdown**
- Same styling as text input
- Custom arrow icon (chevron)
- Option list with hover states

### Navigation

**Navbar**
```css
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(10px);
border-bottom: 1px solid #e2e8f0;
height: 72px;
```
- Dark mode: `background: rgba(15, 23, 42, 0.9)`
- Sticky positioning
- Logo left, navigation center, actions right

**Mobile Navigation**
- Hamburger menu with animated icon
- Slide-in drawer from right
- Overlay backdrop with blur

### Badges & Tags

**Status Badge**
```css
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
```
- Available: `background: #dcfce7`, `color: #166534`
- Limited: `background: #fef3c7`, `color: #92400e`
- Out of Stock: `background: #fee2e2`, `color: #991b1b`

### Modals

**Modal Overlay**
```css
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(4px);
```
- Centered content with `max-width: 500px`
- White background, `border-radius: 16px`
- Close button top-right
- Smooth scale-in animation

---

## Layout Principles

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing, icon gaps |
| `space-2` | 8px | Compact elements |
| `space-3` | 12px | Default padding |
| `space-4` | 16px | Standard spacing |
| `space-5` | 20px | Section padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-10` | 40px | Large sections |
| `space-12` | 48px | Hero spacing |
| `space-16` | 64px | Major sections |
| `space-20` | 80px | Page padding |

### Container Widths

- **Mobile**: `100%`, padding `16px`
- **Tablet**: `720px`, centered
- **Desktop**: `1280px`, centered
- **Wide**: `1536px`, max-width with auto margins

### Grid System

- **Product Grid**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns
  - Gap: `24px`

- **Content Grid**:
  - 12-column system
  - `24px` gutters

### Whitespace Philosophy

- **Generous but purposeful**: Every gap serves a visual or functional purpose
- **Content-driven**: More whitespace around important content
- **Scanning-friendly**: Adequate spacing for quick visual scanning
- **Breathing room**: Elements never feel cramped

---

## Depth & Elevation

### Shadow System

| Level | CSS | Usage |
|-------|-----|-------|
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0, 0, 0, 0.1)` | Cards, buttons |
| `shadow-lg` | `0 10px 15px rgba(0, 0, 0, 0.1)` | Hover cards |
| `shadow-xl` | `0 20px 25px rgba(0, 0, 0, 0.15)` | Modals, dropdowns |
| `shadow-2xl` | `0 25px 50px rgba(0, 0, 0, 0.25)` | Prominent elements |

### Surface Hierarchy

1. **Base Layer**: Page background (`#f8fafc` light / `#0f172a` dark)
2. **Surface Layer**: Cards, content sections (`white` / `#1e293b`)
3. **Elevated Layer**: Modals, dropdowns, sticky headers
4. **Overlay Layer**: Backdrops, overlays

### Visual Effects

**Glassmorphism**
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.3);
```
- Used for: Navbar, floating elements, cards on hero

**Glow Effects**
- Blue glow: `box-shadow: 0 0 40px rgba(59, 130, 246, 0.3)`
- Purple glow: `box-shadow: 0 0 40px rgba(139, 92, 246, 0.3)`
- Green glow: `box-shadow: 0 0 40px rgba(34, 197, 94, 0.3)`

---

## Interactive Behaviors

### Animations

**Entrance Animations**
- `fadeIn`: Opacity 0 to 1, 0.5s ease-out
- `slideUp`: Opacity 0 + translateY(30px), 0.6s ease-out
- `scaleIn`: Opacity 0 + scale(0.9), 0.4s ease-out
- `float`: Continuous vertical float, 3s ease-in-out infinite

**Stagger Animation**
- Used for lists (products, features)
- `animation-delay` increments: 0ms, 100ms, 200ms, etc.

**Duration Classes**
- `animate-duration-fast`: 300ms
- `animate-duration-normal`: 500ms
- `animate-duration-slow`: 800ms

### Hover Effects

**Hover Lift**
```css
transform: translateY(-5px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
```

**Hover Glow**
```css
box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
transition: box-shadow 0.3s ease;
```

**Hover Scale**
```css
transform: scale(1.02);
transition: transform 0.3s ease;
```

### Transitions

- **Default**: `all 0.3s ease`
- **Smooth**: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- **Fast**: `all 0.15s ease`
- **Bounce**: `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)`

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Mobile-First Approach

1. Design for mobile first
2. Add complexity for larger screens
3. Test touch targets (min 44px)
4. Ensure readable text without zooming

### Touch Targets

- Minimum touch target: `44px x 44px`
- Adequate spacing between tappable elements: `8px` minimum
- Swipe-friendly navigation where appropriate

### Collapsing Strategy

- **Navigation**: Hamburger menu on mobile
- **Grid**: Reduce columns on smaller screens
- **Cards**: Stack vertically, full width
- **Hero**: Simplified on mobile, full on desktop
- **Modals**: Full-screen on mobile

---

## Do's and Don'ts

### Do

✅ **DO**: Use the defined color palette consistently  
✅ **DO**: Maintain the Plus Jakarta Sans font family  
✅ **DO**: Apply proper spacing using the spacing scale  
✅ **DO**: Use entrance animations for page elements  
✅ **DO**: Implement hover effects on interactive elements  
✅ **DO**: Test designs in both light and dark modes  
✅ **DO**: Follow the shadow system for elevation  
✅ **DO**: Use semantic colors (success/warning/error) appropriately  
✅ **DO**: Ensure accessibility (contrast, focus states)  
✅ **DO**: Keep content focused and organized

### Don't

❌ **DON'T**: Use colors outside the defined palette  
❌ **DON'T**: Mix different font families  
❌ **DON'T**: Apply inconsistent spacing  
❌ **DON'T**: Over-animate - use animations purposefully  
❌ **DON'T**: Ignore dark mode  
❌ **DON'T**: Create visual clutter  
❌ **DON'T**: Use unauthorized shadows or glows  
❌ **DON'T**: Break established component patterns  
❌ **DON'T**: Forget mobile responsiveness  
❌ **DON'T**: Compromise readability for aesthetics

---

## Dark Mode Implementation

### Toggle Behavior
- Controlled via `dark` class on `<html>` element
- Toggle component in navbar allows user preference
- Respects system preference on initial load

### Dark Mode Rules

1. **Backgrounds**: Switch from `#f8fafc` to `#0f172a`
2. **Surfaces**: Cards change from `white` to `#1e293b`
3. **Borders**: Change from `#e2e8f0` to `#334155`
4. **Text**: Change from `#1e293b` to `#f1f5f9`
5. **Muted text**: Change from `#64748b` to `#94a3b8`
6. **Buttons**: Adjust shadows for better visibility
7. **Images**: Consider inversion or overlay adjustments

---

## Agent Prompt Guide

### Quick Color Reference

```
Primary Blue: #0ea5e9
Success Green: #22c55e
Warning Amber: #f59e0b
Error Red: #ef4444
Purple Accent: #8b5cf6
Light Background: #f8fafc
Dark Background: #0f172a
```

### Example Prompts

**Create a product card:**
```
Create a product card component following DESIGN.md:
- White background with subtle border
- Product image (16:9 aspect ratio)
- Product name (text-lg, semibold)
- Price display (primary color, bold)
- "Agregar a Cotización" button
- Hover: lift effect with shadow
```

**Create a hero section:**
```
Build a hero section based on DESIGN.md:
- Full-width background with gradient
- Headline: text-5xl, bold, dark text
- Subheadline: text-xl, muted color
- CTA buttons: primary and secondary styles
- Floating product image with shadow
```

**Create a form:**
```
Create a contact form following DESIGN.md:
- Input fields with focus states (blue ring)
- Labels above inputs (text-sm, medium weight)
- Error states with red border and message
- Submit button: primary style
- Proper spacing (space-4 between fields)
```

---

## Implementation Notes

### Tailwind Configuration

Current `tailwind.config.js` is minimal - relies on default Tailwind values plus custom CSS in `globals.css`.

### CSS Variables

All colors are defined as CSS variables in `:root` and `.dark` in `globals.css`. Use these variables for any custom styling.

### Key Dependencies

- Next.js 15 (App Router)
- Tailwind CSS
- Firebase (Auth, Firestore)
- Lucide React (icons)

### File Structure

```
src/
├── app/
│   ├── globals.css (design tokens, animations)
│   ├── layout.tsx (providers, theme)
│   └── [pages]/
├── components/
│   ├── ProductCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── [ui components]/
└── lib/
    └── firebase config
```

---

*This DESIGN.md was created to ensure visual consistency across the Venta Productos e-commerce platform. All AI agents should reference this document when generating new UI components or modifying existing ones.*