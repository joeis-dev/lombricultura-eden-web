# Branding Customization Guide

This guide explains how to customize the platform's branding for different clients.

## Overview

The platform is designed to be easily rebranded for different businesses. All branding elements are centralized in configuration files, making it simple to create white-label versions.

## Theme Configuration

### Main Configuration File

**File**: `frontend/public/branding/theme.json`

```json
{
  "brandName": "Your Store Name",
  "primaryColor": "#3B82F6",
  "secondaryColor": "#10B981",
  "accentColor": "#F59E0B",
  "backgroundColor": "#F9FAFB",
  "textColor": "#111827",
  "logo": "/branding/logo.svg",
  "favicon": "/branding/favicon.ico",
  "fonts": {
    "heading": "Inter",
    "body": "Roboto"
  },
  "features": {
    "guestCheckout": true,
    "userReviews": true,
    "sellerPanel": true,
    "whatsappNotifications": true,
    "emailNotifications": true
  },
  "contact": {
    "email": "contact@yourstore.com",
    "phone": "+1234567890",
    "whatsapp": "+1234567890"
  },
  "social": {
    "facebook": "https://facebook.com/yourstore",
    "instagram": "https://instagram.com/yourstore",
    "twitter": "https://twitter.com/yourstore"
  },
  "seo": {
    "title": "Your Store - Quality Products",
    "description": "Shop quality products at great prices",
    "keywords": "ecommerce, shopping, products"
  }
}
```

## Customization Steps

### 1. Colors

Update the color scheme to match your brand:

```json
{
  "primaryColor": "#FF6B6B",      // Main brand color
  "secondaryColor": "#4ECDC4",    // Secondary actions
  "accentColor": "#FFE66D",       // Highlights and CTAs
  "backgroundColor": "#FFFFFF",   // Page background
  "textColor": "#2C3E50"          // Main text color
}
```

The frontend automatically applies these colors as CSS variables:

```css
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --accent-color: #FFE66D;
  --bg-color: #FFFFFF;
  --text-color: #2C3E50;
}
```

### 2. Logo and Favicon

Replace the default assets:

1. **Logo**: Place your logo at `frontend/public/branding/logo.svg`
   - Recommended size: 200x60px
   - Format: SVG (preferred) or PNG
   - Transparent background

2. **Favicon**: Place your favicon at `frontend/public/branding/favicon.ico`
   - Size: 32x32px or 16x16px
   - Format: ICO or PNG

3. Update the theme.json:
```json
{
  "logo": "/branding/logo.svg",
  "favicon": "/branding/favicon.ico"
}
```

### 3. Typography

Choose fonts that match your brand:

```json
{
  "fonts": {
    "heading": "Montserrat",  // For headings
    "body": "Open Sans"       // For body text
  }
}
```

The platform automatically loads fonts from Google Fonts. Supported fonts:
- Inter
- Roboto
- Montserrat
- Open Sans
- Lato
- Poppins
- Raleway
- Nunito

### 4. Feature Toggles

Enable or disable features based on your needs:

```json
{
  "features": {
    "guestCheckout": true,          // Allow purchases without account
    "userReviews": true,            // Enable product reviews
    "sellerPanel": true,            // Multi-vendor marketplace
    "whatsappNotifications": true,  // WhatsApp order updates
    "emailNotifications": true      // Email notifications
  }
}
```

### 5. Contact Information

Update your business contact details:

```json
{
  "contact": {
    "email": "support@yourstore.com",
    "phone": "+1 (555) 123-4567",
    "whatsapp": "+15551234567",
    "address": "123 Main St, City, State 12345"
  }
}
```

### 6. Social Media

Add your social media profiles:

```json
{
  "social": {
    "facebook": "https://facebook.com/yourstore",
    "instagram": "https://instagram.com/yourstore",
    "twitter": "https://twitter.com/yourstore",
    "linkedin": "https://linkedin.com/company/yourstore",
    "youtube": "https://youtube.com/@yourstore"
  }
}
```

## Multi-Tenant Deployment

### Option 1: Separate Instances

Deploy a separate instance for each client:

```bash
# Client A
VITE_THEME_CONFIG=/branding/client-a/theme.json docker-compose up -d

# Client B
VITE_THEME_CONFIG=/branding/client-b/theme.json docker-compose up -d
```

### Option 2: Domain-Based Theming

Use different themes based on the domain:

**File**: `frontend/src/utils/getThemeConfig.ts`

```typescript
export const getThemeConfig = () => {
  const domain = window.location.hostname;
  
  const themeMap: Record<string, string> = {
    'client-a.com': '/branding/client-a/theme.json',
    'client-b.com': '/branding/client-b/theme.json',
    'localhost': '/branding/theme.json',
  };
  
  return themeMap[domain] || '/branding/theme.json';
};
```

## Backend Branding

### Email Templates

Customize email templates with your branding:

**File**: `backend/src/main/resources/templates/email/order-confirmation.html`

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .header {
      background-color: {{primaryColor}};
      padding: 20px;
      text-align: center;
    }
    .logo {
      max-width: 200px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{logoUrl}}" alt="{{brandName}}" class="logo">
  </div>
  <div class="content">
    <h1>Order Confirmation</h1>
    <p>Thank you for your order!</p>
    <!-- Order details -->
  </div>
  <div class="footer">
    <p>{{brandName}} | {{contactEmail}} | {{contactPhone}}</p>
  </div>
</body>
</html>
```

### Environment Variables

Set branding-specific environment variables:

```bash
# .env
BRAND_NAME=Your Store
BRAND_EMAIL=support@yourstore.com
BRAND_PHONE=+1234567890
BRAND_ADDRESS=123 Main St, City, State
```

## Deployment Checklist

When deploying for a new client:

- [ ] Update `theme.json` with client's branding
- [ ] Replace logo and favicon
- [ ] Configure colors and fonts
- [ ] Update contact information
- [ ] Set up social media links
- [ ] Configure feature toggles
- [ ] Customize email templates
- [ ] Update SEO metadata
- [ ] Test all pages for branding consistency
- [ ] Verify mobile responsiveness
- [ ] Check email templates
- [ ] Test WhatsApp notifications (if enabled)
- [ ] Configure domain and SSL certificate
- [ ] Set up analytics tracking
- [ ] Configure payment gateway (Stripe)
- [ ] Set up shipping provider (Skydropx)

## Example Configurations

### Example 1: Fashion Store

```json
{
  "brandName": "Chic Boutique",
  "primaryColor": "#E91E63",
  "secondaryColor": "#9C27B0",
  "accentColor": "#FFC107",
  "fonts": {
    "heading": "Playfair Display",
    "body": "Lato"
  },
  "features": {
    "guestCheckout": true,
    "userReviews": true,
    "sellerPanel": false
  }
}
```

### Example 2: Electronics Store

```json
{
  "brandName": "TechMart",
  "primaryColor": "#2196F3",
  "secondaryColor": "#00BCD4",
  "accentColor": "#FF9800",
  "fonts": {
    "heading": "Roboto",
    "body": "Open Sans"
  },
  "features": {
    "guestCheckout": true,
    "userReviews": true,
    "sellerPanel": true
  }
}
```

### Example 3: Organic Products

```json
{
  "brandName": "Green Earth",
  "primaryColor": "#4CAF50",
  "secondaryColor": "#8BC34A",
  "accentColor": "#FFC107",
  "fonts": {
    "heading": "Montserrat",
    "body": "Nunito"
  },
  "features": {
    "guestCheckout": true,
    "userReviews": true,
    "sellerPanel": false
  }
}
```

## Advanced Customization

### Custom CSS

For more advanced styling, create a custom CSS file:

**File**: `frontend/public/branding/custom.css`

```css
/* Custom styles for specific client */
.product-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  border-radius: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

Load it in your theme configuration:

```json
{
  "customCSS": "/branding/custom.css"
}
```

### Custom Components

Override default components with custom ones:

**File**: `frontend/src/branding/components/CustomHeader.tsx`

```typescript
export const CustomHeader = () => {
  // Custom header implementation
  return (
    <header className="custom-header">
      {/* Your custom header */}
    </header>
  );
};
```

## Troubleshooting

### Colors Not Applying

1. Clear browser cache
2. Check theme.json syntax
3. Verify CSS variable names
4. Restart frontend container

### Logo Not Displaying

1. Check file path in theme.json
2. Verify file exists in public/branding/
3. Check file permissions
4. Clear browser cache

### Fonts Not Loading

1. Verify font name is correct
2. Check Google Fonts availability
3. Test with fallback fonts
4. Check network requests in browser dev tools

## Support

For branding customization support:
1. Review this guide
2. Check example configurations
3. Test in development environment first
4. Contact support for complex customizations
