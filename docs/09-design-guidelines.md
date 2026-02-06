# Design Guidelines & Best Practices

## Color Usage Guide

### Primary Colors
```css
--primary-green: #2C5F2D;    /* Main brand color - headers, CTAs */
--secondary-orange: #FF6B35;  /* Accent - buttons, highlights */
--accent-blue: #0077B6;       /* Links, secondary CTAs */
```

### Neutral Colors
```css
--text-dark: #2D3142;         /* Body text */
--text-light: #6C757D;        /* Secondary text */
--bg-light: #F8F9FA;          /* Section backgrounds */
--bg-white: #FFFFFF;          /* Card backgrounds */
--border-color: #DEE2E6;      /* Borders, dividers */
```

### Semantic Colors
```css
--success: #06D6A0;           /* Success messages, achievements */
--warning: #FFB703;           /* Warnings, alerts */
--danger: #EF476F;            /* Errors, urgent */
--info: #118AB2;              /* Information */
```

### Usage Rules
- **Headers**: Primary green or white (on dark backgrounds)
- **Body text**: Text dark (#2D3142)
- **Primary CTA buttons**: Orange background, white text
- **Secondary CTA buttons**: White/transparent with colored border
- **Links**: Accent blue, underline on hover
- **Section alternation**: White → Light gray → White

---

## Typography System

### Font Families
```css
/* Headings */
font-family: 'Poppins', sans-serif;
font-weight: 600-700;

/* Body Text */
font-family: 'Inter', sans-serif;
font-weight: 400;

/* Hindi/Marathi */
font-family: 'Noto Sans Devanagari', sans-serif;
```

### Font Sizes (Desktop)
```css
--h1: 48px;          /* Page titles */
--h2: 36px;          /* Section headings */
--h3: 28px;          /* Subsection headings */
--h4: 22px;          /* Card titles */
--body-large: 18px;  /* Intro paragraphs */
--body: 16px;        /* Regular text */
--body-small: 14px;  /* Captions, labels */
--tiny: 12px;        /* Fine print */
```

### Font Sizes (Mobile)
```css
--h1: 32px;
--h2: 28px;
--h3: 24px;
--h4: 20px;
--body-large: 16px;
--body: 15px;
--body-small: 13px;
```

### Line Heights
```css
--heading-line-height: 1.2;
--body-line-height: 1.6;
```

---

## Spacing System

### Consistent Spacing Scale
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
--space-3xl: 96px;
```

### Section Padding
- Desktop: 80px top/bottom
- Mobile: 48px top/bottom

### Container Max-Width
- Full-width sections: 100%
- Content sections: 1200px
- Text-heavy sections: 900px

---

## Component Design Patterns

### Buttons

**Primary Button**:
```
Background: Orange (#FF6B35)
Text: White
Padding: 12px 32px
Border-radius: 8px
Font-size: 16px
Font-weight: 600
Hover: Darken 10%
```

**Secondary Button**:
```
Background: Transparent
Border: 2px solid (color varies)
Text: Matching border color
Padding: 10px 30px
Hover: Fill with border color, text white
```

**Button Sizes**:
- Large: 50px height, 180px min-width
- Medium: 44px height, 140px min-width
- Small: 36px height, 100px min-width

### Cards

**Standard Card**:
```
Background: White
Border: 1px solid #DEE2E6
Border-radius: 12px
Padding: 24px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Hover: Shadow 0 4px 16px rgba(0,0,0,0.12), translateY(-4px)
Transition: 0.3s ease
```

**Image Card** (for stories, news):
```
Image: Top, full-width, border-radius top only
Content: Padding 20px
Title: H4, margin-bottom 12px
Excerpt: Body text, 2-3 lines
CTA: Link at bottom
```

### Forms

**Input Fields**:
```
Height: 48px
Padding: 12px 16px
Border: 1px solid #DEE2E6
Border-radius: 8px
Font-size: 16px
Focus: Border color changes to primary green, outline none
```

**Labels**:
```
Font-size: 14px
Font-weight: 600
Margin-bottom: 8px
Color: Text dark
```

**Required Fields**: Red asterisk (*)

**Error States**: Red border, red text below field

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px - 767px;
--tablet: 768px - 1023px;
--desktop: 1024px+;
--large-desktop: 1440px+;
```

### Grid System
- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns

### Common Layouts
- **3-column grid** (desktop) → 2-column (tablet) → 1-column (mobile)
- **2-column** (desktop) → 1-column (mobile)
- **Sidebar layout** (desktop) → Stacked (mobile)

---

## Image Guidelines

### Image Sizes
- **Hero images**: 1920x600px (desktop), 768x400px (mobile)
- **Card images**: 400x300px (4:3 ratio)
- **Team photos**: 300x300px (square)
- **Blog featured**: 800x450px (16:9 ratio)
- **Icons**: 64x64px or SVG

### Image Optimization
- Format: WebP (with JPG fallback)
- Compression: 80% quality
- Lazy loading: Yes, for below-fold images
- Alt text: Always required (SEO + accessibility)

### Image Sources
- Real photos preferred over stock
- Beneficiary photos: Require written consent
- Team photos: Professional but warm
- Field photos: Authentic, candid moments

---

## Animation & Transitions

### Standard Transitions
```css
transition: all 0.3s ease;
```

### Hover Effects
- **Buttons**: Background color change, slight scale (1.05)
- **Cards**: Elevation increase, subtle translateY(-4px)
- **Links**: Underline, color change
- **Images**: Slight zoom (1.1 scale) within container

### Scroll Animations
- **Fade in**: Elements fade in as they enter viewport
- **Slide up**: Elements slide up 20px while fading in
- **Count up**: Numbers animate from 0 to target value
- **Progress bars**: Fill animation on scroll

### Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Keep animations under 0.5s for snappiness

---

## Accessibility Guidelines

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Test all color combinations

### Keyboard Navigation
- All interactive elements must be keyboard-accessible
- Visible focus states (outline)
- Logical tab order

### Screen Readers
- Semantic HTML (header, nav, main, section, article, footer)
- Alt text for all images
- ARIA labels where needed
- Skip to content link

### Forms
- Labels for all inputs
- Error messages clearly associated with fields
- Required fields indicated

---

## SEO Best Practices

### Every Page Must Have
1. **Unique Title Tag** (50-60 characters)
2. **Meta Description** (150-160 characters)
3. **H1 Tag** (one per page)
4. **Proper Heading Hierarchy** (H1 → H2 → H3)
5. **Alt Text** for all images
6. **Internal Links** to related pages
7. **Schema Markup** (Organization, NGO)

### URL Structure
- Clean, readable URLs
- Use hyphens, not underscores
- Include keywords
- Example: `/pages/women-empowerment.html` ✅
- Not: `/pages/page2.html` ❌

### Content Guidelines
- Minimum 300 words per page
- Keywords naturally integrated
- Unique content (no duplication)
- Regular updates (blog, news)

---

## Performance Optimization

### Page Load Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Page Size: < 2MB

### Optimization Techniques
- Minify CSS, JS, HTML
- Compress images (WebP, 80% quality)
- Lazy load images below fold
- Use CDN for Bootstrap, fonts
- Enable browser caching
- Gzip compression

### Critical CSS
- Inline critical CSS for above-fold content
- Defer non-critical CSS

---

## Browser Support

### Target Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

### Graceful Degradation
- Test on older browsers
- Provide fallbacks for modern CSS features
- Progressive enhancement approach

---

## Code Organization

### File Structure
```
assets/
├── css/
│   ├── main.css           (Main stylesheet)
│   ├── components.css     (Reusable components)
│   ├── pages.css          (Page-specific styles)
│   └── responsive.css     (Media queries)
├── js/
│   ├── main.js            (Core functionality)
│   ├── animations.js      (Scroll animations)
│   └── forms.js           (Form validation)
└── images/
    ├── hero/              (Hero images)
    ├── team/              (Team photos)
    ├── icons/             (Icon files)
    └── general/           (Other images)
```

### CSS Naming Convention
Use BEM (Block Element Modifier):
```css
.card { }                  /* Block */
.card__title { }           /* Element */
.card--featured { }        /* Modifier */
```

### Comments
- Section headers in CSS
- Function descriptions in JS
- Complex logic explanations

---

## Testing Checklist

### Before Launch
- [ ] All links work (no 404s)
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Responsive on all devices
- [ ] Cross-browser testing
- [ ] Accessibility audit (WAVE tool)
- [ ] SEO audit (Lighthouse)
- [ ] Performance test (PageSpeed Insights)
- [ ] Spell check all content
- [ ] Legal pages (Privacy, Terms)
- [ ] Contact form sends emails
- [ ] Social media links work
- [ ] Analytics tracking installed

---

**Use this guide throughout development to maintain consistency!**
