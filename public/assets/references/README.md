# Client Reference Logos

## 📁 How to Add Reference Logos

### Step 1: Prepare Your Logos

**Recommended Format:**
- **File Format**: PNG with transparent background (or SVG)
- **Size**: Width: 300-500px, Height: 100-200px
- **Background**: Transparent or white
- **Color**: Full color or monochrome

**Naming Convention:**
```
logo1.png
logo2.png
logo3.png
...
```

Or use client names:
```
acme-corp.png
tech-solutions.png
innovate-inc.png
```

### Step 2: Add Logos to This Folder

Simply drag and drop your logo files into:
```
/public/assets/references/
```

### Step 3: Update Configuration

Edit `/public/js/references.js` and update the `referenceLogos` array:

```javascript
const referenceLogos = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    'acme-corp.png',
    'tech-solutions.png',
    // Add more logos here
];
```

### Step 4: Test

1. Restart the server or refresh the page
2. The logos will automatically appear in an infinite scrolling carousel
3. Logos are displayed in grayscale and become colorful on hover

## 🎨 Features

✅ **Perfect Infinite Scroll**: Seamless endless loop with 3x duplication
✅ **Auto-Animation**: 30-second loop (adjusts based on logo count)
✅ **Bigger Logos**: 80px height (desktop), 60px (mobile)
✅ **Hover Effects**: Color on hover, grayscale by default
✅ **Pause on Hover**: Carousel pauses when hovering
✅ **Dark Mode**: Logos automatically adjust brightness
✅ **Responsive**: Optimized for all screen sizes
✅ **Lazy Loading**: Images load as needed
✅ **Error Handling**: Shows gradient placeholder if image missing
✅ **URL Encoding**: Handles filenames with spaces automatically

## 💡 Tips

**Optimize Your Logos:**
1. Compress images (use TinyPNG or similar)
2. Keep file sizes under 50KB each
3. Use consistent heights for best appearance
4. SVG is preferred for best quality

**Logo Visibility:**
- Logos are shown in **grayscale by default**
- On **hover**, they become **full color**
- This creates a clean, professional look

**Recommended Number:**
- Minimum: 6 logos (for smooth infinite scroll)
- Optimal: 8-12 logos
- Maximum: No limit (animation adjusts automatically)

## 🔧 Customization

### Change Animation Speed

In `/public/css/styles.css`, find:
```css
.references-track {
  animation: scroll 30s linear infinite;
}
```

Change `30s` to your preferred speed (higher = slower).

### Change Logo Size

In `/public/css/styles.css`, find:
```css
.reference-logo {
  height: 80px;  /* Change this */
  max-width: 200px;  /* And this */
}
```

### Disable Grayscale

In `/public/css/styles.css`, change:
```css
.reference-logo {
  filter: grayscale(100%) opacity(0.6);
}
```
To:
```css
.reference-logo {
  filter: none;
  opacity: 0.8;
}
```

## 📝 Example Logo List

```javascript
const referenceLogos = [
    'microsoft.png',
    'google.png',
    'amazon.png',
    'netflix.png',
    'spotify.png',
    'airbnb.png',
    'uber.png',
    'tesla.png',
    'apple.png',
    'meta.png'
];
```

## 🎯 Current Setup

Currently showing **8 placeholder logos**. The carousel will display colored placeholders with the logo filename until you add actual logo images.

To see your real logos:
1. Add PNG/JPG/SVG files to this folder
2. Update the array in `/public/js/references.js`
3. Refresh the page

Enjoy! 🚀

